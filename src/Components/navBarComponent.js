import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button, ClickAwayListener } from '@mui/material';
import { Search, SearchIconWrapper, StyledSelect, StyledInputBase } from "./customStylings"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {NotificationComponent} from './NotificationComponent';
import useAuth from "./useAuth"
import HomeIcon from '@mui/icons-material/Home';
import { AddItem } from './AddItem';


export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorPopperEl, setAnchorPopperEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [category, setCategory] = React.useState("0");
  // const [open, setOpen] = React.useState(false);
  const [openPopper, setOpenPopper] = React.useState(false);
  const categories = [{"name":"All Categories", "value": 0}, {"name":"Clothing", "value": 1}, {"name":"Furniture", "value": 2}, {"name":"Electronic", "value": 3}, {"name":"Misc", "value": 4} ]
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  }
  let navigate = useNavigate()

  const handleMessages = (event) => {
    navigate('/chat')
  }

  const goToHome = (event) => {
    navigate('/')
  }
  const handleChange = (event) => {
    
  };
  
  const handlePopper = (event) => {
    console.log("hello world")
    console.log(openPopper)
    setAnchorPopperEl(event.currentTarget);
    setOpenPopper((prev) => !prev);
    console.log(openPopper)
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        // width: 250,
      },
    },
  };
  
  const handleClickAway = () => {
    setOpenPopper(false);
  }
  const { authed, login, logout } = useAuth();
  const { state } = useLocation(); 
  const handleLogin = () => {
    navigate("/login");
    // login().then((res) => {
    //   console.log(res)
    //   console.log(authed)
    //   console.log("Login successful")
    //   navigate(state?.path || "/");
    // });
  };

  const handleLogout = () => {
    handleMenuClose()
    logout().then((res) => {
      console.log("Logout succcessful")
    })
  }


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Items</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <Link to="/chat">
        <p>Messages</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handlePopper}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
 

  
  return (
    
   
    <Box sx={{ flexGrow: 1 }}>
      <AddItem open={open} handleClose={handleClose} />
      <NotificationComponent openPopper={openPopper} anchorPopperEl={anchorPopperEl}/>
      
      <AppBar position="static" style={{backgroundColor: "black"}}>
        <Toolbar>
        <HomeIcon onClick={goToHome} sx={{ display: { xs: 'none', sm: 'block',cursor: 'pointer' }}} />
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Age</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={Category}
      label="Age"
      onChange={handleChange}
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </FormControl> */}
          <FormControl sx={{marginLeft: "24px"}}>
        <InputLabel id="demo-simple-select-label" sx={[
    {
      '&.Mui-focused': {
        color: 'white',
      },
      color: "white"
    }]}>Category</InputLabel>
        <StyledSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          MenuProps={MenuProps}
          onChange={handleCategoryChange}
          defaultValue={category}
        >
          {categories.map(category_ => (<MenuItem value={category_.value}>{category_.name}</MenuItem>))}
        </StyledSelect>
      </FormControl>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {authed ? <React.Fragment> <Button color="inherit" sx={[{"&:hover":{backgroundColor: 'grey'}, "backgroundColor": "#bebebe3d"}]} onClick={handleOpen}>Add Item</Button>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
              
                <MailIcon onClick= {handleMessages}/>
              
              </Badge>
            </IconButton>
            <ClickAwayListener onClickAway={handleClickAway}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handlePopper}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            </ClickAwayListener>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box></React.Fragment> : <Button color="inherit" onClick={handleLogin} sx={[{"&:hover":{backgroundColor: 'grey'}}]}>Login</Button>}
          
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}