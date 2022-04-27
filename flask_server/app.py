from flask import Flask
from flask_cors import CORS
from flask.json import JSONEncoder
import pymysql
import json
import datetime

import ssl

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):

        if isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')

        return JSONEncoder.default(self, obj)

app = Flask(__name__)

cors = CORS(app, resources={"/data/": {"origin": ""}})

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

    sql = "SELECT * FROM free_ssafy.user"

    curs.execute(sql)

    rows = curs.fetchall()

    db.commit()
    db.close()

    return json.dumps(rows, cls=CustomJSONEncoder)

if __name__ == "__main__":
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    ssl_context.load_cert_chain(certfile='/root/cert.pem', keyfile='/root/privkey.pem', password='ssafy')
    app.run(host="0.0.0.0", port=5000, ssl_context=ssl_context, debug=True)
