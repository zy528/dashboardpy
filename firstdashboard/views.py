# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from dashboardpy.datas import GetData
import json
# Create your views here.
def index(request):
    getdata = GetData()
    dailyresult = getdata.getdailyincome()
    mtdtotal =getdata.getMTDtotal()
    xdata = []
    xfmoney = []
    vipmoney = []
    for i in dailyresult:
        str1 = str(i[0])[8:10] + '日'
        xdata.append(str1)
        xfmoney.append(int(i[1]))
        vipmoney.append(int(i[2]))

    dailyjson = {'xdata':xdata,'xfmoney':xfmoney,'vipmoney':vipmoney}
    mtdjson = {'mtdnow':int(mtdtotal[0][0]),'mtdtotal':int(mtdtotal[0][1])}
    daily = json.dumps(dailyjson)
    mtd = json.dumps(mtdjson)
    print(mtd)

    return render(request,'first/index.html',{'daily':daily,'mtd':mtd})