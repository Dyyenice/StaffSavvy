import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
<<<<<<< HEAD
                username: user.username,
=======
                email: user.email,
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

<<<<<<< HEAD
    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password
=======
    registerPersonnel(user) {

        return axios.post(API_URL + 'signup', {
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            password: user.password,
            user_type: 0
        });
    }
    registerCompany(user) {

        return axios.post(API_URL + 'signup', {
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            password: user.password,
            user_type: 0
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
        });
    }
}

export default new AuthService();