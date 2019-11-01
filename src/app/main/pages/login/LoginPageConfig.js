import React from 'react';

export const Login2PageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/',
            component: React.lazy(() => import('./Login2Page'))
        }
    ]
};
