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
    <Paper sheet="06" revision="A">
        {#snippet title()}Eventos y Renderizado — Semana 06{/snippet}

        <ArticleHeader
            number="06.00"
            title="Eventos, condicionales y bucles en JavaScript"
            description="Eventos, Renderizado condicional / Renderizado iterativo, Formularios / Routing"
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

        <ArticleSectionTitle number="06.01" title="Eventos en JavaScript" description="Responder a las interacciones del usuario" />
        <Paragraph>
            Los eventos son acciones que ocurren en el navegador, como un clic,
            una pulsación de tecla, el envío de un formulario o el movimiento del
            ratón. JavaScript permite detectar estos eventos y ejecutar funciones
            en respuesta, lo que hace posible crear interfaces interactivas y
            dinámicas.
        </Paragraph>
        <Paragraph>
            El método addEventListener es la forma estándar de registrar eventos.
            Recibe el tipo de evento, una función callback y un objeto opcional
            de configuración. También es posible asignar eventos directamente
            mediante propiedades como onclick o onsubmit, pero addEventListener
            ofrece mayor flexibilidad al permitir múltiples manejadores sobre un
            mismo elemento.
        </Paragraph>
        <Paragraph>
            El objeto event se pasa automáticamente al manejador y contiene
            información útil como el tipo de evento, el elemento objetivo, la
            posición del ratón o la tecla presionada. Métodos como preventDefault
            evitan el comportamiento predeterminado del navegador, mientras que
            stopPropagation detiene la propagación del evento a elementos padres.
        </Paragraph>

        <ArticleSectionTitle number="06.02" title="Renderizado condicional" description="Mostrar contenido según condiciones" />
        <Paragraph>
            El renderizado condicional permite mostrar u ocultar partes de la
            interfaz según el estado de la aplicación. En React, se utiliza
            JavaScript directamente dentro del JSX: un if-else tradicional, el
            operador ternario o el operador && son las formas más comunes de
            lograr este comportamiento.
        </Paragraph>
        <Paragraph>
            El operador ternario es especialmente útil cuando se necesita elegir
            entre dos opciones: condicion ? componenteA : componenteB. El
            operador && se usa para renderizar algo solo si la condición es
            verdadera: condicion && &lt;Componente /&gt;. Para condiciones más
            complejas, se puede extraer la lógica a una función o variable antes
            del return.
        </Paragraph>
        <CodeBlock
            language="typescript"
            filename="PanelUsuario.tsx"
            code={`function PanelUsuario({ usuario, cargando }) {
    if (cargando) {
        return <p>Cargando...</p>;
    }

    if (!usuario) {
        return <p>Inicia sesión para continuar</p>;
    }

    return (
        <div>
            <h1>Bienvenido, {usuario.nombre}</h1>
            {usuario.rol === "admin" && (
                <button>Panel de administración</button>
            )}
            <p>
                {usuario.membresia
                    ? "Miembro Premium"
                    : "Miembro Gratuito"}
            </p>
        </div>
    );
}`}
        />
        <Paragraph>
            Este patrón es fundamental en aplicaciones modernas para mostrar
            estados de carga, mensajes de error, paneles de autenticación o
            cualquier contenido que dependa del estado de la aplicación.
        </Paragraph>

        <PostIt number="N.09" title="Ternario vs &&" align="right">
            <p><code>cond &amp;&amp; Comp</code> es conciso. El ternario es mejor cuando necesitás elegir entre dos opciones explícitas.</p>
        </PostIt>

        <ArticleSectionTitle number="06.03" title="Renderizado iterativo" description="Listas y colecciones" />
        <Paragraph>
            El renderizado iterativo permite generar elementos a partir de
            arreglos o colecciones de datos. En React, el método map es la
            herramienta principal para recorrer listas y devolver componentes
            por cada elemento. Cada elemento generado debe tener una prop key
            única que ayude a React a identificar cambios, inserciones o
            eliminaciones de forma eficiente.
        </Paragraph>
        <Paragraph>
            La key debe ser un identificador estable y único por elemento, como
            un ID. Usar el índice del arreglo como key puede causar problemas de
            rendimiento y errores en la interfaz cuando los elementos se
            reordenan o filtran. Un buen uso del renderizado iterativo permite
            construir listas, tablas, galerías y menús de forma dinámica y
            eficiente.
        </Paragraph>
        <CodeBlock
            language="typescript"
            filename="ListaTareas.tsx"
            code={`function ListaTareas({ tareas }) {
    return (
        <ul>
            {tareas.map(tarea => (
                <li key={tarea.id}>
                    <span>{tarea.titulo}</span>
                    <input
                        type="checkbox"
                        checked={tarea.completada}
                        readOnly
                    />
                </li>
            ))}
        </ul>
    );
}

const tareasIniciales = [
    { id: 1, titulo: "Aprender React", completada: true },
    { id: 2, titulo: "Crear un proyecto", completada: false },
    { id: 3, titulo: "Publicar en producción", completada: false },
];`}
        />

        <ArticleSectionTitle number="06.04" title="Formularios" description="Entrada de datos del usuario" />
        <Paragraph>
            Los formularios son el medio principal para que los usuarios
            introduzcan datos en una aplicación web. En React, los formularios
            pueden manejarse de dos formas: controlados y no controlados. Un
            componente controlado almacena el valor de cada campo en el estado y
            actualiza dicho estado con cada cambio, dando a React el control
            total sobre los datos del formulario.
        </Paragraph>
        <Paragraph>
            Los formularios controlados ofrecen ventajas como la validación en
            tiempo real, el formateo de entrada y la posibilidad de deshabilitar
            el botón de envío hasta que los datos sean válidos. El evento
            onSubmit se encarga de procesar los datos cuando el usuario envía
            el formulario, y preventDefault evita la recarga de la página.
        </Paragraph>
        <CodeBlock
            language="typescript"
            filename="FormularioContacto.tsx"
            code={`import { useState } from "react";

function FormularioContacto() {
    const [datos, setDatos] = useState({
        nombre: "", email: "", mensaje: ""
    });

    function handleChange(e) {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Datos enviados:", datos);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="nombre" value={datos.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
            />
            <input
                name="email" type="email" value={datos.email}
                onChange={handleChange}
                placeholder="Email" required
            />
            <textarea
                name="mensaje" value={datos.mensaje}
                onChange={handleChange}
                placeholder="Mensaje" required
            />
            <button type="submit">Enviar</button>
        </form>
    );
}`}
        />
        <Paragraph>
            Para formularios muy extensos, librerías como React Hook Form o
            Formik simplifican la gestión del estado, la validación y el manejo
            de errores, reduciendo la cantidad de código repetitivo.
        </Paragraph>

        <PostIt number="N.10" title="Control total vs simplicidad" align="left">
            <p>Formularios controlados = más código, pero control absoluto. Para forms simples, no necesitás una librería.</p>
        </PostIt>

        <ArticleSectionTitle number="06.05" title="Routing" description="Navegación entre vistas" />
        <Paragraph>
            El routing del lado del cliente permite navegar entre diferentes
            vistas de una aplicación sin recargar la página. En el ecosistema
            React, React Router es la librería más utilizada. Define rutas
            mediante componentes como &lt;BrowserRouter&gt;, &lt;Routes&gt; y
            &lt;Route&gt;, asociando cada ruta a un componente específico.
        </Paragraph>
        <Paragraph>
            React Router soporta rutas dinámicas con parámetros, rutas anidadas,
            redirecciones y navegación programática mediante el hook useNavigate.
            El componente &lt;Link&gt; genera enlaces accesibles y evita la
            recarga completa de la página. El enrutamiento del lado del cliente
            es esencial en las SPAs para proporcionar una experiencia fluida y
            mantener la URL sincronizada con el estado de la aplicación.
        </Paragraph>

        <ArticleSectionTitle number="06.06" title="En conclusión" />
        <Paragraph>
            Eventos, condicionales, bucles, formularios y routing son conceptos
            fundamentales en el desarrollo frontend moderno. Los eventos
            conectan la interfaz con las acciones del usuario, el renderizado
            condicional e iterativo permiten construir interfaces dinámicas
            basadas en datos, los formularios gestionan la entrada de
            información y el routing organiza la navegación de la aplicación.
            Dominar estos patrones es esencial para crear aplicaciones web
            interactivas, accesibles y bien estructuradas.
        </Paragraph>
    </Paper>
</main>

<style>
    .cuaderno :global(code) {
        font-family: var(--font-mono);
        font-size: 12px;
        background: var(--secondary-container);
        color: var(--ink);
        padding: 1px 6px;
        border: 1px solid var(--outline-variant);
    }
</style>

