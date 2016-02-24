# Node Service Template

Skeleton project written in Node.js, using ES6 with [babel](https://babeljs.io/), with:

- MongoDB
- Mongoose
- Express

## Run service

*Development:*
```
npm install
npm run build:watch
npm run start:dev (in new tab)
```

*Production:*
```
npm install
npm run build
npm test
npm start
```

## Commands

```
npm run build
```

Transpile source to `./build` folder
 
```
npm run build:watch
```

Transpile source to `./build` folder and `watch` for changes made to source files.

```
npm start 
```

Start the server on production, `port 80`.

```
npm run start:dev 
```

Start the server on development with nodemon watching for file change to `./build` folder, `port 3000`.

```
npm test
```

Run tests for project.
 
 
## Environment variables

Set these environment variables prior to starting server: 

- `PORT`: Port of the server, defaults to `3000`
- `NODE_ENV` : Environment in which server is executed, ('dev'|undefined)
- `DEBUG`: Name of debugging logger


## Editor configuration and linting

Editor configuration is contained in .editorconfig file which helps developers define and maintain consistent coding styles between different editors and IDEs. See more information on [EditorConfig website](http://editorconfig.org/).

Linting is done via [eslint](http://eslint.org/) using Five's [JavaScript style guide](https://github.com/5minutes/javascript).


## Learn more

- [ECMAScript 6 features](https://github.com/lukehoban/es6features) ([pretty print](https://babeljs.io/docs/learn-es2015/))
- [Babel handbook](https://github.com/thejameskyle/babel-handbook)
