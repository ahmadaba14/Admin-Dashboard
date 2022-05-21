import http from "../http-common"

class UserService {
    getAll() {
        return http.get('/users')
    }
    getById(id) {
        return http.get(`/users/${id}`)
    }
    update(id, data) {
        return http.put(`/users/${id}`, data)
    }
    login(data) {
        return http.post('/users/login', data)
    }
}

export default new UserService()