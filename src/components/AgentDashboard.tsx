import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { LogOut, CheckCircle2, XCircle, AlertTriangle, BarChart3, FileText, User, Building2, TrendingUp, Shield } from 'lucide-react';
import { Separator } from './ui/separator';

interface AgentDashboardProps {
  onLogout: () => void;
  onNavigate: (view: 'dashboard' | 'contact' | 'overview') => void;
}

interface Claim {
  id: string;
  patientName: string;
  hospital: string;
  amount: string;
  date: string;
  diagnosis: string;
  riskScore: 'Low' | 'Medium' | 'High';
  aiSummary: string;
  documents: string[];
  policyNumber: string;
  estimatedSettlement: string;
  fraudIndicators: string[];
  recommendations: string[];
  extractedData: {
    patientName: string;
    diagnosis: string;
    billAmount: string;
    hospital: string;
    policyNumber: string;
    admissionDate: string;
  };
  confidenceScores: {
    documentValidity: number;
    policyMatch: number;
    diagnosisAccuracy: number;
  };
}

export default function AgentDashboard({ onLogout, onNavigate }: AgentDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const pendingClaims: Claim[] = [
    {
      id: 'CLM-2024-1056',
      patientName: 'Rajesh Kumar',
      hospital: 'Apollo Hospitals, Mumbai',
      amount: '₹85,000',
      date: 'Oct 28, 2024',
      diagnosis: 'Acute Appendicitis - Surgical Intervention',
      riskScore: 'Low',
      aiSummary: 'Pre-authorization approved by hospital. All required medical documents are present and validated. Policy coverage is sufficient for the procedure. No anomalies detected in the submitted documents.',
      documents: ['Medical Report.pdf', 'Estimate Letter.pdf', 'ID Proof.jpg', 'Policy Document.pdf'],
      policyNumber: 'POL-2024-789456',
      estimatedSettlement: '3-5 business days',
      fraudIndicators: [],
      recommendations: [
        'All documents verified and legitimate',
        'Policy active and covers the procedure',
        'Hospital is network partner',
        'Treatment cost within policy limits'
      ],
      extractedData: {
        patientName: 'Rajesh Kumar',
        diagnosis: 'Acute Appendicitis',
        billAmount: '₹85,000',
        hospital: 'Apollo Hospitals, Mumbai',
        policyNumber: 'POL-2024-789456',
        admissionDate: 'Oct 28, 2024'
      },
      confidenceScores: {
        documentValidity: 98,
        policyMatch: 100,
        diagnosisAccuracy: 95
      }
    },
    {
      id: 'CLM-2024-1057',
      patientName: 'Priya Sharma',
      hospital: 'Max Healthcare, Delhi',
      amount: '₹1,20,000',
      date: 'Oct 29, 2024',
      diagnosis: 'Kidney Stone - Lithotripsy',
      riskScore: 'Low',
      aiSummary: 'Routine procedure with complete documentation. Patient history shows no previous claims for similar condition. All medical reports are consistent and verified.',
      documents: ['CT Scan Report.pdf', 'Doctor Prescription.pdf', 'Cost Estimate.pdf'],
      policyNumber: 'POL-2024-654321',
      estimatedSettlement: '3-5 business days',
      fraudIndicators: [],
      recommendations: [
        'Complete medical history available',
        'Treatment justified by diagnostic reports',
        'Cost estimate reasonable for procedure'
      ],
      extractedData: {
        patientName: 'Priya Sharma',
        diagnosis: 'Kidney Stone',
        billAmount: '₹1,20,000',
        hospital: 'Max Healthcare, Delhi',
        policyNumber: 'POL-2024-654321',
        admissionDate: 'Oct 29, 2024'
      },
      confidenceScores: {
        documentValidity: 96,
        policyMatch: 100,
        diagnosisAccuracy: 98
      }
    },
    {
      id: 'CLM-2024-1058',
      patientName: 'Amit Verma',
      hospital: 'Fortis Hospital, Bangalore',
      amount: '₹2,50,000',
      date: 'Oct 29, 2024',
      diagnosis: 'Cardiac Angioplasty',
      riskScore: 'Medium',
      aiSummary: 'High-value claim requiring additional verification. Previous cardiac history detected. Recommended for senior review before approval.',
      documents: ['ECG Report.pdf', 'Angiography Report.pdf', 'Medical History.pdf'],
      policyNumber: 'POL-2024-111222',
      estimatedSettlement: '5-7 business days',
      fraudIndicators: ['High claim amount', 'Recent policy activation (3 months)'],
      recommendations: [
        'Verify cardiac history with previous insurer',
        'Confirm procedure necessity with medical board',
        'Review policy terms for pre-existing conditions'
      ],
      extractedData: {
        patientName: 'Amit Verma',
        diagnosis: 'Cardiac Angioplasty',
        billAmount: '₹2,50,000',
        hospital: 'Fortis Hospital, Bangalore',
        policyNumber: 'POL-2024-111222',
        admissionDate: 'Oct 29, 2024'
      },
      confidenceScores: {
        documentValidity: 92,
        policyMatch: 85,
        diagnosisAccuracy: 90
      }
    }
  ];

  const approvedClaims: Claim[] = [
    {
      id: 'CLM-2024-1055',
      patientName: 'Sneha Reddy',
      hospital: 'Manipal Hospital, Hyderabad',
      amount: '₹65,000',
      date: 'Oct 27, 2024',
      diagnosis: 'Fracture Treatment - Orthopedic Surgery',
      riskScore: 'Low',
      aiSummary: 'Claim approved. All documentation complete and verified. Payment processing initiated.',
      documents: ['X-Ray Report.pdf', 'Surgery Report.pdf', 'Discharge Summary.pdf'],
      policyNumber: 'POL-2024-333444',
      estimatedSettlement: 'Processing',
      fraudIndicators: [],
      recommendations: [],
      extractedData: {
        patientName: 'Sneha Reddy',
        diagnosis: 'Bone Fracture',
        billAmount: '₹65,000',
        hospital: 'Manipal Hospital, Hyderabad',
        policyNumber: 'POL-2024-333444',
        admissionDate: 'Oct 27, 2024'
      },
      confidenceScores: {
        documentValidity: 99,
        policyMatch: 100,
        diagnosisAccuracy: 97
      }
    }
  ];

  const flaggedClaims: Claim[] = [
    {
      id: 'CLM-2024-1059',
      patientName: 'Rahul Singh',
      hospital: 'City Care Hospital, Jaipur',
      amount: '₹3,50,000',
      date: 'Oct 30, 2024',
      diagnosis: 'Spine Surgery',
      riskScore: 'High',
      aiSummary: 'Multiple fraud indicators detected. Documents show inconsistencies. Hospital not in verified network. Requires immediate investigation.',
      documents: ['Medical Report.pdf', 'Cost Estimate.pdf'],
      policyNumber: 'POL-2024-999888',
      estimatedSettlement: 'On Hold - Investigation',
      fraudIndicators: [
        'Hospital not in network list',
        'Document metadata shows recent creation dates',
        'Bill amount significantly higher than average',
        'Missing critical diagnostic reports',
        'Policy recently activated (2 weeks ago)'
      ],
      recommendations: [
        'Escalate to fraud investigation team',
        'Contact hospital for verification',
        'Request additional medical documentation',
        'Verify patient identity through video call'
      ],
      extractedData: {
        patientName: 'Rahul Singh',
        diagnosis: 'Spine Surgery',
        billAmount: '₹3,50,000',
        hospital: 'City Care Hospital, Jaipur',
        policyNumber: 'POL-2024-999888',
        admissionDate: 'Oct 30, 2024'
      },
      confidenceScores: {
        documentValidity: 65,
        policyMatch: 70,
        diagnosisAccuracy: 60
      }
    }
  ];

  const handleApproveClaim = () => {
    if (selectedClaim) {
      alert(`Claim ${selectedClaim.id} approved successfully!`);
    }
  };

  const handleRejectClaim = () => {
    if (selectedClaim && rejectionReason) {
      alert(`Claim ${selectedClaim.id} rejected. Reason: ${rejectionReason}`);
      setRejectionReason('');
    }
  };

  const handleQueryClaim = () => {
    if (selectedClaim) {
      alert(`Query sent to hospital for claim ${selectedClaim.id}`);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'High': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const ClaimCard = ({ claim }: { claim: Claim }) => (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-lg ${
        selectedClaim?.id === claim.id ? 'border-2 border-[#0052CC] shadow-lg' : ''
      }`}
      onClick={() => setSelectedClaim(claim)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm text-gray-500">#{claim.id}</p>
            <p className="mt-1">{claim.patientName}</p>
          </div>
          <Badge className={`${getRiskColor(claim.riskScore)} text-white border-none`}>
            {claim.riskScore} Risk
          </Badge>
        </div>
        <div className="space-y-1 text-sm text-gray-600">
          <p>🏥 {claim.hospital}</p>
          <p>💰 {claim.amount}</p>
          <p>📅 {claim.date}</p>
        </div>
        <p className="text-xs text-gray-500 mt-3 line-clamp-2">{claim.aiSummary}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-[#0052CC] to-[#00B8D9] bg-clip-text text-transparent">
                SmartClaim AI
              </h1>
              <p className="text-sm text-gray-600">Insurance Claim Review Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => onNavigate('overview')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </Button>
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
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Claims List */}
        <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="p-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="flagged">Flagged</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending" className="space-y-3 mt-4">
              {pendingClaims.map((claim) => (
                <ClaimCard key={claim.id} claim={claim} />
              ))}
            </TabsContent>
            
            <TabsContent value="approved" className="space-y-3 mt-4">
              {approvedClaims.map((claim) => (
                <ClaimCard key={claim.id} claim={claim} />
              ))}
            </TabsContent>
            
            <TabsContent value="flagged" className="space-y-3 mt-4">
              {flaggedClaims.map((claim) => (
                <ClaimCard key={claim.id} claim={claim} />
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Claim Details */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedClaim ? (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Claim Header */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#0052CC] to-[#00B8D9] text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <CardTitle>Claim Details - {selectedClaim.id}</CardTitle>
                    <Badge className={`${getRiskColor(selectedClaim.riskScore)} text-white border-none`}>
                      {selectedClaim.riskScore} Risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Patient Name</p>
                      <p className="text-gray-800">{selectedClaim.patientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hospital</p>
                      <p className="text-gray-800">{selectedClaim.hospital}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Claim Amount</p>
                      <p className="text-gray-800">{selectedClaim.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Policy Number</p>
                      <p className="text-gray-800">{selectedClaim.policyNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="text-gray-800">{selectedClaim.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Diagnosis</p>
                      <p className="text-gray-800">{selectedClaim.diagnosis}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Analysis */}
              <Card className="shadow-lg border-2 border-[#00B8D9]">
                <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardTitle className="flex items-center gap-2 text-[#0052CC]">
                    🤖 AI-Generated Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-gray-700 leading-relaxed">{selectedClaim.aiSummary}</p>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm mb-3">Confidence Scores</p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Document Validity</span>
                          <span className="text-[#0052CC]">{selectedClaim.confidenceScores.documentValidity}%</span>
                        </div>
                        <Progress value={selectedClaim.confidenceScores.documentValidity} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Policy Match</span>
                          <span className="text-[#0052CC]">{selectedClaim.confidenceScores.policyMatch}%</span>
                        </div>
                        <Progress value={selectedClaim.confidenceScores.policyMatch} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Diagnosis Accuracy</span>
                          <span className="text-[#0052CC]">{selectedClaim.confidenceScores.diagnosisAccuracy}%</span>
                        </div>
                        <Progress value={selectedClaim.confidenceScores.diagnosisAccuracy} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Extracted Data */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Extracted Document Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedClaim.extractedData).map(([key, value]) => (
                      <div key={key} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="text-gray-800">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Submitted Documents ({selectedClaim.documents.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedClaim.documents.map((doc, index) => (
                        <Badge key={index} variant="outline" className="px-3 py-1">
                          <FileText className="w-3 h-3 mr-1" />
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fraud Indicators */}
              {selectedClaim.fraudIndicators.length > 0 && (
                <Card className="shadow-lg border-2 border-red-300">
                  <CardHeader className="bg-red-50">
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      <AlertTriangle className="w-5 h-5" />
                      Fraud Risk Indicators
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-2">
                      {selectedClaim.fraudIndicators.map((indicator, index) => (
                        <li key={index} className="flex items-start gap-2 text-red-700">
                          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{indicator}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Recommendations */}
              {selectedClaim.recommendations.length > 0 && (
                <Card className="shadow-lg border-2 border-green-300">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <Shield className="w-5 h-5" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-2">
                      {selectedClaim.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Review Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={handleApproveClaim}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve Claim
                    </Button>
                    <Button 
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                      onClick={handleQueryClaim}
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Send Query
                    </Button>
                    <Button 
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      onClick={handleRejectClaim}
                      disabled={!rejectionReason}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Claim
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Explainable Reason (for rejection/query)</Label>
                    <Textarea
                      placeholder="Provide detailed reason for rejection or additional information required..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Select a claim to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
