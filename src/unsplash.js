import axios from 'axios';

export default {
    settings: {
        baseURL: "https://api.unsplash.com",
        accessKey: "ed5e91aa173e6d699f4209f656b07c050b1f6aea5a071cd770ba3900b07ba06b",
    },
    getPhotos() {
        axios({
            method: "GET",
            url: this.settings.baseURL + "/photos",
            headers: {
                "Authorization": "Client-ID " + this.settings.accessKey
            }
        }).then(response => {
            console.log(response);
        }).catch(e => {
            console.log("Errors");
        });
    }
}