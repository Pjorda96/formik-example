import ReactDOM from "react-dom";
import { useState } from "react";
import { useFormik } from "formik";
import FieldArray from "./FieldArray";
import Settings, { enums, MyField } from './utils';
import "./index.css";

const SignupForm = () => {
  const formik = useFormik(Settings);
  
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback = () => (
    (didFocus && formik.value[enums.instant].trim().length > 2) || formik.touched[enums.instant]
  );

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
          formik={formik}
        />
      </label>

      <h5>FieldArray</h5>
      <FieldArray formik={formik} />

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
