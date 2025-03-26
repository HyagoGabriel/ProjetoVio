import React from "react";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import IconButton from "@mui/material/Icon"

const Header = () => {
    return(
        <AppBar sx={{backgroundColor:'green'}}>
            <ToolBar sx={{display:"flex", justifyContent:"flex-end"}}>
                <IconButton color="inherit" onClick={() => {
                    console.log("Cliquei");
                }}>
                    <AccountCircleIcon fontSize="large"/>
                </IconButton>
            </ToolBar>
        </AppBar>
    )
}

export default Header;