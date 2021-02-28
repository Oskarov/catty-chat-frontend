import React, {useContext, useState, useEffect} from 'react'
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/auth";

function MenuBar() {

    const {user, logout} = useContext(AuthContext);

    const userMenu = (
        <div className="main_menu_user">
            <div className="main_menu_avatar">
                {!user ? <img src="nouser.png" alt=""/> : <img src="user.jpg" alt=""/>}
            </div>
            {!user ?
                <ul>
                    <li><NavLink to="/login">Войти</NavLink></li>
                    <li><NavLink to="/register">Зарегистрироваться</NavLink></li>
                </ul> : <ul>
                    <li><span onClick={logout}>Выйти</span></li>
                </ul>
            }
        </div>
    );

    const menuBar = (
        <div className="main_menu">
            <div></div>
            {userMenu}
        </div>
    );

    return menuBar;
}

export default MenuBar;
