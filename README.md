# Angular

Scripts for testing javascript features and sintax, and apps.

[Documentations](https://github.com/sabrinabm94/angular/wiki)

# Deps

## Update deps
```js
npm outdated
npm install -g npm-check-updates
npx npm-check-updates -u
ng update @angular/core @angular/cli
//Remove node_modules folder and package-lock.json file
npm install
npm audit fix
npm fund
```

## Unistall deps
```js
npm uninstall -g dep
npm uninstall --save-dev dep
npm cache clean
```

## Install deps
```js
npm install dep@latest

```

## Fix errors
### legacy deps
```js
npm install --legacy-peer-deps
npm config set legacy-peer-deps true
//Remove node_modules folder and package-lock.json file
npx npm-check-updates -u
npm install
```

### Windows: alterar a política de execução para o escopo do padrão
```js
Get-ExecutionPolicy
Set-ExecutionPolicy RemoteSigned
//A
Get-ExecutionPolicy
```

## Tests
ng e2e

## Run
### Dev
ng serve --open

### Server
ng build --configuration production
ng run search-for-gif:server

# Contact

Sabrina B.
sabrinabm94@gmail.com
