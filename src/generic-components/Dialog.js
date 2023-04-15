import { useState, useEffect, createRef, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const { open = false, title = '', content = null, handleOpen, handleClose, confirmText = 'Submit', cancelText = 'Cancel' } = props;

    const [innerOpen, setInnerOpen] = useState(open);

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are
                        running.
                    </DialogContentText> */}
                    {content}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{cancelText}</Button>
                    <Button onClick={handleClose}>{confirmText}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
