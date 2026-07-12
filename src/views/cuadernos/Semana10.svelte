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
    <Paper sheet="10" revision="A">
        {#snippet title()}Semana 10 — Introducción a Python{/snippet}

        <ArticleHeader
            number="10.00"
            title="Introducción a Python"
            description="Python es un lenguaje de programación interpretado, de alto nivel y multipropósito, creado por Guido van Rossum en 1991. Su filosofía se basa en la legibilidad del código y una sintaxis clara y expresiva, lo que lo convierte en una excelente opción tanto para principiantes como para profesionales."
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

        <ArticleSectionTitle number="10.01" title="Sintaxis básica, indentación y comentarios" description="La indentación es parte de la sintaxis" />
        <Paragraph>
            A diferencia de otros lenguajes que usan llaves ({'{ }'}) para delimitar
            bloques, Python utiliza la indentación (espacios o tabuladores). Por
            convención se usan 4 espacios por nivel. Los comentarios se escriben
            con el símbolo # y el intérprete los ignora por completo.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="hola.py"
            code={`# Este es un comentario
# Python imprime en consola con print()

print("¡Hola, mundo!")  # Comentario inline

# La indentación define bloques
if 5 > 2:
    print("5 es mayor que 2")
    # Esto está dentro del if
print("Esto ya está fuera del if")`}
        />
        <PostIt number="N.12" title="PEP 8 — Guía de estilo" align="right" variant="info">
            <p>Python tiene un manual de estilo oficial (PEP 8) que recomienda usar 4 espacios por nivel de indentación, líneas de máximo 79 caracteres y nombres de variables en snake_case.</p>
        </PostIt>

        <ArticleSectionTitle number="10.02" title="Variables, cadenas y números" description="Tipado dinámico y operadores básicos" />
        <Paragraph>
            Python es de tipado dinámico: no es necesario declarar el tipo de una
            variable, el intérprete lo infiere en tiempo de ejecución. Las
            variables se crean en el momento de asignarles un valor. Las cadenas
            (strings) pueden definirse con comillas simples, dobles o triples
            para texto multilínea.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="variables.py"
            code={`# Variables — tipado dinámico
nombre = "Ana"         # str
edad = 25              # int
altura = 1.68          # float
es_estudiante = True   # bool

# Cadenas (strings)
saludo = 'Hola'
mensaje = "Esto es un texto"
multilinea = """Este texto
abarca varias
líneas"""

# Operaciones con strings
nombre_completo = "Ana " + "Pérez"  # Concatenación
repeticion = "ja" * 3               # "jajaja"
print(f"Hola, {nombre}")            # f-strings (interpolación)

# Números
suma = 10 + 5       # 15
resta = 10 - 5      # 5
multiplicacion = 4 * 3   # 12
division = 10 / 3   # 3.333... (float)
division_entera = 10 // 3  # 3
modulo = 10 % 3     # 1
potencia = 2 ** 3   # 8`}
        />
        <PostIt number="N.13" title="f-strings desde Python 3.6" align="left" variant="warning">
            <p>Las f-strings (cadenas con formato) permiten incrustar expresiones dentro de strings usando {'{ }'} y el prefijo f. Son más legibles y rápidas que el formato con % o .format().</p>
        </PostIt>

        <ArticleSectionTitle number="10.03" title="Tipos de datos" description="Los bloques fundamentales" />
        <Paragraph>
            Python ofrece varios tipos de datos incorporados. Los más importantes
            son los tipos numéricos (int, float, complex), los booleanos (bool),
            los tipos de secuencia (str, list, tuple, range), los tipos de
            conjunto (set, frozenset) y los tipos de mapeo (dict). Cada tipo
            define qué operaciones se pueden realizar y cómo se almacenan los
            datos en memoria.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="tipos.py"
            code={`# Tipos numéricos
entero = 42              # int
flotante = 3.1416        # float
complejo = 3 + 4j        # complex

# Booleanos
verdadero = True
falso = False

# Verificar el tipo de una variable
print(type(entero))      # <class 'int'>
print(type(flotante))    # <class 'float'>

# Conversión entre tipos (casting)
print(int(3.14))         # 3
print(float(10))         # 10.0
print(str(42))           # "42"
print(bool(1))           # True
print(bool(0))           # False`}
        />

        <ArticleSectionTitle number="10.04" title="Listas y tuplas" description="Secuencias mutables e inmutables" />
        <Paragraph>
            Las listas son secuencias mutables que pueden contener elementos de
            diferentes tipos. Se definen con corchetes []. Las tuplas son
            similares pero inmutables —una vez creadas no pueden modificarse— y
            se definen con paréntesis (). Ambas soportan indexación, slicing y
            operaciones de pertenencia.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="listas_tuplas.py"
            code={`# Listas (mutables)
frutas = ["manzana", "banana", "cereza"]
frutas.append("durazno")     # Agregar al final
frutas.insert(0, "arándano") # Agregar en posición
frutas.remove("banana")      # Eliminar por valor
ultima = frutas.pop()        # Eliminar y retornar último
print(frutas[0])             # Indexación
print(frutas[-1])            # Último elemento
print(frutas[1:3])           # Slicing [inicio:fin]

# Tuplas (inmutables)
coordenadas = (10, 20)
# coordenadas[0] = 5  ← Error: las tuplas no se modifican
x, y = coordenadas           # Desempaquetado

# Operaciones comunes
print(len(frutas))           # Longitud
print("manzana" in frutas)   # Pertenencia (True/False)

# Listas con diferentes tipos
mixta = [1, "hola", 3.14, True]`}
        />
        <PostIt number="N.14" title="Mutabilidad" align="right" variant="info">
            <p>Las listas, diccionarios y sets son mutables (se pueden modificar después de creados). Las tuplas, strings y frozensets son inmutables (no cambian).</p>
        </PostIt>

        <ArticleSectionTitle number="10.05" title="Diccionarios" description="Pares clave-valor" />
        <Paragraph>
            Los diccionarios almacenan datos en pares clave-valor. Son una
            estructura fundamental en Python, equivalente a mapas o tablas hash
            en otros lenguajes. Las claves deben ser inmutables (strings,
            números, tuplas) y los valores pueden ser cualquier tipo de objeto.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="diccionarios.py"
            code={`# Crear un diccionario
persona = {
    "nombre": "Carlos",
    "edad": 30,
    "ciudad": "Madrid"
}

# Acceder a valores
print(persona["nombre"])      # Carlos
print(persona.get("edad"))    # 30 (seguro, no arroja error)
print(persona.get("pais", "No especificado"))  # Valor por defecto

# Modificar
persona["edad"] = 31
persona["profesion"] = "Ingeniero"  # Agregar nueva clave

# Iterar
for clave, valor in persona.items():
    print(f"{clave}: {valor}")

# Métodos útiles
print(persona.keys())     # dict_keys([...])
print(persona.values())   # dict_values([...])
print(persona.items())    # dict_items([...])
persona.pop("ciudad")     # Eliminar y retornar valor`}
        />
        <PostIt number="N.15" title="Diccionarios en Python 3.7+" align="left" variant="warning">
            <p>A partir de Python 3.7, los diccionarios mantienen el orden de inserción. Antes de esa versión el orden no estaba garantizado.</p>
        </PostIt>

        <ArticleSectionTitle number="10.06" title="Condicionales" description="if, elif, else" />
        <Paragraph>
            Las estructuras condicionales permiten ejecutar diferentes bloques de
            código según una condición. Python utiliza if, elif (else if) y
            else. No usa paréntesis obligatorios ni llaves; todo se define por
            indentación.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="condicionales.py"
            code={`edad = 18

if edad < 12:
    print("Niño")
elif edad < 18:
    print("Adolescente")
elif edad < 65:
    print("Adulto")
else:
    print("Adulto mayor")

# Operadores de comparación
# ==  !=  <  >  <=  >=

# Operadores lógicos
if edad >= 18 and edad <= 65:
    print("En edad laboral")

if edad < 12 or edad > 65:
    print("No en edad laboral")

if not edad == 0:
    print("Edad válida")

# Ternary (operador ternario)
mensaje = "Mayor de edad" if edad >= 18 else "Menor de edad"`}
        />

        <ArticleSectionTitle number="10.07" title="Estructuras de control" description="Bucles for y while" />
        <Paragraph>
            Python ofrece dos estructuras de repetición: for (para iterar sobre
            secuencias) y while (mientras se cumpla una condición). El bucle
            for es especialmente potente porque puede recorrer cualquier objeto
            iterable: listas, tuplas, strings, diccionarios, archivos, etc.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="bucles.py"
            code={`# Bucle for sobre una lista
colores = ["rojo", "verde", "azul"]
for color in colores:
    print(color)

# range(start, stop, step)
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10, 2):  # 2, 4, 6, 8
    print(i)

# enumerate — obtener índice y valor
for i, color in enumerate(colores):
    print(f"{i}: {color}")

# Bucle while
contador = 0
while contador < 5:
    print(contador)
    contador += 1

# break y continue
for num in range(10):
    if num == 3:
        continue      # Salta esta iteración
    if num == 7:
        break         # Sale del bucle
    print(num)`}
        />
        <PostIt number="N.16" title="else en bucles" align="right" variant="info">
            <p>Python permite un bloque else en los bucles for y while. Se ejecuta solo si el bucle termina normalmente (sin un break). Es útil para búsquedas.</p>
        </PostIt>

        <ArticleSectionTitle number="10.08" title="Funciones imperativas" description="def, parámetros y retorno" />
        <Paragraph>
            Las funciones en Python se definen con la palabra clave def, seguidas
            del nombre, paréntesis con los parámetros y dos puntos. El bloque
            indentado contiene el cuerpo. Las funciones pueden retornar valores
            con return y también pueden retornar múltiples valores como una
            tupla.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="funciones.py"
            code={`# Función básica
def saludar(nombre):
    """Documentación (docstring) de la función."""
    return f"¡Hola, {nombre}!"

print(saludar("Ana"))

# Parámetros por defecto
def potencia(base, exponente=2):
    return base ** exponente

print(potencia(3))      # 9 (3^2)
print(potencia(3, 4))   # 81 (3^4)

# Múltiples valores de retorno
def dividir(a, b):
    cociente = a // b
    resto = a % b
    return cociente, resto  # Retorna una tupla

c, r = dividir(10, 3)
print(f"Cociente: {c}, Resto: {r}")

# Parámetros args (*args) y kwargs (**kwargs)
def sumar_todo(*numeros):
    return sum(numeros)

print(sumar_todo(1, 2, 3, 4))  # 10

def mostrar_info(**datos):
    for clave, valor in datos.items():
        print(f"{clave}: {valor}")

mostrar_info(nombre="Luis", edad=25, ciudad="Lima")`}
        />
        <PostIt number="N.17" title="API imperativa" align="left" variant="warning">
            <p>Python expresa operaciones a través de funciones que modifican estado (imperativo). La API estándar es extensa: print(), len(), type(), input(), range(), enumerate(), zip(), map(), filter(), sorted(), etc.</p>
        </PostIt>

        <ArticleSectionTitle number="10.09" title="Clases y Programación Orientada a Objetos" description="Encapsulamiento, herencia múltiple y polimorfismo" />
        <Paragraph>
            Python soporta programación orientada a objetos con clases, herencia
            y polimorfismo. Las clases se definen con class y los objetos se
            instancian llamando a la clase como si fuera una función. Python
            permite herencia múltiple: una clase puede heredar de varias clases
            padre.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="poo.py"
            code={`# Clase básica
class Perro:
    # Constructor
    def __init__(self, nombre, raza):
        self.nombre = nombre      # Atributo de instancia
        self.raza = raza

    # Método de instancia
    def ladrar(self):
        return f"{self.nombre} dice: ¡Guau!"

# Instanciar
mi_perro = Perro("Max", "Labrador")
print(mi_perro.ladrar())

# Encapsulamiento (convención)
class CuentaBancaria:
    def __init__(self, titular, saldo=0):
        self.titular = titular       # Público
        self._saldo = saldo          # "Protegido" (convención)
        self.__clave = "1234"        # "Privado" (name mangling)

    def depositar(self, monto):
        if monto > 0:
            self._saldo += monto

    def obtener_saldo(self):
        return self._saldo

# Herencia simple
class Animal:
    def __init__(self, nombre):
        self.nombre = nombre

    def hacer_sonido(self):
        pass  # Método abstracto (en la práctica)

class Gato(Animal):
    def hacer_sonido(self):      # Polimorfismo: sobrescritura
        return f"{self.nombre} dice: ¡Miau!"

class Vaca(Animal):
    def hacer_sonido(self):
        return f"{self.nombre} dice: ¡Muu!"

# Polimorfismo
animales = [Gato("Misi"), Vaca("Lola")]
for animal in animales:
    print(animal.hacer_sonido())

# Herencia múltiple
class Volador:
    def volar(self):
        return "Estoy volando"

class Nadador:
    def nadar(self):
        return "Estoy nadando"

class Pato(Volador, Nadador):  # Herencia múltiple
    def __init__(self, nombre):
        self.nombre = nombre

pato = Pato("Donald")
print(pato.volar())
print(pato.nadar())`}
        />
        <PostIt number="N.18" title="Encapsulamiento en Python" align="right" variant="info">
            <p>Python no tiene modificadores de acceso como otros lenguajes. Usa convenciones: _atributo (protected, por convención) y __atributo (private, con name mangling a _Clase__atributo). Todo sigue siendo accesible, solo se confía en la responsabilidad del programador.</p>
        </PostIt>

        <ArticleSectionTitle number="10.10" title="Constructores y Destructores" description="__init__ y __del__" />
        <Paragraph>
            El método __init__ es el constructor de una clase en Python. Se
            ejecuta automáticamente al instanciar un objeto y se usa para
            inicializar atributos. El método __del__ es el destructor, se
            ejecuta cuando el objeto es eliminado por el recolector de basura.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="init_del.py"
            code={`class Archivo:
    def __init__(self, nombre):
        """Constructor: se ejecuta al crear el objeto."""
        self.nombre = nombre
        self.archivo = open(nombre, "w")
        print(f"Archivo {nombre} abierto")

    def escribir(self, texto):
        self.archivo.write(texto + "\\n")

    def __del__(self):
        """Destructor: se ejecuta al eliminar el objeto."""
        self.archivo.close()
        print(f"Archivo {self.nombre} cerrado")

# Uso
doc = Archivo("notas.txt")
doc.escribir("Hola, mundo")
# Cuando doc sale de ámbito, __del__ se llama automáticamente
del doc  # Explícitamente`}
        />
        <PostIt number="N.19" title="Gestores de contexto (with)" align="left" variant="warning">
            <p>En lugar de __del__ para recursos, se recomienda usar with y context managers (__enter__ y __exit__). with open("archivo.txt") as f: garantiza el cierre incluso si hay errores.</p>
        </PostIt>

        <ArticleSectionTitle number="10.11" title="Excepciones" description="Manejo de errores con try/except" />
        <Paragraph>
            Las excepciones permiten manejar errores de forma controlada. Python
            utiliza try, except, else y finally. Se pueden capturar excepciones
            específicas y también crear excepciones personalizadas heredando de
            Exception.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="excepciones.py"
            code={`# Bloques try/except
try:
    numero = int(input("Ingresa un número: "))
    resultado = 10 / numero
    print(f"Resultado: {resultado}")
except ValueError:
    print("Error: no ingresaste un número válido")
except ZeroDivisionError:
    print("Error: no se puede dividir por cero")
except Exception as e:
    print(f"Error inesperado: {e}")
else:
    print("¡Sin errores!")
finally:
    print("Esto se ejecuta siempre")

# Lanzar excepciones (raise)
def validar_edad(edad):
    if edad < 0:
        raise ValueError("La edad no puede ser negativa")
    if edad > 150:
        raise ValueError("Edad no realista")
    return True

# Excepciones personalizadas
class SaldoInsuficienteError(Exception):
    pass

class Cuenta:
    def __init__(self, saldo=0):
        self.saldo = saldo

    def retirar(self, monto):
        if monto > self.saldo:
            raise SaldoInsuficienteError(
                f"Saldo insuficiente: {self.saldo} < {monto}"
            )
        self.saldo -= monto

cuenta = Cuenta(100)
try:
    cuenta.retirar(200)
except SaldoInsuficienteError as e:
    print(f"Error: {e}")`}
        />

        <ArticleSectionTitle number="10.12" title="Módulos" description="Organización y reutilización del código" />
        <Paragraph>
            Un módulo en Python es simplemente un archivo .py que contiene
            definiciones y declaraciones. Los módulos permiten organizar el
            código en unidades lógicas y reutilizarlas en diferentes programas.
            Python incluye una biblioteca estándar con cientos de módulos, y
            también se pueden crear módulos propios.
        </Paragraph>
        <CodeBlock
            language="python"
            filename="modulos.py"
            code={`# Importar un módulo completo
import math
print(math.sqrt(16))          # 4.0
print(math.pi)                # 3.141592653589793

# Importar funciones específicas
from random import randint, choice
print(randint(1, 10))         # Número aleatorio entre 1 y 10
print(choice(["rojo", "verde", "azul"]))

# Importar con alias
import datetime as dt
hoy = dt.date.today()
print(hoy)

# Módulos de la biblioteca estándar útiles
import os      # Interactuar con el sistema operativo
import sys     # Parámetros y funciones del sistema
import json    # Trabajar con JSON
import re      # Expresiones regulares
import csv     # Leer/escribir archivos CSV

# Crear un módulo propio
# Guardar en mi_modulo.py:
# def saludar(nombre):
#     return f"Hola, {nombre}"
#
# Luego en otro archivo:
# from mi_modulo import saludar
# print(saludar("Ana"))

# Ver todas las funciones de un módulo
print(dir(math))  # Lista todos los nombres en el módulo math`}
        />
        <PostIt number="N.20" title="El Zen de Python" align="right" variant="info">
            <p>En el intérprete de Python, escribe <code>import this</code> para leer "El Zen de Python", una colección de principios que guían el diseño del lenguaje. El primero: "Beautiful is better than ugly."</p>
        </PostIt>

        <ArticleSectionTitle number="10.13" title="En conclusión" />
        <Paragraph>
            Python es un lenguaje versátil que combina una sintaxis clara con un
            ecosistema enorme de bibliotecas. Desde sus fundamentos —variables,
            tipos de datos, estructuras de control y funciones— hasta la
            programación orientada a objetos con clases, herencia múltiple y
            polimorfismo, Python ofrece herramientas para abordar proyectos de
            cualquier escala. El manejo de excepciones y la organización en
            módulos completan un conjunto robusto para el desarrollo de
            software.
        </Paragraph>
    </Paper>
</main>
