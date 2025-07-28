import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, Github, ExternalLink, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';

const ManageProjects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      slug: 'ecommerce-platform',
      description: 'A modern e-commerce platform built with React and Node.js',
      category: 'Fullstack',
      status: 'Published',
      featured: true,
      tags: ['React', 'Node.js', 'MongoDB'],
      image: '/api/placeholder/300/200',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      slug: 'weather-dashboard',
      description: 'Real-time weather tracking application',
      category: 'Frontend',
      status: 'Draft',
      featured: false,
      tags: ['React', 'API', 'Charts'],
      image: '/api/placeholder/300/200',
      createdAt: '2024-01-12'
    },
    {
      id: 3,
      title: 'Task Management App',
      slug: 'task-management',
      description: 'Collaborative task management tool for teams',
      category: 'Fullstack',
      status: 'Published',
      featured: true,
      tags: ['Vue.js', 'Express', 'Socket.io'],
      image: '/api/placeholder/300/200',
      createdAt: '2024-01-10'
    }
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Manage Projects</h1>
          <p className="text-muted-foreground">View, edit, and organize your portfolio projects</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants}>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Projects Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="dashboard-card overflow-hidden">
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary-light to-accent-light">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🎨</div>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge
                    variant={project.status === 'Published' ? 'default' : 'secondary'}
                    className={project.status === 'Published' ? 'bg-accent text-accent-foreground' : ''}
                  >
                    {project.status}
                  </Badge>
                </div>
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-warning text-warning-foreground border-warning">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{project.category}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" className="p-2">
                      <Github size={16} />
                    </Button>
                    <Button size="sm" variant="ghost" className="p-2">
                      <ExternalLink size={16} />
                    </Button>
                    <Button size="sm" variant="ghost" className="p-2">
                      <Eye size={16} />
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State or Load More */}
      {projects.length === 0 && (
        <motion.div variants={itemVariants}>
          <Card className="dashboard-card">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-lg font-medium mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by creating your first project
              </p>
              <Button className="gradient-primary">
                Create Project
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ManageProjects;