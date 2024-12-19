from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView
from .views import (
    UserViewSet, ProdukViewSet, SupplierViewSet, 
    PelangganViewSet, PengirimanViewSet, PenjualanViewSet, 
    PembayaranViewSet, PendapatanViewSet
)

# Router untuk API
router = DefaultRouter()

# Registrasi ViewSet dengan router
router.register(r'users', UserViewSet, basename='user')
router.register(r'produk', ProdukViewSet, basename='produk')
router.register(r'supplier', SupplierViewSet, basename='supplier')
router.register(r'pelanggan', PelangganViewSet, basename='pelanggan')
router.register(r'pengiriman', PengirimanViewSet, basename='pengiriman')
router.register(r'penjualan', PenjualanViewSet, basename='penjualan')
router.register(r'pembayaran', PembayaranViewSet, basename='pembayaran')
router.register(r'pendapatan', PendapatanViewSet, basename='pendapatan')


# URL Patterns dengan versi API
urlpatterns = [
    path('', include(router.urls)),  # Mengelompokkan endpoint API di bawah versi 1
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
