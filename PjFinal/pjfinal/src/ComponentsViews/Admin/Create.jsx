import { Component } from "react";
import Axios from '../../Services/ConfigAxios';
import { ToastContainer,toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

export default class Create extends Component {
      
    constructor(props){
        super(props);
        this.state = {
            isSuccesfull: false,
            title: '',
            description: '',
            image: '',
            returnMessage: ''
        }
    }
      
        handleSubmit = (e) => {
          e.preventDefault();
      
          //DATA REQUEST FOR CREATE POST
          const data = {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image,
          }
          
          //SEND REQUEST FOR CREATE POST
          Axios.post('/post/create',data)
          .then(response => { 
      
            this.setState({
              isSuccesfull: true,
              returnMessage: response.data.message
            });
      
          })
          .catch(bad => {
            if(bad.response){
              toast(JSON.stringify(bad.response.data.errors));
            }
          });
      
        }
      
        render() {
          //VALIDATE SESSION
          if(this.props.user && (this.props.role === 'admin')){
            if(this.state.isSuccesfull){
              return (<Navigate to="/home" replace={false} />)
            }
          return(
                <form className="text-white flex flex-col justify-center items-center
                  w-80 max-w-screen-sm mx-auto h-screen md:w-auto" onSubmit={this.handleSubmit}>
      
                  <ToastContainer />
                  <div className="space-y-6">
                    <h1>Crear Publicación</h1>
                    <div className="flex flex-col space-y-2">
                    <label className="text-xl font-medium" htmlFor="titulo">Título:</label>
                    <input className="rounded-lg px-2 py-1 text-gray-800 " id="titulo" type="text" placeholder="Ingrese un Título..." 
                    onChange={e => this.setState({...this.state, title: e.target.value})}/>
                    </div>

                    <div className="flex flex-col space-y-2">
                    <label className="text-xl font-medium" htmlFor="descripcion">Descripción:</label>
                    <textarea className="rounded-lg px-2 py-1 text-gray-800" id="descripcion" placeholder="Ingrese una Descripción..." 
                    onChange={e => this.setState({...this.state, description: e.target.value})}/>
                    </div>

                    <div className="flex flex-col space-y-2">
                    <label className="text-xl font-medium" htmlFor="urlImagen">URL de imagen:</label>
                    <input className="rounded-lg px-2 py-1 text-gray-800" id="urlImagen" type="url" placeholder="Ingrese una URL de imagen..." 
                    onChange={e => this.setState({...this.state, image: e.target.value})}/>
                    </div>

                    <div className="">
                    <button className="w-full bg-yellow-600 rounded-2xl shadow-xl py-2" type="submit">Ingresar</button>
                    </div>

                    </div>
      
                </form>
          );
        }return <h1>Por favor inicie sesión</h1>
      };

}