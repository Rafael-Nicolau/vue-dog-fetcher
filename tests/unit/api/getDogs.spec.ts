// import axios from "axios";
// jest.mock("axios");

// import getDogs from "@/api/getDogs";

// const axiosGetMock = axios.get as jest.Mock;

// describe("getDogs", () => {
//   beforeEach(() => {
//     axiosGetMock.mockResolvedValue({
//       data: [
//         {
//           id: 1,
//           url: "https://cdn2.thedogapi.com/images/HJq5ke5Nm_1280.jpg",
//         },
//       ],
//     });
//   });

//   it("get a json object", async () => {
//     await getDogs("");
//     expect(axios.get).toHaveBeenCalledWith(
//       "https://api.thedogapi.com/v1/images/search"
//     );
//   });
// });
