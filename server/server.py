from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource, reqparse
from pkg.CSVOdersHandler import OrdersHandler

app = Flask(__name__)
# CORS(app)

# CORS(app, resources={
#     r"/*": {
#         "origins": "*"
#     }
# })
app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app)
CORS(app, origins="*", resources='/*')



class RootApi(Resource):
    '''
    curl -X GET http://localhost:3000/v1/hello --header "Content-Type: application/json"
    curl -X POST http://localhost:3000/v1/hello --header "Content-Type: application/json" --data '{"RequestType":"Hello from Daniel Olili"}'
    '''
    def get(self):
        return {'status': 'SUCCESS', 'message': 'Hello from Daniel Olili'}

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('RequestType', type=str)
        args = parser.parse_args()

        message = "RequestType: {}".format(args['RequestType'])
        final_result = {'status': 'SUCCESS', 'message': message}
        return final_result

api.add_resource(OrdersHandler, '/v1/orders/handler')
api.add_resource(RootApi, '/v1/hello')
app.run(host='0.0.0.0', port=8000, debug=True)