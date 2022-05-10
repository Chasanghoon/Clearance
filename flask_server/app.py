from flask import Flask, request
from flask_restx import Resource, Api, fields
from flask_cors import CORS
from flask.json import JSONEncoder, jsonify
import pymysql
import datetime
import ssl


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):

        if isinstance(obj, (datetime.datetime, datetime.date, datetime.time)):
            return obj.isoformat()

        elif isinstance(obj, datetime.timedelta):
            return (datetime.datetime.min + obj).time().isoformat()

        return JSONEncoder.default(self, obj)


app = Flask(__name__)

# flask_restx
api = Api(app)

cors = CORS(app, resources={r"/data/*": {"origins": "*"}})

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

        try:
            # user_id로 장바구니 조회
            curs = db.cursor()
            sql = '''select basket_id, product_id, basket_count from basket 
                    where user_id = %s and basket_bookcheck = %s;'''
            curs.execute(sql, (user_id, 0))
            rows = curs.fetchall()

            # print(rows)
            # [{'basket_id': 9, 'product_id': 1, 'basket_count': 1}, {'basket_id': 10, 'product_id': 2, 'basket_count': 2}, {'basket_id': 11, 'product_id': 3, 'basket_count': 2}]

            # version1
            res = []
            for e in rows:
                basket_id = e["basket_id"]
                product_id = e["product_id"]
                basket_count = e["basket_count"]

                sql = '''select * from product where product_id = %s;'''
                curs.execute(sql, (product_id))
                rows2 = curs.fetchall()

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

                user_name = rows2[0]["user_name"]


                # res에 key값으로 user_name 있는지 확인
                search_state = False
                for i in range(len(res)):
                    if list(res[i].keys())[0] == user_name:
                        search_state = True
                        idx = i
                        break

                if search_state:
                    res[idx][user_name].append(
                        {
                            # "user_name": user_name,
                            # "basket_id" : basket_id,
                            "basket_count": basket_count,
                            # "store_user_id" : store_user_id,
                            "product_name": product_name,
                            "product_price": product_price,
                            "product_discountprice": product_discountprice,
                            "product_imagefront" : product_imagefront,

                            # +++ 추가
                            "product_id": product_id,
                            "store_user_id": store_user_id,
                            "category_id": category_id,
                            "product_discount": product_discount,
                            "product_stock": product_stock,
                            "product_expdate": product_expdate,
                            "product_imageback" : product_imageback,
                        }
                    )

                else:
                    res.append({user_name:[]})
                    res[-1][user_name].append(
                        {
                            # "user_name": user_name,
                            # "basket_id" : basket_id,
                            "basket_count": basket_count,
                            # "store_user_id" : store_user_id,
                            "product_name": product_name,
                            "product_price": product_price,
                            "product_discountprice": product_discountprice,
                            "product_imagefront" : product_imagefront,

                            # +++ 추가
                            "product_id": product_id,
                            "store_user_id": store_user_id,
                            "category_id": category_id,
                            "product_discount": product_discount,
                            "product_stock": product_stock,
                            "product_expdate": product_expdate,
                            "product_imageback" : product_imageback,
                        }
                    )

            # db 저장 / 연결 종료
            db.commit()
            db.close()

            return jsonify(res)
            # return json.dumps(res, cls=CustomJSONEncoder)

        except:
            result = 'fail'
            return jsonify(result=result)




basketAdd_fields = api.model('basketAdd', {
    'user_id' : fields.String,
    'product_id' : fields.Integer,
    'basket_count' : fields.Integer,
})

@api.route('/data/basket-add')
class BasketAdd(Resource):
    @api.expect(basketAdd_fields)
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
            user_id = data['user_id']
            product_id = data['product_id']
            basket_count = data['basket_count']

            # 필요한 data 불러오기
            curs = db.cursor()
            sql = "select store_user_id from product where product_id = %s"
            curs.execute(sql, (product_id))
            rows = curs.fetchall()
            store_user_id = rows[0]['store_user_id']

            # Insert data
            sql = '''insert into basket (user_id, product_id, store_user_id, basket_count, basket_bookcheck)
                     values (%s, %s, %s, %s, %s)'''
            curs.execute(sql, (user_id, product_id, store_user_id, basket_count, 0))

            # db 저장 / 연결 종료
            db.commit()
            db.close()

            result = 'success'
            return jsonify(result=result)

        except:
            result = "fail"
            return jsonify(result=result)


