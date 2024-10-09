from .models import RewardHistory
from django.db.models import Sum

def get_rewards_p5(id):
    rewards = RewardHistory.objects.filter(given_to = id).aggregate(rewards = Sum("points", default=0))
    p5_blance = RewardHistory.objects.filter(given_by = id).aggregate(p5 = Sum("points", default=0))
    return (rewards['rewards'], 100 - p5_blance['p5'])