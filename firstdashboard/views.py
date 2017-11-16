# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render,HttpResponse
from dashboardpy.datas import GetData
import json
# Create your views here.
def index(request):
    getdata = GetData()
    dailyresult = getdata.getdailyincome() #每日销售额
    mtdtotal =getdata.getMTDtotal() #mtd目标仪表盘
    mtdsaler = getdata.getmtdsaler() #mtd健康顾问销售额
    print(mtdsaler[0][1])
    xdata = []
    xfmoney = []
    vipmoney = []
    mtdsalerstr = ''
    for i in dailyresult:
        str1 = str(i[0])[8:10] + '日'
        xdata.append(str1)
        xfmoney.append(int(i[1]))
        vipmoney.append(int(i[2]))

    for i in mtdsaler:
        mtdsalerstr += '<tr><td>'+i[0]+'</td><td>'+i[1]+'</td><td>'+str(int(i[2]))+'</td><td>'+str(int(i[3]))+'</td><td>'+str(i[4])+'</td><tr>'

    dailyjson = {'xdata':xdata,'xfmoney':xfmoney,'vipmoney':vipmoney}
    mtdjson = {'mtdnow1':int(mtdtotal[0][0]),'mtdtotal1':int(mtdtotal[0][1]),'mtdname1':mtdtotal[0][2],'mtdnow2':int(mtdtotal[1][0]),'mtdtotal2':int(mtdtotal[1][1]),'mtdname2':mtdtotal[1][2]}
    daily = json.dumps(dailyjson)
    mtd = json.dumps(mtdjson)
    return render(request,'first/index.html',{'daily':daily,'mtd':mtd,'mtdsalerstr':mtdsalerstr})

def getdailydata(request):
    typename = request.POST
    print (typename)
    return HttpResponse(typename)
