import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                email: user.email,
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

    registerPersonnel(user) {

        return axios.post(API_URL + 'signup', {
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            date_of_birth: user.date_of_birth,
            identification: user.identification,
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
        });
    }
    
    
    async editProfile(user) {
        return axios.post(API_URL + 'editProfile', {
          email: user.email,
          name: user.name,
          surname: user.surname,
          phone: user.phone,
        }).then(response => {
          return response.data; 
        });
      }
}

export default new AuthService();