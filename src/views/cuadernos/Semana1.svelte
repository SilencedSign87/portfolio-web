<script>
    import ArticleHeader from "@components/article/ArticleHeader.svelte";
    import ArticleSectionTitle from "@components/article/ArticleSectionTitle.svelte";
    import Paragraph from "@components/article/Paragraph.svelte";
    import CodeBlock from "@components/article/CodeBlock.svelte";
    import PostIt from "@components/PostIt.svelte";
    import Paper from "@components/article/Paper.svelte";
    import blur1dark from "@assets/blur1dark.jpg";
    import blur1light from "@assets/blur1light.png";
    import ThemeImage from "@components/ThemeImage.svelte";
</script>

<main class="cuaderno">
    <Paper sheet="01" revision="A">
        {#snippet title()}Fundamentos Web — Semana 01{/snippet}

        <ArticleHeader
            number="01.00"
            title="Fundamentos de las tecnologías web"
            description="Los servicios web modernos son la base de gran parte de las aplicaciones digitales que usamos diariamente: redes sociales, plataformas de streaming, banca en línea y aplicaciones móviles. Su principal objetivo es permitir que diferentes sistemas se comuniquen entre sí de forma rápida, segura y escalable a través de internet."
        >
            {#snippet before()}
                <ThemeImage
                    lightSrc={blur1light}
                    darkSrc={blur1dark}
                    alt="Imagen de fondo"
                    class="w-full h-64 object-cover"
                />
            {/snippet}
        </ArticleHeader>

        <ArticleSectionTitle number="01.01" title="HTML" description="La estructura de la web" />
        <Paragraph>
            El lenguaje HTML (HyperText Markup Language) se utiliza para crear la
            estructura básica de una página web. Define elementos como títulos,
            párrafos, imágenes, enlaces y tablas. Cada sitio web depende de HTML
            para organizar su contenido de manera clara y accesible.
        </Paragraph>
        <CodeBlock
            language="html"
            filename="index.html"
            code={`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Mi primera página</title>
</head>
<body>
    <h1>Bienvenido</h1>
    <p>Este es un párrafo de ejemplo.</p>
    <img src="imagen.jpg" alt="Descripción" />
</body>
</html>`}
        />
        <PostIt number="N.01" title="HTML no es tan estricto" align="right">
            <p>
                Aunque olvidar una etiqueta de cierre puede romper el diseño, el
                navegador hará todo lo posible por mostrar el contenido igualmente.
            </p>
        </PostIt>

        <ArticleSectionTitle number="01.02" title="CSS" description="Diseño e impresión" />
        <Paragraph>
            CSS (Cascading Style Sheets) es el lenguaje encargado de la apariencia
            visual de las páginas web. Permite modificar colores, tamaños, fuentes y
            distribuciones. Gracias a CSS, los sitios pueden adaptarse a distintos
            dispositivos como computadoras, tabletas y teléfonos móviles.
        </Paragraph>
        <CodeBlock
            language="css"
            filename="styles.css"
            code={`body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
}

h1 {
    color: #007bff;
    text-align: center;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
}`}
        />

        <ArticleSectionTitle number="01.03" title="JavaScript" description="Interactividad y dinamismo" />
        <Paragraph>
            JavaScript añade funciones dinámicas e interactivas a los sitios web.
            Con este lenguaje es posible crear menús interactivos, formularios
            inteligentes, animaciones y aplicaciones completas que funcionan
            directamente en el navegador.
        </Paragraph>
        <CodeBlock
            language="javascript"
            filename="app.js"
            code={`// Mostrar un mensaje en la consola
console.log("¡Hola, mundo!");

// Manipular el DOM
document.getElementById("saludo").textContent =
    "Texto actualizado desde JavaScript";

// Responder a eventos
document.querySelector("button")
    .addEventListener("click", () => {
        alert("¡Botón clickeado!");
    });

// Fetch a una API
fetch("https://api.example.com/datos")
    .then(res => res.json())
    .then(data => console.log(data));`}
        />

        <ArticleSectionTitle number="01.04" title="Servidores y Clientes" />
        <Paragraph>
            En la web existen dos componentes principales: el cliente y el servidor.
            El cliente es el navegador utilizado por el usuario, mientras que el
            servidor almacena y entrega la información solicitada. Ambos se
            comunican mediante protocolos como HTTP y HTTPS.
        </Paragraph>

        <ArticleSectionTitle number="01.05" title="Bases de datos" />
        <Paragraph>
            Las bases de datos permiten almacenar información de manera organizada.
            Sitios web modernos utilizan sistemas de bases de datos para guardar
            usuarios, productos, publicaciones y otros datos importantes. Algunas
            tecnologías comunes son MySQL, PostgreSQL y MongoDB.
        </Paragraph>

        <ArticleSectionTitle number="01.06" title="Frameworks y herramientas modernas" />
        <Paragraph>
            Actualmente existen frameworks que facilitan el desarrollo web, como
            React, Angular, Svelte y Vue para el frontend, y Node.js, Django o
            Laravel para el backend. Estas herramientas ayudan a crear aplicaciones
            más rápidas, escalables y fáciles de mantener.
        </Paragraph>

        <ArticleSectionTitle number="01.07" title="En conclusión" />
        <Paragraph>
            Los fundamentos de las tecnologías web son esenciales para comprender
            cómo funciona Internet. HTML, CSS y JavaScript forman la base del
            desarrollo web, mientras que servidores, bases de datos y frameworks
            permiten construir aplicaciones modernas y eficientes.
        </Paragraph>
    </Paper>
</main>

