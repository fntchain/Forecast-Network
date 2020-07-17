import React, { useEffect, useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as actions from '../../../../../redux/lettry/lettryActions'
import * as authActions from '../../../../modules/Auth/_redux/authActions'
import { Form, Col, Button } from 'react-bootstrap'
import { getPrice } from '../../../utils'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Message from '../../../../components/Message'
import axios from 'axios'
const schema = Yup.object({
  price: Yup.string().required(),
  amount: Yup.number()
    .required()
    .min(1, '$1 is minimum')
    .integer(),
})
const initialFilter = {
  pageNumber: 1,
  pageSize: 10,
}

export default function GuessFrom(props) {
  const { isLogin, user } = useSelector((state) => state.auth)
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')
  const [state, setState] = useState({ open: false })
  const history = useHistory()
  const dispatch = useDispatch()
  initialFilter.address = isLogin ? user.address : ''
  initialFilter.id = props.id
  let source = axios.CancelToken.source()
  useEffect(() => {
    async function fetchPrice() {
      let body = await getPrice(props.assetsName, source.token)
      setPrice(Number(body.data.data.priceUsd).toFixed(3))
    }
    if (isLogin) {
      if (user.balance / 100000000 >= 100) {
        setAmount(100)
      } else {
        setAmount(user.balance / 100000000)
      }
    } else {
      setAmount(0)
    }
    fetchPrice()

    return () => source.cancel('Cancelling in cleanup')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])
  const changeAmount = (state, amount) => {
    // eslint-disable-next-line default-case
    switch (state) {
      case 1:
        setAmount(Math.ceil(amount / 2))
        break
      case 2:
        console.log(amount)
        setAmount(amount * 2)
        break
      case 3:
        setAmount(1)
        break
      case 4:
        let x = isLogin ? user.balance / 100000000 : 0
        setAmount(x)
        break
    }
  }

  const handleSubmit = (values) => {
    if (!isLogin) {
      return history.push({
        pathname: '/auth/login',
        state: history.location.pathname,
      })
    }
    values.address = user.address
    values.id = props.id
    values.period = props.issue
    values.passphrase = user.passphrase
    dispatch(actions.saveRecord(values))
      .then((res) => {
        setState({ open: true, message: res, type: 'success' })
        dispatch(authActions.setBalance(-values.amount))
        dispatch(actions.getNumber({ issue: props.issue, id: props.id }))
        setTimeout(() => dispatch(actions.fetchRecord(initialFilter)), 1000)
      })
      .catch((res) => {
        setState({ open: true, message: res, type: 'error' })
      })
  }
  return (
    <Fragment>
      <Formik
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          price: price,
          amount: amount,
        }}
        validate={(values) => {
          const errors = {}
          if (isLogin) {
            if (values.amount > user.balance / 100000000) {
              errors.amount = 'Total account balance exceeded'
            }
          }

          return errors
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGuessPrice">
                <Form.Label>GuessPrice</Form.Label>
                <Form.Control
                  value={values.price}
                  isInvalid={!!errors.price}
                  onChange={handleChange}
                  name="price"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="formAmount">
                <Form.Label>Bet amount</Form.Label>
                <Form.Control
                  value={values.amount}
                  isInvalid={!!errors.amount}
                  onChange={handleChange}
                  name="amount"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amount}
                </Form.Control.Feedback>
                <Form.Label>
                  Bets{isLogin ? user.balance / 100000000 : 0}FNT
                </Form.Label>
              </Form.Group>
              <Button
                className="mr-5 mt-8 ml-5"
                style={{ height: 37.7 }}
                onClick={() => changeAmount(1, values.amount)}
              >
                1/2
              </Button>
              <Button
                className="mr-5 mt-8"
                style={{ height: 37.7 }}
                onClick={() => changeAmount(2, values.amount)}
              >
                2x
              </Button>

              <Button
                className="mr-5 mt-8"
                style={{ height: 37.7 }}
                onClick={() => changeAmount(3, values.amount)}
              >
                MIN
              </Button>

              <Button
                className="mr-5 mt-8"
                style={{ height: 37.7 }}
                onClick={() => changeAmount(4, values.amount)}
              >
                MAX
              </Button>
            </Form.Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Message
        type={state.type}
        message={state.message}
        open={state.open}
        onClose={() => setState({ open: false })}
      />
    </Fragment>
  )
}
