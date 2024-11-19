import { Edit, SimpleForm, TextInput, ReferenceInput } from 'react-admin';

export const StaffEdit = () => {
  const transform = (data) => {
    if (data.user_id) delete data.user_id;
    if (data.password) delete data.password;
    if (data.created_at) delete data.created_at;
    if (data.updated_at) delete data.updated_at;
    if (data.deleted_at) delete data.deleted_at;
    if (data.created_by_id) delete data.created_by_id;
    if (data.updated_by_id) delete data.updated_by_id;
    return data;
  };

  return (
    <Edit transform={transform} mutationMode="pessimistic">
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="first_name" />
        <TextInput source="last_name" />
        <TextInput source="email" />
        <TextInput source="department" />
        <ReferenceInput source="position_id" reference="staff-position" />
        <TextInput source="bio" multiline resettable />
      </SimpleForm>
    </Edit>
  );
};
