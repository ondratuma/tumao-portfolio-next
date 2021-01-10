import {translatable} from "./Project";


export interface Content {
    contact: {
        name: string;
        email: string;
        linkedin: string;
        facebook: string;
        github: string;
    };
    form: {
        lambda_url: string;
        email_label: translatable;
        message_label: translatable;
        button_labels: Array<translatable>
    };
    my_traits: Array<translatable>
    first_page_pre: translatable;
    first_page_image: { url: string };
    pages: Array<{name: translatable}>;
    lambda_url: string
}