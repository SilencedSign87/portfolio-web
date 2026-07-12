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
    <Paper sheet="11" revision="A">
        {#snippet title()}Semana 11 — Introducción a Django{/snippet}

        <ArticleHeader
            number="11.00"
            title="Introducción a Django"
            description="Django es un framework web de alto nivel escrito en Python que fomenta el desarrollo rápido y el diseño limpio y pragmático. Fue creado en 2005 por Adrian Holovaty y Simon Willison, y sigue el principio de «no te repitas» (DRY) y «convención sobre configuración»."
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

        <ArticleSectionTitle number="11.01" title="Patrón de arquitectura MVC y MTV" description="Modelo-Vista-Template vs Modelo-Vista-Controlador" />
        <Paragraph>
            Django sigue una variación del patrón MVC (Model-View-Controller)
            que llama MTV (Model-Template-View). En el MTV de Django, el
            Modelo define la estructura de datos, la Template se encarga de la
            presentación (HTML) y la View contiene la lógica de negocio que
            conecta el modelo con la plantilla. A diferencia del MVC clásico,
            Django considera que el framework mismo actúa como el controlador.
        </Paragraph>
        <Paragraph>
            En la práctica, cuando llega una petición HTTP, Django examina la
            URL, selecciona la vista correspondiente, la vista interactúa con
            el modelo (base de datos), pasa los resultados a una plantilla y
            devuelve la respuesta HTML al cliente. Esta separación de
            responsabilidades facilita el mantenimiento y la escalabilidad de
            las aplicaciones.
        </Paragraph>

        <PostIt number="N.21" title="MTV de Django" align="right" variant="info">
            <p><strong>Model:</strong> Datos y lógica de negocio.<br><strong>Template:</strong> Presentación (HTML/CSS).<br><strong>View:</strong> Lógica que conecta Model y Template. Django actúa como el Controller.</p>
        </PostIt>

        <ArticleSectionTitle number="11.02" title="Instalación y gestión de proyectos" description="pip, django-admin y estructura inicial" />
        <Paragraph>
            Django se instala vía pip, el gestor de paquetes de Python. Una vez
            instalado, el comando django-admin permite crear proyectos y
            aplicaciones. Un proyecto de Django es el conjunto completo de
            configuración y aplicaciones, mientras que una aplicación es un
            módulo que cumple una función específica dentro del proyecto.
        </Paragraph>
        <CodeBlock
            language="bash"
            filename="instalacion.sh"
            code={`# Instalar Django
pip install django

# Verificar la versión
python -m django --version

# Crear un nuevo proyecto
django-admin startproject mi_proyecto

# Estructura generada
mi_proyecto/
    manage.py              # Utilidad de línea de comandos
    mi_proyecto/
        __init__.py
        settings.py        # Configuración del proyecto
        urls.py            # Declaración de URLs
        asgi.py            # Configuración ASGI
        wsgi.py            # Configuración WSGI

# Crear una aplicación dentro del proyecto
cd mi_proyecto
python manage.py startapp blog

# Estructura de la aplicación
blog/
    __init__.py
    admin.py               # Configuración del admin
    apps.py                # Configuración de la app
    migrations/            # Migraciones de base de datos
    models.py              # Modelos de datos
    tests.py               # Pruebas
    views.py               # Vistas

# Ejecutar el servidor de desarrollo
python manage.py runserver`}
        />

        <ArticleSectionTitle number="11.03" title="Integración con Apache" description="Despliegue en producción con mod_wsgi" />
        <Paragraph>
            Para entornos de producción, Django se sirve típicamente con Apache
            usando mod_wsgi, o con Nginx y Gunicorn/uWSGI. mod_wsgi es un
            módulo de Apache que permite ejecutar aplicaciones WSGI (Web Server
            Gateway Interface), el estándar de Python para conectar servidores
            web con aplicaciones web.
        </Paragraph>
        <CodeBlock
            language="apache"
            filename="django.conf"
            code={`# Configuración de Apache con mod_wsgi
<VirtualHost *:80>
    ServerName midominio.com
    ServerAdmin admin@midominio.com

    # Ruta al archivo WSGI de Django
    WSGIScriptAlias / /ruta/a/mi_proyecto/mi_proyecto/wsgi.py

    # Directorio del proyecto
    WSGIDaemonProcess mi_proyecto \\
        python-path=/ruta/a/mi_proyecto \\
        python-home=/ruta/a/venv
    WSGIProcessGroup mi_proyecto

    # Archivos estáticos
    Alias /static/ /ruta/a/mi_proyecto/static/
    <Directory /ruta/a/mi_proyecto/static>
        Require all granted
    </Directory>

    # Archivos multimedia
    Alias /media/ /ruta/a/mi_proyecto/media/
    <Directory /ruta/a/mi_proyecto/media>
        Require all granted
    </Directory>

    <Directory /ruta/a/mi_proyecto/mi_proyecto>
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>

    ErrorLog /var/log/apache2/django_error.log
    CustomLog /var/log/apache2/django_access.log combined
</VirtualHost>`}
        />

        <ArticleSectionTitle number="11.04" title="Gestión de URLs, vistas y plantillas" description="El flujo de una petición en Django" />
        <Paragraph>
            Django procesa una petición HTTP siguiendo un flujo definido: el
            servidor recibe la petición, Django la dirige al archivo urls.py
            del proyecto, que busca un patrón coincidente y llama a la vista
            correspondiente. La vista ejecuta la lógica de negocio, consulta
            la base de datos si es necesario y devuelve una respuesta
            renderizando una plantilla.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="urls_views_templates.py"
            code={`# === urls.py (proyecto) ===
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('blog.urls')),  # Incluye las URLs de la app
]


# === urls.py (aplicación blog) ===
from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('articulo/<int:id>/', views.detalle_articulo, name='detalle'),
]


# === views.py ===
from django.shortcuts import render

def inicio(request):
    """Vista basada en función."""
    contexto = {
        'titulo': 'Mi Blog',
        'mensaje': 'Bienvenido a mi blog con Django',
    }
    return render(request, 'blog/inicio.html', contexto)

def detalle_articulo(request, id):
    """Vista con parámetro desde la URL."""
    contexto = {
        'articulo_id': id,
        'titulo': f'Artículo {id}',
    }
    return render(request, 'blog/detalle.html', contexto)`}
        />

        <ArticleSectionTitle number="11.05" title="Vistas basadas en clases y en funciones" description="FBV vs CBV" />
        <Paragraph>
            Django soporta dos tipos de vistas: vistas basadas en funciones
            (FBV — Function-Based Views) y vistas basadas en clases (CBV —
            Class-Based Views). Las FBV son simples funciones que reciben un
            request y devuelven un response. Las CBV aprovechan la herencia
            de clases para reutilizar código común, como listar objetos,
            mostrar detalles o manejar formularios.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="fbv_cbv.py"
            code={`# === Vista basada en función (FBV) ===
from django.shortcuts import render, get_object_or_404
from .models import Articulo

def lista_articulos(request):
    articulos = Articulo.objects.all()
    return render(request, 'blog/lista.html', {
        'articulos': articulos
    })

def detalle_articulo(request, pk):
    articulo = get_object_or_404(Articulo, pk=pk)
    return render(request, 'blog/detalle.html', {
        'articulo': articulo
    })


# === Vista basada en clase (CBV) ===
from django.views.generic import ListView, DetailView
from .models import Articulo

class ListaArticulosView(ListView):
    model = Articulo
    template_name = 'blog/lista.html'
    context_object_name = 'articulos'
    paginate_by = 10  # Paginación incorporada

class DetalleArticuloView(DetailView):
    model = Articulo
    template_name = 'blog/detalle.html'
    context_object_name = 'articulo'


# urls.py para CBV
from django.urls import path
from .views import ListaArticulosView, DetalleArticuloView

urlpatterns = [
    path('', ListaArticulosView.as_view(), name='lista'),
    path('<int:pk>/', DetalleArticuloView.as_view(), name='detalle'),
]`}
        />
        <PostIt number="N.22" title="CBV vs FBV" align="left" variant="warning">
            <p>Las CBV son más adecuadas para operaciones CRUD estándar gracias a la herencia y los mixins. Las FBV ofrecen más control explícito y son más fáciles de entender para principiantes.</p>
        </PostIt>

        <ArticleSectionTitle number="11.06" title="Configuración de URLs" description="Path converters y namespacing" />
        <Paragraph>
            El sistema de URLs de Django utiliza path converters para extraer
            valores de la URL. Los converters disponibles son str, int, slug,
            uuid y path. También se pueden crear converters personalizados.
            El namespacing permite organizar las URLs por aplicación y
            referenciarlas de forma única.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="urls_config.py"
            code={`# urls.py del proyecto — con include y namespace
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls', namespace='blog')),
]


# urls.py de la aplicación — con nombres
from django.urls import path
from . import views

app_name = 'blog'  # Namespace de la app

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('articulo/<int:anio>/<slug:slug>/',
         views.articulo_por_fecha,
         name='articulo_fecha'),
    path('categoria/<slug:categoria_slug>/',
         views.por_categoria,
         name='categoria'),
]

# Uso en plantillas
# <a href="{% url 'blog:detalle' articulo.id %}">Leer más</a>

# Uso en vistas (Python)
# from django.urls import reverse
# url = reverse('blog:detalle', args=[articulo.id])`}
        />

        <ArticleSectionTitle number="11.07" title="Uso de Plantillas" description="Sistema de templates de Django" />
        <Paragraph>
            Django incluye un potente sistema de plantillas (Django Template
            Language, DTL) que permite generar HTML dinámico de forma segura.
            Las plantillas usan una sintaxis propia con variables entre
                          {'{{'} dobles llaves {'}}'} y etiquetas entre {'{%'} tag {'%}'}. El sistema está
            diseñado para ser legible y restringir la lógica compleja,
            manteniendo la separación entre presentación y negocio.
        </Paragraph>
        <CodeBlock
            language="html"
            filename="template_basico.html"
            code={`<!-- blog/templates/blog/inicio.html -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>{{ titulo }}</title>
</head>
<body>
    <h1>{{ mensaje }}</h1>
    <p>Bienvenido, {{ usuario.nombre | default:"Invitado" }}</p>

    <h2>Artículos recientes</h2>
    <ul>
        {% for articulo in articulos %}
            <li>
                <a href="{% url 'blog:detalle' articulo.id %}">
                    {{ articulo.titulo }}
                </a>
                <small>{{ articulo.fecha_publicacion | date:"d/m/Y" }}</small>
            </li>
        {% empty %}
            <li>No hay artículos todavía.</li>
        {% endfor %}
    </ul>
</body>
</html>`}
        />

        <ArticleSectionTitle number="11.08" title="Bloques, herencia y filtros" description="Reutilización de plantillas" />
        <Paragraph>
            La herencia de plantillas es una de las características más
            potentes de Django. Una plantilla base define la estructura
            general del sitio con bloques ({'{%'} block {'%}'}) que las plantillas
            hijas pueden sobrescribir. Los filtros permiten transformar
            variables directamente en la plantilla, como formatear fechas,
            truncar texto o convertir a mayúsculas.
        </Paragraph>
        <CodeBlock
            language="html"
            filename="herencia_plantillas.html"
            code={`{# === base.html — plantilla base === #}
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>{% block titulo %}Mi Sitio{% endblock %}</title>
    <link rel="stylesheet" href="{% static 'css/base.css' %}">
</head>
<body>
    <header>
        <h1>{% block encabezado %}Mi Sitio Web{% endblock %}</h1>
        <nav>
            <a href="{% url 'inicio' %}">Inicio</a>
            <a href="{% url 'blog:lista' %}">Blog</a>
            <a href="{% url 'contacto' %}">Contacto</a>
        </nav>
    </header>

    <main>
        {% block contenido %}
        {% endblock %}
    </main>

    <footer>
        <p>&copy; {% now "Y" %} Mi Sitio</p>
    </footer>
</body>
</html>


{# === inicio.html — extiende base.html === #}
{% extends "base.html" %}
{% load static %}

{% block titulo %}Inicio — Mi Sitio{% endblock %}

{% block contenido %}
    <h2>Bienvenido</h2>
    <p>{{ mensaje }}</p>
    <img src="{% static 'img/logo.png' %}" alt="Logo">
{% endblock %}


{# === Filtros útiles === #}
{{ texto|truncatewords:20 }}       {# Truncar a 20 palabras #}
{{ texto|lower }}                   {# A minúsculas #}
{{ texto|upper }}                   {# A mayúsculas #}
{{ texto|linebreaks }}              {# Convertir saltos a <br> #}
{{ fecha|date:"d/m/Y H:i" }}       {# Formatear fecha #}
{{ numero|floatformat:2 }}         {# Formato decimal #}
{{ lista|join:", " }}               {# Unir lista con separador #}
{{ variable|default:"Valor por defecto" }}
{{ variable|length }}               {# Longitud #}
{{ url|urlencode }}                 {# Codificar URL #}`}
        />
        <PostIt number="N.23" title="Filtros personalizados" align="right" variant="info">
            <p>Puedes crear tus propios filtros registrándolos en un archivo templatetags/ dentro de la aplicación. Los filtros son funciones Python que reciben el valor y opcionalmente un argumento.</p>
        </PostIt>

        <ArticleSectionTitle number="11.09" title="Modelos y API para base de datos" description="El ORM de Django" />
        <Paragraph>
            Django incluye un ORM (Object-Relational Mapper) que permite
            definir la estructura de la base de datos mediante clases Python.
            Cada modelo es una subclase de django.db.models.Model y cada
            atributo del modelo representa un campo en la tabla. El ORM se
            encarga de traducir las operaciones Python a SQL, soportando los
            motores de base de datos más populares: PostgreSQL, MySQL, SQLite
            y Oracle.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="modelos.py"
            code={`from django.db import models
from django.utils import timezone


class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    descripcion = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categorías"

    def __str__(self):
        return self.nombre


class Autor(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre


class Articulo(models.Model):
    ESTADOS = [
        ('borrador', 'Borrador'),
        ('publicado', 'Publicado'),
        ('archivado', 'Archivado'),
    ]

    titulo = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    contenido = models.TextField()
    resumen = models.TextField(max_length=500, blank=True)
    fecha_publicacion = models.DateTimeField(default=timezone.now)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(
        max_length=20, choices=ESTADOS, default='borrador'
    )
    destacado = models.BooleanField(default=False)

    # Relaciones
    categoria = models.ForeignKey(
        Categoria, on_delete=models.SET_NULL,
        null=True, related_name='articulos'
    )
    autor = models.ForeignKey(
        Autor, on_delete=models.CASCADE,
        related_name='articulos'
    )
    etiquetas = models.ManyToManyField('Etiqueta', blank=True)

    class Meta:
        ordering = ['-fecha_publicacion']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['estado', 'fecha_publicacion']),
        ]

    def __str__(self):
        return self.titulo

    def publicar(self):
        self.estado = 'publicado'
        self.fecha_publicacion = timezone.now()
        self.save()


class Etiqueta(models.Model):
    nombre = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.nombre`}
        />

        <ArticleSectionTitle number="11.10" title="Tipos de campos" description="Los field types más comunes" />
        <Paragraph>
            Django ofrece una amplia variedad de tipos de campo para modelar
            datos. Cada campo se traduce a un tipo específico en SQL y, en su
            mayoría, incluye validación incorporada. Los campos también
            aceptan argumentos comunes como null, blank, default, unique,
            choices y verbose_name.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="tipos_campos.py"
            code={`from django.db import models

class EjemploTipos(models.Model):
    # Campos de texto
    char_field = models.CharField(max_length=100)
    text_field = models.TextField()
    slug_field = models.SlugField(max_length=100)
    email_field = models.EmailField()
    url_field = models.URLField()
    uuid_field = models.UUIDField()

    # Campos numéricos
    integer_field = models.IntegerField()
    positive_int = models.PositiveIntegerField()
    float_field = models.FloatField()
    decimal_field = models.DecimalField(
        max_digits=10, decimal_places=2
    )
    boolean_field = models.BooleanField(default=False)

    # Campos de fecha/hora
    date_field = models.DateField()
    time_field = models.TimeField()
    datetime_field = models.DateTimeField()
    duration_field = models.DurationField()

    # Autoajustables
    auto_now_add = models.DateTimeField(auto_now_add=True)
    auto_now = models.DateTimeField(auto_now=True)

    # Archivos e imágenes
    file_field = models.FileField(upload_to='archivos/')
    image_field = models.ImageField(upload_to='imagenes/')

    # Relaciones
    foreign_key = models.ForeignKey(
        'OtroModelo', on_delete=models.CASCADE
    )
    one_to_one = models.OneToOneField(
        'OtroModelo', on_delete=models.CASCADE
    )
    many_to_many = models.ManyToManyField('OtroModelo')

    # Argumentos comunes
    opcional = models.CharField(
        max_length=100, null=True, blank=True
    )
    con_default = models.CharField(
        max_length=100, default='valor'
    )
    con_choices = models.CharField(
        max_length=10,
        choices=[('A', 'Opción A'), ('B', 'Opción B')]
    )

    class Meta:
        abstract = True  # No crea tabla, sirve para herencia`}
        />

        <ArticleSectionTitle number="11.11" title="Creación de consultas" description="El QuerySet API" />
        <Paragraph>
            El ORM de Django proporciona una API rica y expresiva para
            consultar la base de datos usando Python. Los QuerySets son
            evaluaciones perezosas (lazy): no ejecutan la consulta hasta que
            se iteran o se evalúan explícitamente. Se pueden encadenar
            filtros, excluir registros, ordenar y agregar operaciones
            complejas como joins, subconsultas y agregaciones.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="consultas.py"
            code={`from .models import Articulo, Categoria, Autor
from django.db.models import Count, Q

# === Crear registros ===
categoria = Categoria.objects.create(
    nombre="Python", slug="python"
)
autor = Autor.objects.create(
    nombre="Ana Pérez", email="ana@email.com"
)
articulo = Articulo(
    titulo="Introducción a Django",
    slug="introduccion-django",
    contenido="Django es un framework...",
    categoria=categoria,
    autor=autor
)
articulo.save()  # Guarda en BD

# === Obtener todos ===
Articulo.objects.all()

# === Filtrar ===
Articulo.objects.filter(estado='publicado')
Articulo.objects.filter(
    categoria__slug='python'
)
Articulo.objects.filter(
    fecha_publicacion__year=2026
)
Articulo.objects.exclude(estado='borrador')

# === Consultas encadenadas ===
Articulo.objects \
    .filter(estado='publicado') \
    .exclude(destacado=False) \
    .order_by('-fecha_publicacion')[:5]

# === Obtener uno ===
Articulo.objects.get(id=1)
Articulo.objects.get(slug='introduccion-django')

# === Búsqueda textual (__icontains) ===
Articulo.objects.filter(
    titulo__icontains='django'
)

# === Consultas con Q (OR/NOT) ===
Articulo.objects.filter(
    Q(estado='publicado') |
    Q(estado='archivado')
)
Articulo.objects.filter(
    Q(titulo__icontains='python') &
    ~Q(estado='borrador')
)

# === Relaciones (joins automáticos) ===
Articulo.objects.filter(
    autor__nombre__icontains='ana'
)
Articulo.objects.filter(
    categoria__nombre='Python'
)

# === Contar y agregar ===
Articulo.objects.count()
Articulo.objects.filter(
    estado='publicado'
).count()
Categoria.objects.annotate(
    total_articulos=Count('articulos')
)

# === Paginación ===
from django.core.paginator import Paginator
articulos = Articulo.objects.all()
paginator = Paginator(articulos, 10)  # 10 por página
pagina = paginator.get_page(1)        # Primera página
print(pagina.object_list)             # Artículos de esta página
print(pagina.has_next())              # ¿Hay siguiente página?

# === Actualizar ===
articulo = Articulo.objects.get(id=1)
articulo.titulo = "Nuevo título"
articulo.save()
# O actualización masiva:
Articulo.objects.filter(
    estado='borrador'
).update(estado='archivado')

# === Eliminar ===
articulo = Articulo.objects.get(id=1)
articulo.delete()
# Eliminación masiva:
Articulo.objects.filter(
    estado='archivado'
).delete()`}
        />
        <PostIt number="N.24" title="Lazy QuerySets" align="left" variant="warning">
            <p>Los QuerySets son evaluados de forma perezosa (lazy). Puedes encadenar múltiples filtros sin ejecutar SQL. La consulta se ejecuta solo cuando accedes a los datos (iteración, slicing, len(), list(), bool()).</p>
        </PostIt>

        <ArticleSectionTitle number="11.12" title="Migraciones" description="Evolución del esquema de base de datos" />
        <Paragraph>
            Las migraciones son la manera de Django de propagar cambios en los
            modelos (añadir campos, crear tablas, etc.) a la base de datos.
            Cada vez que se modifica un modelo, se genera una migración con
            makemigrations y se aplica con migrate. Django mantiene un
            historial de migraciones aplicadas, permitiendo avanzar y
            retroceder entre versiones del esquema.
        </Paragraph>
        <CodeBlock
            language="bash"
            filename="migraciones.sh"
            code={`# Crear migraciones basadas en los cambios de modelos
python manage.py makemigrations

# Ver el SQL que generará una migración (sin ejecutarlo)
python manage.py sqlmigrate blog 0001

# Aplicar las migraciones a la base de datos
python manage.py migrate

# Ver el estado de las migraciones
python manage.py showmigrations

# Revertir migraciones
python manage.py migrate blog 0001  # Vuelve a la migración 0001

# Crear migraciones vacías (para operaciones manuales)
python manage.py makemigrations --empty blog`}
        />

        <ArticleSectionTitle number="11.13" title="En conclusión" />
        <Paragraph>
            Django es un framework completo que acelera el desarrollo web con
            Python gracias a su arquitectura MTV, su potente ORM, el sistema
            de plantillas y las herramientas integradas como el panel de
            administración. La curva de aprendizaje inicial puede ser
            pronunciada, pero la coherencia y la documentación exhaustiva de
            Django lo convierten en una opción sólida tanto para prototipos
            rápidos como para aplicaciones empresariales a gran escala.
        </Paragraph>
    </Paper>
</main>
