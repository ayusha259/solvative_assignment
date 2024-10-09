from django.db import models

# Create your models here.

class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'users'
    
    def __str__(self):
        return self.name
    
class RewardHistory(models.Model):
    points = models.IntegerField()
    given_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_by')
    given_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_to')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'reward_history'