from django.urls import path
from . import views
urlpatterns = [
    path('', views.home),
    path('home/', views.home),
    path('about/', views.about),
    path('table/', views.list_registries),
    path('graph/', views.graph_registries),
    path('realTimeAPI/', views.real_time),
    path('tableAPI/<int:date_from>/<int:date_to>/', views.registry_table),
    path('graphAPI/<int:graphs>/<int:date_from>/<int:date_to>/', views.registry_graph),
]
