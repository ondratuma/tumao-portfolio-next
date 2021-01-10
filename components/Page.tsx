import Head from 'next/head'
import React, {createContext, CSSProperties, useContext, useEffect, useState} from 'react'
import styles from '../styles/components/Page.module.scss'
import {directions, isTypeDirection, scrollHandler, swipeHandler} from "../Helpers";

const URL = 'https://tumao.dev'

const title = 'Ondřej Tůma'
const description = 'Young creative for your project'

export const PagesContext = createContext([]);
export const ActivePageContext = createContext("intro");
export const SetActivePageContext = createContext((scrolling) => {});

export const VerticalScroller = ({className, children, onScroll, pages}: {pages?: any,touchHandler?: any,universalScrollLHandler?: scrollHandler, onScroll?: any,animate?: boolean,className?: string,style?: CSSProperties, children: any, preloadImages?: Array<string>, invert?: boolean, title?: string, description?: string}) =>{
    const [ scrolling, setScrolling] = useState(undefined);
    const [ activePage, setActivePage] = useState(pages[pages.length - 1][0]);

    useEffect(() => {
        if (activePage){
            if (screen.width < 768) {
                document.getElementById(activePage).scrollIntoView();
            } else {
                console.log(activePage);
                document.getElementById('body').scrollTo(0, document.getElementById(activePage).offsetTop);
            }
            setTimeout(()=>{
                setScrolling(undefined);
            }, 250)
        }
    }, [activePage])

    useEffect(()=> {
        if (scrolling === 'bot' ){
            if (activePage === pages[2][0])  setActivePage(pages[1][0]);
            else if (activePage === pages[1][0])  setActivePage(pages[0][0]);
        }
        if (scrolling === 'top' ){
            if (activePage === pages[1][0])  setActivePage(pages[2][0]);
            else if (activePage === pages[0][0])  setActivePage(pages[1][0]);
        }
    }, [scrolling])

    const universalScrollLHandler = (dir: keyof directions) => {
        if (screen.width < 768) {
            let elem;
            const bodyOffset = document.querySelector('#body').scrollTop;
            const scrolledTo = pages.filter(page => {
                const elemOffset = document.getElementById(page[0]).getBoundingClientRect().top;
                return elemOffset < 0;
            })

            if (scrolledTo.length > 0) {
                setActivePage(scrolledTo[0][0]);
            }

            return
        }
        if (!isTypeDirection(dir)) return;
        if (dir === "left") return;
        if (dir === "right") return;
        setScrolling(dir);
    }

    const {onTouchStart, onTouchMove, onTouchEnd, wheelHandler} = swipeHandler(universalScrollLHandler);

    return (
        <div className={[styles.container, className].join(" ")} >
                <Head >
                    <title>{`${title}`}</title>
                    <link rel="icon" href={`${URL}/icon/favicon.ico`} />
                    <meta name="description" content={description}/>

                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta property="og:url" content={URL}/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:title" content={title}/>
                    <meta property="og:description" content=""/>
                    <meta property="og:image" content={`${URL}/og_image.png`} />


                    <meta name="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content={URL}/>
                    <meta name="twitter:title" content={title}/>
                    <meta name="twitter:description" content=""/>
                    <meta name="twitter:image" content={`${URL}/og_image.png`}/>
                    <link rel="apple-touch-icon" sizes="57x57" href="icon/apple-icon-57x57.png"/>
                    <link rel="apple-touch-icon" sizes="60x60" href="icon/apple-icon-60x60.png"/>
                    <link rel="apple-touch-icon" sizes="72x72" href="icon/apple-icon-72x72.png"/>
                    <link rel="apple-touch-icon" sizes="76x76" href="icon/apple-icon-76x76.png"/>
                    <link rel="apple-touch-icon" sizes="114x114" href="icon/apple-icon-114x114.png"/>
                    <link rel="apple-touch-icon" sizes="120x120" href="icon//apple-icon-120x120.png"/>
                    <link rel="apple-touch-icon" sizes="144x144" href="icon/apple-icon-144x144.png"/>
                    <link rel="apple-touch-icon" sizes="152x152" href="icon/apple-icon-152x152.png"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="icon/apple-icon-180x180.png"/>
                    <link rel="icon" type="image/png" sizes="192x192"  href="icon/android-icon-192x192.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="icon/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="96x96" href="icon/favicon-96x96.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="icon/favicon-16x16.png"/>
                    <link rel="manifest" href="icon/manifest.json"/>

                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                    <meta name="msapplicaonScrolltion-TileColor" content='white'/>
                    <meta name="msapplication-TileImage" content="icon/ms-icon-144x144.png"/>
                    <meta name="theme-color" content='white dark' />
                    <meta name="author" content="Ondřej Tůma, contact@tumao.eu" />



                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-W82PWFT5KR" />

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer = window.dataLayer || [];
                              function gtag(){dataLayer.push(arguments);}
                              gtag('js', new Date());
                            
                              gtag('config', 'G-W82PWFT5KR');`,
                        }}
                    />


                </Head>
              <PagesContext.Provider value={pages}>
                  <ActivePageContext.Provider value={activePage}>
                      <SetActivePageContext.Provider value={setActivePage}>
                          <div scroll-behavior="smooth" className={styles.main} onScroll={onScroll} onWheel={wheelHandler} id={'body'} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} >
                              <div className={'lines'}/>
                              {children}
                          </div>
                      </SetActivePageContext.Provider>
                  </ActivePageContext.Provider>
              </PagesContext.Provider>
        </div>
    )
}