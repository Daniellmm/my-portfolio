import { motion } from 'framer-motion';
import { Plus, FolderOpen, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import DashboardLayout from './components/dashboard/DashboardLayout';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Projects',
      value: '12',
      icon: FolderOpen,
      change: '+2 this month',
      color: 'text-blue-600'
    },
    {
      title: 'Featured Projects',
      value: '4',
      icon: Star,
      change: '+1 this week',
      color: 'text-yellow-600'
    },
    {
      title: 'Views',
      value: '1,234',
      icon: TrendingUp,
      change: '+15% this month',
      color: 'text-green-600'
    }
  ];

  const recentProjects = [
    { id: 1, title: 'E-commerce Platform', status: 'Published', date: '2024-01-15' },
    { id: 2, title: 'Weather App', status: 'Draft', date: '2024-01-12' },
    { id: 3, title: 'Task Manager', status: 'Published', date: '2024-01-10' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your portfolio.</p>
          </div>
          <Button asChild className="gradient-primary" size="lg">
            <Link to="/dashboard/add-project">
              <Plus size={20} className="mr-2" />
              Add Project
            </Link>
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="dashboard-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-foreground mt-1">
                          {stat.value}
                        </p>
                        <p className="text-xs text-accent mt-1">
                          {stat.change}
                        </p>
                      </div>
                      <div className={`p-3 rounded-full bg-primary-light ${stat.color}`}>
                        <Icon size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Recent Projects */}
        <motion.div variants={itemVariants}>
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Projects</CardTitle>
              <Button variant="outline" asChild>
                <Link to="/dashboard/projects">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-medium transition-all duration-200"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div>
                      <h3 className="font-medium text-foreground">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{project.date}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'Published'
                            ? 'bg-accent-light text-accent'
                            : 'bg-warning-light text-warning'
                          }`}
                      >
                        {project.status}
                      </span>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link to="/dashboard/add-project">
                    <Plus size={24} className="mb-2" />
                    Add Project
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link to="/dashboard/projects">
                    <FolderOpen size={24} className="mb-2" />
                    Manage Projects
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Star size={24} className="mb-2" />
                  View Portfolio
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <TrendingUp size={24} className="mb-2" />
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;