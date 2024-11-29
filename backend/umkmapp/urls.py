from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProdukViewSet, SupplierViewSet, PelangganViewSet, PengirimanViewSet, PenjualanViewSet, PembayaranViewSet, PendapatanViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'produk', ProdukViewSet, basename='produk')
router.register(r'supplier', SupplierViewSet, basename='supplier')
router.register(r'pelanggan', PelangganViewSet, basename='pelanggan')
router.register(r'pengiriman', PengirimanViewSet, basename='pengiriman')
router.register(r'penjualan', PenjualanViewSet, basename='penjualan')
router.register(r'pembayaran', PembayaranViewSet, basename='pembayaran')
router.register(r'pendapatan', PendapatanViewSet, basename='pendapatan')

urlpatterns = [
    path('', include(router.urls)),
]
