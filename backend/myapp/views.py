from django.http import JsonResponse
from .models import MyModel
from .models import Items
from .models import UserItems
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

@api_view(['GET'])
def my_view(request):
    data = MyModel.objects.all().values()
    return Response(data)

@api_view(['GET'])
def myUsers(request):
    data = User.objects.filter(pk=1).values()
    return Response(data)
@api_view(['POST'])
def newItem(request):
    data = json.loads(request.body)
    item = Items.objects.create(name=data['name'],price=data['price'], description=data['description'],category=data['category'],contact_number=data['contactNumber'])
    user_id = data.get('userId')
    user = User.objects.get(pk=user_id)
    UserItems.objects.create(user=user, item=item)
    return JsonResponse({'message': 'Item created successfully'}, status=201)
@api_view(['GET'])
def showItems(request):
    data = Items.objects.all().values()
    return Response(data)

@api_view(['GET'])
def showUserItems(request):
    user_id = request.GET.get('userId')
    user_items = UserItems.objects.filter(user_id=user_id)
    item_ids = [user_item.item_id for user_item in user_items]
    items = Items.objects.filter(pk__in=item_ids)
    data = [{'name': item.name, 'price': item.price, 'category': item.category, 'description': item.description, 'contact_number': item.contact_number} for item in items]
    
    return Response(data)

@api_view(['POST'])
def create_record(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            new_record = MyModel.objects.create(name=data['name'], description=data['description'])
            return JsonResponse({'message': 'Record created successfully', 'id': new_record.id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({'error': 'Please provide username, email, and password'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user_id': user.pk}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)