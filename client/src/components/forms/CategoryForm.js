import React from "react";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";

const CategoryForm = ({ name, setName, btnName, loading, labelName }) => {
  return (
    <>
      <FormGroup>
        <Label for="name" className="text-dark">
          Enter {labelName} Name
        </Label>
        
        <Input
          id="name"
          name="name"
          placeholder="e.g. Fiction"
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormGroup>{" "}
      {loading ? (
        <Button color="danger" disabled>
          <Spinner size="sm">Loading...</Spinner>
          <span> Loading</span>
        </Button>
      ) : (
        <Button type="submit" color="success">
          {btnName ? btnName : "Save"}
        </Button>
      )}
        </>
  );
};

export default CategoryForm;
