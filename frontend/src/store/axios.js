import axios from 'axios';

const LOCAL_BASE_URI = 'http://54.169.100.43:8000/api';

const fetchClient = () => {
  const defaultOptions = {
    baseURL: LOCAL_BASE_URI,
    headers: {
      'content-type': 'application/json',
    },
  };
  let instance = axios.create(defaultOptions);
  // Set the AUTH token for any request
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default fetchClient();
