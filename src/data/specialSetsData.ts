import { MenuItem, CategoryId } from '../types';

export interface SpecialSetDetail {
  id: string;
  name: string;
  categoryId: CategoryId;
  description: string;
  detailedOffer: string;
  image: string;
  price: number;
  oldPrice?: number;
  packageItem: MenuItem;
  items: MenuItem[];
}

export const SPECIAL_SETS: SpecialSetDetail[] = [
  {
    id: 'set-1',
    name: 'Dost Məclisi Seti',
    categoryId: 'pizza',
    description: 'Sucuklu Pizza (1 ədəd), Kartof Fri (2 ədəd), Nuggets (2 ədəd), Çiy Köftə, Coca-Cola (1 lt)',
    detailedOffer: 'Dostlarla unudulmaz anlar üçün bol xammallı ləzzət seti!',
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351502/ChatGPT_Image_9_A%C4%9Fu_2026_22_36_26_stqwzb.png',
    price: 29.90,
    oldPrice: 34.50,
    packageItem: {
      id: 'pkg-set-1',
      name: 'Dost Məclisi Seti (Tam Paket)',
      category: 'pizza',
      description: 'Sucuklu Pizza (1 ədəd), Kartof Fri (2 ədəd), Nuggets (2 ədəd), Çiy Köftə, Coca-Cola (1 lt)',
      ingredients: '1x Sucuklu Pizza, 2x Kartof Fri, 2x Nuggets pors, 1x Çiy Köftə, 1x Coca-Cola 1L',
      price: 29.90,
      image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351502/ChatGPT_Image_9_A%C4%9Fu_2026_22_36_26_stqwzb.png',
      isPopular: true,
      isHalal: true,
      prepTime: '15-20 dəq'
    },
    items: [
      {
        id: 'set1-item-1',
        name: 'Sucuklu Pizza (1 ədəd)',
        category: 'pizza',
        description: 'Ədviyyatlı halal sucuq dilimləri, xüsusi pomidor sousu və bol Mozzarella pendiri',
        ingredients: 'Pizza xəmiri, Halal sucuq, Mozzarella, Pomidor sousu, Zeytun',
        price: 10.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786432445/ChatGPT_Image_11_A%C4%9Fu_2026_11_00_57_ko6taw.png',
        isHalal: true,
        prepTime: '15 dəq'
      },
      {
        id: 'set1-item-2',
        name: 'Kartof Fri (2 ədəd)',
        category: 'fastfood',
        description: '2 Porsiya xırçıltılı və isti qızılı kartof fri çubuqları, ketçup və mayonez ilə',
        ingredients: 'Kartof, Dəniz duzu, Souslar',
        price: 6.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786429782/ChatGPT_Image_11_A%C4%9Fu_2026_10_15_16_ko9j2r.png',
        prepTime: '5-8 dəq'
      },
      {
        id: 'set1-item-3',
        name: 'Nuggets (2 ədəd pors)',
        category: 'fastfood',
        description: '2 Porsiya qızılı xırçıltılı panerovkada şirəli toyuq naggetsləri, xüsusi sous ilə',
        ingredients: 'Toyuq filesi, Xüsusi panerovka, Sous',
        price: 10.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786429786/ChatGPT_Image_11_A%C4%9Fu_2026_10_14_27_wqzv9a.png',
        isHalal: true,
        prepTime: '8-10 dəq'
      },
      {
        id: 'set1-item-4',
        name: 'Çiy Köftə',
        category: 'cig_kofte',
        description: 'Xüsusi Adıyaman üsulu ədviyyatlı bulqur çiy köftəsi, lavaş, təzə kahı, limon və nar şərabı ilə',
        ingredients: 'Ədviyyatlı bulqur, İsot bibəri, Nar şərabı, Kahı, Limon',
        price: 6.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786601214/ChatGPT_Image_13_A%C4%9Fu_2026_10_05_45_wswjb8.png',
        isSpicy: true,
        prepTime: '5 dəq'
      },
      {
        id: 'set1-item-5',
        name: 'Coca-Cola (1 Lt)',
        category: 'icikil',
        description: '1 Litrlik buz kimi sərinləşdirici qazlı içki',
        price: 2.50,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786701542/ChatGPT_Image_14_A%C4%9Fu_2026_13_50_07_yvegnm.png',
        prepTime: '1 dəq'
      }
    ]
  },
  {
    id: 'set-2',
    name: 'Xüsusi Endirimlər (Çay və Cheesecake)',
    categoryId: 'desertler',
    description: '2 Cheesecake alana 1 çaynik çay hədiyyə!',
    detailedOffer: '2 Cheesecake sifariş edin, 1 çaynik ətirli dəm çayı bizdən HƏDİYYƏ olsun!',
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351531/ChatGPT_Image_9_A%C4%9Fu_2026_22_38_57_eqlnia.png',
    price: 10.00,
    oldPrice: 14.00,
    packageItem: {
      id: 'pkg-set-2',
      name: 'Xüsusi Endirimlər (Çay və Cheesecake Seti)',
      category: 'desertler',
      description: '2 Dilim ləzzətli Cheesecake + 1 Çaynik Çay HƏDİYYƏ!',
      ingredients: '2x Kremsi Cheesecake, 1x Ətirli Çaynik Çay',
      price: 10.00,
      image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351531/ChatGPT_Image_9_A%C4%9Fu_2026_22_38_57_eqlnia.png',
      isPopular: true,
      prepTime: '5 dəq'
    },
    items: [
      {
        id: 'set2-item-1',
        name: 'Cheesecake (2 Dilim)',
        category: 'desertler',
        description: '2 Ədəd kremsi zərif klassik cheesecake dilimi giləmeyvə sousu ilə',
        ingredients: 'Krem pendir, Biskvit tabanı, Çiyələk topping',
        price: 10.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786705861/Cheesecake_r0kvwl.jpg',
        prepTime: '5 dəq'
      },
      {
        id: 'set2-item-2',
        name: 'Çaynik Çay (HƏDİYYƏ!)',
        category: 'kofe',
        description: 'Xüsusi dəm çayı (Kampaniya çərçivəsində tam PULSUZ HƏDİYYƏ)',
        ingredients: 'Klassik dəm çayı, kəklikotu, limon',
        price: 0.00,
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
        prepTime: '3 dəq'
      }
    ]
  },
  {
    id: 'set-3',
    name: 'Ailəvi Şaurma Seti (4 Nəfərlik)',
    categoryId: 'isti_yemekler',
    description: 'Toyuqlu Şaurma (4 ədəd), Kartof Fri (4 ədəd), Cheesecake (2 dilim), Çay (2 çaynik)',
    detailedOffer: 'Bütün ailə üçün doyumlu və sərfəli şaurma süfrəsi!',
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351544/ChatGPT_Image_9_A%C4%9Fu_2026_22_25_23_zcqmky.png',
    price: 38.00,
    oldPrice: 44.00,
    packageItem: {
      id: 'pkg-set-3',
      name: 'Ailəvi Şaurma Seti (4 Nəfərlik Paket)',
      category: 'isti_yemekler',
      description: 'Toyuqlu Şaurma (4 ədəd), Kartof Fri (4 ədəd), Cheesecake (2 dilim), Çay (2 çaynik)',
      ingredients: '4x Toyuqlu Şaurma, 4x Kartof Fri, 2x Cheesecake, 2x Çaynik Çay',
      price: 38.00,
      image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351544/ChatGPT_Image_9_A%C4%9Fu_2026_22_25_23_zcqmky.png',
      isPopular: true,
      isHalal: true,
      prepTime: '15-20 dəq'
    },
    items: [
      {
        id: 'set3-item-1',
        name: 'Toyuqlu Şaurma (4 ədəd)',
        category: 'pide',
        description: '4 Ədəd lavaşda qızardılmış şirəli toyuq filesi, xırçıltılı turşu və xüsusi sarımsaqlı sous',
        ingredients: 'Toyuq filesi, Turşu, Sous, Lavaş',
        price: 16.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786702703/Chicken_Shawarma_xddbfs.jpg',
        isHalal: true,
        prepTime: '10-12 dəq'
      },
      {
        id: 'set3-item-2',
        name: 'Kartof Fri (4 ədəd)',
        category: 'fastfood',
        description: '4 Porsiya qızılı xırçıltılı kartof fri çubuqları, ketçup və mayonez ilə',
        ingredients: 'Kartof, Dəniz duzu, Souslar',
        price: 12.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786429782/ChatGPT_Image_11_A%C4%9Fu_2026_10_15_16_ko9j2r.png',
        prepTime: '5-8 dəq'
      },
      {
        id: 'set3-item-3',
        name: 'Cheesecake (2 Dilim)',
        category: 'desertler',
        description: '2 Dilim kremsi zərif klassik cheesecake',
        ingredients: 'Krem pendir, Biskvit tabanı, Çiyələk topping',
        price: 10.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786705861/Cheesecake_r0kvwl.jpg',
        prepTime: '5 dəq'
      },
      {
        id: 'set3-item-4',
        name: 'Çaynik Çay (2 çaynik)',
        category: 'kofe',
        description: '2 Çaynik təzə dəm çayı kəklikotu və limon ilə',
        ingredients: 'Xüsusi qara dəm çayı, Kəklikotu, Limon',
        price: 6.00,
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
        prepTime: '5 dəq'
      }
    ]
  },
  {
    id: 'set-4',
    name: 'Nira Set',
    categoryId: 'fastfood',
    description: 'Toyuqlu Sezar Salat (1 ədəd), Toyuq Burger (2 ədəd), Kartof Fri (2 ədəd), Nuggets (1 ədəd), Coca-Cola (1 lt)',
    detailedOffer: 'Burger və salat ləzzətini bir arada sevənlər üçün xüsusi Nira Seti!',
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351562/ChatGPT_Image_9_A%C4%9Fu_2026_22_31_14_gv7uqw.png',
    price: 24.90,
    oldPrice: 29.50,
    packageItem: {
      id: 'pkg-set-4',
      name: 'Nira Set (Tam Paket)',
      category: 'fastfood',
      description: 'Toyuqlu Sezar Salat (1 ədəd), Toyuq Burger (2 ədəd), Kartof Fri (2 ədəd), Nuggets (1 ədəd), Coca-Cola (1 lt)',
      ingredients: '1x Sezar Salat, 2x Toyuq Burger, 2x Fri, 1x Nuggets, 1x Coca-Cola 1L',
      price: 24.90,
      image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351562/ChatGPT_Image_9_A%C4%9Fu_2026_22_31_14_gv7uqw.png',
      isPopular: true,
      isHalal: true,
      prepTime: '12-15 dəq'
    },
    items: [
      {
        id: 'set4-item-1',
        name: 'Toyuqlu Sezar Salat (1 ədəd)',
        category: 'salat',
        description: 'Xırçıltılı aysberq kahısı, qızardılmış toyuq file, krutonlar, Parmezan və Sezar sousu',
        ingredients: 'Aysberq marul, Toyuq file, Parmezan pendiri, Kruton, Sezar sousu',
        price: 6.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786598678/ChatGPT_Image_13_A%C4%9Fu_2026_09_15_08_gu4gip.png',
        isHalal: true,
        prepTime: '8 dəq'
      },
      {
        id: 'set4-item-2',
        name: 'Toyuq Burgeri (2 ədəd)',
        category: 'fastfood',
        description: '2 Ədəd çıtır panerovkalı toyuq file, kahı, pomidor və mayonez souslu burger',
        ingredients: 'Toyuq file, Çıtır panerovka, Marul, Pomidor, Mayonez, Burger bulkası',
        price: 10.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786429802/ChatGPT_Image_11_A%C4%9Fu_2026_10_09_36_ugqu02.png',
        isHalal: true,
        prepTime: '10 dəq'
      },
      {
        id: 'set4-item-3',
        name: 'Kartof Fri (2 ədəd)',
        category: 'fastfood',
        description: '2 Porsiya isti qızılı xırçıltılı kartof fri',
        ingredients: 'Kartof, Dəniz duzu, Souslar',
        price: 6.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786429782/ChatGPT_Image_11_A%C4%9Fu_2026_10_15_16_ko9j2r.png',
        prepTime: '5-8 dəq'
      },
      {
        id: 'set4-item-4',
        name: 'Nuggets (1 ədəd pors)',
        category: 'fastfood',
        description: 'Qızılı xırçıltılı panerovkada şirəli toyuq naggetsləri',
        ingredients: 'Toyuq filesi, Xüsusi panerovka, Dəniz duzu, Sous',
        price: 5.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786429786/ChatGPT_Image_11_A%C4%9Fu_2026_10_14_27_wqzv9a.png',
        isHalal: true,
        prepTime: '8 dəq'
      },
      {
        id: 'set4-item-5',
        name: 'Coca-Cola (1 Lt)',
        category: 'icikil',
        description: '1 Litrlik sərinləşdirici Coca-Cola',
        price: 2.50,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786701542/ChatGPT_Image_14_A%C4%9Fu_2026_13_50_07_yvegnm.png',
        prepTime: '1 dəq'
      }
    ]
  },
  {
    id: 'set-5',
    name: 'Nira Delight Set',
    categoryId: 'desertler',
    description: 'Cheesecake (3 ədəd), Kurabiyə (4 ədəd), Havuç dilim paxlava dondurmalı (1 ədəd), Çay (2 çaynik)',
    detailedOffer: 'Şirniyyat və çay həvəskarları üçün premium desert ziyafəti!',
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351549/ChatGPT_Image_9_A%C4%9Fu_2026_22_43_18_uhon89.png',
    price: 22.90,
    oldPrice: 27.00,
    packageItem: {
      id: 'pkg-set-5',
      name: 'Nira Delight Set (Desert Ziyafəti)',
      category: 'desertler',
      description: 'Cheesecake (3 ədəd), Kurabiyə (4 ədəd), Havuç dilim paxlava dondurmalı (1 ədəd), Çay (2 çaynik)',
      ingredients: '3x Cheesecake, 4x Kurabiyə, 1x Dondurmalı Havuç Dilim Paxlava, 2x Çaynik Çay',
      price: 22.90,
      image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351549/ChatGPT_Image_9_A%C4%9Fu_2026_22_43_18_uhon89.png',
      isPopular: true,
      prepTime: '8-10 dəq'
    },
    items: [
      {
        id: 'set5-item-1',
        name: 'Cheesecake (3 ədəd)',
        category: 'desertler',
        description: '3 Ədəd kremsi zərif klassik cheesecake dilimi',
        ingredients: 'Krem pendir, Biskvit tabanı, Çiyələk sousu',
        price: 15.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786705861/Cheesecake_r0kvwl.jpg',
        prepTime: '5 dəq'
      },
      {
        id: 'set5-item-2',
        name: 'Kurabiyə (4 ədəd)',
        category: 'desertler',
        description: '4 Ədəd fırından təzə çıxmış xırtıldayan ağızda əriyən kurabiyə',
        ingredients: 'Kərə yağı, Xəmir, Şokolad damlaları, Qoz',
        price: 4.00,
        image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600',
        prepTime: '3 dəq'
      },
      {
        id: 'set5-item-3',
        name: 'Havuç Dilim Paxlava Dondurmalı (1 ədəd)',
        category: 'desertler',
        description: 'Antep fıstıqlı xırçıltılı böyük havuç dilim paxlava və yanında Maraş dondurması',
        ingredients: 'Antep fıstığı, Yufka, Kərə yağı, Qaymaqlı dondurma',
        price: 9.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786705859/Carrot_Slice_Baklava_gfq7di.jpg',
        isPopular: true,
        prepTime: '5 dəq'
      },
      {
        id: 'set5-item-4',
        name: 'Çaynik Çay (2 çaynik)',
        category: 'kofe',
        description: '2 Çaynik ətirli dəm çayı kəklikotu ilə',
        ingredients: 'Xüsusi dəm çayı, Kəklikotu, Limon',
        price: 6.00,
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
        prepTime: '5 dəq'
      }
    ]
  },
  {
    id: 'set-6',
    name: 'Ailə Süfrəsi Premium Set',
    categoryId: 'isti_yemekler',
    description: 'Pendirli Pide (1 ədəd), Qiyməli Pide (1 ədəd), Xırtıldılı Badımcan Salatısı (1 ədəd), Toyuqlu Sezar Salatısı (1 ədəd), Ev Sayağı Kartof (2 ədəd), Nuggets (3 ədəd), Cheesecake (2 ədəd), Çaynik Çay (2 ədəd)',
    detailedOffer: 'Zəngin menyu çeşidləri ilə ailəniz üçün ən mükəmməl ziyafət süfrəsi!',
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351517/ChatGPT_Image_9_A%C4%9Fu_2026_22_34_33_rltry0.png',
    price: 49.90,
    oldPrice: 62.00,
    packageItem: {
      id: 'pkg-set-6',
      name: 'Ailə Süfrəsi Premium Set (Tam Ziyafət Paketi)',
      category: 'isti_yemekler',
      description: 'Pendirli Pide, Qiyməli Pide, 2x Salat, 2x Ev Sayağı Kartof, 3x Nuggets, 2x Cheesecake, 2x Çaynik Çay',
      ingredients: '1x Pendirli Pide, 1x Qiyməli Pide, 1x Xırtıldılı Badımcan, 1x Sezar Salat, 2x Ev Kartofu, 3x Nuggets, 2x Cheesecake, 2x Çay',
      price: 49.90,
      image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351517/ChatGPT_Image_9_A%C4%9Fu_2026_22_34_33_rltry0.png',
      isPopular: true,
      isHalal: true,
      prepTime: '20-25 dəq'
    },
    items: [
      {
        id: 'set6-item-1',
        name: 'Pendirli Pide (1 ədəd)',
        category: 'pide',
        description: 'Daş fırında nar kimi qızarmış xüsusi pendir, mozzarella və kərə yağlı pide',
        ingredients: 'Pendir, Mozzarella, Kərə yağı',
        price: 6.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786702708/Minced_Meat_Cheese_Pide_arusf7.jpg',
        isHalal: true,
        prepTime: '12 dəq'
      },
      {
        id: 'set6-item-2',
        name: 'Qiyməli Pide (1 ədəd)',
        category: 'pide',
        description: 'Xüsusi fırında bişmiş ədviyyatlı dana qiyməsi, soğan, bibər və pomidorlu pide',
        ingredients: 'Dana qiyməsi, Soğan, Bibər, Pomidor',
        price: 7.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786702685/Minced_Meat_Pide_th75yy.jpg',
        isHalal: true,
        prepTime: '12 dəq'
      },
      {
        id: 'set6-item-3',
        name: 'Xırtıldayan Badımcan Salat (1 ədəd)',
        category: 'salat',
        description: 'Çıtır qızarmış badımcan dilimləri, şirin çili sousu, təzə pomidor və küncüt',
        ingredients: 'Xırçıltılı badımcan, Pomidor, Şirin çili sousu, Küncüt',
        price: 6.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786598654/ChatGPT_Image_12_A%C4%9Fu_2026_14_43_47_geuldp.png',
        prepTime: '8 dəq'
      },
      {
        id: 'set6-item-4',
        name: 'Toyuqlu Sezar Salat (1 ədəd)',
        category: 'salat',
        description: 'Xırçıltılı aysberq kahısı, qızardılmış toyuq file, krutonlar, Parmezan və Sezar sousu',
        ingredients: 'Aysberq marul, Toyuq file, Parmezan pendiri, Kruton, Sezar sousu',
        price: 6.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786598678/ChatGPT_Image_13_A%C4%9Fu_2026_09_15_08_gu4gip.png',
        isHalal: true,
        prepTime: '8 dəq'
      },
      {
        id: 'set6-item-5',
        name: 'Ev Sayağı Kartof (2 ədəd)',
        category: 'fastfood',
        description: '2 Porsiya ədviyyatlı qızılı kənd kartofu dilimləri',
        ingredients: 'Kartof, Duz, Ədviyyat, Sous',
        price: 6.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786429782/ChatGPT_Image_11_A%C4%9Fu_2026_10_15_16_ko9j2r.png',
        prepTime: '8 dəq'
      },
      {
        id: 'set6-item-6',
        name: 'Nuggets (3 ədəd pors)',
        category: 'fastfood',
        description: '3 Porsiya xırçıltılı toyuq naggetsləri və souslar',
        ingredients: 'Toyuq filesi, Xüsusi panerovka, Sous',
        price: 15.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786429786/ChatGPT_Image_11_A%C4%9Fu_2026_10_14_27_wqzv9a.png',
        isHalal: true,
        prepTime: '10 dəq'
      },
      {
        id: 'set6-item-7',
        name: 'Cheesecake (2 ədəd)',
        category: 'desertler',
        description: '2 Dilim kremsi klassik cheesecake',
        ingredients: 'Krem pendir, Biskvit tabanı, Meyvə sousu',
        price: 10.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786705861/Cheesecake_r0kvwl.jpg',
        prepTime: '5 dəq'
      },
      {
        id: 'set6-item-8',
        name: 'Çaynik Çay (2 ədəd)',
        category: 'kofe',
        description: '2 Çaynik xüsusi kəklikotulu dəm çayı',
        ingredients: 'Dəm çayı, Kəklikotu, Limon',
        price: 6.00,
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
        prepTime: '5 dəq'
      }
    ]
  },
  {
    id: 'set-7',
    name: 'Nagets Kampaniyası',
    categoryId: 'fastfood',
    description: '2 pors nagets alana 1 pors hədiyyə! (Cəmi 3 pors qızılı naget)',
    detailedOffer: '2 pors nagets sifariş edin, 3-cü pors bizdən HƏDİYYƏ olsun!',
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351551/ChatGPT_Image_9_A%C4%9Fu_2026_22_41_31_shl1sk.png',
    price: 10.00,
    oldPrice: 15.00,
    packageItem: {
      id: 'pkg-set-7',
      name: 'Nagets Kampaniyası (2 Alana 1 Hədiyyə Paketi)',
      category: 'fastfood',
      description: '2 Porsiya Nagets qiymətinə Cəmi 3 Porsiya çıtır panerovkalı toyuq naggetsləri',
      ingredients: '3 Porsiya Toyuq Naggets (1 Porsiya HƏDİYYƏ), Xüsusi souslar',
      price: 10.00,
      image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786351551/ChatGPT_Image_9_A%C4%9Fu_2026_22_41_31_shl1sk.png',
      isPopular: true,
      isHalal: true,
      prepTime: '8-10 dəq'
    },
    items: [
      {
        id: 'set7-item-1',
        name: 'Toyuq Naggetsləri (1-ci Porsiya)',
        category: 'fastfood',
        description: 'Qızılı xırçıltılı panerovkada şirəli toyuq naggetsləri',
        ingredients: 'Toyuq filesi, Panerovka, Sous',
        price: 5.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786429786/ChatGPT_Image_11_A%C4%9Fu_2026_10_14_27_wqzv9a.png',
        isHalal: true,
        prepTime: '8 dəq'
      },
      {
        id: 'set7-item-2',
        name: 'Toyuq Naggetsləri (2-ci Porsiya)',
        category: 'fastfood',
        description: 'Qızılı xırçıltılı panerovkada şirəli toyuq naggetsləri',
        ingredients: 'Toyuq filesi, Panerovka, Sous',
        price: 5.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786429786/ChatGPT_Image_11_A%C4%9Fu_2026_10_14_27_wqzv9a.png',
        isHalal: true,
        prepTime: '8 dəq'
      },
      {
        id: 'set7-item-3',
        name: 'Toyuq Naggetsləri (3-cü Porsiya - HƏDİYYƏ!)',
        category: 'fastfood',
        description: 'Kampaniya çərçivəsində 2 pors alana 1 pors TAM PULSUZ HƏDİYYƏ!',
        ingredients: 'Toyuq filesi, Panerovka, Sous (Hədiyyə)',
        price: 0.00,
        image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786429786/ChatGPT_Image_11_A%C4%9Fu_2026_10_14_27_wqzv9a.png',
        isHalal: true,
        prepTime: '8 dəq'
      }
    ]
  }
];
