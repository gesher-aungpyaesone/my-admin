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
        <ReferenceArrayInput
          source="staff_ids"
          reference="staff"
          filter={{ exclude: 1 }}
        >
          <AutocompleteArrayInput
            label="resources.staff.name"
            optionText={(choice) =>
              `#${choice.id} ${choice.first_name} ${choice.last_name} | ${choice.position.name} | ${choice.department.name}`
            }
          />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  );
};
