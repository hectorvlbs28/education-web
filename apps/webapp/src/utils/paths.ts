export const Paths = {
  Home: '/',
  Login: '/login',
  ForgotPassword: '/forgot-password',
  SignUp: '/sign-up',
  Enroll: '/enroll',
  Students: {
    Home: '/students',
    MyAccount: '/students/my-account',
    AcademicOffer: '/students/academic-offer',
  },
  Applicants: {
    Home: '/applicants',
    MyAccount: '/applicants/my-account',
    AcademicOffer: '/applicants/academic-offer',
  },
  Admin: {
    Home: '/admin',
    Applicants: '/admin/applicants',
    Students: '/admin/students',
    Groups: '/admin/groups',
    Payments: '/admin/payments',
    ApplicantDetail: '/admin/applicants/:id',
    StudentDetail: '/admin/students/:id',
  },
};

export default Paths;
