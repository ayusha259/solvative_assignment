# Generated by Django 4.2.11 on 2024-10-09 16:37

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_user_p5_balance"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="p5_balance",
        ),
    ]
