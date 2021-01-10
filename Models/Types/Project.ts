import {Category} from "./Category";

export interface translatable {
    en: string;
    cs: string;
}

export interface Project {
    name: translatable;
    preview_images?: [
        {url: string}
    ];
    categories: Array<Category>;
    description_short: translatable;
    tags: Array<{name: translatable}>;
    link: string;
}