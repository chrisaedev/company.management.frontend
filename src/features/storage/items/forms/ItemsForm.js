import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function ItemForm(props) {
    const { customFields = [] } = props;

    const RenderCustomFieldsColumns = () => {
        if (customFields.length > 0) {
            return customFields.map((item, index) => {
                return (
                    <Grid item xs={12} md={6}>
                        <TextField
                            required={item.is_required}
                            id={`${index}`}
                            label={item.title}
                            fullWidth
                            autoComplete={item.name}
                            variant="standard"
                        />
                    </Grid>
                );
            });
        }
    };

    return (
        <React.Fragment>
            <Typography variant="h3" gutterBottom>
                Add New Item
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField required id="name" label="Item Name" fullWidth autoComplete="item-name" variant="standard" />
                </Grid>
                {RenderCustomFieldsColumns()}
            </Grid>
        </React.Fragment>
    );
}
