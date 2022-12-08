import React,{useContext} from "react"
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";

function MenuBar () {
    const {logout } = useContext(AuthContext);
    return (
        <Menu pointing secondary size="massive" color="teal">
     {
         window.location.pathname === "/chat" &&  <Menu.Item
         name="Back"
         active
         as={Link}
         to={"/list"}
       />
     }
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          onClick={async() =>{
            await logout()
            window.location.href = "/login"
          }}
        />
      </Menu.Menu>
    </Menu>
    )
}
export default MenuBar;