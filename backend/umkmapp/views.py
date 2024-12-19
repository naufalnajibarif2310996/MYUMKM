from django.contrib.auth import get_user_model, authenticate
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import MultiPartParser, FormParser

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
        try:
            username = request.data.get('username')
            email = request.data.get('email')
            password = request.data.get('password')

            # Validasi data
            if not username or not email or not password:
                return Response(
                    {"error": "Username, email, dan password harus diisi."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Validasi username
            if User.objects.filter(username=username).exists():
                return Response(
                    {"error": "Username sudah digunakan."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Validasi email
            if User.objects.filter(email=email).exists():
                return Response(
                    {"error": "Email sudah digunakan."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Buat user baru
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()

            return Response({"message": "Akun berhasil dibuat!"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            print("Unexpected error:", e)  # Log untuk debugging
            return Response({"error": "Terjadi kesalahan pada server"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        identifier = request.data.get("username_or_email")
        password = request.data.get("password")

        if not identifier or not password:
            return Response(
                {"detail": "Username/Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = None
        try:
            # Cek apakah input berupa email
            validate_email(identifier)
            user = User.objects.filter(email=identifier).first()
        except ValidationError:
            # Jika bukan email, cek dengan username
            user = User.objects.filter(username=identifier).first()

        if user and user.check_password(password):
            # Buat token JWT
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            # Tentukan redirect berdasarkan email atau role
            if user.email == "admin@gmail.com" or getattr(user, "role", None) == "ADMIN":
                redirect_url = "/dashboard"  # URL dashboard admin
            else:
                redirect_url = "/beranda"  # URL beranda user

            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(access_token),
                    "redirect_url": redirect_url,
                    "detail": f"Welcome, {user.username}!",
                }
            )

        # Jika user tidak ditemukan atau password salah
        return Response(
            {"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"detail": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()  # Memasukkan token ke daftar hitam (Blacklist)

            return Response({"detail": "Successfully logged out"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProdukViewSet(viewsets.ModelViewSet):
    queryset = Produk.objects.all()
    serializer_class = ProdukSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save()  # self.request otomatis ditambahkan ke context oleh DRF



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

