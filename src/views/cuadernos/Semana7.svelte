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
    <Paper sheet="07" revision="A">
        {#snippet title()}Hooks en Profundidad — Semana 07{/snippet}

        <ArticleHeader
            number="07.00"
            title="Uso de hooks"
            description="useState / useEffect / useContext / useRef / useReducer / useCallback / useMemo y Hooks Personalizados"
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

        <ArticleSectionTitle number="07.01" title="¿Qué son los hooks?" description="Funciones que conectan el estado a componentes funcionales" />
        <Paragraph>
            Los hooks son funciones introducidas en React 16.8 que permiten usar
            estado y otras características de React sin escribir clases. Con ellos,
            los componentes funcionales pasaron de ser estáticos a tener toda la
            potencia de los componentes de clase, de forma más simple y componible.
            Cada hook resuelve un problema específico y sigue reglas estrictas:
            solo deben llamarse en el nivel superior del componente y únicamente
            dentro de funciones de React.
        </Paragraph>

        <ArticleSectionTitle number="07.02" title="useState" description="Estado en componentes funcionales" />
        <Paragraph>
            useState es el hook más básico y fundamental. Declara una variable de
            estado que persiste entre renderizados y un actualizador que permite
            modificarla. Al llamar al actualizador, React vuelve a renderizar el
            componente con el nuevo valor, reflejando los cambios en la interfaz.
        </Paragraph>
        <CodeBlock
            language="typescript"
            filename="Contador.tsx"
            code={`import { useState } from 'react';

function Contador() {
    const [cuenta, setCuenta] = useState(0);

    return (
        <div>
            <p>Has hecho clic {cuenta} veces</p>
            <button onClick={() => setCuenta(cuenta + 1)}>
                Incrementar
            </button>
        </div>
    );
}`}
        />
        <Paragraph>
            El estado puede ser de cualquier tipo: números, strings, objetos o
            arreglos. Al actualizar objetos o arreglos, es importante crear una
            nueva referencia en lugar de mutar directamente, ya que React detecta
            cambios por identidad de referencia.
        </Paragraph>

        <ArticleSectionTitle number="07.03" title="useEffect" description="Efectos secundarios y ciclo de vida" />
        <Paragraph>
            useEffect ejecuta código después de que el componente se ha renderizado,
            permitiendo realizar efectos secundarios como peticiones HTTP,
            suscripciones o manipulación del DOM. Acepta una función callback y un
            arreglo de dependencias que controla cuándo debe ejecutarse de nuevo.
        </Paragraph>
        <CodeBlock
            language="typescript"
            filename="Usuario.tsx"
            code={`import { useState, useEffect } from 'react';

function Usuario({ usuarioId }) {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        async function obtenerUsuario() {
            setCargando(true);
            const res = await fetch(
                \`https://api.example.com/usuarios/\${usuarioId}\`
            );
            const json = await res.json();
            setDatos(json);
            setCargando(false);
        }
        obtenerUsuario();
    }, [usuarioId]);

    if (cargando) return <p>Cargando...</p>;
    return <h1>{datos.nombre}</h1>;
}`}
        />
        <Paragraph>
            El arreglo de dependencias es clave: si está vacío, el efecto se ejecuta
            solo una vez al montar el componente. Si incluye variables, se ejecuta
            cada vez que estas cambian. La función de limpieza (return dentro del
            efecto) permite cancelar suscripciones o temporizadores al desmontar
            el componente o antes de re-ejecutar el efecto.
        </Paragraph>

        <PostIt number="N.11" title="Dependencias: el dolor de cabeza" align="right" variant="warning">
            <p>Olvidar una dependencia en useEffect causa bugs silenciosos. El lint plugin react-hooks/exhaustive-deps es tu mejor aliado.</p>
        </PostIt>

        <ArticleSectionTitle number="07.04" title="useContext" description="Estado global sin prop drilling" />
        <Paragraph>
            useContext consume un contexto creado con createContext, evitando pasar
            props manualmente por cada nivel del árbol de componentes. Es la
            solución nativa de React para compartir datos globales como temas,
            autenticación o preferencias del usuario.
        </Paragraph>
        <CodeBlock
            language="typescript"
            filename="Tema.tsx"
            code={`import { createContext, useContext, useState } from 'react';

const TemaContexto = createContext();

function ProveedorTema({ children }) {
    const [tema, setTema] = useState('claro');
    return (
        <TemaContexto.Provider value={{ tema, setTema }}>
            {children}
        </TemaContexto.Provider>
    );
}

function BotonTema() {
    const { tema, setTema } = useContext(TemaContexto);
    return (
        <button onClick={() =>
            setTema(tema === 'claro' ? 'oscuro' : 'claro')
        }>
            Cambiar a modo {tema === 'claro' ? 'oscuro' : 'claro'}
        </button>
    );
}`}
        />

        <ArticleSectionTitle number="07.05" title="useRef" description="Referencias mutables y acceso al DOM" />
        <Paragraph>
            useRef crea un objeto mutable que persiste durante todo el ciclo de
            vida del componente. Su valor puede modificarse sin provocar
            re-renderizados. Es ideal para acceder directamente a elementos del
            DOM, almacenar valores anteriores o mantener referencias a
            temporizadores.
        </Paragraph>
        <CodeBlock
            language="typescript"
            filename="InputAutofoco.tsx"
            code={`import { useRef } from 'react';

function InputAutofoco() {
    const inputRef = useRef(null);

    function enfocar() {
        inputRef.current?.focus();
    }

    return (
        <>
            <input ref={inputRef} type="text" />
            <button onClick={enfocar}>Enfocar input</button>
        </>
    );
}`}
        />

        <ArticleSectionTitle number="07.06" title="useReducer" description="Estado complejo con lógica predecible" />
        <Paragraph>
            useReducer es una alternativa a useState cuando el estado tiene una
            estructura compleja o múltiples transiciones. Recibe un reducer (una
            función que toma el estado actual y una acción, y devuelve el nuevo
            estado) y un estado inicial. Es especialmente útil en formularios con
            muchos campos o lógica de estado condicional.
        </Paragraph>
        <CodeBlock
            language="typescript"
            filename="ContadorReducer.tsx"
            code={`import { useReducer } from 'react';

function reductor(estado, accion) {
    switch (accion.tipo) {
        case 'incrementar':
            return { cuenta: estado.cuenta + 1 };
        case 'decrementar':
            return { cuenta: estado.cuenta - 1 };
        case 'reiniciar':
            return { cuenta: 0 };
        default:
            return estado;
    }
}

function ContadorReducer() {
    const [estado, despachar] = useReducer(reductor, { cuenta: 0 });

    return (
        <>
            <p>Cuenta: {estado.cuenta}</p>
            <button onClick={() => despachar({ tipo: 'incrementar' })}>+</button>
            <button onClick={() => despachar({ tipo: 'decrementar' })}>-</button>
            <button onClick={() => despachar({ tipo: 'reiniciar' })}>Reiniciar</button>
        </>
    );
}`}
        />

        <ArticleSectionTitle number="07.07" title="useCallback y useMemo" description="Optimización del rendimiento" />
        <Paragraph>
            useCallback memoriza una función para que no se recree en cada
            renderizado a menos que sus dependencias cambien. useMemo memoriza
            el resultado de un cálculo costoso. Ambos son herramientas de
            optimización que deben usarse con criterio, solo cuando se identifiquen
            problemas de rendimiento reales.
        </Paragraph>
        <CodeBlock
            language="typescript"
            filename="Lista.tsx"
            code={`import { useState, useCallback, useMemo } from 'react';

function Lista({ items, filtro }) {
    const resultados = useMemo(() => {
        return items.filter(item =>
            item.nombre.toLowerCase().includes(filtro.toLowerCase())
        );
    }, [items, filtro]);

    const handleClick = useCallback((id) => {
        console.log('Elemento clickeado:', id);
    }, []);

    return (
        <ul>
            {resultados.map(item => (
                <li key={item.id} onClick={() => handleClick(item.id)}>
                    {item.nombre}
                </li>
            ))}
        </ul>
    );
}`}
        />
        <Paragraph>
            El uso excesivo de estos hooks puede empeorar el rendimiento en lugar
            de mejorarlo. useCallback y useMemo son útiles cuando las funciones o
            valores se pasan como props a componentes hijos memoizados con
            React.memo, o cuando el cálculo es verdaderamente costoso.
        </Paragraph>

        <PostIt number="N.12" title="Memoizar no es gratis" align="left">
            <p>useMemo y useCallback tienen su propio costo. Úsalos solo cuando haya un problema de rendimiento medible, no por precaución.</p>
        </PostIt>

        <ArticleSectionTitle number="07.08" title="Hooks personalizados" description="Tu propia lógica reutilizable" />
        <Paragraph>
            Los hooks personalizados permiten extraer lógica repetitiva en
            funciones reutilizables. Un custom hook es una función JavaScript que
            usa hooks de React y cuyo nombre comienza con "use". Puede combinar
            múltiples hooks nativos y devolver cualquier valor que el componente
            necesite.
        </Paragraph>
        <CodeBlock
            language="typescript"
            filename="useFetch.ts"
            code={`import { useState, useEffect } from 'react';

function useFetch(url) {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setCargando(true);
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error('Error en la petición');
                return res.json();
            })
            .then(setDatos)
            .catch(setError)
            .finally(() => setCargando(false));
    }, [url]);

    return { datos, cargando, error };
}

// Uso en un componente
function Perfil() {
    const { datos, cargando } = useFetch('/api/usuario');
    if (cargando) return <p>Cargando...</p>;
    return <h1>{datos.nombre}</h1>;
}`}
        />
        <Paragraph>
            Los hooks personalizados son una de las características más poderosas
            de React. Permiten abstraer patrones como formularios, autenticación,
            almacenamiento local, detección de clicks fuera de un elemento y
            cualquier otra lógica reutilizable, manteniendo los componentes
            limpios y enfocados en la interfaz.
        </Paragraph>

        <ArticleSectionTitle number="07.09" title="Reglas de los hooks" description="Buenas prácticas esenciales" />
        <Paragraph>
            Existen dos reglas fundamentales. La primera: los hooks solo deben
            llamarse en el nivel superior del componente, nunca dentro de
            condicionales, bucles o funciones anidadas, ya que React depende del
            orden de llamada para mantener el estado entre renderizados. La
            segunda: solo deben invocarse desde componentes funcionales de React
            o desde otros hooks personalizados.
        </Paragraph>
        <Paragraph>
            Para hacer cumplir estas reglas, existe el plugin eslint-plugin-react-hooks
            que detecta automáticamente violaciones y previene bugs difíciles de
            depurar. Seguir estas reglas garantiza que los hooks funcionen de
            manera predecible y consistente.
        </Paragraph>

        <ArticleSectionTitle number="07.10" title="En conclusión" />
        <Paragraph>
            Los hooks transformaron la forma de escribir componentes en React,
            haciendo el código más limpio, reutilizable y fácil de entender.
            Desde useState para estado simple hasta hooks personalizados para
            lógica compleja, cada hook tiene un propósito específico. Dominarlos
            es esencial para cualquier desarrollador React, y combinarlos
            correctamente permite construir aplicaciones robustas, eficientes y
            mantenibles.
        </Paragraph>
    </Paper>
</main>

<style>
    .cuaderno {
        max-width: 1280px;
        margin: 0 auto;
        padding: 40px 20px 80px;
    }
</style>

