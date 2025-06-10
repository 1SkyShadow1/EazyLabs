
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export const Portfolio = () => {
  const projects = [
    {
      title: "AI-Powered E-commerce Platform",
      description: "Full-stack e-commerce solution with machine learning recommendation engine, real-time inventory management, and advanced analytics dashboard",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      tech: ["React", "Node.js", "Python", "TensorFlow", "MongoDB", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Full-Stack + AI",
      price: "25000"
    },
    {
      title: "Neural Network Content Generator",
      description: "Advanced AI system for automated content creation using GPT models with custom prompt engineering and fine-tuning capabilities",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      tech: ["Python", "OpenAI API", "FastAPI", "React", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      category: "AI Engineering",
      price: "18000"
    },
    {
      title: "Real-time Collaboration Platform",
      description: "Enterprise-grade collaboration tool with live editing, video conferencing, project management, and AI-powered insights",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      tech: ["React", "Socket.io", "WebRTC", "Node.js", "Docker", "Kubernetes"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Full-Stack",
      price: "32000"
    },
    {
      title: "Blockchain DeFi Application",
      description: "Decentralized finance platform with smart contracts, yield farming, and automated market making protocols",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
      tech: ["Solidity", "Web3.js", "React", "Hardhat", "IPFS"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Blockchain",
      price: "45000"
    },
    {
      title: "AI-Driven Analytics Dashboard",
      description: "Business intelligence platform with machine learning insights, predictive analytics, and automated reporting systems",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tech: ["Python", "Pandas", "Scikit-learn", "D3.js", "Flask", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Data Science",
      price: "28000"
    },
    {
      title: "Microservices Architecture",
      description: "Scalable microservices ecosystem with API gateway, service mesh, monitoring, and automated deployment pipelines",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      tech: ["Docker", "Kubernetes", "Go", "gRPC", "Prometheus", "Grafana"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Backend Architecture",
      price: "35000"
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
            PROJECT MATRIX
          </h2>
          <p className="text-lg text-green-300 max-w-3xl mx-auto font-mono">
            Advanced solutions in AI, full-stack development, and emerging technologies
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
                    <span className="px-2 py-1 bg-blue-500/80 text-white text-sm font-mono" data-price={project.price}>
                      R{project.price}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-green-300 group-hover:text-green-400 transition-colors font-mono">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded border border-green-400/30 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-black font-mono"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      DEMO
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-mono"
                    >
                      <Github className="w-4 h-4" />
                    </Button>
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
