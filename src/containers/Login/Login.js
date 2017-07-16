import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import LoginForm from 'components/LoginForm/LoginForm';
import FacebookLogin from 'components/FacebookLogin/FacebookLogin';
import { Row, Col } from 'react-materialize';
import * as authActions from 'redux/modules/auth';
import * as notifActions from 'redux/modules/notifs';

@connect(
  state => ({ user: state.auth.user }),
  { ...notifActions, ...authActions })
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    notifSend: PropTypes.func.isRequired
  }

  static defaultProps = {
    user: null
  }

  static contextTypes = {
    router: PropTypes.object
  }

  onFacebookLogin = (err, data) => {
    if (err) return;
    this.props.login('facebook', data, false)
      .then(this.successLogin)
      .catch(error => {
        if (error.message === 'Incomplete oauth registration') {
          this.context.router.push({
            pathname: '/register',
            state: { oauth: error.data }
          });
        }
      });
  };

  login = data => this.props.login('local', data).then(this.successLogin);

  successLogin = data => {
    this.props.notifSend({
      message: 'You\'r logged !',
      kind: 'success',
      dismissAfter: 2000
    });
    return data;
  };

  FacebookLoginButton = ({ facebookLogin }) =>
    <button className="btn btn-primary" onClick={facebookLogin}>
      Login with <i className="fa fa-facebook-f" />
    </button>;

  render() {
    const { user, logout } = this.props;
    return (
      <div className="container">
        <Helmet title="Sign in" />
        <h1>Sign in</h1>
        {!user && <div>
          <LoginForm onSubmit={this.login} />
          <Row>
            <Col s={6}>
              <FacebookLogin
                appId="635147529978862"
                /* autoLoad={true} */
                fields="name,email,picture"
                onLogin={this.onFacebookLogin}
                component={this.FacebookLoginButton}
              />
            </Col>
          </Row>
        </div>
        }
        {user && <div>
          <p>You are currently logged in as {user.email}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out" />{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
