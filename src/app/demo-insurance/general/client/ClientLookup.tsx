import React, { useEffect, useRef, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../core/store/hooks';
import {
  deleteClient,
  fetchClients,
  saveClient,
  selectClients,
  selectDisplayedMessages,
  selectMessages,
  selectPageNumber,
  selectRowsPerPage,
  selectTotalNumberOfRows,
  setCurrentRow,
  clearMessages,
} from './clientSlice';

import { ColumnDefinition } from '../../core/models/column-definition.model';
import { Client, getClientColumnDefinitions, getClientColumnDefinitionsLookup } from './Client.model';

import styles from './Client.module.css';



import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable, DataTableCellClassNameOptions } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { useNavigate } from 'react-router-dom';

import { MessageBox } from '../message-box/MessageBox';
import { dummyRestGetParams, RestGetParams } from '../../core/models/rest-get-params.model';
import { toastMessages } from '../../core/util/toast-messages.util';
import { dateConvertUtil } from '../../core/util/date-convert.util';
import { CustomMessage } from '../../core/models/custom-message.model';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';


export const ClientLookup = ( props: any ) =>
{

  const dateConvert = dateConvertUtil();

  const clients = useAppSelector(selectClients);
  const pageNumber = useAppSelector(selectPageNumber);
  const rowsPerPage = useAppSelector(selectRowsPerPage);
  const totalNumberOfRows = useAppSelector(selectTotalNumberOfRows);

  const messages = useAppSelector(selectMessages);
  //const displayedMessages = useAppSelector(selectDisplayedMessages);


  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const deleteMessage = "Brisanje sloga sa client id &!";

  const [ showMessageBox, setShowMessageBox ] = useState(false);
  const [ showBlockUI, setShowBlockUI ] = useState(false);
  const [ showProgressSpinner, setShowProgressSpinner ] = useState(false);
  const [ displayedMessages, setDisplayedMessages ] = useState([] as CustomMessage[])


  const [ canLoadData, setCanLodaData ] = useState(false);
 // const [ pageNumber2, setPageNumber2 ] = useState(0 as number);
 // const [ rowsPerPage, setRowsPerPage ] = useState(20 as number);
  const [ filter, setFilter ] = useState("" as string);
  const [ sort, setSort ] = useState("" as string);

  const [ filterFieldClientID, setFilterFieldClientID ] = useState("" as string);
  const [ filterFieldName, setFilterFieldName ] = useState("" as string);

  const [ deleteRowID, setDeleteRowID ] = useState(-1 as number);

  //const incrementValue = Number(incrementAmount) || 0;

  const onLazyLoad = (event:any) => {
    console.log("On Lazy load event", event);
    //this.carservice.getLazyCars(event)...
  }

  function onPage (event: any) {
    console.log("onPage: " + event.page + "  " + JSON.stringify(event))
      //lazyParams.value = event;
      //loadLazyData();
      if (canLoadData)
      {
      //  setPageNumber2(event.page);
      //  setRowsPerPage(event.rows);
       // console.log("onpage pagenum: " + pageNumber2 + "  rows: " + rowsPerPage)
       // getData((rowsPerPage === event.rows ? event.page : pageNumber), event.rows);
       getData(event.page, event.rows);
      }
      setCanLodaData(true);
    //fetchData(event.originalEvent.page, event.originalEvent.rows);
  
    /*let appUnitAction: AppUnitAction = {
      actionType: "restGet",
      eventSource: "dataTableComponent",
      parameters: [
        { name: "storeName", value: props.storeName},
        { name: "domain", value: props.domain === undefined ? 'main-data' : props.domain},
        { name: "page", value: event.originalEvent.page },
        { name: "rows", value: event.originalEvent.rows },
      ]
    };
    emit("AppUnitAction", appUnitAction);*/
    //loadData(event.originalEvent.page, event.originalEvent.rows);
  };
  
  const onSort = (event: any) => {
    console.log("onSort: " + JSON.stringify(event))
  
  //lazyParams.value = event;
      //loadLazyData();
  };
  
  const onFilter = (event: any) => {
      //lazyParams.value.filters = filters.value ;
      //loadLazyData();
  }

  /*function getColumnDefinitions(): ColumnDefinition[]
  {
    let position: number = 1;
    return         [
      { position: position++, field: 'clientID', header: 'Client Id', show: true, frozen: false},
      { position: position++, field: 'clientType', header: 'Client type', show: true, frozen: false},
      { position: position++, field: 'name', header: 'Name', show: true, frozen: false},
      { position: position++, field: 'gsm', header: 'GSM', show: true, frozen: false},
      { position: position++, field: 'email', header: 'Email', show: true, frozen: false},
      { position: position++, field: 'oib', header: 'OIB', show: true, frozen: false},
      { position: position++, field: 'mbr', header: 'MBR', show: true, frozen: false},
      { position: position++, field: 'dateFrom', header: 'Date from', show: true, frozen: false},
      { position: position++, field: 'dateTo', header: 'Date to', show: true, frozen: false},
      { position: position++, field: 'active', header: 'Active', show: true, frozen: false},
      { position: position++, field: 'createDate', header: 'Create date', show: true, frozen: false},
      { position: position++, field: 'createUser', header: 'Create user', show: true, frozen: false},
      { position: position++, field: 'updateDate', header: 'Update date', show: true, frozen: false},
      { position: position++, field: 'updateUser', header: 'Update user', show: true, frozen: false}
    ];
  }*/

  function showRowViewer(id: number)
  {

    dispatch(setCurrentRow(id));

    navigate("/client");

    //console.log("current row id: " + id + "   " + target);
   /* appUnitData.value.appUnitActions.push({
      actionType: "editRow",
      eventSource: componentName.value,
      componentInstanceHost: layoutNodeExt.value.componentInstanceHost,
      handled: false,
      parameters: [
        { name: "storeName", value: 'menuItem'},
        { name: "domain", value: 'main-data' },
        { name: "id", value: id },
      ]
    })
    //appUnitData.value.changeNumber = appUnitData.value.changeNumber + 1;  
    appUnitData.value.appUnitActions.push({
        actionType: "showInAppUnitViewHost",
        eventSource: componentName.value,
        componentInstanceHost: layoutNodeExt.value.componentInstanceHost,
        handled: false,
        parameters: [
            { name: "componentType", value: '~viewer'},
        ]
    })
    appUnitData.value.changeNumber = appUnitData.value.changeNumber + 1;
    setTimeout(function() { appUnitData.value.changeNumber = appUnitData.value.changeNumber + 1; }, 50);*/
  }

  function show(target: string)
  {
    //et fullPath = router.currentRoute.value.fullPath;
    //router.push({ path: fullPath.substring(0, fullPath.lastIndexOf('/') + 1) + target});
    //className="flex align-content-center justify-content-center flex-wrap"
    /*
    
*/
  }


  useEffect(() => {    
    console.log("došao u client-lookup")
  });
  

  function dateBodyTemplate(rowData: any, column: ColumnBodyOptions) {
    let myDate: Date | undefined 
      = rowData[column.field] !== undefined && rowData[column.field] !== null && (rowData[column.field] as string).trim() !== "" 
        ? new Date(rowData[column.field]) 
        : undefined;
    let returnValue: string | undefined = undefined;
    if (column.field.trim().toUpperCase() === "createDate".trim().toUpperCase() || 
        column.field.trim().toUpperCase() === "updateDate".trim().toUpperCase())
    {
      returnValue = myDate !== undefined 
        ? dateConvert.getDateTimeUTCString(myDate)
        : undefined;
    }
    else
    {
      returnValue = myDate !== undefined 
        ? myDate.getUTCDate().toString().padStart(2, '0') + '.' 
          + (myDate.getMonth() + 1).toString().padStart(2, '0') + "." 
          + myDate.getUTCFullYear().toString() 
        : undefined;
    }
   // console.log("brandTemplate " + column.field + "   " + myDate.toISOString().replace("T", " "))
    return returnValue;
}

  const showDeleteMessage = (rowID: number | undefined) => {
    if (rowID !== undefined)
    {
      setDeleteRowID(rowID);
      setShowBlockUI(true);
      setShowMessageBox(true);
      console.log("brisanje sloga s id-om " + rowID)
    }
  }

  const cancelDelete = () => {
    setShowMessageBox(false)
    setShowBlockUI(false)
    setDeleteRowID(-1)
  }

  const refreshData = () => {
   /* console.log("refresh data")
   // setPageNumber2(0);
    getData(0, 20);
    setCanLodaData(true);*/
  }

  const getData = (pageNumber: number, rowsPerPage: number) => {
    setShowProgressSpinner(true);
    setShowBlockUI(true);

    console.log("getData pagenumber: " + pageNumber + "  rows: " + rowsPerPage)

    setTimeout(function() { 
      console.log("getData pagenumber: " + pageNumber + "  rows: " + rowsPerPage)
      let restGetParams: RestGetParams = dummyRestGetParams();
      restGetParams.page = pageNumber;
      restGetParams.rows = rowsPerPage;
      restGetParams.sort = sort;

      let preparedFilter: string = "";
      preparedFilter = preparedFilter + (preparedFilter.trim() !== "" ? "," : "") + (filterFieldClientID.trim() !== "" ? "clientID_" + filterFieldClientID.trim() : "");
      preparedFilter = preparedFilter + (preparedFilter.trim() !== "" ? "," : "") + (filterFieldName.trim() !== "" ? "name_" + filterFieldName.trim() : "");
      restGetParams.filter = preparedFilter;

      dispatch(fetchClients(restGetParams));

      setShowProgressSpinner(false);
      setShowBlockUI(false);  
    }, 700);
  }

  const deleteRecord = () => {
    setShowProgressSpinner(true)    
    setShowMessageBox(false)

    setTimeout(function() { 
      dispatch(deleteClient(deleteRowID));

      setShowProgressSpinner(false);
      setShowBlockUI(false);  
    }, 700);
  }


  const columnDefinitions: ColumnDefinition[] = getClientColumnDefinitionsLookup();

  const dataTableColumns = columnDefinitions.map((colDef) => {
    if (colDef.field === 'dateFrom' || colDef.field === 'dateTo' || colDef.field === 'createDate' || colDef.field === 'updateDate')
    {
      return <Column 
      field={colDef.field}
      header={colDef.header}
      key={colDef.field}
      style={{'width': colDef.width  }}
      body={dateBodyTemplate}
    >
    </Column>

    }
    else
    {
    return <Column 
      field={colDef.field}
      header={colDef.header}
      key={colDef.field}
      style={{'width': colDef.width }}
    >
    </Column>
    }
  }
  );

  const rowButtonsBodyTemplate = (rowData: Client) => {
    return <> 
      <Button className="p-button-text p-button-primary mr-1 -mb-2 -mt-2 p-2" onClick={() => showRowViewer(rowData.clientID !== undefined ? rowData.clientID : -1 )}><span className="pi pi-pencil"></span></Button>
      <Button className="p-button-text p-button-danger mr-1 -mb-2 -mt-2 p-2" onClick={() => showDeleteMessage(rowData.clientID)}><span className="pi pi-times"></span></Button>
    </>
  } 






/*




*/

  function cellStyling(value: any, options: DataTableCellClassNameOptions): object | string
  {
    //console.log("cell style value: " + JSON.stringify(options.column.props.field))
    return "line-height-1 overflow-hidden white-space-nowrap " 
      + (options.column.props.field?.trim().toUpperCase() === "clientID".trim().toUpperCase() ? "right-100" : "");
  }


  return (
    
  /*  <div className="flex align-content-center justify-content-center flex-wrap card-container blue-container" style={{minHeight: '200px', backgroundColor: 'red'}}>
      <ProgressSpinner className="flex align-items-center justify-content-center" strokeWidth="3" animationDuration="5" /> 
    </div>
    
                        <div className="flex align-items-center justify-content-center ml-2 p-2">
                      <label htmlFor="name" className="block m-0 pt-2">Name:</label>
                    </div>
                    <div className="flex align-items-center justify-content-center p-2">
                      <InputNumber id="name" placeholder="Naziv" className="w-full" />
                    </div>

          <Toolbar left={leftContents} right={rightContents} className=" col-12 m-0 p-1 bg-green-200" style={{'height': '2.5rem'}} >             
          </Toolbar>                    

          <div className='col-12 m-0 p-0 bg-blue-100'>
            <div className='grid w-full m-0 p-1 '>
              <div className='col-6 m-0 p-0'>
                <div className='grid m-0 p-0'>
                  <div className='col-1 m-0 p-0'>
                    <Button className="p-button p-button-primary ml-1" icon="pi pi-plus" onClick={() => showRowViewer(-1)} />
                  </div>
                  <div className='col-1 m-0 p-0'>
                    <Button className="p-button p-button-primary ml-1" icon="pi pi-search" onClick={() => refreshData()} />
                  </div>
                  <div className='col-1 text-right m-0 p-0'>
                    <label htmlFor="clientID" className="block m-0 pt-3">Id:</label>
                  </div>
                  <div className='col-2 m-0 p-0'>
                    <InputNumber id="clientID" placeholder="Id" className="" size={10} />
                  </div>
                  <div className='col-2 m-0 p-0 text-right'>
                    <label htmlFor="name" className="block m-0 pt-3">Naziv:</label>
                  </div>
                  <div className='col-4 m-0 p-0'>
                    <InputText id="name" placeholder="Naziv" className="w-full" />
                  </div>
                  <div className='col m-0 p-0'>

                  </div>
                </div>
              </div>
            </div>
          </div>
          style={{display: 'flex', flexDirection: 'row', alignItems: 'stretch', width: '100%', height: '70vh'}}
    */

        <div className="bg-red-200 " style={{width: 'calc(80vw)', height: 'calc(100vh - 9.5rem'}} >
    
        <div className="grid w-full m-0 p-0" >
  
  
  
        <div className='col-12 m-0 py-2 pl-2 ' style={{backgroundColor: 'var(--surface-d)'}}>
            <h2 className='m-0 p-0'>Pretraživanje klijenata (not implemented)</h2>
          </div>

          <div className='col-12 m-0 p-0 ' style={{backgroundColor: 'var(--surface-c)'}}>
            <div className='flex flex-row flex-wrap m-0 p-1'>
              <Button className="p-button p-button-primary ml-1 flex align-items-center justify-content-center" icon="pi pi-search" onClick={() => refreshData()} />
              <div className='flex align-items-center justify-content-center'>
                <label htmlFor="clientID" className="block m-0 pt-2 pl-2 pr-1 ">Id:</label>
                <InputNumber 
                  id="clientID" 
                  placeholder="Id" 
                  className="" 
                  mode="decimal" 
                  useGrouping={false} 
                  size={10} 
                  value={filterFieldClientID !== "" ? +filterFieldClientID : null} 
                  onValueChange={(e) => setFilterFieldClientID(e.value !== null ? e.value.toString() : "")}   
                  />
              </div>
              <div className='flex align-items-center justify-content-center'>
                <label htmlFor="name" className="block m-0 pt-2 pl-2 pr-1">Naziv:</label>
                <InputText 
                  id="name" 
                  placeholder="Naziv" 
                  className="" 
                  size={40} 
                  value={filterFieldName} 
                  onChange={(e) => setFilterFieldName(e.target.value)}   
                  />
              </div>
              <Button className="p-button p-button-danger ml-1 flex align-items-center justify-content-center" icon="pi pi-times" onClick={() => refreshData()} />
            </div>
          </div>

          <div className="col-12 text-center " style={{backgroundColor: 'var(--surface-b)'}}>
            <div className='m-0 p-0' style={{height: 'calc(100vh - 16.5rem)'}}>
                  
            <DataTable 
               value={clients} 
               dataKey="field" 
               showGridlines 
               scrollDirection="both" 
               tableStyle={{'tableLayout': 'auto'}} 
               size="small"
               paginatorClassName="m-0 p-0 pt-0" 
               cellClassName={cellStyling}
               className="p-datatable m-0 p-0" 
               selectionMode="single"
               scrollable={true} 
               scrollHeight="flex"
               paginator={true}  
               first={pageNumber * rowsPerPage} 
               rows={rowsPerPage} 
               lazy={true}
               paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
               rowsPerPageOptions={[10,20,50]} 
               responsiveLayout="scroll"
               currentPageReportTemplate="{first} to {last} of {totalRecords}"
               emptyMessage="Ni jedan slog nije pronađen"
               totalRecords={totalNumberOfRows} 
               loading={false}
               onPage={onPage} 
               onSort={onSort} 
               onFilter={onFilter} 
            >
                  {dataTableColumns}     
                  <Column field="up" frozen alignFrozen="right"  body={rowButtonsBodyTemplate}>          
                  </Column>
            </DataTable>

            </div>
          </div>
             
        
      
        </div>

        </div>
  );
}
