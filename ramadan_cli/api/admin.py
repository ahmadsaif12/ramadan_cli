from django.contrib import admin
from .models import UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'city', 'country', 'school', 'method')
    list_filter = ('school', 'method', 'country')
    search_fields = ('user__username', 'city')
    fieldsets = (
        ('User Info', {
            'fields': ('user',)
        }),
        ('Location Settings', {
            'fields': ('city', 'country', 'latitude', 'longitude', 'timezone')
        }),
        ('Calculation Settings', {
            'fields': ('school', 'method')
        }),
        ('Ramadan Specifics', {
            'fields': ('first_roza_date',)
        }),
    )