import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { FormInput, FormButton, FormContainer, Separator, Background, FormLabel, FormInputGroup } from '../components/Form';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  
  handleUsername = (event) => {
    let inputUsername = event.target.value;
    this.setState({
      username: inputUsername
    });
  }
  
  handlePassword = (event) => {
    let inputPassword = event.target.value;
    this.setState({
      password: inputPassword
    });
  }

  handleLogin = (event) => {
    const { username, password } = this.state;
    event.preventDefault();
    const data = {
      username: username,
      password: password
    }
    if(username !== '' && password !== '') {
      const body = qs.stringify(data);
      axios.post('http://localhost:3001/login', body).then(res => {
        if(res.data.status === 200) {
          console.log(res.data.data);
          try {
            localStorage.setItem('data', JSON.stringify(res.data.data));
            this.props.history.push('/');
          } catch(error) {
            console.log(error);
          }
        } else {
          console.log('Failed!');
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }

  render() {
    return (
      <Background>
        <Separator />
        <FormContainer>
          <FormInputGroup>
            <FormInput name="username" handleChange={this.handleUsername} />
            <FormLabel htmlFor="username">Username</FormLabel>
          </FormInputGroup>
          <FormInputGroup>
            <FormInput name="password" type="password" handleChange={this.handlePassword} />
            <FormLabel htmlFor="password">Password</FormLabel>
          </FormInputGroup>
          <FormButton label="Login" handleClick={this.handleLogin} />
        </FormContainer>
      </Background>
    );
  }
}

export default Login;

