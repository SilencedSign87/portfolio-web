<script>
    import ArticleHeader from "@components/article/ArticleHeader.svelte";
    import ArticleSectionTitle from "@components/article/ArticleSectionTitle.svelte";
    import Paragraph from "@components/article/Paragraph.svelte";
    import Paper from "@components/article/Paper.svelte";
    import PostIt from "@components/PostIt.svelte";
    import blur1dark from "@assets/blur1dark.jpg";
    import blur1light from "@assets/blur1light.png";
    import ThemeImage from "@components/ThemeImage.svelte";
</script>

<main class="cuaderno">
    <Paper sheet="02" revision="A">
        {#snippet title()}Open Web Platform — Semana 02{/snippet}

        <ArticleHeader
            number="02.00"
            title="Estándar Open Web Platform"
            description="La Open Web Platform es el conjunto de estándares, tecnologías y protocolos abiertos que permiten el funcionamiento de la World Wide Web. Su principal objetivo es garantizar que los sitios y aplicaciones web sean accesibles, compatibles e interoperables entre diferentes navegadores y dispositivos."
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

        <Paragraph>
            La Open Web Platform es el conjunto de estándares, tecnologías y
            protocolos abiertos que permiten el funcionamiento de la World Wide
            Web. Su principal objetivo es garantizar que los sitios y
            aplicaciones web sean accesibles, compatibles e interoperables entre
            diferentes navegadores y dispositivos. Gracias a este modelo
            abierto, desarrolladores de todo el mundo pueden crear aplicaciones
            sin depender de plataformas propietarias.
        </Paragraph>
        <Paragraph>
            La Open Web Platform está basada en especificaciones desarrolladas
            por organizaciones como la World Wide Web Consortium y la WHATWG,
            las cuales definen reglas y estándares para mantener la estabilidad
            y evolución de la web moderna.
        </Paragraph>

        <ArticleSectionTitle number="02.01" title="HTML" description="La estructura del contenido" />
        <Paragraph>
            Uno de los pilares fundamentales de la Open Web Platform es HTML
            (HyperText Markup Language). Este lenguaje define la estructura y
            organización del contenido dentro de una página web. Mediante
            etiquetas y elementos semánticos, HTML permite representar textos,
            imágenes, videos, formularios y enlaces de manera ordenada. Con la
        </Paragraph>
        <Paragraph>
            evolución de HTML5, la plataforma web incorporó nuevas capacidades
            multimedia y APIs integradas que redujeron la dependencia de
            tecnologías externas. Elementos como &lt;video&gt;, &lt;audio&gt; y
            &lt;canvas&gt; permitieron crear experiencias interactivas
            directamente desde el navegador.
        </Paragraph>
        <Paragraph>
            Además, HTML semántico favorece la accesibilidad y el
            posicionamiento en motores de búsqueda, facilitando que los
            contenidos puedan ser interpretados correctamente tanto por usuarios
            como por sistemas automatizados.
        </Paragraph>

        <ArticleSectionTitle number="02.02" title="CSS" description="Presentación visual" />
        <Paragraph>
            CSS (Cascading Style Sheets) es el estándar encargado del diseño y
            la presentación visual de las páginas web. Gracias a CSS es posible
            separar el contenido de la apariencia, permitiendo modificar estilos
            sin alterar la estructura HTML.
        </Paragraph>
        <Paragraph>
            La Open Web Platform promueve el uso de CSS como herramienta para
            crear interfaces adaptables y responsivas. Tecnologías como Flexbox
            y CSS Grid permiten diseñar páginas capaces de ajustarse
            automáticamente a distintos tamaños de pantalla. CSS también incluye
            animaciones, transiciones y efectos visuales que mejoran la
            experiencia de usuario sin necesidad de software adicional. Esto
            contribuye a crear aplicaciones más ligeras, rápidas y compatibles
            entre navegadores.
        </Paragraph>

        <ArticleSectionTitle number="02.03" title="JavaScript" description="Interactividad" />
        <Paragraph>
            JavaScript es el lenguaje de programación principal de la web. Su
            función es añadir dinamismo e interactividad a los sitios y
            aplicaciones. Gracias a JavaScript, una página puede responder a
            acciones del usuario, actualizar contenido en tiempo real y
            comunicarse con servidores sin recargar completamente el sitio.
        </Paragraph>
        <Paragraph>La Open Web Platform integra numerosas APIs que trabajan junto con JavaScript. Algunas de las más importantes son:</Paragraph>
        <ul class="cuaderno__list">
            <li>API de Geolocalización</li>
            <li>API de Almacenamiento Local</li>
            <li>API de Notificaciones</li>
            <li>API Canvas, WebSockets, WebRTC</li>
        </ul>

        <PostIt number="N.02" title="Las APIs web piden permiso" align="right" variant="warning">
            <p>Geolocalización, notificaciones y cámara siempre requieren consentimiento del usuario por seguridad.</p>
        </PostIt>

        <ArticleSectionTitle number="02.04" title="Protocolos y comunicación en la web" />
        <Paragraph>
            La interoperabilidad de la Open Web Platform depende de protocolos
            de comunicación estandarizados. El más importante es HTTP (HyperText
            Transfer Protocol), encargado del intercambio de información entre
            navegadores y servidores.
        </Paragraph>
        <Paragraph>
            Actualmente, HTTPS se ha convertido en el estándar predominante
            debido a la incorporación de cifrado y mecanismos de seguridad
            mediante certificados digitales. Esto garantiza la privacidad y
            protección de los datos transmitidos.
        </Paragraph>

        <PostIt number="N.03" title="HTTPS no es opcional hoy" align="left" variant="warning">
            <p>Cifrar la comunicación con HTTPS ya es un requisito mínimo para cualquier sitio profesional.</p>
        </PostIt>

        <Paragraph>Otros protocolos y formatos importantes incluyen:</Paragraph>
        <ul class="cuaderno__list">
            <li>URI y URL para la identificación de recursos</li>
            <li>JSON y XML para intercambio de datos</li>
            <li>WebSocket para comunicación en tiempo real</li>
            <li>MIME Types para identificar tipos de archivos</li>
        </ul>
        <Paragraph>
            Gracias a estos estándares, diferentes sistemas y plataformas pueden
            comunicarse de manera uniforme.
        </Paragraph>

        <ArticleSectionTitle number="02.05" title="Compatibilidad y estándares abiertos" />
        <Paragraph>
            Uno de los principios esenciales de la Open Web Platform es la
            compatibilidad universal. Los estándares abiertos permiten que una
            aplicación web funcione en distintos sistemas operativos y
            navegadores sin modificaciones importantes.
        </Paragraph>
        <Paragraph>
            Esto evita la dependencia de tecnologías cerradas y fomenta un
            ecosistema más accesible y colaborativo. Navegadores como Google
            Chrome, Mozilla Firefox, Safari y Microsoft Edge implementan gran
            parte de estos estándares para asegurar compatibilidad entre
            plataformas.
        </Paragraph>
        <Paragraph>
            La existencia de especificaciones comunes facilita el trabajo de
            desarrolladores y mejora la experiencia de los usuarios finales.
        </Paragraph>

        <ArticleSectionTitle number="02.06" title="Importancia de la Open Web Platform" />
        <Paragraph>
            La Open Web Platform representa uno de los mayores avances
            tecnológicos en términos de acceso global a la información. Su
            naturaleza abierta permite innovación constante, desarrollo
            colaborativo y acceso libre a herramientas de creación digital.
        </Paragraph>
        <Paragraph>
            Actualmente, gran parte de las aplicaciones modernas funcionan sobre
            tecnologías web, incluyendo redes sociales, plataformas educativas,
            sistemas empresariales y servicios de entretenimiento. La evolución
            continua de los estándares garantiza que la web siga siendo una
            plataforma flexible, segura y accesible para millones de usuarios en
            todo el mundo.
        </Paragraph>
    </Paper>
</main>


