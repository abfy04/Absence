import {  
  School, LayoutGrid, ClipboardList, User,
  CalendarFold, Sun, Moon, LogOut,
  TrafficCone, History, Users, Bolt,
  
} from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

const links = {
  'Admin': [
    { 
      pageName: 'Dashboard',
      pageLink: '/',
      description: 'Overview and analytics'
    },
    { 
      pageName: 'Human Resources',
      pageLink: '/humanRessources',
      description: 'Manage staff and personnel'
    },
    { 
      pageName: 'School Resources',
      pageLink: '/schoolResources',
      description: 'Manage school assets'
    },
    { 
      pageName: 'Historiques',
      pageLink: '/historique',
      description: 'View activity history'
    },
    { 
      pageName: 'Configuration',
      pageLink: '/configuration',
      description: 'System settings'
    }
  ],
  'Teacher': [
    { 
      pageName: 'Schedule',
      pageLink: '/',
      description: 'View and manage schedule',
      shortCut: 'Shift + S'
    },
    {
      pageName: 'Track Progress',
      pageLink: '/progress',
      description: 'Monitor student progress',
      shortCut: 'Shift + P'
    }
  ]
};

const size = 20;
const icons = {
  'Admin': {
    Dashboard: <LayoutGrid size={size} />,
    'Human Resources': <Users size={size}/>,
    'School Resources': <School size={size}/>,
    'Historiques': <History size={size} />,
    'Configuration': <Bolt size={size} />
  },
  'Teacher': {
    'Track Progress': <TrafficCone size={size} />,
    'Schedule': <CalendarFold size={size}/>
  }
};

export default function SideBar({ darkMode, setDarkMode, role, setRole }) {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoverTimeout(setTimeout(() => setIsExpanded(true), 100));
  }, [hoverTimeout]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoverTimeout(setTimeout(() => setIsExpanded(false), 100));
  }, [hoverTimeout]);

  const logOut = () => {
    localStorage.setItem('userRole', false);
    navigate('/');
    setRole(null);
  };

  const activeLinks = links[role];
  const activeIcons = icons[role];

  return (
    <aside 
      className={`flex flex-col justify-between transition-all duration-300 ease-in-out
        fixed z-50 h-svh 
        bg-white dark:bg-gray-900
        text-gray-700 dark:text-gray-50
        border-r border-gray-200 dark:border-gray-800
        shadow-lg
        ${isExpanded ? 'w-72' : 'w-20'}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Content Section */}
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <Link 
          to={'/'}
          className={`flex items-center gap-3  border-b border-gray-200 dark:border-gray-800
            bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50"
            ${isExpanded ? ' justify-start p-4' : ' justify-center p-5'}
            `}
        >
          <ClipboardList size={20} className="min-w-6 text-purple-600 dark:text-purple-400"/>
          <h2 className={`text-lg font-bold transition-opacity duration-300 
            text-purple-600 dark:text-purple-400
            ${isExpanded ? 'block' : 'hidden'}`}>
            EduTrack
          </h2>
        </Link>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3">
          <div className="flex flex-col gap-1">
            {activeLinks.map(link => (
              <NavLink
                to={link.pageLink}
                key={link.pageName}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm
                  transition-all duration-200 group
                  ${(link.pageLink === '/' ? path === '/' : path.startsWith(link.pageLink))
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-800/50 dark:text-purple-300 shadow-sm' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }
                  ${isExpanded ? ' justify-start' : ' justify-center'}
                `}
              >
                <div className={`min-w-6 transition-colors duration-200
                  ${(link.pageLink === '/' ? path === '/' : path.startsWith(link.pageLink))
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400'
                  }`}>
                  {activeIcons[link.pageName]}
                </div>
                <div className={`flex flex-col transition-opacity duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
                  <span>{link.pageName}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{link.description}</span>
                </div>
                {link.shortCut && isExpanded && (
                  <span className="absolute right-3 text-xs text-gray-400 dark:text-gray-500">
                    {link.shortCut}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer Section - Always Visible */}
        <div className="p-3 space-y-2 border-t border-gray-200 dark:border-gray-800 
          bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(darkMode === 'dark' ? 'light' : 'dark')}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${darkMode === 'dark'
                ? 'hover:bg-gray-800 text-yellow-400 hover:text-yellow-300'
                : 'hover:bg-gray-100 text-gray-700 hover:text-purple-600'
              }
              ${isExpanded ? ' justify-start' : ' justify-center'}
            `}
          >
            <div className={`min-w-6 transition-colors duration-200
              ${darkMode === 'dark' ? 'text-yellow-400' : 'text-gray-500'}`}>
              {darkMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </div>
            <span className={`transition-opacity duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
              {darkMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {/* Logout Button */}
          <button
            onClick={logOut}
            className={` flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium
              text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20
              transition-all duration-200 ${isExpanded ? ' justify-start' : ' justify-center'}`}
          >
            <div className="min-w-6">
              <LogOut size={20} />
            </div>
            <span className={`transition-opacity duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
              Log out
            </span>
          </button>

          {/* User Profile */}
          <Link
            to="/profile"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg
              hover:bg-gray-50 dark:hover:bg-gray-800/50
              transition-all duration-200 ${isExpanded ? ' justify-start' : ' justify-center'}`}
          >
            <div className={`min-w-8 h-8 rounded-full flex items-center justify-center
              ${role === 'Admin' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                : 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300'
              }`}>
              <User size={20}/>
            </div>
            <div className={`flex flex-col transition-opacity duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
              <span className="text-sm font-medium">Adam Taylor</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{role}</span>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
}
