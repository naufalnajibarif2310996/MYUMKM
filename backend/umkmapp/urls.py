from django.urls import path
from . import views

urlpatterns = [
    # User endpoints
    path('api/users/', views.user_list, name='user-list'),

    # Produk endpoints
    path('api/produks/', views.produk_list, name='produk-list'),

    # Supplier endpoints
    path('api/suppliers/', views.supplier_list, name='supplier-list'),

    # Pelanggan endpoints
    path('api/pelanggans/', views.pelanggan_list, name='pelanggan-list'),

    # Pengiriman endpoints
    path('api/pengirimans/', views.pengiriman_list, name='pengiriman-list'),

    # Penjualan endpoints
    path('api/penjualans/', views.penjualan_list, name='penjualan-list'),

    # Pembayaran endpoints
    path('api/pembayarans/', views.pembayaran_list, name='pembayaran-list'),

    # Pendapatan endpoints
    path('api/pendapatans/', views.pendapatan_list, name='pendapatan-list'),
]
