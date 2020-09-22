import React, { PureComponent } from 'react'
import { observer, inject } from 'mobx-react'

import styles from '../../../public/styles/filters.module.css'
import Summary from '../stats/summary'
import Chooser from './chooser'

@inject("ordersStore")
@observer
export default class Filters extends PureComponent {

  constructor (props){
    super(props)
    this.store = props.ordersStore
  }

  filterOrders(from, to){
    this.store.filter(new Date(from), new Date(to))
  }

  componentDidMount(){
    this.store.generateMostProfitableItemTypes()
    this.store.generateTotalProfitMade()
  }

  render(){
    // ignore this, it helps update filtered result in the domain/context
    // this.store.filteredOrders;
    // this.store.mostProfitableItemTypes;
    return (
      <>
        <div className={styles.container}>
          <Summary totalProfit={this.store.totalProfit} mostProfitableItems={this.store.mostProfitableItemTypes} />
          {/* <Summary totalProfit={this.store.getTotalProfit} mostProfitableItems={this.store.getMostProfitableItemType} /> */}
          {/* <Summary totalProfit={this.store.getTotalProfitMade()} mostProfitableItems={this.store.getMostProfitableItemTypes()} /> */}
          <Chooser filter={(from, to) => { this.filterOrders(from, to) }} clear={() => { this.store.clearFiltered()}} />
        </div>
      </>
    )
  }
}
