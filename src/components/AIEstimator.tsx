import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bot, Calculator, Download, Send, Clock, Star, Zap, Shield } from "lucide-react";
import { toast } from "sonner";

export const AIEstimator = () => {
  const [step, setStep] = useState(1);
  const [estimate, setEstimate] = useState(0);
  const [projectData, setProjectData] = useState({
    type: "",
    features: [] as string[],
    complexity: "",
    timeline: "",
    design: "",
    integrations: [] as string[],
    maintenance: "",
    hosting: "",
    description: "",
    budget: "",
    contact: { name: "", email: "", company: "", phone: "" }
  });

  const projectTypes = [
    { value: "landing", label: "Landing Page", basePrice: 2500, description: "Single page with compelling design" },
    { value: "portfolio", label: "Portfolio Website", basePrice: 5000, description: "Showcase your work professionally" },
    { value: "business", label: "Business Website", basePrice: 8500, description: "Multi-page corporate presence" },
    { value: "blog", label: "Blog Platform", basePrice: 12000, description: "Content management system" },
    { value: "ecommerce", label: "E-commerce Store", basePrice: 20000, description: "Full online store with payments" },
    { value: "webapp", label: "Web Application", basePrice: 35000, description: "Custom business application" },
    { value: "mobileapp", label: "Mobile Application", basePrice: 50000, description: "Native or hybrid mobile app" },
    { value: "saas", label: "SaaS Platform", basePrice: 85000, description: "Software as a service solution" },
    { value: "marketplace", label: "Marketplace", basePrice: 120000, description: "Multi-vendor platform" },
    { value: "custom", label: "Custom Solution", basePrice: 15000, description: "Tailored to your specific needs" }
  ];

  const features = [
    { value: "auth", label: "User Authentication", price: 3500, icon: <Shield className="w-4 h-4" /> },
    { value: "payments", label: "Payment Integration", price: 5000, icon: <Calculator className="w-4 h-4" /> },
    { value: "cms", label: "Content Management", price: 7000, icon: <Bot className="w-4 h-4" /> },
    { value: "api", label: "Custom API", price: 8500, icon: <Zap className="w-4 h-4" /> },
    { value: "realtime", label: "Real-time Features", price: 10000, icon: <Clock className="w-4 h-4" /> },
    { value: "ai", label: "AI Integration", price: 13500, icon: <Star className="w-4 h-4" /> },
    { value: "analytics", label: "Analytics Dashboard", price: 5000, icon: <Bot className="w-4 h-4" /> },
    { value: "mobile", label: "Mobile Responsive", price: 1500, icon: <Zap className="w-4 h-4" /> },
    { value: "seo", label: "SEO Optimization", price: 2500, icon: <Star className="w-4 h-4" /> },
    { value: "social", label: "Social Media Integration", price: 2000, icon: <Shield className="w-4 h-4" /> },
    { value: "chat", label: "Live Chat Support", price: 4000, icon: <Clock className="w-4 h-4" /> },
    { value: "multilang", label: "Multi-language Support", price: 6000, icon: <Bot className="w-4 h-4" /> }
  ];

  const complexityMultipliers = {
    basic: { multiplier: 1, label: "Basic - Simple functionality", description: "Standard features, minimal customization" },
    intermediate: { multiplier: 1.5, label: "Intermediate - Moderate features", description: "Custom features, integrations" },
    advanced: { multiplier: 2.2, label: "Advanced - Complex integrations", description: "Advanced features, complex logic" },
    enterprise: { multiplier: 3, label: "Enterprise - Full-scale solution", description: "High scalability, security, performance" }
  };

  const timelines = [
    { value: "rush", label: "Rush (1-2 weeks)", multiplier: 1.5, description: "Expedited delivery" },
    { value: "standard", label: "Standard (3-6 weeks)", multiplier: 1, description: "Optimal timeline" },
    { value: "extended", label: "Extended (2-3 months)", multiplier: 0.9, description: "More planning time" },
    { value: "flexible", label: "Flexible (3+ months)", multiplier: 0.8, description: "No rush, best quality" }
  ];

  const designLevels = [
    { value: "template", label: "Template-based", price: 0, description: "Pre-made designs" },
    { value: "custom", label: "Custom Design", price: 5000, description: "Unique visual identity" },
    { value: "premium", label: "Premium Design", price: 10000, description: "Advanced animations, interactions" },
    { value: "luxury", label: "Luxury Design", price: 20000, description: "Award-winning level design" }
  ];

  const integrations = [
    { value: "stripe", label: "Stripe Payments", price: 1500 },
    { value: "paypal", label: "PayPal Integration", price: 1200 },
    { value: "mailchimp", label: "MailChimp", price: 1000 },
    { value: "google", label: "Google Services", price: 2000 },
    { value: "social", label: "Social Media APIs", price: 1800 },
    { value: "crm", label: "CRM Integration", price: 3500 },
    { value: "analytics", label: "Advanced Analytics", price: 2500 },
    { value: "erp", label: "ERP Integration", price: 5000 }
  ];

  const calculateEstimate = () => {
    const baseType = projectTypes.find(t => t.value === projectData.type);
    if (!baseType) return 0;

    let total = baseType.basePrice;
    
    // Add feature costs
    projectData.features.forEach(feature => {
      const featureData = features.find(f => f.value === feature);
      if (featureData) total += featureData.price;
    });

    // Add design cost
    const designData = designLevels.find(d => d.value === projectData.design);
    if (designData) total += designData.price;

    // Add integration costs
    projectData.integrations.forEach(integration => {
      const integrationData = integrations.find(i => i.value === integration);
      if (integrationData) total += integrationData.price;
    });

    // Apply complexity multiplier
    const complexity = complexityMultipliers[projectData.complexity as keyof typeof complexityMultipliers];
    if (complexity) total *= complexity.multiplier;

    // Apply timeline multiplier
    const timeline = timelines.find(t => t.value === projectData.timeline);
    if (timeline) total *= timeline.multiplier;

    return Math.round(total);
  };

  const handleNext = () => {
    if (step < 8) {
      setStep(step + 1);
      if (step === 7) {
        const newEstimate = calculateEstimate();
        setEstimate(newEstimate);
      }
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setProjectData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleIntegrationToggle = (integration: string) => {
    setProjectData(prev => ({
      ...prev,
      integrations: prev.integrations.includes(integration)
        ? prev.integrations.filter(i => i !== integration)
        : [...prev.integrations, integration]
    }));
  };

  const handleSubmit = async () => {
    try {
      // Create project brief
      const briefData = {
        ...projectData,
        estimate,
        timestamp: new Date().toISOString(),
        currency: 'ZAR'
      };
      
      console.log('Project brief submitted:', briefData);
      
      // In a real app, you would send this to your backend
      // await fetch('/api/submit-brief', { method: 'POST', body: JSON.stringify(briefData) });
      
      toast.success("Project brief submitted successfully! I'll contact you within 24 hours.");
    } catch (error) {
      console.error('Submit error:', error);
      toast.error("Failed to submit brief. Please try again.");
    }
  };

  const handleDownloadPDF = () => {
    const pdfContent = `
EazyLabs Project Estimate

Project Type: ${projectTypes.find(t => t.value === projectData.type)?.label}
Features: ${projectData.features.map(f => features.find(feat => feat.value === f)?.label).join(', ')}
Complexity: ${complexityMultipliers[projectData.complexity as keyof typeof complexityMultipliers]?.label}
Timeline: ${timelines.find(t => t.value === projectData.timeline)?.label}
Design Level: ${designLevels.find(d => d.value === projectData.design)?.label}
Integrations: ${projectData.integrations.map(i => integrations.find(int => int.value === i)?.label).join(', ')}

Estimated Cost: R${estimate.toLocaleString()}

Description: ${projectData.description}

Contact Information:
Name: ${projectData.contact.name}
Email: ${projectData.contact.email}
Company: ${projectData.contact.company}
Phone: ${projectData.contact.phone}

Generated: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eazylabs-project-estimate-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success("Project estimate downloaded!");
  };

  return (
    <section id="estimator" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent font-mono">
            AI PROJECT ESTIMATOR
          </h2>
          <p className="text-lg text-green-300 max-w-3xl mx-auto font-mono">
            Get an instant estimate for your project with our AI-powered planning tool.
            Answer a few questions and receive a detailed project brief and cost breakdown.
          </p>
        </motion.div>

        <Card className="p-8 bg-black/80 backdrop-blur-lg border-green-400/30 shadow-2xl shadow-green-400/10">
          <div className="flex items-center gap-3 mb-8">
            <Bot className="w-8 h-8 text-green-400" />
            <h3 className="text-2xl font-bold text-green-400 font-mono">PROJECT PLANNING ASSISTANT</h3>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-green-300 mb-2 font-mono">
              <span>STEP {step} OF 8</span>
              <span>{Math.round((step / 8) * 100)}% COMPLETE</span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-2 border border-green-400/30">
              <motion.div
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300 shadow-lg shadow-green-400/50"
                style={{ width: `${(step / 8) * 100}%` }}
                animate={{ width: `${(step / 8) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Project Type */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-semibold text-green-400 mb-4 font-mono">WHAT TYPE OF PROJECT DO YOU NEED?</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {projectTypes.map((type) => (
                  <motion.button
                    key={type.value}
                    onClick={() => setProjectData(prev => ({ ...prev, type: type.value }))}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-left font-mono ${
                      projectData.type === type.value
                        ? "border-green-400 bg-green-400/10 shadow-lg shadow-green-400/20"
                        : "border-green-400/30 hover:border-green-400/50 bg-black/40"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold text-green-400">{type.label}</div>
                    <div className="text-sm text-green-300 mb-1">{type.description}</div>
                    <div className="text-sm text-green-300">Starting from R{type.basePrice.toLocaleString()}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Features */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-semibold text-green-400 mb-4 font-mono">WHICH FEATURES DO YOU NEED?</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <motion.button
                    key={feature.value}
                    onClick={() => handleFeatureToggle(feature.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-left font-mono ${
                      projectData.features.includes(feature.value)
                        ? "border-green-400 bg-green-400/10 shadow-lg shadow-green-400/20"
                        : "border-green-400/30 hover:border-green-400/50 bg-black/40"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {feature.icon}
                      <span className="font-semibold text-green-400">{feature.label}</span>
                    </div>
                    <div className="text-sm text-green-300">+R{feature.price.toLocaleString()}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Complexity */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-semibold text-green-400 mb-4 font-mono">WHAT'S THE COMPLEXITY LEVEL?</h4>
              <div className="space-y-4">
                {Object.entries(complexityMultipliers).map(([key, complexity]) => (
                  <motion.button
                    key={key}
                    onClick={() => setProjectData(prev => ({ ...prev, complexity: key }))}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left font-mono ${
                      projectData.complexity === key
                        ? "border-green-400 bg-green-400/10 shadow-lg shadow-green-400/20"
                        : "border-green-400/30 hover:border-green-400/50 bg-black/40"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold text-green-400">{complexity.label}</div>
                    <div className="text-sm text-green-300">{complexity.description}</div>
                    <div className="text-sm text-green-300">Multiplier: {complexity.multiplier}x</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Timeline */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-semibold text-green-400 mb-4 font-mono">WHAT'S YOUR PREFERRED TIMELINE?</h4>
              <div className="space-y-4">
                {timelines.map((timeline) => (
                  <motion.button
                    key={timeline.value}
                    onClick={() => setProjectData(prev => ({ ...prev, timeline: timeline.value }))}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left font-mono ${
                      projectData.timeline === timeline.value
                        ? "border-green-400 bg-green-400/10 shadow-lg shadow-green-400/20"
                        : "border-green-400/30 hover:border-green-400/50 bg-black/40"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold text-green-400">{timeline.label}</div>
                    <div className="text-sm text-green-300">{timeline.description}</div>
                    <div className="text-sm text-green-300">Price adjustment: {timeline.multiplier > 1 ? '+' : ''}{((timeline.multiplier - 1) * 100).toFixed(0)}%</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 5: Design Level */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-semibold text-green-400 mb-4 font-mono">CHOOSE YOUR DESIGN LEVEL</h4>
              <div className="space-y-4">
                {designLevels.map((design) => (
                  <motion.button
                    key={design.value}
                    onClick={() => setProjectData(prev => ({ ...prev, design: design.value }))}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left font-mono ${
                      projectData.design === design.value
                        ? "border-green-400 bg-green-400/10 shadow-lg shadow-green-400/20"
                        : "border-green-400/30 hover:border-green-400/50 bg-black/40"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold text-green-400">{design.label}</div>
                    <div className="text-sm text-green-300 mb-1">{design.description}</div>
                    <div className="text-sm text-green-300">
                      {design.price === 0 ? 'Included' : `+R${design.price.toLocaleString()}`}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 6: Integrations */}
          {step === 6 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-semibold text-green-400 mb-4 font-mono">THIRD-PARTY INTEGRATIONS NEEDED?</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <motion.button
                    key={integration.value}
                    onClick={() => handleIntegrationToggle(integration.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-left font-mono ${
                      projectData.integrations.includes(integration.value)
                        ? "border-green-400 bg-green-400/10 shadow-lg shadow-green-400/20"
                        : "border-green-400/30 hover:border-green-400/50 bg-black/40"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold text-green-400">{integration.label}</div>
                    <div className="text-sm text-green-300">+R{integration.price.toLocaleString()}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 7: Project Description */}
          {step === 7 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-semibold text-green-400 mb-4 font-mono">TELL ME MORE ABOUT YOUR PROJECT</h4>
              <div className="space-y-4">
                <Textarea
                  placeholder="Describe your project goals, target audience, and any specific requirements..."
                  value={projectData.description}
                  onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-black/60 border-green-400/30 text-green-300 min-h-32 font-mono placeholder:text-green-300/50 focus:border-green-400 transition-all duration-300"
                />
                <Input
                  placeholder="Your budget range (optional)"
                  value={projectData.budget}
                  onChange={(e) => setProjectData(prev => ({ ...prev, budget: e.target.value }))}
                  className="bg-black/60 border-green-400/30 text-green-300 font-mono placeholder:text-green-300/50 focus:border-green-400 transition-all duration-300"
                />
              </div>
            </motion.div>
          )}

          {/* Step 8: Estimate & Contact */}
          {step === 8 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h4 className="text-2xl font-bold text-green-400 mb-4 font-mono">YOUR PROJECT ESTIMATE</h4>
                <motion.div 
                  className="text-5xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-4 font-mono"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  R{estimate.toLocaleString()}
                </motion.div>
                <p className="text-green-300 font-mono">This is an estimated range. Final pricing will be determined after detailed consultation.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name *"
                  value={projectData.contact.name}
                  onChange={(e) => setProjectData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, name: e.target.value }
                  }))}
                  className="bg-black/60 border-green-400/30 text-green-300 font-mono placeholder:text-green-300/50 focus:border-green-400 transition-all duration-300"
                />
                <Input
                  placeholder="Email *"
                  type="email"
                  value={projectData.contact.email}
                  onChange={(e) => setProjectData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, email: e.target.value }
                  }))}
                  className="bg-black/60 border-green-400/30 text-green-300 font-mono placeholder:text-green-300/50 focus:border-green-400 transition-all duration-300"
                />
                <Input
                  placeholder="Company (Optional)"
                  value={projectData.contact.company}
                  onChange={(e) => setProjectData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, company: e.target.value }
                  }))}
                  className="bg-black/60 border-green-400/30 text-green-300 font-mono placeholder:text-green-300/50 focus:border-green-400 transition-all duration-300"
                />
                <Input
                  placeholder="Phone Number"
                  value={projectData.contact.phone}
                  onChange={(e) => setProjectData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, phone: e.target.value }
                  }))}
                  className="bg-black/60 border-green-400/30 text-green-300 font-mono placeholder:text-green-300/50 focus:border-green-400 transition-all duration-300"
                />
              </div>

              <div className="flex gap-4">
                <motion.div 
                  className="flex-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleSubmit}
                    disabled={!projectData.contact.name || !projectData.contact.email}
                    className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-black font-mono font-bold shadow-lg shadow-green-400/25 transform hover:scale-105 transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    SUBMIT PROJECT BRIEF
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleDownloadPDF}
                    variant="outline"
                    className="border-green-400 text-green-400 hover:bg-green-400/10 font-mono transform hover:scale-105 transition-all duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    DOWNLOAD PDF
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          {step < 8 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="border-green-400/50 text-green-400 hover:bg-green-400/10 font-mono transform hover:scale-105 transition-all duration-300"
              >
                PREVIOUS
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && !projectData.type) ||
                  (step === 3 && !projectData.complexity) ||
                  (step === 4 && !projectData.timeline) ||
                  (step === 5 && !projectData.design)
                }
                className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-black font-mono font-bold shadow-lg shadow-green-400/25 transform hover:scale-105 transition-all duration-300"
              >
                NEXT
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
