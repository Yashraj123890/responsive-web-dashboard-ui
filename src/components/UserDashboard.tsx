import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { LogOut, Upload, FileText, CheckCircle2, Clock, AlertCircle, User, Mail, MessageSquare, Phone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface UserDashboardProps {
  onLogout: () => void;
  onNavigate: (view: 'dashboard' | 'contact') => void;
}

export default function UserDashboard({ onLogout, onNavigate }: UserDashboardProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  const userProfile = {
    name: 'Rajesh Kumar',
    policyType: 'Family Health Insurance - Premium',
    policyNumber: 'POL-2024-789456',
    validity: 'Valid till: Dec 31, 2025',
    insurer: 'HealthGuard Insurance Ltd.',
    coverageAmount: '₹10,00,000'
  };

  const currentClaim = {
    id: 'CLM-2024-1056',
    hospital: 'Apollo Hospitals, Mumbai',
    amount: '₹85,000',
    date: 'Oct 28, 2024',
    status: 'Under Review',
    progress: 50,
    statusSteps: [
      { label: 'Submitted', completed: true },
      { label: 'Under Review', completed: true },
      { label: 'Approved', completed: false },
      { label: 'Settled', completed: false }
    ]
  };

  const claimHistory = [
    { id: 'CLM-2024-1056', date: 'Oct 28, 2024', hospital: 'Apollo Hospitals', amount: '₹85,000', status: 'Under Review', color: 'bg-yellow-500' },
    { id: 'CLM-2024-0892', date: 'Aug 15, 2024', hospital: 'Max Healthcare', amount: '₹45,000', status: 'Approved', color: 'bg-green-500' },
    { id: 'CLM-2024-0654', date: 'Jun 10, 2024', hospital: 'Fortis Hospital', amount: '₹32,000', status: 'Settled', color: 'bg-blue-500' },
    { id: 'CLM-2023-1234', date: 'Dec 05, 2023', hospital: 'Manipal Hospital', amount: '₹28,500', status: 'Settled', color: 'bg-blue-500' }
  ];

  const aiSummary = {
    diagnosis: 'Acute Appendicitis - Surgical Intervention',
    predictedApproval: '92%',
    estimatedSettlement: '3-5 business days',
    documentsStatus: 'All Required Documents Uploaded',
    riskScore: 'Low Risk',
    recommendations: [
      'Pre-authorization approved by hospital',
      'All medical documents verified',
      'Policy coverage sufficient for procedure'
    ]
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl bg-gradient-to-r from-[#0052CC] to-[#00B8D9] bg-clip-text text-transparent">
              SmartClaim AI
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setActiveTab('overview')}>
                Profile
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab('history')}>
                Claim History
              </Button>
              <Button variant="ghost" onClick={() => onNavigate('contact')}>
                Contact Us
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#0052CC] to-[#00B8D9] text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Policyholder Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Name</p>
                    <p className="text-gray-800">{userProfile.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Policy Number</p>
                    <p className="text-gray-800">{userProfile.policyNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Policy Type</p>
                    <p className="text-gray-800">{userProfile.policyType}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Coverage Amount</p>
                    <p className="text-gray-800">{userProfile.coverageAmount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Insurer</p>
                    <p className="text-gray-800">{userProfile.insurer}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Validity</p>
                    <p className="text-green-600">{userProfile.validity}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Claim Status Tracker */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Current Claim Status - {currentClaim.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Hospital</p>
                    <p className="text-gray-800">{currentClaim.hospital}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Claim Amount</p>
                    <p className="text-gray-800">{currentClaim.amount}</p>
                  </div>
                </div>

                {/* Progress Tracker */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    {currentClaim.statusSteps.map((step, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {step.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          ) : (
                            <Clock className="w-6 h-6 text-gray-500" />
                          )}
                        </div>
                        <p className="text-xs mt-2 text-center">{step.label}</p>
                        {index < currentClaim.statusSteps.length - 1 && (
                          <div className={`h-1 w-full mt-5 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`} style={{ position: 'absolute', left: '50%', width: '100%', top: '20px' }} />
                        )}
                      </div>
                    ))}
                  </div>
                  <Progress value={currentClaim.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Document Upload Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Claim Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#0052CC] transition-colors cursor-pointer">
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500 mt-2">PDF, JPG, PNG (Max 10MB)</p>
                  </Label>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#0052CC]" />
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      </div>
                    ))}
                  </div>
                )}
                <Button className="w-full bg-gradient-to-r from-[#0052CC] to-[#00B8D9]">
                  Submit Documents
                </Button>
              </CardContent>
            </Card>

            {/* Claim History */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Claim History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Hospital</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {claimHistory.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell>{claim.id}</TableCell>
                        <TableCell>{claim.date}</TableCell>
                        <TableCell>{claim.hospital}</TableCell>
                        <TableCell>{claim.amount}</TableCell>
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
          </div>

          {/* Right Side - AI Summary */}
          <div className="space-y-6">
            <Card className="shadow-lg border-2 border-[#00B8D9]">
              <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-2 text-[#0052CC]">
                  🤖 AI Claim Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="text-sm text-gray-500">Diagnosis</p>
                  <p className="text-gray-800">{aiSummary.diagnosis}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Predicted Approval</p>
                  <div className="flex items-center gap-2">
                    <Progress value={92} className="flex-1" />
                    <span className="text-green-600">{aiSummary.predictedApproval}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Risk Score</p>
                  <Badge className="bg-green-500 text-white">{aiSummary.riskScore}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estimated Settlement</p>
                  <p className="text-gray-800">{aiSummary.estimatedSettlement}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Documents Status</p>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">{aiSummary.documentsStatus}</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">AI Recommendations</p>
                  <ul className="space-y-2">
                    {aiSummary.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('contact')}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp Chat
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Call: 1800-XXX-XXXX
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
