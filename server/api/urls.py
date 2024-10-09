from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("create-user", views.create_user, name="create user"),
    path("edit/<int:id>", views.edit_user, name="get user"),
    path("p5/<int:id>", views.get_user_p5, name="get user p5"),
    path("rewards/<int:id>", views.get_user_rewards, name="get user rewards"),
    path("rewards/<int:id>/new", views.create_reward, name="create new reward"),
    path("delete", views.delete_p5, name="delete user p5"),
    path("<int:id>", views.get_user, name="get user")
]
