
[[_TOC_]]

# Introducción

Bienvenidos a "detrás de mi CV", muchas gracias por demostrar interés en mi trabajo.

El objetivo principal es construir un entorno de trabajo que facilite el mantenimiento y la visualización de mi CV de forma online.

# Stack

- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/)
- [Webpack 5](https://webpack.js.org/)
- [Google Font Icons](https://fonts.google.com/icons)

# Arquitectura

Se aplica la meta-arquitectura `Clean Architecture` con las siguientes capas:

```mermaid
flowchart TD
    subgraph Core
    end

    subgraph Data
        REPOI[Repository Impl]
    end

    subgraph Domain
        direction LR
        MO[Model]
        REPO[Repository]
        REPO --> MO
    end

    subgraph UI
        HEAD[Header]
        CONT[Contents]
        SIDE[Sidebar]
        FOOT[Footer]
        CO[Components]

        HEAD --> CO
        CONT --> CO
        SIDE --> CO
        FOOT --> CO
    end
    Data --> Domain
    UI --> Domain
    Data --> Core
    Domain --> Core
    UI --> Core
```

`Core` es una capa que provee funcionalidades al resto de las capas.

## UI Layer

Algunas consideraciones respecto a la capa de UI:

- Todas las pantallas extienden la clase `Screen`.
- `Scaffold` es una clase del tipo `Screen` presenta otros `Screen` como un layout. Se compone de:
  - Header
  - Sidebar
  - Content
  - Footer
- El desacople entre los distintos `Screen` se lográ utilizando las clases `CommBus` y `MutableStateFlow/StateFlow`:
  - `MutableStateFlow/StateFlow`: Utiliza el patrón `Observer` permitiendo a los suscriptores recibir notificaciones de cambios de valores.
  - `CommBus`: Permite a los `Screen` registrar y obtener `Flow`, y ademas emitir eventos.
- `ScreenMap` se utiliza para almacenar la relación nombre de `Screen`, constructor de `Screen` para permitir de forma `lazy` cargar/navegar entre `Screen`.
- `ScreenManager` se encarga de gestionar el ciclo de vida de `Screen` cargando y descargando los `Screen`.

### Screen Lifecycle

```mermaid
stateDiagram-v2
    CREATED
    ADDED: VISIBLE
    REMOVED: NO VISIBLE
    DISPOSED

    [*] --> CREATED: onCreated
    CREATED --> ADDED: onAdded
    ADDED --> REMOVED: onRemoved
    REMOVED --> ADDED: onAdded
    REMOVED --> DISPOSED: onDisposed
    DISPOSED --> [*]
```

# CI/CD

Gráfico de alto nivel:

```mermaid
sequenceDiagram
    actor You as :Diego Lanuara
    participant Main as :Main branch
    participant Feature as :Feature branch
    participant GitHubActions as :GitHub Actions
    participant GitHubPages as :GitHub Pages
    
    activate You
    activate Main
    You ->> Main: Crear branch de la funcionalidad()
    Main -->> You: Branch creado()
    deactivate Main
    
    activate Feature
    You ->> Feature: Subir código al branch()
    Feature -->> You: Código subido()
    
    activate Main
    You ->> Main: Merge con la rama Main()
    Main -->> You: Merge completado()
    deactivate You
    deactivate Feature
    deactivate Main

    activate GitHubActions
    GitHubActions ->> Main: Build de la solución()
    Main -->> GitHubActions: Build exitoso()
    
    activate GitHubPages
    GitHubActions ->> GitHubPages: Deploy de la solución()
    GitHubPages -->> GitHubActions: Deploy exitoso()
    deactivate GitHubActions
    GitHubPages ->> GitHubPages: Servir página web()
    deactivate GitHubPages
    
```

# TODO

- Agregar un inyector de dependencias: Actualmente los contenedores de dependencias son construidos en `index.ts`.
- Agregar test unitarios con `Jest`.
