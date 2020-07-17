import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field } from 'formik'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Input } from '../../../../_metronic/_partials/controls'
import * as actions from '../_redux/authActions'
import { cryptography } from '@liskhq/lisk-client'

function Login(props) {
  const { intl } = props
  const [loading, setLoading] = useState(false)
  const enableLoading = () => {
    setLoading(true)
  }
  const disableLoading = () => {
    setLoading(false)
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
    <div className="login-form login-signin">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        {/* https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage */}
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your Address and passphrase
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <Formik
        initialValues={{
          address: '',
          passphrase:
            '',
        }}
        validate={(values) => {
          const errors = {}
          if (!values.address) {
            // https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
            errors.address = intl.formatMessage({
              id: 'AUTH.VALIDATION.REQUIRED_FIELD',
            })
          }

          if (!values.passphrase) {
            errors.passphrase = intl.formatMessage({
              id: 'AUTH.VALIDATION.REQUIRED_FIELD',
            })
          }

          return errors
        }}
        onSubmit={(values, { setStatus, setSubmitting }) => {
          enableLoading()
          setTimeout(() => {
            const keys = cryptography.getPrivateAndPublicKeyFromPassphrase(
              values.passphrase
            )
            const address = cryptography.getAddressFromPublicKey(keys.publicKey)
            if (values.address !== address) {
              disableLoading()
              setSubmitting(false)
              setStatus(' wrong address or passphrase ')
              return
            }
            props
              .login({ address, passphrase: values.passphrase })
              .then(() => {
                props.history.location.state
                  ? props.history.push(props.history.location.state)
                  : props.history.push('/')
              })
              .catch((data) => {
                setSubmitting(false)
                setStatus(data.message)
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
            className="form"
            noValidate={true}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {status ? (
              <div
                role="alert"
                className="mb-10 alert alert-custom alert-light-danger alert-dismissible"
              >
                <div className="alert-text font-weight-bold">{status}</div>
              </div>
            ) : (
              <div
                role="alert"
                className="mb-10 alert alert-custom alert-light-info alert-dismissible"
              >
                <div className="alert-text ">
                  Use account <strong>admin@demo.com</strong> and password{' '}
                  <strong>demo</strong> to continue.
                </div>
              </div>
            )}

            <div className="form-group">
              <Field
                name="address"
                component={Input}
                placeholder="Address"
                label="Address"
              >
                {({ field, form, meta }) => (
                  <div>
                    <input
                      type="text"
                      {...field}
                      className={`${getInputClasses(meta)}`}
                      placeholder="Enter Address"
                    />
                    {meta.touched && meta.error && (
                      <div className="error invalid-feedback">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>

            <div className="form-group">
              <Field
                name="passphrase"
                component={Input}
                placeholder="passphrase"
                label="passphrase"
              >
                {({ field, form, meta }) => (
                  <div>
                    <input
                      type="text"
                      {...field}
                      className={`${getInputClasses(meta)}`}
                      placeholder="Enter passphrase"
                    />
                    {meta.touched && meta.error && (
                      <div className="error invalid-feedback">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>

            {/* begin::Actions */}
            <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
              <Link
                to="/auth/forgot-password"
                className="text-dark-50 text-hover-primary my-3 mr-2"
                id="kt_login_forgot"
              >
                <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
              </Link>

              <button
                id="kt_login_signin_submit"
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
              >
                <span>Sign In</span>
                {loading && (
                  <span className="ml-3 spinner spinner-white"></span>
                )}
              </button>
            </div>
            {/* end::Actions */}
          </form>
        )}
      </Formik>
      {/*end::Form*/}
    </div>
  )
}

export default injectIntl(connect(null, actions)(Login))
