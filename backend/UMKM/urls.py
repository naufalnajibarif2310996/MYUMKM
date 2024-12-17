from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Admin URL
    path('admin/', admin.site.urls),
    
    # URL untuk autentikasi JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # URL untuk logout
    
    # Menyertakan URL dari aplikasi umkmapp (API lainnya)
    path('', include('umkmapp.urls')),
]
