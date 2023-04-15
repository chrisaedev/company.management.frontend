import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
const ItemsList = Loadable(lazy(() => import('features/storage/items/pages/ItemsList')));

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

//Auth Provider
import { AuthProvider } from 'context/AuthContext';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthProvider>
            <MainLayout />
        </AuthProvider>
    ),
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'main',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'features',
            children: [
                {
                    path: 'storage',
                    children: [
                        {
                            path: 'dashboard',
                            element: <DashboardDefault />
                        },
                        {
                            path: 'items',
                            element: <ItemsList />
                        }
                    ]
                }
            ]
        }
    ]
};

export default MainRoutes;
