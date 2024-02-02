# JS Declarative Modal

![license](https://img.shields.io/badge/license-MIT-0374b5?style=flat)
<p align="center">
  <img src="https://decl-modal-docs.vercel.app/img/overview.gif/">  
</p>

## Features
Es un modal declarativo donde al ejecutar un show, puedes mostrar una vista sin necesidad de montar un state de isVisible, ademas las show functions tienen un tipado estricto, y permiten una comunicacion bidireccional entre modal y cliente (Donde se ejecuto el show) permitiendo crear una infinita variedad de logicas genericas, para evitar que modales genericos absorvan logica de negocio especifica (Ej: modales de confirmacion). Como tambien esperar a que usuario tipee una input dentro del modal, sin necesidad de salir del contexto de ejecucion de una function local, ni tampoco montar un state especifico para esta respuesta.
<br/>Ademas la libreria solo expone su Core para tu montes tu propia UI, esto quiere decir que puedes montar tus propias animaciones, modales, tipos de modales, estilos, configuraciones, sin ninguna limitacion!

✅ Core contruido con JS Vanilla, adaptadores para multiples Frameworks o librerias (React, Next.js, Prox: Solid, Qwik, Svelte, PReact).<br/>
✅ SRR Soportado.<br/>
✅ Perfectamente tipado.<br/>
🚀 Ultra liviano, 0 dependencias, solamente APIs nativas (~2kb size).<br/>
🌟 Modales hiper genericos sin logica de negocio dentro.<br/>
🌟 Modales declarativos sin ningun tipo de estado (Si no se requiere).<br/>
🌟 Comunicacion bidireccional con modales.<br/>
🌟 Async/Await para respuestas del modal, sin salirte del contexto de la funcion.<br/>
💡 Headless contruye tu propia ui sin ningun tipo de limitacion, ni props extrañas y complicadas.<br/>
💡 Animaciones basicas incluidas, pero puedes animarlo tanto como gustes!<br/>
💡 Ultra versatil core, para construir modales, popups, tooltips, sidebars, menus, lo que imagines! <br/>

## Demo
https://decl-modal-nextjs-app-pages-router-example.vercel.app/

## Documentacion

https://decl-modal-docs.vercel.app/docs/overview

## Por que deberia utilizar estas libreria.
Esta libreria puede ser un reemplazo perfecto para ```react-toastify```, ```react-modal```, ```react-tooltip```. Ahorrando un enorme espacio en el bundle size, ademas ya no tienes por que aprender configuraciones, props, estilos especificos. Todo lo montas tu! Tus configuraciones, tus estilos, tus props! Que lo tengas que montar tu, no tiene por que ser complejo, ya que la siguiente seccion puedes simplemente copiar y copiar los contenedor de ejemplo y adaptarlos!