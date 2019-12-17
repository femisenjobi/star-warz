import { actionTypes } from "../actions/actionTypes";
import { sortObjectArray } from "../utility/sorter";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_DETAILS: {
      const { characters: all, movie: { characters: list } } = action;
      let totalHeight = 0;
      const characters = all.filter(character => {
        const inMovie = list.includes(character.url);
        if (inMovie) totalHeight += +character.height;
        return inMovie;
      });
      const totalHeightInches = totalHeight / 2.54;
      const totalHeightFeet = totalHeightInches / 12;
      const remHeightInches = totalHeightInches % 12;

      return { characters, totalHeight, totalHeightFeet, remHeightInches };
    }
    case actionTypes.SORT_CHARACTERS: {
      const { key } = action;      
      const { characters, sortState, key: oldKey } = state;      
      return {
        ...state,
        ...sortObjectArray({ characters, key, oldKey, sortState }),
        key,
      };
    }
    case actionTypes.FILTER_CHARACTERS_BY_GENDER:
      return state;
    default:
      return state;
  }
}
