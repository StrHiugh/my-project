import "./login.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Input} from "@nextui-org/react";
import {Lumiflex} from "uvcanvas";

export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await fetch('http://localhost:8000/api-token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token); // Guardar token
            navigate('/'); // Redirigir al dashboard o página de inicio
        } else {
            alert('Usuario o contraseña incorrectos');
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
                            <CardHeader className="flex justify-center items-center text-4xl text-center">
                                Iniciar Sesión
                            </CardHeader>
                            <CardBody>
                                <div className="grid grid-cols-1 grid-rows-3 gap-6">
                                    <Input
                                        type="usuario"
                                        label="Usuario"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}/>
                                    <Input
                                        type="password"
                                        label="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}/>

                                    <Button color="secondary" onClick={handleLogin}>
                                        Login
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
