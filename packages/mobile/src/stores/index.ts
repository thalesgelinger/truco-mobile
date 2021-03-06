import { combineReducers, createStore } from 'redux';

import card from '../assets/images/cards/truco-espada-1.jpg';

type User = {
  id?: string;
  name?: string;
  givenName?: string;
  familyName?: string;
  photoUrl?: string;
  email?: string;
};

interface StateProps {
  user?: User;
  dropArea?: any;
  playerCards?: any[];
  oponentCards?: any[];
  cardsOnTable?: any[];
}

const INITIAL_STATE = {
  dropArea: null,
  playerCards: [
    { id: 1, image: card },
    { id: 2, image: card },
    { id: 3, image: card }
  ],
  oponentCards: [
    { id: 1, image: card },
    { id: 2, image: card },
    { id: 3, image: card }
  ],
  cardsOnTable: []
};

function game(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_DROP_AREA':
      return { ...state, dropArea: action.dropArea };
    case 'DROP_CARD':
      let { cardsOnTable, playerCards }: StateProps = state;
      playerCards[playerCards.indexOf(action.card)] = {};
      cardsOnTable[0] = action.card;
      return { ...state, cardsOnTable, playerCards };
    case 'ADD_USER':
      return { ...state, user: action.user };
    case 'REMOVE_USER':
      return { ...state, user: null };
    default:
      return state;
  }
}

const store = createStore(game);

export default store;
