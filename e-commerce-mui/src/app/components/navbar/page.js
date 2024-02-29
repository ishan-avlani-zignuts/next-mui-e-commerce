import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  useMediaQuery,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallIcon from '@mui/icons-material/LocalMall';
function Navbar() {
  const user = useSelector((state) => state.user.user); 
  const items = useSelector((state) => state.cart);
  console.log(items);

  const isMobile = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Stack direction="row" alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              onClick={toggleDrawer}
              sx={{ display: { xs: 'block', sm: 'none' } }} 
            >
              <LocalMallIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Avlani Mall
            </Typography>
          </Stack>
          {isMobile ? (
           <Drawer
           anchor="left"
           open={drawerOpen}
           onClose={toggleDrawer}
           sx={{
             width: 200, textDecoration:"none",
             '& .MuiDrawer-paper': {
               width: 200,
             },
           }}
         >
           <List>
             <ListItem onClick={toggleDrawer}>
               <Link href="/home">
                 <ListItemText primary="Home" />
               </Link>
             </ListItem>
             {user ? ( 
               <>
                 <ListItem onClick={toggleDrawer}>
                   <Link href="/products">
                     <ListItemText primary="Products" />
                   </Link>
                 </ListItem>
                 <ListItem onClick={toggleDrawer}>
                   <Link href="/cart">
                     <ListItemText primary="Cart" />
                     <ListItemIcon><ShoppingCartIcon/></ListItemIcon>
                   </Link>
                 </ListItem>
               </>
             ) : (
               <>
                 <ListItem onClick={toggleDrawer}>
                   <Link href="/login">
                     <ListItemText primary="Login" />
                   </Link>
                 </ListItem>
                 <ListItem onClick={toggleDrawer}>
                   <Link href="/signup">
                     <ListItemText primary="Signup" />
                   </Link>
                 </ListItem>
               </>
             )}
           </List>
         </Drawer>
          ) : (
            <Stack direction="row" spacing={4} style={{ marginRight: 10 }}>
              <Link href="/home">
                <Button endIcon={<HomeIcon/>} sx={{backgroundColor: "white"}}>Home</Button>
              </Link>
              {user && ( 
                <>
                  <Link href="/products">
                    <Button sx={{backgroundColor: "white"}} endIcon={<LocalMallIcon/>} >Products</Button>
                  </Link>
                  <Link href="/cart">
                    <Button sx={{backgroundColor: "white"}} endIcon={<ShoppingCartIcon/>}>Cart {items.length}</Button>
                  </Link>
                  </>
              )}
              {!user && ( 
                <>
                  <Link href="/login">
                    <Button sx={{backgroundColor: "white"}} endIcon={<KeyIcon/>}>Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button sx={{backgroundColor: "white"}} endIcon={<AccountCircleIcon/>}>Signup</Button>
                  </Link>
                </>
              )}
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
