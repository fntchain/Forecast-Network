import React, { useState, Fragment } from 'react'
import { Formik, Field } from 'formik'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Dialog from './Dialog'
import { FormattedMessage, injectIntl } from 'react-intl'
import { cryptography, passphrase } from '@liskhq/lisk-client'
import { Input } from '../../../../_metronic/_partials/controls'
import * as actions from '../_redux/authActions'
let show = null
function Registration(props) {
  const { intl } = props
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState({})

  const enableLoading = () => {
    setLoading(true)
  }
  const handleShow = (child) => {
    show = child
  }
  const disableLoading = () => {
    setLoading(false)
  }
  const newCredentials = () => {
    let { Mnemonic } = passphrase
    const userPassphrase = Mnemonic.generateMnemonic()
    const keys = cryptography.getPrivateAndPublicKeyFromPassphrase(
      userPassphrase
    )
    const credentials = {
      address: cryptography.getAddressFromPublicKey(keys.publicKey),
      passphrase: userPassphrase,
    }
    return credentials
  }
  const getInputClasses = (meta, fieldname) => {
    let result = 'form-control form-control-solid h-auto py-5 px-6 '
    if (meta.touched && meta.error) {
      result += ' is-invalid'
    }

    if (meta.touched && !meta.error) {
      result += ' is-valid'
    }

    return result
  }

  return (
    <Fragment>
      <div className="login-form">
        <div className="text-center mb-10 mb-lg-20">
          <h3 className="font-size-h1">
            <FormattedMessage id="AUTH.REGISTER.TITLE" />
          </h3>
          <p className="text-muted font-weight-bold">
            Enter your details to create your account
          </p>
        </div>

        <Formik
          initialValues={{
            username: '',
            acceptTerms: true,
          }}
          validate={(values) => {
            const errors = {}
            if (!values.username) {
              errors.username = intl.formatMessage({
                id: 'AUTH.VALIDATION.REQUIRED_FIELD',
              })
            }

            if (!values.acceptTerms) {
              errors.acceptTerms = 'Accept Terms'
            }

            return errors
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            enableLoading()
            setTimeout(async () => {
              let user = newCredentials()
              user.username = values.username
              await props
                .register(user)
                .then((res) => {
                  disableLoading()
                  show()
                  setAccount(res)
                })
                .catch((error) => {
                  setSubmitting(false)
                  setStatus(error.error.errors[0].message)
                  disableLoading()
                })
            }, 1000)
          }}
        >
          {({
            values,
            status,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              noValidate={true}
              autoComplete="off"
              className="form"
            >
              {status && (
                <div
                  role="alert"
                  className="mb-10 alert alert-custom alert-light-danger alert-dismissible"
                >
                  <div className="alert-text font-weight-bold">{status}</div>
                </div>
              )}

              <div className="form-group">
                {/* <TextField
                  margin="normal"
                  label="Fullname"
                  className="form-control form-control-solid rounded"
                  name="fullname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullname}
                  helperText={touched.fullname && errors.fullname}
                  error={Boolean(touched.fullname && errors.fullname)}
                /> */}
                <Field type="text" name="username" component={Input}>
                  {({ field, form, meta }) => (
                    <div>
                      <input
                        type="text"
                        {...field}
                        className={`${getInputClasses(meta)}`}
                        placeholder="Enter username"
                      />
                      {meta.touched && meta.error && (
                        <div className="error invalid-feedback">
                          {meta.error}
                        </div>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <div className="form-group">
                <label className="checkbox">
                  <input type="checkbox" name="acceptTerms" />I agree the{' '}
                  <Link to="/terms" target="_blank" rel="noopener noreferrer">
                    Terms & Conditions
                  </Link>
                  .
                  <span />
                </label>
              </div>

              <div className="form-group d-flex flex-wrap flex-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !values.acceptTerms}
                  className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                >
                  <span>Submit</span>
                  {loading && (
                    <span className="ml-3 spinner spinner-white"></span>
                  )}
                </button>

                <Link to="/auth/login">
                  <button
                    type="button"
                    className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <Dialog handleShow={handleShow} history={props.history}>
        <p>
          <strong>Address:</strong>
          {account.address}
        </p>
        <p>
          <strong>Passphrase:</strong>
          {account.passphrase}
        </p>
      </Dialog>
    </Fragment>
  )
}

export default injectIntl(connect(null, actions)(Registration))
