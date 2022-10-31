import { CustomData } from "./custom-metadata.model";

export interface RestGetParams
{
  page?: number;
  rows?: number;
  filter?: string;
  sort?: string;
  includeColumns?: string;
  excludeColumns?: string;
  domain?: string;
}

export function dummyRestGetParams(): RestGetParams
{
  return {
    page: undefined,
    rows: undefined,
    filter: undefined,
    sort: undefined,
    includeColumns: undefined,
    excludeColumns: undefined,
    domain: undefined
   };
}