import React from 'react'

import styles from '../../public/styles/dashboard.module.css'
import Filters from './filters'
import Stats from './stats'

export default function Dashboard() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.stats}>
          <Stats />
        </div>
        <div className={styles.filters}>
          <Filters />
        </div>
      </div>
    </>
  )
}
