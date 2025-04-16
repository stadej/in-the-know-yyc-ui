import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { toast } from 'react-toastify';
import Image from "next/image";
import Link from "next/link";

import {logout} from "../../api/users";

export default function CmsHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const menuItems = [
  //   { name: 'HOME', href: '/cms' },
  //   { name: 'Events', href: '/cms/events' },
  //   { name: 'Messages', href: '/cms/messages' },
  //   { name: 'Users', href: '/cms/users' }
  // ];

  const handleLogout = async () => {    
    const logoutStatus = await logout();

    if(logoutStatus.type === 'error'){ 
        toast.error(logoutStatus.message); 
        return;
    }
    if(logoutStatus.type === 'success'){ 
        toast.success(logoutStatus.message); 
        return;
    }
  }


  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} id="cmsHeader" classNames={{base:"bg-white"}}>
      <NavbarContent>
        <NavbarBrand>
          <Image src={'/images/logo.png'} width={160} height={52} alt="In The Know YYC | Logo" />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          id="CmsResponsiveMenuToggle"
        />
      </NavbarContent>

      {/* PC MENU */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem><Link href='/events' className="block py-2 px-3">HOME</Link></NavbarItem>
        <NavbarItem><Link href='/cms/events' className="block py-2 px-3">Events</Link></NavbarItem>
        <NavbarItem><Link onClick={handleLogout} href='/cms/login' className="block py-2 px-3">Log Out</Link></NavbarItem>
        {/*menuItems.map((item, index) => {
          return (
            <NavbarItem key={index}>
              <Link href={item.href} className="block py-2 px-3">{item.name}</Link>
            </NavbarItem>
          );
        })*/}
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu id="cmsNavbarMenu">
        <NavbarMenuItem><Link href='/events' className="block py-2 px-3">HOME</Link></NavbarMenuItem>
        <NavbarMenuItem><Link href='/cms/events' className="block py-2 px-3">Events</Link></NavbarMenuItem>
        <NavbarMenuItem><Link onClick={handleLogout} href='/cms/login' className="block py-2 px-3">Log Out</Link></NavbarMenuItem>

        {/*menuItems.map((item, index) => {
          return(
            <NavbarMenuItem key={index}>
              <Link href={item.href} className="block py-2 px-3">{item.name}</Link>
            </NavbarMenuItem>
          );
        })*/}

      </NavbarMenu>
    </Navbar>
  );
}
