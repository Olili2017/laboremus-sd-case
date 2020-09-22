import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PapaParse from 'papaparse'

import styles from '../../public/styles/upload.module.css'
import image from '../../public/svg/upload.svg'
import { observer, inject } from 'mobx-react'

@inject("ordersStore")
@observer
export default class Upload extends Component {

  constructor(props){
    super(props)
    this.store = props.ordersStore
  }

  onUploadFailed = () => {
    alert('upload fialed')
  }

  onUploadSuccessful = (data) => {
    this.store.addOrders(data)
  }

  onUpload = (e) => {
    const reader = new FileReader()
    const { files } = e.target

    if (files === null) return

    if (files.length > 0) {
      reader.onload = (_event) => {
        const data = PapaParse.parse(reader.result, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          transformHeader: (header) => header
            .toLowerCase()
            .replace(/\W/g, '_'),
          error: this.onUploadFailed,
          encoding: 'UTF-8',
        })

        this.onUploadSuccessful(data?.data ?? [])
      }

      reader.readAsText(files[0], 'UTF-8')
    }
  }

  render(){
    return (
      <>
        <div className={styles.container}>
          <div className={styles.form}>
            <div>
              <img src={image} alt="upload" />
            </div>
            <div>
              <h3>Drag&Drop csv here</h3>
            </div>
            <div>
              <p>or</p>
            </div>
            <div>
              <label htmlFor="csv-upload">
                Upload CSV
              </label>
              <input id="csv-upload" type="file" onChange={(e) => this.onUpload(e)} accept=".csv, text/csv" />
            </div>
          </div>
        </div>
      </>
    )
  }
}
