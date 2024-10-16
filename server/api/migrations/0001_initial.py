# Generated by Django 4.2.11 on 2024-10-09 15:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=100)),
            ],
            options={
                "db_table": "users",
            },
        ),
        migrations.CreateModel(
            name="RewardHistory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("points", models.IntegerField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "given_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="given_by",
                        to="api.user",
                    ),
                ),
                (
                    "given_to",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="given_to",
                        to="api.user",
                    ),
                ),
            ],
            options={
                "db_table": "reward_history",
            },
        ),
    ]
