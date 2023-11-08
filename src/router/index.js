import Authenticated from 'src/components/Authenticated';
// import { Navigate } from 'react-router-dom';

// import BoxedSidebarLayout from 'src/layouts/BoxedSidebarLayout';
import DocsLayout from 'src/layouts/DocsLayout';
import BaseLayout from 'src/layouts/BaseLayout';
// import AccentHeaderLayout from 'src/layouts/AccentHeaderLayout';
// import AccentSidebarLayout from 'src/layouts/AccentSidebarLayout';
// import CollapsedSidebarLayout from 'src/layouts/CollapsedSidebarLayout';
// import BottomNavigationLayout from 'src/layouts/BottomNavigationLayout';
// import TopNavigationLayout from 'src/layouts/TopNavigationLayout';
import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';

import dashboardsRoutes from './dashboards';
import blocksRoutes from './blocks';
import applicationsRoutes from './applications';
import managementRoutes from './management';
import documentationRoutes from './documentation';
import accountRoutes from './account';
import baseRoutes from './base';

const router = [
  {
    path: 'account',
    children: accountRoutes
  },
  {
    path: '/',
    element: <BaseLayout />,
    children: baseRoutes
  },

  // Documentation

  {
    path: 'docs',
    element: <DocsLayout />,
    children: documentationRoutes
  },

  {
    path: 'extended-sidebar',
    element: (
      <Authenticated>
        <ExtendedSidebarLayout />
      </Authenticated>
    ),
    children: [
      {
        path: 'dashboards',
        children: dashboardsRoutes
      },
      {
        path: 'blocks',
        children: blocksRoutes
      },
      {
        path: 'applications',
        children: applicationsRoutes
      },
      {
        path: 'management',
        children: managementRoutes
      }
    ]
  }
];

export default router;
