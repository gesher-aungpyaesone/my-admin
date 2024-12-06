import PropTypes from 'prop-types';
import { useRecordContext } from 'react-admin';

export const AllowIdUrlField = ({ source }) => {
  const record = useRecordContext();
  if (!record) return null;
  if (record['is_allowed_all']) return <div>All</div>;
  if (!record[source]) return <div>Owned</div>;
  const ids = record[source];
  const resourceName = record.permission.resource.name;
  const typeName = record.permission.type.name;
  const links = [
    <div key="owned" style={{ marginRight: '4px' }}>
      Owned and
    </div>,
    ...ids.map((id) => (
      <a
        key={id}
        href={
          typeName === 'read'
            ? `/#/${resourceName}`
            : `/#/${resourceName}/${id}`
        }
        style={{ marginRight: '4px' }}
      >{`#${id}`}</a>
    )),
  ];
  return links;
};
AllowIdUrlField.propTypes = {
  source: PropTypes.string.isRequired,
};
