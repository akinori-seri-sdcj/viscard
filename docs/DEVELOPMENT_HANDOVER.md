# BusinessCard Manager - 開発引き継ぎドキュメント

## 1. プロジェクト概要

### 1.1 システム概要
Sansan代替の名刺管理ツールのフロントエンド実装。名刺のデジタル管理、OCR処理、営業活動分析を目的とした企業向けWebアプリケーション。

### 1.2 技術スタック
- **フレームワーク**: React 18.3.1 + TypeScript
- **ビルドツール**: Vite 5.4.2
- **スタイリング**: Tailwind CSS 3.4.1
- **アイコン**: Lucide React 0.344.0
- **ルーティング**: React Router DOM 6.8.1
- **チャート**: Recharts 2.5.0
- **日付処理**: date-fns 2.29.3

### 1.3 現在の実装状況
- ✅ フロントエンドUI/UX完全実装
- ✅ モックデータによる機能デモ
- ❌ バックエンドAPI未実装
- ❌ データベース未実装
- ❌ 認証システム未実装
- ❌ 実際のOCR処理未実装

## 2. プロジェクト構造

```
src/
├── components/           # Reactコンポーネント
│   ├── Layout.tsx       # 共通レイアウト・ナビゲーション
│   ├── Dashboard.tsx    # ダッシュボード画面
│   ├── AddCard.tsx      # 名刺登録画面
│   ├── CardList.tsx     # 名刺一覧画面
│   ├── PersonList.tsx   # 人物管理画面
│   ├── CompanyList.tsx  # 企業管理画面
│   ├── InteractionList.tsx # 接触履歴画面
│   └── Analytics.tsx    # 分析レポート画面
├── data/
│   └── mockData.ts      # モックデータ定義
├── types/
│   └── index.ts         # TypeScript型定義
├── App.tsx              # メインアプリケーション
├── main.tsx             # エントリーポイント
└── index.css            # Tailwindスタイル
```

## 3. データ構造・型定義

### 3.1 主要な型定義 (`src/types/index.ts`)

```typescript
// 企業情報
interface Company {
  company_id: string;
  name: string;
  address?: string;
  phone_number?: string;
  website_url?: string;
  industry?: string;
  employee_size?: number;
  created_at: string;
  updated_at: string;
}

// 人物情報
interface Person {
  person_id: string;
  company_id: string;
  company?: Company;
  first_name: string;
  last_name: string;
  full_name: string;
  department?: string;
  title?: string;
  email?: string;
  phone_mobile?: string;
  phone_direct?: string;
  created_at: string;
  updated_at: string;
}

// 名刺情報
interface BusinessCard {
  card_id: string;
  person_id: string;
  person?: Person;
  uploader_user_id: string;
  image_url: string;
  ocr_raw_data?: any;
  exchange_date: string;
  exchange_time?: string;
  exchange_location?: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
  tags?: string[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

// 接触履歴
interface Interaction {
  interaction_id: string;
  person_id: string;
  person?: Person;
  interaction_date: string;
  interaction_type: 'Meeting' | 'Call' | 'Email';
  purpose?: string;
  details?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}
```

## 4. 画面・機能詳細

### 4.1 Layout.tsx - 共通レイアウト
**責任**: ナビゲーション、サイドバー、レスポンシブ対応

**主要機能**:
- サイドバーナビゲーション（7つの主要画面）
- モバイル対応（ハンバーガーメニュー）
- 現在のページハイライト
- 日付表示

**状態管理**:
```typescript
const [sidebarOpen, setSidebarOpen] = useState(false);
```

### 4.2 Dashboard.tsx - ダッシュボード
**責任**: システム全体の概要表示、KPI可視化

**主要機能**:
- 統計カード（総名刺数、登録人数、企業数、今月交換数）
- 名刺登録数推移グラフ（LineChart）
- 業種別分布円グラフ（PieChart）
- 最近の名刺登録一覧
- フォローアップ状況サマリー

