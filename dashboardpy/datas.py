# -*- coding: utf-8 -*-
from django.db import connections
class GetData():
    def jdbc(self, sql,cursor):
        try:
            cursor.execute(sql)
            results = cursor.fetchall()
            return results
        except:
            print "Error: unable to fecth data"

    #每日收入
    def getdailyincome(self,spot):
        cursor = connections['d_easyhin_his'].cursor()
        sql=""" SELECT tmp.tmpdate AS tjtime
                ,tmp.wtkmoney+tmp.wuzimoney AS total
                ,tmp.vipmoney FROM (
                SELECT 
                DATE(FROM_UNIXTIME(g.create_time) ) AS tmpdate
                ,SUM(IF(a.STATUS=1,a.unit_price*a.num- a.card_discount_price  - a.discount_price,0)) AS wtkmoney
                ,IFNULL((SELECT SUM(price) FROM gzh_charge_record WHERE charge_type=2 AND STATUS=1 AND spot_id LIKE '"""+ spot+"""'
                AND create_time>=UNIX_TIMESTAMP(DATE(FROM_UNIXTIME(g.create_time))) AND create_time<UNIX_TIMESTAMP(DATE_ADD(DATE(FROM_UNIXTIME(g.create_time) ),INTERVAL 1 DAY) )),0) AS wuzimoney
                ,IFNULL((SELECT SUM(f_record_fee)  FROM d_easyhin_card_center.t_card_flow WHERE f_record_type=1 AND f_spot_id LIKE '"""+ spot+"""'
                AND f_create_time >= DATE(FROM_UNIXTIME(g.create_time)) AND f_create_time < DATE_ADD(DATE(FROM_UNIXTIME(g.create_time)),INTERVAL 1 DAY)),0) AS vipmoney
                FROM
                gzh_charge_info a LEFT JOIN gzh_triage_info b ON a.record_id=b.record_id 
                LEFT JOIN gzh_report c ON a.record_id=c.record_id 
                LEFT JOIN gzh_user d ON b.doctor_id=d.id 
                LEFT JOIN gzh_spot e ON a.spot_id=e.id
                LEFT JOIN gzh_patient f ON c.patient_id=f.id
                LEFT JOIN gzh_charge_record g ON a.charge_record_id = g.id AND a.record_id = g.record_id
                WHERE  f.username IS NOT NULL AND a.status >= 1  AND a.spot_id NOT IN (58,61) AND a.spot_id LIKE '"""+ spot+"""'
                AND g.create_time >= UNIX_TIMESTAMP('2017-05-01') AND g.create_time >= UNIX_TIMESTAMP(DATE_FORMAT(DATE_SUB(CURDATE(),INTERVAL 1 DAY),'%Y-%m-01')) AND g.create_time < UNIX_TIMESTAMP(CURDATE())
                GROUP BY DATE(FROM_UNIXTIME(g.create_time) ) ORDER BY g.create_time ) AS tmp"""
        return self.jdbc(sql,cursor)

    def getMTDtotal(self):
        cursor = connections['default'].cursor()
        sql ='''SELECT
                SUM(tmp.total)
                ,SUM(tmp.target)
                ,f_division 
                FROM (
		        SELECT
                a.f_saler AS saler,
                SUM(a.f_total_money) AS total,
                a.f_sales_money_target AS target
                ,b.f_division
                FROM
                t_views_ccic_saler_info a LEFT JOIN t_views_ccc_user b ON a.f_saler = b.f_user_name
                WHERE
                f_crt_date >=DATE_FORMAT(CURDATE(),'%Y-%m-01') AND f_crt_date < DATE_ADD(DATE_FORMAT(CURDATE(),'%Y-%m-%d'),INTERVAL 1 DAY)
                GROUP BY f_saler,b.f_division
                ) AS tmp  GROUP BY f_division '''
        return self.jdbc(sql,cursor)

    def getmtdsaler(self):
        cursor = connections['default'].cursor()
        sql = '''SELECT
		        b.f_division
                ,a.f_saler AS saler
                ,a.f_sales_money_target AS target
                ,SUM(a.f_total_money) AS total
                ,CONCAT(IFNULL(CONVERT((SUM(a.f_total_money)/a.f_sales_money_target*100),DECIMAL(10,2)),0),'%')
                FROM
                t_views_ccic_saler_info a LEFT JOIN t_views_ccc_user b ON a.f_saler = b.f_user_name
                WHERE
                f_crt_date >=DATE_FORMAT(CURDATE(),'%Y-%m-01') AND f_crt_date < DATE_ADD(DATE_FORMAT(CURDATE(),'%Y-%m-%d'),INTERVAL 1 DAY)
                GROUP BY f_saler,b.f_division
                ORDER BY b.f_division'''
        return self.jdbc(sql, cursor)

    # 昨日营业额
    def getYesterdayTotal(self):
        cursor = connections['d_easyhin_his'].cursor()
        sql = """ SELECT tmp.tmpdate,tmp.wtkmoney+tmp.wuzimoney+tmp.vipmoney FROM (
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
                AND g.create_time >= UNIX_TIMESTAMP('2017-05-01') 
                AND g.create_time >= UNIX_TIMESTAMP(DATE_SUB(CURDATE(),INTERVAL 1 DAY)) AND g.create_time < UNIX_TIMESTAMP(CURDATE())
                GROUP BY DATE(FROM_UNIXTIME(g.create_time) ) 
		        )AS tmp"""
        return self.jdbc(sql, cursor)