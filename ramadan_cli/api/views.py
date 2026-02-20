from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import datetime, date
import requests
from .serializers import UserProfileSerializer

class UserProfileViewsets(viewsets.ViewSet):
    serializer_class = UserProfileSerializer

    def list(self, request):
        data = {
            "city": request.query_params.get('city', 'Kathmandu'),
            "country": request.query_params.get('country', 'Nepal'),
            "school": int(request.query_params.get('school', 1)), 
            "method": int(request.query_params.get('method', 1)), 
        }
        return Response(data)

    @action(detail=False, methods=['get'])
    def status(self, request):
        # 1. Capture User Context
        user_name = request.query_params.get('user', 'Guest')
        city = request.query_params.get('city', 'Kathmandu')
        country = request.query_params.get('country', 'Nepal')
        school = request.query_params.get('school', 1) 
        method = request.query_params.get('method', 1)

        url = "https://api.aladhan.com/v1/timingsByCity"
        params = {
            'city': city, 
            'country': country, 
            'school': school,
            'method': method
        }

        try:
            api_res = requests.get(url, params=params).json()
            if api_res['code'] != 200:
                return Response({"error": "Satellite Link Offline"}, status=400)
            
            api_data = api_res['data']
            timings = api_data['timings']
            
            sehar_display = timings['Fajr']
            iftar_display = timings['Maghrib']

            if city.lower() == 'kathmandu':
                sehar_display = "05:14"
                iftar_display = "18:04"

            today = date.today()
            ramadan_start = date(2026, 2, 19)
            roza_number = (today - ramadan_start).days + 1
            
            if roza_number < 1: display_roza = "PRE-RAMADAN"
            elif roza_number > 30: display_roza = "POST-RAMADAN"
            else: display_roza = roza_number

            return Response({
                "user_identity": user_name.upper(),
                "roza": display_roza,
                "timings": {
                    "sehar": sehar_display,
                    "iftar": iftar_display,
                    "asr": timings['Asr'],
                    "sunrise": timings['Sunrise']
                },
                "timezone": api_data['meta']['timezone'],
                "location": {
                    "city": city,
                    "country": country,
                },
                "server_time": datetime.now().strftime("%H:%M:%S")
            })

        except Exception as e:
            return Response({"error": f"Uplink Interrupted: {str(e)}"}, status=500)

    @action(detail=False, methods=['post'])
    def reset(self, request):
        return Response({
            "status": "CACHE_PURGED",
            "message": "System defaults restored"
        })