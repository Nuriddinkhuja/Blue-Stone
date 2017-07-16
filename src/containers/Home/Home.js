import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import { CounterButton, GithubButton } from 'components';
import config from 'config';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

@connect(
  state => ({
    online: state.online
  })
)
export default class Home extends Component {

  static propTypes = {
    online: PropTypes.bool.isRequired
  };

  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img
                  src="https://t3.ftcdn.net/jpg/01/12/48/92/240_F_112489232_Q9uLytUKk5NCJdaS7mLHUFQYp4jO7PeN.jpg"
                  alt="presentation"
                />
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>

            <p className={styles.humility}>
              Created and maintained by{' @nuriddin'}
            </p>
            <p>
            Learning with Blue Stone is fun and addictive. Earn points for
             correct answers, race against the clock, and level up.
              Our bite-sized lessons are effective, and we have proof that it works.
          </p>
          </div>
        </div>
      </div>
    );
  }
}
