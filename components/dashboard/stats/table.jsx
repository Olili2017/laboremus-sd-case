import React, { Component } from 'react'
import ReactDataSheet from 'react-datasheet'

import styles from '../../../public/styles/table.module.css'
import { observer, inject } from 'mobx-react'

@inject('ordersStore')
@observer
export default class OrdersTable extends Component {

  constructor(props){
    super(props)
    this.store = props.ordersStore
  }


  render(){

  const columns = ['Date', 'Item type', 'Priority', 'Units sold', 'Unit price', 'Total cost', 'Total revenue']
  this.store.filteredOrders
  const data = this.store.generateTableData()
    return (
      <>
        <ReactDataSheet
          data={data}
          valueRenderer={(cell) => cell.value}
          sheetRenderer={(props) => (
            <table className={styles.head}>
              <thead>
                <tr>
                  {columns.map((column) => (<th>{column}</th>))}
                </tr>
              </thead>
              <tbody className={styles.body}>
                {props.children}
                { data.map((order, key) => (<tr key={key}>{order.value}</tr>))}
              </tbody>
            </table>
          )}
        />
      </>
    )
  }
}
