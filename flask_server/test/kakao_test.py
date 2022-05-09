@api.route('/data/kakao')
class Kakao(Resource):
    def post(self):
        URL = "https://kapi.kakao.com/v1/payment/ready"
        headers = {
            "Authorization": "KakaoAK " + {ADMIN KEY},
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        }
        params = {
            "cid" : "TC0ONETIME",
            "partner_order_id" : "100",
            "partner_user_id" : "TEST_USER",
            "item_name" : "포켓몬빵",
            "quantity" : 1,
            "total_amount" : 2000,
            "tax_free_amount" : 500,
            "approval_url" : "",
            "cancel_url" : "",
            "fail_url" : "",
        }

        res = requests.post(URL, headers=headers, params=params)
        # api.tid = res.json()['tid']

        return res.text