import React from 'react'

import styles from '../../../public/styles/summary.module.css'
import OrdersTable from './table'

export default function Stats() {
  return (
    <>
      <div className={styles.cotainer}>
        <OrdersTable />
      </div>
    </>
  )
}
