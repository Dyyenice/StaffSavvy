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
    changePassword(user) {
        return axios
            .post(API_URL + 'changePassword', {
                email: user.email,
                password: user.password
            });


    }
    insertToken(data, user) {
        return axios
            .post(API_URL + 'signupToCompany', {
                token: data.token,
                id: user.id
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
            companyToken: user.companyToken,
            user_type: 0
        });
    }
    registerCompany(user) {

        return axios.post(API_URL + 'signup', {
            name: user.name,
            email: user.email,
            password: user.password,
            user_type: 1
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