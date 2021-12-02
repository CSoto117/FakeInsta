import Axios from 'axios';

const path = Axios.create({baseURL: 'https://posts-pw2021.herokuapp.com/api/v1'});
path.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('SecurityToken');
path.defaults.headers.post['Content-Type'] = 'application/json';

export default path