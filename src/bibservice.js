import Axios from "axios";

const url = 'api/';

class BibService {
    static getBib(library) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await Axios.get(`${url}${library}`);
                const data = res.data;
                resolve(                    
                    this.makeDataset(library,
                    data.map(bib => ({
                    t: new Date(bib.dateTime),
                    y: bib.percentFull
                }))));
            } catch (error) {
                reject(error);
            }
        });
    }
    static makeDataset(library, chartData) {
        const dataset = { // one line graph
                label: library,
                data: [chartData],
                backgroundColor: [
                  'rgba(54,73,93,.5)', // Blue
                  'rgba(54,73,93,.5)',
                  'rgba(54,73,93,.5)',
                  'rgba(54,73,93,.5)',
                  'rgba(54,73,93,.5)',
                  'rgba(54,73,93,.5)',
                  'rgba(54,73,93,.5)',
                  'rgba(54,73,93,.5)'
                ],
                borderColor: [
                  '#36495d',
                  '#36495d',
                  '#36495d',
                  '#36495d',
                  '#36495d',
                  '#36495d',
                  '#36495d',
                  '#36495d',
                ],
                borderWidth: 3
              };
              return dataset;
      }
}

export default BibService;