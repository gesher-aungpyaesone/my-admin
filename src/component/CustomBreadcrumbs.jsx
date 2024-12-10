import { Breadcrumbs, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslate, Link } from 'react-admin';

const CustomBreadcrumbs = () => {
  const { pathname } = useLocation();
  const translate = useTranslate();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const resource = pathSegments[0];
    const id = pathSegments[1];

    const newBreadcrumbs = [
      resource && {
        label: translate(`resources.${resource}.name`),
        href: `/${resource}`,
      },
      id && {
        label: id !== 'create' ? `#${id}` : translate('ra.action.create'),
        href: `/${resource}/${id}`,
      },
    ].filter(Boolean);

    setBreadcrumbs(newBreadcrumbs);
  }, [pathname, translate]);

  if (breadcrumbs.length <= 1) return null;

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) =>
        index === breadcrumbs.length - 1 ? (
          <Typography color="text.primary" key={index}>
            {breadcrumb.label}
          </Typography>
        ) : (
          <Link to={breadcrumb.href} color="inherit" key={index}>
            {breadcrumb.label}
          </Link>
        ),
      )}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
