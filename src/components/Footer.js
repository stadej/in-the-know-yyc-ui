import React from "react";
import Image from "next/image";
import Link from 'next/link';
import "../app/styles/components/footer.css";

const Footer = () => {

    // USAR DESCRIPTION PARA OCULTAR FORM DESPUES DE SUBMITEAR??
    return (
        <footer>
            <div className="newsletter-container">
                <div className='col1'>
                    <h3>Want to receive weekly updates?</h3>
                    <Link href="/subscribe">Join Our Mailing List!</Link>
                </div>
            </div>
            <div className="nav-container">
                <div>
                    <Link href="/events">
                        <Image src="/images/logo-white.svg" alt="In The Know YYC - Logo White" width={168} height={106} />
                    </Link>
                </div>
                {/* <div>
                    <h3>Legal</h3>
                    <ul>
                        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
                    </ul>
                </div> */}
                <div>
                    <h3>Company</h3>
                    <ul>
                        <li><Link href="/events">Events</Link></li>
                        <li><Link href="/subscribe">Subscribe</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <div>
                    <h3>Content Management</h3>
                    <ul>
                        <li><Link href="/cms/login">Log In</Link></li>
                    </ul>
                </div>
                <div className="social-container">
                    <h3>Social Media (Follow Us)</h3>
                    <ul>
                        <li>
                            <Link href="https://www.facebook.com/profile.php?id=61566914236277" target="_blank">
                                <Image src="/images/social/facebook.svg" alt="Facebook icon" width={17} height={16} />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.linkedin.com/company/in-the-know-yyc/posts/?feedView=all&viewAsMember=true" target="_blank">
                                <Image src="/images/social/linkedin.svg" alt="Linkedin icon" width={17} height={16} />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.instagram.com/intheknowyyc/" target="_blank">
                                <Image src="/images/social/instagram.svg" alt="Instagram icon" width={16} height={15} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="copyright-container">
                <p>
                    <span>&copy;</span> 2024 Copyright - All rights reserved by <Link href={'/'}>YYC</Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;