import { Branch, FeatureBadge, CounterStat, Review } from '../types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Rəşad Məmmədov',
    rating: 5,
    date: 'Dünən, 19:40',
    comment: 'Alov Double Smash Burger və Kuşbaşı Pide sifariş etdik. Əti çox keyfiyyətli, pide isə həqiqətən fırından təzə çıxmış kimi tam qaynar gəldi! Termo-çantada çatdırılma fərq yaradır.',
    orderedItem: 'Kuşbaşı Ətli Pide',
    helpfulCount: 24,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-2',
    name: 'Günel Əliyeva',
    rating: 5,
    date: '2 gün əvvəl',
    comment: 'Bakıda yediyim ən ləzzətli lahmacun və fırın sütlaç bura aiddir! Xəmir nazik, ətin dadı təbii. Ailəlikcə tez-tez sifariş veririk.',
    orderedItem: 'Xüsusi Fırın Lahmacun',
    helpfulCount: 18,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-3',
    name: 'Elvin Qasımov',
    rating: 5,
    date: '3 gün əvvəl',
    comment: 'Çatdırılma dəqiq 25 dəqiqəyə çatdı. Kuryer çox nəzakətli idi, yeməklər dumanı üstündə idi. Qiymət və keyfiyyət nisbəti 10/10.',
    orderedItem: 'Alov Double Smash Burger',
    helpfulCount: 12,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-4',
    name: 'Leyla Hüseynova',
    rating: 4,
    date: '1 həftə əvvəl',
    comment: 'Tombik ət dönər və nanəli ayran möhtəşəm ikilidir. Sousu biraz daha bol olsaydı tam 5 verərdim, amma yenə də dadı əla idi.',
    orderedItem: 'Alov Ət Dönər Tombik',
    helpfulCount: 7,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-5',
    name: 'Kamran Cabbarov',
    rating: 5,
    date: '2 həftə əvvəl',
    comment: 'Xüsusi İskəndər Dönər həqiqətən əsl Bursa üsulu kərə yağı ilə hazırlanır. Restoranın interyeri və təmizliyi də yüksək səviyyədədir.',
    orderedItem: 'Xüsusi İskəndər Dönər',
    helpfulCount: 15,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
];

export const BRANCHES: Branch[] = [
  {
    id: 'branch-1',
    name: 'Mərkəz Filialı',
    address: 'Heydər Əliyev prospekti 48a (Neptun Supermarket-1 qarşısı)',
    workingHours: 'Hər gün: 10:00 - 02:00',
    phone: '(051) 635 94 74',
    whatsapp: '994516359474',
    mapEmbedUrl: 'https://maps.google.com/maps?q=39.9640822,48.9416132&hl=az&z=17&output=embed',
    googleMapsUrl: 'https://www.google.com/maps/place/N%C4%B0RA.+LOUNGE/@39.9640822,48.9416132,17z/data=!3m1!4b1!4m6!3m5!1s0x403b07003477abfb:0xd4c6543ada1d2022!8m2!3d39.9640822!4d48.9416132!16s%2Fg%2F11zddgx9b6?entry=ttu',
    isMain: true
  }
];

export const FEATURE_BADGES: FeatureBadge[] = [
  {
    id: 'badge-1',
    title: '100% Halal Qida',
    description: 'Bütün ətlərimiz sertifikatlı, gündəlik kəsim halal məhsullardır.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'badge-2',
    title: 'İsti Ocaqda Təzə Bişirilmə',
    description: 'Pide və lahmacunlarımız sifariş anında daş fırında bişirilir.',
    iconName: 'Flame'
  },
  {
    id: 'badge-3',
    title: 'Premium Keyfiyyətli Ətlər',
    description: 'Yalnız yerli fermalardan gələn xüsusi dinləndirilmiş dana əti.',
    iconName: 'Beef'
  },
  {
    id: 'badge-4',
    title: 'Özel İstiliyi Qoruyan Çatdırılma Termo-çantaları',
    description: 'Yeməyiniz fırından çıxdığı ilk istilikdə ünvanınıza çatır.',
    iconName: 'Truck'
  }
];

export const COUNTER_STATS: CounterStat[] = [
  {
    value: '10,000+',
    label: 'Məmnun Müştəri',
    subtext: 'Bakı üzrə hər ay xidmət göstərdiyimiz qonaqlar',
    iconName: 'Users'
  },
  {
    value: '15+ İllik',
    label: 'Təcrübə & Ənənə',
    subtext: 'Fırın və qrill sənətində peşəkar ustalarımız',
    iconName: 'Award'
  },
  {
    value: '30 Dəq',
    label: 'İsti Çatdırılma',
    subtext: 'Şəhər daxili ekspress kuryer şəbəkəmiz',
    iconName: 'Clock'
  },
  {
    value: '100%',
    label: 'Təbii Tərkib',
    subtext: 'Heç bir qatqı maddəsi və süni tatlandırıcı yoxdur',
    iconName: 'Leaf'
  }
];
