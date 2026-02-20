from datetime import date

def get_ramadan_context(profile, api_hijri_data):

    if profile.first_roza_date:
        today = date.today()
        delta = (today - profile.first_roza_date).days + 1
        return delta if 1 <= delta <= 30 else "N/A"
    
    if api_hijri_data['month']['en'] == 'Ramadan':
        return int(api_hijri_data['day'])
    return 1