class UiElement {
  constructor({ id, type }) {
    this.id = id;
    this.type = type;
    if (type === 'header') {
      this.label = 'Título';
    } else if (type === 'subheader') {
      this.label = 'Subtítulo';
    }
    this.margin = '4';
    this.image = {
      filename: '',
      originalname: ''
    };
  }
}

export default UiElement;
