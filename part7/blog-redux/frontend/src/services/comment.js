import axios from 'axios';
const baseUrl = '/api/blogs';

const create = ({ id }, comment) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, comment);
  return request.then(response => response.data);
};

export default { create };