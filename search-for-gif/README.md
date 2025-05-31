# Angular - Search for GIFs

Aplicação web construída com **Angular 18** para consumo de uma API REST de busca de GIFs.

### 🔑 Principais funcionalidades

* 🔍 Formulário de busca de GIFs com **Reactive Forms**
* 📄 Lista de resultados com paginação
* ⚡ Gerenciamento de estado com **Signals** (GIFs, número da página e termo de busca)
* ✅ Testes unitários com **Jasmine** com **cobertura de código acima de 90%**
* 📱 Layout responsivo com **Bootstrap**
* 🌍 Internacionalização (i18n) com **Transloco**
* 📚 Paginação com **ngx-pagination**
* 🌐 Requisições com **Promises**

📘 [Documentação Angular no Wiki](https://github.com/sabrinabm94/angular/wiki)

---

# 🌐 Aplicação Online

📍 [**search-gif-sabrinabm94.web.app**](https://search-gif-sabrinabm94.web.app)

---

# ⚙️ Executando o Projeto

### Ambiente de desenvolvimento

```bash
ng serve --open
```

### Executar testes

```bash
ng test --code-coverage
ng test
ng e2e
```

---

# 🚀 Build e Deploy

### Login no Firebase

```bash
firebase login
```

### Build para produção

```bash
ng build --configuration=production
firebase hosting:channel:deploy 1
```

### Deploy completo no Firebase

```bash
ng build
firebase deploy
```

### Renderização no servidor (SSR)

```bash
ng build --configuration production
ng run search-for-gif:server
```

---

# 📦 Gerenciamento de Dependências

## Atualizar dependências

```bash
npm outdated

npm install -g npm-check-updates
npx npm-check-updates -u

ng update @angular/core @angular/cli

rm -rf node_modules package-lock.json
npm install

npm audit fix
npm fund
```

## Instalar pacotes

```bash
npm install <dep>@latest
```

## Desinstalar pacotes

```bash
npm uninstall -g <dep>
npm uninstall --save-dev <dep>
npm cache clean --force
```

---

# 🛠️ Solução de Problemas

### Erros com dependências legadas

```bash
npm install --legacy-peer-deps
npm config set legacy-peer-deps true

rm -rf node_modules package-lock.json
npx npm-check-updates -u
npm install
```

### Política de execução no Windows

```bash
Get-ExecutionPolicy
Set-ExecutionPolicy RemoteSigned
Get-ExecutionPolicy
```

---

# 🗂️ Estrutura do Projeto

```bash
src/
  app/
    services/
      gif.service.ts
      gif.service.spec.ts
  data/
    models/
      gif.model.ts
  environments/
    environment.ts
    environment.prod.ts
```

---

# 👩‍💻 Contato

**Sabrina B.**
📧 [sabrinabm94@gmail.com](mailto:sabrinabm94@gmail.com)
🔗 [GitHub](https://github.com/sabrinabm94/about/blob/main/ABOUT-ME.md)
🔗 [Linkedin](https://www.linkedin.com/in/sabrinabm94/?locale=en_US)
