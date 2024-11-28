import {
  SimpleForm,
  TextInput,
  Create,
  ReferenceArrayInput,
  AutocompleteArrayInput,
} from 'react-admin';

export const GroupCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" />
        <ReferenceArrayInput source="staff_ids" reference="staff">
          <AutocompleteArrayInput
            optionText={(choice) => `${choice.first_name} ${choice.last_name}`}
          />
        </ReferenceArrayInput>
        <ReferenceArrayInput source="permission_ids" reference="permission">
          <AutocompleteArrayInput
            optionText={(choice) =>
              `[${choice.resource.name}] ${choice.type.name}`
            }
          />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  );
};
