# Generated by Django 4.1.5 on 2023-02-07 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_alter_neuralnet_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='neuralnet',
            name='name',
            field=models.CharField(max_length=20),
        ),
    ]
