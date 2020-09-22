import React from 'react';

import styles from '../../../public/styles/summary.module.css';

export default function Summary(props) {
  return (
    <>
      <div className={styles.cotainer}>
        <div>
          <h3>Total profit</h3>
          <p>{props.totalProfit}</p>
        </div>
        <div>
          <h3>Top 5 profitable types</h3>
          <ul>
            {
              props.mostProfitableItems
                .slice()
                .map(
                  (item, key) => <li key={key}>{item.type}</li>,
                )
            }
          </ul>
        </div>
      </div>
    </>
  );
}
