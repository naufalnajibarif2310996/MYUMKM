from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import User, Produk, Supplier, Pelanggan, Pengiriman, Penjualan, Pembayaran, Pendapatan
from .serializers import UserSerializer, ProdukSerializer, SupplierSerializer, PelangganSerializer, PengirimanSerializer, PenjualanSerializer, PembayaranSerializer, PendapatanSerializer

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
