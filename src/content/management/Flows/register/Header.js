import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Typography,
    TextField,
    Autocomplete
} from '@mui/material';


const Header = ({flowType,updateFlowType} ) => {

    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
    });

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
        setFormData({ ...formData, [name]: value });
        updateFlowType(name,value)
    };


    return (
        <>
            <Box display="flex" ml={3} flexDirection={"column"} >
                <Box display={"flex"} flexDirection={"row"}>
                    <Typography variant="h1" mb={2}>
                        {t('Crear nuevo flujo')}
                    </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"row"}>
                    <Box display={"flex"} flexDirection={"column"} mr={8} mb={6}>
                        <Typography variant='h4' >
                            {t('Nombre del flujo')}
                        </Typography>
                        <TextField
                            onChange={handleChange}
                            name="nombre"
                            variant="outlined"
                            style={{ width: '350px' }}
                        />
                        <Typography variant='h4' mt={3}>
                            {t('Tipo de flujo')}
                        </Typography>
                        <Autocomplete
                        value={getLabelType(flowType.tipo)}
                            disablePortal
                            options={[
                                { label: "Control", value: "control" },
                                { label: "Solicitud", value: "solicitud" },
                                { label: "Soporte", value: "soporte" }
                            ]}
                            onChange={(event, newValue) => {
                                updateFlowType('tipo',newValue.value);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    style={{ width: '200px' }}
                                    {...params}
                                />
                            )}
                        />
                    </Box>
                    <Box >
                        <Typography variant='h4'>
                            {t('Descripción del flujo')}
                        </Typography>
                        <TextField
                            rows={6}
                            multiline
                            onChange={handleChange}
                            name="descripcion"
                            variant="outlined"
                            style={{ width: '350px' }}
                        />
                    </Box>
                </Box>
            </Box>

        </>
    );
};


export default Header;
