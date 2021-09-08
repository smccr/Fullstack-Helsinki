import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, HealthOption } from "./FormField";
import { HealthCheckRating, HealthCheckEntry } from "../types";


/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */

export type EntryFormValues = Omit<HealthCheckEntry, "id" | "date" | "diagnosisCodes">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthOptions: HealthOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  // const [{ diagnoses }] = useStateValue();
  
  return (
    <Formik
      initialValues={{
        specialist: "",
        description: "",
        type: "HealthCheck",
        healthCheckRating: 1
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />

            <SelectField
              label="Healthcheck rating"
              name="healthCheckRating"
              options={healthOptions}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
