import pymysql

db = pymysql.connect(host='k6e203.p.ssafy.io', user='ssafy', password='ssafy', charset='utf8')
curs = db.cursor()

sql = "SELECT * FROM free_ssafy.user"

curs.execute(sql)

rows = curs.fetchall()
print(rows)

db.commit()
db.close()
