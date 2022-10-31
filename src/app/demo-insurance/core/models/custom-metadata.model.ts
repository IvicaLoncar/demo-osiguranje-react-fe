import { CustomMessage } from './custom-message.model';

export interface CustomMetadata 
{
  pageNumber: number;
  rowsPerPage: number;
  numberOfRows: number;
  filter: string;
  sort: string;
  includedColumns: string;
  excludedColumns: string;
  domain: string;
}


export interface CustomData 
{
	metadata: CustomMetadata;
	data: any;
  messages: CustomMessage[];
}


export function dummyCustomMetadata(): CustomMetadata
{
  return {
    pageNumber: -1,
    rowsPerPage: 0,
    numberOfRows: 0,
    filter: '',
    sort: '',
    includedColumns: '',
    excludedColumns: '',
    domain: ''
  };
}

export function dummyCustomData(): CustomData
{
  return {
    metadata: dummyCustomMetadata(),
    data: undefined,
    messages: []
  };
}
