import React, { useEffect, useState, useCallback, Fragment } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { isEqual, isFunction } from 'lodash'
import * as actions from '../../../../../redux/lettry/lettryActions'
import { getHandlerTableChange } from '../../../../../_metronic/_helpers'
import { Pagination } from '../../../../../_metronic/_partials/controls'

const initialFilter = {
  pageNumber: 1,
  pageSize: 10,
}
const sizePerPageList = [
  { text: '3', value: 3 },
  { text: '5', value: 5 },
  { text: '10', value: 10 },
]
export default function RecordTable({ id }) {
  const { isLogin, user } = useSelector((state) => state.auth)
  initialFilter.address = isLogin ? user.address : ''
  initialFilter.id = id
  const [queryParams, setQueryParamsBase] = useState(initialFilter)
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams)
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams
      }

      return nextQueryParams
    })
  }, [])
  const { currentState } = useSelector(
    (state) => ({ currentState: state.lettry }),
    shallowEqual
  )
  const { totalCount, recordList } = currentState

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.fetchRecord(queryParams))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, queryParams, dispatch])
  // Table columns
  const columns = [
    {
      dataField: 'id',
      text: 'ID',
    },
    {
      dataField: 'period',
      text: 'Period',
      formatter: (cellContent, row) => `第${row.period}期`,
    },
    {
      dataField: 'price',
      text: 'Price',
      formatter: (cellContent, row) => (row.price ? `$${row.price}` : ''),
    },
    {
      dataField: 'guess_price',
      text: 'Guess Price',
      formatter: (cellContent, row) => `$${row.guess_price}`,
    },
    {
      dataField: 'amount',
      text: 'Amount',
      formatter: (cellContent, row) => `${row.amount}FNT`,
    },
    {
      dataField: 'profit',
      text: 'Profit',
      formatter: (cellContent, row) => {
        if (row.profit < 0) {
          return <span style={{ color: 'red' }}>{row.profit}FNT</span>
        }
        if (row.profit > 0) {
          return <span style={{ color: 'green' }}>+{row.profit}FNT</span>
        }
        return ''
      },
    },
    {
      dataField: 'state',
      text: 'State',
      formatter: (cellContent, row) => {
        let item = ''
        switch (row.state) {
          case 0:
            item = '等待开奖'
            break
          case 1:
            item = '封盘中'
            break
          default:
            item = '已开奖'
            break
        }
        return item
      },
    },
  ]
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: sizePerPageList,
    sizePerPage: queryParams.pageSize,
    page: queryParams.pageNumber,
  }
  return (
    <Fragment>
      <div className="font-weight-bold font-size-h3 py-2 py-lg-2 mr-5 border-bottom">
        betting record
      </div>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data={recordList}
                columns={columns}
                onTableChange={getHandlerTableChange(setQueryParams)}
                {...paginationTableProps}
              >
                {/* <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} /> */}
              </BootstrapTable>
            </Pagination>
          )
        }}
      </PaginationProvider>
    </Fragment>
  )
}
