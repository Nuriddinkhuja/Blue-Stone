import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/lib/Alert';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout, userUpdate } from 'redux/modules/auth';
import {
  isLoaded as isLevelLoaded,
  load as loadLevel,
  addItem as addLevel,
  updatedItem as updateLevel,
  removedItem as removeLevel
} from 'redux/modules/level';
import { Notifs } from 'components';
import { push } from 'react-router-redux';
import config from 'config';
import app from 'app';
import { asyncConnect } from 'redux-connect';
import { Navbar, NavItem, Footer, Badge } from 'react-materialize';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    if (!isAuthLoaded(getState())) {
      return dispatch(loadAuth());
    }
  }
}, {
  promise: ({ store: { dispatch, getState } }) => {
    if (!isLevelLoaded(getState())) {
      return dispatch(loadLevel());
    }
  }
}])
@connect(
  state => ({
    notifs: state.notifs,
    user: state.auth.user
  }),
  { logout, pushState: push, addLevel, updateLevel, removeLevel, userUpdate })
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    user: PropTypes.object,
    notifs: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    removeLevel: PropTypes.func.isRequired,
    addLevel: PropTypes.func.isRequired,
    updateLevel: PropTypes.func.isRequired,
    userUpdate: PropTypes.func.isRequired
  };

  static defaultProps = {
    user: null
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    app.service('level').on('created', this.props.addLevel);
    app.service('level').on('updated', this.props.updateLevel);
    app.service('level').on('removed', this.props.removeLevel);
    app.service('users').on('patched', this.props.userUpdate);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      const redirect = this.props.router.location.query && this.props.router.location.query.redirect;
      this.props.pushState(redirect || '/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  goTo = (event, item) => {
    event.preventDefault();
    this.props.pushState(item);
  }

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const { user, notifs, children } = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <header>
          <Navbar
            brand="Blue Stone"
            right
            className="blue"
          >
            {user && <NavItem onClick={event => this.goTo(event, '/trainings')}>
              My trainings
            </NavItem>}
            {!user && <NavItem onClick={event => this.goTo(event, '/login')}>
              Sign in
            </NavItem>}
            {!user && <NavItem onClick={event => this.goTo(event, '/register')}>
              Sign up
            </NavItem>}
            {user && <NavItem onClick={this.handleLogout}>
              Logout
            </NavItem>}
            {user && <NavItem onClick={event => { event.preventDefault(); }}>
              <Badge newIcon data-badge-caption="points">{user.point}</Badge>
              {user.pro && <Badge newIcon data-badge-caption="PRO"></Badge>}
            </NavItem>}
          </Navbar>
        </header>
        <main>
          <div className="">
            {notifs.global && <div className="container">
              <Notifs
                className={styles.notifs}
                namespace="global"
                NotifComponent={props => <Alert bsStyle={props.kind}>{props.message}</Alert>}
              />
            </div>}

            {children}
          </div>
        </main>
        <Footer
          copyrights="&copy; 2017 Blue Stone"
          className="blue"
        >
          <h5 className="white-text">Blue Stone</h5>
          <p className="grey-text text-lighten-4">Made by <a>Nuriddinkhuja Zukhirkhujaev</a></p>
        </Footer>
      </div>
    );
  }
}
