import { randomNumber } from "../src/utils/random.js";
import { postPet, getPetById, deletePet } from "../src/api/petApi.js";


describe("POST /pet - happy path", () => {
  const id = randomNumber();
  const statuses = ["available", "pending", "sold"];
  let petCreated = false;

  beforeAll(async () => {
    //Precondición: Se consulta si existe el pet y se elimina en caso afirmativo
    const response = await getPetById(id);
    if (response?.status === 200) {
      await deletePet(id);
    }
  });

  afterEach(async () => {
    if (petCreated) {
      await deletePet(id);
      petCreated = false;
    }
  });

  test.each(statuses)(
    "should create pet successfully with status %s",
    async (status) => {
      petCreated = false;
      const postResponse = await postPet({
        id,
        status
      });

      expect(postResponse.status).toBe(200);
      petCreated = true;

      const getResponse = await getPetById(id);
      const pet = getResponse.data;

      expect(pet.id).toBe(id);
      expect(pet.category.id).not.toBe("");
      expect(pet.category.name).not.toBe("");
      expect(pet.name).not.toBe("");
      expect(pet.photoUrls.length).toBeGreaterThan(0);
      expect(pet.tags[0].id).not.toBe("");
      expect(pet.tags[0].name).not.toBe("");
      expect(pet.status).toBe(status);
    }
  );
});
