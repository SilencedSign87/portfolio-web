<script>
    import ArticleHeader from "@components/article/ArticleHeader.svelte";
    import ArticleSectionTitle from "@components/article/ArticleSectionTitle.svelte";
    import Paragraph from "@components/article/Paragraph.svelte";
    import CodeBlock from "@components/article/CodeBlock.svelte";
    import Paper from "@components/article/Paper.svelte";
    import blur1dark from "@assets/blur1dark.jpg";
    import blur1light from "@assets/blur1light.png";
    import ThemeImage from "@components/ThemeImage.svelte";
</script>

<main class="max-w-7xl m-auto mt-12 px-4 pb-12">
    <Paper>
        <ArticleHeader
            title="Fundamentos de las tecnologías web"
            description="Los servicios web modernos son la base de gran parte de las aplicaciones digitales que usamos diariamente: redes sociales, plataformas de streaming, banca en línea y aplicaciones móviles. Su principal objetivo es permitir que diferentes sistemas se comuniquen entre sí de forma rápida, segura y escalable a través de internet."
        >
            <div slot="before">
                <ThemeImage
                    lightSrc={blur1light}
                    darkSrc={blur1dark}
                    alt="Imagen de fondo"
                    className="w-full h-64 object-cover rounded-sm"
                />
            </div>
        </ArticleHeader>

        <ArticleSectionTitle title="HTML" description="La estructura de la web"
        ></ArticleSectionTitle>
        <Paragraph>
            El lenguaje HTML (HyperText Markup Language) se utiliza para crear la
            estructura básica de una página web. Define elementos como títulos,
            párrafos, imágenes, enlaces y tablas. Cada sitio web depende de HTML
            para organizar su contenido de manera clara y accesible.
        </Paragraph>
        <CodeBlock
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
            language="html"
        />
        <ArticleSectionTitle title="CSS" description="Diseño e impresión"
        ></ArticleSectionTitle>
        <Paragraph>
            CSS (Cascading Style Sheets) es el lenguaje encargado de la apariencia
            visual de las páginas web. Permite modificar colores, tamaños, fuentes y
            distribuciones. Gracias a CSS, los sitios pueden adaptarse a distintos
            dispositivos como computadoras, tabletas y teléfonos móviles.
        </Paragraph>
        <CodeBlock
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
            language="css"
        />
        <ArticleSectionTitle
            title="Javascript"
            description="Interactividad y dinamismo"
        ></ArticleSectionTitle>
        <Paragraph>
            JavaScript añade funciones dinámicas e interactivas a los sitios web.
            Con este lenguaje es posible crear menús interactivos, formularios
            inteligentes, animaciones y aplicaciones completas que funcionan
            directamente en el navegador.
        </Paragraph>
        <CodeBlock
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
            language="javascript"
        />
        <ArticleSectionTitle title="Servidores y Clientes"></ArticleSectionTitle>
        <Paragraph>
            En la web existen dos componentes principales: el cliente y el servidor.
            El cliente es el navegador utilizado por el usuario, mientras que el
            servidor almacena y entrega la información solicitada. Ambos se
            comunican mediante protocolos como HTTP y HTTPS.
        </Paragraph>
        <ArticleSectionTitle title="Bases de datos"></ArticleSectionTitle>
        <Paragraph>
            Las bases de datos permiten almacenar información de manera organizada.
            Sitios web modernos utilizan sistemas de bases de datos para guardar
            usuarios, productos, publicaciones y otros datos importantes. Algunas
            tecnologías comunes son MySQL, PostgreSQL y MongoDB.
        </Paragraph>
        <ArticleSectionTitle title="Frameworks y herramientas modernas"
        ></ArticleSectionTitle>
        <Paragraph>
            Actualmente existen frameworks que facilitan el desarrollo web, como
            React, Angular, Svelte y Vue para el frontend, y Node.js, Django o
            Laravel para el backend. Estas herramientas ayudan a crear aplicaciones
            más rápidas, escalables y fáciles de mantener.
        </Paragraph>
        <ArticleSectionTitle title="En Conclusión"
        ></ArticleSectionTitle>
        <Paragraph>
            Los fundamentos de las tecnologías web son esenciales para comprender
            cómo funciona Internet. HTML, CSS y JavaScript forman la base del
            desarrollo web, mientras que servidores, bases de datos y frameworks
            permiten construir aplicaciones modernas y eficientes.
        </Paragraph>
    </Paper>
</main>
