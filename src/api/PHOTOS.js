import instanceAPI from './api';

const PHOTOS = {
    getRandomPhotos(){
        return instanceAPI.get('photos?per_page=21');
    },
    getPhotos(value,page=1){
        // console.log(instanceAPI.get(`search/photos?per_page=${pageNum}&query=${value}`));
        return instanceAPI.get(`search/photos?per_page=21&page=${page}&query=${value}`);
    },
    getTopics(){
        return instanceAPI.get('topics');
    }
}

export default PHOTOS;