import {
  DatagridConfigurable,
  DateField,
  List,
  ReferenceField,
  SimpleList,
  TextField,
  useAuthProvider,
} from 'react-admin';

import { useMediaQuery } from '@mui/material';
import { ListActions } from '@component/ListActions';
import { useEffect, useState } from 'react';

export const LanguageList = () => {
  const authProvider = useAuthProvider();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [allowIds, setAllowIds] = useState([]);
  const [isAllowedAll, setIsAllowedAll] = useState(true);

  useEffect(() => {
    const fetchAllowIds = async () => {
      const { allow_ids, is_allowed_all } = await authProvider.getAllowIds({
        resource: 'ads-language',
        action: 'read',
      });
      setAllowIds(allow_ids);
      setIsAllowedAll(is_allowed_all);
    };

    fetchAllowIds();
  }, [authProvider]);

  const filters = allowIds.length > 0 ? { id: allowIds } : {};
  filters['is_allowed_all'] = isAllowedAll ? 1 : 0;

  return (
    <List
      actions={<ListActions />}
      title="resources.ads-language.list"
      filter={filters}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.description}
        />
      ) : (
        <DatagridConfigurable bulkActionButtons={false}>
          <TextField padding={'0px 4px'} source="id" />
          <TextField source="name" />
          <TextField source="description" />
          <DateField
            source="created_at.seconds.low"
            label="resources.ads-language.fields.created_at"
            showTime
            sortBy="created_at"
            transform={(value) => new Date(value * 1000)}
          />
          <DateField
            source="updated_at.seconds.low"
            label="resources.ads-language.fields.updated_at"
            showTime
            sortBy="updated_at"
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
        </DatagridConfigurable>
      )}
    </List>
  );
};
