import { useState } from "react";
import { Sidebar, Button, Text, Transition } from "@nextui-org/react";

export function Sidebar() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <div>
            {/* Botón para alternar el sidebar */}
            <Button onPress={toggleSidebar}>Toggle Sidebar</Button>

            {/* Sidebar con transición */}
            <Transition
                enter="transform transition duration-500"
                enterFrom="opacity-0 -translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="transform transition duration-500"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 -translate-x-full"
                show={isSidebarVisible}
            >
                <Sidebar
                    isOpen={isSidebarVisible}
                    onClose={() => setSidebarVisible(false)}
                    css={{
                        width: "240px",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: "100vh",
                        background: "#fff",
                        zIndex: 1000,
                        padding: "16px",
                    }}
                >
                    {/* Contenido del sidebar */}
                    <Text h2>Sidebar</Text>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </Sidebar>
            </Transition>

            {/* Resto de la página */}
            <main style={{ marginLeft: isSidebarVisible ? "240px" : "0", padding: "16px" }}>
                <Text h1>Main Content</Text>
                <p>This is the main content of the page.</p>
            </main>
        </div>
    );
}
