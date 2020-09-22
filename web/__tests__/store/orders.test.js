import OrdersStore from '../../stores/orders'

describe('OrdersStore', () => {
  it('Starts with no orders in stores', () => {
    const store = new OrdersStore()

    expect(store.getOrders).toEqual([])
  })

  it('Add orders to orders store', () => {
    const store = new OrdersStore()

    store.addOrders([{
      date: 'today',
      itemType: 1,
      priority: 1,
      unitsSold: 23,
      unitPrice: 1000,
      totalCost: 10000,
      totalRevenue: 100000,
    }])

    expect(store.getOrders).toEqual([{
      date: 'today',
      itemType: 1,
      priority: 1,
      unitsSold: 23,
      unitPrice: 1000,
      totalCost: 10000,
      totalRevenue: 100000,
    }])
  })
})
