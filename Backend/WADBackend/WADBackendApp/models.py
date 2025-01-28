from django.db import models
from django.utils import timezone

class Tarea(models.Model):
    STATUS_CHOICES = [
        ('P', 'Pendiente'),
        ('C', 'Completada'),
        ('Z', 'Pospuesta'),
    ]

    description = models.CharField(max_length=255)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.description