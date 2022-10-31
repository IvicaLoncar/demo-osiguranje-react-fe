export function dateConvertUtil()
{

  function localToUTCDate(date: Date): Date
  {
    let dateUTC: Date 
      = new Date(
          Date.UTC(
            date.getUTCFullYear(), 
            date.getUTCMonth(),
            date.getUTCDate(), 
            0,
            0, 
            0));
    return dateUTC;
  }

  function handleAsUTCDate(date: Date): Date
  {
    let dateUTC: Date 
      = new Date(
          Date.UTC(
            date.getFullYear(), 
            date.getMonth(),
            date.getDate(), 
            0,
            0, 
            0));
    return dateUTC;
  }

  function toUTCDateTime(date: Date): Date
  {
    let dateUTC: Date 
      = new Date(
          Date.UTC(
            date.getUTCFullYear(), 
            date.getUTCMonth(),
            date.getUTCDate(), 
            date.getUTCHours(),
            date.getUTCMinutes(), 
            date.getUTCSeconds()));
    return dateUTC;
  }

  function getDateTimeUTCString(date: Date | undefined): string
  {
    let dateTimeUTC: string  = "";

    if (date !== undefined && date !== null)
    { 
      let tmpDate: Date = new Date(date);
      dateTimeUTC
        = tmpDate.getUTCDate().toString().padStart(2, '0') + '.' 
        + (tmpDate.getUTCMonth() + 1).toString().padStart(2, '0') + "." 
        + tmpDate.getUTCFullYear().toString() + " "
        + tmpDate.getUTCHours().toString().padStart(2, '0') + ":"
        + tmpDate.getUTCMinutes().toString().padStart(2, '0') + ":"
        + tmpDate.getUTCSeconds().toString().padStart(2, '0');
    }
    return dateTimeUTC;
  }

  return {
    localToUTCDate,
    handleAsUTCDate,
    toUTCDateTime,
    getDateTimeUTCString
  }
}