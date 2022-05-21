import http from "../http-common"

class ComplaintService {
    getAll() {
        return http.get('/complaints')
    }
    getById(id) {
        return http.get(`/complaints/${id}`)
    }
    update(id, data) {
        return http.put(`/complaints/${id}`, data)
    }
}

export default new ComplaintService()