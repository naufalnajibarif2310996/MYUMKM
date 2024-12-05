from django.db import models
from django.contrib.auth.models import AbstractUser

# Menggunakan AbstractUser agar lebih mudah terintegrasi dengan sistem autentikasi Django
class User(AbstractUser):
    email = models.EmailField(unique=True)
    
    # Tentukan related_name untuk menghindari konflik
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='umkmapp_user_set',  # Ganti dengan nama relasi yang unik
        blank=True
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='umkmapp_user_permissions_set',  # Ganti dengan nama relasi yang unik
        blank=True
    )

    def __str__(self):
        return self.email


class Produk(models.Model):
    idUser = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")  # related_name yang lebih jelas
    nama_produk = models.CharField(max_length=100)
    status = models.CharField(max_length=50, choices=[("Tersedia", "Tersedia"), ("Tidak Tersedia", "Tidak Tersedia")])
    kategori = models.CharField(max_length=100)
    harga = models.DecimalField(max_digits=10, decimal_places=2)
    stok = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.nama_produk} - {self.kategori}"


class Supplier(models.Model):
    idProduk = models.ForeignKey(Produk, on_delete=models.CASCADE, related_name="suppliers")
    nama_supplier = models.CharField(max_length=100)
    alamat_supplier = models.TextField()

    def __str__(self):
        return f"{self.nama_supplier} - {self.idProduk.nama_produk}"


class Pelanggan(models.Model):
    nama_pelanggan = models.CharField(max_length=100)
    alamat_pelanggan = models.TextField()
    produk_dibeli = models.ManyToManyField(Produk, related_name="pelanggans", blank=True)  # Relasi banyak ke banyak produk

    def __str__(self):
        return self.nama_pelanggan


class Pengiriman(models.Model):
    idPelanggan = models.ForeignKey(Pelanggan, on_delete=models.CASCADE, related_name="pengirimans")
    produk = models.ManyToManyField(Produk, related_name="pengirimans", blank=True)  # Bisa kirim beberapa produk
    tanggal_pengiriman = models.DateField()
    estimasi = models.CharField(max_length=50)  # Estimasi pengiriman

    def __str__(self):
        return f"Pengiriman ke {self.idPelanggan.nama_pelanggan} pada {self.tanggal_pengiriman} (Estimasi: {self.estimasi})"


class Penjualan(models.Model):
    idProduk = models.ForeignKey(Produk, on_delete=models.CASCADE, related_name="penjualans")
    tanggal_penjualan = models.DateField()
    jumlah_terjual = models.PositiveIntegerField()
    total_harga = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return f"{self.idProduk.nama_produk} - {self.jumlah_terjual} unit terjual pada {self.tanggal_penjualan}"


class Pembayaran(models.Model):
    STATUS_CHOICES = [
        ('LUNAS', 'Lunas'),
        ('BELUM_LUNAS', 'Belum Lunas'),
        ('MENUNGGU', 'Menunggu Pembayaran'),
    ]
    
    METODE_CHOICES = [
        ('TRANSFER', 'Transfer Bank'),
        ('TUNAI', 'Tunai'),
        ('KARTU', 'Kartu Kredit/Debit'),
        ('EWALLET', 'E-Wallet'),
    ]

    idPelanggan = models.ForeignKey(Pelanggan, on_delete=models.CASCADE, related_name="pembayarans")
    idPenjualan = models.ForeignKey(Penjualan, on_delete=models.CASCADE, related_name="pembayarans")
    tanggal = models.DateField(auto_now_add=True)
    status_pembayaran = models.CharField(max_length=20, choices=STATUS_CHOICES, default='MENUNGGU')
    metode = models.CharField(max_length=20, choices=METODE_CHOICES)

    def __str__(self):
        return f"Pembayaran oleh {self.idPelanggan.nama_pelanggan} untuk {self.idPenjualan.idProduk.nama_produk} - Status: {self.status_pembayaran}"


class Pendapatan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pendapatans')
    id_pembayaran = models.ForeignKey(Pembayaran, on_delete=models.CASCADE, related_name='pendapatans')
    periode = models.CharField(max_length=50)  # Periode yang bisa lebih dinamis
    total_pendapatan = models.DecimalField(max_digits=15, decimal_places=2)  # Pendapatan total

    def __str__(self):
        return f"Pendapatan {self.user.username} - {self.periode} - Rp {self.total_pendapatan}"

