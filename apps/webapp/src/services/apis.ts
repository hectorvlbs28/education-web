export const Users = {
  signup: '/users/signup',
  me: '/users/me',
};

export const Auth = {
  login: '/auth/login',
};

export const Students = {
  student: '/student',
  createContract: (studentId: string) => `/student/${studentId}/contracts`,
  getContractUrl: (studentId: string, contractId: string) =>
    `/student/${studentId}/contract/${contractId}`,
  consultContract: (contractId: string) =>
    `/student/contract/${contractId}/document`,
  uploadStudentDocument: (studentId: string) => `/student/${studentId}`,
  getCourses: '/student/courses',
};

export const Payments = {
  send: '/payments/send',
};
