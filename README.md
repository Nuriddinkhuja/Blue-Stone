
# Blue Stone

This project is a clone of Lingualeo application.


## About

[Lingualeo](https://lingualeo.com) web apllication inspired me to create this project.
Therefore, I decided to create similar application as lingualeo for my Bachalor`s degree.
This project has three various task: Learning words by Cards, Crossword and selecting right word.
User has lavel and points. Difficulties of the words depend on the level of user. The more points user are scored, the more difficult words will be asked in tasks. 
In order to play crossword task user should purchase a pro account. For the payment system [Stripe](https://stripe.com/) online payment system was used.

## Used technologies
* Both client and server make calls to load data from separate API server
* [React](https://github.com/facebook/react)
* [React Router](https://github.com/reactjs/react-router)
* [Express](http://expressjs.com)
* [Feathers](http://feathersjs.com/)
* [Passport](http://passportjs.org), [feathers-authentication](https://github.com/feathersjs/feathers-authentication) and [redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper) for authentication
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](https://webpack.js.org/) for bundling
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [Redux](https://github.com/reactjs/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation
* [Redux Dev Tools](https://github.com/reactjs/redux-devtools) for next generation DX (developer experience). Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs).
* [React Router Redux](https://github.com/reactjs/react-router-redux) Redux/React Router bindings.
* [ESLint](http://eslint.org) to maintain a consistent code style
* [redux-form](http://redux-form.com/) to manage form state in Redux
* [style-loader](https://github.com/webpack/style-loader), [sass-loader](https://github.com/jtangelder/sass-loader) and [less-loader](https://github.com/webpack/less-loader) to allow import of stylesheets in plain css, sass and less,
* [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to allow require() work for statics both on client and server
* [Node Sequelize](http://docs.sequelizejs.com/) with PostgreSQL connection
* [Stripe](https://stripe.com/docs/api/node#authentication) online payment system

## Installation



```bash
git clone https://github.com/Nuriddinkhuja/Blue-Stone.git && cd bluestone
npm install
```

## Config PostgreSQL connection
Open api/index.js change connection settings to your own database
```javascript
  const sequelize = new Sequelize('postgres://postgres:sahovat@localhost:5432/bluestone', {
  ```

## Running Dev Server

```bash
npm run dev
```

## Building and Running Production Server

```bash
npm run build
npm run start
```

Created by:
– Nuriddinkhuja Zukhirkhujaev, [@Nuriddinkhuja](https://github.com/Nuriddinkhuja/)
