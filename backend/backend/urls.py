from django.contrib import admin
from django.urls import path, include
from myapp.views import my_view

urlpatterns = [
    path('', include('myapp.urls')),
    path('admin/', admin.site.urls),
    path('api/mydata/', my_view),
    path('',include("django.contrib.auth.urls")),
    
]
