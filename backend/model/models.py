from django.db import models

class RealEstate(models.Model):
    city = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    area = models.IntegerField()
    bhk = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # Updated max_digits

    def __str__(self):
        return f"{self.city}, {self.location} - {self.bhk} bedroom(s), Area: {self.area} sqft, Price: {self.price}"
