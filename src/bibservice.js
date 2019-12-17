import Axios from "axios";

const url = 'http://localhost:5000/';

class BibService {
    static getBib(library) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await Axios.get(`${url}${library}`);
                const data = res.data;
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default BibService;