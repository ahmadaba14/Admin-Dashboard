import Axios from 'axios'
export default Axios.create({
  baseURL: 'https://rentacar107113.herokuapp.com',
  headers: {
    'Content-type': 'application/json',
  },
})
