from rest_framework import viewsets

from device.models import Program, ActiveProgram, Category, IotDevice
from device.serializers import ProgramSerializer, CategorySerializer, ActiveProgramSerializer, IotDeviceSerializer


class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer


class ActiveProgramViewSet(viewsets.ModelViewSet):
    queryset = ActiveProgram.objects.all()
    serializer_class = ActiveProgramSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class IotDeviceViewSet(viewsets.ModelViewSet):
    queryset = IotDevice.objects.all()
    serializer_class = IotDeviceSerializer
