import React from 'react';
import { CreditCard, Users, Building2, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { mockAnalytics, mockBusinessCards, mockPersons, mockCompanies } from '../data/mockData';

const Dashboard: React.FC = () => {
  const stats = [
    { 
      title: '総名刺数', 
      value: mockBusinessCards.length, 
      icon: CreditCard, 
      color: 'bg-blue-500',
      change: '+12%'
    },
    { 
      title: '登録人数', 
      value: mockPersons.length, 
      icon: Users, 
      color: 'bg-green-500',
      change: '+8%'
    },
    { 
      title: '登録企業数', 
      value: mockCompanies.length, 
      icon: Building2, 
      color: 'bg-purple-500',
      change: '+15%'
    },
    { 
      title: '今月の交換数', 
      value: 12, 
      icon: TrendingUp, 
      color: 'bg-orange-500',
      change: '+25%'
    },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

  const recentCards = mockBusinessCards.slice(-3).reverse();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">ダッシュボード</h1>
        <p className="text-blue-100">名刺管理システムの概要と最新情報</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    <span className="text-sm text-gray-500 ml-1">前月比</span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">名刺登録数の推移</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockAnalytics.cardGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString('ja-JP')}
                formatter={(value) => [value, '登録数']}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Industry Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">業種別分布</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockAnalytics.industryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ industry, percentage }) => `${industry} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {mockAnalytics.industryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, '企業数']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity & Follow-up Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Cards */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">最近の名刺登録</h3>
          <div className="space-y-4">
            {recentCards.map((card) => (
              <div key={card.card_id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="w-12 h-8 bg-gray-300 rounded flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{card.person?.full_name}</h4>
                  <p className="text-sm text-gray-600">{card.person?.company?.name}</p>
                  <p className="text-xs text-gray-500">{card.exchange_location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{card.exchange_date}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {card.tags?.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Follow-up Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">フォローアップ状況</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-red-700">要フォローアップ</span>
              </div>
              <span className="text-lg font-bold text-red-600">{mockAnalytics.followUpStatus.needsFollowUp}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-green-700">最近連絡済み</span>
              </div>
              <span className="text-lg font-bold text-green-600">{mockAnalytics.followUpStatus.recentContact}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-700">長期フォロー</span>
              </div>
              <span className="text-lg font-bold text-yellow-600">{mockAnalytics.followUpStatus.longTermContact}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;