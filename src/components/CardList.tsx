import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, MapPin, Tag, Eye, Edit3, Trash2, Download } from 'lucide-react';

import { BusinessCard } from '../types';

interface CardListProps {
  onCardSelect: (card: BusinessCard) => void;
}

const CardList: React.FC<CardListProps> = ({ onCardSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'company'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/cards');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: BusinessCard[] = await response.json();
        setCards(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  // Get all unique tags
  const allTags = Array.from(new Set(cards.flatMap(card => card.tags || [])));

  // Filter and sort cards
  const filteredCards = cards
    .filter(card => {
      const matchesSearch = !searchTerm || 
        card.person?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.person?.company?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.exchange_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.notes?.toLowerCase().includes(searchTerm.toLowerCase());

      // For SQLite, tags are stored as a comma-separated string.
      // We need to split them into an array for filtering.
      const cardTags = card.tags ? card.tags.split(',').map(tag => tag.trim()) : [];
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => cardTags.includes(tag));

      return matchesSearch && matchesTags;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.person?.full_name || '';
          bValue = b.person?.full_name || '';
          break;
        case 'company':
          aValue = a.person?.company?.name || '';
          bValue = b.person?.company?.name || '';
          break;
        case 'date':
        default:
          aValue = a.exchange_date;
          bValue = b.exchange_date;
          break;
      }

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">名刺管理</h1>
        <p className="text-blue-100">登録済み名刺の検索・管理</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="名前、企業名、場所、メモから検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'company')}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">交換日順</option>
              <option value="name">名前順</option>
              <option value="company">企業名順</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Tags Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">タグで絞り込み:</h4>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200 hover:bg-red-200"
              >
                クリア
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Info */}
      {loading && <div className="text-center py-12 text-gray-500">Loading cards...</div>}
      {error && <div className="text-center py-12 text-red-500">Error: {error}</div>}
      {!loading && !error && (
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            {filteredCards.length}件の名刺が見つかりました
          </p>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>エクスポート</span>
          </button>
        </div>
      )}

      {/* Cards Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map(card => (
            <div
              key={card.card_id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => onCardSelect(card)}
            >
              {/* Card Image Preview */}
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <img
                  src={card.image_url}
                  alt="名刺"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">名刺画像</span>
                </div>
              </div>

              {/* Card Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{card.person?.full_name}</h3>
                  <p className="text-gray-600">{card.person?.title} • {card.person?.department}</p>
                  <p className="text-blue-600 font-medium">{card.person?.company?.name}</p>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{card.exchange_date}</span>
                  {card.exchange_location && (
                    <>
                      <MapPin className="w-4 h-4 ml-2" />
                      <span>{card.exchange_location}</span>
                    </>
                  )}
                </div>

                {card.tags && card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {card.tags.split(',').map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {card.notes && (
                  <p className="text-sm text-gray-600 line-clamp-2">{card.notes}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && filteredCards.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">名刺が見つかりません</h3>
          <p className="text-gray-600">検索条件を変更してお試しください。</p>
        </div>
      )}
    </div>
  );
};

export default CardList;