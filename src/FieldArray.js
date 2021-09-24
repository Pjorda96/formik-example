import { FormikProvider, FieldArray as FFieldArray, Field, ErrorMessage } from "formik";
import { enums, friends } from './utils';

export default function FieldArray({ formik }) {
  // FieldArray only valid with formik context
  return (
    <FormikProvider value={formik}>
      <FFieldArray name="friends">
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
      </FFieldArray>
    </FormikProvider>
  )
}
