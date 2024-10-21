import {useState, useContext, createContext} from "react";
import {Button, ButtonGroup} from "@nextui-org/react";
import {ChevronFirst, ChevronLast} from "lucide-react";
import './Sidebar.css';
import {useNavigate} from "react-router-dom";
const SidebarContext = createContext()

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true)
    return(
        <aside className={`h-screen fixed top-0 left-0 ${expanded ? 'w-64' : 'w-16'} transition-width duration-300`}>
            <nav className="h-full w-fit flex  flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                   <img
                       src="https://img.logoipsum.com/212.svg"
                       className={`overflow-hidden transition-all ${
                           expanded ? "w-32" : "w-0"
                       }`}
                       alt=""
                   />
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
