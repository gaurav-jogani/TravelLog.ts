import { AppBar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material"
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import { useState } from "react";
import { Hamburger } from "./Hamburger";
import {DefaultProps} from '../../types/basic.types';

type NavbarProps = {
   
}

const NAVMENU = [
    'Dashboard', 'Upload', 'Profile'
]

export const Navbar = (props : DefaultProps & NavbarProps) => {
    const {navigate} = props;
    const [activeTab, setActiveTab] = useState<number | null>();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const handleChange = (event: React.SyntheticEvent, value: number) => {
        setActiveTab(value);
    }
    return (
        <>
            <AppBar sx={{ background: '#0F0701' }}>
                <Toolbar sx={{ background: '#0F0701' }}>

                   
                    <div className="hoverEffect" style={{display : "flex"}} onClick={() => navigate('/')}> 
                    <ConnectingAirportsIcon />
                    <Typography>Travel Log</Typography>
                    </div>
                    
                    {isMatch ?
                        <Hamburger />
                        :
                        <><Tabs value={activeTab} onChange={handleChange} indicatorColor='secondary' sx={{ marginLeft: 'auto' }} textColor='inherit'>
                            {NAVMENU.map((menu, index) => {
                                return (
                                    <Tab key={index} label={menu} />
                                )
                            }
                            )}
                        </Tabs>

                            <Button sx={{ marginLeft: 'auto', background: '#0F0701' }} color="secondary" variant="contained" onClick={() => navigate('/login')}> Login </Button>
                            <Button sx={{ marginLeft: '1%', background: '#0F0701' }} color="secondary" variant="contained" onClick={() => navigate('/signup')}> SignUp </Button></>
                    }
                </Toolbar>
            </AppBar>
            
        </>
    )
}

