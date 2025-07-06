
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/admin/ImageUpload';
import { saveDiagnoseRequest } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Car } from 'lucide-react';

const serviceTypes = [
  'Engine Diagnostics',
  'Brake System Check',
  'Electrical Issues',
  'Transmission Problems',
  'Suspension & Steering',
  'Air Conditioning',
  'General Inspection',
  'Other'
];

interface DiagnoseFormProps {
  onSuccess: (requestId: string) => void;
}

const DiagnoseForm = ({ onSuccess }: DiagnoseFormProps) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    address: '',
    car_make: '',
    car_model: '',
    car_year: new Date().getFullYear(),
    vin: '',
    problem_description: '',
    service_type: '',
    urgency_level: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    images: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const request = saveDiagnoseRequest(formData);
      toast({
        title: "Request Submitted",
        description: "Your diagnostic request has been submitted successfully!",
      });
      onSuccess(request.id);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-automotive-blue to-automotive-purple rounded-xl flex items-center justify-center mb-4">
          <Car className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-automotive-charcoal">Online Diagnostic Service</CardTitle>
        <p className="text-automotive-warm-gray">
          Get expert help with your vehicle issues. Our technicians will review your information and provide recommendations.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-automotive-charcoal border-b border-automotive-warm-gray/20 pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.customer_name}
                  onChange={(e) => handleInputChange('customer_name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-automotive-charcoal border-b border-automotive-warm-gray/20 pb-2">
              Vehicle Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Input
                  id="make"
                  placeholder="e.g., Toyota, Ford, BMW"
                  value={formData.car_make}
                  onChange={(e) => handleInputChange('car_make', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  placeholder="e.g., Camry, F-150, X3"
                  value={formData.car_model}
                  onChange={(e) => handleInputChange('car_model', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  value={formData.car_year}
                  onChange={(e) => handleInputChange('car_year', parseInt(e.target.value))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vin">VIN (Optional)</Label>
              <Input
                id="vin"
                placeholder="17-character Vehicle Identification Number"
                value={formData.vin}
                onChange={(e) => handleInputChange('vin', e.target.value)}
                maxLength={17}
              />
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-automotive-charcoal border-b border-automotive-warm-gray/20 pb-2">
              Service Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service_type">Service Type *</Label>
                <select
                  id="service_type"
                  value={formData.service_type}
                  onChange={(e) => handleInputChange('service_type', e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                  required
                >
                  <option value="">Select Service Type</option>
                  {serviceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level *</Label>
                <select
                  id="urgency"
                  value={formData.urgency_level}
                  onChange={(e) => handleInputChange('urgency_level', e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                  required
                >
                  <option value="low">Low - Can wait a week</option>
                  <option value="medium">Medium - Within a few days</option>
                  <option value="high">High - Within 24 hours</option>
                  <option value="urgent">Urgent - Immediate attention</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Problem Description *</Label>
              <Textarea
                id="description"
                placeholder="Please describe the issue you're experiencing with your vehicle. Include any symptoms, when it occurs, and any other relevant details..."
                value={formData.problem_description}
                onChange={(e) => handleInputChange('problem_description', e.target.value)}
                rows={6}
                required
              />
              <p className="text-xs text-automotive-warm-gray">
                {formData.problem_description.length}/1000 characters
              </p>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-automotive-charcoal border-b border-automotive-warm-gray/20 pb-2">
              Diagnostic Photos (Optional)
            </h3>
            <p className="text-sm text-automotive-warm-gray">
              Upload photos of the problem area, dashboard warning lights, or any relevant visual information.
            </p>
            <ImageUpload
              images={formData.images}
              onImagesChange={(images) => handleInputChange('images', images)}
              maxImages={5}
            />
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              variant="automotive"
              size="lg"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting Request...' : 'Submit Diagnostic Request'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiagnoseForm;
