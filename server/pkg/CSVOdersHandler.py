from flask import request, make_response, jsonify
from flask_restful import Api, Resource, reqparse
import pandas as pd

class OrdersHandler(Resource):
  '''
  '''
  def get(self):
    return "hello"

  def post(self):
    orders = request.get_json(force=True)
    from_date = request.args.get('from')
    to_date = request.args.get('to')

    data = pd.DataFrame(orders)

    if from_date is not None:
      data = data.loc[
                (pd.to_datetime(data['order_date']) >= pd.to_datetime(from_date)) &
                (pd.to_datetime(data['order_date']) <= pd.to_datetime(to_date))
              ]

    total_profit = data['total_profit'].sum()
    item_types = data['item_type'].unique()
    profitability_data = []

    for item in item_types:
      cost = int(data.loc[data['item_type'] == item]['total_cost'].sum())
      revenue = int(data.loc[data['item_type'] == item]['total_revenue'].sum())
      if cost != 0:
        profitability = ((revenue - cost) / cost)
      else:
        profitability = cost
      type_dict = { 'type': item, 'profitability': profitability }
      profitability_data.append(type_dict)

    most_profitable_items = sorted(profitability_data, key=lambda item: item['profitability'], reverse=True)[:5]


    return {
      'status': 'success',
      'data': {
        'total_profit': int(total_profit),
        'most_profitable_items': most_profitable_items
        }
      }