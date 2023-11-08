import { useRef, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from 'src/config';

import {
  Avatar,
  Box,
  Button,
  Divider,
  MenuList,
  alpha,
  IconButton,
  MenuItem,
  ListItemText,
  Popover,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
// import Chart from 'react-apexcharts';

// import Text from 'src/components/Text';
// import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';

// const DotLegend = styled('span')(
//   ({ theme }) => `
//     border-radius: 22px;
//     width: ${theme.spacing(1.38)};
//     height: ${theme.spacing(1.4)};
//     display: inline-block;
//     border: ${theme.colors.alpha.white[100]} solid 2px;
// `
// );

const UserBoxButton = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  padding: 0;
  height: ${theme.spacing(4)};
  margin-left: ${theme.spacing(1)};
  border-radius: ${theme.general.borderRadiusLg};
  
  &:hover {
    background: ${theme.colors.primary.main};
  }
`
);

const UserAvatar = styled(Avatar)(
  ({ theme }) => `
        height: 90%;
        width: 90%;
        border-radius: ${theme.general.borderRadiusLg};
`
);

const MenuListWrapperPrimary = styled(MenuList)(
  ({ theme }) => `
  padding: ${theme.spacing(2)};

  & .MuiMenuItem-root {
      border-radius: 50px;
      padding: ${theme.spacing(1, 1, 1, 2.5)};
      min-width: 200px;
      margin-bottom: 2px;
      position: relative;
      color: ${theme.colors.alpha.black[100]};

      &.Mui-selected,
      &:hover,
      &.MuiButtonBase-root:active {
          background: ${theme.colors.primary.lighter};
          color: ${theme.colors.primary.main};
      }

      &:last-child {
          margin-bottom: 0;
      }
    }
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${alpha(theme.colors.alpha.black[100], 0.08)};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.secondary.light}
`
);

function HeaderUserbox() {
  const { t } = useTranslation();
  const theme = useTheme();

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const getUserRoleLabel = (userRole) => {
    const map = {
      admin: {
        text: 'Administrador'
      },
      executer: {
        text: 'Ejecutador'
      },
      viewonly: {
        text: 'Visualizador'
      }
    };

    const { text } = map[userRole];

    return text;
  };
  return (
    <>

      <UserBoxButton color="primary" ref={ref} onClick={handleOpen}>

        <UserAvatar alt={user.nombre} 
        src={`${backendUrl}/files/${user.imagen? user.imagen.filename : ''}`} />

      </UserBoxButton>
      <Box ml= {2}>
        <Typography color={'black'} style={{ fontSize: '16px' }}>
          {user.nombre} {user.apellidoPaterno}
        </Typography>

        <Typography color={'black'} style={{ fontSize: '16px' }}>
          {getUserRoleLabel(user.rol)}
        </Typography>

      </Box>

      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox
          sx={{
            minWidth: 210
          }}
          display="flex"
        >
          <Avatar variant="rounded" alt={user.nombre} src={`${backendUrl}/files/${user.imagen? user.imagen.filename : ''}`} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.nombre} {user.apellidoPaterno}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.rol} 
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider
          sx={{
            mb: 0
          }}
        />
        <MenuListWrapperPrimary disablePadding>
          <MenuItem>
            <ListItemText
              primaryTypographyProps={{
                variant: 'h5'
              }}
              primary={t('Mi cuenta')}
            />
            <ChevronRightTwoToneIcon
              sx={{
                color: `${theme.colors.alpha.black[30]}`,
                opacity: 0.8
              }}
            />
          </MenuItem>
          {/* <MenuItem>
            <ListItemText
              primaryTypographyProps={{
                variant: 'h5'
              }}
              primary={t('Profile settings')}
            />
            <Box display="flex" alignItems="center">
              <DotLegend
                style={{
                  background: `${theme.colors.warning.main}`
                }}
              />
              <ChevronRightTwoToneIcon
                sx={{
                  ml: 1,
                  color: `${theme.colors.alpha.black[30]}`,
                  opacity: 0.8
                }}
              />
            </Box>
          </MenuItem> */}
          {/* <MenuItem>
            <ListItemText
              primaryTypographyProps={{
                variant: 'h5'
              }}
              primary={t('Active tasks')}
            />
            <ChevronRightTwoToneIcon
              sx={{
                color: `${theme.colors.alpha.black[30]}`,
                opacity: 0.8
              }}
            />
          </MenuItem> */}
        </MenuListWrapperPrimary>
        <Divider />
        {/* <Box m={1}>
          <Box px={2} pt={1} pb={0.5} display="flex" alignItems="flex-start">
            <Text color="warning">
              <MonetizationOnTwoToneIcon fontSize="large" />
            </Text>
            <Box ml={1}>
              <Typography variant="h3">$14,264</Typography>
              <Typography noWrap variant="subtitle2">
                {t('total value')}
              </Typography>
            </Box>
          </Box>
          <Chart
            options={Box1Options}
            series={Box1Data}
            type="line"
            height={60}
          />
        </Box> */}
        <Divider />
        <Box m={1}>
          <Button color="primary" fullWidth onClick={handleLogout}>
            <LockOpenTwoToneIcon
              sx={{
                mr: 1
              }}
            />
            {t('Sign out')}
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
