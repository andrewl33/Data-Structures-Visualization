export default class FormInput {
  private name: string;
  private method: Function;
  private id: string;
  private textInput: string;

  constructor(name: string, method: Function, id: string) {
    this.name = name;
    this.method = method;
    this.id = id;
    this.textInput = null;
  }

  public methodWrapper(e: Event): void {
    e.preventDefault();
    // handle text value
    const inputLocation: HTMLElement = document.getElementById('form-' + this.name));
    if (inputLocation != null) {
      const value: string = (<HTMLInputElement>inputLocation).value;
      // check if number 
      if (isNaN(<any>value) || value === null || value === '') {
        (<HTMLInputElement>inputLocation).placeholder = 'Enter a number';
      } else {
        const validValue: number = parseInt(value); 
        (<HTMLInputElement>inputLocation).value = '';
        this.method(validValue);
      }
    } else {
      // handle button only
      this.method();
    }

  }
  public renderBtn(): void {
    // get dom
    const form = document.getElementById('enter-form');

    // create html elements
    const button = document.createElement('button');
    const text = document.createTextNode(this.name);

    // add button values
    button.classList.add('form-button');
    button.classList.add('form-buttom-full');
    button.value = this.name;
    button.addEventListener('click', (e)=>this.methodWrapper(e));
    button.appendChild(text);

    // bind to dom
    form.appendChild(button);
  }
  public renderNumIn(): void {
    // get dom
    const form = document.getElementById('enter-form');

    // create html elements
    const input = document.createElement('input');
    const button = document.createElement('button');
    const text = document.createTextNode(this.name);

    // add input values
    input.classList.add('form-input');
    input.type = 'text';
    input.name = this.name;
    input.id =  'form-' + this.name;

    // add button values
    button.classList.add('form-button');
    button.classList.add('form-button-half');
    button.value = this.name;
    button.addEventListener('click', (e)=>this.methodWrapper(e));
    button.appendChild(text);

    // bind to dom
    form.appendChild(input);
    form.appendChild(button);
  }
}