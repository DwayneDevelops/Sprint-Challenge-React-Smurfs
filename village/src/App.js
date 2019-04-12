import React, { Component } from 'react';
import  axios from 'axios';
import { NavLink, Route } from 'react-router-dom';


import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      smurf: {
        name: '',
        age: '',
        height: ''
      }
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
      this.setState({
        smurfs: res.data
      }); 
    })
    .catch(err => { 
        console.log(err)
    });
  }

  deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        this.setState({ smurfs: res.data });
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/smurf-form'>Add a Smurf</NavLink>
        
        <Route 
          path="/smurf-form"
          render={ props => <SmurfForm {...props} />}
        />
        <Route
          exact path="/"
          render={ props => <Smurfs {...props} 
          smurfs={this.state.smurfs}
          deleteSmurf={this.deleteSmurf} />}
        />
      </div>
    );
  }
}

export default App;
