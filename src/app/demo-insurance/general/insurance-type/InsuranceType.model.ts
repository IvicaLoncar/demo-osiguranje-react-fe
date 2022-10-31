import { CustomMessage } from '../../core/models/custom-message.model';
import { valueCompareUtil } from '../../core/util/value-compare.util';
import { ColumnDefinition } from '../../core/models/column-definition.model';


export interface InsuranceTypeCollection
{
  rows: InsuranceType[];
  currentRow: InsuranceType;
  originalRow: InsuranceType;
  messages: CustomMessage[];
  dispalyedMessages: CustomMessage[];
  pageNumber: number;
  rowsPerPage: number;
  totalNumberOfRows: number;
  filter: string;
  sort: string;
  status: 'idle' | 'loading' | 'failed';
}


export function dummyInsuranceTypeCollection(): InsuranceTypeCollection
{
  return {
    rows: [],
    currentRow: dummyInsuranceType(),
    originalRow: dummyInsuranceType(),
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

export interface InsuranceType
{
    insuranceTypeID?: number;
    group?: string;
    name?: string;
    description?: string;
    dateFrom?: Date;
    dateTo?: Date;
    active?: boolean;
    createDate?: Date;
    createUser?: string;
    updateDate?: Date;
    updateUser?: string;
}

export function dummyInsuranceType(): InsuranceType
{
    return {
        insuranceTypeID: undefined,
        group: undefined,
        name: undefined,
        description: undefined,
        dateFrom: undefined,
        dateTo: undefined,
        active: false, //undefined
        createDate: undefined,
        createUser: undefined,
        updateDate: undefined,
        updateUser: undefined,      
    };
}


export function cloneInsuranceType(insuranceType: InsuranceType): InsuranceType
{
  return {
    insuranceTypeID: insuranceType.insuranceTypeID,
    group: insuranceType.group,
    name: insuranceType.name,
    description: insuranceType.description,
    dateFrom: insuranceType.dateFrom,
    dateTo: insuranceType.dateTo,
    active: insuranceType.active,
    createDate: insuranceType.createDate,
    createUser: insuranceType.createUser,
    updateDate: insuranceType.updateDate,
    updateUser: insuranceType.updateUser
  };
}


export function isEqualInsuranceTypes(insuranceType01: InsuranceType, insuranceType02: InsuranceType, skipInsuranceTypeId: boolean): boolean
{
  let valueCompare: any = valueCompareUtil();

  let notEqual: boolean
    = (skipInsuranceTypeId ? false : !valueCompare.isEqualNumberValues(insuranceType01.insuranceTypeID, insuranceType02.insuranceTypeID)) ||
      !valueCompare.isEqualStringValues(insuranceType01.group, insuranceType02.group) ||
      !valueCompare.isEqualStringValues(insuranceType01.name, insuranceType02.name) ||
      !valueCompare.isEqualStringValues(insuranceType01.description, insuranceType02.description) ||
      !valueCompare.isEqualDateValues(insuranceType01.dateFrom, insuranceType02.dateFrom) ||
      !valueCompare.isEqualDateValues(insuranceType01.dateTo, insuranceType02.dateTo) ||
      !valueCompare.isEqualBooleanValues(insuranceType01.active, insuranceType02.active);
  return !notEqual;
}


export function getInsuranceTypeColumnDefinitions(): ColumnDefinition[]
{
  let position: number = 1;
  return [
    { position: position++, field: 'insuranceTypeID', header: 'Insurance type Id', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'group', header: 'Group', show: true, frozen: false, width: '10%' },
    { position: position++, field: 'name', header: 'Name', show: true, frozen: false, width: '25%' },
    { position: position++, field: 'description', header: 'Description', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'dateFrom', header: 'Date from', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'dateTo', header: 'Date to', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'active', header: 'Active', show: true, frozen: false, width: '4%' },
    { position: position++, field: 'createDate', header: 'Create date', show: true, frozen: false, width: '9.5%' },
    { position: position++, field: 'createUser', header: 'Create user', show: true, frozen: false, width: '5%' },
    { position: position++, field: 'updateDate', header: 'Update date', show: true, frozen: false, width: '9%' },
    { position: position++, field: 'updateUser', header: 'Update user', show: true, frozen: false, width: '5%' }
  ];
}