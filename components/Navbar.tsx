import Style from "../styles/components/Navbar.module.scss";
import {useContext, useEffect, useState} from "react";
import {ActivePageContext, PagesContext, SetActivePageContext} from "./Page";



export const Navbar = ({}) => {
    const [loaded, setLoaded] = useState(false);

    const pages = useContext(PagesContext);
    const activePage = useContext(ActivePageContext);
    const setActivePage = useContext(SetActivePageContext);

    const selectPage = (selector) => {
        return () => {
            setActivePage(selector);
        };
    }

    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <ul className={[Style.ul, loaded ? Style.visible : ''].join(' ')}>
            {pages.map((t, i)=><li key={`navbar-item-${i}`} onClick={selectPage(t[0])} className={activePage === t[0] ? Style.active : ''}>{t[1]}</li>)}
        </ul>
    )
}