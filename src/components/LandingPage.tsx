import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { User, Building2, Hospital } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onLogin: (role: 'user' | 'hospital' | 'agent') => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600"
          alt="Healthcare Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-[#0052CC] to-[#00B8D9] bg-clip-text text-transparent">
            SmartClaim AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unified AI-Powered Cashless Insurance Claim Automation Platform
          </p>
          <p className="text-gray-500 mt-2">
            Fast • Secure • Intelligent
          </p>
        </div>

        {/* Login Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* User/Policyholder Card */}
          <Card className="bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-[#0052CC]">
            <CardContent className="p-8 text-center" onClick={() => onLogin('user')}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#0052CC] to-[#00B8D9] rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl mb-3 text-gray-800">
                Policyholder
              </h3>
              <p className="text-gray-600 mb-6">
                Submit and track your cashless insurance claims instantly
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-[#0052CC] to-[#00B8D9] hover:opacity-90"
                onClick={() => onLogin('user')}
              >
                Login as User
              </Button>
            </CardContent>
          </Card>

          {/* Hospital Card */}
          <Card className="bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-[#0052CC]">
            <CardContent className="p-8 text-center" onClick={() => onLogin('hospital')}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#00B8D9] to-[#0052CC] rounded-full flex items-center justify-center">
                <Hospital className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl mb-3 text-gray-800">
                Hospital
              </h3>
              <p className="text-gray-600 mb-6">
                Submit pre-authorization requests and manage patient claims
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-[#00B8D9] to-[#0052CC] hover:opacity-90"
                onClick={() => onLogin('hospital')}
              >
                Login as Hospital
              </Button>
            </CardContent>
          </Card>

          {/* Insurance Agent Card */}
          <Card className="bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-[#0052CC]">
            <CardContent className="p-8 text-center" onClick={() => onLogin('agent')}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#0052CC] to-[#00B8D9] rounded-full flex items-center justify-center">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl mb-3 text-gray-800">
                Insurance Agent
              </h3>
              <p className="text-gray-600 mb-6">
                Review claims with AI-powered insights and fraud detection
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-[#0052CC] to-[#00B8D9] hover:opacity-90"
                onClick={() => onLogin('agent')}
              >
                Login as Agent
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl text-center">
          <div className="text-gray-700">
            <div className="text-3xl mb-2">🤖</div>
            <p>AI-Powered Analysis</p>
          </div>
          <div className="text-gray-700">
            <div className="text-3xl mb-2">⚡</div>
            <p>Instant Processing</p>
          </div>
          <div className="text-gray-700">
            <div className="text-3xl mb-2">🔒</div>
            <p>Secure & Compliant</p>
          </div>
        </div>
      </div>
    </div>
  );
}
