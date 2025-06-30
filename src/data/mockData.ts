import { BusinessCard, Company, Person, Interaction, AnalyticsData } from '../types';

export const mockCompanies: Company[] = [
  {
    company_id: '1',
    name: '株式会社テクノロジー',
    address: '東京都渋谷区恵比寿1-1-1',
    phone_number: '03-1234-5678',
    website_url: 'https://technology.co.jp',
    industry: 'IT・ソフトウェア',
    employee_size: 500,
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-15T09:00:00Z'
  },
  {
    company_id: '2',
    name: '山田商事株式会社',
    address: '大阪府大阪市北区梅田2-2-2',
    phone_number: '06-9876-5432',
    website_url: 'https://yamada-shooji.co.jp',
    industry: '商社・卸売',
    employee_size: 150,
    created_at: '2024-01-20T10:30:00Z',
    updated_at: '2024-01-20T10:30:00Z'
  },
  {
    company_id: '3',
    name: 'グローバル商事株式会社',
    address: '神奈川県横浜市西区みなとみらい3-3-3',
    phone_number: '045-1111-2222',
    website_url: 'https://global-trade.co.jp',
    industry: '商社・貿易',
    employee_size: 800,
    created_at: '2024-02-01T14:15:00Z',
    updated_at: '2024-02-01T14:15:00Z'
  }
];

export const mockPersons: Person[] = [
  {
    person_id: '1',
    company_id: '1',
    first_name: '太郎',
    last_name: '田中',
    full_name: '田中 太郎',
    department: '営業部',
    title: '部長',
    email: 'tanaka@technology.co.jp',
    phone_mobile: '090-1234-5678',
    phone_direct: '03-1234-5679',
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-15T09:00:00Z'
  },
  {
    person_id: '2',
    company_id: '2',
    first_name: '花子',
    last_name: '佐藤',
    full_name: '佐藤 花子',
    department: '経営企画室',
    title: '室長',
    email: 'sato@yamada-shooji.co.jp',
    phone_mobile: '080-9876-5432',
    created_at: '2024-01-20T10:30:00Z',
    updated_at: '2024-01-20T10:30:00Z'
  },
  {
    person_id: '3',
    company_id: '1',
    first_name: '次郎',
    last_name: '鈴木',
    full_name: '鈴木 次郎',
    department: '開発部',
    title: '主任',
    email: 'suzuki@technology.co.jp',
    phone_mobile: '070-1111-2222',
    created_at: '2024-02-01T11:00:00Z',
    updated_at: '2024-02-01T11:00:00Z'
  },
  {
    person_id: '4',
    company_id: '3',
    first_name: '美咲',
    last_name: '高橋',
    full_name: '高橋 美咲',
    department: '海外事業部',
    title: '課長',
    email: 'takahashi@global-trade.co.jp',
    phone_mobile: '090-3333-4444',
    created_at: '2024-02-05T16:20:00Z',
    updated_at: '2024-02-05T16:20:00Z'
  }
];

// Add company references to persons
mockPersons.forEach(person => {
  person.company = mockCompanies.find(c => c.company_id === person.company_id);
});

