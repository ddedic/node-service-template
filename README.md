# Node Service Template

Skeleton project written in Node.js, using ES6 with [babel](https://babeljs.io/), with:

- MongoDB
- Mongoose
- Express

## Commands

```
npm run build
```

Transpile source to `./build` folder and `watch` for changes made to source files.

```
npm start 
```

Start the server on port 3000

```
npm test
```

Run tests for project.
 
 
## Environment variables

Set these environment variables prior to starting server: 

- `PORT`: Port of the server, defaults to `3000`
- `DEBUG`: Log messages when set 


## Editor configuration and linting

Editor configuration is contained in .editorconfig file which helps developers define and maintain consistent coding styles between different editors and IDEs. See more information on [EditorConfig website](http://editorconfig.org/).

Linting is done via [eslint](http://eslint.org/) using Five's [JavaScript style guide](https://github.com/5minutes/javascript).


## Learn more

- [ECMAScript 6 features](https://github.com/lukehoban/es6features) ([pretty print](https://babeljs.io/docs/learn-es2015/))
- [Babel handbook](https://github.com/thejameskyle/babel-handbook)
