
// Action to set profile data
export const setProfile = (profile) => ({
  type: 'SET_PROFILE',
  payload: profile, // The payload will contain the profile data from the API
});

// Action to set balance data
export const setBalance = (balance) => ({
  type: 'SET_BALANCE',
  payload: balance, // The payload will contain the balance data from the API
});

// Action to set services data
export const setServices = (services) => ({
  type: 'SET_SERVICES',
  payload: services, // The payload will contain the services data from the API
});

// Action to set banner data
export const ActionTypes = {
  SET_BANNER: 'BANNER/SET',
};

export const setBanner = (banner) => ({
  type: ActionTypes.SET_BANNER,
  payload: banner,
});



// Action to handle errors, in case of failed API calls
export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error, // The payload will contain the error message or error object
});
