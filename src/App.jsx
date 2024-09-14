import './App.css'
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import React from "react";
import BlogLayout from "./components/blog"
import Topbar from './components/Topbar';

function App() {
    const [isFollowed, setIsFollowed] = React.useState(false);

    return (
        <>
            <div className="App">
                <Topbar />  {/* Barra de navegación */}
                <BlogLayout/>
            </div>
        </>
    );
}

export default App
