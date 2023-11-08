import { Helmet } from 'react-helmet-async';
 import ControlRegister from './ControlRegister';
import SoporteRegister from './SoporteRegister';
import SolicitudRegister from './SolicitudRegister';
import Header from './Header';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useState } from 'react';



function ManagementRegister() {

    const [flowType, setFlowType] = useState(
        {
            nombre: '',
            descripcion: '',
            tipo: 'control'
        }
    )

    const updateFlowType = (campo, newValue) => {
        setFlowType(prevState => ({
            ...prevState,
            [campo]: newValue
        }));
    }

    const renderComponent = () => {
        
        switch (flowType.tipo) {
            case 'control':
                return <ControlRegister flowType={flowType}/>;
            case 'solicitud':
                return <SolicitudRegister flowType={flowType}/>;
            case 'soporte':
                return <SoporteRegister flowType={flowType}/>;
            default:
                return null;
        }
    }

    return (
        <>
            <Helmet>
                <title>Registro de flujo</title>
            </Helmet>
            <PageTitleWrapper>
                <Header flowType={flowType} updateFlowType={updateFlowType} />
                {renderComponent()}
            </PageTitleWrapper>

        </>
    );
}

export default ManagementRegister;
