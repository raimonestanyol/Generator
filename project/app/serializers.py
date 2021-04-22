from rest_framework import serializers
from .models import DataRegistry


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataRegistry
        fields = '__all__'
