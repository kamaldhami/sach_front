import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';



let api = {

    user: {
        create: (data) => axios.post('web/user/register',data),
        login:(data) =>axios.post('web/user/login',data)
    }


}

export default api;