**使用ライブラリ**: Recharts（LineChart, PieChart）

### 4.3 AddCard.tsx - 名刺登録
**責任**: 名刺画像アップロード、OCR処理、メタデータ入力

**主要機能**:
- ドラッグ&ドロップファイルアップロード
- OCR処理シミュレーション（2秒遅延）
- フォーム入力（交換日時、場所、メモ、タグ）
- 公開設定
- バリデーション

**状態管理**:
```typescript
const [dragOver, setDragOver] = useState(false);
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [isProcessing, setIsProcessing] = useState(false);
const [ocrResult, setOcrResult] = useState<any>(null);
const [formData, setFormData] = useState({...});
```

**OCRモック処理**:
```typescript
const simulateOCR = (file: File) => {
  setIsProcessing(true);
  setTimeout(() => {
    const mockOCRResult = {
      company: { name: '株式会社サンプル', ... },
      person: { name: '山田 太郎', ... },
      confidence: 0.92
    };
    setOcrResult(mockOCRResult);
    setIsProcessing(false);
  }, 2000);
};
```

### 4.4 CardList.tsx - 名刺一覧
**責任**: 名刺検索、フィルタリング、一覧表示

**主要機能**:
- キーワード検索（名前、企業名、場所、メモ）
- タグフィルタリング
- ソート機能（日付、名前、企業名）
- カード形式表示
- アクション（表示、編集、削除）

**状態管理**:
```typescript
const [searchTerm, setSearchTerm] = useState('');
const [selectedTags, setSelectedTags] = useState<string[]>([]);
const [sortBy, setSortBy] = useState<'date' | 'name' | 'company'>('date');
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
```

### 4.5 PersonList.tsx - 人物管理
**責任**: 人物情報表示、接触履歴サマリー

**主要機能**:
- 人物検索（名前、企業名、メール）
- 部署フィルタリング
- 接触履歴統計表示
- 連絡先情報（メール、電話）
- アクションボタン

### 4.6 CompanyList.tsx - 企業管理
**責任**: 企業情報表示、統計情報

**主要機能**:
- 企業検索
- 業種フィルタリング
- 企業統計（登録人数、名刺数、最新交換日）
- 企業規模表示
- 連絡先情報

### 4.7 InteractionList.tsx - 接触履歴
**責任**: 接触記録の表示・追加・管理

**主要機能**:
- タイムライン形式表示
- 接触種類フィルタリング（会議、電話、メール）
- 新規接触記録追加モーダル
- 検索・フィルタリング

**状態管理**:
```typescript
const [showAddForm, setShowAddForm] = useState(false);
const [selectedType, setSelectedType] = useState<string>('');
const [selectedPerson, setSelectedPerson] = useState('');
```

### 4.8 Analytics.tsx - 分析レポート
**責任**: データ分析、レポート生成、インサイト表示

**主要機能**:
- 期間選択（7日、30日、90日、1年）
- 指標選択（名刺、接触、企業）
- KPIカード表示
- 成長トレンドグラフ
- 業種別分布
- 接触頻度ランキング
- インサイト要約

**使用ライブラリ**: Recharts（LineChart, PieChart, BarChart）

## 5. モックデータ構造

### 5.1 データファイル (`src/data/mockData.ts`)

```typescript
// 企業データ（3社）
export const mockCompanies: Company[] = [...]

// 人物データ（4名）
export const mockPersons: Person[] = [...]

// 名刺データ（4枚）
export const mockBusinessCards: BusinessCard[] = [...]

// 接触履歴データ（3件）
export const mockInteractions: Interaction[] = [...]

// 分析データ
export const mockAnalytics: AnalyticsData = {
  cardGrowth: [...],
  industryDistribution: [...],
  interactionFrequency: [...],
  followUpStatus: {...}
}
```

