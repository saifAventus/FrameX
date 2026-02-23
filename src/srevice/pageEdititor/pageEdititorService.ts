import api from "../axios";

const URL_PATH = `/api/project`;

const pageEditorService = {
  fetchJson() {
    return api.get(`${URL_PATH}/get`);
  },

  updateJson(payload: any) {
    return api.post(`${URL_PATH}/update`, payload);
  },
};

export default pageEditorService;
