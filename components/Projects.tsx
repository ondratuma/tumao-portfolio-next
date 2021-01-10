import React, {EventHandler, useContext, useEffect, useRef, useState} from "react";
import ProjectsStyle from "../styles/components/Projects.module.scss";
import ProjectStyle from "../styles/components/Project.module.scss";

import {Icon} from "./Icon";
import {Block} from "./Block";
import { Project } from "./Project";
import { Project as ProjectType } from '../Models/Types/Project'
import {Category} from "../Models/Types/Category";
import {isTypeDirection, swipeHandler} from "../Helpers";
import {useRouter} from "next/router";
import {strapiStaticProvider} from "../pages";
import {ActivePageContext, PagesContext} from "./Page";
import {Strapi} from "../Models/Strapi";

const tablet = 768;
const desktop = 992;

export const Projects = ({initProjects, initCategories, strapi_url}) => {

    const strapi = Strapi(strapi_url);
    const router = useRouter();
    const { locale } = router;
    const generalStrings = useContext(strapiStaticProvider);

    const selectCategory = (selector) => {
        return () => {
            setActiveCategory(selector);
        };
    }

    const [ isFirstRun, setIsFirstRun ] = useState(true);
    const [ categories, setCategories ]: [Category[], any] = useState([{id: 0, name: generalStrings.string_all}, ...initCategories]);
    const [ activeCategory, setActiveCategory ] = useState(0);
    const [ activeProject, setActiveProject] = useState(0);
    const [ projects, setProjects ]: [ProjectType[], any] = useState([...initProjects]);
    const [ scrolling, setScrolling ] = useState(0);
    const [ switching, setSwitching ] = useState(false);


    useEffect(() => {
        if (activeProject === projects.length - 2) (async() => {
            try {
                const p = await strapi.getProjects({start: projects.length , category: activeCategory})
                setProjects([...projects, ...p])
            } catch (e){
                console.log(e);
            }
        })();

        const disClasNameScale = ProjectStyle.disabledScale;
        const disClasNameColor = ProjectStyle.disabledColor;
        const list = document.getElementById('project-list-inner');
        const lastProject = document.getElementById(`project-${activeProject - 1}`);
        const project = document.getElementById(`project-${activeProject}`);
        const width = document.querySelector('body').clientWidth ;
        let padLeft = parseFloat(getComputedStyle(list).fontSize);
        if (width >= 768) padLeft = 3 * padLeft;


        // 350ms long animations
        if (project && project != null) {
            list.scrollTo({left: project.offsetLeft - padLeft, behavior: "smooth"});
            if (project.classList.contains(disClasNameColor)) {
                setTimeout(() => {
                    project.classList.toggle(disClasNameColor);
                    setTimeout(() => {
                        project.classList.toggle(disClasNameScale);
                    }, 250)
                }, 100)
            }
        }
        if (lastProject) {
            if (!lastProject.classList.contains(disClasNameColor)){
                lastProject.classList.toggle(disClasNameScale);
                setTimeout(() => {
                    lastProject.classList.toggle(disClasNameColor);
                }, 0)
            }
        }

        setTimeout(() => {
            setSwitching(false)
            setScrolling(0);
        }, 250);
    }, [activeProject])

    useEffect(() => {
        if (switching) activeProject === 0 ? setSwitching(false) : setActiveProject(0);
    }, [projects])

    useEffect(() => {
        if (scrolling === 0) setSwitching(false);
        if (activeProject + scrolling === -1 || activeProject + scrolling === projects.length) return;

        setActiveProject(activeProject + scrolling);
    }, [scrolling])


    useEffect(() => {
        if (!switching) return;

        (async () => {
            try {
                const newProjects = await strapi.getProjects({start: 0 , category: activeCategory});
                setProjects([...newProjects]);
            } catch (e){
                console.log(e);
            }
        })()
    }, [switching])

    useEffect(() => {
        if (isFirstRun) {
            setIsFirstRun(false);
            return;
        }
        setSwitching(true);
    }, [activeCategory])

    const nextProject = () => {
        setScrolling(1);
    }

    const prevProject = () => {
        setScrolling(-1);
    }

    const wheelparser = (dir) => {
        if (!isTypeDirection(dir)) return;
        if (dir === 'left') prevProject();
        if (dir === 'right') nextProject();
    }

    const {onTouchStart, onTouchMove, onTouchEnd, wheelHandler} = swipeHandler(wheelparser);
    return(
        <Block key={'projects'} className={ProjectsStyle.projects} id={'projects'} >
            <ul className={ProjectsStyle.categorySelector}>
                {categories.map((t, i)=><li key={`cat-${i}`} className={activeCategory === t.id ? ProjectsStyle.active : ''}><a onClick={selectCategory(t.id)}>{t.name[locale]}</a></li>)}
            </ul>

            <div className={ProjectsStyle.projectList} id={'project-list'} onWheel={wheelHandler} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                <div className={ProjectsStyle.projectListInner} id={'project-list-inner'}>
                    {projects.map(
                        (t, i)=>
                        <Project
                            key={t.name.en}
                            id={i}
                            name={t.name}
                            images={t.preview_images}
                            tags={t.tags}
                            categories={t.categories}
                            desc={t.description_short}
                            link={t.link}
                            switching={switching}
                        />
                        )}
                    <Project id={projects.length} hide={true}/>
                    {scrolling !== 1 && activeProject <= 0 ? '' : <Icon style={'arrow-left'} className={ProjectsStyle.arrowLeft} onClick={prevProject}/>}
                    {scrolling !== -1 && activeProject >= projects.length - 1 ? '' : <Icon style={'arrow-right'} className={ProjectsStyle.arrowRight} onClick={nextProject}/>}

                </div>


            </div>
        </Block>
    );
}
