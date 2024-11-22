import "./login.css"
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Button, Card, CardBody, CardHeader, Input} from "@nextui-org/react";

export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const rootElement = document.getElementById("root");
        if (location.pathname === "/Login") {
            rootElement.classList.add("login-screen");
        } else {
            rootElement.classList.remove("login-screen");
        }
        return () => {
            rootElement.classList.remove("login-screen"); // Limpieza al desmontar
        };
    }, [location.pathname]);


    return (

        <div className="Login">
            <div className="grid grid-cols-4 grid-rows-6 gap-3">
                <div className="col-span-2 row-span-4 col-start-2 row-start-2">
                    <Card className="sm:w-full md:w-96 lg:w-[450px]">
                        <CardHeader className="flex justify-center items-center text-4xl text-center">
                            Iniciar Sesion
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-1 grid-rows-3 gap-6">
                                <Input type="usuario" label="Usuario"/>
                                <Input type="password" label="Contraseña"/>
                                <Button color="secondary" onPress={() => navigate('/')}>
                                    Login
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}