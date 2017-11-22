# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render,HttpResponse
from dashboardpy.datas import GetData
import json
# Create your views here.
def index(request):
    getdata = GetData()
    dailyresult = getdata.getdailyincome("%") #每日销售额
    mtdtotal =getdata.getMTDtotal() #mtd目标仪表盘
    mtdsaler = getdata.getmtdsaler() #mtd健康顾问销售额
    zrtotal = getdata.getYesterdayTotal()
    print(zrtotal)
    xdata = []
    xfmoney = []
    vipmoney = []
    totalmoney = []
    mtdsalerstr = ''
    for i in dailyresult:
        str1 = str(i[0])[8:10] + '日'
        xdata.append(str1)
        xfmoney.append(int(i[1]))
        vipmoney.append(int(i[2]))
        totalmoney.append(int(i[3]))

    for i in mtdsaler:
        mtdsalerstr += '<tr><td>'+i[0]+'</td><td>'+i[1]+'</td><td>'+str(int(i[2]))+'</td><td>'+str(int(i[3]))+'</td><td>'+str(i[4])+'</td><tr>'

    dailyjson = {'spotname':'总','xdata':xdata,'xfmoney':xfmoney,'vipmoney':vipmoney,'totalmoney':totalmoney}
    print(dailyjson)
    mtdjson = {'mtdnow1':int(mtdtotal[0][0]),'mtdtotal1':int(mtdtotal[0][1]),'mtdname1':mtdtotal[0][2],'mtdnow2':int(mtdtotal[1][0]),'mtdtotal2':int(mtdtotal[1][1]),'mtdname2':mtdtotal[1][2]}
    riqi = '11月16日'
    money = 50000
    if len(zrtotal) != 0:
        riqi = str(zrtotal[0][0])[5:7]+'月'+str(zrtotal[0][0])[8:10]+'日'
        money = int(zrtotal[0][1])
    daily = json.dumps(dailyjson)
    mtd = json.dumps(mtdjson)
    return render(request,'first/index.html',{'daily':daily,'mtd':mtd,'mtdsalerstr':mtdsalerstr,'riqi':riqi,'money':money})

def getdailydata(request):
    getdata = GetData()
    typename = request.POST.get('typename')
    querystr = ''
    spotname = ''
    xdata = []
    xfmoney = []
    vipmoney = []

    if typename == 'total':
        querystr='%'
        spotname='总'
    elif typename == 'hd':
        querystr = '59'
        spotname = '海德店'
    elif typename == 'ls':
        querystr = '62'
        spotname = '丽晟店'
    dailyresult = getdata.getdailyincome(querystr)  # 每日销售额
    for i in dailyresult:
        str1 = str(i[0])[8:10] + '日'
        xdata.append(str1)
        xfmoney.append(int(i[1]))
        vipmoney.append(int(i[2]))
    dailyjson = {'spotname':spotname,'xdata': xdata, 'xfmoney': xfmoney, 'vipmoney': vipmoney}
    return HttpResponse(json.dumps(dailyjson))
