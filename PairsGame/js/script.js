/* eslint-disable comma-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable operator-linebreak */
/* eslint-disable no-loop-func */
/* eslint-disable no-shadow */
// eslint-disable-next-line import/extensions, import/no-named-as-default
import { AmazingCard } from './Card.js';

function createForm() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');

  form.classList.add('form');
  input.classList.add('input');
  input.placeholder = 'Введите размер поля (от 1 до 4 строк):';
  button.classList.add('button');
  button.textContent = 'НАЧАТЬ ИГРУ';
  button.disabled = true;

  input.addEventListener('input', () => {
    if (input.value !== '') {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });

  form.append(input);
  form.append(button);

  return {
    form,
    input,
    button,
  };
}

function randomNumber(count) {
  let numberArray = [];

  for (let i = 1; i <= count / 2; i++) {
    numberArray.push(i);
    numberArray.push(i);
  }

  numberArray = numberArray.sort(() => Math.random() - 0.5);

  return numberArray;
}

function newGame(container, cardsList) {
  const newGameForm = createForm();
  let cardsArray = [];
  let cardsOpen = [];

  container.append(newGameForm.form);

  newGameForm.input.addEventListener('input', () => {
    newGameForm.input.value = newGameForm.input.value.replace(/\D/g, '');
  });

  newGameForm.form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (newGameForm.input.value > 4 || newGameForm.input.value < 1) {
      newGameForm.input.value = '';
      throw new Error('Значение должно быть числом от 1 до 4');
    }

    const numberArray = randomNumber(newGameForm.input.value * 4);

    for (const number of numberArray) {
      const card = new AmazingCard(cardsList, number, (card) => {
        card.open = true;

        if (cardsOpen.length < 2) {
          cardsOpen.push(card);
        }

        if (
          cardsOpen.length === 2 &&
          cardsOpen[0].cardNumber === cardsOpen[1].cardNumber
        ) {
          if (cardsOpen[0].id !== card.id) {
            cardsArray.forEach((card) => {
              if (card.open) {
                card.success = true;
              }
            });
          } else if (cardsOpen[0].id === card.id) {
            card.open = false;
          }

          cardsOpen = [];
        } else if (
          cardsOpen.length === 2 &&
          cardsOpen[0].cardNumber !== cardsOpen[1].cardNumber
        ) {
          cardsArray.forEach((card) => {
            if (card.open && !card.success) {
              setTimeout(() => {
                card.open = false;
              }, 600);
            }
          });

          cardsOpen = [];
        }

        if (!cardsArray.find((card) => card.success === false)) {
          setTimeout(() => {
            alert('Победа!!!');
            document.getElementById('game').innerHTML = '';
            cardsArray = [];

            newGame(
              document.getElementById('container'),
              document.getElementById('game')
            );
          }, 300);
        }
      });

      cardsArray.push(card);
    }

    newGameForm.button.classList.add('button-active');
    newGameForm.input.classList.add('input-active');
  });
}

newGame(document.getElementById('container'), document.getElementById('game'));
