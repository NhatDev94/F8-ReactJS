import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as api from '../../../api/api'

import './hero.css'


function Hero(props) {
    let [heros, setHeros] = useState([])

    useEffect(() => {
        let controler = new AbortController()
        let signal = controler.signal
        async function getHeros() {
            const res = await api.getHeros(signal)
            setHeros(res)
        }
        getHeros()

        return () => {
            controler.abort()
        }
    }, [])
   

    function scrollHandle(target, action) {
        let closest = target.closest('.hero')
        let slideContent = closest.querySelector('.hero-content')
        let itemWidth = closest.querySelector('.hero-item').clientWidth
        let scrollWidth = action === 'next' ? itemWidth : -itemWidth
        slideContent.scrollTo({
            top: 0,
            left: slideContent.scrollLeft + scrollWidth,
            behavior: 'smooth'
        })
    }

    function mouserOver(e, slide) {
        e.target.style.background = 'white'
        e.target.style.color = slide.beginBackground
    }

    function mouserLeave(e) {
        e.target.style.background = 'none'
        e.target.style.color = 'white'
    }

    return (
        <div className="hero">
            <div className="wrap">
                <div
                    className="arrow pre"
                    onClick={e => scrollHandle(e.target, 'pre')}
                >
                    <i className="fas fa-angle-left"></i>
                </div>
                <div
                    className="arrow next"
                    onClick={e => scrollHandle(e.target, 'next')}
                >
                    <i className="fas fa-angle-right"></i>
                </div>
                <div className="hero-content flex">
                    {
                        heros.map((hero, index) => {
                            return (
                                <div key={index}
                                    className="hero-item flex"
                                    style={{ backgroundImage: `linear-gradient(to right, ${hero.beginBackground}, ${hero.endBackground})` }}
                                >
                                    <div className="description">
                                        <h2>{hero.title}</h2>
                                        <p>
                                            {hero.description}
                                        </p>
                                        <Link
                                            to="/"
                                            onMouseOver={e => mouserOver(e, hero)}
                                            onMouseLeave={e => mouserLeave(e)}
                                        >{hero.buttonText}</Link>
                                    </div>
                                    <div className="img">
                                        <img src={hero.img} alt='F8' />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="control">
                <span className="active"></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default Hero