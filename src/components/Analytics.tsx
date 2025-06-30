import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Building2, Calendar, Download, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { mockAnalytics } from '../data/mockData';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'cards' | 'interactions' | 'companies'>('cards');

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

  const periods = [
    { value: '7d', label: '過去7日間' },
    { value: '30d', label: '過去30日間' },
    { value: '90d', label: '過去90日間' },
    { value: '1y', label: '過去1年間' }
  ];

  const metrics = [
    { value: 'cards', label: '名刺登録数', icon: BarChart3 },
    { value: 'interactions', label: '接触回数', icon: Users },
    { value: 'companies', label: '企業数', icon: Building2 }
  ];

  const topCompanies = [
    { name: '株式会社テクノロジー', cards: 5, interactions: 12 },
    { name: 'グローバル商事株式会社', cards: 3, interactions: 8 },
    { name: '山田商事株式会社', cards: 2, interactions: 5 },
    { name: 'イノベーション株式会社', cards: 2, interactions: 4 },
    { name: 'フューチャー企業', cards: 1, interactions: 3 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">分析レポート</h1>
        <p className="text-purple-100">名刺交換活動の分析とインサイト</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex flex-wrap gap-4">
            {/* Period Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">期間</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Metric Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">指標</label>
              <div className="flex space-x-2">
                {metrics.map(metric => {
                  const Icon = metric.icon;
                  return (
                    <button
                      key={metric.value}
                      onClick={() => setSelectedMetric(metric.value as any)}
                      className={`
                        flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                        ${selectedMetric === metric.value
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{metric.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>レポートをエクスポート</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">今月の名刺登録</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+25%</span>
                <span className="text-sm text-gray-500 ml-1">前月比</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">今月の接触回数</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">28</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+15%</span>
                <span className="text-sm text-gray-500 ml-1">前月比</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">新規企業</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+33%</span>
                <span className="text-sm text-gray-500 ml-1">前月比</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">平均接触間隔</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12日</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-orange-500 mr-1" />
                <span className="text-sm text-orange-600 font-medium">-2日</span>
                <span className="text-sm text-gray-500 ml-1">改善</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Trend */}
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
                formatter={(value) => [value, '累計登録数']}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2 }}
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

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Companies */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">接触頻度の高い企業</h3>
          <div className="space-y-4">
            {topCompanies.map((company, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{company.name}</h4>
                    <p className="text-sm text-gray-600">名刺: {company.cards}枚 • 接触: {company.interactions}回</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(company.interactions / 12) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interaction Frequency */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">接触頻度ランキング</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAnalytics.interactionFrequency} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#6b7280" tick={{ fontSize: 12 }} />
              <YAxis dataKey="person" type="category" stroke="#6b7280" tick={{ fontSize: 12 }} width={100} />
              <Tooltip formatter={(value) => [value, '接触回数']} />
              <Bar dataKey="frequency" fill="#10B981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">インサイト要約</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">成長トレンド</h4>
            <p className="text-sm text-gray-600">名刺登録数は順調に増加しており、特にIT業界からの登録が活発です。</p>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">接触品質</h4>
            <p className="text-sm text-gray-600">定期的な接触を維持している企業が多く、関係性の構築が順調です。</p>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">事業拡大</h4>
            <p className="text-sm text-gray-600">新規企業の開拓ペースが加速しており、事業機会の拡大が期待できます。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;