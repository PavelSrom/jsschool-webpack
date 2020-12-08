import React, { useState, createContext } from "react"

const FormikContext = createContext()

export function Formik({ initialValues, onSubmit, children }) {
  // only initialize on first render
  const [values, setValues] = useState(() => initialValues)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(values)
  }

  const setFieldValue = (fieldName, fieldValue) =>
    setValues({ ...values, [fieldName]: fieldValue })

  const resetForm = () => setValues(initialValues)

  /**
   * Since the formik library supports both context and render props,
   * I will create both too. However, my formik can be used only through
   * the render prop pattern.
   */
  const contextValue = {
    values,
    handleSubmit,
    setFieldValue,
    resetForm,
  }

  return (
    <FormikContext.Provider value={contextValue}>
      {children(contextValue)}
    </FormikContext.Provider>
  )
}

export function Form({ children, ...rest }) {
  return (
    <FormikContext.Consumer>
      {({ handleSubmit }) => (
        <form {...rest} onSubmit={handleSubmit}>
          {children}
        </form>
      )}
    </FormikContext.Consumer>
  )
}

export function Field({ name, ...rest }) {
  return (
    <FormikContext.Consumer>
      {({ values, setFieldValue }) => (
        <input
          {...rest}
          value={values[name]}
          onChange={(e) => setFieldValue(name, e.target.value)}
        />
      )}
    </FormikContext.Consumer>
  )
}
