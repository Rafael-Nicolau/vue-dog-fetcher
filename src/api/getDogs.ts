import axios from "axios";

const getDogs = async (query: string) => {
  const url: string = process.env.VUE_APP_DOG_URL;
  const baseUrl = `${url}${query}`;
  const apiKey = process.env.VUE_APP_API_KEY as string;
  let response = await axios({
    method: "get",
    url: baseUrl,
    headers: { "x-api-key": apiKey },
  });
  if (response.data[0].breeds.length === 0) {
    response = await axios({
      method: "get",
      url: baseUrl,
      headers: { "x-api-key": apiKey },
    });
  }
  return response.data;
};

export default getDogs;
