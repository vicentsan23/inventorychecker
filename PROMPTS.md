# Registro de Prompts de IA y Evolución del Código

Este documento detalla los prompts utilizados con la Inteligencia Artificial Gemini para el desarrollo seguro, modular y óptimo de la Single Page Application **inventoryChecker**, cumpliendo con los criterios de evaluación exigidos.

---

## 📊 1. Diseño y Modularización de Componentes (Criterio 3.1.1)
**Prompt Inicial:**
> "Actúa como un arquitecto Frontend experto en React. Necesito estructurar una Single Page Application de Gestión de Bodega llamada 'inventoryChecker'. El diseño debe basarse en un menú superior de pestañas y una paleta corporativa elegante basada en verde petróleo oscuro (#1a434d). Genera la estructura base de componentes de forma modular para controlar qué pestaña se renderiza activamente usando useState y props."

**Mejoras de la IA aplicadas al código:**
* **Estructura Modular:** Separó la barra de navegación en un componente independiente (`Navbar.jsx`) para mantener el principio de responsabilidad única.
* **Control de Flujo Limpio:** Implementó un estado `activeTab` que se transmite mediante *props* y se evalúa a través de un condicional `switch` optimizado para renderizar las vistas sin recargar el navegador.

---

## 🔒 2. Desarrollo Seguro e Integridad en Formularios (Criterio 3.1.2)
**Prompt de Optimización de Seguridad:**
> "Optimiza el formulario de registro de artículos para aplicar buenas prácticas de desarrollo seguro. ¿Cómo puedo evitar inyecciones XSS, entradas maliciosas o desbordamientos en el estado al persistir datos en Local Storage?"

**Mejoras de la IA aplicadas al código:**
* **Sanitización Estricta:** Implementación de funciones `.trim()` para limpiar espacios en blanco maliciosos al inicio o final de las cadenas de texto.
* **Validación de Tipos y Límites:** Forzó el tipo de dato mediante `parseInt(value, 10)` en el stock y bloqueó números negativos o valores absurdamente altos (límite superior de seguridad en 10,000 unidades) para mitigar anomalías lógicas.
* **Limitación de Atributos:** Uso del atributo HTML `maxLength` en los campos para evitar la inyección masiva de buffers de texto en memoria.

---

## 💾 3. CRUD Completo y Resiliencia en Local Storage (Criterio 3.1.3)
**Prompt de Persistencia:**
> "Necesito implementar las operaciones CRUD completas vinculadas a Local Storage. Asegúrate de validar la integridad de los datos en caso de que el JSON almacenado localmente en el navegador esté corrupto o haya sido manipulado."

**Mejoras de la IA aplicadas al código:**
* **Bloques Try/Catch en Persistencia:** Al iniciar el estado de React, el acceso a `localStorage` se encapsuló en un bloque `try/catch`. Si el JSON está corrupto, la app no se cae ("pantallazo azul"), sino que limpia el error de consola y restablece un arreglo seguro vacío `[]`.
* **Sincronización Automática:** Integración de un `useEffect` atado a la dependencia del estado `products` que reescribe el almacenamiento local automáticamente ante cualquier cambio (creación, edición o borrado).

---

## 🔄 4. Consumo de API y Sincronización Inteligente (Criterio 3.1.4)
**Prompt de Consumo y UX Avanzada:**
> "Conecta la aplicación mediante Fetch a la API de jsonplaceholder para simular la importación de existencias iniciales de la bodega. Añade estados de carga (loaders) y alertas si la conexión falla. Además, haz que la sincronización sea inteligente: si el usuario ya creó productos manualmente, la API no debe borrarlos ni sobrescribirlos, sino fusionarse evitando duplicados."

**Mejoras de la IA aplicadas al código:**
* **Feedback de Usuario (UX):** Control estricto de un estado booleano `isLoading` para mostrar un componente spinner dinámico mientras se realiza la petición asíncrona.
* **Fusión de Datos No Destructiva:** En lugar de hacer un reemplazo directo, la IA recomendó usar una actualización funcional pasándole el estado anterior (`prevProducts => ...`). Mediante un filtrado con `.some()`, evalúa y añade únicamente los artículos cuyos IDs no colisionen con los ya existentes, cuidando la integridad operativa de la bodega.