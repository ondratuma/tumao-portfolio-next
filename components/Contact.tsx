import BlockStyle from "../styles/components/Contact.module.scss";
import {Block} from "./Block";
import React, {useContext, useState} from "react";
import {ScrollBox} from "./ScrollBox";
import { Content } from './../Models/Types/Content'
import {useRouter} from "next/router";
import axios from "axios";
import {ActivePageContext, PagesContext} from "./Page";
const validateEmail = (em) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(em).toLowerCase());
}

let instance = axios.create({
    headers: {
        post: {        // can be common or any other method
            header1: 'value1'
        }
    }
})


const apiKey = 'cuphlh1l7L4HFNFkMMcFw2nLANaFYqno2l5vJ7Cs';

const sendEmail = async (target, message, lambda) => {
    const email = await axios.create({headers: {
            'X-API-Key': `${apiKey}`
        }}).post(lambda, {email: target, message: message})
    return email;
}

export const Contact = ({contact, form, header}: {contact: Content['contact'], form: Content['form'], header: string}) => {
    const router = useRouter();
    const { locale } = router;

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const pages = useContext(PagesContext);
    const activePage = useContext(ActivePageContext);

    const [emailError, setEmailError] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const [submitButtonDisable, setSubmitButtonDisable] = useState(false);
    const [btnValue, setBtnValue] = useState(0);

    const onEmailChange = (e) => {
        const locEmail = e.target.value;
        if (emailError) setEmailError(!validateEmail(locEmail));
        setEmail(locEmail);
    }
    const onMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const onSubmit = () => {
        if (btnValue === 2) return;
        setSubmitButtonDisable(true);
        setBtnValue(1);
        const error = !validateEmail(email);
        setEmailError(error);
        if (error){
            setBtnValue(3)
            setSubmitButtonDisable(false);
            return
        }
        (async () => {
            try {
                const sent = await sendEmail(email, message, form.lambda_url);
                setBtnValue(2);
            } catch (e){
                console.error(e)
                setBtnValue(3);
            }
        })()
    }



    return (

        <Block key={3} id={'contact'} >
            <div className={BlockStyle.contact}>
                <div className={BlockStyle.contacts}>
                    <h1>{header}</h1>
                    <div className={BlockStyle.content}>
                        <div className={BlockStyle.about}>
                            <div className={BlockStyle.text}>
                                <p className={BlockStyle.name}>
                                    {contact.name}
                                </p>
                                <p className={BlockStyle.email}>
                                    <a href={`mailto: ${contact.email}`}>{contact.email}</a>
                                </p>
                            </div>
                            <div className={BlockStyle.images}>
                                <div className={BlockStyle.social}>
                                    <a rel={'noopener'} className={BlockStyle.linkedin} href={contact.linkedin} target="_blank" >
                                        <div className={BlockStyle.cover}/>
                                    </a>
                                    <a rel={'noopener'} className={BlockStyle.facebook} href={contact.facebook} target="_blank" >
                                        <div className={BlockStyle.cover}/>
                                    </a>
                                </div>
                                <a rel={'noopener'} className={BlockStyle.git} href={contact.github} target="_blank" >
                                    <div className={BlockStyle.cover}/>
                                </a>
                            </div>
                        </div>
                        <form className={BlockStyle.form} onSubmit={onSubmit} id={'contact-form'}>
                            <div className={[BlockStyle.group, BlockStyle.email, emailError ? BlockStyle.error : ''].join(' ')}>
                                <input onChange={onEmailChange} value={email} id={'email'} name={'email'} type={'email'} placeholder={' '} required readOnly={submitButtonDisable} disabled={submitButtonDisable}  />
                                <label htmlFor={'email'}>{form.email_label[locale]}</label>
                            </div>
                            <div className={[BlockStyle.group, BlockStyle.text].join(' ')}>
                                <textarea onChange={onMessageChange} value={message} className={BlockStyle.text} id={'text'} name={'text'}  placeholder={' '} required rows={10} disabled={submitButtonDisable} readOnly={submitButtonDisable} />
                                <label htmlFor={'text'}>{form.message_label[locale]}</label>
                            </div>

                            <div className={BlockStyle.submit} onClick={onSubmit}>
                                <ScrollBox fontWeight={100} underline={false} traits={form.button_labels.map(t => t[locale])} align={'center'} value={btnValue} mouseEnabled={false} autoDelay={0} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Block>
    )
}


