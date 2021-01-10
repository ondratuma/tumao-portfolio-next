import {VerticalScroller} from "../components/Page";
import React, {useEffect, useRef, useState, createContext, useContext, Context} from "react";
import {Navbar} from "../components/Navbar";
import {Projects} from "../components/Projects";
import {Contact} from "../components/Contact";
import { Strapi } from "../Models/Strapi";
import {GeneralStrings} from "../Models/Types/GeneralStrings";
import Intro from "../components/Intro";
if (!(process.browser && "scrollBehavior" in document.documentElement.style)) {
    import("scroll-behavior-polyfill");
}
// @ts-ignore
export const strapiStaticProvider: Context<GeneralStrings> = createContext({});

export default function Home({ projects, categories, pages, traits, contact, form, first_page_pre, general_strings, first_page_image, strapi_url }) {
    return (
        <strapiStaticProvider.Provider value={general_strings}>
          <VerticalScroller pages={pages}>
              <Intro first_page_pre={first_page_pre} traits={traits} first_page_image={first_page_image}/>
              <Projects key={2} initProjects={projects} initCategories={categories} strapi_url={strapi_url} />
              <Contact key={3} contact={contact} form={form} header={pages[0][1]} />
              <Navbar key={'navbar'} />
          </VerticalScroller>
        </strapiStaticProvider.Provider>
  )
}

export async function getStaticProps(context) {
    const strapi_url = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : process.env.STRAPI_URL;
    const strapi = Strapi(strapi_url);

    const {locale} = context;
    const content = await strapi.getContent();
    const props = {
        categories: await strapi.getCategories(),
        projects: await strapi.getProjects({start: 0}),
        pages: [
            ['contact',content.pages[2].name[locale]],
            ['projects', content.pages[1].name[locale]],
            ['intro', content.pages[0].name[locale]],
        ],
        traits: content.my_traits.map(t => t[locale]),
        contact: content.contact,
        form: content.form,
        first_page_pre: content.first_page_pre[locale],
        general_strings: await strapi.getGeneralStrings(),
        first_page_image: content.first_page_image.url,
        strapi_url: strapi_url
    };
    return {
        props: props
    }
}
