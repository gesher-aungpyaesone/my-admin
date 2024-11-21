import {
  DateField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';

export const StaffPositionShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <DateField
        source="created_at.seconds.low"
        label="Created At"
        showTime
        transform={(value) => new Date(value * 1000)}
      />
      <DateField
        source="updated_at.seconds.low"
        label="Updated At"
        showTime
        transform={(value) => new Date(value * 1000)}
      />
      <ReferenceField source="created_by_id" reference="user" link={false}>
        <TextField source="staff.first_name" />{' '}
        <TextField source="staff.last_name" />
      </ReferenceField>
      <ReferenceField source="updated_by_id" reference="user" link={false}>
        <TextField source="staff.first_name" />{' '}
        <TextField source="staff.last_name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);
