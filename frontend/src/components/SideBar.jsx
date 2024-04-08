import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';

const SidebarContext = createContext();

export default function Sidebar({ children,sendWidth }) {
  const [expanded, setExpanded] = useState(true);
  const [width, setWidth] = useState();
  const ref = useRef();
  const { user } = useAuthContext();
  const img = user.userObj.image;
  const email = user.userObj.email;
  const name = user.userObj.nom
  useEffect(() =>{
    if (expanded){setWidth(284)}
    else {setWidth(73)}
  },[expanded])
  useEffect(() =>{
    sendWidth(width)
  },[width])
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust the max-width according to your needs

    const handleMediaQueryChange = (mediaQuery) => {
      setExpanded(!mediaQuery.matches);
    };

    // Call the function once to set the initial state
    handleMediaQueryChange(mediaQuery);

    // Listen for media query changes
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <div className={`h-[calc(100vh-82px)] ${expanded ? 'w-[284px]' : 'w-[73px]'} mt-[82px]`}>
      <aside className={`fixed h-[calc(100vh-82px)]  z-[30]`} ref={ref}>
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
                src={img}
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
                <h4 className="font-semibold">{name}</h4>
                <span className="text-xs text-gray-600">{email}</span>
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export function SidebarItem({ icon, text, active, alert,link, test }) {
  const { expanded, setExpanded } = useContext(SidebarContext);

  return (
    <Link to={test? '' :`/${link}`}
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
