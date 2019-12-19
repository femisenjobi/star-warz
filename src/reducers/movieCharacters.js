import { actionTypes } from "../actions/actionTypes";
import { sortObjectArray } from "../utility/sorter";
import { filterObjectArray } from "../utility/filter";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_CHARACTER: {
      const newState = state;      
      newState[action.id] = action.character;
      return newState;
    }
    case actionTypes.ADD_CACHED_CHARACTERS: {
      // const newState = state.concat(action.movieCharacters);
      // return filterObjectArray(newState);
      return state
    }
    case actionTypes.REFRESH_MOVIE_CHARACTERS:
      return []
    case actionTypes.LOAD_DETAILS: {
      const {
        characters: all,
        movie: { characters: list }
      } = action;
      let totalHeight = 0;
      let filters = [];
      const characters = all.filter(character => {
        const inMovie = list.includes(character.url);
        if (inMovie) totalHeight += +character.height;
        if (inMovie && !filters.includes(character.gender))
          filters.push(character.gender);
        return inMovie;
      });
      const totalHeightInches = totalHeight / 2.54;
      const totalHeightFeet = Math.round(totalHeightInches / 12);
      const remHeightInches = Math.round(totalHeightInches % 12);

      return {
        characters,
        totalHeight,
        totalHeightFeet,
        remHeightInches,
        filters
      };
    }
    case actionTypes.SORT_CHARACTERS: {
      const { key } = action;
      const { characters, sortState, key: oldKey } = state;
      return {
        ...state,
        ...sortObjectArray({ characters, key, oldKey, sortState }),
        key
      };
    }
    case actionTypes.FILTER_CHARACTERS_BY_GENDER: {
      return { ...state, ...filterObjectArray(state, action.gender) };
    }
    default:
      return state;
  }
}