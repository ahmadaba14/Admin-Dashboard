import http from "../http-common"

class PostService {
    getAll() {
        return http.get('/cars')
    }
    getById(id) {
        return http.get(`/cars/${id}`)
    }
    update(id, data) {
        return http.put(`/cars/${id}`, data)
    }
}

export default new PostService()