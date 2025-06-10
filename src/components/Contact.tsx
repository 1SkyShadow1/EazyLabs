import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Github, Linkedin, Send, MapPin } from "lucide-react";
import { toast } from "sonner";
import EazyLabsLogo from '../../public/EazyLabs logo.png';
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      toast.success("Message sent! I'll get back to you within 24 hours.");
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "Eazymoja5@gmail.com",
      href: "mailto:Eazymoja5@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+27 69 216 5481",
      href: "tel:+27692165481"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "South Africa",
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      href: "https://github.com/1SkyShadow1"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/evans-ncube-b3a4a322a"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      label: "WhatsApp",
      href: "https://wa.me/27692165481"
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent font-mono">
            LET'S BUILD SOMETHING AMAZING
          </h2>
          <p className="text-lg text-green-300 max-w-3xl mx-auto font-mono">
            Ready to bring your vision to life? Get in touch and let's discuss how we can
            create an exceptional digital experience together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-black/80 backdrop-blur-lg border-green-400/30 shadow-2xl shadow-green-400/10">
              <h3 className="text-2xl font-bold text-green-400 mb-6 font-mono">SEND A MESSAGE</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    required
                    className="bg-black/60 border-green-400/30 text-green-300 placeholder:text-green-300/50 font-mono focus:border-green-400 transition-all duration-300"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="bg-black/60 border-green-400/30 text-green-300 placeholder:text-green-300/50 font-mono focus:border-green-400 transition-all duration-300"
                  />
                </div>
                <Input
                  placeholder="Subject"
                  required
                  className="bg-black/60 border-green-400/30 text-green-300 placeholder:text-green-300/50 font-mono focus:border-green-400 transition-all duration-300"
                />
                <Textarea
                  placeholder="Tell me about your project..."
                  required
                  className="bg-black/60 border-green-400/30 text-green-300 placeholder:text-green-300/50 min-h-32 font-mono focus:border-green-400 transition-all duration-300"
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-black font-mono font-bold py-3 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-400/25"
                >
                  <Send className="w-4 h-4 mr-2" />
                  SEND MESSAGE
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="p-8 bg-black/80 backdrop-blur-lg border-green-400/30 shadow-2xl shadow-green-400/10">
              <h3 className="text-2xl font-bold text-green-400 mb-6 font-mono">GET IN TOUCH</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <motion.div 
                    key={info.label} 
                    className="flex items-center gap-4 group"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-green-400 group-hover:text-green-300 transition-colors duration-300">{info.icon}</div>
                    <div>
                      <p className="text-sm text-green-300/70 font-mono">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-green-300 hover:text-green-400 transition-colors duration-300 font-mono"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-green-300 font-mono">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-black/80 backdrop-blur-lg border-green-400/30 shadow-2xl shadow-green-400/10">
              <h3 className="text-xl font-bold text-green-400 mb-6 font-mono">CONNECT ON SOCIAL</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black/60 rounded-lg border border-green-400/30 hover:bg-green-400/10 hover:border-green-400 transition-all duration-300 group"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="text-green-300 group-hover:text-green-400 transition-colors duration-300">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-r from-green-400/10 to-green-600/10 backdrop-blur-lg border-green-400/30 shadow-2xl shadow-green-400/10">
              <h3 className="text-xl font-bold text-green-400 mb-4 font-mono">AVAILABLE FOR PROJECTS</h3>
              <p className="text-green-300 mb-4 font-mono">
                I'm currently accepting new projects and would love to hear about your ideas.
                Let's discuss how we can bring your vision to life with cutting-edge technology
                and creative solutions.
              </p>
              <p className="text-green-400 font-semibold font-mono">Response time: Within 24 hours</p>
            </Card>
          </motion.div>
        </div>
      </div>
      <footer className="w-full py-8 bg-black/80 border-t border-green-400/20 mt-12 flex flex-col items-center">
        <img
          src={EazyLabsLogo}
          alt="EazyLabs Logo Footer"
          className="h-14 w-14 object-contain mb-2 drop-shadow-[0_0_10px_rgba(0,255,65,0.7)]"
          style={{ filter: 'brightness(1.2) drop-shadow(0 0 10px #00ff41)' }}
        />
        <span className="text-green-400 font-orbitron text-lg mt-2">EAZYLABS</span>
        <span className="text-green-300 text-xs mt-1">&copy; {new Date().getFullYear()} EazyLabs. All rights reserved.</span>
      </footer>
    </section>
  );
};
