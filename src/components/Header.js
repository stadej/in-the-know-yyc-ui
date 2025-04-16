import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import SearchEventInput from './SearchEventInput'
import "../app/styles/components/header.css";

// HOOK TO OPEN AND CLOSE THE MENU IN MOBILE VERSION
import useMobileMenuToggle from '../hooks/useMobileMenuToggle';


const Header = () => {
  // Functionality for main menu in responsive version
  useMobileMenuToggle();

  const eventRedirectWithFullRefresh = () => {window.location.href = "/events"}
  

  return (
    <header id="mainMenuHeader">
      <div className='headerContainer'>
        <div>
          <Link href="/events">
            <Image src='/images/intheknowlogored.png' alt="In The Know YYC - Logo" width={160} height={52} />
          </Link>
        </div>
        <button className='onlyMobile toggleMenu' id="toggleMobileMenu"><Image src={'/images/icons/menu.svg'} width={37} height={27} alt='' /></button>
        {/* <form action='/events' method='get' id="headerEventSearchForm">
          <SearchEventInput inputId={'inputSearchHeader'} formId={'headerEventSearchForm'} />
        </form> */}
        <nav>
          <ul>
            {/* <li><Link href="/">Home</Link></li> */}
            <li><Link href="/events" onClick={eventRedirectWithFullRefresh}>Events</Link></li>
            <li><Link href="/subscribe">Subscribe</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            {/*
            <li><Link href="/login">Log In</Link></li>
            <li><Link href="/signup" className='button'>Sign Up</Link></li>
            */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 