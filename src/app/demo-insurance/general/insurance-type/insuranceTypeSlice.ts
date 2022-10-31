import { CustomMessage } from './../../core/models/custom-message.model';
import { CustomData } from '../../core/models/custom-metadata.model';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../core/store/store';
import { useEndpointAccessUtil } from '../../core/util/endpoint-access.util';
import { InsuranceType, InsuranceTypeCollection, cloneInsuranceType, dummyInsuranceType, dummyInsuranceTypeCollection } from './InsuranceType.model';
import { dummyRestResponse, RestResponse } from '../../core/models/rest-response.model';
import { ColumnValue } from '../../core/models/column-value.model';
import { dummyRestGetParams, RestGetParams } from '../../core/models/rest-get-params.model';
import { dummyCustomData } from '../../core/models/custom-data.model';
import { getGlobalConfig } from '../../core/config/global.config';


export interface InsuranceTypeState {
  dataTable: InsuranceTypeCollection,
  insuranceTypeLOVLoaded: boolean;
  insuranceTypeLOV: InsuranceType[];
  insuranceTypeLOVMessages: CustomMessage[];
}

const initialState: InsuranceTypeState = {
  dataTable: dummyInsuranceTypeCollection(),
  insuranceTypeLOVLoaded: false,
  insuranceTypeLOV: [],
  insuranceTypeLOVMessages: []
};


