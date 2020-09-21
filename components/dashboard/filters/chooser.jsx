import React, { useRef, useState } from 'react'

export default function Chooser(props) {
  const fromRef = useRef(null)
  const toRef = useRef(null)

  const [showCustomFiler, setShowCustomFilter] = useState(false)

  const filterOrders = (fromDate, toDate) => {
    const from = fromDate
    let to = toDate

    if (from.length === 0) {
      return
    }

    if (to.length === 0) {
      const today = new Date()
      to = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    }

    props.filter(from, to)
  }

  const clearFilter = () => {
    props.clear()
  }

  const getLastMonthOrders = (option) => {
    setShowCustomFilter(false)
    const date = new Date()

    switch (option) {
      case 0:
        clearFilter()
        break;
      case 1:
        date.setMonth(date.getMonth() - 1)
        filterOrders(date, new Date())
        break;
      case 2:
        date.setMonth(date.getMonth() - 3)
        filterOrders(date, new Date())
        break;
      case 3:
        date.setMonth(date.getMonth() - 12)
        filterOrders(date, new Date())
        break;
      case 4:
        setShowCustomFilter(true)
        break;
      default:
        setShowCustomFilter(true)
        break;
    }
  }

  return (
    <>
      <div>
        <div>
          <p>Time range</p>
          <select onChange={(e) => { getLastMonthOrders(Number(e.target.value)) }}>
            <option value={0}>All time</option>
            <option value={1}>Last month</option>
            <option value={2}>Last quater</option>
            <option value={3}>Last Year</option>
            <option value={4}>Custom range</option>
          </select>
        </div>
        {
          showCustomFiler ? (
            <div>
              <div>
                <fieldset>
                  <legend>From</legend>
                  <input ref={fromRef} type="date" />
                </fieldset>
              </div>
              <div>
                <fieldset>
                  <legend>To</legend>
                  <input ref={toRef} type="date" />
                </fieldset>
              </div>
              <div>
                <button type="button" onClick={() => { filterOrders(fromRef.current.value, toRef.current.value) }}>Filter</button>
              </div>
            </div>
          ) : null
        }
      </div>
    </>
  )
}
