import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Row, Col, Card, Badge } from 'react-materialize';
import { Link } from 'react-router';

@connect(
  state => ({
    user: state.auth.user
  }))
export default class TrainingList extends Component {

  render() {
    return (
      <div className="container">
        <Helmet title="My trainings" />
        <h3 className="header">My trainings</h3>
        <Row>
          <Col s={6}>
            <Card
              className="blue-grey darken-1"
              textClassName="white-text"
              title="Word translation"
              actions={[<Link key="card-1" to="/trainings/translation/en">Begin</Link>]}
            >
              Choose right translation
            </Card>
          </Col>
          <Col s={6}>
            <Card
              className="blue-grey darken-1"
              textClassName="white-text"
              title="Translation word"
              actions={[<Link key="card-2" to="/trainings/translation/uz">Begin</Link>]}
            >
              Choose right translation
            </Card>
          </Col>
          <Col s={6}>
            <Card
              className="blue-grey darken-1"
              textClassName="white-text"
              title="Cards English"
              actions={[<Link key="card-3" to="/trainings/cards/en">Begin</Link>]}
            >
              Write right translation of word in card
            </Card>
          </Col>
          <Col s={6}>
            <Card
              className="blue-grey darken-1"
              textClassName="white-text"
              title="Cards Uzbek"
              actions={[<Link key="card-4" to="/trainings/cards/uz">Begin</Link>]}
            >
              Write right translation of word in card
            </Card>
          </Col>
          <Col s={6}>
            <Card
              className="blue-grey darken-1"
              textClassName="white-text"
              title="Crossword English"
              actions={[
                <Link key="card-5" to="/trainings/crossword/en">Begin</Link>,
                <Badge newIcon data-badge-caption="PRO"></Badge>
              ]}
            >
              Write word by letter
            </Card>
          </Col>
          <Col s={6}>
            <Card
              className="blue-grey darken-1"
              textClassName="white-text"
              title="Crossword Uzbek"
              actions={[
                <Link key="card-5" to="/trainings/crossword/uz">Begin</Link>,
                <Badge newIcon data-badge-caption="PRO"></Badge>
              ]}
            >
              Write word by letter
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

