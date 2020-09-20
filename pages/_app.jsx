/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import App from 'next/app'
import { Provider } from 'mobx-react'

import store from '../stores'

export default class LaboramusSoftwareDeveloperCaseApp extends App {
  constructor(props) {
    super(props)
    this.rootSore = store
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider {...this.rootSore}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}
