import { Grid,Paper, Avatar, TextField, Button, Typography } from "@mui/material"
import './auth.css'
import LockIcon from '@mui/icons-material/Lock';
import { useState } from "react";
import {DefaultProps} from '../../types/basic.types';
import axios from "axios";

type SignUpProps = {
 
}

export const SignUp = ({navigate,showToast} : DefaultProps & SignUpProps) => {
    

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleEmailChange = (event : React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value} = event.currentTarget;
        setEmail(value);
    }

    const handleNameChange = (event : React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value} = event.currentTarget;
        setName(value);
    }

    const handleConfirmPasswordChange = (event : React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value} = event.currentTarget;
        setConfirmPassword(value);
    }

    const handlePasswordChange = (event : React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value} = event.currentTarget;
        setPassword(value);
    }

    const handleSubmit = () => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`,{name,email,password}).then(
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
        <>
        <Grid className="lineHeight">
            <Paper  elevation={10} style={{padding :20,height : 'auto',width :'50vh',margin:'100px auto',backgroundColor:'#0F0701',lineHeight: 1.6}}>
                <Grid flexDirection={'column'} display={'flex'}  alignItems={'center'}>
                <Avatar  sx={{backgroundColor:'#CD1DE1'}}><LockIcon /></Avatar>
                &nbsp;
                <Typography variant={'h5'} color='secondary' >Sign Up</Typography>
                </Grid>
                &nbsp;
                <TextField value={name} onChange={handleNameChange} color="secondary"  label="Name" placeholder="Enter your name" required fullWidth/>
                &nbsp;&nbsp;
                <TextField value={email} onChange={handleEmailChange} color="secondary" type='email' label="Email" placeholder="Enter your email"  required fullWidth/>
                &nbsp;&nbsp;
                <TextField value={password} onChange={handlePasswordChange} color="secondary" type={'password'} label="Passowrd" placeholder="Enter password" required fullWidth/>
                &nbsp;&nbsp;
                <TextField value={confirmPassword} onChange={handleConfirmPasswordChange} color="secondary" type={'password'} label="Confirm Password" placeholder="Confirm password" required fullWidth/>
                &nbsp;&nbsp;
                <Button onClick={handleSubmit} fullWidth sx={{ marginLeft: 'auto', background: '#0F0701' }} color="secondary" variant="contained"> Sign Up </Button>
                &nbsp;
                <Typography color='white' >
                    Already have an account ? <span style={{color : 'rgb(205,29,225)',textDecoration : 'underline'}} onClick={() => navigate('/login')}>Login</span>
                </Typography>
            </Paper>
        </Grid>
        </>
    )
}