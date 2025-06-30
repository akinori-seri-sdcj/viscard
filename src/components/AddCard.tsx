import React, { useState } from 'react';
import { Upload, Camera, Calendar, MapPin, Tag, User, Building2, FileText, Save, X } from 'lucide-react';

const AddCard: React.FC = () => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    exchangeDate: new Date().toISOString().split('T')[0],
    exchangeTime: '',
    exchangeLocation: '',
    notes: '',
    tags: '',
    isPublic: true
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState<any>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setSelectedFile(imageFiles[0]);
      simulateOCR(imageFiles[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      simulateOCR(file);
    }
  };

  const simulateOCR = (file: File) => {
    setIsProcessing(true);
    
    // Simulate OCR processing delay
    setTimeout(() => {
      const mockOCRResult = {
        company: {
          name: '株式会社サンプル',
          address: '東京都渋谷区恵比寿1-1-1',
          phone: '03-1234-5678',
          website: 'https://sample.co.jp'
        },
        person: {
          name: '山田 太郎',
          department: '営業部',
          title: '課長',
          email: 'yamada@sample.co.jp',
          mobile: '090-1234-5678',
          direct: '03-1234-5679'
        },
        confidence: 0.92
      };
      
      setOcrResult(mockOCRResult);
      setIsProcessing(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !ocrResult) {
      alert('名刺画像を選択してOCR処理を完了してください。');
      return;
    }

    // Simulate saving
    alert('名刺が正常に登録されました！');
    
    // Reset form
    setSelectedFile(null);
    setOcrResult(null);
    setFormData({
      exchangeDate: new Date().toISOString().split('T')[0],
      exchangeTime: '',
      exchangeLocation: '',
      notes: '',
      tags: '',
      isPublic: true
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">名刺登録</h1>
        <p className="text-green-100">新しい名刺をスキャンして情報を抽出・保存</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Upload Section */}
        <div className="space-y-6">
          {/* File Upload */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">名刺画像のアップロード</h3>
            
            <div
              className={`
                border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
                ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                ${selectedFile ? 'border-green-400 bg-green-50' : ''}
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setOcrResult(null);
                    }}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                    <span>削除</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      名刺画像をドラッグ&ドロップ
                    </p>
                    <p className="text-gray-600 mb-4">または下記ボタンから選択してください</p>
                    <div className="flex justify-center space-x-4">
                      <label className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-200">
                        <Camera className="w-5 h-5" />
                        <span>ファイルを選択</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">対応形式: JPG, PNG, GIF (最大10MB)</p>
                </div>
              )}
            </div>
          </div>

          {/* OCR Processing Status */}
          {selectedFile && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">OCR処理状況</h3>
              
              {isProcessing ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">名刺情報を解析中...</p>
                  <p className="text-sm text-gray-500 mt-2">しばらくお待ちください</p>
                </div>
              ) : ocrResult ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="font-medium">OCR処理完了 (信頼度: {Math.round(ocrResult.confidence * 100)}%)</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        個人情報
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600">氏名:</span> {ocrResult.person.name}</p>
                        <p><span className="text-gray-600">部署:</span> {ocrResult.person.department}</p>
                        <p><span className="text-gray-600">役職:</span> {ocrResult.person.title}</p>
                        <p><span className="text-gray-600">Email:</span> {ocrResult.person.email}</p>
                        <p><span className="text-gray-600">携帯:</span> {ocrResult.person.mobile}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Building2 className="w-4 h-4 mr-2" />
                        企業情報
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600">企業名:</span> {ocrResult.company.name}</p>
                        <p><span className="text-gray-600">住所:</span> {ocrResult.company.address}</p>
                        <p><span className="text-gray-600">電話:</span> {ocrResult.company.phone}</p>
                        <p><span className="text-gray-600">Web:</span> {ocrResult.company.website}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">交換情報・追加データ</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Exchange Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  交換日 *
                </label>
                <input
                  type="date"
                  value={formData.exchangeDate}
                  onChange={(e) => handleInputChange('exchangeDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  交換時刻
                </label>
                <input
                  type="time"
                  value={formData.exchangeTime}
                  onChange={(e) => handleInputChange('exchangeTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Exchange Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                交換場所
              </label>
              <input
                type="text"
                value={formData.exchangeLocation}
                onChange={(e) => handleInputChange('exchangeLocation', e.target.value)}
                placeholder="例: 恵比寿ガーデンプレイス、展示会ブース等"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                タグ
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="例: 新規案件, 重要, IT (カンマ区切り)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                メモ
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="面談内容、印象、次回アクション等"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Public Setting */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isPublic"
                checked={formData.isPublic}
                onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isPublic" className="text-sm font-medium text-gray-700">
                チーム内で共有する
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={!selectedFile || !ocrResult || isProcessing}
                className={`
                  w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${selectedFile && ocrResult && !isProcessing
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                <Save className="w-5 h-5" />
                <span>名刺を登録</span>
              </button>
              
              {(!selectedFile || !ocrResult) && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  名刺画像をアップロードしてOCR処理を完了してください
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCard;