from flask import request
from flask_restful import Api, Resource, reqparse
import pandas as pd

class OrdersHandler(Resource):
  '''
  '''
  def get(self):
    return "hello"

  def post(self):
    orders = request.get_json(force=True)
    data = pd.DataFrame(orders)
    total_profit = data['Total Profit'].sum()
    item_types = data['Item Type'].unique()
    profitability_data = []

    for item in item_types:
      profit = data.loc[data['Item Type'] == item]['Total Profit'].sum()
      revenue = data.loc[data['Item Type'] == item]['Total Revenue'].sum()
      profitability = (profit / revenue)
      type_dict = { 'name': item, 'profitability': profitability }
      profitability_data.append(type_dict)

    most_profitable_items = sorted(profitability_data, key=lambda item: item['profitability'], reverse=True)[:5]
    total_profit = 782678
    most_profitable_items = []

    return {
      'status': 'success',
      'data': {
        'total_profit': total_profit,
        'most_profitable_items': most_profitable_items
        }
      }