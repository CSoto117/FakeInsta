import { Link } from 'react-router-dom';

const Navbar = ({props}) => {
    if(localStorage.getItem('Role') === "admin"){    
        return (
            <nav className="fixed top-0 left-0 bg-white w-full shadow">
                <div className="md:container m-auto flex justify-between items-center text-gray-700">
                    <h1 className="pl-8 py-4 text-xl font-bold">Bienvenidos a FakeInsta</h1>
                    <ul className="hidden md:flex items-center pr-10 text-base font-semibold cursor-pointer">
                        <Link to={'/home'}>
                        <li className="hover:bg-gray-200 py-4 px-6">Inicio</li>
                        </Link>
                        <Link to={'/create'}>
                        <li className="hover:bg-gray-200 py-4 px-6">Crear</li>
                        </Link>
                        <Link to={'/ownerPost'}>
                        <li className="hover:bg-gray-200 py-4 px-6">Mis Publicaciones</li>
                        </Link>
                        <Link to={'/close'}>
                        <li className="hover:bg-gray-200 py-4 px-6">Cerrar Sesión</li>
                        </Link>
                    
                        <li className="hover:bg-gray-200 py-4 px-6 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">   
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
                            {props}
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
    return (
        <nav className="fixed top-0 left-0 bg-white w-full shadow">
            <div className="md:container m-auto flex justify-between items-center text-gray-700">
                <h1 className="pl-8 py-4 text-xl font-bold">Bienvenidos a FakeInsta</h1>
                <ul className="hidden md:flex items-center pr-10 text-base font-semibold cursor-pointer">
                    <Link to={'/home'}>
                        <li className="hover:bg-gray-200 py-4 px-6">Inicio</li>
                    </Link>
                    <Link to={'/close'}>
                    <li className="hover:bg-gray-200 py-4 px-6">Cerrar Sesión</li>
                    </Link>
                
                    <li className="hover:bg-gray-200 py-4 px-6 flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">   
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
                        {props}
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;