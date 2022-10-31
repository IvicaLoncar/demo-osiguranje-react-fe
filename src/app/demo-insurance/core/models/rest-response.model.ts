import { CustomData } from "./custom-metadata.model";

export interface RestResponse
{
  data?: CustomData;
  status: any;
  headers: any;
}

export function dummyRestResponse(): RestResponse
{
  return {
    data: undefined,
    status: undefined,
    headers: undefined,
   };
}