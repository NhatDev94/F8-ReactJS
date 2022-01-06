import React, { useState } from "react";
import HeaderHome from "../../partials/HeaderHome/HeaderHome";
import Footer from '../../partials/Footer/Footer'
import SideBar from "../../partials/SideBar/SideBar";
import HomeDefault from "./HomeDefault/HomeDefault";
import Road from './Road/Road'
import Courses from './Courses/Courses'
import Blogs from './Blogs/Blogs'
import { Switch, Route } from 'react-router-dom'

import './home.css'

function Home(props) {
    let [isLogin, setIsLogin] = useState(true)

    return (
        <div className="home">
            <HeaderHome isLogin={isLogin} />
            <div className="main">
                <div className="sidebar-wrap">
                    <SideBar />
                </div>
                <div className="home-content">
                    <Switch>
                        <Route exact path="/" >
                            <HomeDefault />
                        </Route>
                        <Route exact path="/road" >
                            <Road />
                        </Route>
                        <Route exact path="/courses" >
                            <Courses />
                        </Route>
                        <Route exact path="/blogs" >
                            <Blogs />
                        </Route>
                    </Switch>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home