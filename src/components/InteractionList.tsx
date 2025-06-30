import React, { useState } from 'react';
import { Search, Calendar, MessageSquare, Phone, Mail, User, Plus, Filter, Edit3, Trash2 } from 'lucide-react';
import { mockInteractions } from '../data/mockData';
import { Interaction } from '../types';

const InteractionList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const interactionTypes = ['Meeting', 'Call', 'Email'] as const;
  const persons = Array.from(new Set(mockInteractions.map(i => i.person?.full_name).filter(Boolean)));

  const filteredInteractions = mockInteractions.filter(interaction => {
    const matchesSearch = !searchTerm || 
      interaction.person?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interaction.purpose?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interaction.details?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = !selectedType || interaction.interaction_type === selectedType;
    const matchesPerson = !selectedPerson || interaction.person?.full_name === selectedPerson;

    return matchesSearch && matchesType && matchesPerson;
  }).sort((a, b) => new Date(b.interaction_date).getTime() - new Date(a.interaction_date).getTime());

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'Meeting': return MessageSquare;
      case 'Call': return Phone;
      case 'Email': return Mail;
      default: return MessageSquare;
    }
  };

  const getInteractionColor = (type: string) => {
    switch (type) {
      case 'Meeting': return 'bg-blue-100 text-blue-800';
      case 'Call': return 'bg-green-100 text-green-800';
      case 'Email': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('ja-JP'),
      time: date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">接触履歴</h1>
            <p className="text-teal-100">顧客との接触記録と営業活動の管理</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-teal-700 rounded-lg hover:bg-teal-50 transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>接触記録を追加</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="人物名、目的、詳細から検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">すべての種類</option>
            <option value="Meeting">会議</option>
            <option value="Call">電話</option>
            <option value="Email">メール</option>
          </select>

          <select
            value={selectedPerson}
            onChange={(e) => setSelectedPerson(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">すべての人物</option>
            {persons.map(person => (
              <option key={person} value={person}>{person}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredInteractions.length}件の接触履歴が見つかりました
        </p>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">新しい順</span>
        </div>
      </div>

      {/* Interaction Timeline */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="space-y-6">
          {filteredInteractions.map((interaction, index) => {
            const Icon = getInteractionIcon(interaction.interaction_type);
            const datetime = formatDateTime(interaction.interaction_date);

            return (
              <div key={interaction.interaction_id} className="relative">
                {/* Timeline Line */}
                {index < filteredInteractions.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-12 bg-gray-200"></div>
                )}

                <div className="flex space-x-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-teal-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-gray-900">{interaction.person?.full_name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getInteractionColor(interaction.interaction_type)}`}>
                            {interaction.interaction_type === 'Meeting' ? '会議' : 
                             interaction.interaction_type === 'Call' ? '電話' : 'メール'}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-600">{interaction.person?.company?.name}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{datetime.date} {datetime.time}</span>
                          </div>
                        </div>
                      </div>

                      {interaction.purpose && (
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-700">目的: </span>
                          <span className="text-sm text-gray-600">{interaction.purpose}</span>
                        </div>
                      )}

                      {interaction.details && (
                        <div className="bg-white rounded-md p-3 border border-gray-200">
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{interaction.details}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredInteractions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">接触履歴が見つかりません</h3>
            <p className="text-gray-600">検索条件を変更するか、新しい接触記録を追加してください。</p>
          </div>
        )}
      </div>

      {/* Add Interaction Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowAddForm(false)}></div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">新しい接触記録を追加</h3>
                <p className="text-sm text-gray-600 mt-1">顧客との接触内容を記録してください。</p>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">接触相手 *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option value="">選択してください</option>
                    {persons.map(person => (
                      <option key={person} value={person}>{person}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">接触種類 *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option value="">選択してください</option>
                      <option value="Meeting">会議</option>
                      <option value="Call">電話</option>
                      <option value="Email">メール</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">接触日時 *</label>
                    <input
                      type="datetime-local"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">目的</label>
                  <input
                    type="text"
                    placeholder="例: フォローアップ、提案説明、情報交換"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">詳細メモ</label>
                  <textarea
                    rows={4}
                    placeholder="接触内容の詳細、次回アクション等"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors duration-200"
                  >
                    記録を保存
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractionList;