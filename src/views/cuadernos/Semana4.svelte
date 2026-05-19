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

<main class="max-w-7xl m-auto mt-12 px-4 pb-12">
    <Paper>
        <ArticleHeader
            title="Manipulación del DOM con JavaScript y Canvas"
            description="El DOM (Document Object Model) es la representación estructurada de una página web que permite a JavaScript interactuar con el contenido, la estructura y los estilos. Junto con Canvas, forman una combinación poderosa para crear experiencias visuales dinámicas directamente en el navegador."
        >
            <div slot="before">
                <ThemeImage
                    lightSrc={blur1light}
                    darkSrc={blur1dark}
                    alt="Imagen de fondo"
                    className="w-full h-64 object-cover rounded-lg"
                />
            </div>
        </ArticleHeader>

        <ArticleSectionTitle
            title="¿Qué es el DOM?"
            description="El modelo de objetos del documento"
        ></ArticleSectionTitle>
        <Paragraph>
            El DOM es una interfaz de programación que representa un documento HTML
            como un árbol de nodos. Cada elemento, atributo y fragmento de texto se
            convierte en un objeto que puede ser consultado, modificado, añadido o
            eliminado mediante JavaScript. Esto permite crear páginas dinámicas que
            responden a las acciones del usuario sin necesidad de recargar el sitio.
        </Paragraph>
        <Paragraph>
            Cuando el navegador carga una página web, parsea el HTML y construye el
            árbol DOM. Una vez construido, JavaScript puede acceder a cualquier nodo
            del árbol utilizando métodos como getElementById, querySelector o
            querySelectorAll, que permiten localizar elementos específicos dentro de
            la estructura del documento.
        </Paragraph>

        <ArticleSectionTitle
            title="Selección de elementos"
            description="Acceder a los nodos del DOM"
        ></ArticleSectionTitle>
        <Paragraph>
            Para manipular el DOM, primero es necesario seleccionar los elementos
            objetivo. El método getElementById selecciona un elemento por su
            identificador único. querySelector permite usar selectores CSS, lo que
            resulta más flexible al poder seleccionar por clase, atributo o
            jerarquía. querySelectorAll devuelve todos los elementos que coinciden
            con el selector, retornando una NodeList que puede recorrerse.
        </Paragraph>
        <CodeBlock
            code={`// Selección por ID
const header = document.getElementById("header");

// Selección por selector CSS
const primerItem = document.querySelector(".lista li");
const todosLosItems = document.querySelectorAll(".lista li");

// Recorrer una NodeList
todosLosItems.forEach((item, index) => {
    console.log(\`Item \${index + 1}: \${item.textContent}\`);
});

// Selección por clase
const tarjetas = document.getElementsByClassName("tarjeta");`}
            language="javascript"
        />
        <Paragraph>
            Estos métodos son la puerta de entrada a cualquier manipulación del DOM.
            Una vez obtenida la referencia al elemento, es posible leer o modificar
            sus propiedades, contenido y estilos.
        </Paragraph>

        <ArticleSectionTitle
            title="Modificar contenido y atributos"
            description="Cambiar texto, HTML y atributos"
        ></ArticleSectionTitle>
        <Paragraph>
            La propiedad textContent permite modificar el texto visible de un
            elemento, mientras que innerHTML permite insertar o modificar código
            HTML dentro de él. Para trabajar con atributos, los métodos
            getAttribute, setAttribute y removeAttribute permiten leer, asignar y
            eliminar atributos como src, href, alt o data-*.
        </Paragraph>
        <Paragraph>
            Es importante utilizar textContent en lugar de innerHTML cuando solo se
            necesita texto plano, ya que innerHTML parsea el contenido como HTML y
            puede representar un riesgo de seguridad si se trabaja con datos no
            confiables, debido a posibles ataques de inyección de código.
        </Paragraph>

        <ArticleSectionTitle
            title="Estilos y clases CSS"
            description="Control visual desde JavaScript"
        ></ArticleSectionTitle>
        <Paragraph>
            La propiedad style permite modificar estilos en línea de un elemento.
            Cada propiedad CSS se escribe en formato camelCase, por ejemplo
            backgroundColor, fontSize o marginTop. Sin embargo, el enfoque más
            recomendado es trabajar con clases CSS mediante classList, que ofrece
            métodos como add, remove, toggle y contains para gestionar las clases
            de forma eficiente.
        </Paragraph>
        <CodeBlock
            code={`const menu = document.querySelector(".menu");
const boton = document.getElementById("menu-toggle");

// Alternar clase activa
boton.addEventListener("click", () => {
    menu.classList.toggle("activo");
});

// Verificar si tiene una clase
if (menu.classList.contains("activo")) {
    console.log("El menú está abierto");
}

// Estilo en línea
menu.style.backgroundColor = "#1a1a2e";
menu.style.borderRadius = "8px";`}
            language="javascript"
        />
        <Paragraph>
            classList.toggle resulta especialmente útil para funcionalidades como
            menús desplegables, modos oscuro y claro, o cualquier interfaz que
            requiera alternar entre estados visuales.
        </Paragraph>
        <ArticleSectionTitle
            title="Creación y eliminación de elementos"
            description="Construir y destruir nodos"
        ></ArticleSectionTitle>
        <Paragraph>
            createElement permite generar nuevos elementos HTML desde JavaScript.
            Una vez creado, se le pueden asignar atributos, clases y contenido antes
            de insertarlo en el DOM mediante appendChild, insertBefore o append.
            Para eliminar elementos, el método removeChild o la más moderna llamada
            remove permiten quitarlos del árbol DOM.
        </Paragraph>
        <Paragraph>
            Esta capacidad de crear y destruir elementos dinámicamente es
            fundamental en aplicaciones web modernas, donde listas, galerías y
            componentes se renderizan según los datos disponibles.
        </Paragraph>

        <ArticleSectionTitle
            title="Eventos"
            description="Responder a las acciones del usuario"
        ></ArticleSectionTitle>
        <Paragraph>
            Los eventos permiten que una página web reaccione ante interacciones
            como clics, movimientos del ratón, pulsaciones de teclado o envíos de
            formularios. addEventListener es el método estándar para asociar una
            función a un evento específico en un elemento. También es posible
            eliminar la asociación con removeEventListener.
        </Paragraph>
        <Paragraph>
            El objeto event proporciona información detallada sobre la interacción:
            la posición del ratón, la tecla presionada, el elemento objetivo y más.
            La propagación de eventos (burbujeo y captura) es un concepto avanzado
            que determina el orden en que los elementos reciben los eventos cuando
            estos están anidados.
        </Paragraph>

        <ArticleSectionTitle
            title="Introducción a Canvas"
            description="Dibujo programático en el navegador"
        ></ArticleSectionTitle>
        <Paragraph>
            El elemento &lt;canvas&gt; forma parte del estándar HTML5 y proporciona
            una superficie de dibujo que puede ser controlada mediante JavaScript.
            A diferencia del DOM, Canvas no mantiene un árbol de objetos; en su
            lugar, trabaja con un contexto de renderizado que permite dibujar
            formas, rutas, texto e imágenes de forma imperativa y en píxeles.
        </Paragraph>
        <Paragraph>
            Para empezar a trabajar con Canvas, se obtiene el elemento del DOM,
            se accede a su contexto de dibujo mediante getContext('2d') y se
            utilizan métodos como fillRect, strokeRect, beginPath, moveTo, lineTo
            y arc para crear formas geométricas. El contexto 2D también permite
            definir colores, grosores de línea, sombras y transformaciones.
        </Paragraph>
        <CodeBlock
            code={`const canvas = document.getElementById("lienzo");
const ctx = canvas.getContext("2d");

// Rectángulo relleno
ctx.fillStyle = "#3498db";
ctx.fillRect(50, 50, 150, 100);

// Rectángulo con borde
ctx.strokeStyle = "#2c3e50";
ctx.lineWidth = 4;
ctx.strokeRect(50, 50, 150, 100);

// Línea
ctx.beginPath();
ctx.moveTo(250, 50);
ctx.lineTo(400, 150);
ctx.stroke();

// Círculo
ctx.beginPath();
ctx.arc(200, 250, 60, 0, Math.PI * 2);
ctx.fillStyle = "#e74c3c";
ctx.fill();`}
            language="javascript"
        />

        <ArticleSectionTitle
            title="Dibujo avanzado y estilos"
            description="Colores, gradientes y texto"
        ></ArticleSectionTitle>
        <Paragraph>
            Canvas ofrece un control detallado sobre la apariencia de los dibujos.
            fillStyle y strokeStyle permiten definir colores de relleno y borde
            usando valores hexadecimales, RGB, HSL o gradientes. Los gradientes
            lineales y radiales se crean con createLinearGradient y
            createRadialGradient, y luego se asignan como estilo de relleno o
            trazo.
        </Paragraph>
        <Paragraph>
            Además de formas geométricas, Canvas puede renderizar texto con
            fillText y strokeText, permitiendo controlar la fuente, el tamaño, la
            alineación y el espaciado. Esto hace posible crear visualizaciones de
            datos, etiquetas interactivas y gráficos informativos sin depender de
            librerías externas.
        </Paragraph>

        <ArticleSectionTitle
            title="Animaciones en Canvas"
            description="Movimiento y transformaciones"
        ></ArticleSectionTitle>
        <Paragraph>
            Canvas no incluye un bucle de animación nativo, pero combinado con
            requestAnimationFrame permite crear animaciones fluidas y eficientes.
            El patrón consiste en limpiar el canvas con clearRect, actualizar el
            estado de los objetos y volver a dibujarlos en cada fotograma.
            requestAnimationFrame sincroniza el dibujo con la tasa de refresco del
            monitor, optimizando el rendimiento y el consumo de recursos.
        </Paragraph>
        <CodeBlock
            code={`const canvas = document.getElementById("animacion");
const ctx = canvas.getContext("2d");
let x = 0;
let direccion = 1;

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar círculo en movimiento
    ctx.beginPath();
    ctx.arc(x, 100, 30, 0, Math.PI * 2);
    ctx.fillStyle = "#9b59b6";
    ctx.fill();

    // Actualizar posición
    x += 2 * direccion;
    if (x > canvas.width - 30 || x < 30) {
        direccion *= -1;
    }

    requestAnimationFrame(animar);
}

animar();`}
            language="javascript"
        />
        <Paragraph>
            Este mismo patrón es la base de videojuegos en 2D, simulaciones,
            visualizaciones de datos en tiempo real y efectos visuales interactivos.
            Al combinar la manipulación del DOM con Canvas, es posible crear
            interfaces híbridas donde los elementos HTML tradicionales interactúan
            con gráficos renderizados dinámicamente.
        </Paragraph>
        <PostIt align="left" translateX={100} translateY={-45}>
            <p class="text-sm font-medium">rAF pausa en segundo plano</p>
            <p class="text-xs mt-1 opacity-80">
                requestAnimationFrame detiene automáticamente la animación cuando
                la pestaña no está visible. No malgasta recursos.
            </p>
        </PostIt>

        <ArticleSectionTitle
            title="En Conclusión"
        ></ArticleSectionTitle>
        <Paragraph>
            La manipulación del DOM y el uso de Canvas representan dos pilares
            esenciales del desarrollo web interactivo. Mientras que el DOM permite
            modificar la estructura y el contenido de una página de manera
            declarativa, Canvas ofrece un control píxel a píxel para crear gráficos
            y animaciones complejas. Dominar ambas técnicas abre la puerta a
            aplicaciones web ricas e interactivas, desde visualizaciones de datos y
            juegos hasta herramientas de diseño y edición directamente en el
            navegador.
        </Paragraph>
    </Paper>
</main>
