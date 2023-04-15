// assets
import { IconKey, IconBuildingWarehouse, IconDashboard, IconClipboardList, IconList } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconBuildingWarehouse,
    IconDashboard,
    IconClipboardList,
    IconList
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const features = {
    id: 'features',
    title: 'Features',
    // caption: 'Features List',
    type: 'group',
    children: [
        {
            id: 'storage',
            title: 'Storage',
            type: 'collapse',
            icon: icons.IconBuildingWarehouse,

            children: [
                {
                    id: 'storage_dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: 'features/storage/dashboard',
                    //target: true,
                    icon: icons.IconDashboard
                },
                {
                    id: 'storage_items',
                    title: 'Items',
                    type: 'item',
                    url: 'features/storage/items',
                    //target: true,
                    icon: icons.IconList
                },
                {
                    id: 'storage_inventory',
                    title: 'Inventory',
                    type: 'item',
                    url: 'features/storage/inventory',
                    //target: true,
                    icon: icons.IconClipboardList
                }
            ]
        }
    ]
};

export default features;
