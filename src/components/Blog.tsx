
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";

export const Blog = () => {
  const blogPosts = [
    {
      title: "The Rise of AI-Powered Development: Transforming Code Creation",
      excerpt: "Exploring how artificial intelligence is revolutionizing software development, from automated code generation to intelligent debugging and optimization techniques.",
      date: "2024-12-15",
      readTime: "8 min read",
      category: "AI & Technology",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
      author: "Evans Ncube"
    },
    {
      title: "Full-Stack Development in 2025: Beyond Traditional Boundaries",
      excerpt: "A comprehensive guide to modern full-stack development, covering emerging technologies, microservices architecture, and the evolution of web applications.",
      date: "2024-12-10",
      readTime: "12 min read",
      category: "Development",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
      author: "Evans Ncube"
    },
    {
      title: "Prompt Engineering: The Art of Communicating with AI",
      excerpt: "Master the techniques of prompt engineering to unlock the full potential of AI language models. Learn strategies for creating effective prompts that generate accurate results.",
      date: "2024-12-05",
      readTime: "10 min read",
      category: "AI Engineering",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop",
      author: "Evans Ncube"
    },
    {
      title: "Building Scalable APIs: Microservices vs Monoliths",
      excerpt: "An in-depth analysis of architectural patterns, exploring when to choose microservices over monolithic designs and best practices for API development.",
      date: "2024-12-01",
      readTime: "15 min read",
      category: "Backend Architecture",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
      author: "Evans Ncube"
    },
    {
      title: "The Future of Web Development: WebAssembly and Beyond",
      excerpt: "Discover emerging technologies that are reshaping web development, including WebAssembly, Web Components, and the next generation of browser capabilities.",
      date: "2024-11-28",
      readTime: "9 min read",
      category: "Web Technology",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop",
      author: "Evans Ncube"
    },
    {
      title: "DevOps Automation: CI/CD Pipelines for Modern Applications",
      excerpt: "Learn how to implement robust CI/CD pipelines, automate deployment processes, and maintain high-quality code delivery in fast-paced development environments.",
      date: "2024-11-25",
      readTime: "11 min read",
      category: "DevOps",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
      author: "Evans Ncube"
    }
  ];

  return (
    <section id="blog" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-mono">
            TECH INSIGHTS
          </h2>
          <p className="text-lg text-green-300 max-w-3xl mx-auto font-mono">
            Exploring the cutting edge of technology, AI, and software development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group overflow-hidden bg-black/60 backdrop-blur-lg border-green-400/20 hover:bg-black/80 hover:border-green-400/50 transition-all duration-500 h-full cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-500/80 text-black font-mono">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-green-400 mb-3 font-mono">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-green-300 group-hover:text-green-400 transition-colors font-mono">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 text-sm font-mono">By {post.author}</span>
                    <div className="flex items-center text-green-400 group-hover:text-green-300 transition-colors">
                      <span className="text-sm font-semibold font-mono">READ MORE</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
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
