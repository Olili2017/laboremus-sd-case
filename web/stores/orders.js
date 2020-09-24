import { observable, action } from "mobx";
import axios from 'axios'

// {
//   order_date: '2020-01-07',
//   item_type: 'chili',
//   order_priority: 1,
//   units_sold: 3,
//   unit_price: 3000,
//   total_cost: 1000,
//   total_revenue: 5000,
//   total_profit: 4000,
// }

export default class OrdersStore {
  @observable orders = []

  @observable filteredOrders = []

  @observable mostProfitableItemTypes = []

  @observable report = false;

  @observable totalProfit = 0;

  get shouldReport() {
    return this.report;
  }

  get getOrders() {
    return this.filteredOrders.length > 0 ? this.filteredOrders : this.orders;
  }

  get getTotalProfit(){
    return this.totalProfit
  }

  get getMostProfitableItemType(){
    return this.mostProfitableItemTypes
  }

  setFilteredorders(filtered){
    this.filteredOrders = filtered
  }

  @action requestMetric(from, to){
    let url = "http://localhost:8000/v1/orders/handler"

    if (from){
      url = url + '?from=' + from
    }

    if (to){
      url = url + '&to=' + to
    }

    axios.post(
      url,
      this.getOrders
      ).then(response => {
        this.totalProfit = response.data.data.total_profit
        this.mostProfitableItemTypes = response.data.data.most_profitable_items
      }).catch(err => {

      })
  }

  @action addOrders(orders) {
    this.orders = [...this.orders, ...orders];
    this.report = true;
  }

  @action generateTotalProfitMade(){
    this.totalProfit = this.getOrders.reduce((total, current) => total + current.total_profit, 0)
  }

  /**
   * Gets the top 5 most profitable items
   */
  @action generateMostProfitableItemTypes() {
    // temporary storage for checked item types
    let tempDataByItemType = [];

    this.getOrders.map((item) => {
      // check if item type already captured
      if (tempDataByItemType.some((obj) => obj.type === item.item_type)) {
        // update captured item`s cost and profit
        let indexToUpdate = tempDataByItemType.findIndex(storedItem => storedItem.type == item.item_type)

        tempDataByItemType[indexToUpdate].cost += item.total_cost
        tempDataByItemType[indexToUpdate].profit += item.total_profit

      } else {

        // capture if not captured
        tempDataByItemType.push({
          type: item.item_type,
          profit: item.total_profit,
          cost: item.total_cost
        });
      }
    });

    // avaluate profitability as a ratio of total item_type cost
    // using (profit devide by cost)
    // the larger the value, the more profitable
    // I use this because percentage profit determines profitability as opposed to large revenues

    tempDataByItemType.sort(function(a, b){
      if ((a.profit / a.cost) > (b.profit / b.cost)){
        return -1
      }

      if ((a.profit / a.cost) < (b.profit / b.cost)){
        return 1
      }

      return 0
    })

    this.mostProfitableItemTypes = tempDataByItemType.slice(0,5)

    // return this.mostProfitableItemTypes
  }

  @action filter(from, to){
    const filtered = this.orders.filter(order => {

      const orderDate = new Date(order.order_date)

      if (
        orderDate.getTime() >= from.getTime() &&
        orderDate.getTime() <= to.getTime()){
          return true
      }

      return false
    })

    this.setFilteredorders(filtered)
  }

  @action clearFiltered(){
    // this.setFilteredorders([])
    this.requestMetric()
  }

  @action generateTableData(){
    let tempTableData = []
    this.getOrders.map(order => {
      const row = [{value: order.order_date}, {value: order.item_type}, {value: order.order_priority}, {value: order.units_sold}, {value: order.unit_price}, {value: order.total_cost}, {value: order.total_revenue}]
      tempTableData.push(
        {
          date: order.order_date,
          type: order.item_type,
          priority: order.order_priority,
          units: order.units_sold,
          price: order.unit_price,
          cost: order.total_cost,
          revenue: order.total_revenue,
        }
      )
    })

    return tempTableData
  }
}
