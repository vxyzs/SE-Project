from rest_framework import serializers
from .models import RealEstate

class RealEstateDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealEstate
        fields = ['location', 'area', 'bhk', 'price', 'city']  # Include 'id' if you want to expose the primary key

    def create(self, validated_data):
        """
        Create and return a new `RealEstateData` instance, given the validated data.
        """
        return RealEstate.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `RealEstateData` instance, given the validated data.
        """
        instance.city = validated_data.get('city', instance.city)
        instance.location = validated_data.get('location', instance.location)
        instance.area = validated_data.get('area', instance.area)
        instance.bhk = validated_data.get('bhk', instance.bhk)
        instance.price = validated_data.get('price', instance.price)
        instance.save()
        return instance
