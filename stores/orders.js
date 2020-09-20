import { observable, action } from 'mobx'

export default class OrdersStore {

  @observable orders = [
    {
      date: "today",
      itemType: 1,
      priority: 1,
      unitsSold: 23,
      unitPrice: 1000,
      totalCost: 10000,
      totalRevenue: 100000
    }
  ]

  get getOrders(){
    return this.orders
  }
}
