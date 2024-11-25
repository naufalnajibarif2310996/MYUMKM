from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User, Produk, Supplier, Pelanggan, Pengiriman, Penjualan, Pembayaran, Pendapatan
from .serializers import UserSerializer, ProdukSerializer, SupplierSerializer, PelangganSerializer, PengirimanSerializer, PenjualanSerializer, PembayaranSerializer, PendapatanSerializer

# CRUD untuk User
@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# CRUD untuk Produk
@api_view(['GET', 'POST'])
def produk_list(request):
    if request.method == 'GET':
        produk = Produk.objects.all()
        serializer = ProdukSerializer(produk, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProdukSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# CRUD untuk Supplier
@api_view(['GET', 'POST'])
def supplier_list(request):
    if request.method == 'GET':
        supplier = Supplier.objects.all()
        serializer = SupplierSerializer(supplier, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = SupplierSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# CRUD untuk Pelanggan
@api_view(['GET', 'POST'])
def pelanggan_list(request):
    if request.method == 'GET':
        pelanggan = Pelanggan.objects.all()
        serializer = PelangganSerializer(pelanggan, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PelangganSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# CRUD untuk Pengiriman
@api_view(['GET', 'POST'])
def pengiriman_list(request):
    if request.method == 'GET':
        pengiriman = Pengiriman.objects.all()
        serializer = PengirimanSerializer(pengiriman, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PengirimanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# CRUD untuk Penjualan
@api_view(['GET', 'POST'])
def penjualan_list(request):
    if request.method == 'GET':
        penjualan = Penjualan.objects.all()
        serializer = PenjualanSerializer(penjualan, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PenjualanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# CRUD untuk Pembayaran
@api_view(['GET', 'POST'])
def pembayaran_list(request):
    if request.method == 'GET':
        pembayaran = Pembayaran.objects.all()
        serializer = PembayaranSerializer(pembayaran, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PembayaranSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# CRUD untuk Pendapatan
@api_view(['GET', 'POST'])
def pendapatan_list(request):
    if request.method == 'GET':
        pendapatan = Pendapatan.objects.all()
        serializer = PendapatanSerializer(pendapatan, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PendapatanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
