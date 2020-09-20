import { observable, action } from 'mobx'

export default class OrdersStore {

  @observable orders = []

  get getOrders(){
    return this.orders
  }

  @action addOrders(orders){
    this.orders = [...this.orders, ...orders]
  }
}
