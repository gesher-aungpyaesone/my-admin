import { SimpleForm, TextInput, Create, useDefaultTitle } from 'react-admin';

export const TargetCreate = () => {
  const title = useDefaultTitle();
  return (
    <Create>
      <SimpleForm>
        <span>{title}</span>
        <TextInput source="name" />
        <TextInput source="description" />
      </SimpleForm>
    </Create>
  );
};
