from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    username=serializers.ReadOnlyField(source='user.username')

    class Meta:
        model=UserProfile
        fields=[
            'username','city','country',
            'method','timezone','first_roza_date'
        ]
        