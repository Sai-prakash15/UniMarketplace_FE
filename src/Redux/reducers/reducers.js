import { Action } from "../constants";
const initialState = {
   isLoading: false,
   productList: null
};
export const productReducer = (state = initialState, action) => {
    switch (action.type) {
       case Action.FETCH_DATA : 
         return {
             ...state,
             isLoading: true
         };
         break;
       case Action.LIST_FETCHED : 
         return {
             ...state,
             productList: action.data
         };
         break;

      case Action.CATEGORIES_FETCHED : 
         return {
             ...state,
             categories: action.data
         };
         break;

       case Action.API_CALLED :  
         return {
             ...state,
             isLoading: false
         };
         break;     
       default : 
        return state;
    }
};