from flask import Flask # 서버 구현을 위한 Flask 객체 import
from flask_restx import Api, Resource # Api 구현을 위한 Api 객체 import

app = Flask(__name__) # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
# api = Api(app) # Flask 객체에 Api 객체 등록


# @api.route("/data")
# class HelloWorld(Resource):
    # def get(self): # GET 요청시 리턴 값에 해당하는 dict를 JSON 형태로 변환
    #     return {"hello" : "world!"}

@app.route('/data')
def hello():
    return 'Hello, My First Flask!'

if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5001")