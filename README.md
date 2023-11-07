# Introduction

Welcome to "Behind my CV," thank you very much for showing interest in my work.

The main objective is to build a working environment that facilitates the maintenance and online visualization of my CV.

# Stack

- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/)
- [Webpack 5](https://webpack.js.org/)

# Resources

- [Google Font Icons](https://fonts.google.com/icons)

# Architecture

The Clean Architecture meta-architecture is applied with the following layers:

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

`Core` is a layer that provides functionalities to the other layers.

## UI Layer

Some considerations regarding the UI layer:

- All screens extend the Screen class.
- Scaffold is a Screen-type class that presents other Screen elements as a layout. It consists of:
  - Header
  - Sidebar
  - Content
  - Footer
- Decoupling between different Screen elements is achieved using the CommBus and MutableStateFlow/StateFlow classes:
  - MutableStateFlow/StateFlow: Uses the Observer pattern, allowing subscribers to receive notifications of value changes.
  - CommBus: Allows screens to register and obtain Flow, and also emit events.
- ScreenMap is used to store the relationship between the screen's name and the screen constructor to allow lazy loading/navigation between screens.
- ScreenManager is responsible for managing the lifecycle of screens by loading and unloading them.

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

High-level diagram:

```mermaid
sequenceDiagram
    actor You as :Diego Lanuara
    participant Main as :Main branch
    participant Feature as :Feature branch
    participant GitHubActions as :GitHub Actions
    participant GitHubPages as :GitHub Pages
    
    activate You
    activate Main
    You ->> Main: Create feature branch()
    Main -->> You: Branch created()
    deactivate Main
    
    activate Feature
    You ->> Feature: Push code to branch()
    Feature -->> You: Code pushed()
    
    activate Main
    You ->> Main: Merge with Main branch()
    Main -->> You: Merge completed()
    deactivate You
    deactivate Feature
    deactivate Main

    activate GitHubActions
    GitHubActions ->> Main: Build the solution()
    Main -->> GitHubActions: Build successful()
    
    activate GitHubPages
    GitHubActions ->> GitHubPages: Deploy the solution()
    GitHubPages -->> GitHubActions: Deployment successful()
    deactivate GitHubActions
    GitHubPages ->> GitHubPages: Serve the web page()
    deactivate GitHubPages
    
```

# TODO

- Add a dependency injector: Currently, the dependency containers are built in index.ts.
- Add unit tests with Jest.
