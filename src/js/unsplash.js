import axios from 'axios';

export default {
    settings: {
        baseURL: "https://api.unsplash.com",
        accessKey: "ed5e91aa173e6d699f4209f656b07c050b1f6aea5a071cd770ba3900b07ba06b",
    },
    getPhotos(page = 1, per_page = 10) {
        return new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: this.settings.baseURL + "/photos?page=" + page + "&per_page=" + per_page,
                headers: {
                    "Authorization": "Client-ID " + this.settings.accessKey
                }
            }).then(response => {
                resolve(response);
            }).catch(e => {
                reject("Error loading photos, please try again later");
            });
        });
    }
}