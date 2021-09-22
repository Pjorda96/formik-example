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
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      [enums.firstName]: '',
      [enums.lastName]: '',
      [enums.email]: '',
      [enums.toggle]: false,
      [enums.checked]: [],
    },
    validationSchema: Yup.object({
      [enums.firstName]: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      [enums.lastName]: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      [enums.email]: Yup.string().email('Invalid email address').required('Required'),
    }),

    onSubmit: async (values) => {
      await sleep(500);
      console.log(`values`, values)
    },
  });

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
      </div>

      <button type="submit" disabled={formik.isSubmitting}>Submit</button>
    </form>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
