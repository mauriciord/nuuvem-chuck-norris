import React, { useCallback } from 'react';
import { Field, Formik, FormikProps } from 'formik';
import { Button, HelperText } from 'react-native-paper';
import { useDimensions } from 'react-native-web-hooks';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import {
  Container,
  GradientContainer,
  KeyboardScroll,
  Image,
  FormRow,
  QueryInput,
} from '../styles';

type Values = {
  query: string;
};

const logo = require('assets/logo.png');

const SearchFormSchema = Yup.object().shape({
  query: Yup.string()
    .min(2, 'Too Short!')
    .required('This field cannot be empty'),
});

const SearchForm = () => {
  const {
    window: { height },
  } = useDimensions();
  const navigation = useNavigation();

  const handleFeelingLucky = useCallback(
    query => () =>
      navigation.navigate('SearchResults', { query, feelingLucky: true }),
    [navigation]
  );

  return (
    <Container>
      <GradientContainer />
      <KeyboardScroll>
        <Image source={logo} dimension={height} />

        <Formik
          initialValues={{ query: '' }}
          validationSchema={SearchFormSchema}
          onSubmit={({ query }, { resetForm }) => {
            navigation.navigate('SearchResults', { query });
            resetForm();
          }}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            values: { query },
          }: FormikProps<Values>) => {
            return (
              <>
                <Field name="query">
                  {({
                    field: { name },
                    meta: { touched, error },
                    form: { values },
                  }) => (
                    <>
                      <FormRow>
                        <QueryInput
                          mode="outlined"
                          placeholder="Search for some joke"
                          name={name}
                          onChangeText={handleChange('query')}
                          onBlur={handleBlur('query')}
                          value={values.query}
                          autoCapitalize="none"
                        />
                      </FormRow>
                      {touched && error && (
                        <HelperText type="error">{error}</HelperText>
                      )}
                    </>
                  )}
                </Field>
                <FormRow>
                  <Button
                    mode="contained"
                    icon="search-web"
                    onPress={handleSubmit}
                  >
                    Search
                  </Button>
                  <Button mode="contained" onPress={handleFeelingLucky(query)}>
                    I'm feeling lucky
                  </Button>
                </FormRow>
              </>
            );
          }}
        </Formik>
      </KeyboardScroll>
    </Container>
  );
};

export default SearchForm;
