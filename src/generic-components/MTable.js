// React
import { useState, useEffect, createRef, useRef } from 'react';

// material-ui
import { TablePagination } from '@mui/material';

// project imports
import Dialog from './Dialog';

// assets
import { IconPlus } from '@tabler/icons';

// packages
import MaterialTable from '@material-table/core';
import { Pages } from '@mui/icons-material';
import { render } from 'react-dom';

// ==============================|| MTable ||============================== //

// constant

const MTable = (props) => {
    const tableRef = createRef();

    const { title = '', getData = null, columns = [], renderCustomFieldsColumns = false, addOrEdit, FormContent = null } = props;

    const [data, setData] = useState([]);
    const [customColumns, setCustomColumns] = useState(columns);
    const [isLoading, setIsLoading] = useState(true);
    const [openForm, setOpenForm] = useState(false);
    const customFields = useRef([]);

    //pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([5, 10, 20, 30]);
    const [count, setCount] = useState(0);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getDataAsync = async () => {
        const { data } = await getData(page, rowsPerPage);
        if (data?.results) {
            setData(data.results);
            if (data.count) {
                setCount(data.count);
            }
            if (renderCustomFieldsColumns && data.custom_fields_columns) {
                customFields.current = data.custom_fields_columns;
            }
        }
        setIsLoading(false);
    };

    const appendCustomFieldsColumns = (columns) => {
        const newColumns = [
            ...columns,
            ...customFields.current.map(({ title, field }) => ({
                title,
                field,
                render: ({ custom_fields }) => {
                    const customField = custom_fields.find((cf) => cf[field] !== undefined);
                    return customField ? customField[field] : null;
                }
            }))
        ];
        setCustomColumns(newColumns);
    };

    const handleOpenAddOrEdit = () => {
        setOpenForm(true);
    };
    const handleCloseAddOrEdit = () => {
        setOpenForm(false);
    };

    const RenderFormContent = () => {
        return <div>{<FormContent customFields={customFields.current} />}</div>;
    };

    useEffect(() => {
        getDataAsync();
    }, [page, rowsPerPage]);

    useEffect(() => {
        if (data) {
            appendCustomFieldsColumns(columns);
        }
    }, [data]);

    return (
        <div>
            <MaterialTable
                tableRef={tableRef}
                title={title}
                data={data}
                columns={customColumns}
                isLoading={isLoading}
                actions={[
                    {
                        icon: () => <IconPlus />,
                        tooltip: 'Create New Item',
                        isFreeAction: true,
                        onClick: (event) => {
                            //alert(`Icon clicked`);
                            handleOpenAddOrEdit();
                        }
                    }
                ]}
                options={{
                    pageSize: rowsPerPage,
                    pageSizeOptions: rowsPerPageOptions,
                    paginationType: 'normal',
                    emptyRowsWhenPaging: false
                }}
                components={{
                    //Custom Pagination
                    Pagination: (defaultProps) => (
                        <TablePagination
                            {...defaultProps}
                            count={count ? count : defaultProps.count}
                            page={page ? page : defaultProps.page}
                            onPageChange={handlePageChange}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={rowsPerPageOptions}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />
                    )
                }}
            />
            <Dialog
                open={openForm}
                handleOpen={handleOpenAddOrEdit}
                handleClose={handleCloseAddOrEdit}
                content={<RenderFormContent />}
                customFields={customFields.current}
            />
        </div>
    );
};

export default MTable;
