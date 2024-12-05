import { Edit, TabbedForm, useAuthProvider, useGetRecordId } from 'react-admin';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InformationTab } from './components/InformationTab';
import { MemberTab } from './components/MemberTab';
import { HistoryTab } from './components/HistoryTab';

export const StaffDepartmentEdit = () => {
  const recordId = useGetRecordId();
  const authProvider = useAuthProvider();
  const navigate = useNavigate();
  const transform = (data) => {
    if (data.created_at) delete data.created_at;
    if (data.updated_at) delete data.updated_at;
    if (data.deleted_at) delete data.deleted_at;
    if (data.created_by_id) delete data.created_by_id;
    if (data.updated_by_id) delete data.updated_by_id;
    return data;
  };

  useEffect(() => {
    const fetchAllowIds = async () => {
      const ids = await authProvider.getAllowIds({
        resource: 'staff-department',
        action: 'read',
      });
      if (recordId && ids.length && !ids.includes(+recordId)) {
        navigate('/access-denied');
      }
    };

    fetchAllowIds();
  }, [authProvider, recordId, navigate]);

  return (
    <Box>
      <Edit transform={transform} mutationMode="pessimistic">
        <TabbedForm toolbar={false}>
          <TabbedForm.Tab label="resources.staff-department.tabs.info">
            <InformationTab />
          </TabbedForm.Tab>
          <TabbedForm.Tab label="resources.staff-department.tabs.member">
            <MemberTab />
          </TabbedForm.Tab>
          <TabbedForm.Tab label="resources.staff-department.tabs.history">
            <HistoryTab />
          </TabbedForm.Tab>
        </TabbedForm>
      </Edit>
    </Box>
  );
};
