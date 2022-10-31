import { CustomData } from '../../core/models/custom-metadata.model';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../core/store/store';
import { useEndpointAccessUtil } from '../../core/util/endpoint-access.util';
import { InsurancePolicy, InsurancePolicyCollection, cloneInsurancePolicy, dummyInsurancePolicy, dummyInsurancePolicyCollection } from './InsurancePolicy.model';
import { dummyRestResponse, RestResponse } from '../../core/models/rest-response.model';
import { ColumnValue } from '../../core/models/column-value.model';
import { dummyRestGetParams, RestGetParams } from '../../core/models/rest-get-params.model';
import { dummyCustomData } from '../../core/models/custom-data.model';
import { getGlobalConfig } from '../../core/config/global.config';


export interface InsurancePolicyState {
  dataTable: InsurancePolicyCollection
}

const initialState: InsurancePolicyState = {
  dataTable: dummyInsurancePolicyCollection(),
};


export const fetchInsurancePolicies = createAsyncThunk(
  'insurancePolicy/fetchInsurancePolicies',
  async ( restGetParams: RestGetParams) => {

    let endpointAccess = useEndpointAccessUtil();

    let response: RestResponse = dummyRestResponse();

    let endpoint: string
      = getGlobalConfig().server 
      + "/api/osiguranje/general/insurance-policy/insurance-policies?"
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

export const saveInsurancePolicy = createAsyncThunk(
  'insurancePolicy/saveInsurancePolicy',
  async (arg, { getState }) => {

    const state: RootState = getState() as RootState; 
  

    let endpointAccess = useEndpointAccessUtil();

    let response: RestResponse = dummyRestResponse();


    let requestObject: CustomData = dummyCustomData();
    requestObject.metadata.pageNumber = state.insurancePolicies.dataTable.pageNumber;
    requestObject.metadata.rowsPerPage = state.insurancePolicies.dataTable.rowsPerPage;
    //let insurancePolicy: InsurancePolicy = dummyInsurancePolicy();
    requestObject.data = cloneInsurancePolicy(state.insurancePolicies.dataTable.currentRow);

   console.log("unutar insurancePolicy slice saveInsurancePolicy " + JSON.stringify(requestObject));


   // let tmprowid: number = rowID;

   if (state.insurancePolicies.dataTable.currentRow.insurancePolicyID === undefined || state.insurancePolicies.dataTable.currentRow.insurancePolicyID < 0)
   {
     await endpointAccess.restPost(getGlobalConfig().server +  + '/api/osiguranje/general/insurance-policy/insurance-policies/', requestObject)
     .then(response2 => {
         console.log("post klijent vraćeno u thunk: " + JSON.stringify(response2))
         response = response2;
     });
   }
   else
   {
    await endpointAccess.restPut(getGlobalConfig().server + '/api/osiguranje/general/insurance-policy/insurance-policies/' + state.insurancePolicies.dataTable.currentRow.insurancePolicyID.toString(), requestObject)
    .then(response2 => {
        console.log("post klijent vraćeno u thunk: " + JSON.stringify(response2))
        response = response2;
    });
   }
    
    return response;
  }
);

export const deleteInsurancePolicy = createAsyncThunk(
  'insurancePolicy/deleteInsurancePolicy',
  async ( rowID: number) => {

    let endpointAccess = useEndpointAccessUtil();

    let response: RestResponse = dummyRestResponse();

    console.log("unutar insurancePolicy slice deleteInsurancePolicy rowID = " + rowID)

   // let tmprowid: number = rowID;

    await endpointAccess.restDelete(getGlobalConfig().server + '/api/osiguranje/general/insurance-policy/insurance-policies/' + rowID.toString())
    .then(response2 => {
        console.log("delete klijent vraćeno u thunk: " + JSON.stringify(response2))
        response = response2;
    });
    
    return response;
  }
);

export const insurancePolicySlice = createSlice({
  name: 'insurancePolicySlice',
  initialState,
  
  reducers: {
    setCurrentRow: (state, action: PayloadAction<number>) => {

      console.log("došao u setCurrentRow " + JSON.stringify( action.payload))
      let newCurrentRow: InsurancePolicy = dummyInsurancePolicy();
      if (action.payload !== undefined && state.dataTable !== undefined && state.dataTable.rows !== undefined)
      {
        for (let i = 0; i < state.dataTable.rows.length; i++)
        {
          if (state.dataTable.rows[i].insurancePolicyID !== undefined &&
              state.dataTable.rows[i].insurancePolicyID === action.payload)
          {
            newCurrentRow = state.dataTable.rows[i];
            break;
          }
        }
      }
      state.dataTable.currentRow = cloneInsurancePolicy(newCurrentRow);
      state.dataTable.originalRow = cloneInsurancePolicy(newCurrentRow);
    },
    setColumnValue: (state, action: PayloadAction<ColumnValue>) => {

      if (action.payload !== undefined)
      {
        switch(action.payload.name.trim().toUpperCase()) 
        { 
          case "insuranceTypeID".trim().toUpperCase(): { state.dataTable.currentRow.insuranceTypeID = action.payload.value; break; } 
          case "clientIDPolicyHolder".trim().toUpperCase(): { state.dataTable.currentRow.clientIDPolicyHolder = action.payload.value; break; } 
          case "clientIDInsured".trim().toUpperCase(): { state.dataTable.currentRow.clientIDInsured = action.payload.value; break; } 
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
      .addCase(fetchInsurancePolicies.pending, (state) => {
        state.dataTable.status = 'loading';
        console.log("dohvaćeni podaci pending ")
      })
      .addCase(fetchInsurancePolicies.fulfilled, (state, action) => {
        state.dataTable.status = 'idle';
        console.log("dohvaćeni podaci fulfilled " + JSON.stringify(action.payload.data))
        //console.log("dohvaćeni podaci " + JSON.stringify(action.payload))
        let insurancePolicies: InsurancePolicy[] = action.payload.data?.data !== undefined ? action.payload.data.data : [];
        state.dataTable.rows = insurancePolicies;
        state.dataTable.pageNumber = action.payload.data?.metadata !== undefined ? action.payload.data.metadata.pageNumber : 0;
        state.dataTable.rowsPerPage = action.payload.data?.metadata !== undefined ? action.payload.data.metadata.rowsPerPage : 0;
        state.dataTable.totalNumberOfRows = action.payload.data?.metadata !== undefined ? action.payload.data.metadata.numberOfRows : 0;
        state.dataTable.messages =  action.payload.data?.messages !== undefined ? action.payload.data?.messages : [];
        state.dataTable.dispalyedMessages = [];
      })
      .addCase(fetchInsurancePolicies.rejected, (state) => {
        state.dataTable.status = 'failed';
        console.log("dohvaćeni podaci failed ")
      })
      .addCase(deleteInsurancePolicy.pending, (state) => {
        state.dataTable.status = 'loading';
        console.log("brisanje klijenta pending ")
      })
      .addCase(deleteInsurancePolicy.fulfilled, (state, action) => {
        state.dataTable.status = 'idle';
        console.log("brisanje klijenta fulfilled " + JSON.stringify(action))
        //console.log("dohvaćeni podaci " + JSON.stringify(action.payload))
        //let insurancePolicies: InsurancePolicy[] = action.payload.data?.data !== undefined ? action.payload.data.data : [];
        // state.dataTable.rows = insurancePolicies;
        if (action.meta.arg !== undefined)
        {
          for (let i = 0; i < state.dataTable.rows.length; i++)
          {
            if (state.dataTable.rows[i].insurancePolicyID == action.meta.arg)
            {
              state.dataTable.rows.splice(i, 1);
              break;
            }
          }
        }
        state.dataTable.messages =  action.payload.data?.messages !== undefined ? action.payload.data?.messages : [];
        state.dataTable.dispalyedMessages = [];
      })
      .addCase(deleteInsurancePolicy.rejected, (state) => {
        state.dataTable.status = 'failed';
        console.log("brisanje klijenta failed ")
      })
      .addCase(saveInsurancePolicy.pending, (state) => {
        state.dataTable.status = 'loading';
        console.log("save klijenta pending ")
      })
      .addCase(saveInsurancePolicy.fulfilled, (state, action) => {
        state.dataTable.status = 'idle';
        console.log("save klijenta fulfilled " + JSON.stringify(action.payload.status === 409))
        if (action.payload.status === 200) // PUT ok
        {
          console.log("status je 200")
          state.dataTable.currentRow = action.payload.data?.data;
          state.dataTable.originalRow = action.payload.data?.data;
          let rows: InsurancePolicy[] = state.dataTable.rows;
          if (rows !== undefined && rows.length > 0)
          {
            for (let i = 0; i < rows.length; i++)
            {
              if (rows[i].insurancePolicyID === state.dataTable.currentRow.insurancePolicyID)
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
        //let insurancePolicies: InsurancePolicy[] = action.payload.data?.data !== undefined ? action.payload.data.data : [];
        // state.dataTable.rows = insurancePolicies;
      })
      .addCase(saveInsurancePolicy.rejected, (state) => {
        state.dataTable.status = 'failed';
        console.log("save klijenta failed ")
      });
  },
});

export const { setCurrentRow, setColumnValue, clearMessages } = insurancePolicySlice.actions;



export const selectInsurancePolicies = (state: RootState) => state.insurancePolicies.dataTable.rows;

export const selectedInsurancePolicy = (state: RootState) => state.insurancePolicies.dataTable.currentRow;

export const selectPageNumber = (state: RootState) => state.insurancePolicies.dataTable.pageNumber;

export const selectRowsPerPage = (state: RootState) => state.insurancePolicies.dataTable.rowsPerPage;

export const selectTotalNumberOfRows = (state: RootState) => state.insurancePolicies.dataTable.totalNumberOfRows;

export const selectMessages = (state: RootState) => state.insurancePolicies.dataTable.messages;

export const selectDisplayedMessages = (state: RootState) => state.insurancePolicies.dataTable.dispalyedMessages;



export default insurancePolicySlice.reducer;
