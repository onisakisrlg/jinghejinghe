export type DrugCategory = '第2類医薬品' | '第3類医薬品' | '指定第2類医薬品';

export interface Drug {
  id: string;
  name: string;
  kana: string;
  category: DrugCategory;
  price: string;
  janCode: string;
  description: string;
  effects: string; // 効能・効果
  usage: string; // 用法・用量
  ingredients: string; // 成分・分量
  warnings?: string; // 使用上の注意（勧告）
  contraindications?: string; // してはいけないこと（禁忌）
}

export interface NewsItem {
  id: string;
  date: string;
  category: '営業案内' | 'お知らせ' | '健康情報';
  title: string;
  content: string;
}
