import { getCookie } from "@/lib/server-utils";
import { apiService } from "./axios-client";

// API List
export const API_LIST = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  endpoints: {
    admin: {},
    client: {
      IAM: {
        refreshToken:
          "/api/v1/client/iam/requestNewAccessTokenWithRefreshToken",
        login: "/api/v1/client/iam/auth/login",
      },
    },

    // Add more endpoint groups here
  },
} as const;

// API Service
export const api = {
  admin: {},
  client: {
    IAM: {
      refreshToken: async () =>
        apiService.post(API_LIST.endpoints.client.IAM.refreshToken, {
          refresh_token: await getCookie("refreshToken"),
        }),
      login: (data: any) =>
        apiService.post(API_LIST.endpoints.client.IAM.login, data),
    },
  },
  // Additional API endpoints can be added here
};
