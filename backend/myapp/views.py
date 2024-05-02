from django.http import JsonResponse
from .models import MyModel
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
        # User is authenticated, generate token
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)