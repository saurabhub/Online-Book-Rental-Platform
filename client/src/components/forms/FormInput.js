import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const FormInput = (props) => {
  const { label, id, onChange, options, ...inputProps } = props;

  return (
    <FormGroup>
      <Label>{label}</Label>
      {inputProps.type === "select" ? (
        <Input
          {...inputProps}
          onChange={onChange}
          multiple={label === "Sub Category"}
        >
          {!(label === "Sub Category") && (
            <option value="">Please Select</option>
          )}
          {options.map((option) => (
            <option key={option._id || option} value={option._id || option}>
              {option.name || option}
            </option>
          ))}
        </Input>
      ) : (
        <Input {...inputProps} onChange={onChange} />
      )}
    </FormGroup>
  );
};

export default FormInput;
