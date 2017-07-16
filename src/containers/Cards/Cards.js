import React, { Component, PropTypes } from 'react';
// requiring library for getting api data
import { asyncConnect } from 'redux-connect';
// connecting for app global state
import { connect } from 'react-redux';
// import { Link } from 'react-router';
// import app from 'app';
// requiring library for setting SEO tags
import Helmet from 'react-helmet';
import { Row, Col, Button, CardTitle, Card, Input } from 'react-materialize';
import ReactDOM from 'react-dom';
import { push } from 'react-router-redux';
// requiring our api calling state
import * as word from 'redux/modules/words';
import { incrementPoint } from 'redux/modules/auth';


@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    // loading data using api calling state
    dispatch(word.load(false, getState()));
  }
}])
@connect(
  state => ({
    words: state.word.words,
    user: state.auth.user
  }),
  { ...word, pushState: push, incrementPoint }
)
// declaring React component for our page of Right Word
export default class RightWord extends Component {

  static propTypes = {
    words: PropTypes.array.isRequired,
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    incrementPoint: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  static defaultProps = {
    words: []
  };

  state = {
    success: 0,
    error: 0
  }

  chooseWord = (item, current, event) => {
    const className = ReactDOM.findDOMNode(event.target).className;
    const element = ReactDOM.findDOMNode(event.target);
    if (item.en === current.en) {
      element.className = className.concat(' active');
      ReactDOM.findDOMNode(this.nextButton).classList.remove('hide');
    } else {
      element.className = className.concat(' bad');
    }
  }

  typing = (event) => {
    const val = event.target.value;
    if (val === this.props.words[0][(this.props.params.lang === 'en' ? 'uz' : 'en')]) {
      ReactDOM.findDOMNode(this.nextButton).classList.remove('hide');
    } else {
      ReactDOM.findDOMNode(this.nextButton).classList.add('hide');
    }
  }

  refresh = () => {
    this.props.incrementPoint(this.props.user);
    ReactDOM.findDOMNode(this.nextButton).classList.add('hide');
    ReactDOM.findDOMNode(this.text).childNodes[0].value = null;
    this.props.pushState('/trainings/cards/' + this.props.params.lang);
  }

  // telling what to show
  render() {
    // getting requested words using api
    const { words, params } = this.props;
    let current = {};
    if (words.length) {
      current = words[0];
    }

    return (
      <div className="container">
        {/* setting page title */}
        <Helmet title="Type translation" />
        <h3 className="header">Type translation</h3>
        {words.length &&
          <Row>
            <Col s={4} className="center-align">
              <Card
                header={<CardTitle
                  reveal
                  image={'https://placehold.it/150x150?text=' + current[params.lang]}
                  waves="light"
                />}
                className="hoverable"
                title={current[params.lang]}
                reveal={<h4>{current[(params.lang === 'en' ? 'uz' : 'en')]}</h4>}>
              </Card>
            </Col>
          </Row>}
        <Row>
          <Col s={4} className="center-align">
            <Input type="text" ref={text => { this.text = text; }} label="Type" onChange={this.typing} s={12} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              ref={nextButton => { this.nextButton = nextButton; }}
              waves="light"
              className="hide"
              onClick={this.refresh}
            >
              Next
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
