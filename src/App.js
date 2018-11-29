import React, { Component } from 'react';
import logo from './logo.svg';
import { capitalize } from 'lodash';
import  crypto from 'crypto';

let width = '100px';

const encrypt = (key, salt) => {
  const cipher = crypto.createCipher('aes-128-cbc', salt);
  let result = cipher.update(key, 'utf8', 'hex')
  result += cipher.final('hex');
  return result;
}

const decrypt = (cryptedMessage, salt) => {
  var cipher = crypto.createDecipher('aes-128-cbc', salt);
  var result = cipher.update(cryptedMessage, 'hex', 'utf8')
  result += cipher.final('utf8');
  return result;
}
const styles = {
  app: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    color: 'white',
  },
  tabsBar: {
    width: '100%',
    margin: 'auto',
  },
  button: {
    width: '50%',
    height: '50px',
    backgroundColor: '#333333',
    color: 'white',
    border: '1px solid hsl(0, 0%, 34%)',
    margin: 'auto'
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
    input: {
      height: '40px',
    },
    error: {
      color: '#bd0707',
    }
  }
};

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      key: '',
      salt: '',
      operation: 'encrypt',
      message: '',
      error: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.changeOperation = this.changeOperation.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleOperation(e) {
    const salt = this.state.salt;
    const key = this.state.key;
    this.setState({
      message: '',
      error: '',
    })

    try {
      this.setState({
        message: this.state.operation === 'encrypt' ? encrypt(key, salt) : decrypt(key, salt)
      })
    } catch(e) {
      this.setState({error: e.message });
    }
   
  }

  changeOperation(e) {
    this.setState({
      operation: e.target.name
    })
  }

  render() {
    const { operation } = this.state;
    const placeholderKey = operation === 'encrypt' ? "Enter message you want to encrypt" : "Enter encrypted message";
    const placeholderSalt = operation === 'encrypt' ? "Enter salt for encryption" : "Enter salt used for encryption"
    return (
      <div className="App" style={styles.app}>
       <div style={styles.tabsBar}>
         <button style={styles.button} onClick={this.changeOperation} name="encrypt"> Encrypt </button>
         <button style={styles.button} onClick={this.changeOperation} name="decrypt"> Decrypt </button>
       </div>
       <div style={styles.fields}>
        <h1 align="center">{capitalize(this.state.operation)}</h1>
         <input style={styles.fields.input} onChange={this.handleChange} placeholder={placeholderKey} name="key" value={this.state.key} />
         <input style={styles.fields.input} onChange={this.handleChange} placeholder={placeholderSalt} name="salt" value={this.state.salt} />
      </div>
      <button style={styles.button} onClick={this.handleOperation}>{capitalize(this.state.operation)}</button>
      {this.state.message && !this.state.error && (<p align='center'>Your encrypted key: {this.state.message
      } </p>)}
      {this.state.error && (<p align='center' style={styles.fields.error}>{capitalize(this.state.error)} </p>)}
      
      </div>
    );
  }
}

export default App;
