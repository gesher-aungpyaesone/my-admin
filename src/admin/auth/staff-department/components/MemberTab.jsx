import {
  Datagrid,
  DateField,
  EmailField,
  Pagination,
  ReferenceManyField,
  TextField,
} from 'react-admin';

export const MemberTab = () => {
  return (
    <>
      <ReferenceManyField
        reference="staff"
        target="department_id"
        pagination={<Pagination sx={{ width: '100%' }} />}
      >
        <Datagrid bulkActionButtons={false} sx={{ width: '100%' }}>
          <TextField source="id" />
          <TextField source="first_name" />
          <TextField source="last_name" />
          <EmailField source="email" />
          <TextField
            sortBy="position_id"
            source="position.name"
            label="resources.staff.fields.position_id"
          />
          <DateField
            sortBy="created_at"
            label="resources.staff.fields.created_at"
            source="created_at.seconds.low"
            showTime
            transform={(value) => new Date(value * 1000)}
          />
        </Datagrid>
      </ReferenceManyField>
    </>
  );
};
