import axios from 'axios';
import Constants from 'expo-constants';

const uri = Constants.expoConfig?.hostUri?.split(':')[0] ?? '192.168.88.35';

const api = axios.create({
    baseURL: 'https://plant-ly-ti54.onrender.com',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default api; 