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
    <Paper sheet="09" revision="A">
        {#snippet title()}Semana 09 — Tecnologías Web Backend{/snippet}

        <ArticleHeader
            number="09.00"
            title="Tecnologías Web Backend"
            description="El backend es la capa de una aplicación web que se ejecuta en el servidor, procesa peticiones, accede a bases de datos y genera respuestas. A diferencia del frontend, el usuario final nunca ve directamente el código del backend."
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

        <ArticleSectionTitle number="09.01" title="Introducción al Backend" description="¿Qué ocurre del lado del servidor?" />
        <Paragraph>
            Cuando un navegador solicita una página web, el servidor recibe la
            petición, la procesa y devuelve una respuesta. El backend es el
            conjunto de tecnologías que hacen posible este procesamiento:
            lenguajes de programación, frameworks, bases de datos y servidores
            web trabajan en conjunto para entregar contenido dinámico y
            personalizado.
        </Paragraph>
        <Paragraph>
            A diferencia del frontend, que se ejecuta en el navegador del
            cliente, el backend reside en el servidor. Esto permite ejecutar
            lógica de negocio, autenticar usuarios, interactuar con bases de
            datos y generar contenido HTML de forma dinámica antes de enviarlo
            al cliente. El backend también es responsable de la seguridad, el
            rendimiento y la escalabilidad de la aplicación.
        </Paragraph>
        <Paragraph>
            La arquitectura típica de una aplicación web sigue el modelo
            cliente-servidor. El cliente (navegador) envía una petición HTTP al
            servidor web, que la delega al lenguaje backend correspondiente.
            Este procesa la lógica, consulta la base de datos si es necesario y
            genera una respuesta —generalmente HTML, JSON o XML— que viaja de
            vuelta al cliente para ser renderizada.
        </Paragraph>

        <ArticleSectionTitle number="09.02" title="Java Server Pages (JSP)" description="Java en el servidor" />
        <Paragraph>
            Java Server Pages (JSP) es una tecnología de Java que permite crear
            páginas web dinámicas combinando HTML con código Java. Fue
            presentada por Sun Microsystems como alternativa a PHP y ASP, y
            forma parte del ecosistema Jakarta EE (antes Java EE). JSP permite
            a los desarrolladores insertar lógica Java directamente en el HTML
            mediante etiquetas especiales y expresiones.
        </Paragraph>

        <ArticleSectionTitle number="09.02.01" title="Arquitectura de JSP" />
        <Paragraph>
            Internamente, un archivo JSP se traduce a un servlet de Java. Cuando
            un cliente solicita una página JSP por primera vez, el servidor web
            (como Apache Tomcat) compila el archivo .jsp en un archivo .java
            (un servlet), luego lo compila a .class y lo ejecuta. El servlet
            generado escribe el HTML resultante en la respuesta, que el servidor
            envía de vuelta al navegador.
        </Paragraph>
        <Paragraph>
            Este proceso ocurre solo la primera vez o cuando el archivo JSP
            cambia. En peticiones subsecuentes, el servlet compilado se
            reutiliza, lo que mejora el rendimiento. La arquitectura JSP sigue
            el patrón MVC (Model-View-Controller), donde JSP actúa como la
            vista, los servlets como controladores y los JavaBeans como el
            modelo.
        </Paragraph>
        <Paragraph>
            JSP ofrece elementos como scriptlets (&lt;% %&gt;) para insertar
            código Java, expresiones (&lt;%= %&gt;) para imprimir valores,
            directivas (&lt;%@ %&gt;) para configurar la página y acciones
            estándar (&lt;jsp:useBean&gt;, &lt;jsp:include&gt;) para
            reutilizar componentes. Además, JSP soporta Expression Language
            (EL) y la librería JSTL para simplificar las plantillas.
        </Paragraph>

        <CodeBlock
            language="jsp"
            filename="saludo.jsp"
            code={`<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ page import="java.time.LocalDateTime" %>
<%@ page import="java.time.format.DateTimeFormatter" %>

<%
    String nombre = request.getParameter("nombre");
    if (nombre == null || nombre.isEmpty()) {
        nombre = "Mundo";
    }
    LocalDateTime ahora = LocalDateTime.now();
    String fecha = ahora.format(
        DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")
    );
%>

<!DOCTYPE html>
<html>
<head>
    <title>Saludo JSP</title>
</head>
<body>
    <h1>¡Hola, <%= nombre %>!</h1>
    <p>Hoy es <%= fecha %></p>
    <form method="GET">
        <label>Tu nombre:</label>
        <input type="text" name="nombre" />
        <button type="submit">Saludar</button>
    </form>
</body>
</html>`}
        />

        <PostIt number="N.10" title="JSP se compila a Servlet" align="right" variant="info">
            <p>Cuando Tomcat recibe una petición .jsp, genera un archivo .java (servlet), lo compila a .class y lo ejecuta. Este proceso solo ocurre una vez.</p>
        </PostIt>

        <ArticleSectionTitle number="09.03" title="PHP" description="El lenguaje del lado del servidor más usado" />
        <Paragraph>
            PHP (Hypertext Preprocessor) es un lenguaje de programación
            interpretado diseñado específicamente para el desarrollo web.
            Creado por Rasmus Lerdorf en 1994, PHP se ejecuta en el servidor y
            genera HTML dinámico que se envía al cliente. Es el lenguaje detrás
            de plataformas como WordPress, Facebook (en sus inicios) y
            Wikipedia, y alimenta aproximadamente al 75% de los sitios web con
            backend conocido.
        </Paragraph>

        <ArticleSectionTitle number="09.03.01" title="Arquitectura de PHP" />
        <Paragraph>
            A diferencia de JSP, PHP no requiere compilación previa. Cuando el
            servidor web (Apache, Nginx) recibe una petición para un archivo
            .php, el intérprete de PHP procesa el archivo, ejecuta el código
            incrustado en las etiquetas &lt;?php ?&gt; y genera la salida
            HTML. El resultado se envía al cliente como si fuera una página
            HTML estática.
        </Paragraph>
        <Paragraph>
            PHP puede ejecutarse como módulo del servidor web (mod_php en
            Apache) o mediante PHP-FPM (FastCGI Process Manager) para mejor
            rendimiento y separación de procesos. La arquitectura moderna de
            PHP sigue el patrón MVC a través de frameworks como Laravel,
            Symfony o CodeIgniter, que organizan el código en modelos, vistas
            y controladores.
        </Paragraph>
        <Paragraph>
            PHP ofrece integración nativa con prácticamente todos los motores de
            bases de datos (MySQL, PostgreSQL, SQLite, MongoDB), manejo de
            sesiones, subida de archivos y soporte para múltiples protocolos.
            Su curva de aprendizaje es baja, lo que lo convierte en una
            excelente puerta de entrada al desarrollo backend.
        </Paragraph>

        <CodeBlock
            language="php"
            filename="saludo.php"
            code={`<?php
    $nombre = $_GET['nombre'] ?? 'Mundo';
    $fecha = date('d/m/Y H:i');
?>

<!DOCTYPE html>
<html>
<head>
    <title>Saludo PHP</title>
</head>
<body>
    <h1>¡Hola, <?= htmlspecialchars($nombre) ?>!</h1>
    <p>Hoy es <?= $fecha ?></p>

    <form method="GET">
        <label>Tu nombre:</label>
        <input type="text" name="nombre" />
        <button type="submit">Saludar</button>
    </form>

    <h2>Lista de usuarios</h2>
    <ul>
        <?php
        $usuarios = ['Ana', 'Luis', 'María'];
        foreach ($usuarios as $usuario) {
            echo "<li>" . htmlspecialchars($usuario) . "</li>";
        }
        ?>
    </ul>
</body>
</html>`}
        />

        <PostIt number="N.11" title="PHP es interpretado, no compilado" align="left" variant="warning">
            <p>PHP se procesa en cada petición. Para producción se recomienda usar opcache para cachear el bytecode generado y mejorar el rendimiento.</p>
        </PostIt>

        <ArticleSectionTitle number="09.04" title="JSP vs PHP" description="Diferencias clave" />
        <Paragraph>
            Tanto JSP como PHP son tecnologías del lado del servidor, pero
            difieren en varios aspectos. JSP está basado en Java, requiere la
            máquina virtual de Java (JVM) y se compila a servlets. PHP es
            interpretado, no requiere compilación y se integra fácilmente con
            servidores web como Apache.
        </Paragraph>
        <Paragraph>
            JSP ofrece un tipado fuerte y estático gracias a Java, lo que
            facilita el mantenimiento en proyectos grandes. PHP tiene tipado
            dinámico y una sintaxis más flexible, lo que acelera el desarrollo
            pero puede generar errores difíciles de depurar. En cuanto a
            rendimiento, JSP suele ser más rápido en aplicaciones con muchas
            peticiones concurrentes gracias al modelo de hilos de Java,
            mientras que PHP con PHP-FPM ofrece buen rendimiento para la
            mayoría de casos de uso.
        </Paragraph>
        <Paragraph>
            La elección entre JSP y PHP depende del contexto del proyecto. PHP
            domina en hosting compartido, CMS y proyectos pequeños a medianos.
            JSP es preferido en aplicaciones empresariales que ya usan Java y
            requieren escalabilidad, seguridad y transaccionalidad.
        </Paragraph>

        <ArticleSectionTitle number="09.05" title="En conclusión" />
        <Paragraph>
            Las tecnologías backend son el motor invisible que impulsa la web
            moderna. JSP y PHP representan dos enfoques distintos pero
            igualmente válidos: Java Server Pages ofrece la solidez y
            escalabilidad del ecosistema Java, mientras que PHP proporciona
            simplicidad y flexibilidad para desarrollar rápidamente
            aplicaciones web dinámicas. Comprender cómo funcionan estas
            tecnologías y sus arquitecturas es fundamental para cualquier
            desarrollador que quiera construir aplicaciones web completas y
            robustas.
        </Paragraph>
    </Paper>
</main>
