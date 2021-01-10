import {useState} from "react";

export type scrollHandler = (dir: keyof directions ) => void;


export interface directions {
    top: string,
    bot: string,
    left: string,
    right: string
}

export const isTypeDirection = (dir: string): dir is keyof directions =>  {
    return ['top', 'bot', 'left', 'right'].includes(dir);
}

export const swipeHandler = (onEndHandler: scrollHandler) => {
    let swipe = { x: 0, y: 0 };
    let state = { swiped: false, swiping: false };
    const [timeout, setTimeout] = useState(0);

    let minDistance = {x: 25, y: 25};

    const onTouchStart = (e) => {
        const touch = e.touches[0];
        swipe = { y: touch.clientY, x: touch.clientX };
    }

    const onTouchMove = (e) => {
        if (e.changedTouches && e.changedTouches.length) {
            const touch = e.changedTouches[0];
            state = { ...state, swiping: true };
        }
    }

    const onTouchEnd = (e) => {
        const touch = e.changedTouches[0];

        const diffX = touch.clientX - swipe.x;
        const absX = Math.abs(diffX);

        const diffY = touch.clientY - swipe.y;
        const absY = Math.abs(diffY);

        if (state.swiping && absY > minDistance.y ) {
            if (diffY < 0) onEndHandler('bot')
            if (diffY > 0) onEndHandler('top')
            state = { ...state, swiped: true };
        }

        if (state.swiping && absX > minDistance.x){
            if (diffX > 0) onEndHandler('left')
            if (diffX < 0) onEndHandler('right')
            state = { ...state, swiped: true };
        }
    }



    function throttle(fn, ms, timestamp) {

        if (timeout < timestamp) {
            fn();
        }

        setTimeout(timestamp + ms);
    }

    const wheelHandler = (e) => {

        throttle(() => {
            if (e.nativeEvent.deltaY > 0 ){
                onEndHandler('bot')
        }
            if (e.nativeEvent.deltaY < 0 ){
               onEndHandler('top')
            }
            if (e.nativeEvent.deltaX < 0){
                onEndHandler('left')
            }
            if (e.nativeEvent.deltaX > 0){
                onEndHandler('right')
            }
        }, 35, e.nativeEvent.timeStamp)

    }

    return {onTouchStart, onTouchMove,onTouchEnd, wheelHandler};
}