import axios from 'axios';
import Constants from 'expo-constants';

// Obter o IP no Expo
const uri = Constants.expoConfig?.hostUri?.split(':')[0] ?? '192.168.88.35';
// Para debug
console.log('IP do servidor:', uri);

const api = axios.create({
    baseURL: `http://${uri}:3030`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Para debug
console.log('API URL:', api.defaults.baseURL);

export default api; 