import { axiosInstance } from './axios'
import { DjangoApplicationConstants } from './constants'
import qs from 'qs';

export const sendUsernamePassword = async (username, password) => {
    
    // By default, axios serializes JavaScript objects to JSON. 
    // Need to convert it to string to send request with 'Content-Type': 'application/x-www-form-urlencoded'
    const data = qs.stringify({
        client_id: DjangoApplicationConstants.client_id,
        client_secret: DjangoApplicationConstants.client_secret,
        grant_type: DjangoApplicationConstants.grant_type_password,
        username: username,
        password: password
      });

    const response = await axiosInstance.post('auth/token/', data)
    return response.data
}

export const sendGoogleAuthToken = async (token) => {
    
    // By default, axios serializes JavaScript objects to JSON. 
    // Need to convert it to string to send request with 'Content-Type': 'application/x-www-form-urlencoded'
    const data = qs.stringify({
        client_id: DjangoApplicationConstants.client_id,
        client_secret: DjangoApplicationConstants.client_secret,
        grant_type: DjangoApplicationConstants.grant_type_convert_token,
        token: token,
        backend:DjangoApplicationConstants.backend
      });

    const response = await axiosInstance.post('auth/convert-token/', data)

    return response.data
}
