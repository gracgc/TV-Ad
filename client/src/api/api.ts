import axios, {AxiosResponse} from 'axios';
import cookie from "js-cookie"


let secretToken = cookie.get('secretToken');

let instance = axios.create({
    withCredentials: true,
    headers: {"Authorization": `Bearer ${secretToken}`},
    baseURL: '/api/'
});

// let checkKey = setInterval(() => {
//     if (cookie.get('secretToken')) {
//         clearInterval(checkKey)
//         secretToken = cookie.get('secretToken');
//         instance = axios.create({
//             withCredentials: true,
//             headers: {"Authorization": `Bearer ${secretToken}`},
//             baseURL: '/api/'
//         });
//     }
// }, 100)


export const adAPI = {
    getAd() {
        return instance.get(`comme`)
            .then((responce: AxiosResponse) => {
                return responce.data
            })
    },
    postAd(newAd: object) {
        return instance.post(`comme`, {newAd})
            .then((responce: AxiosResponse) => {
                return responce.data
            })
    },
    changeAd(changedAd: object) {
        return instance.put(`comme`, {changedAd})
            .then((responce: AxiosResponse) => {
                return responce.data
            })
    },
    pushAd(adLink: string, adTime: number, adSize: string, adPosition: string) {
        return instance.post(`comme/push`, {adLink, adTime, adSize, adPosition})
            .then((responce: AxiosResponse) => {
                return responce.data
            })
    },
    deleteAd(id: string) {
        return instance.put(`comme/delete`, {id})
            .then((responce: AxiosResponse) => {
                return responce.data
            })
    },
    clearAd() {
        return instance.post(`comme/clear`, {})
            .then((responce: AxiosResponse) => {
                return responce.data
            })
    },
};