// import AnalyticsTwoToneIcon from '@mui/icons-material/AnalyticsTwoTone';
// import HealthAndSafetyTwoToneIcon from '@mui/icons-material/HealthAndSafetyTwoTone';
// import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
// import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
// import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
// import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
// import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
// import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
// import SupportTwoToneIcon from '@mui/icons-material/SupportTwoTone';
// import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
// import BackupTableTwoToneIcon from '@mui/icons-material/BackupTableTwoTone';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import BackupTableTwoToneIcon from '@mui/icons-material/BackupTableTwoTone';
import SchemaTwoToneIcon from '@mui/icons-material/SchemaTwoTone';
import DonutLargeTwoToneIcon from '@mui/icons-material/DonutLargeTwoTone';
// import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';

const menuItems = [
  {
    heading: 'Menu',
    items: [
      {
        name: 'Usuarios',
        icon: PersonTwoToneIcon,
        link: 'management/users/list'
      },
      {
        name: 'Grupos',
        icon: GroupTwoToneIcon,
        link: 'management/groups/list'
      },
      {
        name: 'Formularios',
        icon: BackupTableTwoToneIcon,
        link: 'management/groups/list',
        items: [
          {
            name: 'Listar',
            link: 'management/forms/list'
          },
          {
            name: 'Asignaciones',
            link: 'management/forms/assigment'
          },
          {
            name: 'Enviados',
            link: 'management/forms/done'
          }
        ]
      },
      {
        name: 'Flujos',
        icon: SchemaTwoToneIcon,
        link: '',
        items: [
          {
            name: 'Listar',
            link: 'management/flows/list'
          },
          {
            name: 'Aprobaciones',
            link: 'management/flows/assigments'
          }
        ]
      },
      {
        name: 'Datos Almacenados',
        icon: DonutLargeTwoToneIcon,
        link: 'management/predefinedvalues/list'
      }
    ]
  }
];

export default menuItems;
