import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Upload from '../components/reader'

@inject("ordersStore")
@observer
export default class Dashboard extends Component {

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

      </>
    )
  }
}
