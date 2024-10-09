import { createSlice } from '@reduxjs/toolkit';
import { AVATAR_GREEN } from '../../assets/globalcolors';

interface Course {
  id: string;
  name: string;
  startDate: string;
  schedule: string;
}

interface Courses {
  courses: Course[];
}

interface Contract {
  contractId: string;
  signature: boolean;
}

interface UserCourse {
  courseId: string;
  contract: Contract;
}

interface UserCourses {
  courses: UserCourse[];
}

interface userState {
  userName: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  isLogedIn?: boolean;
  email: string;
  address: string;
  birthdate: string;
  curp: string;
  fatherOrGuardianName: string;
  gender: string;
  educationalAttainment: string;
  nationality: string;
  phone: string;
  studyFormat: string;
  isMinor: boolean;
  studentId: string;
  courses: Courses;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  UserCourses: UserCourses;
  avatarColor: string;
}

const initialState: userState = {
  userName: '',
  userId: '',
  accessToken: '',
  refreshToken: '',
  isLogedIn: false,
  email: '',
  address: '',
  birthdate: '',
  curp: '',
  fatherOrGuardianName: '',
  gender: '',
  educationalAttainment: '',
  nationality: '',
  phone: '',
  studyFormat: '',
  isMinor: false,
  studentId: '',
  courses: {
    courses: [],
  },
  postalCode: '',
  city: '',
  state: '',
  country: '',
  UserCourses: {
    courses: [],
  },
  avatarColor: AVATAR_GREEN,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUser: (state, action) => {
      const {
        userId,
        accessToken,
        refreshToken,
        email,
        address,
        birthdate,
        curp,
        fatherOrGuardianName,
        userName,
        gender,
        educationalAttainment,
        nationality,
        phone,
        studyFormat,
        isMinor,
        studentId,
        postalCode,
        city,
        state: stateAddress,
        country,
      } = action.payload;

      state.userId = userId;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLogedIn = true;
      state.email = email;
      state.address = address;
      state.birthdate = birthdate;
      state.curp = curp;
      state.fatherOrGuardianName = fatherOrGuardianName;
      state.userName = userName;
      state.gender = gender;
      state.educationalAttainment = educationalAttainment;
      state.nationality = nationality;
      state.phone = phone;
      state.studyFormat = studyFormat;
      state.isMinor = isMinor;
      state.studentId = studentId;
      state.postalCode = postalCode;
      state.city = city;
      state.state = stateAddress;
      state.country = country;
    },
    setUserProfile: (state, action) => {
      const {
        email,
        address,
        birthdate,
        curp,
        fatherOrGuardianName,
        userName,
        gender,
        educationalAttainment,
        nationality,
        phone,
        studyFormat,
        isMinor,
        studentId,
        postalCode,
        city,
        state: stateAddress,
        country,
      } = action.payload;

      state.email = email;
      state.address = address;
      state.birthdate = birthdate;
      state.curp = curp;
      state.fatherOrGuardianName = fatherOrGuardianName;
      state.userName = userName;
      state.gender = gender;
      state.educationalAttainment = educationalAttainment;
      state.nationality = nationality;
      state.phone = phone;
      state.studyFormat = studyFormat;
      state.isMinor = isMinor;
      state.studentId = studentId;
      state.postalCode = postalCode;
      state.city = city;
      state.state = stateAddress;
      state.country = country;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setUserCourses: (state, action) => {
      state.UserCourses = action.payload;
    },
    setLogout: (state) => {
      state.userId = '';
      state.accessToken = '';
      state.refreshToken = '';
      state.isLogedIn = false;
      state.email = '';
      state.address = '';
      state.birthdate = '';
      state.curp = '';
      state.fatherOrGuardianName = '';
      state.userName = '';
      state.gender = '';
      state.educationalAttainment = '';
      state.nationality = '';
      state.phone = '';
      state.studyFormat = '';
      state.isMinor = false;
      state.studentId = '';
      state.courses = {
        courses: [],
      };
      state.postalCode = '';
      state.city = '';
      state.state = '';
      state.country = '';
      state.UserCourses = {
        courses: [],
      };
      state.avatarColor = AVATAR_GREEN;
    },
  },
});

export const {
  setUserName,
  setUser,
  setUserProfile,
  setCourses,
  setUserCourses,
} = userSlice.actions;

export const selectUserContactInformation = (state: { user: userState }) => {
  return {
    name: state.user.userName,
    phone: state.user.phone,
    address: state.user.address,
    postalCode: state.user.postalCode,
    city: state.user.city,
    state: state.user.state,
    country: state.user.country,
    email: state.user.email,
  };
};

export const selectUserProfile = (state: { user: userState }) => {
  return {
    gender: state.user.gender,
    birthdate: state.user.birthdate,
    isMinor: state.user.isMinor,
    fatherOrGuardianName: state.user.fatherOrGuardianName
      ? state.user.fatherOrGuardianName
      : 'N/A',
    nationality: state.user.nationality,
    educationalAttainment: state.user.educationalAttainment,
    hasCurp: state.user.curp ? 'Si' : 'No',
    curp: state.user.curp ? state.user.curp : 'N/A',
    studyFormat: state.user.studyFormat,
  };
};

export const selectUserCourses = (state: { user: userState }) => {
  return state.user.courses.courses;
};

export const selectUserEnrollCourses = (state: { user: userState }) => {
  return state.user.UserCourses;
};

export default userSlice.reducer;
