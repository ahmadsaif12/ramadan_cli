from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    city=models.CharField(max_length=255,blank=True,null=True)
    country=models.CharField(max_length=255,blank=True,null=True)
    SCHOOL_CHOICES=[
        (0, 'Standard (Shafi, Maliki, Hanbali)'),
        (1, 'Hanafi'),
    ]
    school=models.IntegerField(choices=SCHOOL_CHOICES,default=1)
    latitude=models.FloatField(blank=True,null=True)
    longitude=models.FloatField(blank=True,null=True)
    method=models.IntegerField(default=2)
    timezone=models.CharField(blank=True,null=True,max_length=255)
    first_roza_date=models.DateField(blank=True,null=True)
 
    def __str__(self):
        return self.user.username