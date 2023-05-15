import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";


export const playersApi = createApi({
  reducerPath: "playersApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/` }),
  tagTypes: ["players"],
  endpoints: (builder) => ({
    search: builder.query({
      query: (q) => `search?name=${q}`,
      providesTags: (result, error, search) => [{ type: "players", search }],
    }),
  }),
});
