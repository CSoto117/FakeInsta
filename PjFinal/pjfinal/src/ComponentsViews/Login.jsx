import { Component } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from '../Services/ConfigAxios';
import { Navigate } from 'react-router-dom';


export default class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      isLogged: false,
      username: '',
      password: ''
    }
  }

  handleSubmit=(e)=>{
    e.preventDefault();

    const data ={
      username: this.state.username,
      password: this.state.password,
    }
    
    Axios.post('/auth/signin',data)
    .then(response=>{ 
      //SAVE DATA START SESION
      localStorage.setItem('SecurityToken',response.data.token);
      localStorage.setItem('Role',response.data.role);
      
      this.setState({
        isLogged: true
      });

    })
    .catch(bad=>{
      if(bad.response){
        toast(JSON.stringify(bad.response.data.errors));
        toast(JSON.stringify(bad.response.data.error));
      }
    });

  }

  render() {
    //VALIDATE SESION FOR GO HOME DIRECTORY
    if(this.state.isLogged){
      return (<Navigate to="/home" replace={false} />)
    }
    return(
          <form className="text-white flex flex-col justify-center items-center
            w-80 max-w-screen-sm mx-auto h-screen md:w-auto" onSubmit={this.handleSubmit}>

            <ToastContainer />
            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                 <label className="text-xl font-medium" htmlFor="username">Usuario</label>
                 <input className="rounded-lg px-2 py-1 text-gray-800 " id="username" type="text" placeholder="Usuario" 
                 onChange={e=>this.setState({...this.state, username: e.target.value})}/>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-xl font-medium" htmlFor="password">Contraseña</label>
                <input className="rounded-lg px-2 py-1 text-gray-800" id="password" type="password" placeholder="******************" 
                onChange={e=>this.setState({...this.state, password: e.target.value})}/>
              </div>

              <div className="">
                <button className="w-full bg-yellow-600 rounded-2xl shadow-xl py-2" type="submit">Ingresar</button>
              </div>

            </div>

          </form>
    );
  };

}