# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from dashboardpy.datas import GetData
# Create your views here.
def index(request):
    getdata = GetData()
    result = getdata.getuser()
    for i in range(len(result)):
        print(result[i])

    return render(request,'first/index.html')