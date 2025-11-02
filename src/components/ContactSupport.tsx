import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Mail, MessageSquare, Phone, Send, MapPin } from 'lucide-react';

interface ContactSupportProps {
  onBack: () => void;
}

export default function ContactSupport({ onBack }: ContactSupportProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Your message has been sent! We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-[#0052CC] to-[#00B8D9] bg-clip-text text-transparent">
                SmartClaim AI
              </h1>
              <p className="text-sm text-gray-600">Contact & Support</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-gray-800">Get in Touch</h2>
          <p className="text-gray-600 text-lg">
            We're here to help! Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please describe your issue or inquiry..."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#0052CC] to-[#00B8D9] hover:opacity-90"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact Cards */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Phone className="w-6 h-6 text-[#0052CC]" />
                  </div>
                  <div>
                    <h3 className="mb-1">Phone Support</h3>
                    <p className="text-gray-600 text-sm mb-2">Available 24/7 for urgent queries</p>
                    <p className="text-[#0052CC]">1800-XXX-XXXX (Toll Free)</p>
                    <p className="text-[#0052CC]">+91-XXXXX-XXXXX (International)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="mb-1">WhatsApp Chat</h3>
                    <p className="text-gray-600 text-sm mb-2">Quick responses from our support team</p>
                    <Button className="mt-2 bg-green-600 hover:bg-green-700">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat on WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="mb-1">Email Support</h3>
                    <p className="text-gray-600 text-sm mb-2">For detailed inquiries and documentation</p>
                    <p className="text-[#0052CC]">support@smartclaim-ai.com</p>
                    <p className="text-[#0052CC]">claims@smartclaim-ai.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="mb-1">Head Office</h3>
                    <p className="text-gray-600 text-sm mt-2">
                      SmartClaim AI Technologies Pvt. Ltd.<br />
                      Block A, 3rd Floor, Tech Park<br />
                      Mumbai - 400001, Maharashtra<br />
                      India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant Card */}
            <Card className="shadow-lg border-2 border-[#00B8D9] hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🤖</div>
                  <div>
                    <h3 className="mb-1">SmartClaim Assistant</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Our AI-powered chatbot can help you with instant answers to common questions
                    </p>
                    <Button className="bg-gradient-to-r from-[#0052CC] to-[#00B8D9]">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat with AI Assistant
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="shadow-lg mt-12">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b pb-4">
              <h4 className="mb-2 text-[#0052CC]">How long does claim processing take?</h4>
              <p className="text-sm text-gray-600">
                With our AI-powered system, most claims are processed within 2-5 business days. Emergency claims receive priority processing.
              </p>
            </div>
            <div className="border-b pb-4">
              <h4 className="mb-2 text-[#0052CC]">What documents do I need to submit?</h4>
              <p className="text-sm text-gray-600">
                Typically, you'll need: Medical reports, hospital bills, prescription, ID proof, and policy documents. Our AI assistant can guide you through the specific requirements.
              </p>
            </div>
            <div className="border-b pb-4">
              <h4 className="mb-2 text-[#0052CC]">Can I track my claim status in real-time?</h4>
              <p className="text-sm text-gray-600">
                Yes! Your dashboard provides real-time updates on your claim status. You'll also receive notifications via email and SMS.
              </p>
            </div>
            <div>
              <h4 className="mb-2 text-[#0052CC]">What if my claim is rejected?</h4>
              <p className="text-sm text-gray-600">
                You'll receive a detailed explanation with the reason for rejection. You can appeal the decision or contact our support team for assistance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
