<script>
    import ArticleHeader from "@components/article/ArticleHeader.svelte";
    import ArticleSectionTitle from "@components/article/ArticleSectionTitle.svelte";
    import Paragraph from "@components/article/Paragraph.svelte";
    import Paper from "@components/article/Paper.svelte";
    import blur1dark from "@assets/blur1dark.jpg";
    import blur1light from "@assets/blur1light.png";
    import ThemeImage from "@components/ThemeImage.svelte";
</script>

<main class="max-w-7xl m-auto mt-12 px-4 pb-12">
    <Paper>
        <ArticleHeader title="Librerías frontend">
            <div slot="before">
                <ThemeImage
                    lightSrc={blur1light}
                    darkSrc={blur1dark}
                    alt="Imagen de fondo"
                    className="w-full h-64 object-cover rounded-lg"
                />
            </div>
        </ArticleHeader>
        <Paragraph>
            Las librerías frontend son herramientas diseñadas para facilitar el
            desarrollo de interfaces web modernas. Estas tecnologías
            proporcionan componentes, estilos y utilidades que permiten crear
            sitios web de manera más rápida, organizada y adaptable. Entre las
            librerías más utilizadas actualmente destacan Bootstrap y Tailwind
            CSS, ambas enfocadas en el diseño responsive y la optimización del
            trabajo de los desarrolladores.
        </Paragraph>
        <Paragraph>
            El uso de estas librerías ha transformado la manera en que se
            construyen aplicaciones web, reduciendo el tiempo de desarrollo y
            mejorando la consistencia visual de los proyectos.
        </Paragraph>
        <ArticleSectionTitle
            title="Bootstrap"
            description="Desarrollo basado en componentes"
        ></ArticleSectionTitle>
        <Paragraph>
            Bootstrap es uno de los frameworks frontend más populares y
            utilizados en el desarrollo web. Fue creado por X Corp. con el
            objetivo de estandarizar interfaces y acelerar la creación de sitios
            web responsivos.
        </Paragraph>
        <Paragraph>Bootstrap ofrece una colección de componentes prediseñados como:</Paragraph>
        <ul class="list-disc ml-8">
            <li>Barras de navegación</li>
            <li>Botones</li>
            <li>Formularios</li>
            <li>Tarjetas</li>
            <li>Tablas</li>
            <li>Ventanas modales</li>
            <li>Carruseles</li>
        </ul>
        <Paragraph>
            Estos elementos permiten construir interfaces completas utilizando
            clases CSS ya definidas. Además, incorpora un sistema de rejilla
            (Grid System) basado en columnas que facilita la adaptación del
            contenido a diferentes tamaños de pantalla.
        </Paragraph>
        <Paragraph>
            Una de las principales ventajas de Bootstrap es su facilidad de
            aprendizaje. Los desarrolladores pueden implementar diseños
            funcionales rápidamente sin necesidad de escribir grandes cantidades
            de código CSS personalizado.
        </Paragraph>
        <Paragraph>
            Sin embargo, debido a que muchos proyectos utilizan los mismos
            estilos predeterminados, algunos sitios desarrollados con Bootstrap
            pueden presentar apariencias similares si no se personalizan
            adecuadamente.
        </Paragraph>
        <ArticleSectionTitle
            title="Tailwindcss"
            description="Enfoque Utility-First"
        ></ArticleSectionTitle>
        <Paragraph>
            Tailwind CSS es un framework moderno que adopta una filosofía
            diferente conocida como “Utility-First”. En lugar de proporcionar
            componentes completos prediseñados, Tailwind ofrece clases
            utilitarias pequeñas y reutilizables que permiten construir
            interfaces directamente desde el HTML.
        </Paragraph>
        <Paragraph>Por ejemplo, es posible controlar:</Paragraph>
        <ul class="list-disc ml-8">
            <li>Colores</li>
            <li>Márgenes</li>
            <li>Espaciados</li>
            <li>Tamaños</li>
            <li>Flexibilidad</li>
            <li>Tipografía</li>
            <li>Sombras</li>
            <li>Posicionamiento</li>
        </ul>
        <Paragraph>
            Todo esto mediante clases específicas aplicadas directamente a los
            elementos.
        </Paragraph>
        <Paragraph>
            Este enfoque brinda un alto nivel de personalización y evita la
            necesidad de escribir CSS extenso. Los desarrolladores pueden crear
            diseños únicos sin depender de estilos visuales predeterminados.
        </Paragraph>
        <Paragraph>
            Tailwind CSS también incluye soporte para diseño responsive, modo
            oscuro y configuraciones personalizadas mediante archivos de
            configuración. Gracias a ello, resulta especialmente útil para
            proyectos modernos y aplicaciones complejas.
        </Paragraph>
        <Paragraph>
            Aunque inicialmente puede parecer más difícil de leer debido a la
            cantidad de clases en el HTML, muchos desarrolladores consideran que
            mejora la velocidad de desarrollo y la mantenibilidad del proyecto.
        </Paragraph>
    </Paper>
</main>
