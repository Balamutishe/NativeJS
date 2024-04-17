/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
export class Card {
  constructor(container, cardNumber, flip) {
    this.container = container;
    this.card = this.createElement();
    this.cardNumber = cardNumber;
    this.flip = flip;

    this.open = false;
    this.success = false;
    this.id = crypto.randomUUID();

    this.container.append(this.card);
  }

  createElement() {
    const cardElement = document.createElement('div');

    cardElement.classList.add('card');

    cardElement.addEventListener('click', () => {
      this.flip(this);
    });

    return cardElement;
  }

  set cardNumber(value) {
    this._cardNumber = value;

    if (this.card) {
      this.card.textContent = value;
    }
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    this._open = value;

    value
      ? this.card.classList.add('card-open')
      : this.card.classList.remove('card-open');
  }

  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;

    value
      ? this.card.classList.add('card-success')
      : this.card.classList.remove('card-success');
  }

  get success() {
    return this._success;
  }
}

export class AmazingCard extends Card {
  appendCardImage(value) {
    const img = document.createElement('img');
    img.classList.add('card-img');
    img.src = `../img/${value}.jpg`;

    img.onload = () => this.card.append(img);
    img.onerror = () => {
      img.src = '../img/error-image.jpg';
      this.card.append(img);
    };
  }

  set cardNumber(value) {
    this._cardNumber = value;

    if (this.card) this.appendCardImage(value);
  }

  get cardNumber() {
    return this._cardNumber;
  }
}
