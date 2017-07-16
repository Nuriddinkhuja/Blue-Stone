import React, { Component } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import { Input, Button, Row, Col } from 'react-materialize';
import registerValidation from './registerValidation';

@reduxForm({
  form: 'register',
  validate: registerValidation
})
export default class RegisterForm extends Component {
  static propTypes = {
    ...propTypes
  }

  renderInput = ({ input, label, type, meta: { touched, error } }) => {
    let errorText;
    if (error && touched) {
      errorText = error;
    } else {
      errorText = '';
    }
    return <Input s={6} {...input} label={label} type={type} error={errorText} />;
  }

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <form className="col s12" onSubmit={handleSubmit}>
        <Row>
          <Field name="email" type="text" component={this.renderInput} label="Email" />
        </Row>
        <Row>
          <Field name="password" type="password" component={this.renderInput} label="Password" />
        </Row>
        <Row>
          <Field
            name="password_confirmation" type="password"
            component={this.renderInput} label="Password confirmation"
          />
        </Row>
        <Row>
          <Col s={6}>
            {error && <p className="text-danger"><strong>{error}</strong></p>}
          </Col>
        </Row>
        <Row>
          <Col s={6}>
            <Button type="submit">
              <i className="fa fa-sign-in" />{' '}Register
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}
