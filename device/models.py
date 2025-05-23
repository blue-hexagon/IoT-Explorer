import uuid

import django
from django.db import models

from django.utils import timezone
from django.utils.timezone import now


class BaseTimestampedModel(models.Model):
    created = models.DateTimeField(default=now, editable=False)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(models.Model):
    """ Statically defined categories used for classifying iot-devices """
    title = models.CharField(max_length=63, blank=False, null=False, verbose_name="Kategori Titel")
    abbreviation = models.CharField(max_length=8,unique=True, blank=False, null=False, verbose_name="Kategori Forkortelse")
    purpose = models.CharField(max_length=400, blank=True, null=False)
    help_text = models.CharField(max_length=400, blank=True, null=False)

    class Meta:
        managed = True
        app_label = 'device'
        db_table = "category"
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self) -> str:
        return f"[{self.abbreviation}]: {self.title}"


class IotDevice(models.Model):
    """ IOT Device: Main model structure.
        * Takes POST request to set `active_programs`
        * Takes GET request to read own fields along with active_programs for showcasing on the frontend.
        * Takes no PUT or PATCH requests.
        * Takes DELETE request to archive old/replaced IOT-devices.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    hostname = models.CharField(max_length=63, blank=False, null=False, unique=True, verbose_name="Enhed Navn")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        managed = True
        app_label = 'device'
        db_table = "iot_device"
        verbose_name = "IoT Device"
        verbose_name_plural = "IoT Devices"

    def __str__(self) -> str:
        return f"[{self.category.abbreviation}]: {self.hostname}"

    def is_occupied(self) -> bool:
        """ Returns True if one or more programs are running on the device """
        return any([prg for prg in ProgramInstance.objects.filter(iot_device=self) if prg.is_active()])

    is_occupied.boolean = True
    is_occupied.short_description = "Currently Running"


class Program(models.Model):
    """ Statically defined programs that sets a name, duration and description for reuseability """
    name = models.CharField(max_length=63, blank=False, null=False, verbose_name="Program Navn")
    duration = models.DurationField()
    description = models.TextField(blank=True)
    iot_device = models.ForeignKey(IotDevice, on_delete=models.CASCADE, related_name="iot_devices")

    class Meta:
        managed = True
        app_label = 'device'
        db_table = "program"
        verbose_name = "Program"
        verbose_name_plural = "Programs"

    def __str__(self) -> str:
        return f"[{self.iot_device.category.abbreviation}:{self.duration}]: {self.name}"


class ProgramInstance(models.Model):
    start_time = models.DateTimeField(default=django.utils.timezone.now)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    class Meta:
        managed = True
        app_label = 'device'
        db_table = "program_instance"
        verbose_name = "Program Instance"
        verbose_name_plural = "Programs Instances"
        ordering = ['-start_time']

    def is_active(self):
        if not self.start_time:
            return False
        return timezone.now() < self.start_time + self.program.duration

    is_active.boolean = True

    def __str__(self):
        return f"{self.program.iot_device.hostname}: {self.program.name}"
