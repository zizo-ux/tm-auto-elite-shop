import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Truck,
  HeadphonesIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: ""
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      value: "+1-800-TM-AUTO",
      description: "Mon-Fri 8AM-8PM EST"
    },
    {
      icon: Mail,
      title: "Email Support",
      value: "support@tmautoexpress.com",
      description: "24/7 Email Support"
    },
    {
      icon: MapPin,
      title: "Nationwide Delivery",
      value: "We deliver everywhere",
      description: "Fast & reliable shipping"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "< 24 hours",
      description: "Quick response guarantee"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-automotive-dark mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-automotive-gray max-w-2xl mx-auto">
            Need help finding parts or have questions? Our expert team is here to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-automotive-blue" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-automotive-dark mb-2 block">
                        Full Name *
                      </label>
                      <Input
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-automotive-dark mb-2 block">
                        Email Address *
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-automotive-dark mb-2 block">
                        Phone Number
                      </label>
                      <Input
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-automotive-dark mb-2 block">
                        Inquiry Type
                      </label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="parts">Parts Inquiry</SelectItem>
                          <SelectItem value="warranty">Warranty Claim</SelectItem>
                          <SelectItem value="shipping">Shipping Question</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-automotive-dark mb-2 block">
                      Subject *
                    </label>
                    <Input
                      required
                      placeholder="What can we help you with?"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-automotive-dark mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      required
                      rows={5}
                      placeholder="Please provide details about your inquiry..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="automotive" 
                    size="lg" 
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card 
                key={index}
                className="hover:shadow-automotive transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-automotive-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-automotive-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-automotive-dark mb-1">
                        {info.title}
                      </h3>
                      <p className="font-medium text-automotive-blue mb-1">
                        {info.value}
                      </p>
                      <p className="text-sm text-automotive-gray">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Quick Actions */}
            <Card className="bg-automotive-blue text-white animate-fade-in" style={{ animationDelay: "400ms" }}>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Need Immediate Help?</h3>
                <div className="space-y-3">
                  <Button variant="hero" size="sm" className="w-full justify-start">
                    <HeadphonesIcon className="w-4 h-4 mr-2" />
                    Live Chat Support
                  </Button>
                  <Button variant="hero" size="sm" className="w-full justify-start">
                    <Truck className="w-4 h-4 mr-2" />
                    Track Your Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;