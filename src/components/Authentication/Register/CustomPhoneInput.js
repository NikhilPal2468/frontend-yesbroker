import React from "react";
import PhoneInput from "react-phone-input-2";
import FormError from "../FormError";
import { ErrorMessage, useFormikContext } from "formik";

const CustomPhoneInput = ({ name, id, values, field, variable }) => {
  const { setFieldValue } = useFormikContext();

  const onValueChange = (phone) => {
    setFieldValue(variable, phone);
  };

  return (
    <div>
      <PhoneInput
        {...field}
        onChange={onValueChange}
        onlyCountries={["in"]}
        id={id}
        name={name}
        value={values[variable]}
        placeholder="Enter phone number"
        country="in"
        inputStyle={{ width: "100%" }}
      />
      <ErrorMessage name={variable} component={FormError} />
    </div>
  );
};

export default CustomPhoneInput;
