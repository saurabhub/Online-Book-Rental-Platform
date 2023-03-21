import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const UpdateProductFormInput = (props) => {
  const {
    label,
    id,
    name,
    onChange,
    options,
    categories,
    publishers,
    authors,
    values,
    selectedSubs,
    ...inputProps
  } = props;

  return (
    <FormGroup>
      <Label>{label}</Label>
      {name==="category" && (
        <Input
          {...inputProps}
          name={name}
          onChange={onChange}
          value={values.category._id}
        >
          <option value="">Please Select</option>
          {options.map((option) => (
            <option key={option._id || option} value={option._id || option}>
              {option.name || option}
            </option>
          ))}
        </Input>
      )}
      {name === "author" && (
        <Input
          {...inputProps}
          name={name}
          onChange={onChange}
          value={values.author._id}
        >
          <option value="">Please Select</option>
          {options.map((option) => (
            <option key={option._id || option} value={option._id || option}>
              {option.name || option}
            </option>
          ))}
        </Input>
      )}
      {name === "publisher" && (
        <Input
          {...inputProps}
          name={name}
          onChange={onChange}
          value={values.publisher._id}
        >
          <option value="">Please Select</option>
          {options.map((option) => (
            <option key={option._id || option} value={option._id || option}>
              {option.name || option}
            </option>
          ))}
        </Input>
      )}
      {name === "shipping" && (
        <Input
          {...inputProps}
          name={name}
          onChange={onChange}
          value={inputProps.value}
        >
          <option value="">Please Select</option>
          {options.map((option) => (
            <option key={option._id || option} value={option._id || option}>
              {option.name || option}
            </option>
          ))}
        </Input>
      )}
      {name === "subs" && (
        <Input
          {...inputProps}
          onChange={onChange}
          name={name}
          multiple
          value={selectedSubs}
        >
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </Input>
      )}
      {inputProps.type !== "select" && (
        <Input {...inputProps} name={name} onChange={onChange} />
      )}
    </FormGroup>
  );
};

export default UpdateProductFormInput;
