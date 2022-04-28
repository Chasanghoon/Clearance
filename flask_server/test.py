from urllib import request
from flask import Flask
from flask_cors import CORS
import pymysql
import test


db = pymysql.connect(host='k6e203.p.ssafy.io', user='ssafy', password='ssafy', charset='utf8')
curs = db.cursor()

import ssl


app = Flask(__name__)

app.debug = True

cors = CORS(app, resources={"/data/" : {"origin" : ""}})

@app.route('/data', methods = ['GET'])
def hello():

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



    curs = db.cursor()

    sql = "SELECT user_id, user_role, user_password, user_email FROM free_ssafy.user"

    curs.execute(sql)

    rows = curs.fetchall()

    db.commit()
    db.close()

    return json.dumps({'test': rows})



if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5000", debug=True)


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):

        if isinstance(obj, decimal.Decimal):
            return float(obj)

        if isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')

        return JSONEncoder.default(self, obj)