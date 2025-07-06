
import ContactForm from "./contact/ContactForm";
import ContactInfo from "./contact/ContactInfo";
import QuickActions from "./contact/QuickActions";

const Contact = () => {
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
            <ContactForm />
          </div>

          {/* Contact Information & Quick Actions */}
          <div className="space-y-6">
            <ContactInfo />
            <QuickActions />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
