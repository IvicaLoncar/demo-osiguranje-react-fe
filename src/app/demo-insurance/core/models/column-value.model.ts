export interface ColumnValue
{
  name: string;
  value: any;
}

export function dummyColumnValue(): ColumnValue
{
  return {
    name: "",
    value: undefined
  };
}