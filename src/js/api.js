import urljoin from 'url-join';
import axios from 'axios';

function api(endpoint, params) {
  return axios.get(urljoin("/api", endpoint), {params})
}

export {
  api
};
