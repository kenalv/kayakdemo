"""kayakdemo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from kayakapi import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('flys/', views.FlightList.as_view()),
    path('flys/update/<id>/<tiquets>', views.FlightList.as_view()),
    path('flys/classes/', views.Class_TypeList.as_view()),
    path('flys/<id>/', views.FlightList.as_view()),
    path('flys/<id>/<inid>', views.FlightList.as_view()),
    path('flys/<origin>/<destiny>/<out_date>/', views.FlightList.as_view()),
    path('flys/<origin>/<destiny>/<out_date>/<in_date>/', views.FlightList.as_view()),

]
