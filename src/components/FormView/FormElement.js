import HeaderElement from './Header';
import SubHeader from './SubHeader';
import Separator from './Separator';
import Number from './Number.js';
import Phone from './Phone.js';
import Date from './Date.js';
import Time from './Time.js';
import DateTime from './DateTime.js';
import File from './File.js';
import Text from './Text.js';
import Email from './Email.js';
import Address from './Address.js';
import Checkbox from './Checkbox.js';
import List from './List.js';
import Money from './Money.js';
import Table from './Table';
import Decimal from './Decimal';

const ElementComponent = (props) => {
  const {
    element: { type }
  } = props;
  if (type === 'header') {
    return <HeaderElement {...props} />;
  }
  if (type === 'subheader') {
    return <SubHeader {...props} />;
  }
  if (type === 'separator') {
    return <Separator {...props} />;
  }
  if (type === 'number') {
    return <Number {...props} />;
  }
  if (type === 'decimal') {
    return <Decimal {...props} />;
  }
  if (type === 'phone') {
    return <Phone {...props} />;
  }
  if (type === 'date') {
    return <Date {...props} />;
  }
  if (type === 'time') {
    return <Time {...props} />;
  }
  if (type === 'datetime') {
    return <DateTime {...props} />;
  }
  if (type === 'file') {
    return <File {...props} />;
  }
  if (type === 'text') {
    return <Text {...props} />;
  }
  if (type === 'email') {
    return <Email {...props} />;
  }
  if (type === 'address') {
    return <Address {...props} />;
  }
  if (type === 'checkbox') {
    return <Checkbox {...props} />;
  }
  if (type === 'select') {
    return <List {...props} />;
  }
  if (type === 'money') {
    return <Money {...props} />;
  }
  if (type === 'table') {
    return <Table {...props} />;
  }
  return null;
};

const FormElement = ({ index, element, setValidElement, setValueElement, acceso }) => {
  return (
    <ElementComponent
      index={index}
      element={element}
      setValidElement={setValidElement}
      setValueElement={setValueElement}
      acceso={acceso}
    />
  );
};

export default FormElement;
