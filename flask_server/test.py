from flask import Flask, request
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

cors = CORS(app, resources={"/data/": {"origin": ""}})

@app.route('/data/basket/<string:user_id>', methods = ['GET'])
def basket_check(user_id):
    # db 연결
    db = pymysql.connect(
        host="localhost",
        user="root",
        password="root",
        db='free_ssafy',
        charset='utf8',
        cursorclass=pymysql.cursors.DictCursor,
        init_command='SET NAMES UTF8'
    )

    # data 조회하기





@app.route('/data/basket-add', methods = ['POST'])
def basket_add():
    # db 연결
    db = pymysql.connect(
        host="localhost",
        user="root",
        password="root",
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

    curs = db.cursor()
    # 필요한 data 불러오기
    sql = "select store_user_id from product where product_id = {};".format(product_id)
    curs.execute(sql)
    rows = curs.fetchall()
    store_user_id = rows[0]['store_user_id']

    # Insert data
    # case1 성공
    # sql = '''insert into basket (user_id, product_id, store_user_id, basket_count, basket_bookCheck)
    # values ("customer", 1, "store1", 3, 0);'''
    # case2 실패
    # sql = '''insert into basket (user_id, product_id, store_user_id, basket_count, basket_bookCheck)
    #          values ({}, {}, {}, {}, {})'''.format(user_id, product_id, store_user_id, basket_count, 0);
    # curs.execute(sql)

    # case3 성공
    sql = '''insert into basket (user_id, product_id, store_user_id, basket_count, basket_bookCheck)
             values (%s, %s, %s, %s, %s)'''
    curs.execute(sql, (user_id, product_id, store_user_id, basket_count, 0))

    # db 저장 / 연결 종료
    db.commit()
    db.close()

    result = 'success?'
    return jsonify(result=result)

@app.route('/data/basket-rem', methods = ['DELETE'])
def basket_remove():
    # db 연결
    db = pymysql.connect(
        host="localhost",
        user="root",
        password="root",
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

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)