import { SaveButton, TextInput } from 'react-admin';

export const InformationTab = () => {
  return (
    <>
      <TextInput source="name" />
      <TextInput source="description" />
      <SaveButton />
    </>
  );
};
