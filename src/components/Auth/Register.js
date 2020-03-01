import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false
    }
    isFormValid = () => {
        let errors = [];
        let error;
        if (this.isFormEmpty(this.state)) {
            error = { message: 'Fil in all fields' };
            this.setState({ errors: errors.concat(error) });
            return false
        } else if (!this.isPasswordValid(this.state)) {
            error = { message: 'Password is invalid' };
            this.setState({ errors: errors.concat(error) });
            return false;
        } else {
            return true;
        }
    }
    isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }
    isPasswordValid = ({ password, passwordConfirmation }) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true
        }
    }
    displayErrors = errors => errors.map((error, i) =>
        <p key={i}> {error.message}</p>
    )

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = event => {
        if (this.isFormValid()) {
            this.setState({ errors: [], loading: true })
            event.preventDefault();
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser);
                    this.setState({ loading: false });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ loading: false });
                    this.setState({ errors: this.state.errors.concat(err), loading: false })
                })
        }
    }
    handleInputError = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)
        )
            ? "error"
            : ""
    }

    render() {
        const { email, username, password, passwordConfirmation, errors, loading } = this.state;
        return (
            <Grid textAlign="center" verticalAlign='middle' className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register for Devchat
                   </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input
                                fluid name="username"
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                onChange={this.handleChange}
                                value={username}
                                type="text">
                            </Form.Input>

                            <Form.Input
                                fluid name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email Address"
                                onChange={this.handleChange}
                                value={email}
                                type="email"
                                className={this.handleInputError(errors, 'email')}
                            >
                            </Form.Input>

                            <Form.Input
                                fluid name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                onChange={this.handleChange}
                                value={password}
                                type="password"
                                className={this.handleInputError(errors, 'password')}
                                >
                            </Form.Input>

                            <Form.Input
                                fluid name="passwordConfirmation"
                                icon="repeat"
                                iconPosition="left"
                                placeholder="password confirmation"
                                onChange={this.handleChange}
                                value={passwordConfirmation}
                                type="password"
                                className={this.handleInputError(errors, 'password')}>
                            </Form.Input>

                            <Button disabled={loading} className={loading ? 'loading' : ''} color="orange" fluid size="large">
                                submit
                            </Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Already a user? <Link to="/Login">Login</Link> </Message>
                </Grid.Column>

            </Grid>
        )
    }
}
export default Register;