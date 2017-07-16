import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { Home, NotFound } from 'containers';
import getRoutesUtils from 'utils/routes';

// eslint-disable-next-line import/no-dynamic-require
if (typeof System.import === 'undefined') System.import = module => Promise.resolve(require(module));


// declaring existing routes(pages)
export default store => {
  const {
    injectReducerAndRender,
    permissionsComponent
  } = getRoutesUtils(store);

  /* Permissions */

  const isAuthenticated = UserAuthWrapper({
    authSelector: state => state.auth.user,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsAuthenticated',
    failureRedirectPath: '/login'
  });

  const isNotAuthenticated = UserAuthWrapper({
    authSelector: state => state.auth.user,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    predicate: user => !user,
    failureRedirectPath: '/',
    allowRedirectBack: false
  });


  return (
    <Route path="/"
      getComponent={() => injectReducerAndRender(
        { level: System.import('./redux/modules/level') },
        System.import('./containers/App/App')
      )}
    >
      {/* Home (main) route */}
      <IndexRoute component={Home} />

      {/* Routes requiring login */}
      {/*
        You can also protect a route like this:
        <Route path="protected-route" {...permissionsComponent(isAuthenticated)(Component)}>
      */}
      <Route {...permissionsComponent(isAuthenticated)()}>
        <Route path="loginSuccess" getComponent={() => System.import('./containers/LoginSuccess/LoginSuccess')} />
        <Route
          path="/trainings/translation/:lang"
          getComponent={() => injectReducerAndRender(
            { word: System.import('./redux/modules/words') },
            System.import('./containers/RightWord/RightWord')
          )}
        />
        <Route
          path="/trainings/cards/:lang"
          getComponent={() => injectReducerAndRender(
            { word: System.import('./redux/modules/words') },
            System.import('./containers/Cards/Cards')
          )}
        />
        <Route
          path="/trainings/crossword/:lang"
          getComponent={() => injectReducerAndRender(
            { word: System.import('./redux/modules/words') },
            System.import('./containers/Crossword/Crossword')
          )}
        />
      </Route>

      {/* Routes disallow login */}
      <Route {...permissionsComponent(isNotAuthenticated)()}>
        <Route path="register" getComponent={() => System.import('./containers/Register/Register')} />
      </Route>

      {/* Routes */}
      <Route path="login" getComponent={() => System.import('./containers/Login/Login')} />
      <Route path="trainings" getComponent={() => System.import('./containers/TrainingsList/TrainingsList')} />

      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
