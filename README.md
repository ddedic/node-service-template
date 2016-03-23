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

## Before you go live
As this is only skeleton project, there are few things to change or implement before you start using it:
 
- Implement which subject types are valid in JWT token.
- Change default values in `config/` folder to reflect your service.

All these things are denoted in the code with `TODO: {PersonWhoPutTODO} -` so they should be easy to find, except the task to change default values, since they're all held in `config/` folder.

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

```
npm run lint
```

Check code style commit.
 
 
## Environment variables

Set these environment variables prior to starting server: 

- `PORT`: Port of the server. If not set, it defaults to `3000`
- `NODE_ENV` : Environment in which server is executed, ('development'|'production'). If not set, it defaults to 'development'.
- `DEBUG`: Name of debugging logger
- `AUTHENTICATION_REALM`: Authentication realm in which the JWT token should be valid

On _Windows_, environment variable is set with `set NODE_ENV=development`, while on Linux and OSX it's set with  `NODE_ENV=development`. To address this problem, we're using `cross-env` library in package.json, where environment
variables are set.


## Editor configuration and linting

Editor configuration is contained in .editorconfig file which helps developers define and maintain consistent coding styles between different editors and IDEs. See more information on [EditorConfig website](http://editorconfig.org/).

Linting is done via [eslint](http://eslint.org/) using Five's [JavaScript style guide](https://github.com/5minutes/javascript).

## Installing packages

Installing packages (either with --save or --save-dev) is locked to exact version with `.npmrc` file. Use `ncu` command to check which packages need to be updated and to update them. Run `npm test` to make sure everything is working after updating packages as it should.

## Learn more

- [ECMAScript 6 features](https://github.com/lukehoban/es6features) ([pretty print](https://babeljs.io/docs/learn-es2015/))
- [Babel handbook](https://github.com/thejameskyle/babel-handbook)
- [JWT](http://jwt.io/introduction/)
- [Passport](http://passportjs.org/docs) and [passport-http-bearer](https://github.com/jaredhanson/passport-http-bearer)
