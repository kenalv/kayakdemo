from django.db import models

# Create your models here.


class Airport(models.Model):
    name = models.CharField(max_length=100, unique=True)
    acronym = models.CharField(max_length=4)
   
    def __str__(self):
        return '%s %s' % (self.name, self.acronym)


class Country(models.Model):
    name = models.CharField(max_length = 100, unique = True)
    acronym = models.CharField(max_length = 4)

    def __str__(self):
            return '%s %s' % (self.name, self.acronym)


class Airline(models.Model):
    name = models.CharField(max_length=50, unique=True)
    airplane_name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class TravelClass(models.Model):
    name = models.CharField(max_length=50, unique=True)
    cost = models.IntegerField()

    def __str__(self):
        return self.name


class Flight(models.Model):
    DIRECT = 'Direct'
    SCALES = 'Scale'

    FLY_TYPE_CHOICES = ((DIRECT, 'Direct'),
                        (SCALES, '1'))

    id = models.AutoField(primary_key=True)
    fly_type = models.CharField(
        max_length=50, choices=FLY_TYPE_CHOICES, default=DIRECT)
    orig = models.ForeignKey(Country, to_field='name',
                             on_delete=models.CASCADE, related_name='origin')
    dest = models.ForeignKey(Country,  to_field='name',
                             on_delete=models.CASCADE, related_name='destiny')
    airline = models.ForeignKey(Airline,to_field='name', on_delete = models.CASCADE)
    airport = models.ForeignKey(Airport,to_field='name', on_delete = models.CASCADE)
    out_date = models.DateField()
    tiquets = models.IntegerField(default=50)
    cost = models.IntegerField()
    class_type = models.ForeignKey(TravelClass,  to_field='name',
                                   on_delete=models.CASCADE)

    duration = models.IntegerField()

    class Meta:
        ordering = ['cost']

    def __str__(self):
        return '%s %s' % (self.orig, self.dest)
