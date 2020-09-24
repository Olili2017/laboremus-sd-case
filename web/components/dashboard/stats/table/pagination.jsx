import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from '../../../../public/styles/pagination.module.css'

export default function Pagination(props) {
  const onPageChange = (e) => {
    props.onPageChange(e)
  }

  return (
    <>
      <ReactPaginate
        previousLabel="prev"
        nextLabel="next"
        breakLabel="..."
        pageCount={props.pages}
        pageRangeDisplayed={5}
        containerClassName={styles.container}
        nextClassName={styles.next}
        previousClassName={styles.back}
        marginPagesDisplayed={2}
        onPageChange={(e) => { onPageChange(e) }}
      />
    </>
  )
}
