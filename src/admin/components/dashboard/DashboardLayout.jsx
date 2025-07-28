import { Outlet } from 'react-router-dom';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar onCollapse={setSidebarCollapsed} />
      
      {/* Main Content */}
      <motion.div 
        className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-80'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;