export const mockBusinessCards: BusinessCard[] = [
  {
    card_id: '1',
    person_id: '1',
    uploader_user_id: 'user1',
    image_url: 'https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=400',
    exchange_date: '2024-01-15',
    exchange_time: '14:30',
    exchange_location: '恵比寿ガーデンプレイス',
    latitude: 35.6465,
    longitude: 139.7117,
    notes: '新規プロジェクトについて相談。来週再度打ち合わせ予定。',
    tags: ['新規案件', '重要', 'IT'],
    is_public: true,
    created_at: '2024-01-15T14:35:00Z',
    updated_at: '2024-01-15T14:35:00Z'
  },
  {
    card_id: '2',
    person_id: '2',
    uploader_user_id: 'user1',
    image_url: 'https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=400',
    exchange_date: '2024-01-20',
    exchange_time: '10:00',
    exchange_location: '大阪梅田スカイビル',
    notes: '関西エリアの展開について議論。積極的に協力していただけそう。',
    tags: ['関西', '展開', '商社'],
    is_public: true,
    created_at: '2024-01-20T10:35:00Z',
    updated_at: '2024-01-20T10:35:00Z'
  },
  {
    card_id: '3',
    person_id: '3',
    uploader_user_id: 'user1',
    image_url: 'https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=400',
    exchange_date: '2024-02-01',
    exchange_time: '15:45',
    exchange_location: '渋谷ヒカリエ',
    notes: '技術的な詳細について深く議論。非常に有益な情報交換ができた。',
    tags: ['技術', '開発', '詳細議論'],
    is_public: true,
    created_at: '2024-02-01T16:00:00Z',
    updated_at: '2024-02-01T16:00:00Z'
  },
  {
    card_id: '4',
    person_id: '4',
    uploader_user_id: 'user1',
    image_url: 'https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=400',
    exchange_date: '2024-02-05',
    exchange_time: '11:15',
    exchange_location: 'みなとみらい21',
    notes: '海外展開について相談。豊富な経験をお持ちで大変参考になった。',
    tags: ['海外', '経験豊富', '貿易'],
    is_public: true,
    created_at: '2024-02-05T11:30:00Z',
    updated_at: '2024-02-05T11:30:00Z'
  }
];

// Add person references to business cards
mockBusinessCards.forEach(card => {
  card.person = mockPersons.find(p => p.person_id === card.person_id);
});

export const mockInteractions: Interaction[] = [
  {
    interaction_id: '1',
    person_id: '1',
    interaction_date: '2024-01-22T09:00:00Z',
    interaction_type: 'Call',
    purpose: 'フォローアップ',
    details: 'プロジェクトの進捗確認と次回面談の調整',
    created_by: 'user1',
    created_at: '2024-01-22T09:15:00Z',
    updated_at: '2024-01-22T09:15:00Z'
  },
  {
    interaction_id: '2',
    person_id: '2',
    interaction_date: '2024-01-25T14:30:00Z',
    interaction_type: 'Meeting',
    purpose: '詳細打ち合わせ',
    details: '関西エリア展開の具体的な計画について議論',
    created_by: 'user1',
    created_at: '2024-01-25T15:00:00Z',
    updated_at: '2024-01-25T15:00:00Z'
  },
  {
    interaction_id: '3',
    person_id: '3',
    interaction_date: '2024-02-03T16:00:00Z',
    interaction_type: 'Email',
    purpose: '資料送付',
    details: '技術仕様書と開発スケジュールを送付',
    created_by: 'user1',
    created_at: '2024-02-03T16:10:00Z',
    updated_at: '2024-02-03T16:10:00Z'
  }
];

// Add person references to interactions
mockInteractions.forEach(interaction => {
  interaction.person = mockPersons.find(p => p.person_id === interaction.person_id);
});

export const mockAnalytics: AnalyticsData = {
  cardGrowth: [
    { date: '2024-01-01', count: 5 },
    { date: '2024-01-08', count: 12 },
    { date: '2024-01-15', count: 18 },
    { date: '2024-01-22', count: 25 },
    { date: '2024-01-29', count: 31 },
    { date: '2024-02-05', count: 38 },
    { date: '2024-02-12', count: 45 }
  ],
  industryDistribution: [
    { industry: 'IT・ソフトウェア', count: 15, percentage: 40 },
    { industry: '商社・卸売', count: 12, percentage: 32 },
    { industry: '製造業', count: 6, percentage: 16 },
    { industry: '金融・保険', count: 3, percentage: 8 },
    { industry: 'その他', count: 2, percentage: 4 }
  ],
  interactionFrequency: [
    { person: '田中 太郎', frequency: 5 },
    { person: '佐藤 花子', frequency: 3 },
    { person: '鈴木 次郎', frequency: 2 },
    { person: '高橋 美咲', frequency: 1 }
  ],
  followUpStatus: {
    needsFollowUp: 8,
    recentContact: 15,
    longTermContact: 5
  }
};