basketRemove_fields = api.model('basketRemove', {
    'user_id' : fields.String,
    'product_id' : fields.Integer,
})

@api.route('/data/basket-rem')
class BasketRemove(Resource):
    @api.expect(basketRemove_fields)
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

        try:
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

            result = 'success'
            return jsonify(result=result)

        except:
            result = "fail"
            return jsonify(result=result)


@api.route('/data/reservation-progress/<string:store_user_id>')
class ReservationProgress(Resource):
    def get(self, store_user_id):
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
            res = []

            curs = db.cursor()
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

        except:
            result = 'fail'
            return jsonify(result=result)


reservationAdd_fields = api.model('reservationAdd', {
    'user_id' : fields.String,
    'store_user_id' : fields.String,
    'book_date' : fields.Date,
    'book_hour' : fields.String(default='00:00')
})

@api.route('/data/reservation-add')
class ReservationCreate(Resource):
    @api.expect(reservationAdd_fields)
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
            user_id = data['user_id']
            store_user_id = data['store_user_id']
            book_date = data['book_date']
            book_hour = data['book_hour']

            # db에서 data 받아오기
            curs = db.cursor()

            # book_set 추가
            sql = "select max(book_set) as book_set from book"
            curs.execute(sql)
            rows4 = curs.fetchone()
            if rows4['book_set'] == None:
                book_set = 1
            else:
                book_set = rows4['book_set'] + 1


            sql = "select basket_id from basket where user_id = %s and store_user_id = %s and basket_bookcheck = %s"
            curs.execute(sql, (user_id, store_user_id, 0))
            rows = curs.fetchall()

            # print(rows)
            # [{'basket_id': 20}, {'basket_id': 21}]

            if not rows:
                result = "장바구니에 상품이 없습니다."
                return jsonify(result=result)


            book_price = 0
            for e in rows:
                # v1
                basket_id = e['basket_id']
                sql = "select product_id, basket_count from basket where basket_id = %s"
                curs.execute(sql, (basket_id))
                rows2 = curs.fetchall()
                product_id = rows2[0]['product_id']
                basket_count = rows2[0]['basket_count']

                sql = "select product_discountprice, product_stock from product where product_id = %s"
                curs.execute(sql, (product_id))
                rows3 = curs.fetchall()
                product_discountprice = rows3[0]['product_discountprice']
                product_stock = rows3[0]['product_stock']
                book_price += product_discountprice * basket_count
                book_count = basket_count


                # # v2
                # basket_id = e['basket_id']
                # sql = '''select I.product_id, I.basket_count, O.product_discountprice, O.product_stock
                #          from basket I
                #          left outer join product O
                #          on I.product_id = O.product_id
                #          where I.basket_id = %s'''
                # curs.execute(sql, (basket_id))


                # 예약 CREATE
                sql = '''insert into book (basket_id, user_id, product_id, store_user_id, book_price, book_count, book_date, book_hour, book_status, book_set)
                         values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''

                curs.execute(sql, (basket_id, user_id, product_id, store_user_id, book_price, book_count, book_date, book_hour, 0, book_set))

                # 상품 재고 감소
                new_product_stock = product_stock - basket_count
                if new_product_stock < 0:
                    return jsonify("상품 {} 재고가 부족합니다.".format(product_id))

                # 상품 재고 0
                elif new_product_stock == 0:
                    print("상품 재고 0")

                sql = "update product set product_stock=%s where product_id=%s"
                curs.execute(sql, (new_product_stock, product_id))


                # 장바구니 bookcheck 변경
                sql = "update basket set basket_bookcheck=%s where basket_id=%s"
                curs.execute(sql, (1, basket_id))

            # db 저장 / 연결 종료
            db.commit()
            db.close()

            return jsonify({"book_set":book_set})

        except:
            result = 'fail'
            return jsonify(result=result)


@api.route('/data/reservation-complete/<int:book_set>')
class ReservationComplete(Resource):
    def get(self, book_set):
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

        res = {"seller" : [], "product" : []}

        # db에서 data 받아오기
        curs = db.cursor()

        # book_set+
        sql = "select basket_id from book where book_set = %s"
        curs.execute(sql, (book_set))
        basket_ids = curs.fetchall()
        # print(basket_ids)
        # [{'basket_id': 49}, {'basket_id': 50}]


        first = True
        for i in range(len(basket_ids)):
            basket_id = basket_ids[i]['basket_id']

            # Book Table
            sql = "select * from book where basket_id = %s"
            curs.execute(sql, (basket_id))
            rows = curs.fetchall()
            user_id = rows[0]['user_id']
            product_id = rows[0]['product_id']
            store_user_id = rows[0]['store_user_id']
            book_price = rows[0]['book_price']
            book_count = rows[0]['book_count']
            book_date = rows[0]['book_date']
            book_hour = rows[0]['book_hour']

            # Product Table
            sql = "select product_name, product_price, product_discountprice, product_imagefront from product where product_id=%s"
            curs.execute(sql, (product_id))
            rows = curs.fetchall()
            product_name = rows[0]['product_name']
            product_price = rows[0]['product_price']
            product_discountprice = rows[0]['product_discountprice']
            product_imagefront = rows[0]['product_imagefront']

            # seller 정보는 한번만 받아오기
            if first:
                # User Table
                sql = "select user_name, user_address, user_phone, user_image from user where user_id=%s"
                curs.execute(sql, (store_user_id))
                rows = curs.fetchall()
                user_name = rows[0]['user_name']
                user_address = rows[0]['user_address']
                user_phone = rows[0]['user_phone']
                user_image = rows[0]['user_image']

                # Location Table
                sql = "select location_xpoint, location_ypoint from location where user_id=%s"
                curs.execute(sql, (store_user_id))
                rows = curs.fetchall()
                if not rows:
                    return jsonify("좌표데이터가 없습니다.")
                location_xpoint = rows[0]['location_xpoint']
                location_ypoint = rows[0]['location_ypoint']

                # # User, Location Table (join)
                # sql = '''select I.user_name, I.user_address, I.user_phone, O.location_xpoint, O.location_ypoint
                #          from user I
                #          left outer join location O
                #          on I.user_id = O.user_id
                #          where I.user_id = %s'''
                # curs.execute(sql, (store_user_id))
                # rows = curs.fetchall()
                # user_name = rows[0]['user_name']
                # user_address = rows[0]['user_address']
                # user_phone = rows[0]['user_phone']
                # location_xpoint = rows[0]['location_xpoint']
                # location_ypoint = rows[0]['location_ypoint']

                first = False

            # date, time encoder
            encoder = CustomJSONEncoder()
            encoder.encode({"book_date": book_date, "book_hour": book_hour})
            book_date = str(book_date)
            book_hour = str(book_hour)

            res['product'].append(
                {
                    "product_imagefront" : product_imagefront,
                    "product_name" : product_name,
                    "product_price" : product_price,
                    "product_discountprice" : product_discountprice,
                    "book_count" : book_count,
                    "book_price" : book_price,
                }
            )
        res['seller'].append(
            {
                "user_name": user_name,
                "user_address": user_address,
                "user_phone": user_phone,
                "user_image": user_image,
                "location_xpoint": location_xpoint,
                "location_ypoint": location_ypoint,
                "book_date": book_date,
                "book_hour": book_hour,
            }
        )

        # db 저장 / 연결 종료
        db.commit()
        db.close()

        return jsonify(res)


        # except:
        #     result = 'fail'
        #     return jsonify(result=result)


