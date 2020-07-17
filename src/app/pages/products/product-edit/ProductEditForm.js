/* eslint-disable no-restricted-imports */
// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'
import * as qiniu from 'qiniu-js'
import * as Yup from 'yup'
import { Input, PickerField } from '../../../../_metronic/_partials/controls'
// import {
//   AVAILABLE_COLORS,
//   AVAILABLE_MANUFACTURES,
//   ProductStatusTitles,
//   ProductConditionTitles,
// } from '../ProductsUIHelpers'
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons'
// eslint-disable-next-line no-restricted-imports
import { green, red } from '@material-ui/core/colors'
import axios from 'axios'
axios.defaults.baseURL = 'https://debug.first.vip'
// Validation schema
const ProductEditSchema = Yup.object().shape({
  assets_name: Yup.string().required('assets_name is required'),
  api_assets_name: Yup.string().required('api_assets_name is required'),
  interval: Yup.number().required('interval is required'),
  seal_time: Yup.number().required('seal_time is required'),
  pool_amount: Yup.number().required('pool_amount is required'),
  start_time: Yup.string().required('start_time is required'),
  lowest_amount: Yup.number().required('lowest_amount is required'),
  region: Yup.array()
    .of(
      Yup.object().shape({
        region: Yup.number().required('region is required'),
        percentage: Yup.number().required('percentage is required'),
      })
    )
    .required('region is required'),
})
const numArr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
export function ProductEditForm({ product, btnRef, saveProduct }) {
  const [path, setPath] = useState(null)
  const uploadImg = async (e) => {
    e.persist()
    let token = await axios.get('/new_api/upload/token')
    let file = e.target.files[0]
    let config = {
      useCdnDomain: true,
      region: qiniu.region.na0,
    }
    let putExtra = {
      fname: file.name,
      params: {},
      mimeType: ['image/png', 'image/jpeg', 'image/gif'],
    }
    let observable = qiniu.upload(
      file,
      file.name,
      token.data.uptoken,
      putExtra,
      config
    )
    let observer = {
      complete(res) {
        setPath('http://lisk.first.vip/' + res.key)
      },
    }
    observable.subscribe(observer)
  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={product}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          let productValues = { ...values }
          productValues.icon = path ?? product.icon
          saveProduct(productValues)
        }}
      >
        {({ handleSubmit, values, errors }) => {
          return (
            <Form className="form form-label-right">
              <div className="row">
                <div className="col-lg-4 form-group">
                  <div className="form-group">
                    <Field
                      name="assets_name"
                      component={Input}
                      placeholder="assets_name"
                      label="assets_name"
                    />
                  </div>
                  <div className="form-group row">
                    <label style={{ display: 'block' }} className="col-lg-12">
                      Upload icon
                    </label>
                    <div className="col-lg-2">
                      <img
                        src={path ?? product.icon}
                        alt=""
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="col-lg-10" style={{ marginTop: 15 }}>
                      <input
                        type="file"
                        name="icon"
                        onChange={uploadImg}
                        accept="image/*"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <Field
                      name="api_assets_name"
                      component={Input}
                      placeholder="api_assets_name"
                      label="api_assets_name"
                    />
                  </div>
                  <div className="form-group">
                    <PickerField
                      label="start_time"
                      name="start_time"
                      type="datetime-local"
                    />
                  </div>
                </div>
                <div className="col-lg-4 form-group">
                  <div className="form-group">
                    <Field
                      type="number"
                      name="interval"
                      component={Input}
                      placeholder="interval"
                      label="interval"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="number"
                      name="seal_time"
                      component={Input}
                      placeholder="seal_time"
                      label="seal_time"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="number"
                      name="pool_amount"
                      component={Input}
                      placeholder="pool_amount"
                      label="pool_amount (LSK)"
                      customFeedbackLabel="Please enter pool_amount"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="number"
                      name="lowest_amount"
                      component={Input}
                      placeholder="lowest_amount"
                      label="lowest_amount (LSK)"
                      customFeedbackLabel="Please enter lowest_amount"
                    />
                  </div>
                </div>
                <div className="col-lg-4 form-group">
                  <FieldArray
                    name="region"
                    render={(arrayHelpers) => {
                      return values.region.map((value, index) => (
                        <div className="form-group row" key={index}>
                          <label
                            style={{ display: 'block' }}
                            className="col-lg-12"
                          >
                            {numArr[index]}等奖
                          </label>
                          <div className="col-lg-4">
                            <Field
                              type="number"
                              component={Input}
                              placeholder="region"
                              name={`region.${index}.region`}
                            />
                          </div>
                          <div className="col-lg-4">
                            <Field
                              type="number"
                              name={`region.${index}.percentage`}
                              placeholder="percentage"
                              component={Input}
                            />
                          </div>
                          <div className="col-lg-4">
                            <AddCircleOutline
                              style={{
                                color: green[500],
                                margin: 8,
                                cursor: 'pointer',
                              }}
                              onClick={() =>
                                arrayHelpers.push({
                                  region: '',
                                  percentage: '',
                                })
                              }
                            />
                            {index !== 0 ? (
                              <RemoveCircleOutline
                                style={{
                                  color: red[500],
                                  margin: 8,
                                  cursor: 'pointer',
                                }}
                                onClick={() => arrayHelpers.remove(index)}
                              />
                            ) : null}
                          </div>
                          <div
                            className="col-lg-4 invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            {errors.region
                              ? errors?.region[index]?.region
                              : null}
                          </div>
                          <div
                            className="col-lg-4 invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            {errors.region
                              ? errors?.region[index]?.percentage
                              : null}
                          </div>
                        </div>
                      ))
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{ display: 'none' }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}
