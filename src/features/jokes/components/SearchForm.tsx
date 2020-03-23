import React from 'react';
import { Field, Formik, FormikProps } from 'formik';
import { Button, HelperText } from 'react-native-paper';
import { useDimensions } from 'react-native-web-hooks';

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

const SearchForm = () => {
  const {
    window: { height },
  } = useDimensions();

  return (
    <Container>
      <GradientContainer />
      <KeyboardScroll>
        <Image source={logo} dimension={height} />

        <Formik
          initialValues={{ query: '' }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
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
                  <Button
                    mode="contained"
                    onPress={() => {
                      alert('lucky');
                    }}
                  >
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
