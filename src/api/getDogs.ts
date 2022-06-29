import axios from "axios";

const getDogs = async (query: string) => {
  const baseUrl = process.env.DOG_URL;
  const apiKey = process.env.API_KEY || "";
  const response = await axios({
    method: "get",
    url: baseUrl,
    headers: apiKey,
    params: query,
  });

  return response.data;
};

export default getDogs;
