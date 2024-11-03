# Generated by Django 5.1.2 on 2024-10-28 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RealEstateData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=255)),
                ('region', models.CharField(max_length=255)),
                ('bedroom', models.IntegerField()),
                ('carpet_area', models.DecimalField(decimal_places=2, max_digits=10)),
                ('rate_per_sqft', models.DecimalField(decimal_places=2, max_digits=10)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('transaction_type', models.CharField(max_length=50)),
            ],
        ),
    ]