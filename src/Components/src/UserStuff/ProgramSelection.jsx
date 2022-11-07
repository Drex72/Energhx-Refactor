import React from "react";
import FormWrapper from "./FormWrapper";

function ProgramSelection({ program, updateField }) {
  // I am to follow this template for all of the four stepper forms
  return (
    <>
      <FormWrapper title="Select A Program">
        <input
          autoFocus
          required
          id="natural-gas"
          type="radio"
          name="program"
          value={program}
          onChange={(e) => updateField({ firstName: e.target.value })}
        />
        <label htmlFor="natural-gas">Natural Gas</label>
        <input
          required
          id="Electricity"
          name="program"
          type="radio"
          value={program}
          onChange={(e) => updateField({ lastName: e.target.value })}
        />
        <label htmlFor="Electricity">Electricity</label>
      </FormWrapper>
    </>
  );
}

export default ProgramSelection;
