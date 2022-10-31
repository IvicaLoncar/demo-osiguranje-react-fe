import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route, } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './app/demo-insurance/core/store/store';
import { ClientTable } from './app/demo-insurance/general/client/ClientTable';
import { ClientViewer } from './app/demo-insurance/general/client/ClientViewer';
import { InsuranceTypeTable } from './app/demo-insurance/general/insurance-type/InsuranceTypeTable';
import { InsuranceTypeViewer } from './app/demo-insurance/general/insurance-type/InsuranceTypeViewer';
import { InsurancePolicyTable } from './app/demo-insurance/general/insurance-policy/InsurancePolicyTable';
import { InsurancePolicyViewer } from './app/demo-insurance/general/insurance-policy/InsurancePolicyViewer';

import './index.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route path="clients" element={<ClientTable />} />
            <Route path="client" element={<ClientViewer />} />
            <Route path="insurance-types" element={<InsuranceTypeTable />} />
            <Route path="insurance-type" element={<InsuranceTypeViewer />} />
            <Route path="insurance-policies" element={<InsurancePolicyTable />} />
            <Route path="insurance-policy" element={<InsurancePolicyViewer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
