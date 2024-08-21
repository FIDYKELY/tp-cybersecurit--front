import axios from "axios";
import VueAxios from "vue-axios";

class ApiService {

    static vueInstance;

    static init(app) {
        ApiService.vueInstance = app;
        ApiService.vueInstance.use(VueAxios, axios);
        ApiService.vueInstance.axios.defaults.baseURL = "http://localhost:8000";
    }

    // constructor() {
    //     this.instanceAxios = axios.create({
    //         baseURL: "http://localhost:8000",
    //     });
    // }

    // setHeader(){
    //     this.instanceAxios.defaults.headers.common[
    //         "Authorization"
    //     ] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoibnRzb2FuZHJpYW5kYWh5QGdtYWlsLmNvbSIsImlhdCI6MTcwODUxMDM0OCwiZXhwIjoxNzQwMDQ2MzQ4fQ._NRWiaGQYH0eNhnr8IwyN2yBOzKELIcQX1NXibmYsk4";
    // }

    static setHeader() {
        ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoibnRzb2FuZHJpYW5kYWh5QGdtYWlsLmNvbSIsImlhdCI6MTcwODUxMDM0OCwiZXhwIjoxNzQwMDQ2MzQ4fQ._NRWiaGQYH0eNhnr8IwyN2yBOzKELIcQX1NXibmYsk4";
    }

    // get(endpoint, data = ""){
    //     this.setHeader();
    //     const params = data !== "" ? { data } : {};
    //     console.log("entrer dans get")
    //     return this.instanceAxios.get(endpoint, {params})
    //         .then(response => response.data)
    //         .catch(error => {
    //             console.error('Erreur dans get ', error);
    //         });
    // }

    static get(endpoint, data = "") {
        this.setHeader();
        const params = data !== "" ? { data } : {};
        return ApiService.vueInstance.axios.get(endpoint, {params}).catch((error) => {
          throw new Error('[LY] Erreur dans get', error);
        });
    }

    static delete(endpoint, data = "") {
        console.log("api data: "+data);
        this.setHeader();
        const params = data !== "" ? { data } : {};
        return ApiService.vueInstance.axios.post(endpoint, {params}).catch((error) => {
          throw new Error('[LY] Erreur dans post', error);
        });
    }

    static deleteWithData( endpoint, data ){
        // console.log("api data: "+data);
        this.setHeader();
        // const params = data !== "" ? { data } : {};
        return ApiService.vueInstance.axios.post(endpoint, data ).catch((error) => {
          throw new Error('[LY] Erreur dans post', error);
        });
    }

}

export default ApiService;