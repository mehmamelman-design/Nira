import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // ==================== 1. FAST FOOD ====================
  {
    id: 'ff-1',
    name: 'BEEF BURGER',
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
    name: 'CHEESE BURGER',
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
    name: 'TOYUQ BURGER',
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
    name: 'NİRA BURGER DOUBLE',
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
    id: 'ff-5',
    name: 'NUGGETS 5ƏDƏD',
    category: 'fastfood',
    description: 'Qızılı xırçıltılı panko panerovkasında 5 ədəd təzə toyuq naggetsi',
    ingredients: 'Toyuq file, Çıtır panerovka, Barbekyu və ya Sarımsaq sousu',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '8-10 dəq'
  },
  {
    id: 'ff-6',
    name: 'KARTOF FRİ',
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
    name: 'TOYUQ CHICKEN CRISPY',
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
    name: 'SENDVİÇ',
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
    name: 'CLUB SENDVİÇ',
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
    name: 'TOST SADƏ',
    category: 'fastfood',
    description: 'Qızardılmış tost çörəyi arasında bol ərimiş kaşar pendiri',
    ingredients: 'Tost çörəyi, Kaşar pendiri, Kərə yağı',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'ff-11',
    name: 'TOST SUCUQLU',
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
    name: 'HOT-DOG',
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
    name: 'KOL BÖREK',
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
    name: 'MARQARİTTA PİZZA',
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
    name: 'TOYUQ PİZZA',
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
    name: 'SUCUQLU PİZZA',
    category: 'pizza',
    description: 'Ədviyyatlı halal sucuq dilimləri, xüsusi pomidor sousu və bolMozzarella',
    ingredients: 'Pizza xəmiri, Halal sucuq, Mozzarella, Pomidor sousu, Zeytun',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'pz-4',
    name: 'SOSİSLİ PİZZA',
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
    name: 'PEPPERONİ PİZZA',
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
    name: 'QARIŞIQ PİZZA',
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
    name: 'GÖBƏLƏK PİZZA',
    category: 'pizza',
    description: 'Təzə şampinyon göbələkləri, fesleğen, sarımsaq yağı və ərimiş Mozzarella',
    ingredients: 'Pizza xəmiri, Şampinyon göbələk, Mozzarella, Fesleğen, Sarımsaq yağı',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=800',
    prepTime: '15-20 dəq'
  },

  // ==================== PİDƏ ====================
  {
    id: 'pd-1',
    name: 'PİDƏ SADƏ PENDİRLİ',
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
    name: 'PİDƏ QIYMƏLİ',
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
    name: 'PİDƏ QIYMƏLİ PENDİRLİ',
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
    name: 'PİDƏ TİKƏ ƏTLİ (KUŞBAŞILI)',
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
    name: 'PİDƏ TİKƏ ƏTLİ PENDİRLİ',
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
    name: 'PİDƏ SUCUQLU PENDİRLİ',
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
    name: 'PİDƏ QARIŞIQ (ALOV SPECIAL)',
    category: 'pide',
    description: 'Hər şeydən bol: Kuşbaşı dana əti, qiymə, sucuq, göbələk və iki qat kaşar pendiri',
    ingredients: 'Kuşbaşı ət, Qiymə, Sucuq, Göbələk, Kaşar pendiri, Kərə yağı',
    price: 11.00,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '15 dəq'
  },
  {
    id: 'kb-1',
    name: 'ADANA KABAB',
    category: 'kabablar',
    description: 'Xüsusi acılı dana və quzu ətindən manqalda közdə bişən ənənəvi Adana lüləsi',
    ingredients: 'Dana əti, Quzu əti, Pul bibər, Quyruq yağı, Lavaş, Közlənmiş pomidor və bibər',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isSpicy: true,
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'kb-2',
    name: 'QUZU KABAB',
    category: 'kabablar',
    description: 'Təzə körpə quzu ətindən manqal közündə bişirilmiş yumşaq tikə kabab',
    ingredients: 'Körpə quzu əti, Marinad, Közlənmiş pomidor, Biber, Lavaş, Soğan',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'kb-3',
    name: 'TOYUQ FİLE',
    category: 'kabablar',
    description: 'Xüsusi sousda marinad olunmuş şirəli toyuq file tikələri kababı',
    ingredients: 'Toyuq file, Qatıq marinadı, Ədviyyatlar, Közlənmiş tərəvəzlər',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '12-15 dəq'
  },
  {
    id: 'kb-4',
    name: 'QUZU PİRZOLA',
    category: 'kabablar',
    description: 'Manqal közündə xüsusi otlarla bişirilmiş quzu pirzolası (antrekot)',
    ingredients: 'Quzu pirzola, Biberiye, Zeytun yağı, Közlənmə pomidor və bibər',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'kb-5',
    name: 'TƏRƏVƏZ KABABİ',
    category: 'kabablar',
    description: 'Közdə bişmiş təzə badımcan, pomidor, acı bibər və göbələk şişi',
    ingredients: 'Badımcan, Pomidor, Biber, Göbələk, Sarımsaqlı kərə yağı',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&q=80&w=800',
    prepTime: '10-12 dəq'
  },
  {
    id: 'kb-6',
    name: 'CİYƏR KABABİ',
    category: 'kabablar',
    description: 'Közdə quyruq yağı ilə növbəli şişə çəkilmiş təzə quzu ciyəri',
    ingredients: 'Quzu ciyəri, Quyruq yağı, Sumaq soğan, Lavaş',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '10-12 dəq'
  },
  {
    id: 'kb-7',
    name: 'TOYUQ QANAD',
    category: 'kabablar',
    description: 'Acılı-şirin sousda marinad olunub közə verilmiş xırçıltılı toyuq qanadları',
    ingredients: 'Toyuq qanadı, Xüsusi acılı marinad, Közlənmə biber',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '12-15 dəq'
  },
  {
    id: 'kb-8',
    name: 'LÜLƏ KABAB',
    category: 'kabablar',
    description: 'Ənənəvi reseptlə çəkilmiş dana və quzu ətindən yumşaq lülə kabab',
    ingredients: 'Çəkilmiş Dana və Quzu əti, Soğan, Ədviyyat, Lavaş, Sumaq',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '15 dəq'
  },
  {
    id: 'kb-9',
    name: 'DANA BASDIRMA',
    category: 'kabablar',
    description: 'Soğan və reyhan sousunda marinad olunmuş yumşaq dana can əti kababı',
    ingredients: 'Dana can əti, Soğan suyu, Reyhan, Ədviyyat, Lavaş',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'kb-10',
    name: 'TOYUQ BUD',
    category: 'kabablar',
    description: 'Közdə nar kimi qızarmış şirəli toyuq bud kababı',
    ingredients: 'Toyuq budu, Tomatlı marinad, Közlənmiş pomidor',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '15 dəq'
  },

  // ==================== 4. İSTİ YEMƏKLƏR ====================
  {
    id: 'iy-1',
    name: 'SAC DANA',
    category: 'isti_yemekler',
    description: 'İsti sac üzərində dana əti, kartof, badımcan, bibər, pomidor və xüsusi kərə yağı',
    ingredients: 'Dana əti, Kartof, Badımcan, Bibər, Pomidor, Soğan, Kərə yağı, Sac lavaşı',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '20-25 dəq'
  },
  {
    id: 'iy-2',
    name: 'SAC QUZU',
    category: 'isti_yemekler',
    description: 'Cızda-cız isti sacda körpə quzu əti, xüsusi ədviyyatlar və təzə tərəvəzlər',
    ingredients: 'Quzu əti, Sac tərəvəzləri, Kərə yağı, Xüsusi ədviyyat, İsti lavaş',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '20-25 dəq'
  },
  {
    id: 'iy-3',
    name: 'SAC TOYUQ',
    category: 'isti_yemekler',
    description: 'Sacda qızardılmış təzə toyuq əti, xırçıltılı kartof dilimləri və tərəvəzlər',
    ingredients: 'Toyuq əti, Kartof, Biber, Pomidor, Kərə yağı, Lavaş',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '20 dəq'
  },
  {
    id: 'iy-4',
    name: 'VİŞNƏLİ CAN ƏTİ',
    category: 'isti_yemekler',
    description: 'Şirin-turş təbii vişnə sousunda bişirilmiş yumşaq dana can əti dilimləri',
    ingredients: 'Dana can əti, Təbii vişnə sousu, Kərə yağı, Biberiye',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'iy-5',
    name: 'CAN ƏTİ ZOĞAL TURŞU',
    category: 'isti_yemekler',
    description: 'Milli zoğal turşusu sousunda sotelənmiş yumşaq dana can əti',
    ingredients: 'Dana can əti, Ev üsulu zoğal turşusu, Soğan, Kərə yağı',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '15-20 dəq'
  },
  {
    id: 'iy-6',
    name: 'QAYMAQ+GÖBƏLƏK+TOYUQ',
    category: 'isti_yemekler',
    description: 'Nəfis qaymaq sousunda sotelənmiş toyuq file və təzə şampinyon göbələk',
    ingredients: 'Toyuq file, Qaymaq, Şampinyon göbələk, Sarımsaq, Ədviyyat',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '15 dəq'
  },
  {
    id: 'iy-7',
    name: 'LANGET ƏT',
    category: 'isti_yemekler',
    description: 'Xüsusi tavada incə döyülmüş dana langeti, yanında fri kartof ilə',
    ingredients: 'Dana əti langeti, Fri kartof, Təzə salat, Sous',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '12-15 dəq'
  },
  {
    id: 'iy-8',
    name: 'LANGET TOYUQ',
    category: 'isti_yemekler',
    description: 'Tavada qızardılmış incə toyuq langeti, kartof fri və qarnir ilə',
    ingredients: 'Toyuq langeti, Kartof fri, Tərəvəz qarniri',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '12-15 dəq'
  },
  {
    id: 'iy-9',
    name: 'FAXİTOS ƏT',
    category: 'isti_yemekler',
    description: 'Meksika üsulu cızıldayan tavada dana əti şeritləri, rəngli bibərlər və souslar',
    ingredients: 'Dana əti, Rəngli bibər, Soğan, Meksika ədviyyatları, Lavaş',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isHalal: true,
    prepTime: '15-18 dəq'
  },
  {
    id: 'iy-10',
    name: 'FAXİTOS TOYUQ',
    category: 'isti_yemekler',
    description: 'Sotelənmiş toyuq şeritləri, acılı-şirin bibərlər və tortilla lavaşı',
    ingredients: 'Toyuq file, Biberlər, Soğan, Fajita ədviyyatı, Tortilla',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '15 dəq'
  },

  // ==================== 5. SOYUQ İÇKİLƏR ====================
  {
    id: 'ic-cola',
    name: 'COLA',
    category: 'icikil',
    description: 'Buz kimi sərinləşdirici Coca-Cola (seçim üçün tıklayın)',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    variants: [
      { name: '0.5L', price: 1.50 },
      { name: '1L', price: 2.50 },
      { name: 'Banka', price: 2.20 },
      { name: 'Şüşə', price: 2.50 }
    ]
  },
  {
    id: 'ic-fanta',
    name: 'FANTA',
    category: 'icikil',
    description: 'Portağal aromalı sərinləşdirici Fanta (seçim üçün tıklayın)',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    variants: [
      { name: '0.5L', price: 1.50 },
      { name: '1L', price: 2.50 },
      { name: 'Banka', price: 2.20 }
    ]
  },
  {
    id: 'ic-sprite',
    name: 'SPRITE',
    category: 'icikil',
    description: 'Limon və laym dadlı sərinləşdirici Sprite (seçim üçün tıklayın)',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&q=80&w=800',
    variants: [
      { name: '0.5L', price: 1.50 },
      { name: '1L', price: 2.00 },
      { name: 'Banka', price: 2.20 }
    ]
  },
  {
    id: 'ic-sirab',
    name: 'SİRAB',
    category: 'icikil',
    description: 'Təbii mineral Sirab suyu (seçim üçün tıklayın)',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&q=80&w=800',
    variants: [
      { name: '0.5L Qazlı Şüşə', price: 2.00 },
      { name: '0.5L Şüşə', price: 2.00 }
    ]
  },
  {
    id: 'ic-ayran',
    name: 'AYRAN',
    category: 'icikil',
    description: 'Sərinlədici təbii ev ayranı (seçim üçün tıklayın)',
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
    name: 'ÇEŞMƏ',
    category: 'icikil',
    description: 'Təbii çeşmə bulaq suyu (seçim üçün tıklayın)',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&q=80&w=800',
    variants: [
      { name: '0.5L Qazsız (Qazlı)', price: 1.50 },
      { name: '0.7L Qazsız (Qazlı)', price: 2.00 }
    ]
  },
  {
    id: 'ic-qizilquyu',
    name: 'QIZIL QUYU',
    category: 'icikil',
    description: 'Xüsusi milli limonad çeşidləri (seçim üçün tıklayın)',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    variants: [
      { name: '0.5L Lemon', price: 2.00 },
      { name: '0.5L Tərxun', price: 2.00 },
      { name: '0.5L Düşəs', price: 2.00 },
      { name: '0.5L Qızıl Gül', price: 2.00 },
      { name: '0.7L Lemon', price: 2.50 },
      { name: '0.7L Düşəs', price: 2.50 },
      { name: '0.7L Tərxun', price: 2.50 },
      { name: '0.7L Qızıl Gül', price: 2.50 }
    ]
  },
  {
    id: 'ic-meyvesiresi',
    name: 'MEYVƏ ŞİRƏSİ',
    category: 'icikil',
    description: 'Təbii meyvə şirəsi və fresh şirələr (seçim üçün tıklayın)',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    variants: [
      { name: '0.5L', price: 2.50 },
      { name: '1L Meyvə Şirəsi', price: 4.00 },
      { name: 'Fresh', price: 6.00 }
    ]
  },
  {
    id: 'ic-kompotlar',
    name: 'KOMPOTLAR',
    category: 'icikil',
    description: 'Təbii ev üsulu hazırlanan kompotlar (seçim üçün tıklayın)',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    variants: [
      { name: 'Heyva Kompotu', price: 3.00 },
      { name: 'Vişnə Kompotu', price: 3.00 },
      { name: 'Zoğal Kompotu', price: 3.00 },
      { name: 'Feyxoa Kompotu', price: 3.00 }
    ]
  },
  {
    id: 'ic-coplu',
    name: 'ÇÖPLÜ SOK',
    category: 'icikil',
    description: 'Uşaqlar üçün çöp borulu meyvə şirəsi (0.2L)',
    price: 1.00,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800',
    variants: [
      { name: '0.2L', price: 1.00 }
    ]
  },

  // ==================== 6. ŞORBALAR ====================
  {
    id: 'sb-1',
    name: 'MƏRCİ',
    category: 'sorbalar',
    description: 'Klassik Türk üsulu qırmızı mərcimək şorbası, krutonlar və limon ilə',
    ingredients: 'Qırmızı mərcimək, Kərə yağı, Quru nanə, Kruton çörək, Limon',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5-8 dəq'
  },
  {
    id: 'sb-2',
    name: 'TOMAT ŞORBA',
    category: 'sorbalar',
    description: 'İtalyan üsulu təzə pomidor şorbası, üzərində rendələnmiş kaşar pendiri ilə',
    ingredients: 'Təzə pomidor, Qaymaq, Kaşar pendiri, Fesleğen, Kruton',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    prepTime: '5-8 dəq'
  },
  {
    id: 'sb-3',
    name: 'GÖBƏLƏK ŞORBA',
    category: 'sorbalar',
    description: 'Qaymaqlı şampinyon göbələk şorbası, təzə göyərti və çörək qızartması ilə',
    ingredients: 'Şampinyon göbələk, Qaymaq, Kərə yağı, Sarımsaq, Kruton',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '8-10 dəq'
  },
  {
    id: 'sb-4',
    name: 'TOYUQ ŞORBA',
    category: 'sorbalar',
    description: 'Ev üsulu şəffaf toyuq bulyonu şorbası, tel şehriye və göyərtilər ilə',
    ingredients: 'Kənd toyuğu bulyonu, Tel şehriye, Yerkökü, Göyərti, Limon',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '5-8 dəq'
  },

  // ==================== 7. SALAT ====================
  {
    id: 'sl-1',
    name: 'PAYTAXT SALATI',
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
    name: 'MİMOZA SALATI',
    category: 'salat',
    description: 'Qat-qat yumşaq salat: Toyuq file, kartof, yerkökü, pendir, yumurta və mayonez',
    ingredients: 'Toyuq file, Kartof, Yerkökü, Holland pendiri, Yumurta, Mayonez',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'sl-3',
    name: 'XIRT-XIRT BADIMCAN SALATI',
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
    name: 'SEZAR TOYUQ SALATI',
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
    name: 'SEZAR KREVETKA SALATI',
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
    name: 'ÇOBAN SALATI',
    category: 'salat',
    description: 'Təzə xiyar, pomidor, göyərtilər, qırmızı soğan, zeytun yağı və limon sousu',
    ingredients: 'Xiyar, Pomidor, Keşniş, Şüyüd, Qırmızı soğan, Zeytun yağı, Limon',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'sl-7',
    name: 'MANQAL SALATI',
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
    name: 'YUNAN SALATI',
    category: 'salat',
    description: 'Iri doğranmış xiyar, pomidor, Feta pendiri, qara zeytun, kekik və zeytun yağı',
    ingredients: 'Feta pendiri, Qara zeytun, Pomidor, Xiyar, Şirin bibər, Oreqano',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },

  // ==================== 8. ÇİY KÖFTƏ ====================
  {
    id: 'ck-1',
    name: 'ÇİY KÖFTƏ',
    category: 'cig_kofte',
    description: 'Xüsusi Adıyaman üsulu ədviyyatlı bulqur çiy köftəsi, limanad və nar şərabı ilə',
    ingredients: 'Ədviyyatlı bulqur, İsot bibəri, Nar şərabı, Kahı, Limon',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isSpicy: true,
    prepTime: '5 dəq'
  },
  {
    id: 'ck-2',
    name: 'ÇİY KÖFTƏ ROLL',
    category: 'cig_kofte',
    description: 'Lavaş çörəyində çiy köftə, çıtır marul, doritos, turşu və nar sousu dürümü',
    ingredients: 'Çiy köftə, Lavaş, Marul, Turşu xiyar, Doritos çıtırı, Nar şərabı',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isSpicy: true,
    prepTime: '5 dəq'
  },
  {
    id: 'ck-3',
    name: 'ÇİY KÖFTƏ SET',
    category: 'cig_kofte',
    description: 'Böyük porsiya çiy köftə seti: 500q çiy köftə, bol lavaş, təzə yeşilliklər və souslar',
    ingredients: '500q Çiy köftə, 4 ədəd Lavaş, Təzə marul, Limon, Nar şərabı sousu',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    isSpicy: true,
    prepTime: '5-8 dəq'
  },

  // ==================== 9. QƏLYANALTILAR ====================
  {
    id: 'qa-1',
    name: 'PENDİR ASSORTİ',
    category: 'qelyanaltilar',
    description: 'Seçilmiş milli və xarici pendirlər növü: Motol, Qorqonzola, Holland və Feta',
    ingredients: 'Motol pendiri, Holland pendiri, Feta, Ağ pendir, Qoz ləpəsi',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'qa-2',
    name: 'KOLBASA ASSORTİ',
    category: 'qelyanaltilar',
    description: 'Halal ət məhsullarından hazırlanmış kolbasa və sucuq dilimləri tabağı',
    ingredients: 'Halal Servelat, Dudlaşdırılmış ət, Sucuq dilimləri, Zeytun',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    isHalal: true,
    prepTime: '5 dəq'
  },
  {
    id: 'qa-3',
    name: 'ZEYTUN',
    category: 'qelyanaltilar',
    description: 'İspaniya və Yunanıstandan seçilmiş yaşıl və qara zeytunlar',
    ingredients: 'Qara zeytun, Yaşıl zeytun, Zeytun yağı, Kekik',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 dəq'
  },
  {
    id: 'qa-4',
    name: 'ZEYTUN LİMON ASSORTİ',
    category: 'qelyanaltilar',
    description: 'Limon dilimləri və kekik yağlı marinad olunmuş böyük zeytunlar',
    ingredients: 'Doldurulmuş yaşıl zeytun, Limon dilimləri, Sızma zeytun yağı',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 dəq'
  },
  {
    id: 'qa-5',
    name: 'QATIQ SAXSI',
    category: 'qelyanaltilar',
    description: 'Saxsı qabda təbii kənd qatığı',
    ingredients: 'Təbii xalis kənd qatığı',
    price: 1.20,
    image: 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&q=80&w=800',
    prepTime: '2 dəq'
  },
  {
    id: 'qa-6',
    name: 'TƏRƏVƏZ BUKETİ',
    category: 'qelyanaltilar',
    description: 'Təzə xiyar, pomidor, turp, qırmızı bibər və tər göyərti buketi',
    ingredients: 'Xiyar, Pomidor, Reyhan, Keşniş, Göy soğan, Turp',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },

  // ==================== 10. DESERTLƏR ====================
  {
    id: 'des-1',
    name: 'TÜRK PAXLAVASI QOZLU',
    category: 'desertler',
    description: 'Xırçıltılı nazik yufka qatları arasında bol qoz ləpəsi və təbii şərbət',
    ingredients: 'Yufka, Qoz ləpəsi, Xüsusi şərbət, Kərə yağı',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'des-2',
    name: 'TÜRK PAXLAVASI FISTIQLI',
    category: 'desertler',
    description: 'Qaziantep üsulu bol Antep fıstıqlı xırçıltılı Türk paxlavası',
    ingredients: 'Antep fıstığı, Yufka, Kərə yağı, Təbii şərbət',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'des-3',
    name: 'HAVUÇ DİLİM',
    category: 'desertler',
    description: 'Böyük dilim Antep fıstıqlı havuç dilim paxlava',
    ingredients: 'Antep fıstığı, Yufka, Kərə yağı, Şərbət',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'des-4',
    name: 'MİLLİ PAXLAVA',
    category: 'desertler',
    description: 'Ənənəvi ev üsulu qozlu Azərbaycan paxlavası, zəfəranlı şərbətlə',
    ingredients: 'Qoz ləpəsi, Zəfəran, Xəmiri, Şərbət, Kərə yağı',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'des-5',
    name: 'SAN SEBASTİAN',
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
    name: 'CHEESECAKE',
    category: 'desertler',
    description: 'Zərif çiyələk və ya giləmeyvə souslu kremsi klassik cheesecake',
    ingredients: 'Krem pendir, Biskvit tabanı, Çiyələk topping',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'des-7',
    name: 'TİRAMİSU',
    category: 'desertler',
    description: 'İtalyan resepti: Kofe şərbətli Savoiardi biskviti və Maskarpone kremi',
    ingredients: 'Maskarpone, Espresso kofe, Kakao, Savoiardi',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'des-8',
    name: 'TRALİÇE',
    category: 'desertler',
    description: 'Üç növ süd şərbəti ilə isladılmış yumşaq biskvit və karamel sousu',
    ingredients: 'Biskvit, Üç növ süd şərbəti, Karamel sousu',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'des-9',
    name: 'KÜNƏFƏ 1N',
    category: 'desertler',
    description: 'İsti fırından çıxan ərimiş pendirli və şərbətli xırçıltılı Antep kədəifi',
    ingredients: 'Tel kadayıf, Xüsusi künəfə pendiri, Şərbət, Antep fıstığı',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '10 dəq'
  },
  {
    id: 'des-10',
    name: 'SÜTLAC',
    category: 'desertler',
    description: 'Fırında üzəri qızardılmış kremsi ənənəvi sütlaç',
    ingredients: 'Xalis süd, Düyü, Vanil, Qızardılmış karamel üzlük',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'des-11',
    name: 'WAFFLE ŞOKOLADLI',
    category: 'desertler',
    description: 'İsti xırçıltılı waffle, bol Nutella şokoladı və bəzək sousu',
    ingredients: 'Təzə waffle, Nutella şokolad, Qoz, Biskvit qırıntıları',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=800',
    prepTime: '10 dəq'
  },
  {
    id: 'des-12',
    name: 'WAFFLE MEYVƏLİ',
    category: 'desertler',
    description: 'Təzə banan, çiyələk, kivi və şokoladlı ləzzətli meyvəli waffle',
    ingredients: 'Waffle, Çiyələk, Banan, Kivi, Şokolad sousu',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '10 dəq'
  },
  {
    id: 'des-13',
    name: 'BALLI TORT',
    category: 'desertler',
    description: 'Təbii bal qatları və zərif kremli ənənəvi ballı tort',
    ingredients: 'Təbii bal, Biskvit qatları, Zərif krem',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'des-14',
    name: 'QARIŞIQ ÇƏRƏZ',
    category: 'desertler',
    description: 'Seçilmiş təzə qoz, fındıq, badam, fıstıq və kişmiş assortisi',
    ingredients: 'Qoz, Fındıq, Badam, Antep fıstığı, Kişmiş',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 dəq'
  },
  {
    id: 'des-15',
    name: 'ƏNCİR MÜRƏBBƏSİ',
    category: 'desertler',
    description: 'Təbii kənd əncirindən hazırlanan ətirli ev mürəbbəsi',
    ingredients: 'Təzə əncir, Şəkər şərbəti, Qoz ləpəsi',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 dəq'
  },
  {
    id: 'des-16',
    name: 'ÇİYƏLƏK MÜRƏBBƏSİ',
    category: 'desertler',
    description: 'Şirin təzə çiyələk giləmeyvələrindən bişirilmiş ətirli mürəbbə',
    ingredients: 'Təzə çiyələk, Şəkər',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 dəq'
  },
  {
    id: 'des-17',
    name: 'AĞ GİLAS MÜRƏBBƏSİ',
    category: 'desertler',
    description: 'Qoz ləpəli ağ gilas mürəbbəsi',
    ingredients: 'Ağ gilas, Qoz ləpəsi, Şəkər şərbəti',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 dəq'
  },
  {
    id: 'des-18',
    name: 'ANANAS MÜRƏBBƏSİ',
    category: 'desertler',
    description: 'Eksotik ananas dilimlərindən hazırlanan xüsusi mürəbbə',
    ingredients: 'Ananas dilimləri, Şəkər şərbəti',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 dəq'
  },

  // ==================== 11. KOFE ====================
  {
    id: 'kof-1',
    name: 'ESPRESSO',
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
    name: 'AMERİCANO',
    category: 'kofe',
    description: 'Zərif dadlı klassik espresso və isti su balansı',
    ingredients: 'Espresso shot, İsti su',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
    prepTime: '3 dəq'
  },
  {
    id: 'kof-3',
    name: 'LATTE',
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
    name: 'CAPPUCINO',
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
    name: 'RAF',
    category: 'kofe',
    description: 'Qaymaq, vanil şəkəri və espressonun birgə buxarlanmasından yaranan yumşaq Raf kofe',
    ingredients: 'Espresso, Təbii qaymaq, Vanil şəkəri',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'kof-6',
    name: 'MOKKA',
    category: 'kofe',
    description: 'Espresso, tünd şokolad sousu, buxarlanmış süd və qaymaq köpüyü',
    ingredients: 'Espresso, Şokolad sousu, Süd, Krem qaymaq',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'kof-7',
    name: 'SPANİSH CAPPUCİNO',
    category: 'kofe',
    description: 'Qatılaşdırılmış şirin süd, espresso və darçın ətirli kapuçino',
    ingredients: 'Espresso, Qatılaşdırılmış süd, Süd köpüyü, Darçın',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },
  {
    id: 'kof-8',
    name: 'İSTİ ŞOKOLAD',
    category: 'kofe',
    description: 'Kreativ kremsi isti Belçika şokoladı',
    ingredients: 'Əridilmiş Belçika şokoladı, Süd, Vanil',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 dəq'
  },

  // ==================== 12. KOKTEYL ====================
  {
    id: 'kok-1',
    name: 'MOJİTO',
    category: 'kokteyl',
    description: 'Təzə nanə yarpaqları, laym dilimləri, sprays və buzlu sərinləşdirici klasik Mojito',
    ingredients: 'Təzə nanə, Laym, Şəkər şərbəti, Qazlı su, Buz',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'kok-2',
    name: 'MİX SHAKE',
    category: 'kokteyl',
    description: 'Qaymaqlı dondurma, süd, banana və çiyələk şəkilli zəngin miкşek',
    ingredients: 'Dondurma, Xalis süd, Meyvə püresi, Şokolad dənələri',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  },
  {
    id: 'kok-3',
    name: 'NİRA KOKTEYL',
    category: 'kokteyl',
    description: 'Alov imzalı eksotik meyvə şirələri, passion fruit, blue curacao və təzə meyvə dilimləri',
    ingredients: 'Eksotik meyvə şirələri, Passion fruit, Laym, Buz',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    prepTime: '5 dəq'
  }
];
