import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { useFormik, FormikProvider, FieldArray, Field, ErrorMessage } from "formik";
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
  friends: 'friends',
  instant: 'instant',
}
const friends = {
  name: '',
  email: '',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function fetchNewTextC(a, b) {
  await new Promise((r) => setTimeout(r, 500));
  return `${enums.textA}: ${a}, ${enums.textB}: ${b}`;
}

const SignupForm = () => {
  const formik = useFormik({ // useFormik use for performance and custom components
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
  });
  
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback = () => (
    (didFocus && formik.value[enums.instant].trim().length > 2) || formik.touched[enums.instant]
  );


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
        <h5>Checkbox</h5>
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
        <h5>Radio</h5>
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

      <h5>Dependent fields</h5>
      <label>
        textA
        <input
          // id={enums.textA}
          name={enums.textA}
          {...formik.getFieldProps(enums.textA)}
        />
      </label>
      <label>
        textB
        <input
          // id={enums.textB}
          name={enums.textB}
          {...formik.getFieldProps(enums.textB)}
        />
      </label>
      <label>
        textC
        <MyField
          // id={enums.textC}
          name={enums.textC}
          {...formik.getFieldProps(enums.textC)}
        />
      </label>

      <h5>FieldArray</h5>
      {/* FieldArray only valid with formik context */}
      <FormikProvider value={formik}>
        <FieldArray name="friends">
          {({ insert, remove, push }) => (
            <div>
              {formik.values[enums.friends].length > 0 &&
                formik.values[enums.friends].map((friend, index) => (
                  <div className="row" key={index}>
                    <div className="col">
                      <label htmlFor={`friends.${index}.name`}>Name</label>
                      <Field
                        name={`friends.${index}.name`}
                        placeholder="Jane Doe"
                        type="text"
                      />
                      <ErrorMessage
                        name={`friends.${index}.name`}
                        component="div"
                        className="field-error"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor={`friends.${index}.email`}>Email</label>
                      <Field
                        name={`friends.${index}.email`}
                        placeholder="jane@acme.com"
                        type="email"
                      />
                      <ErrorMessage
                        name={`friends.${index}.email`}
                        component="div"
                        className="field-error"
                      />
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => remove(index)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              <button
                type="button"
                className="secondary"
                onClick={() => push(friends)}
              >
                Add Friend
              </button>

              {/* IMPORTANT typeof formik.errors[enums.friends] === 'string' for avoid crash */}
              {formik.touched[enums.friends] && typeof formik.errors[enums.friends] === 'string' ? (
                <div>{formik.errors[enums.friends]}</div>
              ) : null}
            </div>
          )}
        </FieldArray>
      </FormikProvider>

      <div
        className={`form-control ${
          showFeedback ? (formik.errors[enums.instant] ? 'invalid' : 'valid') : ''
        }`}
      >
        <div className="flex items-center space-between">
          <label htmlFor={enums.instant}>Instant change</label>{' '}
          {showFeedback ? (
            <div
              id={`${enums.instant}-feedback`}
              aria-live="polite"
              className="feedback text-sm"
            >
              {formik.errors[enums.instant] ? formik.errors[enums.instant] : '✓'}
            </div>
          ) : null}
        </div>
        <input
          aria-describedby={`${enums.instant}-feedback ${enums.instant}-help`}
          {...formik.getFieldProps(enums.instant)}
          onFocus={handleFocus}
        />
        <div className="text-xs" id={`${enums.instant}-help`} tabIndex="-1">
          Must be 8-20 characters and cannot contain special characters.
        </div>
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
