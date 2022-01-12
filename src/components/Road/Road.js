import React from "react";
import { Link } from 'react-router-dom';
import HeaderHome from "../../partials/HeaderHome/HeaderHome";
import SideBar from "../../partials/SideBar/SideBar";
import Footer from "../../partials/Footer/Footer";

import './road.css'

function Road(props) {

    return (
        <div className="road">
            <HeaderHome
                user={props.user}
                logOut={props.logOut} />
            <div className="main">
                <div className="sidebar-wrap">
                    <SideBar />
                </div>
                <div className="main-content">
                    <div className="road-left">
                        <h2>Lộ trình cho người mới</h2>
                        <p className="list-description">
                            Cho dù bạn là người mới bắt đầu hay một lập trình viên đã có kinh nghiệm đang
                            tìm kiếm các khóa học để nâng cao kỹ năng bản thân và đạt đến mức độ cao hơn
                            trong lập trình, lộ trình học tập này sẽ giúp bạn đạt được mục tiêu của mình.
                        </p>
                        <div className="road-item flex">
                            <div className="img">
                                <img src="https://cdn.fullstack.edu.vn/f8-production/learning-paths/1/61a0437b7d056.png" alt="f8" />
                            </div>
                            <div className="content">
                                <h4 className="title">Bắt đầu</h4>
                                <p className="item-description">
                                    Trước tiên, chúng ta sẽ tìm hiểu về phương pháp học lập trình, kỹ năng đặt
                                    mục tiêu và các khái niệm kỹ thuật như: domain, client, server.
                                </p>
                                <Link to="/">Chi tiết</Link>
                            </div>
                        </div>
                        <div className="road-item flex">
                            <div className="img">
                                <img src="https://cdn.fullstack.edu.vn/f8-production/learning-paths/2/61a0439062b82.png" alt="f8" />
                            </div>
                            <div className="content">
                                <h4 className="title">Front-end</h4>
                                <p className="item-description">
                                    Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần
                                    này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.
                                </p>
                                <Link to="/">Chi tiết</Link>
                            </div>
                        </div>
                        <div className="road-item flex">
                            <div className="img">
                                <img src="https://cdn.fullstack.edu.vn/f8-production/learning-paths/3/61a0439cc779b.png" alt="f8" />
                            </div>
                            <div className="content">
                                <h4 className="title">Back-end</h4>
                                <p className="item-description">
                                    Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu,
                                    công việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình
                                    học Back-end nhé.
                                </p>
                                <Link to="/">Chi tiết</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Road
