from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from .models import CustomUser
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
# Create your views here.
class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

class Login(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = CustomUser.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found!')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')
        
        payload = {
            'id': user.id,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=120),
            'iat': datetime.datetime.now(datetime.timezone.utc)
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True, expires=payload['exp'])
        response.data = {
            'jwt': token
        }
        return response
    
class User(APIView):
    def get(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            raise AuthenticationFailed('Authorization header missing')

        token = auth_header.split(' ')[1] if ' ' in auth_header else None
        if not token:
            raise AuthenticationFailed('Invalid token format')

        try:
            # Decode the token
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired, please log in again')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token, please log in again')

        user = CustomUser.objects.filter(id=payload['id']).first()
        if not user:
            raise AuthenticationFailed('User not found')

        serializer = UserSerializer(user)
        return Response(serializer.data)
    
class Logout(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
