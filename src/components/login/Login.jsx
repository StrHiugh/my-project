import "./login.css";
import {useLocation, useNavigate} from "react-router-dom";
import React, {Suspense, useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Input} from "@nextui-org/react";
import {Lumiflex} from "uvcanvas";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import logocop from "../../assets/logocop2.png"
import {Eye, EyeOff} from "lucide-react";

const SECRET_KEY = "abcdefghi123456789";
export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        username: '',
        password: '',
    });    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility=() => setIsVisible(!isVisible);
    const handleLogin = async () => {
        setIsLoggingIn(true);
        setErrorMessage({
            username: '',
            password: '',
        });        const response = await fetch('http://localhost:8000/api-token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('first_name', data.first_name);
            const encryptedToken = CryptoJS.AES.encrypt(data.token, SECRET_KEY).toString();
            // Guarda el token en cookies
            Cookies.set('auth_token', encryptedToken, {
                secure: true, // Asegura la cookie solo en HTTPS
                sameSite: 'Strict', // Evita el envío de cookies a sitios de terceros
                expires: 7, // Duración en días (por ejemplo, 7 días)
            });
            navigate('/'); // Redirigir al dashboard o página de inicio
            setIsLoggingIn(false);

        } else {
            setErrorMessage({
                username: 'Usuario o contraseña incorrectos',
                password: 'Usuario o contraseña incorrectos',
            });
            setIsLoggingIn(false);
        }
    };

    useEffect(() => {
        const rootElement = document.getElementById("root");
        if (location.pathname === "/Login") {
            rootElement.classList.add("login-screen");
        } else {
            rootElement.classList.remove("login-screen");
        }

        return () => {
            rootElement.classList.remove("login-screen");
        };
    }, [location.pathname]);

    return (
        <div className="login-screen">
            <div className="background">
                <Lumiflex/>
            </div>
            <div className="login">
                <div className="grid grid-cols-4 grid-rows-6 gap-3">
                    <div className="col-span-2 row-span-4 col-start-2 row-start-2">
                        <Card className="sm:w-full md:w-96 lg:w-[420px]">
                            <CardHeader className="flex justify-center items-center">
                                <img src={logocop} alt="Logo Cop" className="w-[300px] h-auto object-cover"/>
                            </CardHeader>
                            <CardBody>
                                <div className="grid grid-cols-1 grid-rows-3 gap-6">
                                    <Input
                                        type="usuario"
                                        label="Usuario"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        isInvalid={!!errorMessage.username}
                                        errorMessage={errorMessage.username}

                                    />
                                    <Input
                                        label="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={!!errorMessage.password} // Activar error si hay mensaje
                                        errorMessage={errorMessage.password}
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                                {isVisible ? (
                                                    <Eye className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? "text" : "password"}
                                    />

                                    <Button color="secondary" onClick={handleLogin}>
                                        {isLoggingIn ? "Iniciando sesión..." : "Iniciar sesión"}
                                    </Button>
                                    {/* Suspense para manejar la carga del componente del Dashboard */}
                                    <Suspense fallback={<div>Cargando dashboard...</div>}>
                                    </Suspense>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
