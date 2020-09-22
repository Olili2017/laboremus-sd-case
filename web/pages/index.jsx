import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Upload from '../components/reader'
import Dashboard from '../components/dashboard'

@inject("ordersStore")
@observer
export default class Home extends Component {

  constructor (props){
    super(props)
    this.store = props.ordersStore
  }

  render(){

    const { shouldReport } =  this.store

    return (
      <>
        {
          shouldReport ?
          (<Dashboard />) :
          (<Upload />)
        }
        {/* <Dashboard /> */}
      </>
    )
  }
}
