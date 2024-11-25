from django.urls import path
from . import views

urlpatterns = [
    # User endpoints
    path('api/users/', views.user_list, name='user-list'),
    path('api/users/<int:pk>/', views.user_update, name='user-update'),
    path('api/users/<int:pk>/delete/', views.user_delete, name='user-delete'),

    # Produk endpoints
    path('api/produks/', views.produk_list, name='produk-list'),
    path('api/produks/<int:pk>/', views.produk_update, name='produk-update'),
    path('api/produks/<int:pk>/delete/', views.produk_delete, name='produk-delete'),

    # Supplier endpoints
    path('api/suppliers/', views.supplier_list, name='supplier-list'),
    path('api/suppliers/<int:pk>/', views.supplier_update, name='supplier-update'),
    path('api/suppliers/<int:pk>/delete/', views.supplier_delete, name='supplier-delete'),

    # Pelanggan endpoints
    path('api/pelanggans/', views.pelanggan_list, name='pelanggan-list'),
    path('api/pelanggans/<int:pk>/', views.pelanggan_update, name='pelanggan-update'),
    path('api/pelanggans/<int:pk>/delete/', views.pelanggan_delete, name='pelanggan-delete'),

    # Pengiriman endpoints
    path('api/pengirimans/', views.pengiriman_list, name='pengiriman-list'),
    path('api/pengirimans/<int:pk>/', views.pengiriman_update, name='pengiriman-update'),
    path('api/pengirimans/<int:pk>/delete/', views.pengiriman_delete, name='pengiriman-delete'),

    # Penjualan endpoints
    path('api/penjualans/', views.penjualan_list, name='penjualan-list'),
    path('api/penjualans/<int:pk>/', views.penjualan_update, name='penjualan-update'),
    path('api/penjualans/<int:pk>/delete/', views.penjualan_delete, name='penjualan-delete'),

    # Pembayaran endpoints
    path('api/pembayarans/', views.pembayaran_list, name='pembayaran-list'),
    path('api/pembayarans/<int:pk>/', views.pembayaran_update, name='pembayaran-update'),
    path('api/pembayarans/<int:pk>/delete/', views.pembayaran_delete, name='pembayaran-delete'),

    # Pendapatan endpoints
    path('api/pendapatans/', views.pendapatan_list, name='pendapatan-list'),
    path('api/pendapatans/<int:pk>/', views.pendapatan_update, name='pendapatan-update'),
    path('api/pendapatans/<int:pk>/delete/', views.pendapatan_delete, name='pendapatan-delete'),
]
