
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Toolbar } from 'primereact/toolbar';
import React, { MouseEventHandler } from 'react';

export function MessageBox(props: any) {


    const leftContents = (
        <React.Fragment>
            <Button label="New" icon="pi pi-plus" className="mr-2" />
            <Button label="Upload" icon="pi pi-upload" className="p-button-success" />
            <i className="pi pi-bars p-toolbar-separator mr-2" />
            <SplitButton label="Save" icon="pi pi-check" className="p-button-warning"></SplitButton>
            message box
        </React.Fragment>
    );
    
    const rightContents = (
        <React.Fragment>
            <Button icon="pi pi-search" className="mr-2" />
            <Button icon="pi pi-calendar" className="p-button-success mr-2" />
            <Button icon="pi pi-times" className="p-button-danger" />
        </React.Fragment>
    );


    const onConfirm = () => {
        props.confirmed();
        //event.preventDefault();
        //console.log("event u message boxu ")
    }

    const onCancel = () => {
        props.canceled();
    }

    return (
        <div className="grid " >
  
  
  
        <div className="col-12 font-bold" style={{height: '2em',  backgroundColor: 'var(--surface-d)'}}>
          {props.title}
        </div>
        
        <div className="col-12 text-center " style={{backgroundColor: 'var(--surface-b)'}}>
          <p className="my-3 -mx-8">
                {props.message}
          </p>
        </div>
    
        <div className="col-12">
          <div className="grid">
            <div className="col-6" style={{backgroundColor: 'var(--surface-b)'}} >
              <Button className="p-button p-button-primary w-full" label="Obriši" icon="pi pi-check" iconPos="right" onClick={onConfirm}></Button>    
            </div>
            <div className="col-6" style={{backgroundColor: 'var(--surface-b)'}}>
              <Button className="p-button p-button-danger w-full" label="Odustani" icon="pi pi-times" iconPos="right" onClick={onCancel} ></Button>   
            </div>
          </div>
        </div>
      
      
    
      </div>
    );
}