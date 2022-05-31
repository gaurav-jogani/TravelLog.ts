import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const NAVMENU = [
  'Dashboard', 'Upload', 'Profile', 'Login', 'SignUp'
]

export const Hamburger = () => {
  const [openHamburger, setOpenHamburger] = useState<boolean>(false);

  const handleClose = () => {
    setOpenHamburger(false);
  }

  const handleOpen = () => {
    setOpenHamburger(true);
  }

  const listItemClick = () => {
    setOpenHamburger(false);
  }

  return (
    <>

      <IconButton sx={{ color: 'white', marginLeft: 'auto' }} onClick={handleOpen}>
        <MenuIcon />
      </IconButton>

      <Drawer onClose={handleClose} open={openHamburger}>
        <List>
          {
            NAVMENU.map((menu, index) => {
              return (
                <ListItemButton onClick={listItemClick} key={index}>
                  <ListItemIcon>
                    <ListItemText> {menu} </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              )
            })
          }

        </List>
      </Drawer>
    </>
  )
}

