import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Management

const Users = Loader(lazy(() => import('src/content/management/Users')));
const SingleUser = Loader(
  lazy(() => import('src/content/management/Users/single'))
);

const Flows = Loader(lazy(() => import('src/content/management/Flows')));
const Forms = Loader(lazy(() => import('src/content/management/Forms')));

const FormRegister = Loader(
  lazy(() => import('src/content/management/Forms/register'))
);
const FormCreation = Loader(
  lazy(() => import('src/content/management/Forms/creation'))
);
const AssigmentForm = Loader(
  lazy(() => import('src/content/management/Forms/assigment'))
);
const DoneForm = Loader(
  lazy(() => import('src/content/management/Forms/done'))
);

const SingleForm = Loader(
  lazy(() => import('src/content/management/Forms/single'))
);
const SubmittedForm = Loader(
  lazy(() => import('src/content/management/Forms/submitted'))
);

const Predefvalues = Loader(
  lazy(() => import('src/content/management/PredefinedValues'))
);
const Singlepredefvalues = Loader(
  lazy(() => import('src/content/management/PredefinedValues/single'))
);

const Groups = Loader(lazy(() => import('src/content/management/Groups')));
const SingleGroup = Loader(
  lazy(() => import('src/content/management/Groups/single'))
);

const Projects = Loader(lazy(() => import('src/content/management/Projects')));
const Invoices = Loader(lazy(() => import('src/content/management/Invoices')));
const SingleInvoice = Loader(
  lazy(() => import('src/content/management/Invoices/single'))
);
const Products = Loader(lazy(() => import('src/content/management/Products')));
const CreateProduct = Loader(
  lazy(() => import('src/content/management/Products/create'))
);
const SingleProduct = Loader(
  lazy(() => import('src/content/management/Products/single'))
);
const Shop = Loader(lazy(() => import('src/content/management/Products/shop')));

const FlowRegister = Loader(lazy(() => import('src/content/management/Flows/register')));
const SingleFlow = Loader(lazy(() => import('src/content/management/Flows/single')));
const AssigmentFlow = Loader(lazy(() => import('src/content/management/Flows/assigments')));
const ResponsesFlow = Loader(lazy(() => import('src/content/management/Flows/responses')));
const SingleFormConf = Loader(lazy(() => import('src/content/management/Forms/singleConf')));
const ExampleLoader = Loader(lazy(() => import('src/content/management/Forms/example')));

const managementRoutes = [
  {
    path: '',
    element: <Navigate to="users" replace />
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <Users />
      },
      {
        path: 'single',
        children: [
          {
            path: ':_id',
            element: <SingleUser />
          }
        ]
      }
    ]
  },

  {
    path: 'groups',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <Groups />
      },
      {
        path: 'single',
        children: [
          {
            path: ':_id',
            element: <SingleGroup />
          }
        ]
      }
      
    ]
  },

  {
    path: 'flows',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <Flows />
      },
      {
        path:'register',
        element: <FlowRegister/>
      },
      {
        path:'assigments',
        element: <AssigmentFlow/>
      },

      {
        path:'responses',
        children:[
          {
            path: ':_id',
            element: <ResponsesFlow/>
          }
        ]
        
      },
      
      {
        path: 'single',
        children: [
          {
            path: ':_id',
            element: <SingleFlow />
          }
        ]
      }
    ]
  },

  {
    path: 'forms',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <Forms />
      },
      {
        path: 'example',
        element: <ExampleLoader />
      },
      {
        path: 'register',
        element: <FormRegister />
      },
      {
        path: 'creation',
        element: <FormCreation />
      },
      {
        path: 'assigment',
        element: <AssigmentForm />
      },
      {
        path: 'done',
        element: <DoneForm />
      },
      {
        path: 'single',
        children: [
          {
            path: ':formId',
            element: <SingleForm />
          }
        ]
      },
      {
        path: 'submitted',
        children: [
          {
            path: ':id',
            element: <SubmittedForm />
          }
        ]
      },
      {
        path: 'singleConf',
        children: [
          {
            path: ':formId',
            element: <SingleFormConf />
          }
        ]
      },
    ]
  },

  {
    path: 'predefval',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <Predefvalues />
      },
      {
        path: 'single',
        children: [
          {
            path: ':predefinedValueID',
            element: <Singlepredefvalues />
          }
        ]
      }
    ]
  },

  {
    path: 'projects',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <Projects />
      }
    ]
  },
  {
    path: 'commerce',
    children: [
      {
        path: '',
        element: <Navigate to="shop" replace />
      },
      {
        path: 'shop',
        element: <Shop />
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            element: <Navigate to="list" replace />
          },
          {
            path: 'list',
            element: <Products />
          },
          {
            path: 'create',
            element: <CreateProduct />
          },
          {
            path: 'single',
            children: [
              {
                path: ':productId',
                element: <SingleProduct />
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'invoices',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <Invoices />
      },
      {
        path: 'single',
        children: [
          {
            path: '',
            element: <Navigate to="1" replace />
          },
          {
            path: ':invoiceId',
            element: <SingleInvoice />
          }
        ]
      }
    ]
  }
];

export default managementRoutes;
