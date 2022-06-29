import axios from "axios";

const getDogs = async (query: string) => {
  const baseUrl = process.env.VUE_APP_DOG_URL;
  const apiKey = process.env.VUE_APP_API_KEY || "";
  const response = await axios({
    method: "get",
    url: baseUrl,
    headers: { "x-api-key": apiKey },
    params: { query },
  });

  return response.data;
};

export default getDogs;
