# Generated by Django 4.1.5 on 2023-02-07 01:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_neuralnet_weights'),
    ]

    operations = [
        migrations.AlterField(
            model_name='neuralnet',
            name='weights',
            field=models.TextField(default=''),
        ),
    ]
