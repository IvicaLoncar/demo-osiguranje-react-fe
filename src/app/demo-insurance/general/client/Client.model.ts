import { CustomMessage } from '../../core/models/custom-message.model';
import { valueCompareUtil } from '../../core/util/value-compare.util';
import { ColumnDefinition } from './../../core/models/column-definition.model';


export interface ClientCollection
{
  rows: Client[];
  currentRow: Client;
  originalRow: Client;
  messages: CustomMessage[];
  dispalyedMessages: CustomMessage[];
  pageNumber: number;
  rowsPerPage: number;
  totalNumberOfRows: number;
  filter: string;
  sort: string;
  status: 'idle' | 'loading' | 'failed';
}


export function dummyClientCollection(): ClientCollection
{
  return {
    rows: [],
    currentRow: dummyClient(),
    originalRow: dummyClient(),
    messages: [],
    dispalyedMessages: [],
    pageNumber: 0,
    rowsPerPage: 20,
    totalNumberOfRows: 0,
    filter: "",
    sort: "",
    status: 'idle',
   };
}

export interface Client
{
    clientID?: number;
    clientType?: string;
    name?: string;
    gsm?: string;
    email?: string;
    oib?: string;
    mbr?: string;
    dateFrom?: Date;
    dateTo?: Date;
    active?: boolean;
    createDate?: Date;
    createUser?: string;
    updateDate?: Date;
    updateUser?: string;
}

export function dummyClient(): Client
{
    return {
        clientID: undefined,
        clientType: undefined,
        name: undefined,
        gsm: undefined,
        email: undefined,
        oib: undefined,
        mbr: undefined,
        dateFrom: undefined,
        dateTo: undefined,
        active: false, //undefined
        createDate: undefined,
        createUser: undefined,
        updateDate: undefined,
        updateUser: undefined,      
    };
}


export function cloneClient(client: Client): Client
{
  return {
    clientID: client.clientID,
    clientType: client.clientType,
    name: client.name,
    gsm: client.gsm,
    email: client.email,
    oib: client.oib,
    mbr: client.mbr,
    dateFrom: client.dateFrom,
    dateTo: client.dateTo,
    active: client.active,
    createDate: client.createDate,
    createUser: client.createUser,
    updateDate: client.updateDate,
    updateUser: client.updateUser
  };
}


export function isEqualClients(client01: Client, client02: Client, skipClientId: boolean): boolean
{
  let valueCompare: any = valueCompareUtil();

  let notEqual: boolean
    = (skipClientId ? false : !valueCompare.isEqualNumberValues(client01.clientID, client02.clientID)) ||
      !valueCompare.isEqualStringValues(client01.clientType, client02.clientType) ||
      !valueCompare.isEqualStringValues(client01.name, client02.name) ||
      !valueCompare.isEqualStringValues(client01.gsm, client02.gsm) ||
      !valueCompare.isEqualStringValues(client01.email, client02.email) ||
      !valueCompare.isEqualStringValues(client01.oib, client02.oib) ||
      !valueCompare.isEqualStringValues(client01.mbr, client02.mbr) ||
      !valueCompare.isEqualDateValues(client01.dateFrom, client02.dateFrom) ||
      !valueCompare.isEqualDateValues(client01.dateTo, client02.dateTo) ||
      !valueCompare.isEqualBooleanValues(client01.active, client02.active);
  return !notEqual;
}


export function getClientColumnDefinitions(): ColumnDefinition[]
{
  let position: number = 1;
  return [
    { position: position++, field: 'clientID', header: 'Client Id', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'clientType', header: 'Client type', show: true, frozen: false, width: '7%' },
    { position: position++, field: 'name', header: 'Name', show: true, frozen: false, width: '9%' },
    { position: position++, field: 'gsm', header: 'GSM', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'email', header: 'Email', show: true, frozen: false, width: '9%' },
    { position: position++, field: 'oib', header: 'OIB', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'mbr', header: 'MBR', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'dateFrom', header: 'Date from', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'dateTo', header: 'Date to', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'active', header: 'Active', show: true, frozen: false, width: '4%' },
    { position: position++, field: 'createDate', header: 'Create date', show: true, frozen: false, width: '9.5%' },
    { position: position++, field: 'createUser', header: 'Create user', show: true, frozen: false, width: '5%' },
    { position: position++, field: 'updateDate', header: 'Update date', show: true, frozen: false, width: '9%' },
    { position: position++, field: 'updateUser', header: 'Update user', show: true, frozen: false, width: '5%' }
  ];
}

export function getClientColumnDefinitionsLookup(): ColumnDefinition[]
{
  let position: number = 1;
  return [
    { position: position++, field: 'clientID', header: 'Client Id', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'clientType', header: 'Client type', show: true, frozen: false, width: '7%' },
    { position: position++, field: 'name', header: 'Name', show: true, frozen: false, width: '9%' },
    { position: position++, field: 'gsm', header: 'GSM', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'email', header: 'Email', show: true, frozen: false, width: '9%' },
    { position: position++, field: 'oib', header: 'OIB', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'mbr', header: 'MBR', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'dateFrom', header: 'Date from', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'dateTo', header: 'Date to', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'active', header: 'Active', show: true, frozen: false, width: '4%' },
  ];
}