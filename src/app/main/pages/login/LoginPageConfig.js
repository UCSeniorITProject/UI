import React from 'react';

export const LoginConfig = {
    settings: {
        layout: {
						style: 'layout1',
            config: {
							scroll : 'content',
							navbar : {
									display : false,
									folded  : false,
									position: 'left'
							},
							toolbar: {
									display : false,
									style   : 'fixed',
									position: 'below'
							},
							footer : {
									display : false,
									style   : 'fixed',
									position: 'below'
							},
							mode   : 'fullwidth'
						}
        }
    },
    routes  : [
        {
            path     : '/',
            component: React.lazy(() => import('./LoginPage'))
        }
    ]
};
