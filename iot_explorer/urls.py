from django.contrib import admin
from django.urls import path, include
from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView
from rest_framework import routers

from device.views import ProgramViewSet, ActiveProgramViewSet, CategoryViewSet, IotDeviceViewSet

router = routers.DefaultRouter()
router.register(r'programs', ProgramViewSet)
router.register(r'active-programs', ActiveProgramViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'iot-device', IotDeviceViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', never_cache(TemplateView.as_view(template_name="index.html"))),

]
