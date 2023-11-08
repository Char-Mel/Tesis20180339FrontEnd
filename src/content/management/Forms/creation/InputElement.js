const LABELS = {
  number: 'Ingrese un valor numérico',
  decimal: 'Ingrese un valor decimal',
  phone: 'Ingrese número telefónico',
  date: 'Ingrese fecha',
  time: 'Ingrese hora',
  datetime: 'Ingrese fecha y hora',
  file: 'Cargue uno o más archivos',
  text: 'Ingrese un texto',
  email: 'Ingrese un correo',
  address: 'Ingrese una dirección',
  checkbox: 'Marque la casilla',
  select: 'Seleccione una opción',
  table: 'Complete la siguiente tabla',
  money: 'Ingrese un valor monetario',
  computed: 'Ingrese una fórmula de los valores anteriores',
  symbol: 'Ingrese un símbolo'
};

class InputElement {
  constructor({ id, type }) {
    this.id = id;
    this.type = type;
    this.label = LABELS[type];
    this.placeholder = '';
    this.decimals = 0;
    this.minValue = '';
    this.maxValue = '';
    this.step = 1;
    this.options = [];
    this.columns = [];
    this.formula = '';
    this.required = true;
  }
}

export default InputElement;
