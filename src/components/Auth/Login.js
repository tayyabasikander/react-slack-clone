import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
class Login extends React.Component {
    state = {
        email: 't.s12@gmail.com',
        password: '123456',
        errors: [],
        loading: false,
    }


    displayErrors = errors => errors.map((error, i) =>
        <p key={i}> {error.message}</p>
    )

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true })
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(signedInUser=>{
                console.log(`Signed In User: `,signedInUser)
                this.setState({loading:false})
            })
            .catch(err=>{
                console.error(err);
                this.setState({
                    errors:this.state.errors.concat(err),loading:false
                })
            })
            

        }
    }
    isFormValid = ({email,password}) =>email && password

    handleInputError = (errors, inputName) => {

        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)
        )
            ? "error"
            : ""
    }

    render() {
        const { email, password, errors, loading } = this.state;
        return (
            <Grid textAlign="center" verticalAlign='middle' className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet" />
                        Login to Devchat
                   </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>

                            <Form.Input
                                fluid name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email Address"
                                onChange={this.handleChange}
                                value={email}
                                type="email"
                                className={this.handleInputError(errors, 'email')}
                            // className={"error"}
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

                            <Button
                                disabled={loading}
                                className={
                                    loading
                                        ? 'loading'
                                        : ''} color="violet"
                                fluid
                                size="large"
                            >
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
                    <Message> Don't have an account?<Link to="/Register">Register</Link> </Message>
                </Grid.Column>

            </Grid>
        )
    }
}
export default Login;