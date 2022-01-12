import React from "react";
import { Link, useLocation } from "react-router-dom";

import './sidebar.css'
function SideBar(props) {
    let pathname = useLocation().pathname

    return (
        <div className="sidebar">
            <ul>
                <li className="add-content">
                    <i className="fas fa-plus"></i>
                </li>
                <li className={pathname === '/' ? "sidebar-item active" : "sidebar-item"}>
                    <Link to="/">
                        <i className="fas fa-home"></i>
                        <p>Home</p>
                    </Link>
                </li>
                <li className={pathname === '/road' ? "sidebar-item active" : "sidebar-item"}>
                    <Link to="/road">
                        <i className="fas fa-hiking"></i>
                        <p>Lộ trình</p>
                    </Link>
                </li>
                <li className={pathname === '/courses' ? "sidebar-item active" : "sidebar-item"}>
                    <Link to="/courses">
                        <i className="fas fa-lightbulb"></i>
                        <p>Học</p>
                    </Link>
                </li>
                <li className={pathname === "/blogs" ? "sidebar-item active" : "sidebar-item"}>
                    <Link to="/blogs">
                        <i className="fas fa-newspaper"></i>
                        <p>Blog</p>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBar