from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response
from .models import User, RewardHistory
from .serializers import UserSerializer, RewardsRecordsSerializer, P5RecordsSerializer
from django.db.models import Q
from .utils import get_rewards_p5
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def index(request: Request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    for user in serializer.data:
        result = get_rewards_p5(user['id'])
        user['rewards'], user['p5_balance'] = result
    return Response(serializer.data)

@api_view(['GET'])
def get_user(request: Request, id):
    user = None
    try:
        user = User.objects.get(id=id)
    except:
        return Response({
            "message": "User not found"
        }, 404)
    serializer = UserSerializer(user)
    result = get_rewards_p5(serializer.data['id'])
    return Response({**serializer.data, 'rewards': result[0], 'p5_balance': result[1]})

@api_view(['GET'])
def get_user_p5(request: Request, id):
    user = None
    try:
        user = User.objects.get(id=id)
    except:
        return Response({
            "message": "User not found"
        }, 404)
    serializer = UserSerializer(user)
    result = get_rewards_p5(serializer.data['id'])
    data = {}
    data["p5_balance"] = result[1]
    all_records = RewardHistory.objects.filter(given_by=serializer.data['id'])
    data['p5_history'] = P5RecordsSerializer(all_records, many=True).data
    return Response(data)

@api_view(['GET'])
def get_user_rewards(request: Request, id):
    user = None
    try:
        user = User.objects.get(id=id)
    except:
        return Response({
            "message": "User not found"
        }, 404)
    serializer = UserSerializer(user)
    result = get_rewards_p5(serializer.data['id'])
    data = {}
    data["rewards_balance"] = result[0]
    all_records = RewardHistory.objects.filter(given_to=serializer.data['id'])
    data['rewards_history'] = RewardsRecordsSerializer(all_records, many=True).data
    return Response(data)



@api_view(['POST'])
def create_user(request: Request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = None
    try:
        user = User.objects.get(name=request.data['name'])
    except:
        pass
    if user is not None:
        return Response({
            "message": "User already exists with the same name"
        }, 400)
    serializer.save()
    return Response({
        "data": serializer.data,
        "message": "User Created"
    })

@api_view(['POST'])
def delete_p5(request: Request):
    data = request.data
    p5_record = None
    try:
        p5_record = RewardHistory.objects.get(Q(created_at=data['created_at']) & Q(given_by=data['given_by']))
    except:
        return Response({
            "message": "P5 Not Found"
        }, 404)
    p5_record.delete()
    return Response({
        "message": "Deleted"
    })


@api_view(['POST'])
def edit_user(request: Request, id):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = None
    try:
        user = User.objects.get(name=request.data['name'])
    except:
        pass
    if user is not None:
        return Response({
            "message": "User already exists with the same name"
        }, 400)
    existing_user = get_object_or_404(User, id=id)
    existing_user.name = request.data['name']
    existing_user.save()
    return Response({
        "data": "Updated"
    })

@api_view(['POST'])
def create_reward(request: Request, id):
    data = request.data
    if data['to'] is None or data['points'] is None:
        return Response({
            "message": "To User and Points are required"
        }, 400)
    result = get_rewards_p5(id)
    if (int(result[1]) - int(data['points'])) < 0:
        return Response({
            "message": "Not enough reward points"
        }, 400)
    given_to = get_object_or_404(User, id=data['to'])
    given_by = get_object_or_404(User, id=id)
    create_reward_point = RewardHistory(points = int(data['points']), given_to= given_to, given_by=given_by)
    create_reward_point.save()
    return Response({
        "data": "Created point"
    })