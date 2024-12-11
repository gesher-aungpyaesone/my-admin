import {
  SimpleForm,
  TextInput,
  Create,
  ReferenceInput,
  AutocompleteInput,
  RadioButtonGroupInput,
} from 'react-admin';
import { Grid } from '@mui/material';

export const ClientCompanyCreate = () => {
  const transform = (data) => {
    if (data.type_id) data.type_id = +data.type_id;
    return data;
  };
  return (
    <Create transform={transform}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="website_url" />
        <Grid container spacing={10}>
          <Grid item xs={12} sm={6}>
            <ReferenceInput source="industry_id" reference="ads-industry">
              <AutocompleteInput />
            </ReferenceInput>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ReferenceInput source="type_id" reference="ads-company-type">
              <RadioButtonGroupInput label="resources.ads-client-company.fields.type_id" />
            </ReferenceInput>
          </Grid>
        </Grid>
        <ReferenceInput source="size_id" reference="ads-company-size">
          <AutocompleteInput />
        </ReferenceInput>
        <TextInput source="strength" />
        <TextInput source="others" multiline rows={3} />
      </SimpleForm>
    </Create>
  );
};
