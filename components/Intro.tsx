import NextImage from "next/image";
import BlockStyle from "../styles/components/FirstPage.module.scss";
import {Block} from "./Block";
import {ScrollBox} from "./ScrollBox";
import {ActivePageContext, PagesContext} from "./Page";
import React, {useContext, useEffect, useState} from "react";



export default ({first_page_pre, traits, first_page_image}) => {
    const [ loaded, setLoaded ] = useState(false);
    const [ imageLoaded, setImageLoaded] = useState(false);
    const [ imageActive, setImageActive] = useState(false);

    const pages = useContext(PagesContext);
    const activePage = useContext(ActivePageContext);

    useEffect(() => {
        setLoaded(true);

        if (screen.width > 768) {
            setImageLoaded(true);
        }
    }, []);

    return (
        <div>
            {imageLoaded ? <NextImage onLoad={() => setImageActive(true)} quality={50} className={[BlockStyle.personalImage, imageActive ? BlockStyle.active : '', activePage === pages[pages.length - 1][0] ? BlockStyle.fp : ''].join(' ')} layout={'fill'}  src={first_page_image}/> : ''}
            <Block scroll-behavior="smooth" key={1} className={[BlockStyle.firstPage, loaded ? BlockStyle.visible : ''].join(' ')} id={'intro'}>
                <h1>{first_page_pre} <ScrollBox traits={traits}/></h1>
            </Block>
        </div>
    )
}