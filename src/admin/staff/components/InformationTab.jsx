import {
  AutocompleteInput,
  ReferenceInput,
  SaveButton,
  TextInput,
} from 'react-admin';

export const InformationTab = () => {
  return (
    <>
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="email" type="email" />
      <ReferenceInput source="department_id" reference="staff-department">
        <AutocompleteInput
          optionText={(choice) => `#${choice.id} ${choice.name}`}
        />
      </ReferenceInput>
      <ReferenceInput source="position_id" reference="staff-position">
        <AutocompleteInput
          optionText={(choice) => `#${choice.id} ${choice.name}`}
        />
      </ReferenceInput>
      <TextInput source="bio" multiline resettable />
      <SaveButton />
    </>
  );
};
