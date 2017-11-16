from django.conf.urls import url
from  firstdashboard import  views

urlpatterns = [
    url(r'^index/', views.index),
    url(r'^getdailydata/', views.getdailydata),
]
