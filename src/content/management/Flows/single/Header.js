import React from 'react';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Typography,
    TextField,
    Autocomplete,
    styled,
    Button
} from '@mui/material';

const EditButton = styled(Button)`
width : 40px 

`;

const Header = ({flow,updateFlowType,editable,setEditable} ) => {


    const { t } = useTranslation();
    const getLabelType=(valor)=>{
        if(valor === 'control')
            return "Control"
         if(valor === 'solicitud')
            return "Solicitud"
         if (valor === 'soporte')
            return "Soporte"
        return "No se encuentra"    
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFlowType(name,value)
    };
    const toggleEdit = () => {
        setEditable(!editable);
      };

    

    return (
        <>
            <Box display="flex" ml={3} flexDirection={"column"} >
                <Box display={"flex"} flexDirection={"row"}>
                    <Typography variant="h1" mb={2}>
                        {t('Editar flujo')}
                    </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"row-reverse"} alignItems={"right"}>
                    <EditButton variant="contained" color="primary" onClick={toggleEdit} startIcon={<EditIcon style={{ fontSize: 15 }} />}>
                        Editar
                    </EditButton>
                </Box>
                


                
                <Box display={"flex"} flexDirection={"row"}>
                    <Box display={"flex"} flexDirection={"column"} mr={8} mb={6}>
                        <Typography variant='h4' >
                            {t('Nombre del flujo')}
                        </Typography>
                        <TextField   
                            value = {flow.nombre}
                            onChange={handleChange}
                            name="nombre"
                            variant="outlined"
                            style={{ width: '350px' }}
                            disabled={!editable}
                        />
                        <Typography variant='h4' mt={3}>
                            {t('Tipo de flujo')}
                        </Typography>
                        <Autocomplete
                            disablePortal
                            disabled
                            value ={getLabelType(flow.tipo)}
                            options={[
                                { label: "Control", value: "control" },
                                { label: "Solicitud", value: "solicitud" },
                                { label: "Soporte", value: "soporte" }
                            ]}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    style={{ width: '200px' }}
                                    {...params}
                                    disabled
                                />
                            )}
                        />
                    </Box>
                    <Box >
                        <Typography variant='h4'>
                            {t('Descripción del flujo')}
                        </Typography>
                        <TextField
                        value={flow.descripcion}
                            rows={6}
                            multiline
                            onChange={handleChange}
                            name="descripcion"
                            variant="outlined"
                            style={{ width: '350px' }}
                            disabled={!editable}
                        />
                    </Box>
                </Box>
            </Box>

        </>
    );
};
export default Header;
