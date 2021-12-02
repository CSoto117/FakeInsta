import { useState, useEffect } from "react";
import Axios from '../../Services/ConfigAxios';
import { ToastContainer,toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function Update({props}){

    const [post, setPost] = useState([]);
    const [value, setValue] = useState({
        title:post.title,
        description:post.description,
        image:post.image
    });

    const {slug} = useParams();

    //GET DATA POST FOR UPDATE
    useEffect(()=>{
        Axios.get(`/post/one/${slug}`)
        .then(response =>{
            setPost(response.data);
        }).catch(bad =>{
            if(bad.response){
                toast(JSON.stringify(bad.response.data.error))
            }
        });
    },[value])

    //SEND UPDATE POST REQUEST
    const onSubmit = event => {

        Axios.put(`/post/update/${slug}`,value)
        .then(response => {
            toast(response.data.message);
        })
        .catch(bad => {
            if(bad.response){
                toast(JSON.stringify(bad.response.data.errors));
            }
        });

        event.preventDefault();
    };

    //VALIDATE SESION
    if(props && (localStorage.getItem('Role') === 'admin')){
    return (
        <form className="text-white flex flex-col justify-center items-center w-80 max-w-screen-sm mx-auto h-screen md:w-auto"
        onSubmit={onSubmit}>
      
            <ToastContainer />
            <div className="space-y-6">
                <h1>Crear Publicación</h1>
                <div className="flex flex-col space-y-2">
                    <label className="text-xl font-medium" htmlFor="titulo">Título:</label>
                    <input className="rounded-lg px-2 py-1 text-gray-800" name="title" id="titulo" type="text" placeholder="Ingrese un Título..." 
                    defaultValue={post.title} onChange={e => {setValue({ ...value, title:e.target.value  })}}/>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-xl font-medium" htmlFor="descripcion">Descripción:</label>
                    <textarea className="rounded-lg px-2 py-1 text-gray-800" name="description" id="descripcion" placeholder="Ingrese una Descripción..." 
                    defaultValue={post.description} onChange={e => {setValue({ ...value, description:e.target.value  })}}/>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-xl font-medium" htmlFor="urlImagen">URL de imagen:</label>
                    <input className="rounded-lg px-2 py-1 text-gray-800" name="image" id="urlImagen" type="url" placeholder="Ingrese una URL de imagen..." 
                    defaultValue={post.image} onChange={e => {setValue({ ...value, image:e.target.value  })}}/>
                </div>

                <div className="">
                    <button className="w-full bg-yellow-600 rounded-2xl shadow-xl py-2" type="submit">Ingresar</button>
                </div>

            </div>
      
        </form>
    )
    }return <h1>Por favor inicie sesión</h1>
}

export default Update;