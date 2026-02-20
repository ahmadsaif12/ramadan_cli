from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewsets

router=DefaultRouter()

router.register(r'config', UserProfileViewsets, basename='userprofile')

urlpatterns = [
    path('', include(router.urls)),
]