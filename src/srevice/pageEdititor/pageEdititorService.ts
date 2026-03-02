import type { ElementNode } from "@/shared/types/elementNode";
import api from "../axios";

const URL_PATH = `/api/project`;

export interface IUpadtedDataStore {
  id: string;
  updated: string;
  elementType: "className" | "text";
}
export interface IInsertElement {
  parentId: string;
  newNode: ElementNode;
}
const pageEditorService = {
  fetchJson() {
    return api.get(`${URL_PATH}/get`);
  },

  updateJson(payload: IUpadtedDataStore) {
    return api.post(`${URL_PATH}/update`, payload);
  },

  addJson(payload: IInsertElement) {
    return api.post(`${URL_PATH}/add`, payload);
  },
  deleteJson(id: string) {
    return api.delete(`${URL_PATH}/delete?id=${id}`);
  },
};

export default pageEditorService;
