# Ifashionmx

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **Este espacio de trabajo ha sido generado por [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

## Integrar con editores

Mejora tu experiencia con Nx instalando [Nx Console](https://nx.dev/nx-console) para tu editor favorito. Nx Console
proporciona una interfaz interactiva para ver tus proyectos, ejecutar tareas, generar código y más. Disponible para VSCode, IntelliJ y viene con un LSP para usuarios de Vim.

## Iniciar las aplicaciones

### Aplicación web (React)
Para iniciar la aplicación web, ejecuta el siguiente comando: `npx nx serve webapp`

### Servidor web (NestJS)
Para iniciar el servidor web, ejecuta el siguiente comando: `npx nx serve webserver`

## Construir para producción

### Aplicación web (React)
Ejecuta `npx nx build webapp` para construir la aplicación. Los artefactos de construcción se almacenan en el directorio de salida (por ejemplo, `dist/` o `build/`), listos para ser desplegados.

### Servidor web
Para construir el servidor web para producción, ejecuta el siguiente comando: `npx nx build webserver`

## Ejecutar tareas

Para ejecutar tareas con Nx, usa la siguiente sintaxis:

```
npx nx <target> <project> <...options>
```

También puedes ejecutar múltiples objetivos:

```
npx nx run-many -t <target1> <target2>
```

..o agregar `-p` para filtrar proyectos específicos

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Los objetivos pueden definirse en `package.json` o `projects.json`. Aprende más [en la documentación](https://nx.dev/features/run-tasks).

## ¡Configura CI!

Nx viene con caché local integrado (revisa tu `nx.json`). En CI, es posible que quieras ir un paso más allá.

- [Configura caché remoto](https://nx.dev/features/share-your-cache)
- [Configura la distribución de tareas en varias máquinas](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Aprende más sobre cómo configurar CI](https://nx.dev/recipes/ci)

## Explora el gráfico del proyecto

Ejecuta `npx nx graph` para mostrar el gráfico del espacio de trabajo.
Mostrará tareas que puedes ejecutar con Nx.

- [Aprende más sobre cómo explorar el gráfico del proyecto](https://nx.dev/core-features/explore-graph)

## ¡Conéctate con nosotros!

- [Únete a la comunidad](https://nx.dev/community)
- [Suscríbete al canal de Youtube de Nx](https://www.youtube.com/@nxdevtools)
- [Síguenos en Twitter](https://twitter.com/nxdevtools)