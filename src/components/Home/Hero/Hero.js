import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as api from '../../../api/api'

import './hero.css'


function Hero(props) {
    let [heros, setHeros] = useState([])
    let countRef = useRef(0)

    useEffect(() => {
        async function getHeros() {
            const res = await api.getHeros()
            setHeros(res)
        }
        getHeros()

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
        if (action === 'next') {
            if (countRef.current === heros.length - 1) return
            countRef.current ++
            closest.querySelector('span.active').classList.remove('active')
            closest.querySelectorAll('.control span')[countRef.current].classList.add('active')
            return
        }
        if (countRef.current === 0) return
        countRef.current--
        closest.querySelector('span.active').classList.remove('active')
        closest.querySelectorAll('.control span')[countRef.current].classList.add('active')
    }

    function mouserOver(e, slide) {
        e.target.style.background = 'white'
        e.target.style.color = slide.beginBackground
    }

    function mouserLeave(e) {
        e.target.style.background = 'none'
        e.target.style.color = 'white'
    }

    function moveHero(target, index) {
        countRef.current = index
        let activeEl = target.closest('.control').querySelector('.active')
        let spanEl = target.closest('span')
        let slideContent = target.closest('.hero').querySelector('.hero-content')
        let itemWidth = target.closest('.hero').querySelector('.hero-item').clientWidth
        activeEl.classList.remove('active')
        spanEl.classList.add('active')

        slideContent.scrollTo({
            top: 0,
            left: itemWidth * index,
            behavior: 'smooth'
        })
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
                {
                    heros && heros.map((hero, index) => {
                        return <span 
                                    key={index}
                                    className={index === 0 ? 'active' : ''}
                                    onClick={e => moveHero(e.target, index)}
                                ></span>
                    })
                }
            </div>
        </div>
    )
}

export default Hero