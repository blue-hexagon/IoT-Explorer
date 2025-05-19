from rest_framework import serializers

from device.models import Category, IotDevice, ActiveProgram, Program


class ProgramSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'


class ActiveProgramSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ActiveProgram
        fields = '__all__'


class IotDeviceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = IotDevice
        fields = '__all__'


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
