# Angular

Scripts for testing javascript features and sintax, and apps.

[Angular Documentation](https://github.com/sabrinabm94/angular/wiki)

# Dependencies

## Update

```bash
npm outdated

npm install -g npm-check-updates

npx npm-check-updates -u

ng update @angular/core @angular/cli

//Remove node_modules folder and package-lock.json file

npm install

npm audit fix

npm fund
```

## Unistall

```bash
npm uninstall -g dep

npm uninstall --save-dev dep

npm cache clean
```

## Install

```bash
npm install dep@latest
```

## Fix errors

### legacy dependecies errors

```bash
npm install --legacy-peer-deps

npm config set legacy-peer-deps true

//Remove node_modules folder and package-lock.json file

npx npm-check-updates -u

npm install
```

### Windows: alterar a política de execução para o escopo do padrão

```bash
Get-ExecutionPolicy
Set-ExecutionPolicy RemoteSigned
//A
Get-ExecutionPolicy
```

## Run tests

```bash
ng test --code-coverage

ng e2e
```

## Run

### Dev

```bash
ng serve --open
```

# Auth in Firebase

```bash
firebase login
```

## Build

```bash
ng build --configuration=production

firebase hosting:channel:deploy 1
```

## Deploy on Firebase server

```bash
ng build

firebase deploy
```

### Server

```bash
ng build --configuration production

ng run search-for-gif:server
```

--

## Contact

- More about me

[About me](https://github.com/sabrinabm94/about/blob/main/ABOUT.md)

- See my portfolio!

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://bit.ly/3Q7O3Z7)

- Connect with me!

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sabrinabm94/?locale=en_US)

---
