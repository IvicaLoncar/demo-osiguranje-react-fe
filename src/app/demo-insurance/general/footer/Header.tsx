
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Toolbar } from 'primereact/toolbar';
import React from 'react';

export function Header() {


    const leftContents = (
        <React.Fragment>
            Header (not implemented)
        </React.Fragment>
    );
    
    const rightContents = (
        <React.Fragment>

        </React.Fragment>
    );


    return (
        <Toolbar left={leftContents} right={rightContents} className="m-0 py-0 px-2 bg-blue-100" style={{'height': '3.5rem'}} > 
            
         </Toolbar>
    );
}