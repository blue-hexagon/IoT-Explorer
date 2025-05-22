from django.contrib import admin
from .models import Program, Category, IotDevice, ProgramInstance


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "duration","iot_device")
    search_fields = ("name", "description")
    ordering = ("name",)
    list_filter = ("duration",)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "abbreviation","title", "purpose")
    search_fields = ("title", "purpose", "help_text")
    ordering = ("title",)


class ProgramInstanceInline(admin.TabularInline):
    model = ProgramInstance
    fields = ("program", "start_time", "is_active")
    readonly_fields = ("is_active",)
    extra = 0
    can_delete = False
    show_change_link = True


@admin.register(IotDevice)
class IotDeviceAdmin(admin.ModelAdmin):
    list_display = ("id", "hostname", "category", "is_occupied")
    search_fields = ("hostname",)
    list_filter = ("category",)
    ordering = ("hostname",)
    # inlines = [ProgramInstanceInline]


@admin.register(ProgramInstance)
class ProgramInstanceAdmin(admin.ModelAdmin):
    list_display = ("id", "program", "start_time", "is_active")
    search_fields = ("program__name",)
    list_filter = ("program","start_time")
    readonly_fields = ("is_active",)
    ordering = ("-start_time",)
