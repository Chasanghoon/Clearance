from flask import Flask, request
from flask_restx import Resource, Api
from flask_cors import CORS
from flask.json import JSONEncoder, jsonify
import pymysql
import json
import datetime

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):

        if isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')

        return JSONEncoder.default(self, obj)

app = Flask(__name__)

# flask_restx
api = Api(app)

cors = CORS(app, resources={"/data/": {"origin": ""}})

@api.route('/data/basket/<string:user_id>')
class Basket(Resource):
    def get(self, user_id):
        # db 연결
        db = pymysql.connect(
            host="k6e203.p.ssafy.io",
            port=3306,
            user="ssafy",
            password="ssafy",
            db='free_ssafy',
            charset='utf8',
            cursorclass=pymysql.cursors.DictCursor,
            init_command='SET NAMES UTF8'
        )

        # user_id로 장바구니 조회
        curs = db.cursor()
        sql = '''select basket_id, product_id, basket_count from basket 
                 where user_id = %s and basket_bookcheck = %s;'''
        curs.execute(sql, (user_id, 0))
        rows = curs.fetchall()

        # print(rows)
        # [{'basket_id': 9, 'product_id': 1, 'basket_count': 1}, {'basket_id': 10, 'product_id': 2, 'basket_count': 2}, {'basket_id': 11, 'product_id': 3, 'basket_count': 2}]

        # version1
        res = {}
        for e in rows:
            basket_id = e["basket_id"]
            product_id = e["product_id"]
            basket_count = e["basket_count"]

            sql = '''select * from product where product_id = %s;'''
            curs.execute(sql, (product_id))
            rows2 = curs.fetchall()


            # print(rows2)
            # [{'store_user_id': 'store1', 'product_name': '피자', 'product_price': 20000, 'product_discountprice': 15000,'product_imagefront': None}]

            # product *로 변경
            store_user_id = rows2[0]["store_user_id"]
            product_name = rows2[0]["product_name"]
            product_price = rows2[0]["product_price"]
            product_discountprice = rows2[0]["product_discountprice"]
            product_imagefront = rows2[0]["product_imagefront"]

            # +++추가
            category_id = rows2[0]["category_id"]
            product_discount = rows2[0]["product_discount"]
            product_stock = rows2[0]["product_stock"]
            product_expdate = rows2[0]["product_expdate"]
            product_imageback = rows2[0]["product_imageback"]


            sql = "select user_name from user where user_id = %s"
            curs.execute(sql, (store_user_id))
            rows2 = curs.fetchall()

            # print(rows2)
            # [{'user_name': '하단점'}]

            user_name = rows2[0]["user_name"]
            if res.get(user_name) == None:
                res[user_name] = []
                res[user_name].append({"user_name" : user_name})
            res[user_name].append(
                {
                    "basket_id" : basket_id,
                    "basket_count" : basket_count,
                    # "store_user_id" : store_user_id,
                    "product_name" : product_name,
                    "product_price" : product_price,
                    "product_discountprice" : product_discountprice,
                    "product_imagefront" : product_imagefront,

                    # +++ 추가
                    "product_id" : product_id,
                    "store_user_id" : store_user_id,
                    "category_id" : category_id,
                    "product_discount" : product_discount,
                    "product_stock" : product_stock,
                    "product_expdate" : product_expdate,
                    "product_imageback" : product_imageback,

                }
            )

        # db 저장 / 연결 종료
        db.commit()
        db.close()

        return jsonify(res)
        # return json.dumps(res, cls=CustomJSONEncoder)


@api.route('/data/basket-add')
class BasketAdd(Resource):
    def post(self):
        # db 연결
        db = pymysql.connect(
            host="k6e203.p.ssafy.io",
            port=3306,
            user="ssafy",
            password="ssafy",
            db='free_ssafy',
            charset='utf8',
            cursorclass=pymysql.cursors.DictCursor,
            init_command='SET NAMES UTF8'
        )

        # request에서 data 받아오기
        data = request.get_json()
        user_id = data['user_id']
        product_id = data['product_id']
        basket_count = data['basket_count']

        # 필요한 data 불러오기
        curs = db.cursor()
        sql = "select store_user_id from product where product_id = {};".format(product_id)
        curs.execute(sql)
        rows = curs.fetchall()
        store_user_id = rows[0]['store_user_id']

        # Insert data
        # case1 성공
        # sql = '''insert into basket (user_id, product_id, store_user_id, basket_count, basket_bookcheck)
        # values ("customer", 1, "store1", 3, 0);'''
        # case2 실패
        # sql = '''insert into basket (user_id, product_id, store_user_id, basket_count, basket_bookcheck)
        #          values ({}, {}, {}, {}, {})'''.format(user_id, product_id, store_user_id, basket_count, 0);
        # curs.execute(sql)

        # case3 성공
        sql = '''insert into basket (user_id, product_id, store_user_id, basket_count, basket_bookcheck)
                 values (%s, %s, %s, %s, %s)'''
        curs.execute(sql, (user_id, product_id, store_user_id, basket_count, 0))

        # db 저장 / 연결 종료
        db.commit()
        db.close()

        result = 'success?'
        return jsonify(result=result)


