export const setProfile = (profile) => ({
  type: 'SET_PROFILE',
  payload: profile,
});

export const setBalance = (balance) => ({
  type: 'SET_BALANCE',
  payload: balance,
});

export const setServices = (services) => ({
  type: 'SET_SERVICES',
  payload: services,
});

export const setBanner = (banner) => ({
  type: 'SET_BANNER',
  payload: banner,
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error,
});
