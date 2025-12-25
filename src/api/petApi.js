import axios from "axios"
import { getBaseJson } from "../utils/baseJson.js";
import { buildPetPayload } from "../utils/buildPetPayload.js";


const URL = 'https://petstore3.swagger.io/api/v3/pet'


export async function postPet(overrides = {}) {
  const base = getBaseJson("pet.json");
  const payload = buildPetPayload(base, overrides);
  return await axios.post(URL, payload);
}

export async function getPetById(id) {
  try {
    console.info(`getPetById: ${URL}/${id}`);
    const response = await axios.get(`${URL}/${id}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { status: 404, data: null };
    }
    throw error; 
  }
}

export async function deletePet(id) {
  return await axios.delete(`${URL}/${id}`);
}