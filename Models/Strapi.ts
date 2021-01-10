import axios from "axios";
import {Project as ProjectType} from "./Types/Project";
import {Category} from "./Types/Category";
import {Content} from "./Types/Content";
import {GeneralStrings} from "./Types/GeneralStrings";
export const Strapi = (STRAPI_URL) => {
    return {
        getProjects: async ({start = 0, category = 0} : {start?: number, category?: number}): Promise<ProjectType[]> => {
            const projectsData = await axios.get(`${STRAPI_URL}/projects?_limit=3&_sort=started:DESC&_start=${start}${category ? `&categories.id=${category}` : ''}`);
            return projectsData.data;
        },

        getProject: async ({id}): Promise<ProjectType> => {
            const projectsData = await axios.get(`${STRAPI_URL}/projects/${id}`);
            return projectsData.data;
        },

        getCategories: async (): Promise<Category[]> => {
            const projectsData = await axios.get(`${STRAPI_URL}/categories`);
            return projectsData.data;
        },

        getContent: async (): Promise<Content> => {
            const projectsData = await axios.get(`${STRAPI_URL}/content`);
            return projectsData.data;
        },

        getGeneralStrings: async (): Promise<GeneralStrings> => {
            const projectsData = await axios.get(`${STRAPI_URL}/general-strings`);
            return projectsData.data;
        },
    }
}