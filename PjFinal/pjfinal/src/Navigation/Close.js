import { Navigate } from 'react-router-dom';

function Close(){

    localStorage.clear();

    return (<Navigate to="/" replace={false} />)

}

export default Close