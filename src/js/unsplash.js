import axios from 'axios';

/**
 * This component is responsible for API interaction with Unsplash
 * It uses a promise base solution, as well as axios npm package
 * for HTTP requests.
 */
export default {
    /**
     * Includes a list of settings required by Unsplash.
     * In this case it's only the accessKey, since getting photos
     * doesn't require additional permissions.
     */
    settings: {
        baseURL: "https://api.unsplash.com",
        accessKey: "ed5e91aa173e6d699f4209f656b07c050b1f6aea5a071cd770ba3900b07ba06b",
    },
    /**
     * @description Gets a list of photos from Unsplash
     * @param {*} page Page number of the list
     * @param {*} per_page Photos per page
     */
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