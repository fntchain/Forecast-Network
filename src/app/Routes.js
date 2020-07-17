/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Layout } from '../_metronic/layout'
import BasePage from './BasePage'
import { AuthPage } from './modules/Auth'
import ErrorsPage from './modules/ErrorsExamples/ErrorsPage'

export function Routes() {
  return (
    <Switch>
      <Route
        path="/auth"
        component={AuthPage}
        onEnter={() => console.log(11)}
      />
      <Route path="/error" component={ErrorsPage} />
      <Route
        path="/"
        component={(props) => {
          return (
            <Layout {...props}>
              <BasePage {...props} />
            </Layout>
          )
        }}
      />
    </Switch>
  )
}