export const fetchInsuranceTypes = createAsyncThunk(
  'insuranceType/fetchInsuranceTypes',
  async ( restGetParams: RestGetParams) => {

    let endpointAccess = useEndpointAccessUtil();

    let response: RestResponse = dummyRestResponse();

    let endpoint: string
      = getGlobalConfig().server 
      + "/api/osiguranje/general/insurance-type/insurance-types?"
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

export const saveInsuranceType = createAsyncThunk(
  'insuranceType/saveInsuranceType',
  async (arg, { getState }) => {

    const state: RootState = getState() as RootState; 
  

    let endpointAccess = useEndpointAccessUtil();

    let response: RestResponse = dummyRestResponse();


    let requestObject: CustomData = dummyCustomData();
    requestObject.metadata.pageNumber = state.insuranceTypes.dataTable.pageNumber;
    requestObject.metadata.rowsPerPage = state.insuranceTypes.dataTable.rowsPerPage;
    //let insuranceType: InsuranceType = dummyInsuranceType();
    requestObject.data = cloneInsuranceType(state.insuranceTypes.dataTable.currentRow);

   console.log("unutar insuranceType slice saveInsuranceType " + JSON.stringify(requestObject));


   // let tmprowid: number = rowID;

   if (state.insuranceTypes.dataTable.currentRow.insuranceTypeID === undefined || state.insuranceTypes.dataTable.currentRow.insuranceTypeID < 0)
   {
     await endpointAccess.restPost(getGlobalConfig().server + '/api/osiguranje/general/insurance-type/insurance-types/', requestObject)
     .then(response2 => {
         console.log("post klijent vraćeno u thunk: " + JSON.stringify(response2))
         response = response2;
     });
   }
   else
   {
    await endpointAccess.restPut(getGlobalConfig().server + '/api/osiguranje/general/insurance-type/insurance-types/' + state.insuranceTypes.dataTable.currentRow.insuranceTypeID.toString(), requestObject)
    .then(response2 => {
        console.log("post klijent vraćeno u thunk: " + JSON.stringify(response2))
        response = response2;
    });
   }

    return response;
  }
);

export const deleteInsuranceType = createAsyncThunk(
  'insuranceType/deleteInsuranceType',
  async ( rowID: number) => {

    let endpointAccess = useEndpointAccessUtil();

    let response: RestResponse = dummyRestResponse();

    console.log("unutar insuranceType slice deleteInsuranceType rowID = " + rowID)

   // let tmprowid: number = rowID;

    await endpointAccess.restDelete(getGlobalConfig().server + '/api/osiguranje/general/insurance-type/insurance-types/' + rowID.toString())
    .then(response2 => {
        console.log("delete klijent vraćeno u thunk: " + JSON.stringify(response2))
        response = response2;
    });
    
    return response;
  }
);

export const insuranceTypeSlice = createSlice({
  name: 'insuranceTypeSlice',
  initialState,
  
  reducers: {
    setCurrentRow: (state, action: PayloadAction<number>) => {

      console.log("došao u setCurrentRow " + JSON.stringify( action.payload))
      let newCurrentRow: InsuranceType = dummyInsuranceType();
      if (action.payload !== undefined && state.dataTable !== undefined && state.dataTable.rows !== undefined)
      {
        for (let i = 0; i < state.dataTable.rows.length; i++)
        {
          if (state.dataTable.rows[i].insuranceTypeID !== undefined &&
              state.dataTable.rows[i].insuranceTypeID === action.payload)
          {
            newCurrentRow = state.dataTable.rows[i];
            break;
          }
        }
      }
      state.dataTable.currentRow = cloneInsuranceType(newCurrentRow);
      state.dataTable.originalRow = cloneInsuranceType(newCurrentRow);
    },
    setColumnValue: (state, action: PayloadAction<ColumnValue>) => {

      if (action.payload !== undefined)
      {
        switch(action.payload.name.trim().toUpperCase()) 
        { 
          case "group".trim().toUpperCase(): { state.dataTable.currentRow.group = action.payload.value; break; } 
          case "name".trim().toUpperCase(): { state.dataTable.currentRow.name = action.payload.value; break; } 
          case "description".trim().toUpperCase(): { state.dataTable.currentRow.description = action.payload.value; break; } 
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
      .addCase(fetchInsuranceTypes.pending, (state) => {
        state.dataTable.status = 'loading';
        console.log("dohvaćeni podaci pending ")
      })
      .addCase(fetchInsuranceTypes.fulfilled, (state, action) => {
        state.dataTable.status = 'idle';
        console.log("dohvaćeni podaci fulfilled " + JSON.stringify(action.payload.data))
        //console.log("dohvaćeni podaci " + JSON.stringify(action.payload))
        if (action.payload.data?.metadata.domain.trim().toUpperCase() === "LOV".trim().toUpperCase())
        {
          let insuranceTypes: InsuranceType[] = action.payload.data?.data !== undefined ? action.payload.data.data : [];
          state.insuranceTypeLOV = insuranceTypes;
          state.insuranceTypeLOVMessages =  action.payload.data?.messages !== undefined ? action.payload.data?.messages : [];
          state.insuranceTypeLOVLoaded = true;
        }
        else
        {
          let insuranceTypes: InsuranceType[] = action.payload.data?.data !== undefined ? action.payload.data.data : [];
          state.dataTable.rows = insuranceTypes;
          state.dataTable.pageNumber = action.payload.data?.metadata !== undefined ? action.payload.data.metadata.pageNumber : 0;
          state.dataTable.rowsPerPage = action.payload.data?.metadata !== undefined ? action.payload.data.metadata.rowsPerPage : 0;
          state.dataTable.totalNumberOfRows = action.payload.data?.metadata !== undefined ? action.payload.data.metadata.numberOfRows : 0;
          state.dataTable.messages =  action.payload.data?.messages !== undefined ? action.payload.data?.messages : [];
          state.dataTable.dispalyedMessages = [];
        }
      })
      .addCase(fetchInsuranceTypes.rejected, (state) => {
        state.dataTable.status = 'failed';
        console.log("dohvaćeni podaci failed ")
      })
      .addCase(deleteInsuranceType.pending, (state) => {
        state.dataTable.status = 'loading';
        console.log("brisanje klijenta pending ")
      })
      .addCase(deleteInsuranceType.fulfilled, (state, action) => {
        state.dataTable.status = 'idle';
        console.log("brisanje klijenta fulfilled " + JSON.stringify(action))
        //console.log("dohvaćeni podaci " + JSON.stringify(action.payload))
        //let insuranceTypes: InsuranceType[] = action.payload.data?.data !== undefined ? action.payload.data.data : [];
        // state.dataTable.rows = insuranceTypes;
        if (action.meta.arg !== undefined)
        {
          for (let i = 0; i < state.dataTable.rows.length; i++)
          {
            if (state.dataTable.rows[i].insuranceTypeID == action.meta.arg)
            {
              state.dataTable.rows.splice(i, 1);
              break;
            }
          }
        }
        state.dataTable.messages =  action.payload.data?.messages !== undefined ? action.payload.data?.messages : [];
        state.dataTable.dispalyedMessages = [];
      })
      .addCase(deleteInsuranceType.rejected, (state) => {
        state.dataTable.status = 'failed';
        console.log("brisanje klijenta failed ")
      })
      .addCase(saveInsuranceType.pending, (state) => {
        state.dataTable.status = 'loading';
        console.log("save klijenta pending ")
      })
      .addCase(saveInsuranceType.fulfilled, (state, action) => {
        state.dataTable.status = 'idle';
        console.log("save klijenta fulfilled " + JSON.stringify(action.payload.status === 409))
        if (action.payload.status === 200) // PUT ok
        {
          console.log("status je 200")
          state.dataTable.currentRow = action.payload.data?.data;
          state.dataTable.originalRow = action.payload.data?.data;
          let rows: InsuranceType[] = state.dataTable.rows;
          if (rows !== undefined && rows.length > 0)
          {
            for (let i = 0; i < rows.length; i++)
            {
              if (rows[i].insuranceTypeID === state.dataTable.currentRow.insuranceTypeID)
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
        //let insuranceTypes: InsuranceType[] = action.payload.data?.data !== undefined ? action.payload.data.data : [];
        // state.dataTable.rows = insuranceTypes;
      })
      .addCase(saveInsuranceType.rejected, (state) => {
        state.dataTable.status = 'failed';
        console.log("save klijenta failed ")
      });
  },
});

export const { setCurrentRow, setColumnValue, clearMessages } = insuranceTypeSlice.actions;



export const selectInsuranceTypes = (state: RootState) => state.insuranceTypes.dataTable.rows;

export const selectedInsuranceType = (state: RootState) => state.insuranceTypes.dataTable.currentRow;

export const selectPageNumber = (state: RootState) => state.insuranceTypes.dataTable.pageNumber;

export const selectRowsPerPage = (state: RootState) => state.insuranceTypes.dataTable.rowsPerPage;

export const selectTotalNumberOfRows = (state: RootState) => state.insuranceTypes.dataTable.totalNumberOfRows;

export const selectMessages = (state: RootState) => state.insuranceTypes.dataTable.messages;

export const selectDisplayedMessages = (state: RootState) => state.insuranceTypes.dataTable.dispalyedMessages;

export const selectInsuranceTypeLOV = (state: RootState) => state.insuranceTypes.insuranceTypeLOV;

export const selectInsuranceTypeLOVLoaded = (state: RootState) => state.insuranceTypes.insuranceTypeLOVLoaded;



export default insuranceTypeSlice.reducer;
