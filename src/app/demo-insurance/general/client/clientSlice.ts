import { CustomData } from './../../core/models/custom-metadata.model';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../core/store/store';
import { useEndpointAccessUtil } from '../../core/util/endpoint-access.util';
import { Client, ClientCollection, cloneClient, dummyClient, dummyClientCollection } from './Client.model';
import { dummyRestResponse, RestResponse } from '../../core/models/rest-response.model';
import { ColumnValue } from '../../core/models/column-value.model';
import { dummyRestGetParams, RestGetParams } from '../../core/models/rest-get-params.model';
import { dummyCustomData } from '../../core/models/custom-data.model';
import { getGlobalConfig } from '../../core/config/global.config';


export interface ClientState {
  dataTable: ClientCollection
}

const initialState: ClientState = {
  dataTable: dummyClientCollection(),
};


export const fetchClients = createAsyncThunk(
  'client/fetchClients',
  async ( restGetParams: RestGetParams) => {

    let endpointAccess = useEndpointAccessUtil();

    let response: RestResponse = dummyRestResponse();

    let endpoint: string
      = getGlobalConfig().server 
      + "/api/osiguranje/general/client/clients?"
      + "page=" + (restGetParams.page !== undefined ?  restGetParams.page.toString() : "0&")
      + "&rows=" + (restGetParams.rows !== undefined ? restGetParams.rows.toString() : "20")
      + (restGetParams.filter !== undefined && restGetParams.filter?.trim() !== "" ? "&filter=" +  restGetParams.filter?.trim() : "")
      + (restGetParams.sort !== undefined && restGetParams.sort?.trim() !== "" ? "&sort=" +  restGetParams.sort?.trim() : "")
      + (restGetParams.includeColumns !== undefined && restGetParams.includeColumns?.trim() !== "" ? "&include-columns=" +  restGetParams.includeColumns?.trim() : "")
      + (restGetParams.excludeColumns !== undefined && restGetParams.excludeColumns?.trim() !== "" ? "&exclude-columns=" +  restGetParams.excludeColumns?.trim() : "")
      + (restGetParams.domain !== undefined && restGetParams.domain?.trim() !== "" ? "&domain=" +  restGetParams.domain?.trim() : "");

    console.log("AAAAAA endpoint: " + JSON.stringify(restGetParams));
 
    await endpointAccess.restGet(endpoint)
    .then(response2 => {
        console.log("response klijenti vraćeno u thunk: " + JSON.stringify(response2))
        response = response2;
    });
    
    return response;
  }
);

export const saveClient = createAsyncThunk(
  'client/saveClient',
  async (arg, { getState }) => {

    const state: RootState = getState() as RootState; 
  

    let endpointAccess = useEndpointAccessUtil();

    let response: RestResponse = dummyRestResponse();


    let requestObject: CustomData = dummyCustomData();
    requestObject.metadata.pageNumber = state.clients.dataTable.pageNumber;
    requestObject.metadata.rowsPerPage = state.clients.dataTable.rowsPerPage;
    //let client: Client = dummyClient();
    requestObject.data = cloneClient(state.clients.dataTable.currentRow);

   console.log("unutar client slice saveClient " + JSON.stringify(requestObject));


   // let tmprowid: number = rowID;



   if (state.clients.dataTable.currentRow.clientID === undefined || state.clients.dataTable.currentRow.clientID < 0)
   {
     await endpointAccess.restPost(getGlobalConfig().server + '/api/osiguranje/general/client/clients/', requestObject)
     .then(response2 => {
         console.log("post klijent vraćeno u thunk: " + JSON.stringify(response2))
         response = response2;
     });
   }
   else
   {
    await endpointAccess.restPut(getGlobalConfig().server + '/api/osiguranje/general/client/clients/' + state.clients.dataTable.currentRow.clientID.toString(), requestObject)
    .then(response2 => {
        console.log("post klijent vraćeno u thunk: " + JSON.stringify(response2))
        response = response2;
    });
   }

    return response;
  }
);

