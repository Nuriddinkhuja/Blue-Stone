import React, { Component, PropTypes } from 'react';
// requiring library for getting api data
import { asyncConnect } from 'redux-connect';
// connecting for app global state
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import app from 'app';
// requiring library for setting SEO tags
import Helmet from 'react-helmet';
import { Row, Col, Button, Input } from 'react-materialize';
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
    error: 0,
    paymentError: ''
  }

  getInputs = () => {
    const source = Array.from(this.props.words[0][(this.props.params.lang === 'en' ? 'uz' : 'en')]);
    const res = [];
    source.map((item, i) => {
      const val = {
        val: item,
        index: i
      };
      return res.push(val);
    });
    return res;
  }

  getButtons = () => {
    let source = Array.from(this.props.words[0][(this.props.params.lang === 'en' ? 'uz' : 'en')]);
    source = source.sort(() => 0.5 - Math.random());
    const res = [];
    source.map((item, i) => {
      const val = {
        val: item,
        index: i
      };
      return res.push(val);
    });
    return res;
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

  selectLetter = (event, letter) => {
    console.log(event.target);
    console.log(letter);
    // looking for next input field
    const currentLetter = document.querySelector('.letter-inputs .next');
    // looking for right input button
    const letterButton = currentLetter.parentElement.parentElement.querySelector('button');
    // getting translation
    const currentWord = this.props.words[0][(this.props.params.lang === 'en' ? 'uz' : 'en')];
    // getting clicked button
    const currentButton = event.target;
    // looking for next input
    const nextInput = currentLetter
        .parentElement
        .parentElement
        .nextElementSibling;
    // getting the index of current right letter
    const index =
      Array
      .prototype
      .indexOf
      .call(
        currentLetter.parentElement.parentElement.parentElement.childNodes,
        currentLetter.parentElement.parentElement
      );
    console.log(index);
    console.log(currentLetter);
    console.log(currentWord.substr(index, 1));

    // if chosen letter is equel to right word's index letter
    if (currentWord.substr(index, 1) === letter) {
      console.log('right');
      // hiding input field
      currentLetter.parentElement.classList.add('hide');
      // removing next assignment from chosen right letter
      currentLetter.classList.remove('next');
      // showing button of right letter
      letterButton.parentElement.classList.remove('hide');
      // setting letter text to button of right letter
      letterButton.innerHTML = letter;
      // hiding current clicked button
      currentButton.parentElement.classList.add('hide');
      // setting next input to searching by that in next clicking of letter
      if (nextInput) {
        nextInput
          .querySelector('input')
          .classList
          .add('next');
      }
      // if user set last right letter show "next" button
      if (index === (currentWord.length - 1)) {
        ReactDOM.findDOMNode(this.nextButton).classList.remove('hide');
      }
    } else { // if chosen wrong letter
      console.log('wrong');
      // showing error of clicked button
      currentButton.classList.add('bad');
      setTimeout(() => {
        currentButton.classList.remove('bad');
      }, 1000);
    }
  }

  refresh = () => {
    this.props.incrementPoint(this.props.user);
    ReactDOM.findDOMNode(this.nextButton).classList.add('hide');

    document.querySelectorAll('.letter-inputs button')
      .forEach((item, i) => {
        console.log(i);
        console.log(item);
        item.parentElement.classList.add('hide');
        item.parentElement.nextElementSibling.classList.remove('hide');
        if (i === 0) {
          item.parentElement.parentElement.querySelector('input').classList.add('next');
        } else {
          item.parentElement.parentElement.querySelector('input').classList.remove('next');
        }
      });
    document.querySelectorAll('.cross-letter-but')
      .forEach(item => {
        item.parentElement.classList.remove('hide');
      });
    this.props.pushState('/trainings/crossword/' + this.props.params.lang);
  }

  pay = (event) => {
    event.preventDefault();
    const chargeService = app.service('stripe/charges');
    console.log(this.cardNumber);
    console.log(ReactDOM.findDOMNode(this.cardNumber));
    const Charge = {
      amount: 2000,
      currency: 'usd',
      source: {
        number: ReactDOM.findDOMNode(this.cardNumber).querySelector('input').value,
        cvc: ReactDOM.findDOMNode(this.cardCvc).querySelector('input').value,
        exp_month: ReactDOM.findDOMNode(this.cardExpMonth).querySelector('input').value,
        exp_year: ReactDOM.findDOMNode(this.cardExpYear).querySelector('input').value
      }
    };
    console.log(Charge);
    chargeService.create(Charge).then(result => {
      console.log('Charge created', result);
      app.service('users').patch(this.props.user.id, { pro: true });
      this.props.pushState('/trainings/crossword/' + this.props.params.lang);
    }).catch(paymentError => {
      console.log('Error creating charge', paymentError);
      const state = this.state;
      paymentError = paymentError.message;
      this.setState({
        ...state,
        paymentError
      });
    });
  }

  // telling what to show
  render() {
    // getting requested words using api
    const { words, params, user } = this.props;
    const { paymentError } = this.state;
    let letters = [];
    let letterButtons = [];
    if (words.length) {
      console.log(words);
      letters = this.getInputs();
      letterButtons = this.getButtons();
    }

    let res = {};

    if (!user.pro) {
      res = (
        <div className="container">
          <h3 className="header">Pay for PRO account</h3>
          <form className="col s12" onSubmit={event => { this.pay(event); }}>
            <Row>
              <Input
                s={6}
                label="Card number"
                type="text"
                ref={cardNumber => { this.cardNumber = cardNumber; }}
                defaultValue="4242424242424242"
              />
            </Row>
            <Row>
              <Input
                s={3}
                label="CVC"
                type="text"
                ref={cardCvc => { this.cardCvc = cardCvc; }}
                defaultValue="123"
              />
            </Row>
            <Row>
              <Input
                s={2}
                label="Month"
                type="text"
                ref={cardExpMonth => { this.cardExpMonth = cardExpMonth; }}
                defaultValue="12"
              />
              <Input
                s={2}
                label="Year"
                type="text"
                ref={cardExpYear => { this.cardExpYear = cardExpYear; }}
                defaultValue="2018"
              />
            </Row>
            <Row>
              <Col s={6}>
                {paymentError && <p className="text-danger"><strong>{paymentError}</strong></p>}
              </Col>
            </Row>
            <Row>
              <Col s={6}>
                <Button waves="light" type="submit">
                  <i className="fa fa-sign-in" />{' '}Pay
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      );
    } else {
      res = (
        <div className="container">
          {/* setting page title */}
          <Helmet title="Type translation" />
          <h3 className="header">Type translation</h3>
          {words.length &&
            <Row>
              <Col s={12}>
                <Row>
                  <Col s={12}>
                    <h3 className="header">{words[0][params.lang]}</h3>
                  </Col>
                </Row>
                <Row className="letter-inputs">
                  {letters.map(item =>
                    <div key={item.index}>
                      <Col s={1} className="hide input-field">
                        <Button
                          waves="light"
                          className="right-let-but"
                        >
                        </Button>
                      </Col>
                      <Input
                        className={(item.index === 0 ? 'next' : '')}
                        readOnly
                        type="text"
                        s={1}
                      />
                    </div>
                  )}
                </Row>
                <Row>
                  {letterButtons.map(item =>
                    <Col s={1} key={item.index}>
                      <Button
                        waves="light"
                        className="cross-letter-but"
                        onClick={event => { this.selectLetter(event, item.val); }}
                      >
                        {item.val}
                      </Button>
                    </Col>
                  )}
                </Row>
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

    return res;
  }
}
