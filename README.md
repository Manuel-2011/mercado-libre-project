# Proyecto Mercado Libre

Este proyecto consiste en una aplicación web **responsive** desarrollada con **Next.js** con la funcionalidad de buscar productos con la api de **mercado libre** y poder ver el detalle de cualquiera de ellos.

Principales carácteristicas de la aplicación:

1. Buscar productos con cualquier texto.

2. Listar los 4 productos más relevantes que hayan hecho match con la busqueda.

3. Si la busqueda arrojó distintas categorías para la busqueda, se podrá filtrar la busqueda por categoría haciendo click en alguna de ellas desde el breadcrumb.

4. Se podrá ver el detalle de un producto al hacer click en alguno de ellos.

[Aquí](https://mercado-libre-project.vercel.app/) puedes ver el proyecto funcionando.

## Correr la aplicación localmente

Para correr la aplicación de manera local debes tener **Node.js** y **npm** instalados localmente. Luego necesitas seguir los siguientes pasos:

1. Instalar las dependencias del proyecto:
   `npm install`

2. Correr la aplicación:
   `npm run dev`.
   La aplicación correrá en el puerto 3001, la aplicación podría correr en cualquier puerto pero solo en el 3001 correran correctamente los tests de integración.

## Verificar el correcto funcionamiento de la aplicación

Puedes correr los tests unitarios o los tests de integración para verificar el correcto funcionamiento de la app.

### Correr los tests unitarios

`npm run test`

### Correr los tests de integración o end to end

`npm run cypress`

## Consideraciones y arquitectura del proyecto

Teniendo en cuenta criterios de performance y escalabilidad, el proyecto hace uso de **React.js** para mejorar el performance de la app y reducir los tiempos de respuesta de la navegación dentro de la página (SPA). Adicionalmente, la aplicación se encuentra en su mayoría escrita con **TypeScript**, un superset de JavaScript para mejorar la detección de errores y así mejorar la escalibilidad del proyecto.

Por otro lado, la aplicación se construyó con el framework **NextJs** con el principal objetivo de facilitar el uso de la API de Server Side Rendering (**SSR**) de React, y con esto mejorar el performance de la aplicación en cuanto a **SEO** al permitir que la app sea facilmente leida por los search engines. También, se tuvo en cuenta los reportes de light House para mejorar los Core Web Vitals de la aplicación.

Para manejar los estilos se hizo uso de **CSS Modules** con el fin de aislar los estilos y de evitar colisiones en los nombres, y se hizo uso de **SASS** para poder usar variables en los estilos, y simplificar la escritura de los mismos.

Finalmente, para garantizar la correcta funcionalidad de la aplicación se hicieron uso de las librerías de **Jest**, **ReactTestingLibrary**, y **Cypress**. Las primeras dos con el fin de realizar pruebas unitarias a nivel de componentes, y la última para realizar end to end testing de cada funcionalidad y página de la app.
