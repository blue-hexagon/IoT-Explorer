from rest_framework import viewsets

from device.models import Program, ProgramInstance, Category, IotDevice
from device.serializers import ProgramSerializer, CategorySerializer, ProgramInstanceSerializer, IotDeviceSerializer


class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    


class ProgramInstanceViewSet(viewsets.ModelViewSet):
    queryset = ProgramInstance.objects.all()
    serializer_class = ProgramInstanceSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class IotDeviceViewSet(viewsets.ModelViewSet):
    queryset = IotDevice.objects.all()
    serializer_class = IotDeviceSerializer
