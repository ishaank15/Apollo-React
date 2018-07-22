import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../constants'
import { TextField, Button, Card } from '@shopify/polaris'

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
  }

  handleName = (value) => {
    this.setState({name: value});
  };

  handlePassword = (value) => {
    this.setState({password: value});
  };

  handleEmail = (value) => {
    this.setState({email: value});
  };

  render() {
    return (
      <Card  title={ this.state.login ? 'Login' : 'Sign Up' } sectioned>
        {/* <h4 className="mv3">{this.state.login ? 'Login' : 'Sign Up'}</h4> */}
        <div className="flex flex-column">
          {!this.state.login && (
            <TextField
              label="Name"
              value={this.state.name}
              onChange={this.handleName}
              placeholder="Your name"
            />
          )}
          <TextField
            label="Email"
            type="email"
            value={this.state.email}
            placeholder="Enter you email"
            onChange={this.handleEmail}
          />
          <TextField
            label="Password"
            type="password"
            value={this.state.password}
            placeholder="Enter you password"
            onChange={this.handlePassword}
          />
        </div>
          <Button primary submit={true} onClick={() => this._confirm()}>
            {this.state.login ? 'Login' : 'Create account'}
          </Button>

          <Button primary submit={true} onClick={() => this.setState({ login: !this.state.login })} >
            {this.state.login
              ? 'Need to create an account?'
              : 'Already have an account?'
            }
          </Button>
      </Card>
    )
  }

  _confirm = async () => {
    const { name, email, password } = this.state
    if (this.state.login) {
      const result = await this.props.loginMutation({
        variables: {
          email,
          password,
        },
      })
      const { token } = result.data.login
      this._saveUserData(token)
    } else {
      const result = await this.props.signupMutation({
        variables: {
          name,
          email,
          password,
        },
      })
      const { token } = result.data.signup
      this._saveUserData(token)
    }
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login;