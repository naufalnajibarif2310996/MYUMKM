from django.contrib.auth import get_user_model, authenticate
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Produk, Supplier, Pelanggan, Pengiriman, Penjualan, Pembayaran, Pendapatan
from .serializers import (
    UserSerializer, ProdukSerializer, SupplierSerializer, 
    PelangganSerializer, PengirimanSerializer, PenjualanSerializer, 
    PembayaranSerializer, PendapatanSerializer,
)

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            if User.objects.filter(username=request.data['username']).exists():
                return Response({"message": "Username sudah digunakan."}, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(email=request.data['email']).exists():
                return Response({"message": "Email sudah digunakan."}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            return Response({"message": "Akun berhasil dibuat!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        identifier = request.data.get("username_or_email")
        password = request.data.get("password")

        user = None
        try:
            validate_email(identifier)
            user = User.objects.filter(email=identifier).first()
        except ValidationError:
            user = authenticate(request, username=identifier, password=password)

        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
            return Response({
                'refresh': str(refresh),
                'access': str(access_token),
            })
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProdukViewSet(viewsets.ModelViewSet):
    queryset = Produk.objects.all()
    serializer_class = ProdukSerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class PelangganViewSet(viewsets.ModelViewSet):
    queryset = Pelanggan.objects.all()
    serializer_class = PelangganSerializer

class PengirimanViewSet(viewsets.ModelViewSet):
    queryset = Pengiriman.objects.all()
    serializer_class = PengirimanSerializer

class PenjualanViewSet(viewsets.ModelViewSet):
    queryset = Penjualan.objects.all()
    serializer_class = PenjualanSerializer

class PembayaranViewSet(viewsets.ModelViewSet):
    queryset = Pembayaran.objects.all()
    serializer_class = PembayaranSerializer

class PendapatanViewSet(viewsets.ModelViewSet):
    queryset = Pendapatan.objects.all()
    serializer_class = PendapatanSerializer
