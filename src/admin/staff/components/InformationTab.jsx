import { ReferenceInput, SaveButton, TextInput } from 'react-admin';

export const InformationTab = () => {
  return (
    <>
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="email" type="email" />
      <TextInput source="department" />
      <ReferenceInput source="position_id" reference="staff-position" />
      <TextInput source="bio" multiline resettable />
      <SaveButton />
    </>
  );
};
