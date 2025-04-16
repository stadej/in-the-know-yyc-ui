import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Textarea } from "@nextui-org/input";
import "../app/styles/pages/contact.css";
import useContactFormValidation from "../hooks/useContactFormValidation";

// SEO: Pages metadata
import pagesMetaData from "../utils/pagesMetaData";
import PagesMetaData from "../components/PagesMetaData";

export default function Contact({metadata}) {

    const [messageText, setMessageText] = useState('');

    const sendEmail = () => {
        window.open(`mailto:intheknowyyc1@gmail.com?subject=Question From The Website&body=${messageText}`);
    }

    useContactFormValidation();

    return (
        <>
            <PagesMetaData metadata={metadata} />
            <main id="contact">
                <h1>Contact Us</h1>
                <div className="contactContainer">
                    <div className="contactFormContainer">
                        <form onSubmit={sendEmail} id='contactForm'>
                            <Textarea
                                label="Message" 
                                value={messageText} 
                                onChange={(e) => {setMessageText(e.target.value)}} 
                                isRequired 
                                labelPlacement="outside"
                                placeholder="Have any questions? Please type your message here."
                                minRows="5"
                                className="formTextarea"
                                classNames={{
                                    mainWrapper: "inputContact-mainWrapper",
                                    innerWrapper: "inputContact-innerWrapper",
                                    inputWrapper: "inputContact-inputWrapper"
                                }}/>

                            <button type="submit">Send</button>
                        </form>

                        <div id="formSubmitionMessage">
                            Thank you for contacting us.
                            <br /><br /><br />
                            We will get back to you as soon as possible.
                        </div>
                    </div>

                    <div className="contactInfo">
                        <ul>
                            <li>
                                <Link href={'mailto:intheknowyyc1@gmail.com'} target="_blank">
                                    <div className="iconContainer">
                                        <Image src={'/images/social/email.svg'} width={24} height={24} alt="" />
                                    </div>
                                    intheknowyyc1@gmail.com
                                </Link>
                            </li>
                            <li>
                                <Link href={'https://www.linkedin.com/company/in-the-know-yyc/'} target="_blank">
                                    <div className="iconContainer">
                                        <Image src={'/images/social/linkedin.svg'} width={24} height={24} alt="" />
                                    </div>
                                    /in-the-know-yyc
                                </Link>
                            </li>
                            <li>
                                <Link href={'https://www.facebook.com/profile.php?id=61566914236277'} target="_blank">
                                    <div className="iconContainer">
                                        <Image src={'/images/social/facebook.svg'} width={24} height={24} alt="" />
                                    </div>
                                    /INTHEKNOWYYC
                                </Link>
                            </li>
                            <li>
                                <Link href={'https://www.instagram.com/intheknowyyc/'} target="_blank">
                                    <div className="iconContainer">
                                        <Image src={'/images/social/instagram.svg'} width={24} height={24} alt="" />
                                    </div>
                                    /intheknowyyc
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </main >
        </>
    );
};

export async function getServerSideProps() {
    const metadata = await pagesMetaData('contact')
    return { props: { metadata } };
}