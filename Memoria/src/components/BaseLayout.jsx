// Code Citations
// This was adapted from the base MUI documentation.

import React from 'react';
import NavBar from './NavBarMUI';

const BaseLayout = ({children}) => {
    return (
        <div>
            <NavBar></NavBar>
            <main style={{marginTop: '10px'}}>
                {children}
            </main>
        </div>
    )
}

export default BaseLayout;