import {
  SimpleForm,
  TextInput,
  ReferenceInput,
  Create,
  PasswordInput,
} from 'react-admin';

export const StaffCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="first_name" />
        <TextInput source="last_name" />
        <TextInput source="email" />
        <PasswordInput source="password" />
        <TextInput source="department" />
        <ReferenceInput source="position_id" reference="staff-position" />
        <TextInput source="bio" multiline resettable />
      </SimpleForm>
    </Create>
  );
};
