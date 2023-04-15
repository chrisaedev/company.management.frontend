// React
import { useState, useEffect } from 'react';

// material-ui
import { Typography } from '@mui/material';

// assets
import { IconKey } from '@tabler/icons';

// project imports
import MTable from 'generic-components/MTable';
import ItemsForm from '../forms/ItemsForm';
import Api from 'api/api';

// ==============================|| SAMPLE PAGE ||============================== //

const ItemsList = () => {
    const [openForm, setOpenForm] = useState(false);
    const itemColumns = [{ field: 'name', title: 'Name' }];

    const addOrEdit = () => {
        setOpenForm(true);
    };

    return (
        <MTable
            title={'ITEMS'}
            renderCustomFieldsColumns
            columns={itemColumns}
            getData={Api.getItems}
            openForm={openForm}
            addOrEdit={addOrEdit}
            FormContent={ItemsForm}
        />
    );
};

export default ItemsList;
