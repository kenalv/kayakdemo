from rest_framework import serializers
from kayakapi.models import Country,Airport,Airline,Flight,TravelClass


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'
class TravelClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelClass
        fields = '__all__'

class AirlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airline
        fields = '__all__'

class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = '__all__'


class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'

    def update(self, instance, validated_data):
        """
        Update and return an existing `Serie` instance, given the validated data.
        """
        instance.tiquets = validated_data.get('tiquets', instance.tiquets)
        instance.save()
        
        return instance

