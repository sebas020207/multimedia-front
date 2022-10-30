import axios from "axios";

const instance = axios.create({
  baseURL: "https://multimedia-back.herokuapp.com/",
});


const useAxios = () => {
  instance.interceptors.request.use((config) => {
    const refresh = localStorage.getItem('token');
    if(refresh !== null && refresh !== '' && refresh !== undefined){
      //config.withCredentials = true;
      config.headers.Authorization = `Bearer ${refresh}`;
      //config.headers.token = token;
    }
    return config;
  });

  return { 
    get: instance.get,
    post: instance.post,
    put: instance.put
  };
};

export default useAxios;
