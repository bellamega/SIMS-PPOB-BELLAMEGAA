const initialState = {
  profile: null,
  balance: null,
  services: [],
  banner: null,
  error: null,
  topUpAmount: 0, // Tambahkan topUpAmount
  successMessage: "", // Tambahkan successMessage
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };
    case 'SET_SERVICES':
      return { ...state, services: action.payload };
    case 'SET_BANNER':
      return { ...state, banner: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_TOP_UP_AMOUNT': // Tambahkan action baru untuk topUpAmount
      return { ...state, topUpAmount: action.payload };
    case 'SET_SUCCESS_MESSAGE': // Tambahkan action baru untuk successMessage
      return { ...state, successMessage: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
