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
    <Paper sheet="12" revision="A">
        {#snippet title()}Semana 12 — Formularios, Admin, Middleware y Sesiones{/snippet}

        <ArticleHeader
            number="12.00"
            title="Formularios, Admin, Middleware y Sesiones en Django"
            description="Django proporciona un ecosistema completo para manejar formularios con validación, un panel de administración potente y personalizable, un sistema de middleware para procesar peticiones y un manejo robusto de sesiones y autenticación."
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

        <ArticleSectionTitle number="12.01" title="Creación de Formularios" description="formularios de Django desde cero" />
        <Paragraph>
            Django incluye un sistema de formularios que automatiza la
            generación de HTML, la validación de datos y la sanitización.
            Un formulario se define como una clase que hereda de
            forms.Form y declara campos con tipos específicos. Cada tipo
            de campo sabe cómo validarse y renderizarse.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="forms_basico.py"
            code={`from django import forms


class ContactoForm(forms.Form):
    nombre = forms.CharField(
        max_length=100,
        label="Nombre completo",
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Tu nombre'
        })
    )
    email = forms.EmailField(
        label="Correo electrónico",
        widget=forms.EmailInput(attrs={
            'class': 'form-control'
        })
    )
    asunto = forms.CharField(
        max_length=200,
        label="Asunto"
    )
    mensaje = forms.CharField(
        label="Mensaje",
        widget=forms.Textarea(attrs={
            'rows': 5,
            'class': 'form-control'
        })
    )
    copia = forms.BooleanField(
        required=False,
        label="Enviarme una copia"
    )
    prioridad = forms.ChoiceField(
        choices=[
            ('baja', 'Baja'),
            ('media', 'Media'),
            ('alta', 'Alta'),
        ],
        label="Prioridad",
        initial='media'
    )`}
        />
        <PostIt number="N.25" title="Widgets vs Campos" align="right" variant="info">
            <p>El <strong>campo</strong> define el tipo de dato y la validación. El <strong>widget</strong> define cómo se renderiza en HTML. Un CharField puede renderizarse como TextInput, Textarea, PasswordInput, etc.</p>
        </PostIt>

        <ArticleSectionTitle number="12.02" title="Plantilla de un formulario" description="Renderizado en templates" />
        <Paragraph>
            Django ofrece varias formas de renderizar formularios en
            plantillas: como párrafos, como tabla, como lista o campo
            por campo. También se puede acceder a cada campo
            individualmente para un control total del HTML. Los errores
            de validación se muestran automáticamente junto a cada
            campo.
        </Paragraph>
        <CodeBlock
            language="html"
            filename="template_formulario.html"
            code={`{# === Vista que maneja el formulario === #}
{% comment %}
# views.py
from django.shortcuts import render, redirect
from .forms import ContactoForm

def contacto(request):
    if request.method == 'POST':
        form = ContactoForm(request.POST)
        if form.is_valid():
            # Procesar datos limpios
            nombre = form.cleaned_data['nombre']
            email = form.cleaned_data['email']
            mensaje = form.cleaned_data['mensaje']
            # ... enviar correo, guardar en BD, etc.
            return redirect('exito')
    else:
        form = ContactoForm()
    return render(request, 'contacto.html', {
        'form': form
    })
{% endcomment %}


{# === plantilla/contacto.html === #}
<form method="post" novalidate>
    {% csrf_token %}

    {# Renderizado automático #}
    {{ form.as_p }}       {# Como párrafos #}
    {{ form.as_table }}   {# Como tabla #}
    {{ form.as_ul }}      {# Como lista #}

    {# Renderizado campo por campo #}
    {% for field in form %}
        <div class="campo">
            {{ field.label_tag }}
            {{ field }}
            {% if field.errors %}
                <ul class="errores">
                {% for error in field.errors %}
                    <li>{{ error }}</li>
                {% endfor %}
                </ul>
            {% endif %}
            {% if field.help_text %}
                <p class="ayuda">{{ field.help_text }}</p>
            {% endif %}
        </div>
    {% endfor %}

    <button type="submit">Enviar</button>
</form>`}
        />

        <ArticleSectionTitle number="12.03" title="Validación y sanitización" description="Reglas de validación integradas y personalizadas" />
        <Paragraph>
            La validación en Django ocurre en múltiples niveles. Cada tipo
            de campo valida su propio formato (email, número, URL, etc.).
            Se pueden añadir validadores personalizados con el argumento
            validators del campo o definiendo métodos <code>clean_&lt;campo&gt;()</code> en
            el formulario. Los datos validados y sanitizados se obtienen
            del diccionario cleaned_data.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="validacion.py"
            code={`from django import forms
from django.core.validators import (
    MinLengthValidator, MaxLengthValidator,
    RegexValidator, EmailValidator, MinValueValidator,
    MaxValueValidator
)
import re


# === Validadores integrados ===
class RegistroForm(forms.Form):
    username = forms.CharField(
        max_length=30,
        validators=[
            MinLengthValidator(4),
            RegexValidator(
                regex=r'^[a-zA-Z0-9_]+$',
                message='Solo letras, números y guión bajo'
            ),
        ]
    )
    edad = forms.IntegerField(
        validators=[
            MinValueValidator(18),
            MaxValueValidator(120),
        ]
    )
    telefono = forms.CharField(
        validators=[
            RegexValidator(
                regex=r'^\+?\d{7,15}$',
                message='Teléfono inválido'
            ),
        ]
    )

    # === Validador personalizado (a nivel de campo) ===
    def clean_username(self):
        username = self.cleaned_data['username']
        if username.lower() in ['admin', 'root', 'soporte']:
            raise forms.ValidationError(
                'Este nombre de usuario no está disponible'
            )
        return username

    # === Validador a nivel de formulario (múltiples campos) ===
    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirmar = cleaned_data.get('confirmar_password')

        if password and confirmar and password != confirmar:
            raise forms.ValidationError(
                'Las contraseñas no coinciden'
            )
        return cleaned_data


# === ModelForm: formulario desde un modelo ===
from django.forms import ModelForm
from .models import Articulo

class ArticuloForm(ModelForm):
    class Meta:
        model = Articulo
        fields = ['titulo', 'slug', 'contenido',
                  'categoria', 'estado']
        widgets = {
            'contenido': forms.Textarea(attrs={'rows': 10}),
        }

    # Validación adicional sobre el ModelForm
    def clean_slug(self):
        slug = self.cleaned_data['slug']
        if not re.match(r'^[a-z0-9-]+$', slug):
            raise forms.ValidationError(
                'Slug inválido: solo minúsculas, números y guiones'
            )
        return slug`}
        />
        <PostIt number="N.26" title="cleaned_data" align="left" variant="warning">
            <p>Solo los datos que pasan la validación están disponibles en cleaned_data. Si un campo no es válido, no aparece en este diccionario. Siempre verifica is_valid() antes de acceder a cleaned_data.</p>
        </PostIt>

        <ArticleSectionTitle number="12.04" title="Django Admin" description="Introducción y personalización básica" />
        <Paragraph>
            Django admin es un panel de administración generado
            automáticamente a partir de los modelos. Se activa por
            defecto en todo proyecto nuevo y permite realizar
            operaciones CRUD sin escribir una sola línea de código. Se
            accede en /admin/ y requiere un usuario con permisos de
            staff.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="admin_basico.py"
            code={`# === admin.py — registro básico ===
from django.contrib import admin
from .models import Articulo, Categoria, Autor, Etiqueta


# Registro simple
admin.site.register(Autor)
admin.site.register(Etiqueta)


# Registro con personalización
@admin.register(Articulo)
class ArticuloAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'autor', 'categoria',
                    'estado', 'fecha_publicacion')
    list_filter = ('estado', 'categoria', 'fecha_publicacion')
    search_fields = ('titulo', 'contenido')
    ordering = ('-fecha_publicacion',)
    date_hierarchy = 'fecha_publicacion'
    prepopulated_fields = {'slug': ('titulo',)}


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'slug', 'total_articulos')
    prepopulated_fields = {'slug': ('nombre',)}

    # Campo calculado en el admin
    def total_articulos(self, obj):
        return obj.articulos.count()
    total_articulos.short_description = 'Total artículos'`}
        />

        <ArticleSectionTitle number="12.05" title="Personalización avanzada del Admin" description="Campos calculados, formularios personalizados y más" />
        <Paragraph>
            El admin de Django es altamente personalizable. Se pueden
            añadir campos calculados que no existen en el modelo,
            crear formularios personalizados para la interfaz de
            administración, definir acciones masivas, modificar la
            disposición de los campos con fieldsets y mucho más.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="admin_avanzado.py"
            code={`from django.contrib import admin
from django.utils.html import format_html
from .models import Articulo
from .forms import ArticuloAdminForm


@admin.register(Articulo)
class ArticuloAdmin(admin.ModelAdmin):
    # Formulario personalizado para el admin
    form = ArticuloAdminForm

    # Campos en la lista
    list_display = (
        'titulo', 'autor', 'categoria',
        'estado_coloreado', 'fecha_publicacion',
        'vista_previa'
    )
    list_filter = (
        'estado', 'categoria', 'autor',
        'fecha_publicacion'
    )
    search_fields = ('titulo', 'contenido')
    ordering = ('-fecha_publicacion',)

    # Paginación
    list_per_page = 25

    # Campos de sólo lectura
    readonly_fields = ('fecha_creacion', 'fecha_actualizacion')

    # Organización del formulario de edición
    fieldsets = (
        ('Información principal', {
            'fields': ('titulo', 'slug', 'autor', 'categoria')
        }),
        ('Contenido', {
            'fields': ('resumen', 'contenido'),
            'classes': ('wide',),
        }),
        ('Metadatos', {
            'fields': ('estado', 'destacado', 'etiquetas'),
            'classes': ('collapse',),  # Colapsable
        }),
        ('Fechas', {
            'fields': ('fecha_publicacion',
                       'fecha_creacion',
                       'fecha_actualizacion'),
        }),
    )

    # Campos calculados
    @admin.display(description='Estado')
    def estado_coloreado(self, obj):
        colores = {
            'borrador': 'gray',
            'publicado': 'green',
            'archivado': 'orange',
        }
        color = colores.get(obj.estado, 'gray')
        return format_html(
            '<span style="color: {};">{}</span>',
            color,
            obj.get_estado_display()
        )

    @admin.display(description='Vista previa')
    def vista_previa(self, obj):
        if obj.resumen:
            return format_html(
                '<small>{}</small>',
                obj.resumen[:100]
            )
        return '-'

    # Acciones personalizadas
    @admin.action(description='Publicar artículos seleccionados')
    def publicar_articulos(self, request, queryset):
        actualizados = queryset.update(estado='publicado')
        self.message_user(
            request,
            f'{actualizados} artículos publicados'
        )

    actions = [publicar_articulos]

    # Sobrescribir métodos de guardado
    def save_model(self, request, obj, form, change):
        if not change:  # Nuevo registro
            obj.autor = request.user
        super().save_model(request, obj, form, change)


# === forms.py para el admin ===
# from django import forms
# from .models import Articulo
#
# class ArticuloAdminForm(forms.ModelForm):
#     class Meta:
#         model = Articulo
#         fields = '__all__'
#         widgets = {
#             'contenido': forms.Textarea(attrs={'rows': 15}),
#         }
#
#     def clean_titulo(self):
#         titulo = self.cleaned_data['titulo']
#         if len(titulo) < 10:
#             raise forms.ValidationError(
#                 'El título debe tener al menos 10 caracteres'
#             )
#         return titulo`}
        />
        <PostIt number="N.27" title="format_html" align="right" variant="info">
            <p>format_html evita que Django escape el HTML generado. Úsalo solo con contenido seguro para prevenir XSS. Es ideal para indicadores visuales, colores y etiquetas en el admin.</p>
        </PostIt>

        <ArticleSectionTitle number="12.06" title="Middleware" description="El pipeline de peticiones" />
        <Paragraph>
            El middleware es un sistema de hooks que permite procesar
            peticiones y respuestas a nivel global antes de que lleguen
            a las vistas o después de que salgan de ellas. Cada
            middleware es una clase con métodos como process_request,
            process_view, process_response y process_exception. El
            orden en que aparecen en MIDDLEWARE_SETTINGS determina el
            orden de ejecución.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="middleware.py"
            code={`# === settings.py — middleware por defecto ===
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# === Middleware personalizado ===
import time
from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin


class TiempoRespuestaMiddleware(MiddlewareMixin):
    """Mide el tiempo de respuesta de cada petición."""

    def process_request(self, request):
        """Se ejecuta antes de la vista."""
        request.tiempo_inicio = time.time()

    def process_response(self, request, response):
        """Se ejecuta después de la vista."""
        if hasattr(request, 'tiempo_inicio'):
            duracion = time.time() - request.tiempo_inicio
            response['X-Tiempo-Respuesta'] = str(round(duracion, 4))
        return response


class BloqueoIPMiddleware(MiddlewareMixin):
    """Bloquea peticiones desde IPs no autorizadas."""
    IPS_BLOQUEADAS = ['192.168.1.100']

    def process_request(self, request):
        ip = request.META.get('REMOTE_ADDR')
        if ip in self.IPS_BLOQUEADAS:
            return HttpResponse(
                'Acceso denegado', status=403
            )


class MantenimientoMiddleware(MiddlewareMixin):
    """Modo mantenimiento."""
    MANTENIMIENTO = False

    def process_request(self, request):
        if self.MANTENIMIENTO and not request.user.is_staff:
            return HttpResponse(
                'Sitio en mantenimiento. Vuelva más tarde.',
                status=503
            )`}
        />
        <PostIt number="N.28" title="Flujo del middleware" align="left" variant="warning">
            <p>El middleware se ejecuta en orden para process_request (de arriba abajo) y en orden inverso para process_response (de abajo arriba), formando una estructura de cebolla.</p>
        </PostIt>

        <ArticleSectionTitle number="12.07" title="Manejo de Sesiones" description="Sesiones por usuario en Django" />
        <Paragraph>
            Django proporciona soporte completo para sesiones, permitiendo
            almacenar datos arbitrarios asociados a un visitante del
            sitio. Por defecto usa el backend de base de datos, pero
            también soporta sesiones basadas en caché, archivos o
            cookies. Las sesiones se acceden a través de
            request.session, que se comporta como un diccionario.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="sesiones.py"
            code={`# === Configuración de sesiones (settings.py) ===
# Backend: base de datos (por defecto)
SESSION_ENGINE = 'django.contrib.sessions.backends.db'

# Backend: caché
# SESSION_ENGINE = 'django.contrib.sessions.backends.cache'

# Backend: cookies (todo se guarda en el cliente)
# SESSION_ENGINE = 'django.contrib.sessions.backends.signed_cookies'

# Tiempo de vida de la sesión (segundos)
SESSION_COOKIE_AGE = 1209600  # 2 semanas

# Cerrar sesión al cerrar el navegador
SESSION_EXPIRE_AT_BROWSER_CLOSE = False

# Guardar sesión en cada petición
SESSION_SAVE_EVERY_REQUEST = False


# === Uso de sesiones en vistas ===
from django.shortcuts import render, redirect

def agregar_al_carrito(request, producto_id):
    """Ejemplo: carrito de compras con sesiones."""
    carrito = request.session.get('carrito', {})

    if producto_id in carrito:
        carrito[producto_id]['cantidad'] += 1
    else:
        carrito[producto_id] = {
            'producto_id': producto_id,
            'cantidad': 1,
            'fecha_agregado': str(timezone.now()),
        }

    request.session['carrito'] = carrito
    request.session.modified = True  # Forzar guardado
    return redirect('ver_carrito')


def ver_carrito(request):
    carrito = request.session.get('carrito', {})
    total_items = sum(
        item['cantidad'] for item in carrito.values()
    )
    return render(request, 'carrito.html', {
        'carrito': carrito,
        'total_items': total_items,
    })


def limpiar_sesion(request):
    """Eliminar datos de sesión."""
    # Eliminar una clave específica
    if 'carrito' in request.session:
        del request.session['carrito']

    # Limpiar toda la sesión
    request.session.flush()

    # Guardar cambios
    request.session.modified = True
    return redirect('inicio')`}
        />

        <ArticleSectionTitle number="12.08" title="Autenticación y Autorización" description="Sistema de usuarios, permisos y grupos" />
        <Paragraph>
            Django incluye un sistema de autenticación completo con
            usuarios, grupos, permisos y sesiones. El modelo User viene
            por defecto con campos como username, password, email,
            first_name, last_name, is_staff, is_active e is_superuser.
            La autorización se maneja mediante permisos que se asignan
            a usuarios o grupos.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="auth.py"
            code={`# === Registro y login (views.py) ===
from django.contrib.auth import (
    login, logout, authenticate
)
from django.contrib.auth.decorators import (
    login_required, permission_required
)
from django.contrib.auth.forms import (
    UserCreationForm, AuthenticationForm
)
from django.shortcuts import render, redirect


def registrar(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Iniciar sesión automático
            return redirect('inicio')
    else:
        form = UserCreationForm()
    return render(request, 'registro.html', {
        'form': form
    })


def iniciar_sesion(request):
    if request.method == 'POST':
        form = AuthenticationForm(
            request, data=request.POST
        )
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('inicio')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {
        'form': form
    })


def cerrar_sesion(request):
    logout(request)
    return redirect('inicio')


# === Proteger vistas con decoradores ===

@login_required(login_url='/login/')
def perfil(request):
    """Solo usuarios autenticados."""
    return render(request, 'perfil.html', {
        'usuario': request.user
    })


@permission_required('blog.add_articulo', raise_exception=True)
def crear_articulo(request):
    """Solo usuarios con permiso específico."""
    # ...


# === Verificar permisos en plantillas ===
{% comment %}
{% if user.is_authenticated %}
    <p>Bienvenido, {{ user.username }}</p>
    <a href="{% url 'cerrar_sesion' %}">Cerrar sesión</a>
{% else %}
    <a href="{% url 'iniciar_sesion' %}">Iniciar sesión</a>
{% endif %}

{% if perms.blog.add_articulo %}
    <a href="{% url 'crear_articulo' %}">Nuevo artículo</a>
{% endif %}
{% endcomment %}


# === Extensiones útiles de User ===
from django.contrib.auth.models import User

# Usar el modelo User por defecto
# o extenderlo con un perfil (OneToOneField)

class Perfil(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE,
        related_name='perfil'
    )
    bio = models.TextField(blank=True)
    avatar = models.ImageField(
        upload_to='avatares/', blank=True
    )
    sitio_web = models.URLField(blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)

    def __str__(self):
        return f'Perfil de {self.user.username}'`}
        />
        <PostIt number="N.29" title="Permisos por modelo" align="right" variant="info">
            <p>Django crea automáticamente tres permisos por modelo: add, change y delete. Puedes crear permisos personalizados en la clase Meta del modelo con permissions = [('puede_publicar', 'Puede publicar artículos')].</p>
        </PostIt>

        <ArticleSectionTitle number="12.09" title="Autorización con grupos" description="Gestión de roles y permisos por grupo" />
        <Paragraph>
            Los grupos permiten agrupar usuarios y asignar permisos de
            forma masiva. Un usuario puede pertenecer a varios grupos y
            hereda todos sus permisos. Este enfoque facilita la gestión
            de roles como Editor, Autor, Moderador, etc., sin tener que
            asignar permisos individualmente.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="grupos.py"
            code={`# === Crear grupos y asignar permisos (shell) ===
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from .models import Articulo

# Crear grupos
editor_group, _ = Group.objects.get_or_create(name='Editores')
autor_group, _ = Group.objects.get_or_create(name='Autores')

# Obtener permisos del modelo Articulo
content_type = ContentType.objects.get_for_model(Articulo)
permisos = Permission.objects.filter(
    content_type=content_type
)

# Asignar todos los permisos a Editores
editor_group.permissions.set(permisos)

# Asignar solo add y change a Autores
autor_group.permissions.set([
    Permission.objects.get(
        content_type=content_type, codename='add_articulo'
    ),
    Permission.objects.get(
        content_type=content_type, codename='change_articulo'
    ),
])

# Asignar usuario a un grupo
from django.contrib.auth.models import User
user = User.objects.get(username='ana')
user.groups.add(editor_group)


# === Verificar permisos en vistas ===
from django.contrib.auth.decorators import (
    login_required, permission_required
)

# Verificar por permiso específico
@permission_required('blog.delete_articulo')
def eliminar_articulo(request, pk):
    # ...

# Verificar por grupo
from django.shortcuts import get_object_or_404

def vista_restringida(request):
    if not request.user.groups.filter(
        name='Editores'
    ).exists():
        return redirect('sin_acceso')
    # ... lógica para editores


# === Mixin para CBV ===
from django.contrib.auth.mixins import (
    LoginRequiredMixin, PermissionRequiredMixin
)
from django.views.generic import CreateView

class CrearArticuloView(
    LoginRequiredMixin,
    PermissionRequiredMixin,
    CreateView
):
    model = Articulo
    fields = ['titulo', 'contenido', 'categoria']
    template_name = 'blog/crear.html'
    permission_required = 'blog.add_articulo'
    login_url = '/login/'`}
        />

        <ArticleSectionTitle number="12.10" title="Decoradores y Mixins de autenticación" description="Protección de vistas con decoradores y mixins" />
        <Paragraph>
            Django ofrece decoradores y mixins para proteger vistas de
            forma declarativa. Los decoradores se usan con vistas
            basadas en funciones (FBV), mientras que los mixins se
            usan con vistas basadas en clases (CBV). Ambos permiten
            redirigir al login, mostrar un error 403 o personalizar la
            respuesta cuando el usuario no cumple los requisitos.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="decoradores_mixins.py"
            code={`# === Decoradores para FBV ===
from django.contrib.auth.decorators import (
    login_required,
    permission_required,
    user_passes_test,
)


def es_editor(user):
    return user.groups.filter(name='Editores').exists()


@login_required(login_url='/login/')
def dashboard(request):
    """Cualquier usuario autenticado."""
    return render(request, 'dashboard.html')


@permission_required('blog.publish_articulo',
                     raise_exception=True)
def publicar_articulo(request, pk):
    """Requiere permiso específico. 403 si no lo tiene."""
    # ...


@user_passes_test(es_editor, login_url='/sin-acceso/')
def panel_editor(request):
    """Solo usuarios del grupo Editores."""
    # ...


# === Mixins para CBV ===
from django.contrib.auth.mixins import (
    LoginRequiredMixin,
    PermissionRequiredMixin,
    UserPassesTestMixin,
)
from django.views.generic import (
    ListView, UpdateView, DeleteView
)


class DashboardView(LoginRequiredMixin, ListView):
    model = Articulo
    template_name = 'dashboard.html'
    login_url = '/login/'


class EditarArticuloView(
    LoginRequiredMixin,
    PermissionRequiredMixin,
    UserPassesTestMixin,
    UpdateView,
):
    model = Articulo
    fields = ['titulo', 'contenido']
    permission_required = 'blog.change_articulo'

    # Test adicional: solo el autor o un editor
    def test_func(self):
        articulo = self.get_object()
        return (
            self.request.user == articulo.autor or
            self.request.user.groups.filter(
                name='Editores'
            ).exists()
        )

    def handle_no_permission(self):
        return redirect('sin_acceso')`}
        />

        <ArticleSectionTitle number="12.11" title="En conclusión" />
        <Paragraph>
            Django proporciona un conjunto de herramientas integradas
            que cubren las necesidades más comunes del desarrollo web:
            formularios con validación robusta, un panel de
            administración altamente personalizable, un sistema de
            middleware para procesar peticiones a nivel global y un
            sistema completo de sesiones y autenticación. Dominar estas
            herramientas es esencial para construir aplicaciones web
            seguras, mantenibles y con una experiencia de usuario
            profesional.
        </Paragraph>
    </Paper>
</main>
