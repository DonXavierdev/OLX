from django.contrib import admin
from .models import MyModel
from .models import Items
from .models import UserItems

class MyModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
admin.site.register(MyModel, MyModelAdmin)
admin.site.register(Items)
admin.site.register(UserItems)