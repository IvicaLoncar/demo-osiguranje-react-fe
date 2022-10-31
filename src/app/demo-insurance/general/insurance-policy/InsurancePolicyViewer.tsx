import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../core/store/hooks';
import {
  saveInsurancePolicy,
  selectedInsurancePolicy,
  selectMessages,
  setColumnValue,
  clearMessages
} from './insurancePolicySlice'

import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Panel } from 'primereact/panel';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from 'react-router-dom';
import { ColumnValue, dummyColumnValue } from '../../core/models/column-value.model';
import { toastMessages } from '../../core/util/toast-messages.util';
import { dateConvertUtil } from '../../core/util/date-convert.util';
import { ProgressSpinner } from 'primereact/progressspinner';
import { BlockUI } from 'primereact/blockui';
import { CustomMessage } from '../../core/models/custom-message.model';
import { fetchInsuranceTypes, selectInsuranceTypeLOV, selectInsuranceTypeLOVLoaded } from '../insurance-type/insuranceTypeSlice';
import { dummyRestGetParams, RestGetParams } from '../../core/models/rest-get-params.model';
import { ClientLookup } from '../client/ClientLookup';
import { MessageBox } from '../message-box/MessageBox';


export function InsurancePolicyViewer()
{
    const dateConvert = dateConvertUtil();

    const insurancePolicy = useAppSelector(selectedInsurancePolicy);

    const messages = useAppSelector(selectMessages);

    const insuranceTypeLOV = useAppSelector(selectInsuranceTypeLOV);
    const insuranceTypeLOVLoaded = useAppSelector(selectInsuranceTypeLOVLoaded);

    //const displayedMessages = useAppSelector(selectDisplayedMessages);

    const [ showBlockUI, setShowBlockUI ] = useState(false);
    const [ showProgressSpinner, setShowProgressSpinner ] = useState(false);
    const [ showClientLookup, setShowClientLookup ] = useState(false);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [selectedInsurancePolicyType, setSelectedInsurancePolicyType] = useState(null);
    const [displayedMessages, setDisplayedMessages ] = useState([] as CustomMessage[])



    useEffect(() => {    
        console.log("use effect in client viewer LOV loaded: " + insuranceTypeLOVLoaded)
        if (!insuranceTypeLOVLoaded)
        {
            setShowProgressSpinner(true);
            setShowBlockUI(true);
        
        // console.log("getData pagenumber: " + pageNumber + "  rows: " + rowsPerPage)
        
            setTimeout(function() { 
                let restGetParams: RestGetParams= dummyRestGetParams();
                restGetParams.page = 0;
                restGetParams.rows = 10000;
                restGetParams.sort = "";    
                restGetParams.filter = "";
                restGetParams.includeColumns = "insuranceTypeID,name";
                restGetParams.domain = "LOV";
            
                dispatch(fetchInsuranceTypes(restGetParams));
            
                setShowProgressSpinner(false);
                setShowBlockUI(false);  
            }, 500);    
        }
    }, [insuranceTypeLOVLoaded]);

    useEffect(() => {    
        console.log("use effect in table viewer " + JSON.stringify(messages ))
        toastMessages(messages);
        if (messages !== undefined && messages.length > 0)
        {
          setDisplayedMessages(messages);
          dispatch(clearMessages());
        }
      }, [messages]);

    function gotoDataTable()
    {
        navigate("/insurance-policies");
      //let fullPath = router.currentRoute.value.fullPath;
      //router.push({ path: fullPath.substring(0, fullPath.lastIndexOf('/') + 1) + 'data-table'});
    }

    function save()
    {
        setShowProgressSpinner(true)    
        setShowBlockUI(true)
    
        setTimeout(function() { 
          dispatch(saveInsurancePolicy());
    
          setShowProgressSpinner(false);
          setShowBlockUI(false);  
        }, 500);
    }

    function setValue(name: string, value: any)
    {
        let columnValue: ColumnValue = dummyColumnValue();
        columnValue.name = name;
        columnValue.value = value;
        dispatch(setColumnValue(columnValue));
    }


    /*
                                                <div className="col-12 md:col-4 w-full m-0 p-0">
                                                    <div className="p-inputgroup ">
                                                        <InputNumber 
                                                            id="insuranceTypeID" 
                                                            placeholder="Vrsta osiguranja id" 
                                                            readOnly
                                                            className="w-full" 
                                                            inputStyle={{backgroundColor: 'var(--surface-c)'}}
                                                            value={insurancePolicy.insuranceTypeID} 
                                                            onValueChange={(e) => setValue("insuranceTypeID", e.value)}                                                      
                                                        />
                                                        <Button icon="pi pi-search" className="p-button-primary"/>
                                                    </div>
                                                </div>

    */

    function openClientLookup(columnName: string)
    {
        setShowBlockUI(true)
        setShowClientLookup(true)

        //                         <div className="h-full border-round bg-blue-500 text-white font-bold p-3 flex align-items-center justify-content-center"></div>

        // style={{width: 'calc(85vw - 10rem', height: 'calc(95vh - 10rem', top: '-3.5rem'}}
        setTimeout(function() { 
          //dispatch(saveInsurancePolicy());
    
          //setShowProgressSpinner(false);
          setShowClientLookup(false);
          setShowBlockUI(false);  
        }, 2000);
    }             
    
    /*
                <div className="bg-blue-200 flex align-items-center justify-content-center" style={{width: 'calc(80vw)', height: 'calc(100vh - 10.5rem'}} >
                    
                    ggdfgd
                    
                </div>
    */

    return (
        <div >
            <div className="flex align-content-center justify-content-center flex-wrap " >
    
                {showClientLookup &&  true &&
                <div className='absolute z-5 bg-green-300 flex align-content-center justify-content-center flex-wrap card-container blue-container m-0 mr-3 p-0' style={{width: '', height: 'calc(100vh - 8.5rem)'}}>

                  <ClientLookup />
                </div>}


                {showProgressSpinner &&  
                <div className="absolute z-5 flex align-content-center justify-content-center flex-wrap card-container blue-container" style={{height: 'calc(100vh - 6rem)'}}>
                    <ProgressSpinner className="flex align-items-center justify-content-center" strokeWidth="3" animationDuration="5" /> 
                </div> }
            </div>

            <BlockUI blocked={showBlockUI} className="z-4 m-0 p-0 " style={{height: 'calc(100vh - 7.5rem)', left: '-0.5rem'}}>

                <div className='grid w-full'>

                    <div className='col-12 m-0 py-2 pl-2 ' style={{backgroundColor: 'var(--surface-d)'}}>
                        <h2 className='m-0 p-0'>Police</h2>
                    </div>

                    <div className='col-12 m-0 p-0 ' style={{backgroundColor: 'var(--surface-c)'}}>
                      <div className='flex flex-row flex-wrap m-0 p-1'>
                        <Button className="p-button p-button-primary mr-1 flex align-items-center justify-content-center" icon="pi pi-arrow-circle-left" onClick={() => gotoDataTable()}/>
                        <Button className="p-button p-button-primary mr-3 flex align-items-center justify-content-center" icon="pi pi-save" onClick={() => save()} />
                      </div>
                    </div>
                    
                    <div className='col-12 m-0 p-0'>

                        <ScrollPanel  className="m-0 p-0 custom" style={{'height': 'calc(100vh - 13.5rem)'}} >

                            <div className="grid m-0 p-0">
        
                                <div className="col-12 md:col-6 m-0 p-1 pl-0" >

                                    <Panel header="Općenito" toggleable={true} >
                                        <div className="grid m-0 p-0">
                                            <div className="col-3 text-right">
                                                <label htmlFor="insurancePolicyID" className="block m-0 pt-3">Id:</label>
                                            </div>
                                            <div className="col-9 pb-0">
                                                <InputNumber 
                                                    id="insurancePolicyID" 
                                                    placeholder="Id" 
                                                    className="w-full" 
                                                    readOnly
                                                    inputStyle={{backgroundColor: 'var(--surface-c)'}}
                                                    value={insurancePolicy.insurancePolicyID} 
                                                    onValueChange={(e) => setValue("insurancePolicyID", e.value)}                                                      
                                                />
                                            </div>
                                            <div className="col-3 text-right">
                                                <label htmlFor="insuranceTypeID" className="block m-0 pt-3">Vrsta osiguranja:</label>
                                            </div>
                                            <div className="col-9 pb-0">
                                                <Dropdown 
                                                    id="clientType" 
                                                    optionLabel="name" 
                                                    optionValue='insuranceTypeID' 
                                                    options={insuranceTypeLOV} 
                                                    className="w-full" 
                                                    placeholder="Vrsta osiguranja" 
                                                    value={insurancePolicy.insuranceTypeID}
                                                    onChange={(e) => setValue("insuranceTypeID", e.value)}
                                                />                                                
                                            </div>
                                            <div className="col-3 text-right">
                                                <label htmlFor="clientIDPolicyHolder" className="block m-0 pt-3">Ugovaratelj:</label>
                                            </div>
                                            <div className="col-9 pb-0">
                                                <div className="col-12 md:col-4 w-full m-0 p-0">
                                                    <div className="p-inputgroup ">
                                                        <InputNumber 
                                                            id="clientIDPolicyHolder"                                                             
                                                            placeholder="Ugovaratelj id" 
                                                            readOnly
                                                            className="w-full" 
                                                            inputStyle={{backgroundColor: 'var(--surface-c)'}}
                                                            value={insurancePolicy.clientIDPolicyHolder} 
                                                            onChange={(e) => setValue("clientIDPolicyHolder", e.value)}
                                                        />
                                                        <Button icon="pi pi-search" className="p-button-primary" onClick={() => openClientLookup("clientIDPolicyHolder")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3 text-right">
                                            </div>
                                            <div className="col-9 pb-0">
                                                <InputText 
                                                    id="clientNamePolicyHolder" 
                                                    placeholder="Naziv ugovaratelja" 
                                                    readOnly
                                                    className="w-full" 
                                                    style={{backgroundColor: 'var(--surface-c)'}}
                                                    value={insurancePolicy.clientNamePolicyHolder || ''}                                                     
                                                />
                                            </div>          
                                            <div className="col-3 text-right">
                                                <label htmlFor="clientIDInsured" className="block m-0 pt-3">Osiguranik:</label>
                                            </div>
                                            <div className="col-9 pb-0">
                                                <div className="col-12 md:col-4 w-full m-0 p-0">
                                                    <div className="p-inputgroup ">
                                                        <InputNumber 
                                                            id="clientIDInsured" 
                                                            placeholder="Osiguranik id" 
                                                            readOnly
                                                            className="w-full" 
                                                            inputStyle={{backgroundColor: 'var(--surface-c)'}}
                                                            value={insurancePolicy.clientIDInsured} 
                                                            onChange={(e) => setValue("clientIDInsured", e.value)}
                                                        />
                                                        <Button icon="pi pi-search" className="p-button-primary" onClick={() => openClientLookup("clientIDPolicyHolder")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3 text-right">
                                            </div>
                                            <div className="col-9 pb-0">
                                                <InputText 
                                                    id="clientNameInsured" 
                                                    placeholder="Naziv osiguranika" 
                                                    readOnly
                                                    className="w-full" 
                                                    style={{backgroundColor: 'var(--surface-c)'}}
                                                    value={insurancePolicy.clientNameInsured || ''}                                                     
                                                />
                                            </div>                                                
                                            <div className="col-3 text-right">
                                                <label htmlFor="dateFrom" className="block m-0 pt-3">Datum od:</label>
                                            </div>
                                            <div className="col-9 pb-0">
                                                <div className="grid">                                            
                                                    <div className="col-fixed" style={{width: '200px'}}>     
                                                        <Calendar 
                                                            id="dateFrom" 
                                                            className="w-full" 
                                                            showIcon={true} 
                                                            dateFormat="dd.mm.yy" 
                                                            value={ insurancePolicy.dateFrom !== undefined && insurancePolicy.dateFrom !== null ? new Date(insurancePolicy.dateFrom) : undefined } 
                                                            onChange={(e) => setValue("dateFrom", dateConvert.handleAsUTCDate(e.value as Date).toISOString())}  
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3 text-right">
                                                <label htmlFor="dateTo" className="block m-0 pt-3">Datum do:</label>
                                            </div>
                                            <div className="col-9 pb-0">
                                                <div className="grid">
                                                    <div className="col-fixed" style={{width: '200px'}}>
                                                        <Calendar 
                                                            id="dateTo" 
                                                            className="w-full" 
                                                            showIcon={true} 
                                                            dateFormat="dd.mm.yy" 
                                                            value={  insurancePolicy.dateTo !== undefined && insurancePolicy.dateTo !== null ? new Date(insurancePolicy.dateTo) : undefined  } 
                                                            onChange={(e) => setValue("dateTo", dateConvert.handleAsUTCDate(e.value as Date).toISOString())}  
                                                        />
                                                    </div>
                                                </div>
                                            </div>          
                                            <div className="col-3 text-right "></div>
                                            <div className="col-9 m-0 py-3 field-checkbox">
                                                <Checkbox 
                                                    id="binary"  
                                                    v-model="editedRow.active" 
                                                    checked={ insurancePolicy.active } 
                                                    onChange={e => setValue("active", e.checked)} 
                                                />
                                                <label htmlFor="binary">Aktivno</label>
                                            </div>                                        
                                        </div>
                                    </Panel>

                                </div>
            
                                <div className="col-12 md:col-6 m-0 p-1 pr-3 ">

                                    <Panel header="Audit" toggleable={true}>
                                        <div className="grid">
                                            <div className="col-3 text-right">
                                                <label htmlFor="createDate" className="block m-0 pt-3">Datum kreiranja:</label>
                                            </div>
                                            <div className="col-9 pb-0">
                                                <InputText 
                                                    id="createDate" 
                                                    placeholder="Datum kreiranja" 
                                                    readOnly
                                                    className="w-full" 
                                                    style={{backgroundColor: 'var(--surface-c)'}}
                                                    value={dateConvert.getDateTimeUTCString(insurancePolicy.createDate) || ''} 
                                                    
                                                />
                                            </div>          
                                            <div className="col-3 text-right">
                                                <label htmlFor="createUser" className="block m-0 pt-3">Kreirao:</label>
                                            </div>
                                            <div className="col-9 pb-0">
                                                <InputText 
                                                    id="createUser" 
                                                    placeholder="Kreirao" 
                                                    readOnly
                                                    className="w-full" 
                                                    style={{backgroundColor: 'var(--surface-c)'}}
                                                    value={insurancePolicy.createUser || ''} 
                                                />
                                            </div>
                                            <div className="col-3 text-right">
                                                <label htmlFor="updateDate" className="block m-0 pt-3">Datum ažuriranja:</label>
                                            </div>
                                            <div className="col-9 pb-0">
                                                <InputText 
                                                    id="updateDate" 
                                                    placeholder="Datum ažuriranja" 
                                                    readOnly
                                                    className="w-full" 
                                                    style={{backgroundColor: 'var(--surface-c)'}}
                                                    value={dateConvert.getDateTimeUTCString(insurancePolicy.updateDate) || ''} 
                                                />
                                            </div>          
                                            <div className="col-3 text-right">
                                                <label htmlFor="updateUser" className="block m-0 pt-3">Ažurirao:</label>
                                            </div>
                                            <div className="col-9 pb-0">
                                                <InputText 
                                                    id="updateUser" 
                                                    placeholder="Ažurirao" 
                                                    readOnly
                                                    className="w-full" 
                                                    style={{backgroundColor: 'var(--surface-c)'}}
                                                    value={insurancePolicy.updateUser || ''} 
                                                />
                                            </div>
                                        </div>
                                    </Panel>

                                </div>

                            </div>

                        </ScrollPanel>

                    </div>

                </div>   

            </BlockUI> 
    
        </div>
      );
}