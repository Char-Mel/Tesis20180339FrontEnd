
import BackupTableTwoToneIcon from '@mui/icons-material/BackupTableTwoTone';
import SchemaTwoToneIcon from '@mui/icons-material/SchemaTwoTone';
import DonutLargeTwoToneIcon from '@mui/icons-material/DonutLargeTwoTone';

const menuItems = [
  {
    heading: 'Menu',
    items: [
      {
        name: 'Formularios',
        icon: BackupTableTwoToneIcon,
        link: 'management/groups/list',
        items: [
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
