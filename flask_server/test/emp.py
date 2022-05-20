from flask import Flask, request
from flask.json import jsonify
from flask.templating import render_template

from emp_sql import MyEmpDao

app = Flask(__name__, static_url_path="", static_folder='static')



@app.route('/')
@app.route('/emp02')
def emp():
    empList = MyEmpDao().getEmps();
    return render_template("emp02.html", empList=empList)


@app.route('/ins.ajax', methods=['POST'])
def ins_ajax():
    # data = request.get_json()
    # print(data)
    # data = request.args()
    # print(data)
    data = request.form()
    print(data)
    data = request.data()
    print(data)




    empno = data['empno']
    name = data['name']
    department = data['department']
    phone = data['phone']
    cnt = MyEmpDao().insEmp(empno, name, department, phone)
    result = "success" if cnt == 1 else "fail"
    return jsonify(result=result)


@app.route('/mod.ajax', methods=['POST'])
def mod_ajax():
    data = request.get_json()
    empno = data['empno']
    name = data['name']
    department = data['department']
    phone = data['phone']
    cnt = MyEmpDao().updEmp(empno, name, department, phone)
    result = "success" if cnt == 1 else "fail"
    return jsonify(result=result)


@app.route('/del.ajax', methods=['POST'])
def del_ajax():
    data = request.get_json()
    empno = data['empno']
    cnt = MyEmpDao().delEmp(empno)
    result = "success" if cnt == 1 else "fail"
    return jsonify(result=result)

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5555)

