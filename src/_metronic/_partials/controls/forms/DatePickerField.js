/* eslint-disable no-restricted-imports */
import React from 'react'
import { useField, useFormikContext } from 'formik'
import DatePicker from 'react-datepicker'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
const getFieldCSSClasses = (touched, errors) => {
  const classes = ['form-control']
  if (touched && errors) {
    classes.push('is-invalid')
  }

  if (touched && !errors) {
    classes.push('is-valid')
  }

  return classes.join(' ')
}

export function DatePickerField({ ...props }) {
  const { setFieldValue, errors, touched } = useFormikContext()
  const [field] = useField(props)
  return (
    <>
      {props.label && <label>{props.label}</label>}
      <DatePicker
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        style={{ width: '100%' }}
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val)
        }}
      />
      {errors[field.name] && touched[field.name] ? (
        <div className="invalid-datepicker-feedback">
          {errors[field.name].toString()}
        </div>
      ) : (
        <div className="feedback">
          Please enter <b>{props.label}</b> in 'mm/dd/yyyy' format
        </div>
      )}
    </>
  )
}

export function PickerField({ ...props }) {
  const { setFieldValue, errors, touched } = useFormikContext()
  const [field] = useField(props)
  let x = { ...props }
  delete x.label
  return (
    <>
      {props.label && <label>{props.label}</label>}
      <TextField
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        style={{ width: '100%' }}
        {...field}
        {...x}
        value={field.value}
        onChange={(val) => {
          setFieldValue(field.name, val.target.value)
        }}
      />
      {errors[field.name] && touched[field.name] ? (
        <div className="invalid-feedback">{errors[field.name].toString()}</div>
      ) : (
        <div className="feedback">
          Please enter <b>{props.label}</b>
        </div>
      )}
    </>
  )
}
