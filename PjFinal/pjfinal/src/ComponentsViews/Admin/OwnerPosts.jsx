import { Component } from 'react';
import Axios from '../../Services/ConfigAxios';
import { HeartIcon, ArchiveIcon } from '@heroicons/react/outline';
import { Navigate, Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';

export default class OwnerPost extends Component {

    constructor(props){
        super(props);
        this.state = {
            post: [],
            isModify: false,
            id:''
        };
        this.hide = this.hide.bind(this);
    }

    //HID POST
    hide(val){
        Axios.patch(`/post/toggle/${val}`)
        .then(response =>{
            toast(response.data.message);
        });
    }

    //GET REQUEST FOR OBTAIN POST CREATEDS
    componentDidMount(){
        Axios.get('/post/owned', {
            params:{
                limit: 15,
                page: 0
            }
        })
        .then(response => { 
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
        //VALIDATE SESION
        if(this.state.isModify){
            return (<Navigate to="/update" props={this.state.id} replace={false} />)
        }
        if(this.props.user && (this.props.role === 'admin')){
            return(
                <div className="mt-20 w-15 lg:-w-24 gap-6 h-full flex flex-col justify-around items-center">
                    <ToastContainer/>
                    {this.state.post.map(function(item,index){
                        return(
                            <div key={index} className="flex flex-col justify-center justify-items-center bg-white rounded-2xl w-1/2 text-black">
                                <div className="p-2 border-b-2">
                                    <h1 className="text-3xl text-center">{item.title}</h1>
                                </div>
                                <div className="p-2 border-b-2">
                                    <h1 className="">Estado: {item.active ? "Visible" : "Oculto" }</h1>
                                </div>
                                <div className ="flex items-center justify-center justify-items-center">
                                    <img className="object-cover" src={item.image} alt="" />
                                 </div>
                                <div className="p-2 border-t-2">
                                    <h2 className="text-xs overflow-x-hidden">{item.description}</h2>
                                </div>
                                <div className="w-full border-t-2 grid grid-cols-2 divide-x">
                                    <div>
                                        <Link to={`/update/${item._id}`}>
                                            <button className="p-2 w-full hover:bg-gray-200 rounded-bl-2xl"> 
                                                Modificar <span><HeartIcon className="mr-0.5 w-8 h-8 mx-0 inline-block align-middle"/></span>
                                            </button>
                                        </Link>
                                    </div>
                                    <div>
                                        <button className="p-2 w-full h-full hover:bg-gray-200 rounded-br-2xl" onClick={() => this.hide(item._id)}>
                                            Ocultar <span><ArchiveIcon className="mr-0.5 w-8 h-8 mx-0 inline-block align-middle"/></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    },this)}
                </div>
            );

        }
        return <h1>Por favor Iniciar Sesión para acceder. </h1>

    };
}