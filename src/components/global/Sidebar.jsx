import React, {useState, useContext, createContext} from "react";
import {Button, ButtonGroup} from "@nextui-org/react";
import {ChevronFirst, ChevronLast} from "lucide-react";
import './Sidebar.css';
import {useNavigate} from "react-router-dom";
const SidebarContext = createContext()

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true)

    const Logo = () => (
        <svg id="logo-13" width="18%" height="20S%" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.98441 29.2899C1.98441 27.0299 2.42954 24.7919 3.29444 22.704C4.15935 20.6159 5.42701 18.7187 7.02513 17.1206C8.62324 15.5225 10.5204 14.2548 12.6084 13.3899C14.6965 12.5251 16.9344 12.0799 19.1945 12.0799V29.2899H1.98441Z"
                className="ccustom" fill="#442781"></path>
            <path
                d="M1.98441 29.2899C1.98441 31.55 2.42954 33.7879 3.29444 35.876C4.15935 37.964 5.42701 39.8612 7.02513 41.4593C8.62324 43.0574 10.5204 44.3251 12.6084 45.19C14.6965 46.0549 16.9344 46.5 19.1945 46.5V29.2899H1.98441Z"
                className="ccompli1" fill="#61459C"></path>
            <path
                d="M36.4043 29.2899C36.4043 31.55 35.9595 33.7879 35.0947 35.876C34.2298 37.964 32.9622 39.8612 31.3638 41.4593C29.7657 43.0574 27.8685 44.3251 25.7804 45.19C23.6925 46.0549 21.4545 46.5 19.1945 46.5V29.2899H36.4043Z"
                className="ccompli2" fill="#A992DB"></path>
            <path
                d="M47.0156 14.422C47.0156 21.5586 41.23 27.344 34.0935 27.344H21.1716V14.422C21.1716 7.2854 26.957 1.5 34.0935 1.5C41.23 1.5 47.0156 7.2854 47.0156 14.422Z"
                className="ccustom" fill="#FF7917"></path>
        </svg>
    );

    return(
        <aside className={`h-screen fixed top-0 left-0 ${expanded ? 'w-64' : 'w-16'} transition-width duration-300`}>
            <nav className="h-full w-fit flex  flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <Logo/>
                    <Button
                       onClick={() => setExpanded((curr) => !curr)}
                       className="p-1.5 rounded-lg bg-gray-50 hover: bg-gray-100"
                   >
                       {expanded ? <ChevronFirst/> : <ChevronLast/>}
                   </Button>
               </div>

               <SidebarContext.Provider value={{ expanded }}>
                   <ul className="flex-1 px-3">{children}</ul>
               </SidebarContext.Provider>
            </nav>
        </aside>

    );
}

export function SidebarItem({ icon, text, active, alert, path }) {
    const {expanded} = useContext(SidebarContext);
    const navigate = useNavigate(); // Usa useNavigate para navegar
    const handleClick = () => {
        navigate(path); // Navega a la ruta especificada
    };
    return(
        <li
            onClick={handleClick}
            className={`
                relative flex items-center py-2 px-3 my-2 
                font-medium rounded-md cursor-pointer 
                transition-colors group 
                ${active 
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" 
                    : "hover:bg-indigo-50 text-gray-600"}`}>

            {icon}
            <span
                className={`ml-3 transition-all ${
                    expanded ? "opacity-100" : "opacity-0 w-0"
                }`}

            >
                {text}
            </span>

            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                    expanded ? "" : "top-2"
                    }
                 }`}/>
            )}

            {!expanded && (
                <div
                    className={`
                    absolute left-full rounded-md px-2 py-2 ml-6
                    bg-indigo-100 text-indigo-800 text-sm
                    invisible opacity-0 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                    `}
                    >
                    {text}
                </div>
            )}
        </li>
    );
}