@api.route('/data/basket-rem')
class BasketRemove(Resource):
    def delete(self):
        # db 연결
        db = pymysql.connect(
            host="k6e203.p.ssafy.io",
            port=3306,
            user="ssafy",
            password="ssafy",
            db='free_ssafy',
            charset='utf8',
            cursorclass=pymysql.cursors.DictCursor,
            init_command='SET NAMES UTF8'
        )

        # request에서 data 받아오기
        data = request.get_json()
        user_id = data['user_id']
        product_id = data['product_id']

        curs = db.cursor()
        sql = "delete from basket where user_id = %s and product_id = %s"
        curs.execute(sql, (user_id, product_id))

        # db 저장 / 연결 종료
        db.commit()
        db.close()

        result = 'success?'
        return jsonify(result=result)


@api.route('/data/reservation-progress/<int:basket_id>')
class ReservationProgress(Resource):
    def get(self, basket_id):
        # db 연결
        db = pymysql.connect(
            host="k6e203.p.ssafy.io",
            port=3306,
            user="ssafy",
            password="ssafy",
            db='free_ssafy',
            charset='utf8',
            cursorclass=pymysql.cursors.DictCursor,
            init_command='SET NAMES UTF8'
        )
        res = []

        curs = db.cursor()
        sql = "select store_user_id from basket where basket_id = %s"
        curs.execute(sql, (basket_id))
        rows = curs.fetchall()

        # print(rows)
        # [{'store_user_id': 'storeTest1'}]

        store_user_id = rows[0]['store_user_id']
        sql = "select user_name, user_phone, user_address, user_image from user where user_id = %s"
        curs.execute(sql, (store_user_id))
        rows2 = curs.fetchall()

        # print(rows2)
        # [{'user_name': '구매자1', 'user_phone': '전화번호임니다', 'user_address': '부산시 사하구 낙동대로 319', 'user_image': None}]

        user_name = rows2[0]['user_name']
        user_phone = rows2[0]['user_phone']
        user_address = rows2[0]['user_address']
        user_image = rows2[0]['user_image']

        res.append(
            {
                "user_name" : user_name,
                "user_phone" : user_phone,
                "user_address" : user_address,
                "user_image" : user_image,
            }
        )

        return jsonify(res)


@api.route('/data/reservation-add')
class ReservationCreate(Resource):
    def post(self):
        # db 연결
        db = pymysql.connect(
            host="k6e203.p.ssafy.io",
            port=3306,
            user="ssafy",
            password="ssafy",
            db='free_ssafy',
            charset='utf8',
            cursorclass=pymysql.cursors.DictCursor,
            init_command='SET NAMES UTF8'
        )

        try:
            # request에서 data 받아오기
            data = request.get_json()
            basket_id = data['basket_id']
            book_date = data['book_date']
            book_hour = data['book_hour']

            # db에서 data 받아오기
            curs = db.cursor()
            sql = "select user_id, product_id, store_user_id, basket_count from basket where basket_id = %s"
            curs.execute(sql, (basket_id))
            rows = curs.fetchall()

            user_id = rows[0]['user_id']
            product_id = rows[0]['product_id']
            store_user_id = rows[0]['store_user_id']
            basket_count = rows[0]['basket_count']

            sql = "select product_discountprice, product_stock from product where product_id = %s"
            curs.execute(sql, (product_id))
            rows2 = curs.fetchall()
            product_discountprice = rows2[0]['product_discountprice']
            product_stock = rows2[0]['product_stock']

            book_price = product_discountprice * basket_count

            # 예약 CREATE
            sql = '''insert into book (basket_id, user_id, product_id, store_user_id, book_price, book_date, book_hour, book_status)
                     values (%s, %s, %s, %s, %s, %s, %s, %s)'''

            curs.execute(sql, (basket_id, user_id, product_id, store_user_id, book_price, book_date, book_hour, 0))

            # 상품 재고 감소
            new_product_stock = product_stock - basket_count
            if new_product_stock < 0:
                return jsonify("재고가 부족합니다.")
            sql = "update product set product_stock=%s where product_id=%s"
            curs.execute(sql, (new_product_stock, product_id))

            # 장바구니 bookcheck 변경
            sql = "update basket set basket_bookcheck=%s where basket_id=%s"
            curs.execute(sql, (1, basket_id))

            # db 저장 / 연결 종료
            db.commit()
            db.close()

            result = 'success'
            return jsonify(result=result)

        except:
            result = 'fail'
            return jsonify(result=result)


@api.route('/data/reservation-complete/<int:basket_id>')
class ReservationComplete(Resource):
    def get(self, basket_id):
        # db 연결
        db = pymysql.connect(
            host="k6e203.p.ssafy.io",
            port=3306,
            user="ssafy",
            password="ssafy",
            db='free_ssafy',
            charset='utf8',
            cursorclass=pymysql.cursors.DictCursor,
            init_command='SET NAMES UTF8'
        )
        res = []

        # db에서 data 받아오기
        curs = db.cursor()
        sql = "select * from basket where basket_id = %s"
        curs.execute(sql, (basket_id))
        rows = curs.fetchall()
        user_id = rows[0]['user_id']
        product_id = rows[0]['product_id']
        store_user_id = rows[0]['store_user_id']
        basket_count = rows[0]['basket_count']



        return jsonify(res)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)