export const deleteClient = createAsyncThunk(
  'client/deleteClient',
  async ( rowID: number) => {

    let endpointAccess = useEndpointAccessUtil();

    let response: RestResponse = dummyRestResponse();

    console.log("unutar client slice deleteClient rowID = " + rowID)

   // let tmprowid: number = rowID;

    await endpointAccess.restDelete(getGlobalConfig().server + '/api/osiguranje/general/client/clients/' + rowID.toString())
    .then(response2 => {
        console.log("delete klijent vraćeno u thunk: " + JSON.stringify(response2))
        response = response2;
    });
    
    return response;
  }
);

export const clientSlice = createSlice({
  name: 'clientSlice',
  initialState,
  
  reducers: {
    setCurrentRow: (state, action: PayloadAction<number>) => {

      console.log("došao u setCurrentRow " + JSON.stringify( action.payload))
      let newCurrentRow: Client = dummyClient();
      if (action.payload !== undefined && state.dataTable !== undefined && state.dataTable.rows !== undefined)
      {
        for (let i = 0; i < state.dataTable.rows.length; i++)
        {
          if (state.dataTable.rows[i].clientID !== undefined &&
              state.dataTable.rows[i].clientID === action.payload)
          {
            newCurrentRow = state.dataTable.rows[i];
            break;
          }
        }
      }
      state.dataTable.currentRow = cloneClient(newCurrentRow);
      state.dataTable.originalRow = cloneClient(newCurrentRow);
    },
    setColumnValue: (state, action: PayloadAction<ColumnValue>) => {

      if (action.payload !== undefined)
      {
        switch(action.payload.name.trim().toUpperCase()) 
        { 
          case "clientType".trim().toUpperCase(): { state.dataTable.currentRow.clientType = action.payload.value; break; } 
          case "name".trim().toUpperCase(): { state.dataTable.currentRow.name = action.payload.value; break; } 
          case "gsm".trim().toUpperCase(): { state.dataTable.currentRow.gsm = action.payload.value; break; } 
          case "email".trim().toUpperCase(): { state.dataTable.currentRow.email = action.payload.value; break; } 
          case "oib".trim().toUpperCase(): { state.dataTable.currentRow.oib = action.payload.value; break; } 
          case "mbr".trim().toUpperCase(): { state.dataTable.currentRow.mbr = action.payload.value; break; } 
          case "dateFrom".trim().toUpperCase(): { state.dataTable.currentRow.dateFrom = action.payload.value; break; } 
          case "dateTo".trim().toUpperCase(): { state.dataTable.currentRow.dateTo = action.payload.value; break; } 
          case "active".trim().toUpperCase(): { state.dataTable.currentRow.active = action.payload.value; break; } 
          default: {}
        } 
      }

    },
    clearMessages: (state) => {
      //console.log("došao u set displayed messages")
      //state.dataTable.dispalyedMessages = state.dataTable.messages;
      state.dataTable.messages = [];
    },   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.dataTable.status = 'loading';
        console.log("dohvaćeni podaci pending ")
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.dataTable.status = 'idle';
        console.log("dohvaćeni podaci fulfilled " + JSON.stringify(action.payload.data))
        //console.log("dohvaćeni podaci " + JSON.stringify(action.payload))
        let clients: Client[] = action.payload.data?.data !== undefined ? action.payload.data.data : [];
        state.dataTable.rows = clients;
        state.dataTable.pageNumber = action.payload.data?.metadata !== undefined ? action.payload.data.metadata.pageNumber : 0;
        state.dataTable.rowsPerPage = action.payload.data?.metadata !== undefined ? action.payload.data.metadata.rowsPerPage : 0;
        state.dataTable.totalNumberOfRows = action.payload.data?.metadata !== undefined ? action.payload.data.metadata.numberOfRows : 0;
        state.dataTable.messages =  action.payload.data?.messages !== undefined ? action.payload.data?.messages : [];
        state.dataTable.dispalyedMessages = [];
      })
      .addCase(fetchClients.rejected, (state) => {
        state.dataTable.status = 'failed';
        console.log("dohvaćeni podaci failed ")
      })
      .addCase(deleteClient.pending, (state) => {
        state.dataTable.status = 'loading';
        console.log("brisanje klijenta pending ")
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.dataTable.status = 'idle';
        console.log("brisanje klijenta fulfilled " + JSON.stringify(action))
        //console.log("dohvaćeni podaci " + JSON.stringify(action.payload))
        //let clients: Client[] = action.payload.data?.data !== undefined ? action.payload.data.data : [];
        // state.dataTable.rows = clients;
        if (action.meta.arg !== undefined)
        {
          for (let i = 0; i < state.dataTable.rows.length; i++)
          {
            if (state.dataTable.rows[i].clientID == action.meta.arg)
            {
              state.dataTable.rows.splice(i, 1);
              break;
            }
          }
        }
        state.dataTable.messages =  action.payload.data?.messages !== undefined ? action.payload.data?.messages : [];
        state.dataTable.dispalyedMessages = [];
      })
      .addCase(deleteClient.rejected, (state) => {
        state.dataTable.status = 'failed';
        console.log("brisanje klijenta failed ")
      })
      .addCase(saveClient.pending, (state) => {
        state.dataTable.status = 'loading';
        console.log("save klijenta pending ")
      })
      .addCase(saveClient.fulfilled, (state, action) => {
        state.dataTable.status = 'idle';
        console.log("save klijenta fulfilled " + JSON.stringify(action.payload.status === 409))
        if (action.payload.status === 200) // PUT ok
        {
          console.log("status je 200")
          state.dataTable.currentRow = action.payload.data?.data;
          state.dataTable.originalRow = action.payload.data?.data;
          let rows: Client[] = state.dataTable.rows;
          if (rows !== undefined && rows.length > 0)
          {
            for (let i = 0; i < rows.length; i++)
            {
              if (rows[i].clientID === state.dataTable.currentRow.clientID)
              {
                rows[i] = action.payload.data?.data;
                break;
              }
            }
          }   
          state.dataTable.messages =  action.payload.data?.messages !== undefined ? action.payload.data?.messages : [];
          state.dataTable.dispalyedMessages = [];  
        }
        if (action.payload.status === 201) // POST OK
        {
          console.log("status je 201")
          state.dataTable.messages = [];
          state.dataTable.dispalyedMessages = [];
          state.dataTable.currentRow = action.payload.data?.data;
          state.dataTable.originalRow = action.payload.data?.data;
          state.dataTable.messages =  action.payload.data?.messages !== undefined ? action.payload.data?.messages : [];
          state.dataTable.dispalyedMessages = [];
        }
        if (action.payload.status === 409) // PUT/POST NOK
        {
          console.log("status je 409")
          if (action.payload.data?.messages !== undefined)
          {
            console.log("pridruživanje messages")
            state.dataTable.messages =  action.payload.data?.messages !== undefined ? action.payload.data?.messages : [];
            state.dataTable.dispalyedMessages = [];
          }
        }

        //console.log("dohvaćeni podaci " + JSON.stringify(action.payload))
        //let clients: Client[] = action.payload.data?.data !== undefined ? action.payload.data.data : [];
        // state.dataTable.rows = clients;
      })
      .addCase(saveClient.rejected, (state) => {
        state.dataTable.status = 'failed';
        console.log("save klijenta failed ")
      });
  },
});

export const { setCurrentRow, setColumnValue, clearMessages } = clientSlice.actions;


// selektori
export const selectClients = (state: RootState) => state.clients.dataTable.rows;

export const selectedClient = (state: RootState) => state.clients.dataTable.currentRow;

export const selectPageNumber = (state: RootState) => state.clients.dataTable.pageNumber;

export const selectRowsPerPage = (state: RootState) => state.clients.dataTable.rowsPerPage;

export const selectTotalNumberOfRows = (state: RootState) => state.clients.dataTable.totalNumberOfRows;

export const selectMessages = (state: RootState) => state.clients.dataTable.messages;

export const selectDisplayedMessages = (state: RootState) => state.clients.dataTable.dispalyedMessages;



export default clientSlice.reducer;
