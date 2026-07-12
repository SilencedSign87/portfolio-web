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
    import SketchFrame from "@/components/SketchFrame.svelte";
    import monolito from "@assets/cuadernos/semana-14-monolito-microservicios.png";
</script>

<main class="cuaderno">
    <Paper sheet="14" revision="A">
        {#snippet title()}Semana 14 — Microservicios en Django{/snippet}

        <ArticleHeader
            number="14.00"
            title="Microservicios en Django"
            description="La arquitectura de microservicios divide una aplicación en servicios pequeños, independientes y desplegables de forma autónoma. Cada servicio tiene su propia base de datos, se comunica mediante APIs y puede escalarse de forma independiente. Django, combinado con Docker y Kubernetes, es una plataforma sólida para construir este tipo de arquitecturas."
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

        <ArticleSectionTitle number="14.01" title="Introducción a los microservicios" description="Arquitectura monolítica vs microservicios" />
        <Paragraph>
            Una aplicación monolítica concentra toda la funcionalidad en un
            solo despliegue: frontend, backend, lógica de negocio y
            acceso a datos viven en el mismo proceso. En cambio, los
            microservicios descomponen la aplicación en servicios
            independientes, cada uno responsable de una capacidad de
            negocio específica. Cada servicio tiene su propio ciclo de
            vida, equipo, base de datos y puede escribirse en
            tecnologías diferentes.
        </Paragraph>
        <SketchFrame
            src={monolito}
            alt="Comparación entre arquitectura monolítica y microservicios"
            width={600}
            height={400}
        />
        <Paragraph>
        <strong>
          Ventajas de los microservicios:
        </strong>
            <ul class="cuaderno__list">
                <li>Escalado independiente: cada servicio puede escalar según su demanda.</li>
                <li>Despliegue aislado: cambios en un servicio no afectan a otros.</li>
                <li>Tecnología heterogénea: cada equipo puede elegir la mejor tecnología para su servicio.</li>
                <li>Equipos autónomos: cada equipo gestiona su propio ciclo de vida.</li>
                <li>Aislamiento de fallos: un fallo en un servicio no derriba toda la aplicación.</li>
            </ul>
            <strong>

              Desafíos de los microservicios:
            </strong>
            <ul class="cuaderno__list">
                <li>Complejidad de red: la comunicación entre servicios introduce latencia y posibles fallos.</li>
                <li>Consistencia de datos: mantener integridad entre bases de datos distribuidas es complejo.</li>
                <li>Monitoreo distribuido: rastrear problemas a través de múltiples servicios requiere herramientas avanzadas.</li>
                <li>Testing integrado: probar interacciones entre servicios es más difícil que en un monolito.</li>
                <li>DevOps maduro: requiere pipelines de CI/CD, orquestación y gestión de contenedores.</li>
            </ul>
        </Paragraph>
        <PostIt number="N.37" title="Microservicios no son gratis" align="right" variant="info">
            <p>Los microservicios añaden complejidad operativa significativa. Para equipos pequeños o proyectos en fase inicial, un monolito bien estructurado suele ser más productivo. La regla: empieza con un monolito, extrae microservicios cuando sea necesario.</p>
        </PostIt>

        <ArticleSectionTitle number="14.02" title="Configuración de la arquitectura" description="Estructura del proyecto con múltiples servicios" />
        <Paragraph>
            En una arquitectura de microservicios con Django, cada servicio
            es un proyecto Django independiente con su propio
            settings.py, modelos, vistas y base de datos. Los servicios
            se comunican a través de HTTP/REST o mediante mensajería
            asíncrona con colas como RabbitMQ o Redis. Un API Gateway
            actúa como punto de entrada único para los clientes.
        </Paragraph>
        <CodeBlock
            language="text"
            filename="estructura_proyecto.txt"
            code={`proyecto-microservicios/
+-- gateway/                  # API Gateway
|   +-- Dockerfile
|   +-- nginx.conf
+-- servicio-usuarios/       # Microservicio: Usuarios
|   +-- manage.py
|   +-- Dockerfile
|   +-- requirements.txt
|   +-- usuarios/
|       +-- settings.py
|       +-- models.py
|       +-- views.py
|       +-- urls.py
|       +-- serializers.py
+-- servicio-blog/           # Microservicio: Blog
|   +-- manage.py
|   +-- Dockerfile
|   +-- requirements.txt
|   +-- blog/
|       +-- settings.py
|       +-- models.py
|       +-- views.py
|       +-- urls.py
|       +-- serializers.py
+-- servicio-pagos/          # Microservicio: Pagos
|   +-- manage.py
|   +-- Dockerfile
|   +-- requirements.txt
|   +-- pagos/
|       +-- settings.py
|       +-- models.py
|       +-- views.py
+-- docker-compose.yml
+-- k8s/                     # Manifiestos Kubernetes
|   +-- namespace.yaml
|   +-- gateway.yaml
|   +-- servicio-usuarios.yaml
|   +-- servicio-blog.yaml
|   +-- servicio-pagos.yaml
+-- .env
+-- README.md`}
        />
        <PostIt number="N.38" title="API Gateway" align="left" variant="warning">
            <p>El API Gateway es el punto único de entrada. Enruta peticiones al servicio correspondiente, maneja autenticación, rate limiting, logging y, en algunos casos, transformación de protocolos. Nginx, Kong, Traefik y AWS API Gateway son opciones populares.</p>
        </PostIt>

        <ArticleSectionTitle number="14.03" title="Diseño del primer microservicio con Django" description="Estructura y configuración de un servicio Django" />
        <Paragraph>
            Cada microservicio Django sigue la misma estructura básica pero
            con configuraciones adaptadas a su responsabilidad específica.
            El settings.py se ajusta para que cada servicio use su propia
            base de datos, Puerto y configuración. Las vistas exponen
            una API RESTful que otros servicios consumen.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="servicio_usuarios_settings.py"
            code={`# servicio-usuarios/usuarios/settings.py
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get(
    'DJANGO_SECRET_KEY',
    'clave-desarrollo-insegura'
)

DEBUG = os.environ.get('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = os.environ.get(
    'ALLOWED_HOSTS', '*'
).split(',')

# Cada servicio usa su propia base de datos
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'usuarios_db'),
        'USER': os.environ.get('DB_USER', 'usuarios'),
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}

# Puerto distinto por servicio
# Servicio usuarios corre en :8001
# Servicio blog corre en :8002
# Servicio pagos corre en :8003

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'usuarios',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}`}
        />

        <ArticleSectionTitle number="14.04" title="Comunicación entre microservicios" description="Síncrona y asíncrona" />
        <Paragraph>
            Los microservicios necesitan comunicarse entre sí. La
            comunicación síncrona usa HTTP/REST o gRPC: un servicio
            hace una petición directa a otro y espera la respuesta. La
            comunicación asíncrona usa colas de mensajes (RabbitMQ,
            Redis, Kafka) donde un servicio publica eventos y otros los
            consumen sin bloqueo.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="comunicacion.py"
            code={`# === Comunicación síncrona con HTTP ===
import requests
from django.conf import settings


class UsuariosClient:
    """Cliente HTTP para el servicio de usuarios."""
    BASE_URL = 'http://servicio-usuarios:8001/api/'

    @classmethod
    def obtener_usuario(cls, usuario_id):
        try:
            response = requests.get(
                f'{cls.BASE_URL}usuarios/{usuario_id}/',
                timeout=2,  # Timeout corto
                headers={
                    'Authorization': 'Bearer token-interno'
                }
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            # Fallback o reintento
            return {'error': str(e)}

    @classmethod
    def validar_token(cls, token):
        response = requests.post(
            f'{cls.BASE_URL}auth/validar/',
            json={'token': token},
            timeout=1,
        )
        if response.status_code == 200:
            return response.json()
        return None


# === Comunicación asíncrona con Redis (pub/sub) ===
import json
import redis

redis_client = redis.Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    decode_responses=True
)


class EventoPublisher:
    """Publica eventos para otros servicios."""

    @staticmethod
    def usuario_creado(usuario_data):
        redis_client.publish(
            'usuarios:creado',
            json.dumps(usuario_data)
        )

    @staticmethod
    def usuario_eliminado(usuario_id):
        redis_client.publish(
            'usuarios:eliminado',
            json.dumps({'id': usuario_id})
        )


# === Consumidor de eventos (servicio-blog) ===
import threading

class EventoSubscriber:
    """Escucha eventos de otros servicios."""

    @staticmethod
    def iniciar():
        pubsub = redis_client.pubsub()
        pubsub.subscribe(
            'usuarios:creado',
            'usuarios:eliminado'
        )

        for mensaje in pubsub.listen():
            if mensaje['type'] == 'message':
                datos = json.loads(mensaje['data'])
                canal = mensaje['channel']

                if canal == 'usuarios:eliminado':
                    # Eliminar artículos del usuario
                    from blog.models import Articulo
                    Articulo.objects.filter(
                        autor_id=datos['id']
                    ).delete()

# Iniciar en un hilo separado
threading.Thread(
    target=EventoSubscriber.iniciar,
    daemon=True
).start()`}
        />
        <PostIt number="N.39" title="Circuit Breaker" align="right" variant="info">
            <p>En comunicación síncrona, usa el patrón Circuit Breaker para evitar fallos en cascada. Librerías como pybreaker o hystrix-py detectan fallos repetidos y cortan temporalmente la comunicación, dando tiempo al servicio caído para recuperarse.</p>
        </PostIt>

        <ArticleSectionTitle number="14.05" title="Gestión de bases de datos en microservicios" description="Base de datos por servicio y consistencia eventual" />
        <Paragraph>
            En microservicios, cada servicio gestiona su propia base de
            datos. Esto evita acoplamiento y permite que cada equipo
            elija la tecnología más adecuada (PostgreSQL, MongoDB,
            Redis, etc.). La consistencia entre servicios suele ser
            eventual: en lugar de transacciones distribuidas, se usan
            eventos y Sagas para mantener la integridad de los datos. La
            comunicación entre bases de datos solo ocurre a través de
            las APIs de los servicios.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="db_por_servicio.py"
            code={`# ============================================
# Servicio Usuarios  → PostgreSQL (usuarios_db)
# Servicio Blog      → PostgreSQL (blog_db)
# Servicio Pagos     → PostgreSQL  (pagos_db)
# Servicio Cache     → Redis
# Servicio Búsqueda  → Elasticsearch
# ============================================

# === docker-compose.yml ===
version: '3.8'

services:
  # --- Base de datos por servicio ---
  db-usuarios:
    image: postgres:16
    environment:
      POSTGRES_DB: usuarios_db
      POSTGRES_USER: usuarios
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - db-usuarios-data:/var/lib/postgresql/data
    networks:
      - backend

  db-blog:
    image: postgres:16
    environment:
      POSTGRES_DB: blog_db
      POSTGRES_USER: blog
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - db-blog-data:/var/lib/postgresql/data
    networks:
      - backend

  db-pagos:
    image: postgres:16
    environment:
      POSTGRES_DB: pagos_db
      POSTGRES_USER: pagos
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - db-pagos-data:/var/lib/postgresql/data
    networks:
      - backend

  redis:
    image: redis:7-alpine
    networks:
      - backend

  # --- Servicios Django ---
  servicio-usuarios:
    build: ./servicio-usuarios
    ports:
      - "8001:8001"
    depends_on:
      - db-usuarios
      - redis
    environment:
      DB_HOST: db-usuarios
      DB_NAME: usuarios_db
      DB_USER: usuarios
      DB_PASSWORD: \${DB_PASSWORD}
      REDIS_HOST: redis
    networks:
      - backend

  servicio-blog:
    build: ./servicio-blog
    ports:
      - "8002:8002"
    depends_on:
      - db-blog
      - redis
    environment:
      DB_HOST: db-blog
      DB_NAME: blog_db
      DB_USER: blog
      DB_PASSWORD: \${DB_PASSWORD}
      REDIS_HOST: redis
    networks:
      - backend

  servicio-pagos:
    build: ./servicio-pagos
    ports:
      - "8003:8003"
    depends_on:
      - db-pagos
      - redis
    environment:
      DB_HOST: db-pagos
      DB_NAME: pagos_db
      DB_USER: pagos
      DB_PASSWORD: \${DB_PASSWORD}
      REDIS_HOST: redis
    networks:
      - backend

  # --- API Gateway ---
  gateway:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./gateway/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - servicio-usuarios
      - servicio-blog
      - servicio-pagos
    networks:
      - backend

volumes:
  db-usuarios-data:
  db-blog-data:
  db-pagos-data:

networks:
  backend:
    driver: bridge`}
        />

        <ArticleSectionTitle number="14.06" title="Implementación con Docker" description="Contenerización de servicios Django" />
        <Paragraph>
            Docker empaqueta cada microservicio con todas sus dependencias
            en un contenedor. El Dockerfile de un servicio Django instala
            las dependencias, configura el entorno y arranca el servidor
            con Gunicorn. docker-compose orquesta múltiples contenedores
            en desarrollo, mientras que en producción se usa Kubernetes
            o Docker Swarm.
        </Paragraph>
        <CodeBlock
            language="docker"
            filename="Dockerfile"
            code={`# Dockerfile para servicio-blog
FROM python:3.12-slim

# Variables de entorno
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=blog.settings

# Directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \\
    gcc \\
    libpq-dev \\
    && rm -rf /var/lib/apt/lists/*

# Copiar e instalar dependencias Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código
COPY . .

# Recolectar archivos estáticos
RUN python manage.py collectstatic --noinput

# Puerto del servicio
EXPOSE 8002

# Comando de inicio con Gunicorn
CMD ["gunicorn", "blog.wsgi:application", \\
     "--bind", "0.0.0.0:8002", \\
     "--workers", "4", \\
     "--timeout", "120", \\
     "--access-logfile", "-"]`}
        />
        <PostIt number="N.40" title="Gunicorn vs uWSGI" align="left" variant="warning">
            <p>Gunicorn es el servidor WSGI más usado para Django en producción. Se recomienda usar workers = (2 x CPU) + 1. Para entornos con mucho tráfico, uWSGI ofrece más opciones de tuning. Ambos se colocan detrás de Nginx.</p>
        </PostIt>

        <ArticleSectionTitle number="14.07" title="Orquestación con Kubernetes" description="Despliegue, escalado y gestión de contenedores" />
        <Paragraph>
            Kubernetes (K8s) es la plataforma estándar para orquestar
            contenedores en producción. Gestiona el despliegue, el
            escalado automático, el balanceo de carga, la gestión de
            configuraciones y secretos, y la recuperación ante fallos.
            Cada microservicio se despliega como un Deployment con un
            Service que lo expone dentro del clúster.
        </Paragraph>
        <CodeBlock
            language="yaml"
            filename="k8s_servicio_blog.yaml"
            code={`# === namespace.yaml ===
apiVersion: v1
kind: Namespace
metadata:
  name: microservicios


# === configmap.yaml - Configuración ===
apiVersion: v1
kind: ConfigMap
metadata:
  name: blog-config
  namespace: microservicios
data:
  DJANGO_SETTINGS_MODULE: "blog.settings"
  DB_HOST: "db-blog"
  DB_NAME: "blog_db"
  DEBUG: "False"
  ALLOWED_HOSTS: "servicio-blog,localhost"


# === secret.yaml - Secretos ===
apiVersion: v1
kind: Secret
metadata:
  name: blog-secrets
  namespace: microservicios
type: Opaque
data:
  DB_PASSWORD: <base64-encoded>
  DJANGO_SECRET_KEY: <base64-encoded>


# === deployment.yaml ===
apiVersion: apps/v1
kind: Deployment
metadata:
  name: servicio-blog
  namespace: microservicios
spec:
  replicas: 3
  selector:
    matchLabels:
      app: servicio-blog
  template:
    metadata:
      labels:
        app: servicio-blog
    spec:
      containers:
      - name: blog
        image: mi-registro/servicio-blog:latest
        ports:
        - containerPort: 8002
        envFrom:
        - configMapRef:
            name: blog-config
        - secretRef:
            name: blog-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health/
            port: 8002
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health/
            port: 8002
          initialDelaySeconds: 5
          periodSeconds: 5


# === service.yaml ===
apiVersion: v1
kind: Service
metadata:
  name: servicio-blog
  namespace: microservicios
spec:
  selector:
    app: servicio-blog
  ports:
  - port: 8002
    targetPort: 8002
  type: ClusterIP


# === hpa.yaml - Escalado automático ===
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: servicio-blog-hpa
  namespace: microservicios
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: servicio-blog
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80`}
        />

        <ArticleSectionTitle number="14.08" title="Protección de microservicios" description="Seguridad en comunicación entre servicios" />
        <Paragraph>
            La seguridad en microservicios implica múltiples capas:
            autenticación entre servicios (mTLS, JWT interno), cifrado
            de comunicación (TLS), gestión de secretos (HashiCorp Vault,
            Kubernetes Secrets), control de acceso por API Gateway y
            políticas de red. Nunca se debe confiar en la red interna;
            todo servicio debe autenticarse y autorizarse explícitamente.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="seguridad.py"
            code={`# === Autenticación entre servicios con JWT interno ===
import jwt
import requests
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed


class ServicioAuthentication(BaseAuthentication):
    """Autenticación para comunicación entre servicios."""

    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return None

        try:
            token = auth_header.split(' ')[1]
            payload = jwt.decode(
                token,
                settings.INTERNAL_JWT_SECRET,
                algorithms=['HS256'],
                audience='microservicio-interno'
            )

            if payload.get('service') not in [
                'servicio-usuarios',
                'servicio-blog',
            ]:
                raise AuthenticationFailed(
                    'Servicio no autorizado'
                )

            # Servicio como "usuario"
            return (payload, None)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed(
                'Token interno expirado'
            )
        except jwt.InvalidTokenError:
            raise AuthenticationFailed(
                'Token interno inválido'
            )


# === Generar token interno ===
def generar_token_interno(service_name):
    payload = {
        'service': service_name,
        'iat': datetime.now(),
        'exp': datetime.now() + timedelta(minutes=5),
        'aud': 'microservicio-interno',
    }
    return jwt.encode(
        payload,
        settings.INTERNAL_JWT_SECRET,
        algorithm='HS256'
    )


# === Uso en peticiones entre servicios ===
class ServicioPagosClient:
    @classmethod
    def crear_pago(cls, datos):
        token = generar_token_interno('servicio-blog')
        response = requests.post(
            'http://servicio-pagos:8003/api/pagos/',
            json=datos,
            timeout=5,
            headers={
                'Authorization': f'Bearer {token}',
                'X-Service-Name': 'servicio-blog',
            },
            verify='/etc/ssl/certs/ca-certificates.crt'
        )
        return response.json()


# === mTLS con certificados ===
# Cada servicio tiene un certificado TLS único
# La conexión se verifica mutuamente
# Implementación con requests:
# response = requests.post(
#     url,
#     cert=('/etc/certs/service.crt', '/etc/certs/service.key'),
#     verify='/etc/certs/ca.crt'
# )


# === Network Policies (Kubernetes) ===
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: blog-network-policy
  namespace: microservicios
spec:
  podSelector:
    matchLabels:
      app: servicio-blog
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: microservicios
      podSelector:
        matchLabels:
          app: gateway
    ports:
    - protocol: TCP
      port: 8002
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: servicio-usuarios
    ports:
    - protocol: TCP
      port: 8001`}
        />
        <PostIt number="N.41" title="mTLS" align="right" variant="info">
            <p>El mutual TLS (mTLS) es el estándar de seguridad para comunicación entre microservicios. Cada servicio presenta un certificado y verifica el del otro. En Kubernetes, Istio o Linkerd implementan mTLS automáticamente sin modificar el código.</p>
        </PostIt>

        <ArticleSectionTitle number="14.09" title="Monitoreo y logging" description="Observabilidad en microservicios" />
        <Paragraph>
            La observabilidad en microservicios se basa en tres pilares:
            logs (registros estructurados), métricas (rendimiento,
            errores, latencia) y tracing (seguimiento de peticiones a
            través de múltiples servicios). Herramientas como
            Prometheus + Grafana para métricas, ELK (Elasticsearch,
            Logstash, Kibana) para logs y Jaeger o Zipkin para tracing
            distribuido son el estándar en la industria.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="monitoreo.py"
            code={`# === Logging estructurado (JSON) ===
import logging
import json
from django.utils import timezone


class JSONFormatter(logging.Formatter):
    """Formatea logs como JSON para ELK."""

    def format(self, record):
        log_entry = {
            'timestamp': timezone.now().isoformat(),
            'level': record.levelname,
            'logger': record.name,
            'message': record.getMessage(),
            'service': 'servicio-blog',
            'environment': settings.ENVIRONMENT,
        }

        if hasattr(record, 'request_id'):
            log_entry['request_id'] = record.request_id
        if record.exc_info:
            log_entry['exception'] = self.formatException(
                record.exc_info
            )

        return json.dumps(log_entry)


# settings.py
LOGGING = {
    'version': 1,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'json',
        },
    },
    'formatters': {
        'json': {
            '()': JSONFormatter,
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}


# === Métricas con Prometheus ===
# pip install django-prometheus

# settings.py
INSTALLED_APPS = [
    'django_prometheus',
    # ...
]

MIDDLEWARE = [
    'django_prometheus.middleware.PrometheusBeforeMiddleware',
    # ... otros middlewares
    'django_prometheus.middleware.PrometheusAfterMiddleware',
]

# Endpoint /metrics/ expone métricas para Prometheus


# === Health checks ===
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connections


@api_view(['GET'])
def health_check(request):
    """Endpoint de salud para Kubernetes."""
    health = {
        'status': 'ok',
        'service': 'servicio-blog',
        'version': '1.0.0',
        'timestamp': timezone.now().isoformat(),
    }

    # Verificar base de datos
    try:
        connections['default'].cursor().execute('SELECT 1')
        health['database'] = 'ok'
    except Exception as e:
        health['database'] = 'error'
        health['status'] = 'degraded'

    # Verificar Redis
    try:
        redis_client.ping()
        health['redis'] = 'ok'
    except Exception as e:
        health['redis'] = 'error'
        health['status'] = 'degraded'

    status_code = 200 if health['status'] == 'ok' else 503
    return Response(health, status=status_code)


# === Tracing distribuido con OpenTelemetry ===
# pip install opentelemetry-distro opentelemetry-exporter-jaeger

from opentelemetry import trace
from opentelemetry.exporter.jaeger.thrift import JaegerExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Configurar tracer
trace.set_tracer_provider(TracerProvider())
jaeger_exporter = JaegerExporter(
    agent_host_name='jaeger',
    agent_port=6831,
)
span_processor = BatchSpanProcessor(jaeger_exporter)
trace.get_tracer_provider().add_span_processor(span_processor)

tracer = trace.get_tracer(__name__)

# Uso en vistas
def proceso_complejo(request):
    with tracer.start_as_current_span('proceso') as span:
        span.set_attribute('usuario_id', request.user.id)
        resultado = hacer_algo()
        return resultado`}
        />

        <ArticleSectionTitle number="14.10" title="Escalado de microservicios" description="Escalado horizontal y estrategias" />
        <Paragraph>
            La principal ventaja de los microservicios es el escalado
            independiente. Los servicios con mayor carga (blog,
            búsqueda) pueden tener más réplicas que los servicios
            menos demandados. Kubernetes con HPA (Horizontal Pod
            Autoscaler) escala automáticamente según CPU, memoria o
            métricas personalizadas como peticiones por segundo. El
            escalado también implica considerar bases de datos, cachés
            y colas de mensajes.
        </Paragraph>
        <CodeBlock
            language="yaml"
            filename="escalado_avanzado.yaml"
            code={`# === Estrategias de escalado ===
# 1. Escalado horizontal (más réplicas)
#    - Kubernetes HPA basado en CPU/memoria
#    - Útil para servicios stateless (blog, API)
#    - No funciona bien para servicios stateful (bases de datos)

# 2. Escalado vertical (más recursos por réplica)
#    - Aumentar CPU/memoria en el Deployment
#    - Útil para servicios que no pueden replicarse
#    - Requiere reinicio del pod

# 3. Escalado basado en eventos
#    - KEDA (Kubernetes Event-driven Autoscaling)
#    - Escala según longitud de cola RabbitMQ/Kafka
#    - Ideal para workers de procesamiento asíncrono


# === HPA avanzado con métricas personalizadas ===
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: servicio-blog-hpa
  namespace: microservicios
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: servicio-blog
  minReplicas: 2
  maxReplicas: 20
  metrics:
  # Escalado por CPU
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 60
  # Escalado por peticiones por segundo
  - type: Pods
    pods:
      metric:
        name: requests_per_second
      target:
        type: AverageValue
        averageValue: 1000
  # Escalado por longitud de cola (KEDA)
  - type: Object
    object:
      metric:
        name: rabbitmq_queue_length
      describedObject:
        apiVersion: v1
        kind: Service
        name: rabbitmq
      target:
        type: Value
        value: 100
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15


# === Estrategia de actualización (Rolling Update) ===
apiVersion: apps/v1
kind: Deployment
metadata:
  name: servicio-blog
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1       # Máximo pods no disponibles
      maxSurge: 1             # Máximo pods extras durante update
  template:
    # ...`}
        />
        <PostIt number="N.42" title="Stateless vs Stateful" align="left" variant="warning">
            <p>Los microservicios Django deben ser stateless: no almacenar sesiones ni archivos localmente. Usa Redis para sesiones, S3 para archivos y una base de datos externa. Esto permite escalar horizontalmente sin problemas y reemplazar contenedores sin perder datos.</p>
        </PostIt>

        <ArticleSectionTitle number="14.11" title="En conclusión" />
        <Paragraph>
            Los microservicios representan un cambio fundamental en la forma
            de diseñar y desplegar aplicaciones web. Django, combinado
            con Docker para la contenerización y Kubernetes para la
            orquestación, proporciona una base sólida para construir
            arquitecturas distribuidas. La comunicación entre servicios,
            la gestión de bases de datos independientes, la seguridad
            con mTLS y JWT interno, y la observabilidad con métricas,
            logs y tracing son aspectos críticos que deben diseñarse
            desde el inicio. Aunque la complejidad operativa es mayor,
            los beneficios en escalabilidad, aislamiento de fallos y
            autonomía de equipos hacen que los microservicios sean la
            opción preferida para aplicaciones a gran escala.
        </Paragraph>
    </Paper>
</main>
