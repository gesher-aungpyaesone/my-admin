import {
  DateField,
  EmailField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';

export const StaffShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <EmailField source="email" />
      <TextField source="department" />
      <ReferenceField source="position_id" reference="staff-position" />
      <TextField source="bio" />
      <DateField
        source="created_at.seconds.low"
        label="resources.staff.fields.created_at"
        showTime
        transform={(value) => new Date(value * 1000)}
      />
      <DateField
        source="updated_at.seconds.low"
        label="resources.staff.fields.updated_at"
        showTime
        transform={(value) => new Date(value * 1000)}
      />
      <NumberField source="created_by_id" />
      <NumberField source="updated_by_id" />
    </SimpleShowLayout>
  </Show>
);
