import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export const Portfolio = () => {
  const projects = [
    {
      title: "AI-Powered E-commerce Platform",
      description: "Full-stack e-commerce solution with machine learning recommendation engine, real-time inventory management, and advanced analytics dashboard",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      tech: ["React", "Node.js", "Python", "TensorFlow", "MongoDB", "Redis"],
      category: "Full-Stack + AI",
      price: "25000"
    },
    {
      title: "Neural Network Content Generator",
      description: "Advanced AI system for automated content creation using GPT models with custom prompt engineering and fine-tuning capabilities",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      tech: ["Python", "OpenAI API", "FastAPI", "React", "PostgreSQL"],
      category: "AI Engineering",
      price: "18000"
    },
    {
      title: "Real-time Collaboration Platform",
      description: "Enterprise-grade collaboration tool with live editing, video conferencing, project management, and AI-powered insights",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      tech: ["React", "Socket.io", "WebRTC", "Node.js", "Docker", "Kubernetes"],
      category: "Full-Stack",
      price: "32000"
    },
    {
      title: "Smart Tourism Experience Platform",
      description: "AI-driven tourism platform showcasing South Africa's hidden gems, with AR-guided tours, local experiences, and real-time translation for international visitors",
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&h=400&fit=crop",
      tech: ["React Native", "AR Kit", "Node.js", "MongoDB", "Google Maps API", "TensorFlow"],
      category: "Mobile + AI",
      price: "45000"
    },
    {
      title: "Renewable Energy Management System",
      description: "Smart grid solution for optimizing renewable energy distribution, with real-time monitoring, predictive maintenance, and blockchain-based energy trading",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
      tech: ["Python", "IoT", "Blockchain", "React", "TensorFlow", "PostgreSQL"],
      category: "IoT + AI",
      price: "55000"
    },
    {
      title: "Digital Healthcare Platform",
      description: "Comprehensive healthcare solution with telemedicine, AI diagnostics, patient management, and integration with South African healthcare systems",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
      tech: ["React", "Node.js", "Python", "TensorFlow", "HIPAA", "MongoDB"],
      category: "Healthcare + AI",
      price: "48000"
    },
    {
      title: "Smart Agriculture System",
      description: "IoT-based agricultural solution for precision farming, crop monitoring, automated irrigation, and market price predictions for African farmers",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop",
      tech: ["IoT", "Python", "React", "TensorFlow", "PostgreSQL", "AWS"],
      category: "IoT + AI",
      price: "42000"
    },
    {
      title: "Financial Inclusion Platform",
      description: "Mobile-first banking solution for underserved communities, featuring microloans, savings plans, and AI-powered financial education",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      tech: ["React Native", "Node.js", "Python", "TensorFlow", "MongoDB", "Blockchain"],
      category: "FinTech",
      price: "38000"
    },
    {
      title: "Smart City Infrastructure",
      description: "Urban management system for traffic optimization, waste management, and public service delivery using IoT and AI",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop",
      tech: ["IoT", "Python", "React", "TensorFlow", "PostgreSQL", "AWS"],
      category: "Smart City",
      price: "65000"
    }
  ];

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-mono">
            UPCOMING PROJECTS
          </h2>
          <p className="text-lg text-green-300 max-w-3xl mx-auto font-mono">
            Innovative solutions for South Africa and beyond, combining cutting-edge technology with local expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group overflow-hidden bg-black/60 backdrop-blur-lg border-green-400/20 hover:bg-black/80 hover:border-green-400/50 transition-all duration-500 h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-green-500/80 text-black text-xs rounded-full font-mono">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-blue-500/80 text-white text-sm font-mono">
                      R{project.price}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-2 font-mono">{project.title}</h3>
                  <p className="text-green-300 mb-4 font-mono">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-green-400/10 text-green-400 text-xs rounded font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
