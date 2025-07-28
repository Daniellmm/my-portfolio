import { motion } from 'framer-motion';
import { LayoutGrid, Plus, FolderOpen, LogOut, Menu, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = ({ onCollapse }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapse?.(newCollapsed);
  };

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: LayoutGrid 
    },
    { 
      name: 'Add Project', 
      path: '/dashboard/add-project', 
      icon: Plus 
    },
    { 
      name: 'Manage Projects', 
      path: '/dashboard/projects', 
      icon: FolderOpen 
    }
  ];

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const contentVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 }
  };

  return (
    <motion.div
      className="sidebar-nav h-screen fixed left-0 top-0 z-50 border-r border-sidebar-hover"
      variants={sidebarVariants}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Header */}
      <div className="p-6 border-b border-sidebar-hover">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              variants={contentVariants}
              animate={isCollapsed ? 'collapsed' : 'expanded'}
              transition={{ delay: isCollapsed ? 0 : 0.1 }}
            >
              <h2 className="text-xl font-bold text-white">Portfolio Admin</h2>
            </motion.div>
          )}
          <button
            onClick={handleToggle}
            className="p-2 rounded-lg hover:bg-sidebar-hover transition-colors"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <motion.span
                      className="ml-3"
                      variants={contentVariants}
                      animate={isCollapsed ? 'collapsed' : 'expanded'}
                      transition={{ delay: isCollapsed ? 0 : 0.1 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </NavLink>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-4 left-4 right-4">
        <motion.button
          className="sidebar-nav-item w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!isCollapsed && (
            <motion.span
              className="ml-3"
              variants={contentVariants}
              animate={isCollapsed ? 'collapsed' : 'expanded'}
              transition={{ delay: isCollapsed ? 0 : 0.1 }}
            >
              Logout
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;