import pymysql

db = pymysql.connect(host='localhost', user='root', password='', charset='utf8')
curs = db.cursor()

sql = "SELECT * FROM free_ssafy.user"

curs.execute(sql)

rows = curs.fetchall()
print(rows)

db.commit()
db.close()
