import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, LogOut, TrendingUp, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardOverviewProps {
  onBack: () => void;
  onLogout: () => void;
}

export default function DashboardOverview({ onBack, onLogout }: DashboardOverviewProps) {
  const claimStatusData = [
    { name: 'Approved', value: 156, color: '#10b981' },
    { name: 'Pending', value: 43, color: '#f59e0b' },
    { name: 'Rejected', value: 12, color: '#ef4444' },
    { name: 'Under Review', value: 28, color: '#3b82f6' }
  ];

  const monthlyData = [
    { month: 'Jun', claims: 145, approved: 120 },
    { month: 'Jul', claims: 178, approved: 155 },
    { month: 'Aug', claims: 198, approved: 175 },
    { month: 'Sep', claims: 165, approved: 142 },
    { month: 'Oct', claims: 239, approved: 198 }
  ];

  const metrics = [
    {
      title: 'Total Claims Submitted',
      value: '239',
      change: '+12%',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Claims Approved',
      value: '198',
      change: '82.8%',
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Claims Under Review',
      value: '28',
      change: '11.7%',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Average Processing Time',
      value: '2.4 days',
      change: '-18%',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl bg-gradient-to-r from-[#0052CC] to-[#00B8D9] bg-clip-text text-transparent">
                  SmartClaim AI
                </h1>
                <p className="text-sm text-gray-600">Analytics Dashboard</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{metric.title}</p>
                    <p className="text-3xl mb-1">{metric.value}</p>
                    <p className={`text-sm ${metric.color}`}>{metric.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full ${metric.bgColor}`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Claim Status Pie Chart */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Claim Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={claimStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {claimStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {claimStatusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend Bar Chart */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Monthly Claims Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="claims" fill="#0052CC" name="Total Claims" />
                  <Bar dataKey="approved" fill="#10b981" name="Approved" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Top Hospitals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Apollo Hospitals', claims: 45 },
                  { name: 'Max Healthcare', claims: 38 },
                  { name: 'Fortis Hospital', claims: 32 },
                  { name: 'Manipal Hospital', claims: 28 },
                  { name: 'AIIMS Delhi', claims: 25 }
                ].map((hospital, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{hospital.name}</span>
                    <span className="text-sm px-3 py-1 bg-blue-100 text-[#0052CC] rounded-full">
                      {hospital.claims}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Common Diagnoses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { diagnosis: 'Cardiac Issues', count: 42 },
                  { diagnosis: 'Orthopedic Surgery', count: 35 },
                  { diagnosis: 'Appendicitis', count: 28 },
                  { diagnosis: 'Kidney Stone', count: 24 },
                  { diagnosis: 'Fracture Treatment', count: 22 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{item.diagnosis}</span>
                    <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">AI Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Fraud Detection Rate</span>
                    <span className="text-[#0052CC]">98.5%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#0052CC] to-[#00B8D9]" style={{ width: '98.5%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Document Accuracy</span>
                    <span className="text-[#0052CC]">96.2%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#0052CC] to-[#00B8D9]" style={{ width: '96.2%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Processing Speed</span>
                    <span className="text-[#0052CC]">94.8%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#0052CC] to-[#00B8D9]" style={{ width: '94.8%' }} />
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-500 mb-2">Average AI Analysis Time</p>
                  <p className="text-2xl text-[#0052CC]">1.2 sec</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
