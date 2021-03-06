# Generated by Django 2.1.7 on 2019-03-27 22:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Airline',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('airplane_name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Airport',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('acronym', models.CharField(max_length=4)),
            ],
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('acronym', models.CharField(max_length=4)),
            ],
        ),
        migrations.CreateModel(
            name='Flight',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('fly_type', models.CharField(choices=[('Direct', 'Direct'), ('Scale', '1')], default='Direct', max_length=50)),
                ('out_date', models.DateField()),
                ('tiquets', models.IntegerField(default=50)),
                ('cost', models.IntegerField()),
                ('duration', models.IntegerField()),
                ('airline', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kayakapi.Airline')),
                ('airport', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kayakapi.Airport')),
            ],
        ),
        migrations.CreateModel(
            name='TravelClass',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('cost', models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='flight',
            name='class_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kayakapi.TravelClass', to_field='name'),
        ),
        migrations.AddField(
            model_name='flight',
            name='dest',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='destiny', to='kayakapi.Country', to_field='name'),
        ),
        migrations.AddField(
            model_name='flight',
            name='orig',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='origin', to='kayakapi.Country', to_field='name'),
        ),
    ]
