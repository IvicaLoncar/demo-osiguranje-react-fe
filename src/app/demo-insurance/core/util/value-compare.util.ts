
export function valueCompareUtil()
{

  function isEqualNumberValues(value01: number | undefined | null, value02: number | undefined | null): boolean
  {
    return ((value01 === undefined || value01 === null) && (value02 === undefined || value02 === null)) ||
           (value01 === value02);
  }

  function isEqualStringValues(value01: string | undefined | null, value02: string | undefined | null): boolean
  {
    return ((value01 === '' || value01 === undefined || value01 === null) && (value02 === '' || value02 === undefined || value02 === null)) ||
           (value01 === value02);
  }

  function isEqualBooleanValues(value01: boolean | undefined | null, value02: boolean | undefined | null): boolean
  {
    return ((value01 === false || value01 === undefined || value01 === null) && (value02 === false || value02 === undefined || value02 === null)) ||
           (value01 === value02);
  }

  function isEqualDateValues(value01: Date | undefined | null, value02: Date | undefined | null): boolean
  {
    //console.log("equal date " + value01 + "  " + value02)
    let value001: Date = value01 === undefined || value01 === null ? new Date() : new Date(value01.getTime());
    let value002: Date = value02 === undefined || value02 === null ? new Date() : new Date(value02.getTime());
    
    return ((value01 === undefined || value01 === null) && (value02 === undefined || value02 === null)) ||
            (value001?.getUTCFullYear() === value002?.getUTCFullYear() &&
            value001?.getUTCMonth() === value002?.getUTCMonth() &&
            value001?.getUTCDate() === value002?.getUTCDate());
  }

  function isEqualDateTimeValues(value01: Date | undefined | null, value02: Date | undefined | null): boolean
  {
    return ((value01 === undefined || value01 === null) && (value02 === undefined || value02 === null)) ||
            (value01?.getTime() === value02?.getTime());
  }


  return {
    isEqualNumberValues,
    isEqualStringValues,
    isEqualBooleanValues,
    isEqualDateValues,
    isEqualDateTimeValues
  }
}