import { useEffect } from "react";
import * as Yup from 'yup';

export const enums = {
  firstName: 'firstName',  
  lastName: 'lastName',  
  email: 'email',
  toggle: 'toggle',
  checked: 'checked',
  picked: 'picked',
  textA: 'textA',
  textB: 'textB',
  textC: 'textC',
  friends: 'friends',
  instant: 'instant',
}
export const friends = {
  name: '',
  email: '',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function fetchNewTextC(a, b) {
  await new Promise((r) => setTimeout(r, 500));
  return `${enums.textA}: ${a}, ${enums.textB}: ${b}`;
}

const formikSettings = { // useFormik use for performance and custom components
  initialValues: {
    [enums.firstName]: '',
    [enums.lastName]: '',
    [enums.email]: '',
    [enums.toggle]: false,
    [enums.checked]: [],
    [enums.picked]: '',
    [enums.textA]: '',
    [enums.textB]: '',
    [enums.textC]: '',
    [enums.friends]: [friends],
    [enums.instant]: '',
  },
  validationSchema: Yup.object({
    [enums.firstName]: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    [enums.lastName]: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    [enums.email]: Yup.string().email('Invalid email address').required('Required'),
    [enums.checked]: Yup.array().min(1, 'Al menos 1').max(2, 'Como máximo 2'),
    [enums.picked]: Yup.string().required('Required'),
    [enums.instant]: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .max(20, 'Must be less  than 20 characters')
      .required('Username is required')
      .matches(/^[a-zA-Z0-9]+$/, 'Cannot contain special characters or spaces'),
    [enums.friends]: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().min(2, 'too short').required('Required'), // these constraints take precedence
          email: Yup.string().email('Invalid email address').required('Required'), // these constraints take precedence
        }),
      )
      .required('Must have friends') // these constraints are shown if and only if inner constraints are satisfied
      .min(1, 'Minimum of 1 friends')
      .max(3, 'Maximum of 3 friends'),
  }),

  onSubmit: async (values) => {
    await sleep(500);
    console.log(`values`, values)
  },
};
export default formikSettings;

export function MyField({ formik, ...props }) {
  const {
    values: { textA, textB },
    touched,
    setFieldValue,
  } = formik;

  useEffect(() => {
    // set the value of textC, based on textA and textB
    let isCurrent = true;

    if (
      textA.trim() !== '' &&
      textB.trim() !== '' &&
      touched.textA &&
      touched.textB
    ) {
      fetchNewTextC(textA, textB).then(textC => {
        if (!!isCurrent) {
          // prevent setting old values
          setFieldValue(props.name, textC);
        }
      });
    }

    return () => {
      isCurrent = false;
    };
  }, [textB, textA, touched.textA, touched.textB, setFieldValue, props.name]);

  return (
    <>
      <input {...props} />
      {!!formik.touched[enums.textC] && !!formik.errors[enums.textC] && <div>{formik.errors[enums.textC]}</div>}
    </>
  );
};
