import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../core/store/hooks';
import {
  fetchClients,
 saveClient,
 // incrementIfOdd,
  selectClients,
  selectDisplayedMessages,
  selectedClient,
  selectMessages,
  setColumnValue,
  clearMessages
} from './clientSlice';

import { selectInsuranceTypeLOV, selectInsuranceTypeLOVLoaded } from '../insurance-type/insuranceTypeSlice';

import styles from './Client.module.css';

import { toast, ToastOptions } from 'react-toastify';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnDefinition } from '../../core/models/column-definition.model';
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
import { Toolbar } from 'primereact/toolbar';
import { dateConvertUtil } from '../../core/util/date-convert.util';
import { ProgressSpinner } from 'primereact/progressspinner';
import { MessageBox } from '../message-box/MessageBox';
import { BlockUI } from 'primereact/blockui';
import { CustomMessage } from '../../core/models/custom-message.model';


export function ClientViewer()
{
    const dateConvert = dateConvertUtil();

    const client = useAppSelector(selectedClient);

    const messages = useAppSelector(selectMessages);

    const insuranceTypeLOV = useAppSelector(selectInsuranceTypeLOV);
    const insuranceTypeLOVLoaded = useAppSelector(selectInsuranceTypeLOVLoaded);

    //const displayedMessages = useAppSelector(selectDisplayedMessages);

    const [ showBlockUI, setShowBlockUI ] = useState(false);
    const [ showProgressSpinner, setShowProgressSpinner ] = useState(false);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [selectedClientType, setSelectedClientType] = useState(null);
    const [displayedMessages, setDisplayedMessages ] = useState([] as CustomMessage[])

    const clientTypes = [
        {label: 'Fizi??ka osoba', value: 'fizi??ka osoba'},
        {label: 'Pravna osoba', value: 'pravna osoba'},
    ];

    useEffect(() => {    
        console.log("use effect in client viewer LOV loaded" + insuranceTypeLOVLoaded)
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
        navigate("/clients");
      //let fullPath = router.currentRoute.value.fullPath;
      //router.push({ path: fullPath.substring(0, fullPath.lastIndexOf('/') + 1) + 'data-table'});
    }

    function save()
    {
        setShowProgressSpinner(true)    
        setShowBlockUI(true)
    
        setTimeout(function() { 
          dispatch(saveClient());
    
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


    return (
        <div >
            
            <div className="flex align-content-center justify-content-center flex-wrap" >

                {showProgressSpinner &&  
                <div className="absolute z-5 flex align-content-center justify-content-center flex-wrap card-container blue-container" style={{height: 'calc(100vh - 6rem)'}}>
                    <ProgressSpinner className="flex align-items-center justify-content-center" strokeWidth="3" animationDuration="5" /> 
                </div> }
            </div>

            <BlockUI blocked={showBlockUI} className="z-4 m-0 p-0 " style={{height: 'calc(100vh - 7.5rem)', left: '-0.5rem'}}>

                <div className='grid w-full'>

                    <div className='col-12 m-0 py-2 pl-2 ' style={{backgroundColor: 'var(--surface-d)'}}>
                        <h2 className='m-0 p-0'>Klijenti</h2>
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

                                    <Panel header="Op??enito" toggleable={true} >
                                        <div className="grid m-0 p-0">
                                            <div className="col-3 text-right">
                                                <label htmlFor="clientID" className="block m-0 pt-3">Id:</label>
                                            </div>
                                            <div className="col-9">
                                                <InputNumber 
                                                    id="clientID" 
                                                    placeholder="Id" 
                                                    className="w-full" 
                                                    readOnly
                                                    inputStyle={{backgroundColor: 'var(--surface-c)'}}
                                                    value={client.clientID} 
                                                    onValueChange={(e) => setValue("clientID", e.value)}                                                      
                                                />
                                            </div>
                                            <div className="col-3 text-right">
                                                <label htmlFor="clientType" className="block m-0 pt-3">Tip klijenta:</label>
                                            </div>
                                            <div className="col-9">
                                                <Dropdown 
                                                    id="clientType" 
                                                    optionLabel="label" 
                                                    optionValue='value' 
                                                    options={clientTypes} 
                                                    className="w-full" 
                                                    placeholder="Tip klijenta" 
                                                    value={client.clientType}
                                                    onChange={(e) => setValue("clientType", e.value)}
                                                />
                                            </div>
                                            <div className="col-3 text-right">
                                                <label htmlFor="name" className="block m-0 pt-3">Naziv:</label>
                                            </div>
                                            <div className="col-9">
                                                <InputText 
                                                    id="name" 
                                                    placeholder="Naziv" 
                                                    className="w-full" 
                                                    value={client.name || ''} 
                                                    onChange={(e) => setValue("name", e.target.value)}  
                                                />
                                            </div>
                                            <div className="col-3 text-right">
                                                <label htmlFor="gsm" className="block m-0 pt-3">GSM:</label>
                                            </div>
                                            <div className="col-9">
                                                <InputText 
                                                    id="gsm" 
                                                    placeholder="Mobitel" 
                                                    className="w-full" 
                                                    value={client.gsm || ''} 
                                                    onChange={(e) => setValue("gsm", e.target.value)}
                                                />
                                            </div>
                                            <div className="col-3 text-right">
                                                <label htmlFor="email" className="block m-0 pt-3">Email:</label>
                                            </div>
                                            <div className="col-9">
                                                <InputText 
                                                    id="email" 
                                                    placeholder="Email" 
                                                    className="w-full" 
                                                    value={client.email || ''} 
                                                    onChange={(e) => setValue("email", e.target.value)} 
                                                />
                                            </div>
                                            <div className="col-3 text-right">
                                                <label htmlFor="oib" className="block m-0 pt-3">OIB:</label>
                                            </div>
                                            <div className="col-9">
                                                <InputText 
                                                    id="oib" 
                                                    placeholder="OIB" 
                                                    className="w-full" 
                                                    value={client.oib || ''} 
                                                    onChange={(e) => setValue("oib", e.target.value)} 
                                                />
                                            </div>
                                            <div className="col-3 text-right">
                                                <label htmlFor="mbr" className="block m-0 pt-3">Mati??ni broj:</label>
                                            </div>
                                            <div className="col-9">
                                                <InputText 
                                                    id="mbr" 
                                                    placeholder="Mati??ni broj" 
                                                    className="w-full" 
                                                    value={client.mbr || ''} 
                                                    onChange={(e) => setValue("mbr", e.target.value)} 
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
                                                            value={ client.dateFrom !== undefined && client.dateFrom !== null ? new Date(client.dateFrom) : undefined } 
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
                                                            value={  client.dateTo !== undefined && client.dateTo !== null ? new Date(client.dateTo) : undefined  } 
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
                                                    checked={ client.active } 
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
                                                    value={dateConvert.getDateTimeUTCString(client.createDate) || ''} 
                                                    
                                                />
                                            </div>          
                                            <div className="col-3 text-right">
                                                <label htmlFor="createUser" className="block m-0 pt-3">Kreirao:</label>
                                            </div>
                                            <div className="col-9">
                                                <InputText 
                                                    id="createUser" 
                                                    placeholder="Kreirao" 
                                                    readOnly
                                                    className="w-full" 
                                                    style={{backgroundColor: 'var(--surface-c)'}}
                                                    value={client.createUser || ''} 
                                                />
                                            </div>
                                            <div className="col-3 text-right">
                                                <label htmlFor="updateDate" className="block m-0 pt-3">Datum a??uriranja:</label>
                                            </div>
                                            <div className="col-9 pb-0">
                                                <InputText 
                                                    id="updateDate" 
                                                    placeholder="Datum a??uriranja" 
                                                    readOnly
                                                    className="w-full" 
                                                    style={{backgroundColor: 'var(--surface-c)'}}
                                                    value={dateConvert.getDateTimeUTCString(client.updateDate) || ''} 
                                                />
                                            </div>          
                                            <div className="col-3 text-right">
                                                <label htmlFor="updateUser" className="block m-0 pt-3">A??urirao:</label>
                                            </div>
                                            <div className="col-9">
                                                <InputText 
                                                    id="updateUser" 
                                                    placeholder="A??urirao" 
                                                    readOnly
                                                    className="w-full" 
                                                    style={{backgroundColor: 'var(--surface-c)'}}
                                                    value={client.updateUser || ''} 
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