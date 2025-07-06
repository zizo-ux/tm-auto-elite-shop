
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DiagnoseForm from '@/components/DiagnoseForm';
import { CheckCircle, ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const DiagnoseOnline = () => {
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleSuccess = (requestId: string) => {
    setSubmittedRequestId(requestId);
    setShowForm(false);
  };

  const handleSubmitAnother = () => {
    setSubmittedRequestId(null);
    setShowForm(true);
  };

  if (!showForm && submittedRequestId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-automotive-cream via-white to-automotive-warm-gray/20">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-automotive-warm-gray/20 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-automotive-charcoal hover:text-automotive-orange transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-automotive-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TM</span>
              </div>
              <span className="font-semibold text-automotive-charcoal">TM Auto Express</span>
            </div>
          </div>
        </div>

        {/* Success Page */}
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto text-center shadow-automotive">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-automotive-green to-automotive-blue rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-automotive-charcoal mb-4">
                Request Submitted Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-automotive-cream/50 rounded-lg">
                <p className="text-lg text-automotive-charcoal mb-2">Your Reference Number:</p>
                <p className="text-2xl font-bold text-automotive-orange font-mono">
                  {submittedRequestId.split('_')[1]}
                </p>
              </div>
              
              <div className="space-y-4 text-left">
                <h3 className="text-lg font-semibold text-automotive-charcoal">What happens next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-automotive-blue/20 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-bold text-automotive-blue">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-automotive-charcoal">Review & Analysis</p>
                      <p className="text-sm text-automotive-warm-gray">Our expert technicians will review your vehicle information and problem description.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-automotive-orange/20 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-bold text-automotive-orange">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-automotive-charcoal">Expert Diagnosis</p>
                      <p className="text-sm text-automotive-warm-gray">We'll provide a detailed diagnosis and recommend the best solution for your vehicle.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-automotive-green/20 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-bold text-automotive-green">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-automotive-charcoal">Follow-up & Support</p>
                      <p className="text-sm text-automotive-warm-gray">We'll contact you within 24 hours with our findings and next steps.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-automotive-yellow/10 rounded-lg">
                <p className="text-sm text-automotive-charcoal">
                  <strong>Response Time:</strong> We aim to respond to all diagnostic requests within 24 hours. 
                  Urgent requests are prioritized and typically receive a response within 4 hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={handleSubmitAnother}
                  variant="automotive"
                  className="flex-1"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Another Request
                </Button>
                <Button
                  asChild
                  variant="automotive-outline"
                  className="flex-1"
                >
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-automotive-cream via-white to-automotive-warm-gray/20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-automotive-warm-gray/20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-automotive-charcoal hover:text-automotive-orange transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-automotive-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TM</span>
            </div>
            <span className="font-semibold text-automotive-charcoal">TM Auto Express</span>
          </div>
        </div>
      </div>

      {/* Form Page */}
      <div className="container mx-auto px-4 py-8">
        <DiagnoseForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default DiagnoseOnline;
