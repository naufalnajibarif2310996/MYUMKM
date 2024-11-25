from rest_framework import serializers
from .models import User, Produk, Supplier, Pelanggan, Pengiriman, Penjualan, Pembayaran, Pendapatan

# Serializer untuk model User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

# Serializer untuk model Produk
class ProdukSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produk
        fields = '__all__'

# Serializer untuk model Supplier
class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

# Serializer untuk model Pelanggan
class PelangganSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pelanggan
        fields = '__all__'

# Serializer untuk model Pengiriman
class PengirimanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pengiriman
        fields = '__all__'

# Serializer untuk model Penjualan
class PenjualanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Penjualan
        fields = '__all__'

# Serializer untuk model Pembayaran
class PembayaranSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pembayaran
        fields = '__all__'

# Serializer untuk model Pendapatan
class PendapatanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pendapatan
        fields = '__all__'
