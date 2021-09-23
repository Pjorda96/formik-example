import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import "./index.css";

const enums = {
  firstName: 'firstName',  
  lastName: 'lastName',  
  email: 'email',
  toggle: 'toggle',
  checked: 'checked',
  picked: 'picked',
  textA: 'textA',
  textB: 'textB',
  textC: 'textC',
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function fetchNewTextC(a, b) {
  await new Promise((r) => setTimeout(r, 500));
  return `${enums.textA}: ${a}, ${enums.textB}: ${b}`;
}

const SignupForm = () => {
  const formik = useFormik({
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
    }),

    onSubmit: async (values) => {
      await sleep(500);
      console.log(`values`, values)
    },
  });

  const MyField = props => {
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
        // touched.textB = false; // TODO: refactor
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor={enums.firstName}>First Name</label>
      <input
        // id={enums.firstName}
        type="text"
        {...formik.getFieldProps(enums.firstName)}
      />
      {formik.touched[enums.firstName] && formik.errors[enums.firstName] ? (
        <div>{formik.errors[enums.firstName]}</div>
      ) : null}

      <label htmlFor={enums.lastName}>Last Name</label>
      <input
        // id={enums.lastName}
        type="text"
        {...formik.getFieldProps(enums.lastName)}
      />
      {formik.touched[enums.lastName] && formik.errors[enums.lastName] ? (
        <div>{formik.errors[enums.lastName]}</div>
      ) : null}

      <label htmlFor={enums.email}>Email Address</label>
      <input
        // id={enums.email}
        type="email"
        {...formik.getFieldProps(enums.email)}
      />
      {formik.touched[enums.email] && formik.errors[enums.email] ? (
        <div>{formik.errors[enums.email]}</div>
      ) : null}

      <label>
        <input
          // id={enums.toggle}
          type="checkbox"
          {...formik.getFieldProps(enums.toggle)}
        />
        Toggle
      </label>
      
      <div role="group" aria-labelledby="checkbox-group">
        <label>
          <input
            // id={enums.checked}
            type="checkbox"
            name={enums.checked}
            value="One"
            onChange={formik.handleChange}
          />
          One
        </label>
        <label>
          <input
            // id={enums.checked}
            type="checkbox"
            name={enums.checked}
            value="Two"
            onChange={formik.handleChange}
          />
          Two
        </label>
        <label>
          <input
            // id={enums.checked}
            type="checkbox"
            name={enums.checked}
            value="Three"
            onChange={formik.handleChange}
          />
          Three
        </label>

        {formik.touched[enums.checked] && formik.errors[enums.checked] ? (
          <div>{formik.errors[enums.checked]}</div>
        ) : null}
      </div>

      <div role="group" aria-labelledby="my-radio-group">
        <label>
          <input
            // id={enums.picked}
            type="radio"
            name={enums.picked}
            value="One"
            onChange={formik.handleChange}
          />
          One
        </label>
        <label>
          <input
            // id={enums.picked}
            type="radio"
            name={enums.picked}
            value="Two"
            onChange={formik.handleChange}
          />
          Two
        </label>
        <div>Picked: {formik.values.picked}</div>

        {formik.touched[enums.picked] && formik.errors[enums.picked] ? (
          <div>{formik.errors[enums.picked]}</div>
        ) : null}
      </div>

      <label>
        textA
        <input
          id={enums.textA}
          name={enums.textA}
          {...formik.getFieldProps(enums.textA)}
        />
      </label>
      <label>
        textB
        <input
          id={enums.textB}
          name={enums.textB}
          {...formik.getFieldProps(enums.textB)}
        />
      </label>
      <label>
        textC
        <MyField
          id={enums.textC}
          name={enums.textC}
          {...formik.getFieldProps(enums.textC)}
        />
      </label>

      <button type="submit" disabled={formik.isSubmitting}>Submit</button>
    </form>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
