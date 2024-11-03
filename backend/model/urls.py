from django.urls import path
from .views import Predict
from .views import GetDetails
from .views import PushCSVData

urlpatterns = [
    path('predict/', Predict.as_view(), name='predict'),
    path('get-details/', GetDetails.as_view(), name='get_details'),
    path('push-csv/', PushCSVData.as_view(), name='push-csv-data'),
]