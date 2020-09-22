import React, { PureComponent } from 'react'

import styles from '../../../public/styles/stats.module.css'
import OrdersTable from './table'
import Pagination from './table/pagination'
import { observer, inject } from 'mobx-react'

@inject("ordersStore")
@observer
export default class Stats extends PureComponent {
  constructor(props) {
    super(props)
    this.store = props.ordersStore
    this.state = {
      offset: 0,
      orders: [],
      originalTableData: [],
      ordersPerPage: 10,
      currentPage: 0,
    }
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount(){
    this.getOrders()
  }

  getOrders(){
    const originalTableData = this.store.generateTableData()

    const pageOrders = originalTableData.slice(this.state.offset, this.state.offset + this.state.ordersPerPage)

    this.setState({
      pageCount: Math.ceil(originalTableData.length / this.state.ordersPerPage),
      originalTableData: originalTableData,
      orders: pageOrders
    })
  }

  getMoreOrders() {
		const originalTableData = this.state.originalTableData;

		const slice = originalTableData.slice(this.state.offset, this.state.offset + this.state.ordersPerPage)
		this.setState({
      pageCount: Math.ceil(originalTableData.length / this.state.ordersPerPage),
			orders:slice
		})

    }

  onPageChange(e){
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.ordersPerPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.getMoreOrders()
    });
  }

  render() {

    return (
      <>
        <div className={styles.container}>
          <OrdersTable orders={this.state.orders} />
          <Pagination
            pages={this.state.pageCount}
            onPageChange={(e) => { this.onPageChange(e) }} />
        </div>
      </>
    )
  }
}
