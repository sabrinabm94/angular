# SearchForGif

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Structure
### 1. core/
O diretório core contém funcionalidades essenciais para a aplicação que são carregadas uma única vez e estão disponíveis em toda a aplicação.

- services/: Contém serviços que fornecem funcionalidades centrais, como gif.service.ts.

- components/: Contém componentes que são usados globalmente, como header e footer.

- core.module.ts: Um módulo dedicado a importar e fornecer esses serviços e componentes em toda a aplicação.

### 2. shared/
O diretório shared contém componentes e serviços que são reutilizáveis em diferentes partes da aplicação.

- components/: Componentes reutilizáveis, como button, picture, input, e form.

- shared.module.ts: Um módulo que agrupa esses componentes reutilizáveis e os exporta para que possam ser utilizados em outros módulos.

### 3. features/
O diretório features contém módulos específicos para cada funcionalidade ou seção da aplicação.

- gif-search/: Um exemplo de funcionalidade específica, contendo seus próprios componentes, templates e páginas.

- components/: Componentes específicos dessa funcionalidade.

- pages/: Páginas específicas dessa funcionalidade.

- gif-search.module.ts: O módulo que agrupa todos os componentes e páginas relacionados à funcionalidade de busca de GIFs.

### 4. data/
O diretório data contém modelos e interfaces que representam os dados usados na aplicação.

- models/: Interfaces e modelos de dados, como gif.ts e images.ts.

### 5. app-routing.module.ts
Arquivo de configuração das rotas da aplicação, definindo como navegar entre diferentes partes da aplicação.

### 6. app.component.*
Os arquivos principais do componente raiz da aplicação, incluindo o template, estilo e lógica do componente.

### 7. app.module.ts
O módulo raiz da aplicação que importa os módulos core, shared e os módulos de funcionalidades (features).
