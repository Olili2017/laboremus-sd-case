import { observable, action } from "mobx";

export default class OrdersStore {
  @observable orders = [];

  @observable filteredOrders = []

  @observable report = false;

  get shouldReport() {
    return this.report;
  }

  get getOrders() {
    return this.filteredOrders.length > 0 ? this.filteredOrders : this.orders;
  }

  setFilteredorders(filtered){
    this.filteredOrders = filtered
  }

  @action addOrders(orders) {
    this.orders = [...this.orders, ...orders];
    this.report = true;
  }

  @action getTotalProfitMade(){
    return this.getOrders.reduce((total, current) => total + current.total_profit, 0)
  }

  /**
   * Gets the top 5 most profitable items
   */
  @action getMostProfitableItemTypes() {
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

    return tempDataByItemType.slice(0, 5)
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
    this.setFilteredorders([])
  }

  @action generateTableData(){
    let tempTableData = []
    this.getOrders.map(order => {
      const row = [{value: order.order_date}, {value: order.item_type}, {value: order.order_priority}, {value: order.units_sold}, {value: order.unit_price}, {value: order.total_cost}, {value: order.total_revenue}]
      tempTableData.push(row)
    })

    return tempTableData
  }
}
