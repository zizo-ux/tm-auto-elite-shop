
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      value: "+27 72 542 2814",
      description: "Mon-Fri 8AM-8PM SAST"
    },
    {
      icon: Mail,
      title: "Email Support",
      value: "tmautoexpress@gmail.com",
      description: "24/7 Email Support"
    },
    {
      icon: MapPin,
      title: "Our Location",
      value: "43 Ametis crescent",
      description: "Mpumalanga Middleburg"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "< 24 hours",
      description: "Quick response guarantee"
    }
  ];

  return (
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
    </div>
  );
};

export default ContactInfo;
