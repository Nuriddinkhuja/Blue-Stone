import React, { Component, PropTypes } from 'react';
// requiring library for getting api data
import { asyncConnect } from 'redux-connect';
// connecting for app global state
import { connect } from 'react-redux';
// import { browserHistory, Link } from 'react-router';
// import app from 'app';
// requiring library for setting SEO tags
import Helmet from 'react-helmet';
import { Row, Col, CollectionItem, Collection, Button } from 'react-materialize';
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

  getRandomWords = (words) => words.sort(() => 0.5 - Math.random());

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

  refresh = () => {
    this.props.incrementPoint(this.props.user);
    document.querySelectorAll('.wordCollection .collection-item')
      .forEach(item => {
        item.classList.remove('bad');
        item.classList.remove('active');
      });
    this.props.pushState('/trainings/translation/' + this.props.params.lang);
  }

  // telling what to show
  render() {
    // getting requested words using api
    const { words, params } = this.props;
    let current = {};
    let possible = [];
    if (words.length) {
      current = words[0];
      possible = this.getRandomWords(words);
    }

    return (
      <div className="container">
        {/* setting page title */}
        <Helmet title="Choose right word" />
        <h3 className="header">Choose right word</h3>
        {words.length && <Row>
          <Col s={6}>
            <h5>{current[params.lang]}</h5>
          </Col>
          <Col s={6} className="wordCollection">
            <Collection>
              {possible.map(item =>
                <CollectionItem
                  active={this.state.success === item.id}
                  key={item.id}
                  onClick={(event) => this.chooseWord(item, current, event)}
                >
                  {item[(params.lang === 'en' ? 'uz' : 'en')]}
                </CollectionItem>
              )}
            </Collection>
          </Col>
        </Row>}
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
