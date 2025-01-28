from django.contrib import admin
from .models import Tarea

class TareaAdmin(admin.ModelAdmin):
    list_display = ('description', 'status', 'created_at', 'updated_at', 'is_deleted')

    list_filter = ('status', 'created_at', 'is_deleted')

    search_fields = ('description',)

    list_editable = ('status', 'is_deleted')

admin.site.register(Tarea, TareaAdmin)
