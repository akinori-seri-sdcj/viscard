import React, { useState } from 'react';
import { Search, User, Mail, Phone, Building2, Calendar, MessageSquare, Plus } from 'lucide-react';
import { mockPersons, mockInteractions } from '../data/mockData';

const PersonList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const departments = Array.from(new Set(mockPersons.map(p => p.department).filter(Boolean)));

  const filteredPersons = mockPersons.filter(person => {
    const matchesSearch = !searchTerm || 
      person.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.company?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = !selectedDepartment || person.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const getLastInteraction = (personId: string) => {
    const interactions = mockInteractions
      .filter(i => i.person_id === personId)
      .sort((a, b) => new Date(b.interaction_date).getTime() - new Date(a.interaction_date).getTime());
    
    return interactions[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">人物管理</h1>
        <p className="text-indigo-100">登録された人物の詳細情報と接触履歴</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="名前、企業名、メールアドレスから検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">すべての部署</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredPersons.length}名の人物が見つかりました
        </p>
      </div>

      {/* Person Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPersons.map(person => {
          const lastInteraction = getLastInteraction(person.person_id);
          const interactionCount = mockInteractions.filter(i => i.person_id === person.person_id).length;

          return (
            <div
              key={person.person_id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              {/* Person Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{person.full_name}</h3>
                    <p className="text-sm text-gray-600">{person.title}</p>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">{person.company?.name}</span>
                </div>
                {person.department && (
                  <p className="text-sm text-gray-600 ml-6">{person.department}</p>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                {person.email && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${person.email}`} className="text-blue-600 hover:text-blue-800">
                      {person.email}
                    </a>
                  </div>
                )}
                {person.phone_mobile && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${person.phone_mobile}`} className="text-gray-600">
                      {person.phone_mobile}
                    </a>
                  </div>
                )}
              </div>

              {/* Interaction Summary */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">接触履歴</span>
                  <span className="text-sm text-gray-500">{interactionCount}回</span>
                </div>
                
                {lastInteraction ? (
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>最終接触: {new Date(lastInteraction.interaction_date).toLocaleDateString('ja-JP')}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span>{lastInteraction.interaction_type} - {lastInteraction.purpose}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">接触履歴なし</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4 pt-4 border-t">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors duration-200">
                  <MessageSquare className="w-4 h-4" />
                  <span>接触記録</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <User className="w-4 h-4" />
                  <span>詳細</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPersons.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">人物が見つかりません</h3>
          <p className="text-gray-600">検索条件を変更してお試しください。</p>
        </div>
      )}
    </div>
  );
};

export default PersonList;