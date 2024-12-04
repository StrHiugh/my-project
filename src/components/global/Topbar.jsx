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
    Avatar, NavbarMenuToggle, NavbarMenuItem
} from "@nextui-org/react";
import {useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const Topbar = () => {
        const navigate = useNavigate();
        const [isMenuOpen, setIsMenuOpen] = React.useState(false);
        const location = useLocation(); // Obtén la ubicación actual
        const handleLogout = () => {
            // Eliminar el token de las cookies
            Cookies.remove('auth_token');

            // Redirigir al usuario a la página de inicio de sesión
            navigate('/Login');
        };

        const firstName = localStorage.getItem('first_name');
        return (

            <Navbar
                isBordered
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
            >
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"}/>
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarItem className="mr-4">
                        <Link color="secondary" href="#">
                            Cooperativa Transformando Mecoacán
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem className="mr-4">
                        <Link color="secondary" href="/" className="text-xl font-semibold"
                              active={location.pathname === '/'}>
                            Cooperativa Transformando Mecoacán
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link
                            color={location.pathname === '/Proceso' ? "secondary" : "foreground"}
                            href="/Proceso"
                            className={location.pathname === '/Proceso' ? 'active-link' : ''}
                        >
                            Tarea
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link
                            color={location.pathname === '/Equipo' ? "secondary" : "foreground"}
                            href="/Equipo"
                            className={location.pathname === '/Equipo' ? 'active-link' : ''}
                        >
                            Totem
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link
                            color={location.pathname === '/Planta' ? "secondary" : "foreground"}
                            href="/Planta"
                            className={location.pathname === '/Planta' ? 'active-link' : ''}
                        >
                            Depuradora
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link
                            color={location.pathname === '/Producto' ? "secondary" : "foreground"}
                            href="/Producto"
                            className={location.pathname === '/Producto' ? 'active-link' : ''}
                        >
                            Producto
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link
                            color={location.pathname === '/Sensores' ? "secondary" : "foreground"}
                            href="/Sensores"
                            className={location.pathname === '/Sensores' ? 'active-link' : ''}
                        >
                            Sensores
                        </Link>
                    </NavbarItem>
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
                                <p className="font-semibold">Perfil de:</p>
                                <p className="font-semibold">{firstName}</p>
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                Cerrar Sesión
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>

            </Navbar>
        );
    }
;

export default Topbar;