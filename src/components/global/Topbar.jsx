import React, {useState} from 'react';
import './Topbar.css';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar
} from "@nextui-org/react";
import {Switch} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";

const Topbar = () => {
        const navigate = useNavigate();

return (

    <Navbar isBordered>
        <NavbarContent justify="start">
            <NavbarBrand className="mr-4">
                <p className=" md:block font-extrabold fonttext-inherit">Cooperativa Mecoacán</p>
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="secondary"
                        name="Jason Hughes"
                        size="sm"
                        src="https://i.pravatar.cc/150?u=a042581f4gfg"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">zoey@example.com</p>
                    </DropdownItem>
                    <DropdownItem key="settings">My Settings</DropdownItem>
                    <DropdownItem key="logout" color="danger" onPress={() => navigate(`/Login`)}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </NavbarContent>
    </Navbar>
);
}
;

export default Topbar;