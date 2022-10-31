import { CustomMessage } from '../../core/models/custom-message.model';
import { valueCompareUtil } from '../../core/util/value-compare.util';
import { ColumnDefinition } from '../../core/models/column-definition.model';


export interface InsurancePolicyCollection
{
  rows: InsurancePolicy[];
  currentRow: InsurancePolicy;
  originalRow: InsurancePolicy;
  messages: CustomMessage[];
  dispalyedMessages: CustomMessage[];
  pageNumber: number;
  rowsPerPage: number;
  totalNumberOfRows: number;
  filter: string;
  sort: string;
  status: 'idle' | 'loading' | 'failed';
}


export function dummyInsurancePolicyCollection(): InsurancePolicyCollection
{
  return {
    rows: [],
    currentRow: dummyInsurancePolicy(),
    originalRow: dummyInsurancePolicy(),
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

export interface InsurancePolicy
{
    insurancePolicyID?: number;
    insuranceTypeID?: number;
    insuranceTypeName?: string;
    clientIDPolicyHolder?: number;
    clientNamePolicyHolder?: string;
    clientIDInsured?: number;
    clientNameInsured?: string;
    dateFrom?: Date;
    dateTo?: Date;
    active?: boolean;
    createDate?: Date;
    createUser?: string;
    updateDate?: Date;
    updateUser?: string;
}

export function dummyInsurancePolicy(): InsurancePolicy
{
    return {
        insurancePolicyID: undefined,
        insuranceTypeID: undefined,
        insuranceTypeName: undefined,
        clientIDPolicyHolder: undefined,
        clientNamePolicyHolder: undefined,
        clientIDInsured: undefined,
        clientNameInsured: undefined,
        dateFrom: undefined,
        dateTo: undefined,
        active: false, //undefined
        createDate: undefined,
        createUser: undefined,
        updateDate: undefined,
        updateUser: undefined,      
    };
}


export function cloneInsurancePolicy(insurancePolicy: InsurancePolicy): InsurancePolicy
{
  return {
    insurancePolicyID: insurancePolicy.insurancePolicyID,
    insuranceTypeID: insurancePolicy.insuranceTypeID,
    insuranceTypeName: insurancePolicy.insuranceTypeName,
    clientIDPolicyHolder: insurancePolicy.clientIDPolicyHolder,
    clientNamePolicyHolder: insurancePolicy.clientNamePolicyHolder,
    clientIDInsured: insurancePolicy.clientIDInsured,
    clientNameInsured: insurancePolicy.clientNameInsured,
    dateFrom: insurancePolicy.dateFrom,
    dateTo: insurancePolicy.dateTo,
    active: insurancePolicy.active,
    createDate: insurancePolicy.createDate,
    createUser: insurancePolicy.createUser,
    updateDate: insurancePolicy.updateDate,
    updateUser: insurancePolicy.updateUser
  };
}


export function isEqualInsurancePolicies(insurancePolicy01: InsurancePolicy, insurancePolicy02: InsurancePolicy, skipInsurancePolicyId: boolean): boolean
{
  let valueCompare: any = valueCompareUtil();

  let notEqual: boolean
    = (skipInsurancePolicyId ? false : !valueCompare.isEqualNumberValues(insurancePolicy01.insurancePolicyID, insurancePolicy02.insurancePolicyID)) ||
      !valueCompare.isEqualNumberValues(insurancePolicy01.insuranceTypeID, insurancePolicy02.insuranceTypeID) ||
      !valueCompare.isEqualStringValues(insurancePolicy01.insuranceTypeName, insurancePolicy02.insuranceTypeName) ||
      !valueCompare.isEqualNumberValues(insurancePolicy01.clientIDPolicyHolder, insurancePolicy02.clientIDPolicyHolder) ||
      !valueCompare.isEqualStringValues(insurancePolicy01.clientNamePolicyHolder, insurancePolicy02.clientNamePolicyHolder) ||
      !valueCompare.isEqualNumberValues(insurancePolicy01.clientIDInsured, insurancePolicy02.clientIDInsured) ||
      !valueCompare.isEqualStringValues(insurancePolicy01.clientNameInsured, insurancePolicy02.clientNameInsured) ||
      !valueCompare.isEqualDateValues(insurancePolicy01.dateFrom, insurancePolicy02.dateFrom) ||
      !valueCompare.isEqualDateValues(insurancePolicy01.dateTo, insurancePolicy02.dateTo) ||
      !valueCompare.isEqualBooleanValues(insurancePolicy01.active, insurancePolicy02.active);
  return !notEqual;
}


export function getInsurancePolicyColumnDefinitions(): ColumnDefinition[]
{
  let position: number = 1;
  return [
    { position: position++, field: 'insurancePolicyID', header: 'Insurance policy Id', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'insuranceTypeID', header: 'Insurance type ID', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'insuranceTypeName', header: 'Insurance type Name', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'clientIDPolicyHolder', header: 'Policy holder ID', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'clientNamePolicyHolder', header: 'Policy holder name', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'clientIDInsured', header: 'Insured ID', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'clientNameInsured', header: 'Insured name', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'dateFrom', header: 'Date from', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'dateTo', header: 'Date to', show: true, frozen: false, width: '6%' },
    { position: position++, field: 'active', header: 'Active', show: true, frozen: false, width: '4%' },
    { position: position++, field: 'createDate', header: 'Create date', show: true, frozen: false, width: '9.5%' },
    { position: position++, field: 'createUser', header: 'Create user', show: true, frozen: false, width: '5%' },
    { position: position++, field: 'updateDate', header: 'Update date', show: true, frozen: false, width: '9%' },
    { position: position++, field: 'updateUser', header: 'Update user', show: true, frozen: false, width: '5%' }
  ];
}
