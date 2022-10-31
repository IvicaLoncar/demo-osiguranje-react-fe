import  axios from 'axios';
import { CustomData } from '../models/custom-metadata.model';
import { RestResponse, dummyRestResponse } from '../models/rest-response.model';

export function useEndpointAccessUtil() 
{

  async function restGet(endpoint: string)
  {
    let restResponse: RestResponse = dummyRestResponse();

    await axios
      .get(endpoint)
      .then(response => {     
        restResponse = {
            data: response.data,
            status: response.status,
            headers: response.headers,
        }
      })
      .catch((error) => {
        if (error.response) {
          restResponse = {
            data: error.response.data,
            status: error.response.status,
            headers: error.response.headers,
          };
        } else if (error.request) {
          //console.log(error.request);
        } else {
          //console.log("C: " + 'Error', error.message);
        }
      })
      .finally(() => {       
      });

      return new Promise<RestResponse>((resolve) => {
        resolve(restResponse)
      });        
  }


  async function restPost(endpoint: string, requestData: CustomData)
  {
    let restResponse: RestResponse = dummyRestResponse();

    await axios
      .post(endpoint, requestData)
      .then(response => {     
        restResponse = {
            data: response.data,
            status: response.status,
            headers: response.headers,
        }
      })
      .catch((error) => {
        if (error.response) {
          restResponse = {
            data: error.response.data,
            status: error.response.status,
            headers: error.response.headers,
          };
        } else if (error.request) {
          //console.log(error.request);
        } else {
          //console.log("C: " + 'Error', error.message);
        }
      })
      .finally(() => {       
      });

      return new Promise<RestResponse>((resolve) => {
        resolve(restResponse)
      });        
  }


  async function restPut(endpoint: string, requestData: CustomData)
  {
    let restResponse: RestResponse = dummyRestResponse();

    await axios
      .put(endpoint, requestData)
      .then(response => {     
        restResponse = {
            data: response.data,
            status: response.status,
            headers: response.headers,
        }
      })
      .catch((error) => {
        if (error.response) {
          restResponse = {
            data: error.response.data,
            status: error.response.status,
            headers: error.response.headers,
          };
        } else if (error.request) {
          //console.log(error.request);
        } else {
          //console.log("C: " + 'Error', error.message);
        }
      })
      .finally(() => {       
      });

      return new Promise<RestResponse>((resolve) => {
        resolve(restResponse)
      });        
  }

  async function restDelete(endpoint: string)
  {
    let restResponse: RestResponse = dummyRestResponse();

    await axios
      .delete(endpoint)
      .then(response => {     
        restResponse = {
            data: response.data,
            status: response.status,
            headers: response.headers,
        }
      })
      .catch((error) => {
        if (error.response) {
          restResponse = {
            data: error.response.data,
            status: error.response.status,
            headers: error.response.headers,
          };
        } else if (error.request) {
          //console.log(error.request);
        } else {
          //console.log("C: " + 'Error', error.message);
        }
      })
      .finally(() => {       
      });

      return new Promise<RestResponse>((resolve) => {
        resolve(restResponse)
      });        
  }


  return { 
    restGet,
    restPost,
    restPut,
    restDelete
  }
}