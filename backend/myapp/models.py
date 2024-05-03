from django.contrib.auth.models import User
from django.db import models


class MyModel(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

class Items(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)
    description = models.TextField()
    contact_number = models.CharField(max_length=15)
    

    def __str__(self):
        return self.name

class UserItems(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Items, on_delete=models.CASCADE)

    def __str__(self):
        return f"User: {self.user.username}, Item: {self.item.name}"
    
