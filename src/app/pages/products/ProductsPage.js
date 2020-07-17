import React from 'react'
import { Route } from 'react-router-dom'
import { ProductDeleteDialog } from './product-delete-dialog/ProductDeleteDialog'
import { ProductsFetchDialog } from './products-fetch-dialog/ProductsFetchDialog'
import { ProductsCard } from './ProductsCard'
import { ProductsUIProvider } from './ProductsUIContext'

export default function ProductsPage({ history }) {
  const productsUIEvents = {
    newProductButtonClick: () => {
      history.push('/products/new')
    },
    openEditProductPage: (id) => {
      history.push(`/products/${id}/edit`)
    },
    openDeleteProductDialog: (id) => {
      history.push(`/products/${id}/delete`)
    },

    openFetchProductsDialog: () => {
      history.push(`/products/fetch`)
    },
  }

  return (
    <ProductsUIProvider productsUIEvents={productsUIEvents}>
      <Route path="/products/:id/delete">
        {({ history, match }) => (
          <ProductDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/products')
            }}
          />
        )}
      </Route>
      <Route path="/products/fetch">
        {({ history, match }) => (
          <ProductsFetchDialog
            show={match != null}
            onHide={() => {
              history.push('/products')
            }}
          />
        )}
      </Route>
      <ProductsCard />
    </ProductsUIProvider>
  )
}
