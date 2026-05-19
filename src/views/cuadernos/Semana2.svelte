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

<main class="max-w-7xl m-auto mt-12 px-4 pb-12">
    <Paper>
        <ArticleHeader title="Estándar Open Web Platform">
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
        <ArticleSectionTitle
            title="HTML"
            description="la estructura del contenido"
        ></ArticleSectionTitle>
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
        <ArticleSectionTitle title="CSS" description="Presentación visual"
        ></ArticleSectionTitle>
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
        <ArticleSectionTitle title="JavaScript" description="Interactividad"
        ></ArticleSectionTitle>
        <Paragraph>
            JavaScript es el lenguaje de programación principal de la web. Su
            función es añadir dinamismo e interactividad a los sitios y
            aplicaciones. Gracias a JavaScript, una página puede responder a
            acciones del usuario, actualizar contenido en tiempo real y
            comunicarse con servidores sin recargar completamente el sitio.
        </Paragraph>
        <Paragraph>
            La Open Web Platform integra numerosas APIs que trabajan junto con
            JavaScript. Algunas de las más importantes son:
        </Paragraph>
        <ul class="list-disc ml-8">
            <li>API de Geolocalización</li>
            <li>API de Almacenamiento Local</li>
            <li>API de Notificaciones</li>
            <li>API Canvas WebSockets WebRTC</li>
        </ul>

        <PostIt align="right" translateX={220} translateY={-100}>
            <p class="text-sm font-medium">Las APIs web piden permiso</p>
            <p class="text-xs mt-1 opacity-80">
                Geolocalización, notificaciones y cámara siempre requieren
                consentimiento del usuario por seguridad.
            </p>
        </PostIt>
        <ArticleSectionTitle title="Protocolos y comunicación en la web"
        ></ArticleSectionTitle>
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
        <PostIt align="left" translateX={200} translateY={20}>
            <p class="text-sm font-medium">HTTPS no es opcional hoy</p>
            <p class="text-xs mt-1 opacity-80">
                Cifrar la comunicación con HTTPS ya es un requisito mínimo
                para cualquier sitio profesional.
            </p>
        </PostIt>
        <Paragraph>Otros protocolos y formatos importantes incluyen:</Paragraph>
        <ul class="list-disc ml-8">
            <li>URI y URL para la identificación de recursos</li>
            <li>JSON y XML para intercambio de datos</li>
            <li>WebSocket para comunicación en tiempo real</li>
            <li>MIME Types para identificar tipos de archivos</li>
        </ul>
        <Paragraph>
            Gracias a estos estándares, diferentes sistemas y plataformas pueden
            comunicarse de manera uniforme.
        </Paragraph>
        <ArticleSectionTitle title="Compatibilidad y estándares abiertos"
        ></ArticleSectionTitle>
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

        <ArticleSectionTitle title="Importancia de la Open Web Platform"
        ></ArticleSectionTitle>
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
