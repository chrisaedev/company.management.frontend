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

// ==============================|| MTable ||============================== //

// constant

const MTable = (props) => {
    const tableRef = createRef();

    const { title = '', getData = null, columns = [], renderCustomFieldsColumns = false, addOrEdit, FormContent = null } = props;

    const [data, setData] = useState([]);
    const [customColumns, setCustomColumns] = useState(props.columns);
    const [isLoading, setIsLoading] = useState(true);
    const [openForm, setOpenForm] = useState(false);
    const customFields = useRef([]);

    //pagination
    const [count, setCount] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const getDataAsync = async () => {
        let data = await getData(page, rowsPerPage);
        setData(data.data.results);
        // if (data?.data?.results?.custom_fields) {
        //     setCustomFields();
        //     console.log('customdields ', data?.data?.results?.custom_fields);
        // }
        setCount(data.data.count);
        setIsLoading(false);
    };

    const appendCustomFieldsColumns = () => {
        if (renderCustomFieldsColumns) {
            let newColumns = columns;
            data.map((item) => {
                // newColumns.push({ title: item.name, render: (rowData) => rowData.name });
                if (item.custom_fields?.length > 0) {
                    item.custom_fields.map((custom_field, index) => {
                        newColumns.push({
                            title: custom_field.title,
                            render: (rowData) => {
                                return rowData.custom_field[index]?.value;
                            }
                        });
                        //customFields.current = { ...customFields.current, custom_field };
                        let newArr = customFields.current;
                        newArr.push(custom_field);
                        customFields.current = newArr;
                    });
                }
            });
            setCustomColumns(newColumns);
        }
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
            appendCustomFieldsColumns();
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
                options={{ emptyRowsWhenPaging: false }}
                components={{
                    //Custom Pagination
                    Pagination: (defaultProps) => (
                        <TablePagination
                            {...defaultProps}
                            count={count ? count : defaultProps.count}
                            page={page ? page : defaultProps.page}
                            onPageChange={(e, page) => {
                                setPage(page);
                            }}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[5, 10, 20, 30]}
                            onRowsPerPageChange={(event) => {
                                defaultProps.onRowsPerPageChange(event);
                                setRowsPerPage(event.target.value);
                                setPage(0);
                            }}
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
