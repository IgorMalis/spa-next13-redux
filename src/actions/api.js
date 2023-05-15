import { INDICATOR } from '../utils/constants';
import { useRouter } from 'next/navigation';

import {
  setType,
  setText,
  showModal,
  setRedirectTime,
} from '../store/indicatorSlice';

import {
  setPlayerValid,
  setPlayerInvalid,
} from '../store/playersTableSlice';


// Perform POST request to submit invoice
export const postForm = data => async dispatch => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const url = `${API_URL}/api/submit`;
  
  dispatch( setText('Please wait, your invoice is being submitted') );
  dispatch( setType(INDICATOR.LOADING) );
  dispatch( showModal() );

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(response => {
    if (response.status >= 300)
      throw new Error('Request failed');
    return response.json();
  }).then(data => {
    dispatch( performRedirect(`${API_URL}/invoice/${data.id}`, 5) );
  }).catch(error => {
    dispatch( setText('An error occurred while submitting your invoice') );
    dispatch( setType(INDICATOR.WARNING) );
  });

};

// Perform a countdown before redirecting user
const performRedirect = (url, seconds) => dispatch => {

  dispatch( setText('Your invoice has been submitted successfully') );
  dispatch( setType(INDICATOR.REDIRECT) );

  var time_remaining = seconds;

  dispatch( setRedirectTime(time_remaining) );
  var redirectInterval = setInterval(function () {
    time_remaining--;
    dispatch( setRedirectTime(time_remaining) );

    if (time_remaining === 0) {
      clearInterval(redirectInterval);
      window.location.href = url;
    }
  }, 1000);

};

export const validatePlayerApi = (player, index) => dispatch => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const url = `${API_URL}/api/validate?player=${player}`;

  fetch(url, {
    method: 'GET',
  }).then(response => {
    if (response.status >= 300)
      throw new Error('Request failed');
    return response.json();
  }).then(data => {
    const valid = data.valid;
    if (valid)
      dispatch( setPlayerValid(index) );
    else
      dispatch( setPlayerInvalid(index) );
  }).catch(error => {
    dispatch( setPlayerInvalid(index) );
  });

};
