import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Code, Globe, Palette, Zap, Brain, Target } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 bg-black/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-green-400 mb-6">
            ABOUT THE <span className="text-white">ARCHITECT</span>
          </h2>
          <p className="text-xl text-green-300 max-w-3xl mx-auto font-rajdhani">
            Bridging the gap between imagination and digital reality through code, creativity, and innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-audiowide text-green-400 mb-4">MY DIGITAL JOURNEY</h3>
            <p className="text-green-200 leading-relaxed font-exo">
              From the vibrant landscapes of Zimbabwe to the digital frontiers of technology, 
              my journey has been one of constant evolution and learning. With a foundation 
              in hospitality and marketing, I've discovered the power of combining human 
              connection with technological innovation.
            </p>
            <p className="text-green-200 leading-relaxed font-exo">
              Today, I specialize in creating immersive digital experiences that don't just 
              function – they inspire, engage, and transform the way people interact with technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-audiowide text-green-400 mb-4">CORE TECHNOLOGIES</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Python', 'JavaScript', 'TypeScript', 'React',
                'Node.js', 'MySQL', 'AI/ML', 'Cloud Computing'
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="liquid-glass-tech p-3 text-center rounded-lg border border-green-400/30 backdrop-blur-sm bg-green-400/10 hover:bg-green-400/20 transition-all duration-300"
                >
                  <span className="font-space text-green-300">{tech}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-audiowide text-green-400 mb-8 text-center">PHILOSOPHY</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation Through Code",
                description: "Every line of code is an opportunity to create something extraordinary that pushes the boundaries of what's possible.",
                icon: "🚀"
              },
              {
                title: "Human-Centric Design",
                description: "Technology should enhance human experience, not complicate it. I focus on intuitive, accessible solutions.",
                icon: "💡"
              },
              {
                title: "Continuous Evolution",
                description: "In the rapidly changing tech landscape, adaptation and learning are not just advantages—they're necessities.",
                icon: "🔄"
              }
            ].map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="liquid-glass-card p-6 rounded-lg border border-green-400/30 backdrop-blur-sm bg-gradient-to-br from-green-400/10 to-green-600/5 hover:from-green-400/20 hover:to-green-600/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-center">{principle.icon}</div>
                <h4 className="text-xl font-rajdhani font-semibold text-green-400 mb-3 text-center">
                  {principle.title}
                </h4>
                <p className="text-green-200 text-center font-exo">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Available Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-audiowide text-green-400 mb-8 text-center">AVAILABLE PROJECTS</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Web Applications",
                description: "Full-stack solutions",
                icon: "🌐",
                features: ["React/Vue", "Node.js", "Databases"]
              },
              {
                title: "Mobile Apps",
                description: "Cross-platform mobile",
                icon: "📱",
                features: ["React Native", "Flutter", "Native"]
              },
              {
                title: "AI Integration",
                description: "Machine learning solutions",
                icon: "🤖",
                features: ["TensorFlow", "PyTorch", "APIs"]
              },
              {
                title: "E-commerce",
                description: "Online store solutions",
                icon: "🛒",
                features: ["Payment Gateways", "Inventory", "Analytics"]
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="liquid-glass-project p-6 rounded-lg border border-green-400/30 backdrop-blur-sm bg-gradient-to-br from-green-400/10 to-green-600/5 hover:from-green-400/20 hover:to-green-600/10 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3 text-center group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </div>
                <h4 className="text-lg font-rajdhani font-semibold text-green-400 mb-2 text-center">
                  {project.title}
                </h4>
                <p className="text-green-300 text-sm text-center mb-3 font-exo">
                  {project.description}
                </p>
                <ul className="space-y-1">
                  {project.features.map((feature, i) => (
                    <li key={i} className="text-green-200 text-xs text-center font-space">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .liquid-glass-tech {
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }
        
        .liquid-glass-tech:hover {
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 16px rgba(0, 255, 65, 0.2);
        }
        
        .liquid-glass-card {
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .liquid-glass-card:hover {
          backdrop-filter: blur(15px);
          box-shadow: 0 8px 32px rgba(0, 255, 65, 0.2);
        }
        
        .liquid-glass-project {
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .liquid-glass-project:hover {
          backdrop-filter: blur(15px);
          box-shadow: 0 8px 32px rgba(0, 255, 65, 0.3);
        }
      `}</style>
    </section>
  );
};
