import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import "./index.css";

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
// const validate = values => {
//   const errors = {};
//   if (!values.firstName) {
//     errors.firstName = 'Required';
//   } else if (values.firstName.length > 15) {
//     errors.firstName = 'Must be 15 characters or less';
//   }

//   if (!values.lastName) {
//     errors.lastName = 'Required';
//   } else if (values.lastName.length > 20) {
//     errors.lastName = 'Must be 20 characters or less';
//   }

//   if (!values.email) {
//     errors.email = 'Required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address';
//   }

//   return errors;
// };

const SignupForm = () => {
  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    // validate,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    // <form onSubmit={formik.handleSubmit}>
    //   <label htmlFor="firstName">First Name</label>
    //   <input
    //     id="firstName"
    //     name="firstName"
    //     type="text"
    //     onChange={formik.handleChange}
    //     onBlur={formik.handleBlur}
    //     value={formik.values.firstName}
    //   />
    //   {formik.touched.firstName && formik.errors.firstName ? (
    //     <div>{formik.errors.firstName}</div>
    //   ) : null}

    //   <label htmlFor="lastName">Last Name</label>
    //   <input
    //     id="lastName"
    //     name="lastName"
    //     type="text"
    //     onChange={formik.handleChange}
    //     onBlur={formik.handleBlur}
    //     value={formik.values.lastName}
    //   />
    //   {formik.touched.lastName && formik.errors.lastName ? (
    //     <div>{formik.errors.lastName}</div>
    //   ) : null}

    //   <label htmlFor="email">Email Address</label>
    //   <input
    //     id="email"
    //     name="email"
    //     type="email"
    //     onChange={formik.handleChange}
    //     onBlur={formik.handleBlur}
    //     value={formik.values.email}
    //   />
    //   {formik.touched.email && formik.errors.email ? (
    //     <div>{formik.errors.email}</div>
    //   ) : null}

    //   <button type="submit">Submit</button>
    // </form>
    <form onSubmit={formik.handleSubmit}>
       <label htmlFor="firstName">First Name</label>
       <input
         id="firstName"
         type="text"
         {...formik.getFieldProps('firstName')}
       />
       {formik.touched.firstName && formik.errors.firstName ? (
         <div>{formik.errors.firstName}</div>
       ) : null}
 
       <label htmlFor="lastName">Last Name</label>
       <input id="lastName" type="text" {...formik.getFieldProps('lastName')} />
       {formik.touched.lastName && formik.errors.lastName ? (
         <div>{formik.errors.lastName}</div>
       ) : null}
 
       <label htmlFor="email">Email Address</label>
       <input id="email" type="email" {...formik.getFieldProps('email')} />
       {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
 
       <button type="submit">Submit</button>
     </form>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
