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
    <Paper sheet="05" revision="A">
        {#snippet title()}Frontend con React — Semana 05{/snippet}

        <ArticleHeader
            number="05.00"
            title="Desarrollo Frontend con JavaScript"
            description="El desarrollo frontend ha evolucionado de páginas estáticas a aplicaciones complejas impulsadas por JavaScript. Frameworks como React han transformado la forma en que se construyen interfaces, adoptando el Client-Side Rendering como modelo predominante."
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

        <ArticleSectionTitle number="05.01" title="Evolución del Frontend" description="De páginas estáticas a aplicaciones dinámicas" />
        <Paragraph>
            En sus inicios, la web se componía de páginas HTML estáticas. Cada
            interacción requería una recarga completa del servidor para obtener
            nuevo contenido. Con la llegada de AJAX y jQuery, los
            desarrolladores empezaron a actualizar partes de la página sin
            recargarla, mejorando la experiencia de usuario. Sin embargo,
            mantener aplicaciones complejas con este enfoque resultaba difícil y
            propenso a errores.
        </Paragraph>
        <Paragraph>
            La necesidad de estructurar mejor el código del lado del cliente dio
            origen a los frameworks modernos. Angular, React y Vue.js
            revolucionaron el desarrollo frontend al introducir conceptos como
            componentes, estado reactivo y enrutamiento del lado del cliente,
            sentando las bases de lo que hoy conocemos como Single Page
            Applications.
        </Paragraph>

        <ArticleSectionTitle number="05.02" title="Client-Side Rendering" description="Renderizado en el navegador" />
        <Paragraph>
            El Client-Side Rendering (CSR) es un enfoque donde el navegador
            recibe un HTML mínimo con un script de JavaScript que se encarga de
            construir y renderizar toda la interfaz. Una vez que el script se
            descarga y ejecuta, la aplicación se vuelve interactiva y las
            navegaciones posteriores ocurren instantáneamente, sin recargar la
            página.
        </Paragraph>
        <Paragraph>
            El flujo típico de CSR comienza con el servidor enviando un archivo
            HTML que contiene un contenedor raíz y un enlace al bundle de
            JavaScript. El navegador descarga el bundle, lo ejecuta y la
            aplicación renderiza el contenido. Luego, el enrutamiento del lado
            del cliente se encarga de mostrar diferentes vistas según la URL sin
            realizar nuevas peticiones al servidor.
        </Paragraph>
        <Paragraph>
            Esta arquitectura ofrece una experiencia fluida similar a la de una
            aplicación nativa, pero tiene como desventaja que el tiempo hasta la
            primera renderización puede ser más lento, especialmente en
            dispositivos con conexiones limitadas.
        </Paragraph>

        <ArticleSectionTitle number="05.03" title="React" description="La librería de interfaces más popular" />
        <Paragraph>
            React es una librería desarrollada por Meta para construir
            interfaces de usuario basadas en componentes. Su enfoque declarativo
            permite describir cómo debería verse la interfaz en cada estado, y
            React se encarga de actualizar el DOM de manera eficiente cuando los
            datos cambian. Esto simplifica enormemente el desarrollo de
            aplicaciones interactivas y dinámicas.
        </Paragraph>
        <Paragraph>
            A diferencia de un framework completo, React se centra únicamente en
            la capa de vista. Esto le da flexibilidad, ya que puede combinarse
            con otras librerías para enrutamiento, gestión de estado o
            peticiones HTTP según las necesidades del proyecto.
        </Paragraph>

        <ArticleSectionTitle number="05.04" title="Componentes y JSX" description="Construyendo interfaces modulares" />
        <Paragraph>
            En React, todo es un componente. Un componente es una función o
            clase que recibe propiedades (props) y devuelve elementos React que
            describen cómo debería renderizarse la interfaz. Los componentes
            pueden anidarse, reutilizarse y combinarse para construir
            aplicaciones complejas de forma modular y mantenible.
        </Paragraph>
        <Paragraph>
            JSX es una extensión de sintaxis que permite escribir código similar
            a HTML dentro de JavaScript. Aunque no es obligatorio, JSX es la
            forma más común de definir componentes en React, ya que hace que el
            código sea más legible y expresivo. El navegador no entiende JSX
            directamente, por lo que un transpilador como Babel lo convierte en
            llamadas a React.createElement.
        </Paragraph>

        <CodeBlock
            language="typescript"
            filename="TarjetaProducto.tsx"
            code={`import { useState } from "react";

function TarjetaProducto({ nombre, precio, imagen }) {
    const [carrito, setCarrito] = useState(0);

    return (
        <div className="tarjeta">
            <img src={imagen} alt={nombre} />
            <h3>{nombre}</h3>
            <p className="precio">\${precio.toFixed(2)}</p>
            <p>En carrito: {carrito}</p>
            <button onClick={() => setCarrito(carrito + 1)}>
                Agregar al carrito
            </button>
        </div>
    );
}

export default function App() {
    return (
        <div className="catalogo">
            <TarjetaProducto
                nombre="Camiseta"
                precio={19.99}
                imagen="/camiseta.jpg"
            />
            <TarjetaProducto
                nombre="Gorra"
                precio={12.50}
                imagen="/gorra.jpg"
            />
        </div>
    );
}`}
        />

        <PostIt number="N.07" title="JSX no es obligatorio" align="right">
            <p>Podés usar React sin JSX con React.createElement. Pero JSX hace que el código se lea como la interfaz que representa.</p>
        </PostIt>

        <ArticleSectionTitle number="05.05" title="Estado y Props" description="Datos que fluyen en la aplicación" />
        <Paragraph>
            Las props son datos que un componente padre pasa a un componente
            hijo. Son inmutables y permiten configurar y personalizar cada
            componente. El estado (state), en cambio, es información interna que
            un componente gestiona y que puede cambiar con el tiempo. Cuando el
            estado se actualiza, React vuelve a renderizar el componente y sus
            hijos para reflejar los nuevos datos.
        </Paragraph>
        <Paragraph>
            El flujo de datos en React es unidireccional: los datos viajan de
            padre a hijo mediante props. Para comunicar cambios de hijo a padre,
            se pasan funciones como props que el hijo puede invocar. Este flujo
            predecible facilita el razonamiento sobre el comportamiento de la
            aplicación y simplifica la depuración.
        </Paragraph>

        <ArticleSectionTitle number="05.06" title="El Virtual DOM" description="Optimización del renderizado" />
        <Paragraph>
            Una de las innovaciones clave de React es el Virtual DOM. En lugar
            de manipular el DOM del navegador directamente, React mantiene una
            copia ligera en memoria. Cuando el estado de un componente cambia,
            React crea un nuevo Virtual DOM, lo compara con la versión anterior
            mediante un proceso llamado reconciliación, y calcula el conjunto
            mínimo de cambios necesarios para actualizar el DOM real.
        </Paragraph>
        <Paragraph>
            Este enfoque evita operaciones costosas sobre el DOM y mejora el
            rendimiento, especialmente en aplicaciones con muchos cambios de
            estado. React agrupa múltiples actualizaciones y las aplica de forma
            eficiente, garantizando que la interfaz responda de manera rápida y
            consistente.
        </Paragraph>

        <ArticleSectionTitle number="05.07" title="Hooks" description="Funcionalidad en componentes funcionales" />
        <Paragraph>
            Los hooks son funciones que permiten usar estado y otras
            características de React en componentes funcionales. El hook
            useState permite declarar variables de estado dentro de una función.
            useEffect ejecuta efectos secundarios como peticiones HTTP,
            suscripciones o manipulación del DOM, y puede configurarse para
            ejecutarse solo cuando ciertas dependencias cambien.
        </Paragraph>
        <Paragraph>
            Otros hooks importantes incluyen useContext para acceder a contextos
            globales, useReducer para manejar estados complejos, useRef para
            referencias a elementos del DOM y useMemo para memorizar valores
            calculados. Los hooks han reemplazado en gran medida a los
            componentes de clase, ofreciendo una API más simple y composable.
        </Paragraph>

        <ArticleSectionTitle number="05.08" title="SPAs y Enrutamiento" description="Navegación sin recarga" />
        <Paragraph>
            Las Single Page Applications (SPAs) son aplicaciones que cargan una
            sola página HTML y actualizan dinámicamente el contenido según las
            interacciones del usuario. El enrutamiento del lado del cliente se
            encarga de mostrar diferentes componentes según la URL sin recargar
            el sitio. Librerías como React Router permiten definir rutas,
            parámetros URL y navegación programática de forma declarativa.
        </Paragraph>
        <Paragraph>
            Las SPAs ofrecen transiciones rápidas entre vistas y una experiencia
            más fluida, pero presentan desafíos como el SEO, ya que los motores
            de búsqueda pueden tener dificultades para indexar contenido
            generado dinámicamente. Para mitigar esto, existen técnicas como
            Server-Side Rendering (SSR) y Static Site Generation (SSG).
        </Paragraph>

        <ArticleSectionTitle number="05.09" title="CSR vs SSR vs SSG" description="Estrategias de renderizado" />
        <Paragraph>
            Cada estrategia de renderizado tiene sus ventajas. CSR ofrece una
            experiencia interactiva rápida después de la carga inicial, ideal
            para aplicaciones con mucha interacción del usuario. SSR genera el
            HTML en el servidor por cada petición, mejorando el SEO y el tiempo
            de carga inicial. SSG genera páginas estáticas en tiempo de
            construcción, combinando buen rendimiento con SEO óptimo.
        </Paragraph>
        <Paragraph>
            Frameworks como Next.js permiten combinar estos enfoques, usando SSR
            para páginas dinámicas y SSG para contenido estático, todo dentro
            del ecosistema React. Esto ofrece lo mejor de ambos mundos:
            rendimiento, SEO e interactividad.
        </Paragraph>

        <PostIt number="N.08" title="No hay estrategia correcta única" align="left">
            <p>CSR, SSR, SSG… cada proyecto necesita un enfoque distinto. Conocerlos te permite elegir bien.</p>
        </PostIt>

        <ArticleSectionTitle number="05.10" title="En conclusión" />
        <Paragraph>
            El desarrollo frontend con JavaScript ha madurado enormemente,
            pasando de simples scripts a aplicaciones complejas impulsadas por
            frameworks como React. El Client-Side Rendering permite crear
            experiencias ricas e interactivas, mientras que conceptos como
            componentes, Virtual DOM y hooks facilitan la construcción y el
            mantenimiento de aplicaciones escalables. La elección entre CSR, SSR
            o SSG depende de las necesidades específicas de cada proyecto, pero
            dominar React y sus fundamentos es hoy una habilidad esencial para
            cualquier desarrollador frontend.
        </Paragraph>
    </Paper>
</main>


