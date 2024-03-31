import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-auto">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/blacklogo.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-[50px] h-[50px]" : "w-0"
            }`}
            alt="logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, setExpanded }}>
          <ul className="flex-1 px-3">
            {children}
          </ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3">
          <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Takwirti</h4>
              <span className="text-xs text-gray-600">Takwirti@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert,link, onClick }) {
  const { expanded, setExpanded } = useContext(SidebarContext);
  const { logout } = useLogout();

  const handleClick = () => {
    if (onClick && text === "Se déconnecter") {
      onClick(); // Call the onClick function only for the "Se déconnecter" item
      window.alert("user successfully logged out");
      setExpanded(false); // close sidebar after logout
    } else if (!onClick) {
      setExpanded((prevExpanded) => !prevExpanded); // Toggle sidebar expansion for other items
    }
  };
  return (
    <Link to={`/${link}`}
      className={`
        relative flex py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-green-500"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    onClick={handleClick}
    >
      {expanded ? (
        <>
          <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
            {text}
          </span>
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-green-400 ${
                expanded ? "" : "top-2"
              }`}
            />
          )}
        </>
      ) : (
        <>
          {icon && (
            <div onClick={() => setExpanded((prevExpanded) => !prevExpanded)}>
              {icon}
            </div>
          )}
          {alert && (
            <div
              className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-100 text-green-500 text-sm
                invisible opacity-20 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
            >
              {icon}
            </div>
          )}
        </>
      )}
    </Link>
  );
}

