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

# Contact

Sabrina B.
See my profile [here](https://github.com/sabrinabm94/about/blob/main/README.md)

<sabrinabm94@gmail.com>
