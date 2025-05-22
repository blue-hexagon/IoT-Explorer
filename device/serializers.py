from rest_framework import serializers

from device.models import Category, IotDevice, ProgramInstance, Program


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'



class IotDeviceSerializer(serializers.HyperlinkedModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = IotDevice
        fields = '__all__'

class ProgramSerializer(serializers.HyperlinkedModelSerializer):
    iot_device = IotDeviceSerializer()
    class Meta:
        model = Program
        fields = '__all__'


class ProgramInstanceSerializer(serializers.HyperlinkedModelSerializer):
    program = ProgramSerializer()

    class Meta:
        model = ProgramInstance
        fields = '__all__'
