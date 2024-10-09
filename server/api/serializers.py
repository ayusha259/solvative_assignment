from rest_framework import serializers
from .models import User, RewardHistory

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name']

class P5RecordsSerializer(serializers.ModelSerializer):
    given_to = UserSerializer(read_only=True)
    class Meta:
        model = RewardHistory
        fields = ['points', 'created_at', 'given_to']

class RewardsRecordsSerializer(serializers.ModelSerializer):
    given_by = UserSerializer(read_only=True)
    class Meta:
        model = RewardHistory
        fields = ['points', 'created_at', 'given_by']

class RegisterUser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name']
        extra_kwargs = {
            'name': 'required'
        }