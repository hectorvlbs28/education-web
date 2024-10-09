import { useEffect } from 'react';
import { useFormik } from 'formik';
import TextInput from '../../inputs/textinput/textinput';
import { searchSchema } from '../../../utils/formsValidations';
import { setHeaderSearchInput } from '../../../redux/slices/navigation';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../hooks/use-redux/use-redux';

type Props = {
  title?: string;
};

const Searcher = ({ title }: Props) => {
  const dispatch = useAppDispatch();
  const headerSearchInput = useAppSelector(
    (state) => state.navigationSlice.headerSearchInput
  );

  const initialValues = {
    search: '',
  };
  const initialValuesKeys = Object.keys(initialValues);

  const formik = useFormik({
    initialValues,
    validationSchema: searchSchema,
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: (values) => {
      dispatch(setHeaderSearchInput(values.search));
    },
  });

  useEffect(() => {
    if (formik.values.search.length > 0) {
      formik.handleSubmit();
    } else {
      formik.resetForm();
      dispatch(setHeaderSearchInput(''));
    }
  }, [formik.values.search]);

  useEffect(() => {
    formik.setFieldValue('search', headerSearchInput);
  }, [headerSearchInput]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        width: '100%',
      }}
    >
      <TextInput
        label=""
        formikName={initialValuesKeys[0]}
        formik={formik}
        placeholder="Buscar"
        onlyNumbers={false}
        isDisabled={false}
        tooltipMessage=""
        isSearcher={true}
      />
    </form>
  );
};

export default Searcher;
