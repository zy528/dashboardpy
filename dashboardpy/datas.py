from django.db import connection

class GetData():
    cursor = connection.cursor()
    def getdailyincome(self):
        self.cursor.execute(''' SELECT tmp.tmpdate AS tjtime
                              ,tmp.wtkmoney+tmp.wuzimoney AS total
                              ,tmp.vipmoney FROM (
                              SELECT 
                                 DATE(FROM_UNIXTIME(g.create_time) ) AS tmpdate
                                ,SUM(IF(a.STATUS=1,a.unit_price*a.num- a.card_discount_price  - a.discount_price,0)) AS wtkmoney
                                ,IFNULL((SELECT SUM(price) FROM gzh_charge_record WHERE charge_type=2 AND STATUS=1 AND spot_id LIKE '%'  
                                AND create_time>=UNIX_TIMESTAMP(DATE(FROM_UNIXTIME(g.create_time))) AND create_time<UNIX_TIMESTAMP(DATE_ADD(DATE(FROM_UNIXTIME(g.create_time) ),INTERVAL 1 DAY) )),0) AS wuzimoney
                                ,IFNULL((SELECT SUM(f_record_fee)  FROM d_easyhin_card_center.t_card_flow WHERE f_record_type=1 AND f_spot_id LIKE '%'
                                AND f_create_time >= DATE(FROM_UNIXTIME(g.create_time)) AND f_create_time < DATE_ADD(DATE(FROM_UNIXTIME(g.create_time)),INTERVAL 1 DAY)),0) AS vipmoney
                              FROM
                                gzh_charge_info a LEFT JOIN gzh_triage_info b ON a.record_id=b.record_id 
                                LEFT JOIN gzh_report c ON a.record_id=c.record_id 
                                LEFT JOIN gzh_user d ON b.doctor_id=d.id 
                                LEFT JOIN gzh_spot e ON a.spot_id=e.id
                                LEFT JOIN gzh_patient f ON c.patient_id=f.id
                                LEFT JOIN gzh_charge_record g ON a.charge_record_id = g.id AND a.record_id = g.record_id
                              WHERE  f.username IS NOT NULL AND a.status >= 1  AND a.spot_id NOT IN (58,61) AND a.spot_id LIKE '%'
                              AND g.create_time >= UNIX_TIMESTAMP('2017-05-01') AND g.create_time >= UNIX_TIMESTAMP(DATE_FORMAT(DATE_SUB(CURDATE(),INTERVAL 1 DAY),'%Y-%m-01')) AND g.create_time < UNIX_TIMESTAMP(CURDATE())
                              GROUP BY DATE(FROM_UNIXTIME(g.create_time) ) ORDER BY g.create_time DESC) AS tmp''')
        result = self.cursor.fetchall()
        return result