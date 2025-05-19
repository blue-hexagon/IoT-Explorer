from django.contrib import admin
from .models import Program, Category, IotDevice, ActiveProgram


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "duration")
    search_fields = ("name", "description")
    ordering = ("name",)
    list_filter = ("duration",)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "purpose")
    search_fields = ("title", "purpose", "help_text")
    ordering = ("title",)


class ActiveProgramInline(admin.TabularInline):
    model = ActiveProgram
    fields = ("program", "start_time", "is_active")
    readonly_fields = ("start_time", "is_active")
    extra = 0
    can_delete = False
    show_change_link = True


@admin.register(IotDevice)
class IotDeviceAdmin(admin.ModelAdmin):
    list_display = ("id", "hostname", "category", "is_occupied")
    search_fields = ("hostname",)
    list_filter = ("category",)
    ordering = ("hostname",)
    inlines = [ActiveProgramInline]


@admin.register(ActiveProgram)
class ActiveProgramAdmin(admin.ModelAdmin):
    list_display = ("id", "iot_device", "program", "start_time", "is_active")
    search_fields = ("iot_device__hostname", "program__name")
    list_filter = ("program", "iot_device")
    readonly_fields = ("start_time", "is_active")
    ordering = ("-start_time",)
