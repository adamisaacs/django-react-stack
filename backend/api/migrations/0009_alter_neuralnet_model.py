# Generated by Django 4.1.5 on 2023-02-06 22:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_neuralnet_model'),
    ]

    operations = [
        migrations.AlterField(
            model_name='neuralnet',
            name='model',
            field=models.TextField(),
        ),
    ]
