interface Course {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface GetCoursesResponse {
  data: Course[];
  statusCode: number;
}

export default GetCoursesResponse;