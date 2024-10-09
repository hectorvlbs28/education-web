interface LoginResponse {
  data: {
    userId: string;
    accessToken: string;
    refreshToken: string;
  };
  statusCode: number;
}

export default LoginResponse;
