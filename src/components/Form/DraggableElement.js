import { Box, IconButton } from '@mui/material';
import HeaderElement from './HeaderElement';
import SubHeaderElement from './SubHeaderElement';
import SeparatorElement from './SeparatorElement';
import TextElement from './TextElement';
import NumberElement from './NumberElement';
import DecimalElement from './DecimalElement';
import DateElement from './DateElement';
import TimeElement from './TimeElement';
import DateTimeElement from './DateTimeElement';
import FileElement from './FileElement';
import EmailElement from './EmailElement';
import AddressElement from './AddressElement';
import CheckboxElement from './CheckboxElement';
import ListElement from './ListElement';
import MoneyElement from './MoneyElement';
import PhoneElement from './PhoneElement';

import DeleteIcon from '@mui/icons-material/Delete';
import TableElement from './TableElement';

const ElementComponent = (props) => {
  const {
    element: { type }
  } = props;

  if (type === 'header') {
    return <HeaderElement {...props} />;
  }
  if (type === 'subheader') {
    return <SubHeaderElement {...props} />;
  }
  if (type === 'separator') {
    return <SeparatorElement {...props} />;
  }
  if (type === 'text') {
    return <TextElement {...props} />;
  }
  
  if (type === 'number') {
    return <NumberElement {...props} />;
  }
  if (type === 'decimal') {
    return <DecimalElement {...props} />;
  }
  if (type === 'date') {
    return <DateElement {...props} />;
  }
  if (type === 'time') {
    return <TimeElement {...props} />;
  }
  if (type === 'datetime') {
    return <DateTimeElement {...props} />;
  }
  if (type === 'file') {
    return <FileElement {...props} />;
  }
  if (type === 'email') {
    return <EmailElement {...props} />;
  }
  if (type === 'address') {
    return <AddressElement {...props} />;
  }
  if (type === 'checkbox') {
    return <CheckboxElement {...props} />;
  }
  if (type === 'select') {
    return <ListElement {...props} />;
  }
  if (type === 'money') {
    return <MoneyElement {...props} />;
  }
  if (type === 'phone') {
    return <PhoneElement {...props} />;
  }
  if (type === 'table') {
    return <TableElement {...props} />;
  }
  return null;
};

const DraggableElement = ({ element, updateElement, index, deleteElement }) => {
  const handleDeleteElement = () => deleteElement(index);

  return (
    <Box
      sx={{
        p: 2,
        borderColor: '#000',
        border: 1,
        borderRadius: 1,
        position: 'relative'
      }}
    >
      <ElementComponent
        element={element}
        index={index}
        updateElement={updateElement}
      />
      <Box sx={{ position: 'absolute', bottom: 0, right: 0, px: 2, py: 0.5 }}>
        <IconButton size="medium" onClick={handleDeleteElement}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DraggableElement;
