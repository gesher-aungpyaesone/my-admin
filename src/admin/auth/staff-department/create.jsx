import { SimpleForm, TextInput, Create } from 'react-admin';

export const StaffDepartmentCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" />
      </SimpleForm>
    </Create>
  );
};