from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from myapp.views import my_view

urlpatterns = [
    path('', include('myapp.urls')),
    path('admin/', admin.site.urls),
    path('api/mydata/', my_view),
    path('',include("django.contrib.auth.urls")),
    
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)