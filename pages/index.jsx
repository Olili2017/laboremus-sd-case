import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'


@inject("ordersStore")
@observer
export default class Dashboard extends Component {

  constructor (props){
    super(props)
    this.store = props.ordersStore
  }

  render(){

    console.table(this.store.getOrders)

    return (
      <>
        <div>Dashboard</div>
      </>
    )
  }
}
