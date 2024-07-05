# Angular

Scripts for testing javascript features and sintax, and apps.

[Documentations](https://github.com/sabrinabm94/angular/wiki)

# Deps

## Update deps
```js
npm outdated
npm install -g npm-check-updates
npx npm-check-updates -u
//Remove node_modules folder and package-lock.json file
npm install
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
npm install -g dep
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

# Contact

Sabrina B.
sabrinabm94@gmail.com
