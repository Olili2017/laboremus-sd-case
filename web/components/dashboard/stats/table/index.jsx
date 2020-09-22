import React from 'react'

import styles from '../../../../public/styles/table.module.css'

export default function OrdersTable(props) {
  const { orders } = props
  return (
    <>
      <table border="1" className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>Date</th>
            <th>Item type</th>
            <th>Priority</th>
            <th>Units sold</th>
            <th>Units price</th>
            <th>Total cost</th>
            <th>Total revenue</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {
            orders.map((order, i) => (
              <tr key={i}>
                <td>{order.date}</td>
                <td>{order.type}</td>
                <td>{order.priority}</td>
                <td>{order.units}</td>
                <td>{order.price}</td>
                <td>{order.cost}</td>
                <td>{order.revenue}</td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </>
  )
}
