import MockAdapter from 'axios-mock-adapter'

import mockCustomers from '../../app/modules/ECommerce/__mocks__/mockCustomer'
import mockProducts from '../../app/modules/ECommerce/__mocks__/mockProduct'
import mockRemarks from '../../app/modules/ECommerce/__mocks__/mockRemark'
import mockSpecifications from '../../app/modules/ECommerce/__mocks__/mockSpecification'

export default function mockAxios(axios) {
  const mock = new MockAdapter(axios, { delayResponse: 300 })
  mockCustomers(mock)
  mockProducts(mock)
  mockRemarks(mock)
  mockSpecifications(mock)

  return mock
}
