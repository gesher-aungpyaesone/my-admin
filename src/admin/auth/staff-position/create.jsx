import { SimpleForm, TextInput, Create } from 'react-admin';

export const StaffPositionCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" />
      </SimpleForm>
    </Create>
  );
};
