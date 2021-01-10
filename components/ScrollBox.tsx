import React, {Suspense, useEffect, useState} from 'react'
import BlockStyle from "../styles/components/ScrollBox.module.scss";



export const ScrollBox = ({traits, align = 'left', value = 0, mouseEnabled = true, autoDelay = 500, underline = true, fontWeight = 400}) => {

    const [localTraits, setLocalTraits] = useState(traits);
    const [textScroll, setTextScroll] = useState(value);
    const [handler, setHandler] = useState(false);

    useEffect(() => {
        setTextScroll(value);
    }, [value])

    const textScroller = () => {
        setTextScroll((textScroll + 1) % localTraits.length);
    }

    const handleTextScrollerEnter = () => {
        setTimeout(() => {
            textScroller();
        }, autoDelay);
    }


    useEffect(() => {
        if (handler) handleTextScrollerEnter();
    }, [handler])

    useEffect(() => {
        if (handler) handleTextScrollerEnter();
        else {setTextScroll(value)}
    }, [textScroll])

    return (
        <span className={[BlockStyle.textScroller].join(" ")} onMouseLeave={() => mouseEnabled && setHandler(false)} onMouseEnter={() => {mouseEnabled && setHandler(true);}}>
                      <span className={[BlockStyle.textScrollerInner, underline ? BlockStyle.underline : '', BlockStyle[`fontWeight-${fontWeight}`] , align === 'center' ? BlockStyle.center : ''].join(" ")} style={{transform: `TranslateY(${-textScroll * 100}%)`}}>
                          {localTraits.map((t, i)=><span key={`trait-${i}`}>{t}</span>)}
                      </span>
          </span>
    )
}