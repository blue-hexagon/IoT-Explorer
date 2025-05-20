from rest_framework import serializers

from device.models import Category, IotDevice, ActiveProgram, Program


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProgramSerializer(serializers.HyperlinkedModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Program
        fields = '__all__'


class IotDeviceSerializer(serializers.HyperlinkedModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = IotDevice
        fields = '__all__'


class ActiveProgramSerializer(serializers.HyperlinkedModelSerializer):
    program = ProgramSerializer()
    iot_device = IotDeviceSerializer()

    class Meta:
        model = ActiveProgram
        fields = '__all__'
