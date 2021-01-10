import React, {useContext, useEffect, useState} from "react";
import Style from "../styles/components/Project.module.scss";
import Image from "next/image";
import ReactMarkdown from 'react-markdown'
import {useRouter} from "next/router";
import {strapiStaticProvider} from "../pages";


export const Project = ({id, hide = false, name = {}, images = [], desc = {}, tags = [], categories = [], onOpen = (val) => {}, link = undefined, switching = false}) => {
    const router = useRouter();
    const { locale } = router;
    const generalStrings = useContext(strapiStaticProvider);

    const idString = `project-${id}`;
    const isMobile = (process.browser && screen && screen.width >= 768) ?? false;

    const [imageArray, setImageArray] = useState(images);
    useEffect(() => {
        setImageArray(images.reverse());
    }, [])

    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setRendered(true);
        }, 250)
    }, [])


    return(
        <div className={[Style.project, rendered && !switching ? '' : Style.first].join(' ') } id={idString} style={{opacity: hide ? 0 : ''}}>
                <div key={`inner`} className={Style.projectInner}>
                    <div key={`cat`} className={Style.categories}>
                        {categories.map((t, i) =>
                            <span key={`cat-${i}`}>{t.name[locale]}</span>
                        )}
                    </div>
                    <div key={`name`} className={Style.name}>{name[locale]}</div>
                    <div key={`info`} className={Style.info}>
                        <div key={`tags`} className={Style.tags}>
                            {tags.map((t, i) => <span key={`tag-${i}`}>{t.name[locale]}</span>)}
                        </div>

                        <div key={`desc`} className={Style.desc} >
                            <ReactMarkdown linkTarget={'_blank'}>{desc[locale]}</ReactMarkdown>
                        </div>
                        <div key={`images`} className={Style.images} >
                            {isMobile ? imageArray.map((t, i) =>
                                <Image key={`img-${i}`} quality={75} alt={t.url} layout={'fixed'} priority={true} width={250} height={500} src={`${t.url}`} />
                            ) : ''}
                        </div>
                    </div>
                        {link ? <a key={`link`} className={Style.open} href={link} target={'_blank'}>{generalStrings.string_visit[locale]}</a> : ''}
            </div>
        </div>
    );
}