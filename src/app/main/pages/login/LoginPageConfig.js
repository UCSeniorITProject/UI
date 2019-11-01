import React from 'react';

export const LoginConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/',
            component: React.lazy(() => import('./LoginPage'))
        }
    ]
};