### 5.2 データ関連付け
```typescript
// 人物に企業情報を関連付け
mockPersons.forEach(person => {
  person.company = mockCompanies.find(c => c.company_id === person.company_id);
});

// 名刺に企業情報を関連付け
mockBusinessCards.forEach(card => {
  card.person = mockPersons.find(p => p.person_id === card.person_id);
});
```

## 6. スタイリング・デザインシステム

### 6.1 Tailwind設定
- **カラーパレット**: デフォルトTailwindカラー使用
- **レスポンシブ**: `sm:`, `md:`, `lg:` ブレークポイント
- **コンポーネント**: カスタムコンポーネントなし

### 6.2 デザインパターン
- **カード**: `bg-white rounded-xl p-6 shadow-sm border border-gray-100`
- **ボタン**: `px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700`
- **入力フィールド**: `px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`
- **グラデーション**: 各画面のヘッダーで使用

### 6.3 アイコン使用
Lucide Reactから以下のアイコンを使用:
- `CreditCard`, `Users`, `Building2`, `BarChart3`
- `Search`, `Filter`, `Calendar`, `MapPin`
- `Upload`, `Camera`, `Save`, `Edit3`, `Trash2`

## 7. 状態管理

### 7.1 App.tsx - グローバル状態
```typescript
const [currentPage, setCurrentPage] = useState('dashboard');
const [selectedCard, setSelectedCard] = useState<BusinessCard | null>(null);
```

### 7.2 各コンポーネントのローカル状態
- **検索・フィルタ状態**: 各一覧画面で独立管理
- **フォーム状態**: 入力画面で独立管理
- **UI状態**: モーダル表示、ローディング状態など

## 8. 今後の開発タスク

### 8.1 優先度：高
1. **バックエンドAPI開発**
   - Node.js/Express または Python/FastAPI
   - PostgreSQL データベース設計・実装
   - RESTful API エンドポイント実装

2. **認証システム**
   - JWT認証実装
   - ユーザー登録・ログイン画面
   - 認証状態管理（Context API）

3. **実際のOCR処理**
   - Google Cloud Vision AI 連携
   - 画像アップロード・ストレージ
   - OCR結果パース・構造化

### 8.2 優先度：中
1. **データ永続化**
   - API呼び出し実装
   - エラーハンドリング
   - ローディング状態管理

2. **検索・フィルタ機能強化**
   - 全文検索実装
   - 高度なフィルタリング
   - パフォーマンス最適化

### 8.3 優先度：低
1. **外部連携**
   - SFA/CRM API連携
   - カレンダー連携
   - メール送信機能

2. **モバイル対応**
   - PWA対応
   - カメラ連携
   - オフライン機能

## 9. 開発環境セットアップ

### 9.1 必要な環境
- Node.js 18+
- npm または yarn

### 9.2 セットアップ手順
```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# リント
npm run lint
```

### 9.3 主要な設定ファイル
- `vite.config.ts`: Vite設定
- `tailwind.config.js`: Tailwind設定
- `tsconfig.json`: TypeScript設定
- `eslint.config.js`: ESLint設定

## 10. 注意事項・制約

### 10.1 現在の制約
- モックデータのみ（実際のデータ永続化なし）
- 認証機能なし（全機能アクセス可能）
- OCR処理はシミュレーション
- ファイルアップロードは表示のみ

### 10.2 パフォーマンス考慮事項
- 大量データ表示時の仮想化未実装
- 画像最適化未実装
- キャッシュ戦略未実装

### 10.3 セキュリティ考慮事項
- XSS対策（React標準で一部対応済み）
- CSRF対策未実装
- データ暗号化未実装

## 11. 参考資料

### 11.1 設計書
- 元の仕様書に基づいたデータベース設計
- API エンドポイント設計

### 11.2 技術ドキュメント
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Lucide React](https://lucide.dev/)

---

**最終更新**: 2024年12月
**作成者**: AI Assistant
**引き継ぎ対象**: バックエンド開発エージェント