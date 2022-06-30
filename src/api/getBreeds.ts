import axios from "axios";

const getBreeds = async () => {
  const baseUrl: string = process.env.VUE_APP_BREEDS_URL;
  const apiKey: string = process.env.VUE_APP_API_KEY;
  const response = await axios({
    method: "get",
    url: baseUrl,
    headers: { "x-api-key": apiKey },
  });
  return response.data;
};

export default getBreeds;
