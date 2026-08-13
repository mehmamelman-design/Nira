import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // ==================== 1. FAST FOOD ====================
  {
    id: 'ff-1',
    name: 'Et Burger',
    category: 'fastfood',
    description: 'Xüsusi xırçıltılı bulkada dana köftəsi, turşu xiyar, təzə pomidor və xüsusi burger sousu',
    ingredients: 'Dana əti köftəsi, Burger bulkası, Çedder pendiri, Marul, Turşu xiyar, Xüsusi sous',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '10-15 dəq'
  },
  {
    id: 'ff-2',
    name: 'Cheeseburger',
    category: 'fastfood',
    description: 'Ərimiş bol çedder pendirli şirəli dana burger, kahı və Alov burger sousu',
    ingredients: 'Dana əti, Çedder pendiri, Xüsusi sous, Karamelizə soğan, Turşu xiyar',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '10-15 dəq'
  },
  {
    id: 'ff-3',
    name: 'Toyuq Burgeri',
    category: 'fastfood',
    description: 'Çıtır panko panerovkalı toyuq file, kahı, pomidor və mayonez sousu',
    ingredients: 'Toyuq file, Çıtır panerovka, Marul, Pomidor, Mayonez, Burger bulkası',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '10-12 dəq'
  },
  {
    id: 'ff-4',
    name: 'Nira İkiqat Burger (Double)',
    category: 'fastfood',
    description: 'İki qat şirəli dana köftəsi, iki qat çedder pendiri və iki qat ləzzət',
    ingredients: '2x Dana köftə, 2x Çedder pendiri, Alov imzalı sous, Karamelizə olunmuş soğan',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '12-15 dəq'
  },
  {
    id: 'ff-6',
    name: 'Kartof Fri',
    category: 'fastfood',
    description: 'Xırçıltılı və isti qızılı kartof fri çubuqları, ketçup və mayonez ilə',
    ingredients: 'Kartof, Dəniz duzu, Ketçup, Mayonez',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5-8 dəq'
  },
  {
    id: 'ff-7',
    name: 'Qızardılmış Toyuq',
    category: 'fastfood',
    description: 'Xüsusi ədviyyatlı çıtır panerovkalı toyuq tikələri',
    ingredients: 'Toyuq file tikələri, Xüsusi ədviyyat, Sous',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '10 dəq'
  },
  {
    id: 'ff-8',
    name: 'Sendviç',
    category: 'fastfood',
    description: 'Təzə çörək arasında kolbasa, pendir, pomidor və xiyar ilə ləzzətli sendviç',
    ingredients: 'Təzə çörək, Halal kolbasa, Pendir, Pomidor, Xiyar, Sous',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '5-8 dəq'
  },
  {
    id: 'ff-9',
    name: 'Klab Sendviç',
    category: 'fastfood',
    description: 'Üç qat tost çörəyi arasında toyuq file, yumurta, pomidor, xiyar və xırçıltılı fri',
    ingredients: 'Tost çörəyi, Toyuq file, Qızartma yumurta, Pendir, Fri kartof',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '10-12 dəq'
  },
  {
    id: 'ff-10',
    name: 'Sadə Tost',
    category: 'fastfood',
    description: 'Qızardılmış tost çörəyi arasında bol ərimiş kaşar pendiri',
    ingredients: 'Tost çörəyi, Kaşar pendiri, Kərə yağı',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'ff-11',
    name: 'Sucuklu Tost',
    category: 'fastfood',
    description: 'Tost çörəyində qızardılmış halal sucuq və ərimiş kaşar pendiri',
    ingredients: 'Tost çörəyi, Halal sucuq, Kaşar pendiri, Kərə yağı',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '5-7 dəq'
  },
  {
    id: 'ff-12',
    name: 'Hot-dog',
    category: 'fastfood',
    description: 'Yumşaq hot-dog bulkasında qızardılmış sosis, xardal, ketçup və turşu xiyar',
    ingredients: 'Hot-dog bulkası, Halal sosis, Xardal, Ketçup, Çıtır soğan',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '5 dəq'
  },
  {
    id: 'ff-13',
    name: 'Kol Böreği',
    category: 'fastfood',
    description: 'Xırçıltılı yufka qatları arasında leziz qiyməli və ya pendirli fırın börəyi',
    ingredients: 'Təzə yufka, Qiymə və ya Pendir, Kərə yağı, Çörəkotu',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5-8 dəq'
  },

  // ==================== 2. PİZZA ====================
  {
    id: 'pz-1',
    name: 'Marqarita Pizza',
    category: 'pizza',
    description: 'Klassik İtalyan resepti: Xüsusi pomidor sousu, bol Mozzarella pendiri və təzə fesleğen',
    ingredients: 'Pizza xəmiri, Pomidor sousu, Mozzarella pendiri, Təzə fesleğen, Zeytun yağı',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'pz-2',
    name: 'Toyuqlu Pizza',
    category: 'pizza',
    description: 'Soba qızartması toyuq dilimləri, göbələk, bibər, zeytun və Mozzarella',
    ingredients: 'Pizza xəmiri, Toyuq əti, Göbələk, Rəngli bibərlər, Mozzarella, Oreqano',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'pz-3',
    name: 'Sucuklu Pizza',
    category: 'pizza',
    description: 'Ədviyyatlı halal sucuq dilimləri, xüsusi pomidor sousu və bol Mozzarella',
    ingredients: 'Pizza xəmiri, Halal sucuq, Mozzarella, Pomidor sousu, Zeytun',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'pz-4',
    name: 'Sosisli Pizza',
    category: 'pizza',
    description: 'Uşaqların və böyüklərin sevimlisi: Halal sosis dilimləri, qarğıdalı və Mozzarella',
    ingredients: 'Pizza xəmiri, Halal sosis, Şirin qarğıdalı, Mozzarella pendiri, Pomidor sousu',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'pz-5',
    name: 'Pepperoni Pizza',
    category: 'pizza',
    description: 'Acılı acısız orijinal pepperoni dilimləri, Mozzarella və İtalyan sousu',
    ingredients: 'Pizza xəmiri, Pepperoni, Mozzarella pendiri, Xüsusi pomidor sousu',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'pz-6',
    name: 'Qarışıq Pizza',
    category: 'pizza',
    description: 'Ən bol xammallı pizza: Sucuq, sosis, toyuq, göbələk, zeytun, bibər və qarğıdalı',
    ingredients: 'Sucuq, Sosis, Toyuq, Göbələk, Qara zeytun, Bibər, Qarğıdalı, Mozzarella',
    price: 11.00,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'pz-7',
    name: 'Göbələkli Pizza',
    category: 'pizza',
    description: 'Təzə şampinyon göbələkləri, fesleğen, sarımsaq yağı və ərimiş Mozzarella',
    ingredients: 'Pizza xəmiri, Şampinyon göbələk, Mozzarella, Fesleğen, Sarımsaq yağı',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=800',
    prepTime: '15-20 dəq'
  },

  // ==================== 3. PİDƏ ====================
  {
    id: 'pd-1',
    name: 'Pidə Sadə Pendirli',
    category: 'pide',
    description: 'Xüsusi daş fırında bişmiş bol ərimiş kaşar pendirli orijinal İncə Anadolu pidesi',
    ingredients: 'Fırın xəmiri, Təzə Kaşar pendiri, Kərə yağı',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '12-15 dəq'
  },
  {
    id: 'pd-2',
    name: 'Pidə Qiyməli',
    category: 'pide',
    description: 'Ədviyyatlı dana qiyməsi, pomidor, bibər və soğanlı fırın pidesi',
    ingredients: 'Fırın xəmiri, Dana qiyməsi, Pomidor, Biber, Soğan, Ədviyyat',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '12-15 dəq'
  },
  {
    id: 'pd-3',
    name: 'Pidə Qiyməli Pendirli',
    category: 'pide',
    description: 'Nəfis dana qiyməsi və üzərində ərimiş bol kaşar pendirli pidesi',
    ingredients: 'Fırın xəmiri, Dana qiyməsi, Kaşar pendiri, Kərə yağı',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '12-15 dəq'
  },
  {
    id: 'pd-4',
    name: 'Pidə Tikə Ətli (Kuşbaşılı)',
    category: 'pide',
    description: 'İncə doğranmış marinad olunmuş dana can əti, pomidor və bibərli daş fırın pidesi',
    ingredients: 'Fırın xəmiri, Dana can əti, Pomidor, Biber, Kərə yağı',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '15 dəq'
  },
  {
    id: 'pd-5',
    name: 'Pidə Tikə Ətli Pendirli',
    category: 'pide',
    description: 'Xırda doğranmış dana əti, rəngli bibərlər və üzərində nar kimi qızarmış kaşar pendiri',
    ingredients: 'Fırın xəmiri, Dana əti, Kaşar pendiri, Pomidor, Bibər, Kərə yağı',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '15 dəq'
  },
  {
    id: 'pd-6',
    name: 'Pidə Sucuklu Pendirli',
    category: 'pide',
    description: 'Qızardılmış halal sucuq dilimləri və bol ərimiş kaşar pendiri ilə ləzzətli pide',
    ingredients: 'Fırın xəmiri, Halal sucuq, Kaşar pendiri, Kərə yağı',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '12-15 dəq'
  },
  {
    id: 'pd-7',
    name: 'Pidə Qarışıq (Alov Special)',
    category: 'pide',
    description: 'Hər şeydən bol: Kuşbaşı dana əti, qiymə, sucuq, göbələk və iki qat kaşar pendiri',
    ingredients: 'Kuşbaşı ət, Qiymə, Sucuq, Göbələk, Kaşar pendiri, Kərə yağı',
    price: 11.00,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '15 dəq'
  },

  // ==================== 4. KABABLAR ====================
  {
    id: 'kb-1',
    name: 'Adana Kebabı',
    category: 'kabablar',
    description: 'Xüsusi acılı dana və quzu ətindən manqalda közdə bişən ənənəvi Adana lüləsi',
    ingredients: 'Dana əti, Quzu əti, Pul bibər, Quyruq yağı, Lavaş, Közlənmiş pomidor və bibər',
    price: 8.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786434443/ChatGPT_Image_11_A%C4%9Fu_2026_11_42_46_tiicji.png',
    isPopular: true,
    isSpicy: true,
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'kb-2',
    name: 'Quzu Kebabı',
    category: 'kabablar',
    description: 'Təzə körpə quzu ətindən manqal közündə bişirilmiş yumşaq tikə kabab',
    ingredients: 'Körpə quzu əti, Marinad, Közlənmiş pomidor, Biber, Lavaş, Soğan',
    price: 8.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786434441/ChatGPT_Image_11_A%C4%9Fu_2026_11_43_18_eftktj.png',
    isPopular: true,
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'kb-3',
    name: 'Toyuq Filesi',
    category: 'kabablar',
    description: 'Xüsusi sousda marinad olunmuş şirəli toyuq file tikələri kababı',
    ingredients: 'Toyuq file, Qatıq marinadı, Ədviyyatlar, Közlənmiş tərəvəzlər',
    price: 6.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786471035/ChatGPT_Image_11_A%C4%9Fu_2026_21_55_47_qegxlu.png',
    isHalal: true,
    prepTime: '12-15 dəq'
  },
  {
    id: 'kb-4',
    name: 'Quzu Qabırğası',
    category: 'kabablar',
    description: 'Manqal közündə xüsusi otlarla bişirilmiş ləzzətli quzu qabırğası',
    ingredients: 'Quzu qabırğası, Biberiye, Zeytun yağı, Közlənmə pomidor və bibər',
    price: 9.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786434449/ChatGPT_Image_11_A%C4%9Fu_2026_11_43_15_rnysjo.png',
    isPopular: true,
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'kb-5',
    name: 'Tərəvəz Kebabı',
    category: 'kabablar',
    description: 'Közdə bişmiş təzə badımcan, pomidor, acı bibər və göbələk şişi',
    ingredients: 'Badımcan, Pomidor, Biber, Göbələk, Sarımsaqlı kərə yağı',
    price: 3.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786471036/ChatGPT_Image_11_A%C4%9Fu_2026_21_55_39_df1svz.png',
    prepTime: '10-12 dəq'
  },
  {
    id: 'kb-6',
    name: 'Ciyər Kebabı',
    category: 'kabablar',
    description: 'Közdə quyruq yağı ilə növbəli şişə çəkilmiş təzə quzu ciyəri',
    ingredients: 'Quzu ciyəri, Quyruq yağı, Sumaq soğan, Lavaş',
    price: 6.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786434447/ChatGPT_Image_11_A%C4%9Fu_2026_11_43_12_basd2l.png',
    isHalal: true,
    prepTime: '10-12 dəq'
  },
  {
    id: 'kb-7',
    name: 'Toyuq Qanadları',
    category: 'kabablar',
    description: 'Acılı-şirin sousda marinad olunub közə verilmiş xırçıltılı toyuq qanadları',
    ingredients: 'Toyuq qanadı, Xüsusi acılı marinad, Közlənmə biber',
    price: 5.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786434448/ChatGPT_Image_11_A%C4%9Fu_2026_11_43_07_ircxqz.png',
    isHalal: true,
    prepTime: '12-15 dəq'
  },
  {
    id: 'kb-8',
    name: 'Lülə Kebab',
    category: 'kabablar',
    description: 'Ənənəvi reseptlə çəkilmiş dana və quzu ətindən yumşaq lülə kabab',
    ingredients: 'Çəkilmiş Dana və Quzu əti, Soğan, Ədviyyat, Lavaş, Sumaq',
    price: 7.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786434444/ChatGPT_Image_11_A%C4%9Fu_2026_11_43_20_zjle0d.png',
    isPopular: true,
    isHalal: true,
    prepTime: '15 dəq'
  },
  {
    id: 'kb-9',
    name: 'Ət Bastırma',
    category: 'kabablar',
    description: 'Soğan və reyhan sousunda marinad olunmuş yumşaq dana can əti bastırma kababı',
    ingredients: 'Dana can əti, Soğan suyu, Reyhan, Ədviyyat, Lavaş',
    price: 8.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786434451/ChatGPT_Image_11_A%C4%9Fu_2026_11_45_59_wapxot.png',
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'kb-10',
    name: 'Toyuq Budu',
    category: 'kabablar',
    description: 'Közdə nar kimi qızarmış şirəli toyuq bud kababı',
    ingredients: 'Toyuq budu, Tomatlı marinad, Közlənmiş pomidor',
    price: 6.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786434452/ChatGPT_Image_11_A%C4%9Fu_2026_11_46_05_e0mouj.png',
    isHalal: true,
    prepTime: '15 dəq'
  },

  // ==================== 5. İSTİ YEMƏKLƏR ====================
  {
    id: 'iy-1',
    name: 'Ət Sacı',
    category: 'isti_yemekler',
    description: 'İsti sac üzərində dana əti, kartof, badımcan, bibər, pomidor və xüsusi kərə yağı',
    ingredients: 'Dana əti, Kartof, Badımcan, Bibər, Pomidor, Soğan, Kərə yağı, Sac lavaşı',
    price: 25.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786528252/A_10_cnd5tt.png',
    isPopular: true,
    isHalal: true,
    prepTime: '20-25 dəq'
  },
  {
    id: 'iy-2',
    name: 'Quzu Sacı',
    category: 'isti_yemekler',
    description: 'Cızda-cız isti sacda körpə quzu əti, xüsusi ədviyyatlar və təzə tərəvəzlər',
    ingredients: 'Quzu əti, Sac tərəvəzləri, Kərə yağı, Xüsusi ədviyyat, İsti lavaş',
    price: 25.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786528246/A_3_fnjkkt.png',
    isPopular: true,
    isHalal: true,
    prepTime: '20-25 dəq'
  },
  {
    id: 'iy-3',
    name: 'Toyuq Sacı',
    category: 'isti_yemekler',
    description: 'Sacda qızardılmış təzə toyuq əti, xırçıltılı kartof dilimləri və tərəvəzlər',
    ingredients: 'Toyuq əti, Kartof, Biber, Pomidor, Kərə yağı, Lavaş',
    price: 20.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786528244/A_4_jpx1m2.png',
    isHalal: true,
    prepTime: '20 dəq'
  },
  {
    id: 'iy-4',
    name: 'Albalılı Can Əti',
    category: 'isti_yemekler',
    description: 'Şirin-turş təbii albalı sousunda bişirilmiş yumşaq dana can əti dilimləri',
    ingredients: 'Dana can əti, Təbii albalı sousu, Kərə yağı, Biberiye',
    price: 10.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786528249/A_6_gqlfrp.png',
    isPopular: true,
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'iy-5',
    name: 'Zoğallı Can Əti',
    category: 'isti_yemekler',
    description: 'Milli zoğal turşusu sousunda sotelənmiş yumşaq dana can əti',
    ingredients: 'Dana can əti, Ev üsulu zoğal turşusu, Soğan, Kərə yağı',
    price: 10.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786528253/A_7_xywskd.png',
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'iy-6',
    name: 'Krem + Göbələk + Toyuq',
    category: 'isti_yemekler',
    description: 'Nəfis qaymaq sousunda sotelənmiş toyuq file və təzə şampinyon göbələk',
    ingredients: 'Toyuq file, Qaymaq, Şampinyon göbələk, Sarımsaq, Ədviyyat',
    price: 6.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786528243/A_1_kxdmrp.png',
    isPopular: true,
    isHalal: true,
    prepTime: '15 dəq'
  },
  {
    id: 'iy-7',
    name: 'Ət Langeti',
    category: 'isti_yemekler',
    description: 'Xüsusi tavada incə döyülmüş dana langeti, yanında fri kartof ilə',
    ingredients: 'Dana əti langeti, Fri kartof, Təzə salat, Sous',
    price: 8.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786528250/A_5_mbpibj.png',
    isHalal: true,
    prepTime: '12-15 dəq'
  },
  {
    id: 'iy-8',
    name: 'Toyuq Langeti',
    category: 'isti_yemekler',
    description: 'Tavada qızardılmış incə toyuq langeti, kartof fri və qarnir ilə',
    ingredients: 'Toyuq langeti, Kartof fri, Tərəvəz qarniri',
    price: 6.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786528254/A_8_wszrsm.png',
    isHalal: true,
    prepTime: '12-15 dəq'
  },
  {
    id: 'iy-9',
    name: 'Ət Faxitos',
    category: 'isti_yemekler',
    description: 'Meksika üsulu cızıldayan tavada dana əti şeritləri, rəngli bibərlər və souslar',
    ingredients: 'Dana əti, Rəngli bibər, Soğan, Meksika ədviyyatları, Lavaş',
    price: 10.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786528255/A_9_jy6yfl.png',
    isPopular: true,
    isHalal: true,
    prepTime: '15-18 dəq'
  },
  {
    id: 'iy-10',
    name: 'Toyuq Faxitos',
    category: 'isti_yemekler',
    description: 'Sotelənmiş toyuq şeritləri, acılı-şirin bibərlər və tortilla lavaşı',
    ingredients: 'Toyuq file, Biberlər, Soğan, Fajita ədviyyatı, Tortilla',
    price: 8.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786528242/A_2_vswzxq.png',
    isHalal: true,
    prepTime: '15 dəq'
  },

  // ==================== 6. SOYUQ İÇKİLƏR ====================
  {
    id: 'ic-cola',
    name: 'Cola',
    category: 'icikil',
    description: 'Buz kimi sərinləşdirici Coca-Cola (həcm və qablaşdırma seçimi ilə)',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    variants: [
      { name: '0.5L', price: 1.50 },
      { name: '1L', price: 2.50 },
      { name: 'Ədəd Bankada', price: 2.20 },
      { name: 'Şüşə Qab', price: 2.50 }
    ]
  },
  {
    id: 'ic-fanta',
    name: 'Fanta',
    category: 'icikil',
    description: 'Portağal aromalı sərinləşdirici Fanta (həcm seçimi ilə)',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    variants: [
      { name: '0.5L', price: 1.50 },
      { name: '1L', price: 2.50 },
      { name: 'Ədəd Bankada', price: 2.20 }
    ]
  },
  {
    id: 'ic-sprite',
    name: 'Sprite',
    category: 'icikil',
    description: 'Limon və laym dadlı sərinləşdirici Sprite (həcm seçimi ilə)',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&q=80&w=800',
    variants: [
      { name: '0.5L', price: 1.50 },
      { name: '1L', price: 2.00 },
      { name: 'Ədəd Bankada', price: 2.20 }
    ]
  },
  {
    id: 'ic-sirab',
    name: 'Sirab',
    category: 'icikil',
    description: 'Təbii mineral Sirab suyu (şüşə qablaşdırma seçimi ilə)',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&q=80&w=800',
    variants: [
      { name: '0.5L Qazlı Şüşə', price: 2.00 },
      { name: '0.5L Şüşə Qab', price: 2.00 }
    ]
  },
  {
    id: 'ic-ayran',
    name: 'Ayran',
    category: 'icikil',
    description: 'Sərinlədici təbii ev ayranı (həcm və nanə seçimi ilə)',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    variants: [
      { name: '0.5L', price: 1.50 },
      { name: '0.5L Nanəli', price: 1.50 },
      { name: '1L', price: 3.00 }
    ]
  },
  {
    id: 'ic-cesme',
    name: 'Çeşmə',
    category: 'icikil',
    description: 'Təbii çeşmə bulaq suyu (qazsız və qazlı seçimi ilə)',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&q=80&w=800',
    variants: [
      { name: '0.5L Qazsız/Qazlı', price: 1.50 },
      { name: '0.7L Qazsız/Qazlı', price: 2.00 }
    ]
  },
  {
    id: 'ic-qizilquyu',
    name: 'Qızıl Quyu',
    category: 'icikil',
    description: 'Xüsusi milli limonad çeşidləri (Limon, Tərxun, Armud, Gül)',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    variants: [
      { name: '0.5L Limon', price: 2.00 },
      { name: '0.5L Tərxun', price: 2.00 },
      { name: '0.5L Armud', price: 2.00 },
      { name: '0.5L Gül', price: 2.00 },
      { name: '0.7L Limon', price: 2.50 },
      { name: '0.7L Armud', price: 2.50 },
      { name: '0.7L Tərxun', price: 2.50 },
      { name: '0.7L Gül', price: 2.50 }
    ]
  },
  {
    id: 'ic-meyvesiresi',
    name: 'Meyvə Şirəsi',
    category: 'icikil',
    description: 'Təbii meyvə şirələri',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    variants: [
      { name: '0.5L Şirə', price: 2.50 },
      { name: 'Ümumi Şirə', price: 4.00 }
    ]
  },
  {
    id: 'ic-fresh',
    name: 'Fresh',
    category: 'icikil',
    description: 'Təzə sıxılmış təbii portağal və qreypfrut şirəsi',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'ic-kompotlar',
    name: 'Kompotlar',
    category: 'icikil',
    description: 'Təbii ev üsulu hazırlanan ləzzətli meyvə kompotları',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    variants: [
      { name: 'Heyva Kompotu', price: 3.00 },
      { name: 'Gilas Kompotu', price: 3.00 },
      { name: 'Zoğal Kompotu', price: 3.00 },
      { name: 'Feyxoa Kompotu', price: 3.00 }
    ]
  },
  {
    id: 'ic-coplu',
    name: 'Çöplü Sok',
    category: 'icikil',
    description: 'Uşaqlar üçün çöp borulu meyvə şirəsi (0.2L)',
    price: 1.00,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800',
    prepTime: '1 dəq'
  },

  // ==================== 7. ŞORBALAR ====================
  {
    id: 'sb-1',
    name: 'Mərci Şorbası',
    category: 'sorbalar',
    description: 'Klassik Türk üsulu qırmızı mərcimək şorbası, krutonlar və limon ilə',
    ingredients: 'Qırmızı mərcimək, Kərə yağı, Quru nanə, Kruton çörək, Limon',
    price: 3.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786530160/ChatGPT_Image_12_A%C4%9Fu_2026_14_17_22_qk6dk8.png',
    isPopular: true,
    prepTime: '5-8 dəq'
  },
  {
    id: 'sb-2',
    name: 'Pomidor Şorbası',
    category: 'sorbalar',
    description: 'İtalyan üsulu təzə pomidor şorbası, üzərində rendələnmiş kaşar pendiri ilə',
    ingredients: 'Təzə pomidor, Qaymaq, Kaşar pendiri, Fesleğen, Kruton',
    price: 3.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786530159/ChatGPT_Image_12_A%C4%9Fu_2026_14_17_20_zb2xki.png',
    prepTime: '5-8 dəq'
  },
  {
    id: 'sb-3',
    name: 'Göbələk Şorbası',
    category: 'sorbalar',
    description: 'Qaymaqlı şampinyon göbələk şorbası, təzə göyərti və çörək qızartması ilə',
    ingredients: 'Şampinyon göbələk, Qaymaq, Kərə yağı, Sarımsaq, Kruton',
    price: 4.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786530156/ChatGPT_Image_12_A%C4%9Fu_2026_14_18_49_upwg2r.png',
    isPopular: true,
    prepTime: '8-10 dəq'
  },
  {
    id: 'sb-4',
    name: 'Toyuq Şorbası',
    category: 'sorbalar',
    description: 'Ev üsulu şəffaf toyuq bulyonu şorbası, tel şehriye və göyərtilər ilə',
    ingredients: 'Kənd toyuğu bulyonu, Tel şehriye, Yerkökü, Göyərti, Limon',
    price: 4.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786530159/ChatGPT_Image_12_A%C4%9Fu_2026_14_18_42_ul2wmc.png',
    isHalal: true,
    prepTime: '5-8 dəq'
  },

  // ==================== 8. SALAT ====================
  {
    id: 'sl-1',
    name: 'Paytaxt Salat',
    category: 'salat',
    description: 'Ənənəvi Olivier salatı: Bişmiş tərəvəzlər, toyuq file, yaşıl noxud və ev mayonezi',
    ingredients: 'Kartof, Yerkökü, Yumurta, Toyuq file, Turşu xiyar, Noxud, Mayonez',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'sl-2',
    name: 'Mimosa Salat',
    category: 'salat',
    description: 'Qat-qat yumşaq salat: Toyuq file, kartof, yerkökü, pendir, yumurta və mayonez',
    ingredients: 'Toyuq file, Kartof, Yerkökü, Holland pendiri, Yumurta, Mayonez',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'sl-3',
    name: 'Xırtıldayan Badımcan Salat',
    category: 'salat',
    description: 'Çıtır qızarmış badımcan dilimləri, şirin çili sousu, təzə pomidor və küncüt',
    ingredients: 'Xırçıltılı badımcan, Pomidor, Şirin çili sousu, Küncüt, Yeşillik',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '10 dəq'
  },
  {
    id: 'sl-4',
    name: 'Toyuq Sezar Salat',
    category: 'salat',
    description: 'Xırçıltılı aysberq kahısı, qızardılmış toyuq file, krutonlar, Parmezan və Sezar sousu',
    ingredients: 'Aysberq marul, Toyuq file, Parmezan pendiri, Kruton, Sezar sousu',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '8-10 dəq'
  },
  {
    id: 'sl-5',
    name: 'Krevit Sezar Salat',
    category: 'salat',
    description: 'Qızılı krevetkalar, Aysberq kahı, Çerri pomidor, Parmezan və Sezar sousu',
    ingredients: 'Qızartma Krevetka, Aysberq marul, Parmezan, Çerri pomidor, Kruton',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '10 dəq'
  },
  {
    id: 'sl-6',
    name: 'Çoban Salat',
    category: 'salat',
    description: 'Təzə xiyar, pomidor, göyərtilər, qırmızı soğan, zeytun yağı və limon sousu',
    ingredients: 'Xiyar, Pomidor, Keşniş, Şüyüd, Qırmızı soğan, Zeytun yağı, Limon',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'sl-7',
    name: 'Manqal Salat',
    category: 'salat',
    description: 'Közdə bişmiş badımcan, pomidor və acı bibərin sarımsaqlı xüsusi qarışığı',
    ingredients: 'Közlənmiş badımcan, Közlənmiş pomidor, Köz bibər, Sarımsaq, Göyərti',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'sl-8',
    name: 'Yunan Salat',
    category: 'salat',
    description: 'İri doğranmış xiyar, pomidor, Feta pendiri, qara zeytun, kekik və zeytun yağı',
    ingredients: 'Feta pendiri, Qara zeytun, Pomidor, Xiyar, Şirin bibər, Oreqano',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },

  // ==================== 9. ÇİY KÖFTƏ ====================
  {
    id: 'ck-1',
    name: 'Çiy Köftə',
    category: 'cig_kofte',
    description: 'Xüsusi Adıyaman üsulu ədviyyatlı bulqur çiy köftəsi, limon və nar şərabı ilə',
    ingredients: 'Ədviyyatlı bulqur, İsot bibəri, Nar şərabı, Kahı, Limon',
    price: 6.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786601214/ChatGPT_Image_13_A%C4%9Fu_2026_10_05_45_wswjb8.png',
    isPopular: true,
    isSpicy: true,
    prepTime: '5 dəq'
  },
  {
    id: 'ck-2',
    name: 'Çiy Köftə Roll',
    category: 'cig_kofte',
    description: 'Lavaş çörəyində çiy köftə, çıtır marul, doritos, turşu və nar sousu dürümü',
    ingredients: 'Çiy köftə, Lavaş, Marul, Turşu xiyar, Doritos çıtırı, Nar şərabı',
    price: 8.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786601212/ChatGPT_Image_13_A%C4%9Fu_2026_10_05_37_loaiov.png',
    isPopular: true,
    isSpicy: true,
    prepTime: '5 dəq'
  },
  {
    id: 'ck-3',
    name: 'Çiy Köftə Set',
    category: 'cig_kofte',
    description: 'Böyük porsiya çiy köftə seti: 500q çiy köftə, bol lavaş, təzə yeşilliklər və souslar',
    ingredients: '500q Çiy köftə, 4 ədəd Lavaş, Təzə marul, Limon, Nar şərabı sousu',
    price: 15.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786601215/ChatGPT_Image_13_A%C4%9Fu_2026_10_05_42_ybhluy.png',
    isPopular: true,
    isSpicy: true,
    prepTime: '5-8 dəq'
  },

  // ==================== 10. QƏLYANALTILAR ====================
  {
    id: 'qa-1',
    name: 'Pendir Çeşidləri',
    category: 'qelyanaltilar',
    description: 'Seçilmiş milli və xarici pendirlər növü: Motol, Qorqonzola, Holland və Feta',
    ingredients: 'Motol pendiri, Holland pendiri, Feta, Ağ pendir, Qoz ləpəsi',
    price: 3.50,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786602907/ChatGPT_Image_13_A%C4%9Fu_2026_10_29_38_hz6gdv.png',
    prepTime: '5 dəq'
  },
  {
    id: 'qa-2',
    name: 'Kolbasa Çeşidləri',
    category: 'qelyanaltilar',
    description: 'Halal ət məhsullarından hazırlanmış kolbasa və sucuq dilimləri tabağı',
    ingredients: 'Halal Servelat, Dudlaşdırılmış ət, Sucuq dilimləri, Zeytun',
    price: 3.50,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786602943/ChatGPT_Image_13_A%C4%9Fu_2026_10_34_19_vdbtfw.png',
    isHalal: true,
    prepTime: '5 dəq'
  },
  {
    id: 'qa-3',
    name: 'Zeytun',
    category: 'qelyanaltilar',
    description: 'İspaniya və Yunanıstandan seçilmiş yaşıl və qara zeytunlar',
    ingredients: 'Qara zeytun, Yaşıl zeytun, Zeytun yağı, Kekik',
    price: 2.50,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786602953/ChatGPT_Image_13_A%C4%9Fu_2026_10_32_40_daa1cs.png',
    prepTime: '3 dəq'
  },
  {
    id: 'qa-4',
    name: 'Zeytun və Limon Çeşidləri',
    category: 'qelyanaltilar',
    description: 'Limon dilimləri və kekik yağlı marinad olunmuş böyük zeytunlar',
    ingredients: 'Doldurulmuş yaşıl zeytun, Limon dilimləri, Sızma zeytun yağı',
    price: 4.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786602937/ChatGPT_Image_13_A%C4%9Fu_2026_10_32_43_xbzksb.png',
    prepTime: '3 dəq'
  },
  {
    id: 'qa-5',
    name: 'Qatıq (Gildə)',
    category: 'qelyanaltilar',
    description: 'Gil saxsı qabda təbii kənd qatığı',
    ingredients: 'Təbii xalis kənd qatığı',
    price: 1.20,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786602953/ChatGPT_Image_13_A%C4%9Fu_2026_10_29_34_avhp8v.png',
    prepTime: '2 dəq'
  },
  {
    id: 'qa-6',
    name: 'Tərəvəz Buketi',
    category: 'qelyanaltilar',
    description: 'Təzə xiyar, pomidor, turp, qırmızı bibər və tər göyərti buketi',
    ingredients: 'Xiyar, Pomidor, Reyhan, Keşniş, Göy soğan, Turp',
    price: 3.00,
    image: 'https://res.cloudinary.com/dq8xegykm/image/upload/v1786602907/ChatGPT_Image_13_A%C4%9Fu_2026_10_32_35_bqledm.png',
    prepTime: '5 dəq'
  },

  // ==================== 11. DESERTLƏR ====================
  {
    id: 'des-1',
    name: 'Türk Paxlavası Qozlu',
    category: 'desertler',
    description: 'Xırçıltılı nazik yufka qatları arasında bol qoz ləpəsi və təbii şərbət',
    ingredients: 'Yufka, Qoz ləpəsi, Xüsusi şərbət, Kərə yağı',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'des-2',
    name: 'Türk Paxlavası Fıstıqlı',
    category: 'desertler',
    description: 'Qaziantep üsulu bol Antep fıstıqlı xırçıltılı Türk paxlavası',
    ingredients: 'Antep fıstığı, Yufka, Kərə yağı, Təbii şərbət',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'des-3',
    name: 'Havuç Dilim',
    category: 'desertler',
    description: 'Böyük dilim Antep fıstıqlı havuç dilim paxlava',
    ingredients: 'Antep fıstığı, Yufka, Kərə yağı, Şərbət',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'des-4',
    name: 'Milli Paxlava',
    category: 'desertler',
    description: 'Ənənəvi ev üsulu qozlu Azərbaycan paxlavası, zəfəranlı şərbətlə',
    ingredients: 'Qoz ləpəsi, Zəfəran, Xəmiri, Şərbət, Kərə yağı',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'des-5',
    name: 'San Sebastian',
    category: 'desertler',
    description: 'İspan üsulu kremsi yanmış karamelizə San Sebastian cheesecake',
    ingredients: 'Krem pendir, Təbii qaymaq, Yumurta, Şokolad sousu',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'des-6',
    name: 'Cheesecake',
    category: 'desertler',
    description: 'Zərif çiyələk və ya giləmeyvə souslu kremsi klassik cheesecake',
    ingredients: 'Krem pendir, Biskvit tabanı, Çiyələk topping',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'des-7',
    name: 'Tiramisu',
    category: 'desertler',
    description: 'İtalyan resepti: Kofe şərbətli Savoiardi biskviti və Maskarpone kremi',
    ingredients: 'Maskarpone, Espresso kofe, Kakao, Savoiardi',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'des-8',
    name: 'Tralisə',
    category: 'desertler',
    description: 'Üç növ süd şərbəti ilə isladılmış yumşaq biskvit və karamel sousu',
    ingredients: 'Biskvit, Üç növ süd şərbəti, Karamel sousu',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'des-9',
    name: 'Künəfə',
    category: 'desertler',
    description: 'İsti fırından çıxan ərimiş pendirli və şərbətli xırçıltılı Antep kədəifi',
    ingredients: 'Tel kadayıf, Xüsusi künəfə pendiri, Şərbət, Antep fıstığı',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '10 dəq'
  },
  {
    id: 'des-10',
    name: 'Sütlac',
    category: 'desertler',
    description: 'Fırında üzəri qızardılmış kremsi ənənəvi sütlaç',
    ingredients: 'Xalis süd, Düyü, Vanil, Qızardılmış karamel üzlük',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'des-11',
    name: 'Şokoladlı Waffle',
    category: 'desertler',
    description: 'İsti xırçıltılı waffle, bol Nutella şokoladı və bəzək sousu',
    ingredients: 'Təzə waffle, Nutella şokolad, Qoz, Biskvit qırıntıları',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=800',
    prepTime: '10 dəq'
  },
  {
    id: 'des-12',
    name: 'Meyvəli Waffle',
    category: 'desertler',
    description: 'Təzə banan, çiyələk, kivi və şokoladlı ləzzətli meyvəli waffle',
    ingredients: 'Waffle, Çiyələk, Banan, Kivi, Şokolad sousu',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '10 dəq'
  },
  {
    id: 'des-13',
    name: 'Ballı Tort',
    category: 'desertler',
    description: 'Təbii bal qatları və zərif kremli ənənəvi ballı tort',
    ingredients: 'Təbii bal, Biskvit qatları, Zərif krem',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'des-19',
    name: 'Dondurma',
    category: 'desertler',
    description: 'Sərinlədici təbii dondurma çeşidləri (Çiyələkli, Şokoladlı, Vanilli)',
    ingredients: 'Süd, Qaymaq, Təbii vanil / çiyələk / kakao',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=800',
    variants: [
      { name: 'Çiyələkli', price: 3.00 },
      { name: 'Şokoladlı', price: 3.00 },
      { name: 'Vanilli', price: 3.00 }
    ],
    prepTime: '3 dəq'
  },
  {
    id: 'des-15',
    name: 'Əncir Mürəbbəsi',
    category: 'desertler',
    description: 'Təbii kənd əncirindən hazırlanan ətirli ev mürəbbəsi',
    ingredients: 'Təzə əncir, Şəkər şərbəti, Qoz ləpəsi',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 dəq'
  },
  {
    id: 'des-16',
    name: 'Çiyələk Mürəbbəsi',
    category: 'desertler',
    description: 'Şirin təzə çiyələk giləmeyvələrindən bişirilmiş ətirli mürəbbə',
    ingredients: 'Təzə çiyələk, Şəkər',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 dəq'
  },
  {
    id: 'des-17',
    name: 'Ağ Gilas Mürəbbəsi',
    category: 'desertler',
    description: 'Qoz ləpəli ağ gilas mürəbbəsi',
    ingredients: 'Ağ gilas, Qoz ləpəsi, Şəkər şərbəti',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 dəq'
  },
  {
    id: 'des-18',
    name: 'Ananas Mürəbbəsi',
    category: 'desertler',
    description: 'Eksotik ananas dilimlərindən hazırlanan xüsusi mürəbbə',
    ingredients: 'Ananas dilimləri, Şəkər şərbəti',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 dəq'
  },
  {
    id: 'des-14',
    name: 'Qarışıq Çərəz',
    category: 'desertler',
    description: 'Seçilmiş təzə qoz, fındıq, badam, fıstıq və kişmiş assortisi',
    ingredients: 'Qoz, Fındıq, Badam, Antep fıstığı, Kişmiş',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 dəq'
  },

  // ==================== 12. KOFE ====================
  {
    id: 'kof-1',
    name: 'Espresso',
    category: 'kofe',
    description: 'Təzə çəkilmiş 100% Arabika dənələrindən tünd zəngin İtalyan espresso',
    ingredients: 'Arabika kofe dənələri, Qaynar su',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '3 dəq'
  },
  {
    id: 'kof-2',
    name: 'Amerikano',
    category: 'kofe',
    description: 'Zərif dadlı klassik espresso və isti su balansı',
    ingredients: 'Espresso shot, İsti su',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 dəq'
  },
  {
    id: 'kof-3',
    name: 'Latte',
    category: 'kofe',
    description: 'Zərif buxarlanmış süd və kremsi köpüklü espresso',
    ingredients: 'Espresso shot, Buxarlanmış xalis süd, Süd köpüyü',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'kof-4',
    name: 'Kappuçino',
    category: 'kofe',
    description: 'Bərabər nisbətdə espresso, isti süd və sıx kadife süd köpüyü',
    ingredients: 'Espresso, Buxarlanmış süd, Qalın süd köpüyü',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'kof-5',
    name: 'Raf',
    category: 'kofe',
    description: 'Qaymaq, vanil şəkəri və espressonun birgə buxarlanmasından yaranan yumşaq Raf kofe',
    ingredients: 'Espresso, Təbii qaymaq, Vanil şəkəri',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'kof-6',
    name: 'Mokka',
    category: 'kofe',
    description: 'Espresso, tünd şokolad sousu, buxarlanmış süd və qaymaq köpüyü',
    ingredients: 'Espresso, Şokolad sousu, Süd, Krem qaymaq',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'kof-7',
    name: 'İspan Kappuçinosu',
    category: 'kofe',
    description: 'Qatılaşdırılmış şirin süd, espresso və darçın ətirli kapuçino',
    ingredients: 'Espresso, Qatılaşdırılmış süd, Süd köpüyü, Darçın',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'kof-8',
    name: 'İsti Şokolad',
    category: 'kofe',
    description: 'Kreativ kremsi isti Belçika şokoladı',
    ingredients: 'Əridilmiş Belçika şokoladı, Süd, Vanil',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'kof-caylar',
    name: 'Çaylar',
    category: 'kofe',
    description: 'Ətirli çay çeşidləri və dəstgah (seçim üçün tıklayın)',
    ingredients: 'Lənkəran çayı, Kəklikotu, Jasmin, Meyvə qurusu',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    variants: [
      { name: '1 Fincan Çay', price: 1.00 },
      { name: 'Sadə Çay', price: 3.00 },
      { name: 'Limonlu Çay', price: 5.00 },
      { name: 'Qarışıq Çay', price: 5.00 },
      { name: 'Yaşıl Çay', price: 5.00 },
      { name: 'Jasmin Çay', price: 5.00 },
      { name: 'Meyvəli Çay', price: 6.00 },
      { name: 'Çay Dəstgahı', price: 20.00 }
    ],
    prepTime: '5 dəq'
  },

  // ==================== 13. KOKTEYL ====================
  {
    id: 'kok-1',
    name: 'Moxito',
    category: 'kokteyl',
    description: 'Təzə nanə yarpaqları, laym dilimləri, sprite və buzlu sərinləşdirici klasik Moxito',
    ingredients: 'Təzə nanə, Laym, Şəkər şərbəti, Qazlı su, Buz',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'kok-2',
    name: 'Miks Şeyk',
    category: 'kokteyl',
    description: 'Qaymaqlı dondurma, süd, banan və çiyələk şəkilli zəngin mikşeyk',
    ingredients: 'Dondurma, Xalis süd, Meyvə püresi, Şokolad dənələri',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'kok-3',
    name: 'Nira Kokteyl',
    category: 'kokteyl',
    description: 'Alov imzalı eksotik meyvə şirələri, passion fruit, blue curacao və təzə meyvə dilimləri',
    ingredients: 'Eksotik meyvə şirələri, Passion fruit, Laym, Buz',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  }
];
