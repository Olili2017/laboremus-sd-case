import { observable, action } from 'mobx'

export default class OrdersStore {

  @observable orders = []

  @observable report = false

  get shouldReport(){
    return this.report
  }

  get getOrders(){
    return this.orders
  }

  @action addOrders(orders){
    this.orders = [...this.orders, ...orders]
    this.report = true
  }
}
