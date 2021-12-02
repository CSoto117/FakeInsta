import { Component } from 'react';
import Axios from '../Services/ConfigAxios';
import { HeartIcon, AnnotationIcon } from '@heroicons/react/outline';
import { ToastContainer,toast } from 'react-toastify';

//FUNCTION SEND LIKE
function sendLike(val){
    Axios.patch(`/post/like/${val}`)
        .then(response =>{
            toast(response.data.message);
    });
}

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            post: []
        }
    }

    componentDidMount(){
        //GET ALL POST REQUEST
        Axios.get('/post/all', {
            params:{
                limit: 10,
                page: 0
            }
        })
        .then(response => { 
            //SAVE DATA
            this.setState({
                post: response.data.data
            });
        })
        .catch(bad => {
            this.setState({
                error: bad.message
            });
        });
    }

    render(){
        //VALIDATE SESION AND MAP DATA IN SCREEN
        if(this.props.user){
            return(
                <div className="mt-20 w-15 lg:-w-24 gap-6 h-full flex flex-col justify-around items-center">
                    <ToastContainer/>
                    {this.state.post.map(function(item,index){
                        return(
                            <div key={index} className="flex flex-col justify-center justify-items-center bg-white rounded-2xl w-1/2 text-black">
                                <div className="p-2 border-b-2">
                                    <h1 className="text-3xl text-center">{item.title}</h1>
                                </div>
                                <div className ="flex items-center justify-center justify-items-center">
                                    <img className="object-cover" src={item.image} alt="" />
                                 </div>
                                <div className="p-2 border-t-2">
                                    <h2 className="text-xs overflow-x-hidden">{item.description}</h2>
                                </div>
                                <div className="w-full border-t-2 grid grid-cols-2 divide-x">
                                    <div>
                                        <button className="p-2 w-full hover:bg-gray-200 rounded-bl-2xl" onClick={() => sendLike(item._id)} >
                                            Me Gusta <span><HeartIcon className="mr-0.5 w-8 h-8 mx-0 inline-block align-middle"/></span>
                                        </button>
                                    </div>
                                    <div>
                                        <button className="p-2 w-full h-full hover:bg-gray-200 rounded-br-2xl" >
                                            Comentario <span><AnnotationIcon className="mr-0.5 w-8 h-8 mx-0 inline-block align-middle"/></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );

        }
        return <h1>Por favor Iniciar Sesión para acceder. </h1>

    };
}