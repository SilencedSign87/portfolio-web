<script>
    import ArticleHeader from "@components/article/ArticleHeader.svelte";
    import ArticleSectionTitle from "@components/article/ArticleSectionTitle.svelte";
    import Paragraph from "@components/article/Paragraph.svelte";
    import CodeBlock from "@components/article/CodeBlock.svelte";
    import Paper from "@components/article/Paper.svelte";
    import PostIt from "@components/PostIt.svelte";
    import blur1dark from "@assets/blur1dark.jpg";
    import blur1light from "@assets/blur1light.png";
    import ThemeImage from "@components/ThemeImage.svelte";
</script>

<main class="cuaderno">
    <Paper sheet="13" revision="A">
        {#snippet title()}Semana 13 — Diseño de APIs RESTful{/snippet}

        <ArticleHeader
            number="13.00"
            title="Diseño de APIs RESTful con Django REST Framework"
            description="REST (Representational State Transfer) es un estilo de arquitectura para diseñar servicios web que utilizan HTTP como protocolo de comunicación. Django REST Framework (DRF) es la herramienta más popular para construir APIs RESTful en Python, proporcionando serializadores, vistas genéricas, autenticación y mucho más."
        >
            {#snippet before()}
                <ThemeImage
                    lightSrc={blur1light}
                    darkSrc={blur1dark}
                    alt="Imagen de fondo"
                    class="cuaderno-hero"
                />
            {/snippet}
        </ArticleHeader>

        <ArticleSectionTitle number="13.01" title="Introducción a REST" description="Principios fundamentales" />
        <Paragraph>
            REST es un estilo arquitectónico que define seis restricciones
            para crear servicios web: cliente-servidor, sin estado
            (stateless), caché, interfaz uniforme, sistema en capas y
            código bajo demanda (opcional). Una API RESTful expone
            recursos (usuarios, artículos, etc.) como URLs y utiliza
            los métodos HTTP estándar para operar sobre ellos: GET para
            leer, POST para crear, PUT/PATCH para actualizar y DELETE
            para eliminar.
        </Paragraph>
        <CodeBlock
            language="text"
            filename="rest_convenciones.txt"
            code={`Principios REST:
─────────────────────────────────────────────
  Recurso         GET        POST       PUT/PATCH    DELETE
─────────────────────────────────────────────
  /api/articulos  Listar     Crear      ─            ─
  /api/articulos/ Leer       ─          Actualizar   Eliminar
  {id}/                     (405)                  (completo)   (id=1)

Métodos HTTP:
  GET     → Obtener recurso (seguro, idempotente)
  POST    → Crear recurso (no seguro, no idempotente)
  PUT     → Reemplazar recurso completo (idempotente)
  PATCH   → Actualizar recurso parcialmente
  DELETE  → Eliminar recurso (idempotente)

Códigos de estado comunes:
  200 OK           → Éxito
  201 Created      → Recurso creado
  204 No Content   → Eliminado (sin cuerpo)
  400 Bad Request  → Datos inválidos
  401 Unauthorized → No autenticado
  403 Forbidden    → Sin permisos
  404 Not Found    → Recurso no existe
  422 Unprocessable→ Validación fallida
  500 Server Error → Error interno`}
        />
        <PostIt number="N.30" title="REST no es un estándar" align="right" variant="info">
            <p>REST es un estilo arquitectónico, no un protocolo ni un estándar. Se basa en la tesis doctoral de Roy Fielding (2000). Muchas APIs que se llaman RESTful no cumplen todas las restricciones, especialmente HATEOAS.</p>
        </PostIt>

        <ArticleSectionTitle number="13.02" title="Instalación de Django REST Framework" description="Configuración inicial de DRF" />
        <Paragraph>
            Django REST Framework (DRF) se instala vía pip y se configura
            como una aplicación más en el proyecto. DRF proporciona
            browsersables API, autenticación integrada, serializadores,
            vistas genéricas y un potente sistema de permisos y
            throttling.
        </Paragraph>
        <CodeBlock
            language="bash"
            filename="instalacion_drf.sh"
            code={`# Instalar Django REST Framework
pip install djangorestframework

# Opcionales útiles
pip install django-filter        # Filtrado avanzado
pip install markdown             # Navegable API con markdown
pip install django-cors-headers  # CORS para frontend


# settings.py — Agregar a INSTALLED_APPS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    # ...
    'rest_framework',
    'corsheaders',          # Si usas django-cors-headers
    'django_filters',       # Si usas django-filter
    'blog',                 # Tu aplicación
]

# Configuración global de DRF
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS':
        'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '1000/day',
    },
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
}

# CORS (corsheaders)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://midominio.com",
]
CORS_ALLOW_CREDENTIALS = True`}
        />
        <PostIt number="N.31" title="Browsable API" align="left" variant="warning">
            <p>DRF genera automáticamente una interfaz navegable para cada endpoint. Accede desde el navegador para explorar la API, hacer peticiones de prueba y ver la documentación interactiva.</p>
        </PostIt>

        <ArticleSectionTitle number="13.03" title="Serialización de modelos" description="Convertir modelos a JSON y viceversa" />
        <Paragraph>
            Los serializadores transforman instancias de modelos Python
            en JSON (serialización) y datos JSON en instancias validadas
            (deserialización). DRF ofrece ModelSerializer que genera
            automáticamente los campos basados en el modelo, incluyendo
            validación básica. También se pueden crear serializadores
            manuales para fuentes de datos que no son modelos.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="serializers.py"
            code={`from rest_framework import serializers
from .models import Articulo, Categoria, Autor, Comentario


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'slug']


class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = ['id', 'nombre', 'email', 'bio']


class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = '__all__'
        read_only_fields = ['fecha_creacion', 'articulo']


class ArticuloListSerializer(serializers.ModelSerializer):
    """Serializer compacto para listados."""
    autor = serializers.StringRelatedField()
    categoria = serializers.StringRelatedField()
    resumen = serializers.SerializerMethodField()

    class Meta:
        model = Articulo
        fields = [
            'id', 'titulo', 'slug', 'resumen',
            'autor', 'categoria', 'estado',
            'fecha_publicacion',
        ]

    def get_resumen(self, obj):
        return obj.contenido[:200] if obj.contenido else ''


class ArticuloDetailSerializer(serializers.ModelSerializer):
    """Serializer completo para detalle."""
    autor = AutorSerializer(read_only=True)
    categoria = CategoriaSerializer(read_only=True)
    etiquetas = serializers.StringRelatedField(many=True)
    comentarios = ComentarioSerializer(
        many=True, read_only=True
    )
    tiempo_lectura = serializers.SerializerMethodField()

    class Meta:
        model = Articulo
        fields = [
            'id', 'titulo', 'slug', 'contenido',
            'resumen', 'autor', 'categoria',
            'etiquetas', 'estado', 'destacado',
            'fecha_publicacion', 'fecha_creacion',
            'fecha_actualizacion', 'comentarios',
            'tiempo_lectura',
        ]
        read_only_fields = [
            'fecha_creacion', 'fecha_actualizacion'
        ]

    def get_tiempo_lectura(self, obj):
        palabras = len(obj.contenido.split())
        return max(1, round(palabras / 200))  # min. 1 minuto


# === Serializador manual (no usa modelo) ===
class ContactoSerializer(serializers.Serializer):
    nombre = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    asunto = serializers.CharField(max_length=200)
    mensaje = serializers.CharField()
    prioridad = serializers.ChoiceField(
        choices=['baja', 'media', 'alta']
    )

    def validate_nombre(self, value):
        if len(value) < 3:
            raise serializers.ValidationError(
                'El nombre debe tener al menos 3 caracteres'
            )
        return value

    def create(self, validated_data):
        # Lógica para guardar el contacto
        return validated_data`}
        />
        <PostIt number="N.32" title="SerializerMethodField" align="right" variant="info">
            <p>SerializerMethodField permite añadir campos calculados que no existen en el modelo. El valor se obtiene de un método get_&lt;nombre_campo&gt; en el serializador. Es de solo lectura.</p>
        </PostIt>

        <ArticleSectionTitle number="13.04" title="Vistas y ViewSets" description="APIViews, ViewSets y routers" />
        <Paragraph>
            DRF ofrece múltiples formas de construir vistas. APIView es la
            clase base para lógica personalizada. GenericAPIView
            combinado con mixins (ListModelMixin, CreateModelMixin,
            etc.) proporciona operaciones CRUD estándar. ViewSet
            agrupa todas las operaciones de un recurso en una sola
            clase, y ModelViewSet las ofrece todas por defecto.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="views.py"
            code={`from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
)
from rest_framework.views import APIView
from .models import Articulo, Categoria, Comentario
from .serializers import (
    ArticuloListSerializer, ArticuloDetailSerializer,
    CategoriaSerializer, ComentarioSerializer,
    ContactoSerializer
)


# === ModelViewSet: CRUD completo ===
class ArticuloViewSet(viewsets.ModelViewSet):
    queryset = Articulo.objects.filter(
        estado='publicado'
    )
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        """Serializer diferente según la acción."""
        if self.action == 'list':
            return ArticuloListSerializer
        return ArticuloDetailSerializer

    def perform_create(self, serializer):
        """Asignar autor automáticamente."""
        serializer.save(autor=self.request.user)

    @action(detail=True, methods=['post'])
    publicar(self, request, pk=None):
        """Acción personalizada: publicar un artículo."""
        articulo = self.get_object()
        articulo.publicar()
        return Response({'status': 'artículo publicado'})

    @action(detail=False, methods=['get'])
    destacados(self, request):
        """Endpoint /api/articulos/destacados/."""
        articulos = self.get_queryset().filter(destacado=True)
        page = self.paginate_queryset(articulos)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


# === ViewSet simple (solo lectura) ===
class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


# === GenericAPIView con mixins ===
class ComentarioListCreateView(
    generics.ListCreateAPIView
):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(
            autor=self.request.user
        )


class ComentarioDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer


# === APIView para lógica personalizada ===
class ContactoAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ContactoSerializer(
            data=request.data
        )
        if serializer.is_valid():
            # Procesar contacto (enviar email, etc.)
            return Response(
                {'mensaje': 'Mensaje recibido'},
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )`}
        />

        <ArticleSectionTitle number="13.05" title="Ruteadores y conjuntos de vistas" description="Registro automático de URLs" />
        <Paragraph>
            Los routers de DRF generan automáticamente las URLs para un
            ViewSet, creando tanto las rutas de listado/creación como
            las de detalle/actualización/eliminación. También registran
            automáticamente las acciones personalizadas decoradas con
            @action. DefaultRouter añade además un endpoint raíz con
            la lista de todos los recursos disponibles.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="urls_router.py"
            code={`# === urls.py con routers ===
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ArticuloViewSet, CategoriaViewSet,
    ComentarioListCreateView, ComentarioDetailView,
    ContactoAPIView
)

# Router para ViewSets
router = DefaultRouter()
router.register(r'articulos', ArticuloViewSet, basename='articulo')
router.register(r'categorias', CategoriaViewSet, basename='categoria')

# URLs generadas por el router:
# GET    /api/articulos/              → list
# POST   /api/articulos/              → create
# GET    /api/articulos/{id}/         → retrieve
# PUT    /api/articulos/{id}/         → update
# PATCH  /api/articulos/{id}/         → partial_update
# DELETE /api/articulos/{id}/         → destroy
# POST   /api/articulos/{id}/publicar/→ publicar (acción)
# GET    /api/articulos/destacados/   → destacados (acción)
# GET    /api/categorias/             → list
# GET    /api/categorias/{id}/        → retrieve

# Vista raíz de la API (DefaultRouter)
# GET /api/ → lista todos los endpoints disponibles

urlpatterns = [
    # Vistas sin router (usando generics)
    path('comentarios/',
         ComentarioListCreateView.as_view(),
         name='comentario-list'),
    path('comentarios/<int:pk>/',
         ComentarioDetailView.as_view(),
         name='comentario-detail'),

    # APIView personalizada
    path('contacto/',
         ContactoAPIView.as_view(),
         name='contacto'),

    # Incluir rutas del router
    path('api/', include(router.urls)),
]


# === urls.py del proyecto ===
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/',
         include('rest_framework.urls')),  # Login/logout DRF
    path('', include('blog.urls')),
]`}
        />
        <PostIt number="N.33" title="DefaultRouter vs SimpleRouter" align="left" variant="warning">
            <p>DefaultRouter incluye una vista raíz con hipervínculos a todos los registros. SimpleRouter no la incluye. Para la mayoría de proyectos, DefaultRouter es la opción recomendada.</p>
        </PostIt>

        <ArticleSectionTitle number="13.06" title="APIs de Hipermedios y HATEOAS" description="Hypermedia as the Engine of Application State" />
        <Paragraph>
            HATEOAS es una restricción de REST que establece que un
            cliente debe poder navegar la API únicamente a través de
            enlaces proporcionados dinámicamente por el servidor. En la
            práctica, esto significa que las respuestas incluyen URLs
            relacionadas (self, next, previous, related resources) que
            el cliente puede seguir sin conocimiento previo de la
            estructura de la API. DRF soporta esto con HyperlinkedModelSerializer y
            HyperlinkedIdentityField.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="hateoas.py"
            code={`from rest_framework import serializers
from rest_framework.reverse import reverse
from .models import Articulo, Categoria


class CategoriaHyperlinkedSerializer(
    serializers.HyperlinkedModelSerializer
):
    class Meta:
        model = Categoria
        fields = ['url', 'id', 'nombre', 'slug']
        extra_kwargs = {
            'url': {
                'view_name': 'categoria-detail',
                'lookup_field': 'pk',
            },
        }


class ArticuloHyperlinkedSerializer(
    serializers.HyperlinkedModelSerializer
):
    autor = serializers.HyperlinkedRelatedField(
        view_name='autor-detail',
        read_only=True,
    )
    categoria = serializers.HyperlinkedRelatedField(
        view_name='categoria-detail',
        read_only=True,
    )
    enlaces = serializers.SerializerMethodField()

    class Meta:
        model = Articulo
        fields = [
            'url', 'id', 'titulo', 'slug',
            'contenido', 'autor', 'categoria',
            'estado', 'fecha_publicacion',
            'enlaces',
        ]
        extra_kwargs = {
            'url': {
                'view_name': 'articulo-detail',
                'lookup_field': 'pk',
            },
        }

    def get_enlaces(self, obj):
        request = self.context.get('request')
        return {
            'comentarios': reverse(
                'comentario-list',
                request=request,
            ) + f'?articulo={obj.id}',
            'articulos_relacionados': reverse(
                'articulo-related',
                kwargs={'pk': obj.id},
                request=request,
            ),
        }

# Respuesta HATEOAS:
# {
#     "url": "http://api.example.com/articulos/1/",
#     "id": 1,
#     "titulo": "Introducción a REST",
#     "autor": "http://api.example.com/autores/1/",
#     "categoria": "http://api.example.com/categorias/2/",
#     "enlaces": {
#         "comentarios": "http://api.example.com/comentarios/?articulo=1",
#         "articulos_relacionados": "http://api.example.com/articulos/1/relacionados/"
#     }
# }`}
        />

        <ArticleSectionTitle number="13.07" title="Filtrado, búsqueda y ordenación" description="Query parameters para filtrar resultados" />
        <Paragraph>
            DRF se integra con django-filter para proporcionar filtrado
            avanzado por campos del modelo. Además, incluye filtros de
            búsqueda (SearchFilter) y ordenación (OrderingFilter). Los
            filtros se aplican mediante query parameters en la URL y se
            pueden personalizar para cada vista.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="filtros.py"
            code={`from rest_framework import viewsets, filters
from django_filters.rest_framework import (
    DjangoFilterBackend, FilterSet
)
from django_filters import (
    DateFilter, CharFilter, NumberFilter,
    BooleanFilter, ChoiceFilter
)
from .models import Articulo


# === FilterSet personalizado ===
class ArticuloFilter(FilterSet):
    titulo = CharFilter(
        lookup_expr='icontains'
    )
    contenido = CharFilter(
        lookup_expr='icontains'
    )
    fecha_desde = DateFilter(
        field_name='fecha_publicacion',
        lookup_expr='gte'
    )
    fecha_hasta = DateFilter(
        field_name='fecha_publicacion',
        lookup_expr='lte'
    )
    categoria = CharFilter(
        field_name='categoria__slug',
        lookup_expr='exact',
    )
    autor = NumberFilter(
        field_name='autor__id',
    )
    destacado = BooleanFilter()
    etiqueta = CharFilter(
        field_name='etiquetas__slug',
        lookup_expr='exact',
    )

    class Meta:
        model = Articulo
        fields = [
            'estado', 'categoria', 'autor',
            'destacado',
        ]


class ArticuloViewSet(viewsets.ModelViewSet):
    queryset = Articulo.objects.all()
    filterset_class = ArticuloFilter
    # Alternativa: filterset_fields = ['estado', 'categoria__slug']

    # Búsqueda textual (SearchFilter)
    search_fields = [
        'titulo',
        'contenido',
        'autor__nombre',
        'categoria__nombre',
    ]

    # Ordenación (OrderingFilter)
    ordering_fields = [
        'fecha_publicacion',
        'titulo',
        'autor__nombre',
    ]
    ordering = ['-fecha_publicacion']

    # Uso:
    # GET /api/articulos/?search=django
    # GET /api/articulos/?categoria__slug=python
    # GET /api/articulos/?fecha_desde=2026-01-01&fecha_hasta=2026-12-31
    # GET /api/articulos/?ordering=titulo
    # GET /api/articulos/?destacado=true
    # GET /api/articulos/?etiqueta=django&estado=publicado`}
        />

        <ArticleSectionTitle number="13.08" title="Paginación" description="Paginación de resultados en APIs" />
        <Paragraph>
            DRF ofrece varios estilos de paginación: PageNumberPagination
            (páginas numeradas), LimitOffsetPagination (límite y
            desplazamiento) y CursorPagination (cursor basado en un
            campo). La paginación se puede configurar globalmente o por
            vista. Las respuestas paginadas incluyen metadatos como el
            total de elementos y enlaces a las páginas siguiente y
            anterior.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="paginacion.py"
            code={`from rest_framework.pagination import (
    PageNumberPagination,
    LimitOffsetPagination,
    CursorPagination,
)


# === Paginación personalizada ===
class PaginacionEstandar(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
    page_query_param = 'pagina'  # ?pagina=2


class PaginacionCursor(CursorPagination):
    """Eficiente para datos en tiempo real."""
    page_size = 20
    ordering = '-fecha_publicacion'
    cursor_query_param = 'cursor'


# === Aplicar a una vista ===
class ArticuloViewSet(viewsets.ModelViewSet):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloListSerializer
    pagination_class = PaginacionEstandar
    # O usar paginación por cursor:
    # pagination_class = PaginacionCursor

# Respuesta paginada (PageNumberPagination):
# GET /api/articulos/?pagina=2&page_size=5
# {
#     "count": 42,
#     "next": "http://api.example.com/api/articulos/?pagina=3&page_size=5",
#     "previous": "http://api.example.com/api/articulos/?page=1&page_size=5",
#     "results": [ ... ]
# }

# Respuesta paginada (LimitOffsetPagination):
# GET /api/articulos/?limit=10&offset=20
# {
#     "count": 42,
#     "next": "http://api.example.com/api/articulos/?limit=10&offset=30",
#     "previous": "http://api.example.com/api/articulos/?limit=10&offset=10",
#     "results": [ ... ]
# }

# Respuesta paginada (CursorPagination):
# GET /api/articulos/?cursor=cD0yMDI2LTA3LTAx
# {
#     "next": "http://api.example.com/api/articulos/?cursor=cD0yMDI2LTA3LTE1",
#     "previous": null,
#     "results": [ ... ]
# }`}
        />
        <PostIt number="N.34" title="CursorPagination vs PageNumberPagination" align="right" variant="info">
            <p>CursorPagination es más eficiente para grandes conjuntos de datos porque evita OFFSET en SQL. Es ideal para feeds en tiempo real. PageNumberPagination es más intuitiva para el usuario final y permite saltar directamente a una página específica.</p>
        </PostIt>

        <ArticleSectionTitle number="13.09" title="Límites temporales de uso (Throttling)" description="Control de tasa de peticiones" />
        <Paragraph>
            El throttling limita el número de peticiones que un cliente
            puede hacer en un período de tiempo. DRF ofrece throttle
            rates por usuario y por anónimo, y permite crear clases
            personalizadas. Las respuestas incluyen cabeceras como
            X-RateLimit-Limit, X-RateLimit-Remaining y
            Retry-After cuando se supera el límite.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="throttling.py"
            code={`from rest_framework.throttling import (
    AnonRateThrottle,
    UserRateThrottle,
    ScopedRateThrottle,
)


# === Configuración global (settings.py) ===
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',      # 100 peticiones/día para anónimos
        'user': '1000/day',     # 1000 peticiones/día para usuarios
    },
}


# === Throttle por vista (ScopedRateThrottle) ===
class ArticuloViewSet(viewsets.ModelViewSet):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloDetailSerializer
    throttle_scope = 'articulos'


class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
    throttle_scope = 'comentarios'


# settings.py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.ScopedRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'articulos': '1000/hour',
        'comentarios': '20/hour',  # Límite más estricto
        'contacto': '5/hour',      # Muy restrictivo
    },
}


# === Throttle personalizado ===
from rest_framework.throttling import SimpleRateThrottle

class SuscripcionThrottle(SimpleRateThrottle):
    """Límite según el plan del usuario."""
    scope = 'suscripcion'

    def get_cache_key(self, request, view):
        if request.user.is_authenticated:
            plan = getattr(request.user, 'plan', 'free')
            return self.cache_format % {
                'scope': self.scope,
                'ident': f"{plan}:{request.user.pk}"
            }
        return None

    def allow_request(self, request, view):
        if request.user.is_authenticated:
            plan = getattr(request.user, 'plan', 'free')
            limites = {
                'free': '100/day',
                'pro': '10000/day',
                'enterprise': '100000/day',
            }
            self.rate = limites.get(plan, '100/day')
            self.num_requests, self.duration = self.parse_rate(self.rate)
        return super().allow_request(request, view)


# settings.py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_RATES': {
        'suscripcion': '100/day',  # Tasa base
    },
}`}
        />
        <PostIt number="N.35" title="Headers de rate limit" align="left" variant="warning">
            <p>Cuando se supera el límite, DRF responde con HTTP 429 Too Many Requests. La respuesta incluye la cabecera Retry-After con el número de segundos que el cliente debe esperar antes de reintentar.</p>
        </PostIt>

        <ArticleSectionTitle number="13.10" title="AJAX, CSRF y CORS" description="Comunicación frontend-backend" />
        <Paragraph>
            Al consumir APIs de Django desde el frontend (JavaScript),
            entran en juego tres conceptos clave. AJAX permite
            peticiones asíncronas desde el navegador. CSRF (Cross-Site
            Request Forgery) es la protección contra falsificación de
            peticiones, que Django maneja con tokens. CORS (Cross-Origin
            Resource Sharing) controla qué dominios pueden acceder a la
            API desde el navegador.
        </Paragraph>
        <CodeBlock
            language="javascript"
            filename="ajax_csrf_cors.js"
            code={`// === Configurar CSRF Token en JavaScript ===
// Django inyecta el token CSRF en las cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');


// === Petición AJAX con fetch (DRF) ===
// GET (sin CSRF)
fetch('/api/articulos/')
    .then(response => response.json())
    .then(data => console.log(data));

// POST (con CSRF)
fetch('/api/articulos/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({
        titulo: 'Nuevo artículo',
        contenido: 'Contenido del artículo',
        categoria: 1,
    }),
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        return response.json();
    })
    .then(data => console.log('Creado:', data))
    .catch(error => console.error('Error:', error));


// === Alternativa con fetch incluido en HTML ===
// Si el HTML se sirve desde Django, se puede pasar el token
// en una etiqueta meta:
{% comment %}
<meta name="csrf-token" content="{{ csrf_token }}">
{% endcomment %}
const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content');


// === Configuración de CORS (backend) ===
# settings.py
INSTALLED_APPS = [
    # ...
    'corsheaders',
]

MIDDLEWARE = [
    # Debe ir al principio
    'corsheaders.middleware.CorsMiddleware',
    # ...
]

# Permitir orígenes específicos
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://midominio.com",
    "https://www.midominio.com",
]

# O permitir todos (solo desarrollo)
# CORS_ALLOW_ALL_ORIGINS = True

# Permitir credenciales (cookies, auth)
CORS_ALLOW_CREDENTIALS = True

# Métodos permitidos
CORS_ALLOW_METHODS = [
    'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS',
]

# Cabeceras permitidas
CORS_ALLOW_HEADERS = [
    'content-type',
    'authorization',
    'x-csrftoken',
    'x-requested-with',
]`}
        />
        <PostIt number="N.36" title="CSRF en APIs" align="right" variant="info">
            <p>Si usas TokenAuthentication o JWT en lugar de SessionAuthentication, no necesitas CSRF. Las API que usan tokens son inmunes a CSRF porque no dependen de cookies para autenticar. JWT es la opción más común para APIs que consumen desde SPA o aplicaciones móviles.</p>
        </PostIt>

        <ArticleSectionTitle number="13.11" title="Autenticación con JWT" description="JSON Web Tokens para APIs" />
        <Paragraph>
            JWT (JSON Web Token) es un estándar para autenticación basada
            en tokens. El cliente obtiene un token al iniciar sesión y
            lo envía en cada petición mediante la cabecera
            Authorization: Bearer &lt;token&gt;. A diferencia de las
            sesiones, JWT no almacena estado en el servidor, lo que lo
            hace ideal para APIs que consumen desde SPAs, aplicaciones
            móviles o servicios de terceros.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="jwt_auth.py"
            code={`# Instalar djangorestframework-simplejwt
# pip install djangorestframework-simplejwt


# settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
}


# urls.py — Endpoints de JWT
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('api/token/',
         TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/',
         TokenRefreshView.as_view(),
         name='token_refresh'),
    path('api/token/verify/',
         TokenVerifyView.as_view(),
         name='token_verify'),
]


# Uso desde el cliente:
# POST /api/token/  { "username": "ana", "password": "xxx" }
# Respuesta:
# {
#     "access": "eyJhbGciOiJIUzI1NiIs...",
#     "refresh": "eyJhbGciOiJIUzI1NiIs..."
# }

# Peticiones autenticadas:
# fetch('/api/articulos/', {
#     headers: {
#         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...'
#     }
# })

# Renovar token:
# POST /api/token/refresh/  { "refresh": "eyJhbGciOiJIUzI1NiIs..." }
# Respuesta:
# { "access": "eyJhbGciOiJIUzI1NiIs...nuevo" }


# Configuración avanzada de JWT
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_TOKEN_CLASSES': (
        'rest_framework_simplejwt.tokens.AccessToken',
    ),
}`}
        />

        <ArticleSectionTitle number="13.12" title="En conclusión" />
        <Paragraph>
            Django REST Framework proporciona todas las herramientas
            necesarias para construir APIs RESTful profesionales:
            serializadores que convierten modelos a JSON, vistas y
            ViewSets que implementan el CRUD completo, routers que
            generan URLs automáticamente, filtrado y paginación para
            consultas eficientes, throttling para controlar el uso,
            y sistemas de autenticación que van desde sesiones hasta
            JWT. El diseño cuidadoso de la API siguiendo los principios
            REST y las convenciones de DRF garantiza una interfaz
            consistente, escalable y fácil de consumir desde cualquier
            cliente.
        </Paragraph>
    </Paper>
</main>
