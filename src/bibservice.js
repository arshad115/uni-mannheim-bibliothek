import Axios from "axios";

const url = 'api/';

class BibService {
    static getBib(library,startDate, endDate) {
        // console.log(library);
        return new Promise(async (resolve, reject) => {
            try {
                const res = await Axios.get(`${url}${library.apiName}`, {params:{
                    startDate:startDate.toISOString(),
                    endDate: endDate.toISOString()
                }});
                const data = res.data;
                resolve(                    
                    this.makeDataset(library,
                    data.map(bib => {

                        let current_datetime = new Date(bib.dateTime)
                        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()

                        return {
                                x: formatted_date,
                                y: bib.percentFull
                        }
                }
                
                )));
            } catch (error) {
                reject(error);
            }
        });
    }
    static makeDataset(library, chartData) {
        const dataset = { // one line graph
                label: library.friendlyName,
                data: chartData,
                borderColor: BibService.getRandomColor(),
              };
              return dataset;
      }
    static getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

export default BibService;