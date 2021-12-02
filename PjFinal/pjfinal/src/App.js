import { Component } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './ComponentsViews/Login';
import Home from './ComponentsViews/Home';
import Axios from './Services/ConfigAxios';
import Layout from './Navigation/Layout';
import Create from './ComponentsViews/Admin/Create';
import Owner from './ComponentsViews/Admin/OwnerPosts';
import Update from './ComponentsViews/Admin/Update';
import Close from './Navigation/Close';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount(){

    //VALIDATE SESSION REQUEST
    Axios.get('/auth/whoami')
    .then(response => { 
        this.setState({
            user: response.data.username,
            role: response.data.role
        });
    })
    .catch(bad => {
        this.setState({
            error: bad.message
        });
    });

  }

  render(){
    return (
      //ROUTES ASSIGMENT
      <BrowserRouter>
        <Routes>
           <Route element={<Layout props={this.state.user} />}>
              <Route path='/home' element={<Home user={this.state.user}/>} />
              <Route path='/create' element={<Create user={this.state.user} role={this.state.role}/>} />
              <Route path='/ownerPost' element={<Owner user={this.state.user} role={this.state.role}/>} />
              <Route path='/update/:slug' element={<Update props={this.state.user} role={this.state.role}/>} />
              <Route path='/close' element={<Close user={this.state.user}/>} />
            </Route>
          <Route path='/' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    );
}
}
