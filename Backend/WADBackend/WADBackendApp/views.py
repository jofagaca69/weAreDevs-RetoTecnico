from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Tarea
from .serializers import TareaSerializer
from rest_framework.response import Response

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.filter(is_deleted=False)
    serializer_class = TareaSerializer
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)