@api.route('/data/calender/all/<string:user_id>')
class CalenderAll(Resource):
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

        res = {"info" : []}

        try:
            # db에서 data 받아오기
            curs = db.cursor()
            sql = "select book_set from book where user_id=%s"
            curs.execute(sql, (user_id))
            rows = curs.fetchall()

            # book_set 값 배열
            book_set_arr = []
            for e in rows:
                book_set_arr.append(e['book_set'])
            book_set_arr = list(set(book_set_arr)) # 중복제거

            # book Table
            for book_set in book_set_arr:
                temp = []
                sql = "select * from book where book_set=%s"
                curs.execute(sql, (book_set))
                rows = curs.fetchall()
                for i in range(len(rows)):
                    product_id = rows[i]['product_id']
                    store_user_id = rows[i]['store_user_id']
                    basket_count = rows[i]['book_count']
                    book_date = rows[i]['book_date']
                    book_hour = rows[i]['book_hour']
                    book_status = rows[i]['book_status']

                    # date, time encoder
                    encoder = CustomJSONEncoder()
                    encoder.encode({"book_date": book_date, "book_hour": book_hour})
                    book_date = str(book_date)
                    book_hour = str(book_hour)

                    # 상품 data
                    sql = '''select product_name, product_price, product_discountprice, product_imagefront
                             from product where product_id=%s'''
                    curs.execute(sql, (product_id))
                    rows2 = curs.fetchall()
                    product_name = rows2[0]['product_name']
                    product_price = rows2[0]['product_price']
                    product_discountprice = rows2[0]['product_discountprice']
                    product_imagefront = rows2[0]['product_imagefront']

                    # 매장 이름
                    sql = "select user_name from user where user_id=%s"
                    curs.execute(sql, (store_user_id))
                    rows2 = curs.fetchall()
                    user_name = rows2[0]['user_name']

                    temp.append({
                        "book_set" : book_set,
                        "book_date" : book_date,
                        "book_hour" : book_hour,
                        "user_name" : user_name,
                        "product_name" : product_name,
                        "product_imagefront" : product_imagefront,
                        "product_price" : product_price,
                        "product_discountprice" : product_discountprice,
                        "basket_count" : basket_count,
                    })
                res['info'].append(temp)

            # db 저장 / 연결 종료
            db.commit()
            db.close()

            # 최신순 정렬
            res['info'].sort(key=lambda x:(x[0]['book_date'], x[0]['book_hour']), reverse=True)
            return jsonify(res)

        except:
            result = "fail"
            return jsonify(result=result)


