import axios from "axios";

const getBreeds = async (query: string) => {
  const url: string = process.env.VUE_APP_BREEDS_URL;
  const baseUrl = `${url}${query}`;
  const apiKey: string = process.env.VUE_APP_API_KEY;
  const response = await axios({
    method: "get",
    url: baseUrl,
    headers: { "x-api-key": apiKey },
  });
  return response.data;
};

export default getBreeds;
