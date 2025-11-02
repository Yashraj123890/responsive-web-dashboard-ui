import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { LogOut, Upload, FileText, Send, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface HospitalPortalProps {
  onLogout: () => void;
  onNavigate: (view: 'dashboard' | 'contact') => void;
}

export default function HospitalPortal({ onLogout, onNavigate }: HospitalPortalProps) {
  const [formData, setFormData] = useState({
    patientId: '',
    policyNumber: '',
    admissionDate: '',
    estimatedAmount: '',
    diagnosis: '',
    treatmentDetails: ''
  });

  const [uploadedDocs, setUploadedDocs] = useState<File[]>([]);

  const currentSubmissions = [
    { 
      id: 'CLM-2024-1056', 
      patient: 'Rajesh Kumar', 
      policyNo: 'POL-2024-789456',
      amount: '₹85,000', 
      date: 'Oct 28, 2024',
      status: 'Under Review', 
      color: 'bg-yellow-500' 
    },
    { 
      id: 'CLM-2024-1055', 
      patient: 'Priya Sharma', 
      policyNo: 'POL-2024-654321',
      amount: '₹1,20,000', 
      date: 'Oct 27, 2024',
      status: 'Approved', 
      color: 'bg-green-500' 
    },
    { 
      id: 'CLM-2024-1054', 
      patient: 'Amit Patel', 
      policyNo: 'POL-2024-456789',
      amount: '₹65,000', 
      date: 'Oct 26, 2024',
      status: 'Pending Documents', 
      color: 'bg-orange-500' 
    },
    { 
      id: 'CLM-2024-1053', 
      patient: 'Sneha Reddy', 
      policyNo: 'POL-2024-987654',
      amount: '₹95,000', 
      date: 'Oct 25, 2024',
      status: 'Approved', 
      color: 'bg-green-500' 
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedDocs([...uploadedDocs, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Pre-authorization request submitted successfully!');
    setFormData({
      patientId: '',
      policyNumber: '',
      admissionDate: '',
      estimatedAmount: '',
      diagnosis: '',
      treatmentDetails: ''
    });
    setUploadedDocs([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-[#0052CC] to-[#00B8D9] bg-clip-text text-transparent">
                SmartClaim AI
              </h1>
              <p className="text-sm text-gray-600">Hospital Claim Submission Portal</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => onNavigate('contact')}>
                Contact Support
              </Button>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Submission Form */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#00B8D9] to-[#0052CC] text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  New Pre-Authorization Request
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientId">Patient ID / Name</Label>
                      <Input
                        id="patientId"
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleInputChange}
                        placeholder="Enter patient ID or name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="policyNumber">Policy Number</Label>
                      <Input
                        id="policyNumber"
                        name="policyNumber"
                        value={formData.policyNumber}
                        onChange={handleInputChange}
                        placeholder="POL-XXXX-XXXXXX"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="admissionDate">Admission Date</Label>
                      <Input
                        id="admissionDate"
                        name="admissionDate"
                        type="date"
                        value={formData.admissionDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimatedAmount">Estimated Amount (₹)</Label>
                      <Input
                        id="estimatedAmount"
                        name="estimatedAmount"
                        type="number"
                        value={formData.estimatedAmount}
                        onChange={handleInputChange}
                        placeholder="85000"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diagnosis">Diagnosis</Label>
                    <Input
                      id="diagnosis"
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleInputChange}
                      placeholder="e.g., Acute Appendicitis"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="treatmentDetails">Treatment Details</Label>
                    <Textarea
                      id="treatmentDetails"
                      name="treatmentDetails"
                      value={formData.treatmentDetails}
                      onChange={handleInputChange}
                      placeholder="Describe the planned treatment and procedures"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Upload Pre-Authorization Documents</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#00B8D9] transition-colors cursor-pointer">
                      <Input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="doc-upload"
                      />
                      <Label htmlFor="doc-upload" className="cursor-pointer">
                        <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                        <p className="text-gray-600">Upload Documents</p>
                        <p className="text-xs text-gray-500 mt-1">Estimate letter, ID proof, diagnosis report</p>
                      </Label>
                    </div>
                  </div>

                  {uploadedDocs.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Documents ({uploadedDocs.length})</Label>
                      {uploadedDocs.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#00B8D9]" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </div>
                      ))}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#00B8D9] to-[#0052CC] hover:opacity-90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit for Insurance Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Current Submissions */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Current Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentSubmissions.map((claim) => (
                      <TableRow key={claim.id} className="cursor-pointer hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <p>{claim.id}</p>
                            <p className="text-xs text-gray-500">{claim.date}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{claim.patient}</p>
                            <p className="text-xs text-gray-500">{claim.amount}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${claim.color} text-white border-none`}>
                            {claim.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Pending Review</p>
                      <p className="text-3xl text-[#0052CC] mt-2">12</p>
                    </div>
                    <Clock className="w-10 h-10 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Approved Today</p>
                      <p className="text-3xl text-green-600 mt-2">8</p>
                    </div>
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Info Card */}
            <Card className="shadow-lg border-2 border-[#00B8D9]">
              <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardTitle className="text-[#0052CC]">🤖 AI Processing</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Automatic document verification</p>
                    <p className="text-xs text-gray-500">All uploaded documents are scanned by AI</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Instant policy validation</p>
                    <p className="text-xs text-gray-500">Real-time verification of policy coverage</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Smart fraud detection</p>
                    <p className="text-xs text-gray-500">AI analyzes claims for anomalies</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
