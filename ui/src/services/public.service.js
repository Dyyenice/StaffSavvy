import axios from 'axios';


const API_URL = 'http://localhost:3000/api/public/';

class PublicService {


    getJobPotsings() {
        return axios.get(API_URL + 'jobPostings');
    }
    getSelectedJobPosting(jobposting){
        return axios.get(API_URL + 'selectedJobPosting',{
            params:{
                id: jobposting.id
            }
        });
    }


}

export default new PublicService();