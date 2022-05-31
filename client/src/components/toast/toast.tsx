import { Alert, Snackbar } from "@mui/material"
import { useState } from "react";

type ToastProps = {
    show : boolean
}

export const Toast = (props : ToastProps) => {
    const [open, setOpen] = useState<boolean>(props.show);
    
    return (
        <>
            <Snackbar open={open} autoHideDuration={6000}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </>
    )
}