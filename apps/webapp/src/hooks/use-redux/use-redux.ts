import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import {
  selectContactInformation,
  selectProfile,
  selectDocumentationMexican,
  selectDocumentationForeignerCurp,
  selectDocumentationForeignerNoCurp,
} from '../../redux/slices/enroll';

import {
  selectUserContactInformation,
  selectUserProfile,
  selectUserCourses,
  selectUserEnrollCourses,
} from '../../redux/slices/user';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useContactInformation = () => {
  return useAppSelector((state) =>
    selectContactInformation({ enroll: state.enrollSlice })
  );
};

export const useProfile = () => {
  return useAppSelector((state) =>
    selectProfile({ enroll: state.enrollSlice })
  );
};

export const useDocumentationMexican = () => {
  return useAppSelector((state) =>
    selectDocumentationMexican({ enroll: state.enrollSlice })
  );
};

export const useDocumentationForeignerCurp = () => {
  return useAppSelector((state) =>
    selectDocumentationForeignerCurp({ enroll: state.enrollSlice })
  );
};

export const useDocumentationForeignerNoCurp = () => {
  return useAppSelector((state) =>
    selectDocumentationForeignerNoCurp({ enroll: state.enrollSlice })
  );
};

export const useUserContactInformation = () => {
  return useAppSelector((state) =>
    selectUserContactInformation({ user: state.userSlice })
  );
};

export const useUserProfile = () => {
  return useAppSelector((state) =>
    selectUserProfile({ user: state.userSlice })
  );
};

export const useUserCourses = () => {
  return useAppSelector((state) =>
    selectUserCourses({ user: state.userSlice })
  );
};

export const useUserEnrollCourses = () => {
  return useAppSelector((state) =>
    selectUserEnrollCourses({ user: state.userSlice })
  );
};
