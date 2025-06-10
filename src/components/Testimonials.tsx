
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MessageSquare, Code, Zap } from "lucide-react";

export const Testimonials = () => {
  const achievements = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full-Stack Expertise",
      description: "Proficient in modern web technologies, from React frontends to Python backends",
      highlight: "End-to-end Solutions"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Integration Specialist",
      description: "Expert in implementing AI solutions and optimizing prompts for maximum efficiency",
      highlight: "AI-Powered Applications"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Focused",
      description: "Delivering high-performance applications with scalable architecture and clean code",
      highlight: "Optimized Solutions"
    }
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Expertise & Achievements
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Proven track record in delivering innovative solutions across various technologies and industries.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 relative z-10">
                <div className="text-blue-400 mb-4">
                  {achievement.icon}
                </div>
                
                <div className="mb-4">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                    {achievement.highlight}
                  </span>
                </div>
                
                <h4 className="font-semibold text-white mb-3">{achievement.title}</h4>
                <p className="text-gray-300">
                  {achievement.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
