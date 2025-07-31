// Code Citations
// This was adapted from the base MUI documentation.

import React from 'react';

const BaseLayout = ({children}) => {
    return (
        <div>
            <main style={{marginTop: '10px'}}>
                {children}
            </main>
        </div>
    )
}

export default BaseLayout;