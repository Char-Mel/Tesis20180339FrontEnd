import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Typography,
  styled, Button,
  Card


} from '@mui/material';

import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';


const Results = ({ formData }) => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();




  const handleBack = () => {
    return navigate(
      `/${location.pathname.split('/')[1]}/management/forms/list`
    );
  };

  const EditButton = styled(Button)`
  width : 20px 
  height :10px
  `;




  return (
    <>
      <Card>
        <Divider />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('Tipo')}</TableCell>
                <TableCell>{t('Nombres')}</TableCell>
                <TableCell>{t('Detalles')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.asignaciones.map((user) => {
                return (
                  <TableRow hover key={user._id} >
                    <TableCell>

                      <Box display="flex" alignItems="center">
                        <Box>
                          <Typography>
                            {user.tipo}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography>{user.nombres}</Typography>
                    </TableCell>
                    <TableCell >
                      <Typography fontWeight="bold">
                        {user.detalle}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" flexDirection={"row-reverse"} ml={2}>
          <Box mr={2}>
            <EditButton variant="contained" color="secondary" onClick={handleBack} >
              Volver
            </EditButton>
          </Box>
        </Box>
      </Card>

    </>
  );
};


export default Results;
