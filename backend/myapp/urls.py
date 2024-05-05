
from django.urls import path
from . import views

urlpatterns = [
    path('api/create/', views.create_record),
    path('api/register/', views.register_user),
    path('api/login/', views.login_user),
    path('api/users/', views.myUsers),
    path('api/newItem/', views.newItem),
    path('api/showItems/', views.showItems),
    path('api/showUserItems/', views.showUserItems),
    path('api/purchase/', views.Purchase),
    path('api/myPurchases/', views.MyPurchases),
    path('api/del/', views.deleteview),
    

]
