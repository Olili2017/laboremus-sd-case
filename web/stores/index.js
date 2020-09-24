import OrdersStore from '../stores/orders'

export default (
  function store() {
    return {
      ordersStore: new OrdersStore(),
    }
  }()
)