@api.route('/data/calender/progress/<string:user_id>')
class CalenderProgress(Resource):
    def get(self, user_id):
        return


@api.route('/data/calender/complete/<string:user_id>')
class CalenderComplete(Resource):
    def get(self, user_id):
        return


@api.route('/data/calender-detail/all/<string:user_id>/<string:book_date>')
class CalenderDetailAll(Resource):
    def get(self, user_id, book_date):
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

        res = {"info": []}

        try:
            # db에서 data 받아오기
            curs = db.cursor()
            sql = "select book_set from book where user_id=%s and book_date=%s"
            curs.execute(sql, (user_id, book_date))
            rows = curs.fetchall()

            # book_set 값 배열
            book_set_arr = []
            for e in rows:
                book_set_arr.append(e['book_set'])
            book_set_arr = list(set(book_set_arr))  # 중복제거

            # book Table
            for book_set in book_set_arr:
                temp = []
                sql = "select * from book where book_set=%s"
                curs.execute(sql, (book_set))
                rows = curs.fetchall()
                for i in range(len(rows)):
                    product_id = rows[i]['product_id']
                    store_user_id = rows[i]['store_user_id']
                    basket_count = rows[i]['book_count']
                    book_hour = rows[i]['book_hour']
                    book_status = rows[i]['book_status']

                    # date, time encoder
                    encoder = CustomJSONEncoder()
                    encoder.encode({"book_date": book_date, "book_hour": book_hour})
                    book_date = str(book_date)
                    book_hour = str(book_hour)

                    # 상품 data
                    sql = '''select product_name, product_price, product_discountprice, product_imagefront
                                     from product where product_id=%s'''
                    curs.execute(sql, (product_id))
                    rows2 = curs.fetchall()
                    product_name = rows2[0]['product_name']
                    product_price = rows2[0]['product_price']
                    product_discountprice = rows2[0]['product_discountprice']
                    product_imagefront = rows2[0]['product_imagefront']

                    # 매장 이름
                    sql = "select user_name from user where user_id=%s"
                    curs.execute(sql, (store_user_id))
                    rows2 = curs.fetchall()
                    user_name = rows2[0]['user_name']

                    temp.append({
                        "book_set": book_set,
                        "book_hour": book_hour,
                        "user_name": user_name,
                        "product_name": product_name,
                        "product_imagefront" : product_imagefront,
                        "product_price": product_price,
                        "product_discountprice": product_discountprice,
                        "basket_count": basket_count,
                    })
                res['info'].append(temp)

            # db 저장 / 연결 종료
            db.commit()
            db.close()

            # 최신순 정렬
            res['info'].sort(key=lambda x:x[0]['book_hour'], reverse=True)
            return jsonify(res)

        except:
            result = "fail"
            return jsonify(result=result)



@api.route('/data/calender-detail/progress/<string:user_id>/<string:book_date>')
class CalenderDetailProgress(Resource):
    def get(self, user_id, book_date):
        return


@api.route('/data/calender-detail/complete/<string:user_id>/<string:book_date>')
class CalenderDetailComplete(Resource):
    def get(self, user_id, book_date):
        return


if __name__ == "__main__":
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    ssl_context.load_cert_chain(certfile='/root/cert.pem', keyfile='/root/privkey.pem', password='ssafy')
    app.run(host="0.0.0.0", port=5000, ssl_context=ssl_context, debug=True)
