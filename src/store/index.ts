import { createStore, combineReducers } from "redux";

// Define interfaces for Hotel and Category
interface Hotel {
  id: string;
  name: string;
  country: string;
  address: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

// Define the shape of the application state
interface AppState {
  hotels: Hotel[];
  categories: Category[];
}

// Define action types as constants
const ADD_HOTEL = "ADD_HOTEL";
const UPDATE_HOTEL = "UPDATE_HOTEL";
const DELETE_HOTEL = "DELETE_HOTEL";
const SET_HOTELS = "SET_HOTELS";

const ADD_CATEGORY = "ADD_CATEGORY";
const UPDATE_CATEGORY = "UPDATE_CATEGORY";
const DELETE_CATEGORY = "DELETE_CATEGORY";
const SET_CATEGORIES = "SET_CATEGORIES";

// Define action types using union types
type HotelAction =
  | { type: typeof ADD_HOTEL; payload: Hotel }
  | { type: typeof UPDATE_HOTEL; payload: Hotel }
  | { type: typeof DELETE_HOTEL; payload: string }
  | { type: typeof SET_HOTELS; payload: Hotel[] };

type CategoryAction =
  | { type: typeof ADD_CATEGORY; payload: Category }
  | { type: typeof UPDATE_CATEGORY; payload: Category }
  | { type: typeof DELETE_CATEGORY; payload: string }
  | { type: typeof SET_CATEGORIES; payload: Category[] };

// Define the initial state
const initialState: AppState = {
  hotels: [],
  categories: [
    { id: "1", name: "1 Star" },
    { id: "2", name: "2 Star" },
    { id: "3", name: "3 Star" },
  ],
};

// Define the hotels reducer with proper action type
const hotelsReducer = (
  state = initialState.hotels,
  action: HotelAction
): Hotel[] => {
  switch (action.type) {
    case ADD_HOTEL:
      return [...state, action.payload];
    case UPDATE_HOTEL:
      return state.map((hotel) =>
        hotel.id === action.payload.id ? action.payload : hotel
      );
    case DELETE_HOTEL:
      return state.filter((hotel) => hotel.id !== action.payload);
    case SET_HOTELS:
      return action.payload;
    default:
      return state;
  }
};

// Define the categories reducer with proper action type
const categoriesReducer = (
  state = initialState.categories,
  action: CategoryAction
): Category[] => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.payload];
    case UPDATE_CATEGORY:
      return state.map((category) =>
        category.id === action.payload.id ? action.payload : category
      );
    case DELETE_CATEGORY:
      return state.filter((category) => category.id !== action.payload);
    case SET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  hotels: hotelsReducer,
  categories: categoriesReducer,
});

// Create the store
export const store = createStore(rootReducer);

// Subscribe to store updates and save state to localStorage
store.subscribe(() => {
  localStorage.setItem("hotels", JSON.stringify(store.getState().hotels));
  localStorage.setItem(
    "categories",
    JSON.stringify(store.getState().categories)
  );
});
