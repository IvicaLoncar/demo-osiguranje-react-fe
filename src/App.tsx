import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';


import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "primereact/resources/themes/bootstrap4-light-purple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'primeflex/primeflex.css';


import { ScrollPanel } from 'primereact/scrollpanel';
import { PanelMenu } from 'primereact/panelmenu';

import { Footer } from './app/demo-insurance/general/header/Footer';
import { Header } from './app/demo-insurance/general/footer/Header';
//import { getMainMenu } from './app/demo-insurance/core/data/menu-items';
import { MenuItem, MenuItemOptions } from 'primereact/menuitem';


function App() {

  const navigate = useNavigate();

  //const mainMenuItems: MenuItem[] = getMainMenu();

  const mainMenuItems: MenuItem[] = [
        {
            id: '90',
            label:'Matični podaci',
            icon:'pi pi-fw pi-file',
            //command: () => { klik('0'); },
            items:[
                {
                    id: '9001',
                    label:'Vrste osiguranja',
                    command: (event) => { navigate("/insurance-types"); }
                },
            ]
        },
        {
            id: '91',
            label:'Klijenti',
            icon:'pi pi-fw pi-file',
            //command: () => { klik('0'); },
            items:[
                {
                    id: '9101',
                    label:'Klijenti',
                    command: (event) => { navigate("/clients"); }
                },
            ]
        },
        {
            id: '92',
            label:'Police',
            icon:'pi pi-fw pi-file',
            //command: () => { klik('0'); },
            items:[
                {
                    id: '9101',
                    label:'Police',
                    command: (event) => { navigate("/insurance-policies"); }
                },
            ]
        },

    ];



  function paneMenuIconClassName(iconName: string, menuIconName: string): string
  {
    return iconName + ' ' + menuIconName;
  } 

  /*useEffect(() => {
    if (mainMenuItems !== undefined && mainMenuItems.length > 0)
    {
        for(let i = 0; i < mainMenuItems.length; i++)
        {
            assignTemplateToMenuItem(mainMenuItems[i]);
        }
    }
    console.log("menu: " + JSON.stringify(mainMenuItems))
  });*/

  function assignTemplateToMenuItem(menuItem: MenuItem)
  {
      if (menuItem !== undefined)
      {
        if (menuItem !== undefined && menuItem.items !== undefined && menuItem.items.length === 0)
        {
          menuItem.command = (event) => { navigate("/client"); };
        }
        /*  menuItem.template = (item: MenuItem, options: MenuItemOptions) => {
              return (
                <>
                  {item !== undefined && item.id !== undefined && item.id.length === 2 &&
                    <div className="p-panelmenu-header" onClick={() => toggleElement(item.id ? item.id : '')} >
                      <a href="item.url" className="p-menuitem-link" onClick={() => itemClick(item.id, item.label?.toString())}>
                        {item.items != null && item.items.length > 0 && !(expandedKeys as any)[item.id] &&
                          <i className="pi pi-chevron-right p-panelmenu-icon" ></i>}
                        {item.items != null && item.items.length > 0 && (expandedKeys as any)[item.id] &&
                          <i className="pi pi-chevron-down p-panelmenu-icon" ></i>}
                        {item.icon != null && item.icon !== '' &&
                          <>
                          <i className={paneMenuIconClassName(item.icon, 'p-panelmenu-icon')} ></i>
                          <span className="p-menuitem-text">{item.label}</span>
                          </>}
                      </a>
                  </div>}
                  {item !== undefined && item.id !== undefined && item.id.length !== 2 &&
                    <div onClick={() => toggleElement(item.id ? item.id : '')}>
                      <div className="p-menuitem">
                          <a href="item.url" className="p-menuitem-link" onClick={() => itemClick(item.id, item.label?.toString())}>
                            {item.items != null && item.items.length > 0 && !(expandedKeys as any)[item.id ? item.id : ''] &&
                              <i className="pi pi-angle-right p-panelmenu-icon" ></i>}
                            {item.items != null && item.items.length > 0 && (expandedKeys as any)[item.id ? item.id : ''] &&
                              <i className="pi pi-angle-down p-panelmenu-icon" ></i>}
                            {item.icon != null && item.icon !== '' &&
                              <>
                              <i className={paneMenuIconClassName(item.icon, 'p-menuitem-icon')} ></i>
                              <span className="p-menuitem-text">{item.label}</span>
                              </>}
                          </a>
                      </div>
                  </div>}
                </>
              );
            };*/
          menuItem.expanded = true;
          if (menuItem !== undefined && menuItem.items !== undefined && menuItem.items.length > 0)
          {
              for (let child of menuItem.items) 
              {
                  if (!Array.isArray(child))
                  {
                      assignTemplateToMenuItem(child);
                  }
              }
          }
      }
  }

  let expandedKeys = {};


  function expandElement(node: MenuItem, id: string) 
  {
      if (node.items && node.items.length) 
      {
          if (node != null && node.id != null && id.substring(0, node.id.length) === node.id)
          {
              (expandedKeys as any)[node.id] = true;
          }

          for (let child of node.items) {
            if (!Array.isArray(child))
            {
              expandElement(child, id);
            }
          }
      }
  };


  function  startCollapseAllElements() 
  {
      for (let node of mainMenuItems) 
      {
          collapseElement(node);
      }

      expandedKeys = {
          ...expandedKeys
      };
  };



  function  toggleElement(id: string) 
  {
      for (let node of mainMenuItems) 
      {
          toggleElementByKey(node, id);
      }

      expandedKeys = {
          ...expandedKeys
      };
  };

  function toggleElementByKey(node: MenuItem, id: string) 
  {
      if (node.items && node.items.length) 
      {
          if (node != null && node.id != null && id === node.id)
          {
              (expandedKeys as any)[node.id] = !((expandedKeys as any)[node.id]);
          }

          for (let child of node.items) 
          {
            if (!Array.isArray(child))
            {
              toggleElementByKey(child, id);
            }
          }
      }
  };

  function  startCollapseElement(id: string) 
  {
      for (let node of mainMenuItems) 
      {
          collapseElementByKey(node, id);
      }

      expandedKeys = {
          ...expandedKeys
      };
  };

  function collapseElementByKey(node: MenuItem, id: string) 
  {
      if (node.items && node.items.length) 
      {
          if (node != null && node.id != null && id.substring(0, node.id.length) === node.id)
          {
              (expandedKeys as any)[node.id] = false;
          }

          for (let child of node.items) 
          {
            if (!Array.isArray(child))
            {
              collapseElement(child);
            }
          }
      }
  };

  function collapseElement(node: MenuItem) 
  {
      if (node.items && node.items.length) 
      {
          if (node != null && node.id != null)
          {
              (expandedKeys as any)[node.id] = false;
          }

          for (let child of node.items) 
          {
            if (!Array.isArray(child))
            {
              collapseElement(child);
            }
          }
      }
  };


  async function itemClick(id?: string, label?: string)
  {
      console.log("item click: " + id);
      if (id !== undefined)
      {
         /* let keyParts: string[] = id.split("#");
          console.log("menu item click " + id)
          if (keyParts.length > 1)
          {
              desktopStore.deallocateLayoutNodeExtSlots('1-1');
              await nextTick();
              //startComponent(componentName: string, label: string, dataStoreId: number, userID: number)
              let dataStoreSpecification: DataStoreInstanceConfig 
                  = dataStoreInstanceStore.getBestFitDataStoreCustomization(
                      (globalData.value.userID !== undefined ? globalData.value.userID : 0),
                      -1,
                      (keyParts.length > 1 ? keyParts[1] : ''),
                      '',
                      '',
                      '');
              desktopStore.setSelectedLayout(
                  'App.itemClick',
                  2, 
                  dataStoreSpecification.userID, 
                  555555551, 
                  desktopStore.$state.selectedLayoutNodePath, 
                  '1-1', 
                  (keyParts.length > 1 ? keyParts[1] : ''), 
                  '',
                  '',
                  '',
                  translationStore.getTranslatedText(
                      (keyParts.length > 1 ? keyParts[1] : ''), 
                      (keyParts.length > 2 ? keyParts[2] : ''), 
                      (globalData.value.language !== undefined ? globalData.value.language : ''),
                      (globalData.value.defaultLanguage !== undefined ? globalData.value.defaultLanguage : '')),
                  (globalData.value.language !== undefined ? globalData.value.language : ''),
                  (globalData.value.defaultLanguage !== undefined ? globalData.value.defaultLanguage : '')
              );

          }*/
      }
  }

  /*
                <Link to="/claim-management">Claim management</Link> | {" "}
            <Link to="/claim-tracker">Claim tracker</Link> | {" "}
            <Link to="/claim-first-notification">Claim first notification</Link> | {" "}
            <Link to="/counter">Counter</Link> | {" "}
            <Link to="/client">Client</Link>




  */

  return (
    <div className="ml-1" >


        <div className="fixed top-0 left-0 m-0 p-0 z-3" style={{'width': 'calc(100vw - 0.5rem)'}} >
            <Header></Header>
        </div>

        <ToastContainer />
 
        <div className="grid w-full" style={{'paddingTop': '3.75rem'}} >

          <div className="col-2  z-3">
            <ScrollPanel style={{width: 'auto', height: 'calc(100vh - 7.5rem'}} >
              <PanelMenu model={mainMenuItems} onMouseLeave={startCollapseAllElements} >                    
              </PanelMenu>             
            </ScrollPanel>
          </div>

          <div className="col-10 pt-3">
            <Outlet />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 z-3" style={{'width': 'calc(100vw - 0.5rem)'}} >        
            <Footer></Footer>
        </div>

    </div>
    
  );
}

export default App;
