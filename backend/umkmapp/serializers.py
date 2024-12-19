from rest_framework import serializers
from .models import User, Produk, Supplier, Pelanggan, Pengiriman, Penjualan, Pembayaran, Pendapatan

# Serializer untuk model User
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        # Gunakan create_user untuk mengenkripsi password dan membuat user
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# Serializer untuk model Produk
class ProdukSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produk
        fields = ['id', 'nama', 'kategori', 'harga', 'stok', 'status', 'gambar', 'idUser']
        read_only_fields = ['idUser']  # idUser akan otomatis diisi

    def update(self, instance, validated_data):
        # Jika gambar tidak diunggah, tetap gunakan gambar yang ada
        gambar = validated_data.get('gambar', instance.gambar)
        instance.nama = validated_data.get('nama', instance.nama)
        instance.kategori = validated_data.get('kategori', instance.kategori)
        instance.harga = validated_data.get('harga', instance.harga)
        instance.stok = validated_data.get('stok', instance.stok)
        instance.status = validated_data.get('status', instance.status)
        instance.gambar = gambar
        instance.save()
        return instance



# Serializer untuk model Supplier
class SupplierSerializer(serializers.ModelSerializer):
    idProduk = ProdukSerializer(read_only=True)  # Menampilkan data Produk dalam supplier
    class Meta:
        model = Supplier
        fields = '__all__'

# Serializer untuk model Pelanggan
class PelangganSerializer(serializers.ModelSerializer):
    produk_dibeli = ProdukSerializer(many=True, read_only=True)  # Menampilkan produk yang dibeli oleh pelanggan
    class Meta:
        model = Pelanggan
        fields = '__all__'

# Serializer untuk model Pengiriman
class PengirimanSerializer(serializers.ModelSerializer):
    idPelanggan = PelangganSerializer(read_only=True)  # Menampilkan data Pelanggan dalam pengiriman
    produk = ProdukSerializer(many=True, read_only=True)  # Menampilkan produk dalam pengiriman
    class Meta:
        model = Pengiriman
        fields = '__all__'

# Serializer untuk model Penjualan
class PenjualanSerializer(serializers.ModelSerializer):
    idProduk = ProdukSerializer(read_only=True)  # Menampilkan data Produk dalam penjualan
    class Meta:
        model = Penjualan
        fields = '__all__'

# Serializer untuk model Pembayaran
class PembayaranSerializer(serializers.ModelSerializer):
    idPelanggan = PelangganSerializer(read_only=True)  # Menampilkan data Pelanggan dalam pembayaran
    idPenjualan = PenjualanSerializer(read_only=True)  # Menampilkan data Penjualan dalam pembayaran
    class Meta:
        model = Pembayaran
        fields = '__all__'

# Serializer untuk model Pendapatan
class PendapatanSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Menampilkan data User dalam pendapatan
    id_pembayaran = PembayaranSerializer(read_only=True)  # Menampilkan data Pembayaran dalam pendapatan
    class Meta:
        model = Pendapatan
        fields = '__all__'
