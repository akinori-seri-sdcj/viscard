import React, { useState } from 'react';
import { Search, Building2, MapPin, Globe, Users, Phone, Calendar, BarChart3 } from 'lucide-react';
import { mockCompanies, mockPersons, mockBusinessCards } from '../data/mockData';

const CompanyList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const industries = Array.from(new Set(mockCompanies.map(c => c.industry).filter(Boolean)));

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = !searchTerm || 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.address?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  const getCompanyStats = (companyId: string) => {
    const persons = mockPersons.filter(p => p.company_id === companyId);
    const cards = mockBusinessCards.filter(c => persons.some(p => p.person_id === c.person_id));
    const latestCard = cards.sort((a, b) => new Date(b.exchange_date).getTime() - new Date(a.exchange_date).getTime())[0];
    
    return {
      personCount: persons.length,
      cardCount: cards.length,
      latestExchange: latestCard?.exchange_date
    };
  };

  const getEmployeeSizeLabel = (size?: number) => {
    if (!size) return '不明';
    if (size < 50) return '小規模 (50名未満)';
    if (size < 300) return '中規模 (50-300名)';
    if (size < 1000) return '大規模 (300-1000名)';
    return '超大規模 (1000名以上)';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">企業管理</h1>
        <p className="text-emerald-100">登録された企業の詳細情報と接触状況</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="企業名、住所から検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">すべての業種</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredCompanies.length}社の企業が見つかりました
        </p>
      </div>

      {/* Company Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCompanies.map(company => {
          const stats = getCompanyStats(company.company_id);

          return (
            <div
              key={company.company_id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              {/* Company Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{company.name}</h3>
                    {company.industry && (
                      <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full mt-1">
                        {company.industry}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">{stats.cardCount}</div>
                  <div className="text-xs text-gray-500">名刺登録数</div>
                </div>
              </div>

              {/* Company Details */}
              <div className="space-y-3 mb-4">
                {company.address && (
                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-600">{company.address}</span>
                  </div>
                )}

                {company.phone_number && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${company.phone_number}`} className="text-gray-600 hover:text-emerald-600">
                      {company.phone_number}
                    </a>
                  </div>
                )}

                {company.website_url && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <a 
                      href={company.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {company.website_url}
                    </a>
                  </div>
                )}

                {company.employee_size && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{getEmployeeSizeLabel(company.employee_size)}</span>
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{stats.personCount}</div>
                  <div className="text-xs text-gray-500">登録人数</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{stats.cardCount}</div>
                  <div className="text-xs text-gray-500">名刺数</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">
                    {stats.latestExchange ? new Date(stats.latestExchange).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' }) : '-'}
                  </div>
                  <div className="text-xs text-gray-500">最新交換</div>
                </div>
              </div>

              {/* Last Exchange Info */}
              {stats.latestExchange && (
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>最新の名刺交換: {new Date(stats.latestExchange).toLocaleDateString('ja-JP')}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors duration-200">
                  <BarChart3 className="w-4 h-4" />
                  <span>分析</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <Building2 className="w-4 h-4" />
                  <span>詳細</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">企業が見つかりません</h3>
          <p className="text-gray-600">検索条件を変更してお試しください。</p>
        </div>
      )}
    </div>
  );
};

export default CompanyList;