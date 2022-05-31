import { Grid,Paper, Avatar, TextField, Button, Typography } from "@mui/material"
import './auth.css'
import LockIcon from '@mui/icons-material/Lock';
import React, { useState } from "react";
import {DefaultProps} from '../../types/basic.types';
import axios from "axios";

type ForgotPasswordProps = {

}

export const ForgotPassword = ({navigate,showToast} : DefaultProps & ForgotPasswordProps) => {
    const [email, setEmail] = useState<string>('');

    const handleEmailChange = (event : React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value} = event.currentTarget;
        setEmail(value);
    }

    const handleSubmit = () => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/forgotpassword`,{email}).then(
            (res) => {
            console.log("Response ----------- ",res.data);
            if(res.data.success){
                showToast('success',`Welcome ${res.data.user.name}`);
                
            }else{
                showToast('error',res.data.message);
            }
            }
        ).catch((err) => {
            console.log("Error ----------------- ",err);
            showToast('error',err.response.data.message);
        });
    }

  return (
    <Grid className="lineHeight">
            <Paper  elevation={20} style={{padding :20,height : 'auto',width :'50vh',margin:'100px auto',backgroundColor:'#0F0701',lineHeight: 1.6}}>
                <Grid display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Avatar  sx={{backgroundColor:'#CD1DE1'}}><LockIcon /></Avatar>
                &nbsp;&nbsp;
                <Typography variant={'h5'} color='secondary' >Forgot Password</Typography>
                </Grid>
                &nbsp;
                <TextField value={email} onChange={handleEmailChange} color="secondary" label="Email" placeholder="Enter your email"  required fullWidth/>
                &nbsp;&nbsp;
                <Button onClick={handleSubmit} fullWidth type="submit" sx={{ marginLeft: 'auto', background: '#0F0701' }} color="secondary" variant="contained"> Reset </Button>
                &nbsp;&nbsp;
                <Typography color={'secondary'}>
                   <span onClick={() => navigate('/login')}>Login</span>
                </Typography>
                &nbsp;&nbsp;
                <Typography color='white' >
                    Don't have an account ? <span style={{color : 'rgb(205,29,225)',textDecoration : 'underline'}} onClick={() => navigate('/signup')}>Sign Up</span>
                </Typography>
            </Paper>
        </Grid>
  )
}
