import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom'
import './index.css'

// Type for villa
interface Villa {
  id: number
  name: string
  location: string
  city: string
  country: string
  bedrooms: number
  bathrooms: number
  maxGuests: number
  size: number
  price: number
  rating: number
  reviewCount: number
  image: string
  images: string[]
  features: string[]
  description: string
  longDescription: string
  amenities: string[]
  included: string[]
  houseRules: string[]
  faq: { q: string; a: string }[]
  reviews: { name: string; date: string; rating: number; text: string; avatar: string }[]
  coordinates: { lat: number; lng: number }
}

// Language Context
type Language = 'en' | 'tr' | 'ar'
const translations = {
  en: {
    escapeTo: 'Escape to',
    paradise: 'Paradise',
    discover: "Discover the world's most exclusive private villas, where every moment becomes an unforgettable memory",
    villaEliteCollection: 'Villa Elite Collection',
    bookNow: 'Book Now',
    whereTo: 'Where to?',
    checkIn: 'Check In',
    checkOut: 'Check Out',
    addGuests: 'Add guests',
    scroll: 'Scroll',
    collection: 'Collection',
    experience: 'Experience',
    about: 'About',
    contact: 'Contact',
    signIn: 'Sign In',
    ourCollection: 'Our Collection',
    exceptionalVillas: 'Exceptional Villas',
    viewDetails: 'View Details',
    viewAllVillas: 'View All Villas',
    featured: 'Featured',
    beds: 'Beds',
    baths: 'Baths',
    theExperience: 'The Experience',
    beyondExpectations: 'Beyond Expectations',
    privateChef: 'Private Chef',
    privateChefDesc: 'Gourmet dining in the comfort of your villa',
    infinityPools: 'Infinity Pools',
    infinityPoolsDesc: 'Stunning views from every swimming pool',
    spaServices: 'Spa Services',
    spaServicesDesc: 'In-villa massage and wellness treatments',
    helicopterTransfers: 'Helicopter Transfers',
    helicopterDesc: 'Arrive in style with aerial transfers',
    wineCellars: 'Wine Cellars',
    wineCellarsDesc: 'Curated collections from local vineyards',
    homeCinema: 'Home Cinema',
    homeCinemaDesc: 'Private screenings under the stars',
    guestStories: 'Guest Stories',
    wordsOfPraise: 'Words of Praise',
    beginYourJourney: 'Begin Your Journey',
    findYourPerfectVilla: 'Find Your Perfect Villa',
    conciergeDesc: 'Our dedicated concierge team is available around the clock to assist with every detail of your stay, from airport transfers to private chef services.',
    concierge24: '24/7 Concierge',
    requestAvailability: 'Request Availability',
    curatedVillas: 'Curated Villas',
    destinations: 'Destinations',
    happyGuests: 'Happy Guests',
    satisfaction: 'Satisfaction',
    quickLinks: 'Quick Links',
    ourCollectionLink: 'Our Collection',
    experiences: 'Experiences',
    aboutUs: 'About Us',
    press: 'Press',
    careers: 'Careers',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    copyright: 'Villa Elite. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    search: 'Search',
    sendMessage: 'Send',
    typeMessage: 'Type your message...',
    chatWithAI: 'Chat with AI Assistant',
    callUs: 'Call Us',
    hurghadaWeather: 'Hurghada Weather',
    sun: 'Sun',
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    all: 'All',
    pool: 'Pool',
    seaView: 'Sea View',
    beach: 'Beach',
    amenities: 'Amenities',
    gallery: 'Gallery',
    description: 'Description',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    perNight: 'per night',
    guestReviews: 'Guest Reviews',
    backToCollection: 'Back to Collection',
    selectImage: 'Select Image',
    floorPlan: 'Floor Plan',
    location: 'Location',
    reviews: 'Reviews',
    similarVillas: 'Similar Villas',
    included: 'Included',
    viewFloorPlan: 'View Floor Plan',
    virtualTour: 'Virtual Tour',
    priceBreakdown: 'Price Breakdown',
    totalPrice: 'Total Price',
    serviceFee: 'Service Fee',
    taxes: 'Taxes',
    maxGuests: 'Max Guests',
    squareMeters: 'Square Meters',
    viewOnMap: 'View on Map',
    writeReview: 'Write a Review',
    faq: 'FAQ',
    cancellationPolicy: 'Cancellation Policy',
    houseRules: 'House Rules',
    whatGuestsSay: 'What Guests Say',
    overallRating: 'Overall Rating',
    cleanRating: 'Cleanliness',
    locationRating: 'Location',
    serviceRating: 'Service',
    valueRating: 'Value'
  },
  tr: {
    escapeTo: 'Kaçış',
    paradise: 'Cennet',
    discover: 'Dünyanın en özel özel villalarını keşfedin, her an unutulmaz bir anıya dönüşür',
    villaEliteCollection: 'Villa Elite Koleksiyonu',
    bookNow: 'Rezervasyon Yap',
    whereTo: 'Nereye?',
    checkIn: 'Giriş',
    checkOut: 'Çıkış',
    addGuests: 'Misafir ekle',
    scroll: 'Kaydır',
    collection: 'Koleksiyon',
    experience: 'Deneyim',
    about: 'Hakkımızda',
    contact: 'İletişim',
    signIn: 'Giriş Yap',
    ourCollection: 'Koleksiyonumuz',
    exceptionalVillas: 'Olağanüstü Villalar',
    viewDetails: 'Detayları Gör',
    viewAllVillas: 'Tüm Villaları Gör',
    featured: 'Öne Çıkan',
    beds: 'Yatak',
    baths: 'Banyo',
    theExperience: 'Deneyim',
    beyondExpectations: 'Beklentilerin Ötesinde',
    privateChef: 'Özel Aşçı',
    privateChefDesc: 'Villanızda gurme yemek',
    infinityPools: 'Sonsuz Havuzlar',
    infinityPoolsDesc: 'Her yüzme havuzundan büyüleyici manzaralar',
    spaServices: 'Spa Hizmetleri',
    spaServicesDesc: 'Villada masaj ve wellness tedavileri',
    helicopterTransfers: 'Helikopter Transferleri',
    helicopterDesc: 'Havadan şık bir şekilde ulaşın',
    wineCellars: 'Şarap Mahzenleri',
    wineCellarsDesc: 'Yerel üzüm bağlarından özenle seçilmiş koleksiyonlar',
    homeCinema: 'Ev Sineması',
    homeCinemaDesc: 'Yıldızlar altında özel gösterimler',
    guestStories: 'Misafir Hikayeleri',
    wordsOfPraise: 'Övgü Sözcükleri',
    beginYourJourney: 'Yolculuğunuza Başlayın',
    findYourPerfectVilla: 'Mükemmel Villanızı Bulun',
    conciergeDesc: 'Havalimanı transferlerinden özel aşçı hizmetlerine kadar konaklamanızın her detayında yardımcı olmak için gece gündüz hizmetinizdeyiz.',
    concierge24: '7/24 Konsiyerj',
    requestAvailability: 'Uygunluk Talep Et',
    curatedVillas: 'Özenle Seçilmiş Villalar',
    destinations: 'Destinasyon',
    happyGuests: 'Mutlu Misafirler',
    satisfaction: 'Memnuniyet',
    quickLinks: 'Hızlı Bağlantılar',
    ourCollectionLink: 'Koleksiyonumuz',
    experiences: 'Deneyimler',
    aboutUs: 'Hakkımızda',
    press: 'Basın',
    careers: 'Kariyer',
    email: 'E-posta',
    phone: 'Telefon',
    address: 'Adres',
    copyright: 'Villa Elite. Tüm hakları saklıdır.',
    privacyPolicy: 'Gizlilik Politikası',
    termsOfService: 'Kullanım Şartları',
    cookiePolicy: 'Çerez Politikası',
    search: 'Ara',
    sendMessage: 'Gönder',
    typeMessage: 'Mesajınızı yazın...',
    chatWithAI: 'AI Asistanı ile Sohbet',
    callUs: 'Bizi Arayın',
    hurghadaWeather: 'Hurghada Hava Durumu',
    sun: 'Paz',
    mon: 'Pzt',
    tue: 'Sal',
    wed: 'Çar',
    thu: 'Per',
    fri: 'Cum',
    sat: 'Cmt',
    lightMode: 'Aydınlık Mod',
    darkMode: 'Karanlık Mod',
    all: 'Tümü',
    pool: 'Havuz',
    seaView: 'Deniz Manzarası',
    beach: 'Plaj',
    amenities: 'Olanaklar',
    gallery: 'Galeri',
    description: 'Açıklama',
    bedrooms: 'Yatak Odası',
    bathrooms: 'Banyo',
    perNight: 'gece',
    guestReviews: 'Misafir Yorumları',
    backToCollection: 'Koleksiyona Dön',
    selectImage: 'Görsel Seç',
    floorPlan: 'Kat Planı',
    location: 'Konum',
    reviews: 'Yorumlar',
    similarVillas: 'Benzer Villalar',
    included: 'Dahil',
    viewFloorPlan: 'Kat Planını Gör',
    virtualTour: 'Sanal Tur',
    priceBreakdown: 'Fiyat Detayı',
    totalPrice: 'Toplam Fiyat',
    serviceFee: 'Servis Ücreti',
    taxes: 'Vergiler',
    maxGuests: 'Maksimum Misafir',
    squareMeters: 'Metrekare',
    viewOnMap: 'Haritada Gör',
    writeReview: 'Yorum Yaz',
    faq: 'SSS',
    cancellationPolicy: 'İptal Politikası',
    houseRules: 'Ev Kuralları',
    whatGuestsSay: 'Misafirler Ne Diyor',
    overallRating: 'Genel Puan',
    cleanRating: 'Temizlik',
    locationRating: 'Konum',
    serviceRating: 'Hizmet',
    valueRating: 'Değer'
  },
  ar: {
    escapeTo: 'اهرب إلى',
    paradise: 'الجنة',
    discover: 'اكتشف أجمل الفيلات الخاصة الحصرية في العالم، حيث يتحول كل لحظة إلى ذكرى لا تُنسى',
    villaEliteCollection: 'مجموعة فيلا إيليت',
    bookNow: 'احجز الآن',
    whereTo: 'إلى أين؟',
    checkIn: 'تاريخ الوصول',
    checkOut: 'تاريخ المغادرة',
    addGuests: 'أضف ضيوف',
    scroll: 'تمرير',
    collection: 'المجموعة',
    experience: 'التجربة',
    about: 'عنّا',
    contact: 'اتصل بنا',
    signIn: 'تسجيل الدخول',
    ourCollection: 'مجموعتنا',
    exceptionalVillas: 'فيلات استثنائية',
    viewDetails: 'عرض التفاصيل',
    viewAllVillas: 'عرض جميع الفيلات',
    featured: 'مميز',
    beds: 'غرف نوم',
    baths: 'حمامات',
    theExperience: 'التجربة',
    beyondExpectations: 'ما وراء التوقعات',
    privateChef: 'طباخ خاص',
    privateChefDesc: 'وجبات طعام راقية في فيلتك',
    infinityPools: 'حمامات سباحة لا نهائية',
    infinityPoolsDesc: 'مناظر خلابة من كل حمام سباحة',
    spaServices: 'خدمات السبا',
    spaServicesDesc: 'تدليك وعلاجات صحية في الفيلا',
    helicopterTransfers: 'نقل بالطائرة',
    helicopterDesc: 'وصل بأسلوب مع رحلة جوية',
    wineCellars: 'قاعات النبيذ',
    wineCellarsDesc: 'مجموعات مختارة من الكروم المحلية',
    homeCinema: 'سينما منزلية',
    homeCinemaDesc: 'عروض خاصة تحت النجوم',
    guestStories: 'قصص الضيوف',
    wordsOfPraise: 'كلمات الثناء',
    beginYourJourney: 'ابدأ رحلتك',
    findYourPerfectVilla: 'اعثر على فيلتك المثالية',
    conciergeDesc: 'فريق الكونسيرج المتفاني متاح على مدار الساعة لمساعدتك في كل تفاصيل إقامتك، من نقل المطار إلى خدمات الطباخ الخاص.',
    concierge24: 'كونسيرج 24/7',
    requestAvailability: 'طلب التوفر',
    curatedVillas: 'فيلات مختارة',
    destinations: 'الوجهات',
    happyGuests: 'ضيوف سعيدون',
    satisfaction: 'الرضا',
    quickLinks: 'روابط سريعة',
    ourCollectionLink: 'مجموعتنا',
    experiences: 'التجارب',
    aboutUs: 'من نحن',
    press: 'الصحافة',
    careers: 'الوظائف',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    address: 'العنوان',
    copyright: 'فيلا إيليت. جميع الحقوق محفوظة.',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    cookiePolicy: 'سياسة ملفات تعريف الارتباط',
    search: 'بحث',
    sendMessage: 'إرسال',
    typeMessage: 'اكتب رسالتك...',
    chatWithAI: 'تحدث مع المساعد الذكي',
    callUs: 'اتصل بنا',
    hurghadaWeather: 'حالة الطقس في الغردقة',
    sun: 'أحد',
    mon: 'إثن',
    tue: 'ثلا',
    wed: 'أرب',
    thu: 'خمي',
    fri: 'جمع',
    sat: 'سبت',
    lightMode: 'الوضع الفاتح',
    darkMode: 'الوضع الداكن',
    all: 'الكل',
    pool: 'مسبح',
    seaView: 'إطلالة بحرية',
    beach: 'شاطئ',
    amenities: 'المرافق',
    gallery: 'المعرض',
    description: 'الوصف',
    bedrooms: 'غرف نوم',
    bathrooms: 'حمامات',
    perNight: 'لليلة',
    guestReviews: 'آراء الضيوف',
    backToCollection: 'العودة للمجموعة',
    selectImage: 'اختر صورة',
    floorPlan: 'مخطط الأرضي',
    location: 'الموقع',
    reviews: 'المراجعات',
    similarVillas: 'فيلات مشابهة',
    included: 'مشمول',
    viewFloorPlan: 'عرض المخطط',
    virtualTour: 'جولة افتراضية',
    priceBreakdown: 'تفاصيل السعر',
    totalPrice: 'السعر الإجمالي',
    serviceFee: 'رسوم الخدمة',
    taxes: 'الضرائب',
    maxGuests: 'الحد الأقصى للضيوف',
    squareMeters: 'المتر المربع',
    viewOnMap: 'عرض على الخريطة',
    writeReview: 'اكتب مراجعة',
    faq: 'الأسئلة الشائعة',
    cancellationPolicy: 'سياسة الإلغاء',
    houseRules: 'قواعد المنزل',
    whatGuestsSay: 'ماذا يقول الضيوف',
    overallRating: 'التقييم العام',
    cleanRating: 'النظافة',
    locationRating: 'الموقع',
    serviceRating: 'الخدمة',
    valueRating: 'القيمة'
  }
}

// Theme Context
type Theme = 'dark' | 'light'
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({ theme: 'dark', toggleTheme: () => {} })

// Language Context
const LanguageContext = createContext<{ lang: Language; setLang: (l: Language) => void; t: (key: keyof typeof translations.en) => string }>({
  lang: 'en',
  setLang: () => {},
  t: (key) => translations.en[key]
})

// Villa data
const villas: Villa[] = [
  {
    id: 1,
    name: 'Villa Azure Horizon',
    location: 'Oia, Santorini',
    city: 'Santorini',
    country: 'Greece',
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    size: 450,
    price: 1850,
    rating: 4.9,
    reviewCount: 127,
    image: 'https://images.pexels.com/photos/31817157/pexels-photo-31817157.jpeg?cs=srgb&dl=pexels-ahmetcotur-31817157.jpg&fm=jpg',
    images: [
      'https://images.pexels.com/photos/31817157/pexels-photo-31817157.jpeg?cs=srgb&dl=pexels-ahmetcotur-31817157.jpg&fm=jpg',
      'https://thumbs.dreamstime.com/b/sunset-view-over-ocean-luxury-villa-infinity-pool-tropical-location-stunning-can-be-seen-luxurious-reflects-357189233.jpg',
      'https://thumbs.dreamstime.com/b/luxurious-oceanfront-villa-stunning-sunset-views-tranquil-coastal-setting-modern-villa-sits-serene-pool-381226225.jpg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['Infinity Pool', 'Sea View', 'Cave Style', 'Private Chef', 'Wine Cellar'],
    description: 'Perched on the dramatic cliffs of Santorini, Villa Azure Horizon offers breathtaking panoramic views of the Aegean Sea.',
    longDescription: 'Perched on the dramatic cliffs of Oia, Villa Azure Horizon represents the pinnacle of Cycladic luxury. This stunning 450m² property features traditional cave-style architecture masterfully combined with contemporary design. The villa boasts five individually themed bedrooms, each offering unique views of the caldera. The centerpiece infinity pool appears to float above the Aegean Sea, creating an unforgettable swimming experience. Our award-winning private chef prepares authentic Greek cuisine using locally sourced ingredients, while the temperature-controlled wine cellar houses over 200 bottles from renowned Greek vineyards. Additional amenities include a fully equipped gym, spa treatment room, and dedicated staff quarters.',
    amenities: ['Infinity Pool', 'Private Chef', 'Wine Cellar', 'Helicopter Pad', 'Spa Treatment Room', 'Home Cinema', 'Gym', 'Staff Quarters', 'Smart Home', 'Security System', 'Private Parking', 'Boat Charter'],
    included: ['Daily Housekeeping', 'Concierge Service', 'Airport Transfer', 'Welcome Champagne', 'Premium Breakfast', 'Bed Linen Change'],
    houseRules: ['Check-in: 3:00 PM', 'Check-out: 11:00 AM', 'No smoking indoors', 'No pets allowed', 'Events upon request', 'Quiet hours 11 PM - 8 AM'],
    faq: [
      { q: 'Is the villa suitable for children?', a: 'Yes, we provide baby equipment including cribs, high chairs, and pool safety features. Our staff can arrange childcare services upon request.' },
      { q: 'Can we arrange a private yacht tour?', a: 'Absolutely! We offer exclusive boat charters including sunset cruises, island hopping, and private diving experiences.' },
      { q: 'What is the cancellation policy?', a: 'Full refund up to 60 days before check-in, 50% refund up to 30 days, and no refund within 30 days of arrival.' }
    ],
    reviews: [
      { name: 'Sarah Mitchell', date: 'September 2024', rating: 5.0, text: 'Absolutely breathtaking! The views are even more stunning in person. The private chef prepared the most incredible Greek feast for our anniversary. Every detail was perfect.', avatar: 'SM' },
      { name: 'James Chen', date: 'August 2024', rating: 4.9, text: 'The infinity pool at sunset was the highlight of our trip. Staff went above and beyond to make our honeymoon special. Cannot recommend this property enough.', avatar: 'JC' },
      { name: 'Emma Williams', date: 'July 2024', rating: 5.0, text: 'Luxury at its finest. The cave bedrooms are incredibly unique and romantic. The helicopter transfer was an unforgettable way to arrive.', avatar: 'EW' }
    ],
    coordinates: { lat: 36.4618, lng: 25.3753 }
  },
  {
    id: 2,
    name: 'Villa Serena',
    location: 'Positano, Amalfi Coast',
    city: 'Positano',
    country: 'Italy',
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    size: 380,
    price: 2200,
    rating: 5.0,
    reviewCount: 89,
    image: 'https://thumbs.dreamstime.com/b/sunset-view-over-ocean-luxury-villa-infinity-pool-tropical-location-stunning-can-be-seen-luxurious-reflects-357189233.jpg',
    images: [
      'https://thumbs.dreamstime.com/b/sunset-view-over-ocean-luxury-villa-infinity-pool-tropical-location-stunning-can-be-seen-luxurious-reflects-357189233.jpg',
      'https://images.pexels.com/photos/31817157/pexels-photo-31817157.jpeg?cs=srgb&dl=pexels-ahmetcotur-31817157.jpg&fm=jpg',
      'https://thumbs.dreamstime.com/b/luxurious-oceanfront-villa-stunning-sunset-views-tranquil-coastal-setting-modern-villa-sits-serene-pool-381226225.jpg',
      'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['Cliffside', 'Jacuzzi', 'Butler Service', 'Helipad', 'Private Beach'],
    description: 'Nestled into the dramatic cliffs of the Amalfi Coast, Villa Serena offers an unparalleled Mediterranean experience.',
    longDescription: 'Nestled into the dramatic cliffs of Positano, Villa Serena is a masterpiece of Italian coastal living. This exclusive property offers direct access to a private beach cove, accessible via a scenic elevator carved into the rock. The villa features four elegant suites, each with floor-to-ceiling windows overlooking the Tyrrhenian Sea. Our state-of-the-art outdoor jacuzzi, heated to 38°C, provides the ultimate relaxation experience with panoramic sea views. The dedicated butler service ensures every need is met, from arranging private boat excursions to securing reservations at Michelin-starred restaurants. A private helipad allows for seamless arrival from Naples or Rome.',
    amenities: ['Private Beach', 'Outdoor Jacuzzi', 'Butler Service', 'Helipad', 'Boat Dock', 'Wine Cellar', 'Spa Treatment Room', 'Limoncello Distillery', 'Lemon Grove', 'Outdoor Kitchen', 'Private Chef Available', 'Helicopter Transfer'],
    included: ['Daily Butler Service', 'Housekeeping 2x Daily', 'Luxury Transfer', 'Welcome Dinner', 'Prosecco & Fruit Basket', 'Mozzarella Making Class'],
    houseRules: ['Check-in: 4:00 PM', 'Check-out: 10:00 AM', 'No smoking', 'Small pets considered', 'Maximum 8 guests', 'Celebrations require approval'],
    faq: [
      { q: 'How far is the beach?', a: 'A private elevator takes just 2 minutes to reach our secluded beach cove, complete with sun loungers and umbrella service.' },
      { q: 'Can we have a wedding at the villa?', a: 'Yes, we can accommodate intimate ceremonies up to 30 guests. Our events team will help plan every detail.' },
      { q: 'Is there a minimum stay?', a: 'During peak season (July-August), we require a minimum 7-night stay. Other periods allow 3-night minimums.' }
    ],
    reviews: [
      { name: 'Marco Rossi', date: 'October 2024', rating: 5.0, text: 'Our family vacation was absolutely magical. The private beach is incredible, and the butler service made us feel like royalty.', avatar: 'MR' },
      { name: 'Isabella Brown', date: 'September 2024', rating: 5.0, text: 'The most beautiful villa I have ever stayed in. The views at sunset are simply divine. Chef prepared the best pasta of my life.', avatar: 'IB' },
      { name: 'David Laurent', date: 'August 2024', rating: 5.0, text: 'Arriving by helicopter was an incredible experience. The villa exceeded all expectations - truly a slice of paradise.', avatar: 'DL' }
    ],
    coordinates: { lat: 40.6281, lng: 14.4850 }
  },
  {
    id: 3,
    name: 'Villa Palme',
    location: 'Sierra Blanca, Marbella',
    city: 'Marbella',
    country: 'Spain',
    bedrooms: 6,
    bathrooms: 5,
    maxGuests: 12,
    size: 650,
    price: 1500,
    rating: 4.8,
    reviewCount: 156,
    image: 'https://www.architectmagazine.com/wp-content/uploads/sites/5/2020/545b5d8b90334e73a3b7e40cbfe48b89.jpg',
    images: [
      'https://www.architectmagazine.com/wp-content/uploads/sites/5/2020/545b5d8b90334e73a3b7e40cbfe48b89.jpg',
      'https://images.pexels.com/photos/31817157/pexels-photo-31817157.jpeg?cs=srgb&dl=pexels-ahmetcotur-31817157.jpg&fm=jpg',
      'https://thumbs.dreamstime.com/b/sunset-view-over-ocean-luxury-villa-infinity-pool-tropical-location-stunning-can-be-seen-luxurious-reflects-357189233.jpg',
      'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['Garden', 'Tennis Court', 'Home Cinema', 'Gym', 'Mountain Views'],
    description: 'Surrounded by lush subtropical gardens and overlooking the Mediterranean, Villa Palme is a spectacular retreat in Marbella\'s Golden Mile.',
    longDescription: 'Villa Palme stands as a beacon of Andalusian elegance in the prestigious Sierra Blanca area of Marbella. This 650m² contemporary masterpiece is surrounded by 5,000m² of subtropical gardens featuring ancient palms, fragrant jasmine, and a private orchard. The championship tennis court is maintained to professional standards, with equipment available for guest use. The villa includes a dedicated entertainment wing featuring a 120-inch screen, 7.1 surround sound, and over 500 movies. An elegant outdoor pavilion serves as the perfect setting for al fresco dining, while the fully equipped gym includes a sauna and cold plunge pool. The property offers stunning views of both the Mediterranean Sea and the Sierra Nevada mountains.',
    amenities: ['Championship Tennis Court', 'Home Cinema', 'Gym & Sauna', 'Formal Gardens', 'Outdoor Kitchen', 'BBQ Area', 'Play Room', 'Staff Accommodation', 'Heated Pool', 'Kids Club', 'Wine Room', 'Golf Simulator'],
    included: ['Daily Housekeeping', 'Garden Maintenance', 'Pool Cleaning', 'Tennis Court Access', 'Welcome Basket', 'Private Chef on Request'],
    houseRules: ['Check-in: 4:00 PM', 'Check-out: 11:00 AM', 'No smoking indoors', 'Pets welcome', 'Maximum 12 guests', 'Quiet after midnight'],
    faq: [
      { q: 'Is the tennis court available at night?', a: 'Yes, the court has professional floodlighting for evening play. Tennis rackets and balls are provided complimentary.' },
      { q: 'Are there golf facilities nearby?', a: 'We offer a golf simulator in the entertainment room. Marbella has over 15 world-class golf courses within 20 minutes drive.' },
      { q: 'Is the villa suitable for families?', a: 'Absolutely! We have a dedicated kids club, children\'s pool, game room, and can arrange childcare services.' }
    ],
    reviews: [
      { name: 'Thomas Anderson', date: 'October 2024', rating: 5.0, text: 'Perfect for our extended family gathering. The kids loved the pool and tennis court, while adults enjoyed the wine room and gardens.', avatar: 'TA' },
      { name: 'Maria Garcia', date: 'September 2024', rating: 4.8, text: 'Stunning property with every amenity you could need. The gardens are absolutely beautiful, and the outdoor kitchen is amazing.', avatar: 'MG' },
      { name: 'William Taylor', date: 'August 2024', rating: 4.7, text: 'Beautiful contemporary design in a fantastic location. The home cinema was a huge hit with our group. Would definitely return.', avatar: 'WT' }
    ],
    coordinates: { lat: 36.5202, lng: -4.8985 }
  },
  {
    id: 4,
    name: 'Villa Dolce Vita',
    location: 'Cap d\'Antibes, French Riviera',
    city: 'Antibes',
    country: 'France',
    bedrooms: 7,
    bathrooms: 6,
    maxGuests: 14,
    size: 800,
    price: 3500,
    rating: 5.0,
    reviewCount: 203,
    image: 'https://thumbs.dreamstime.com/b/luxurious-oceanfront-villa-stunning-sunset-views-tranquil-coastal-setting-modern-villa-sits-serene-pool-381226225.jpg',
    images: [
      'https://thumbs.dreamstime.com/b/luxurious-oceanfront-villa-stunning-sunset-views-tranquil-coastal-setting-modern-villa-sits-serene-pool-381226225.jpg',
      'https://images.pexels.com/photos/31817157/pexels-photo-31817157.jpeg?cs=srgb&dl=pexels-ahmetcotur-31817157.jpg&fm=jpg',
      'https://thumbs.dreamstime.com/b/sunset-view-over-ocean-luxury-villa-infinity-pool-tropical-location-stunning-can-be-seen-luxurious-reflects-357189233.jpg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1581725/pexels-photo-1581725.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['Beach Access', 'Mosaic Pool', 'Spa', 'Art Collection', 'Concierge'],
    description: 'Villa Dolce Vita embodies the legendary glamour of the French Riviera with Belle Époque grandeur and world-class amenities.',
    longDescription: 'Villa Dolce Vita is a magnificent Belle Époque mansion that has been meticulously restored to offer the ultimate in Riviera luxury. Situated on the prestigious Cap d\'Antibes peninsula, the estate offers direct private access to a sandy beach, one of the rarest commodities on the French Riviera. The property features seven exquisitely appointed suites, each named after famous artists and decorated with original artworks from the owner\'s private collection. The centerpiece mosaic pool, handcrafted by artisans from Morocco, shimmers with iridescent tiles. Our 24/7 concierge service arranges everything from private yacht charters to reservations at the finest Michelin-starred restaurants in Cannes and Monaco.',
    amenities: ['Private Beach', 'Mosaic Pool', 'Full Spa', '24/7 Concierge', 'Wine Cellar', 'Helicopter Pad', 'Boat Charter', 'Personal Chef', 'Art Collection', 'Library', 'Ballroom', 'Staff Quarters'],
    included: ['24/7 Concierge', 'Daily Housekeeping', 'Private Chef', 'Butler Service', 'Boat Charter', 'Spa Treatments', 'Helicopter Transfer', 'Champagne & Caviar Welcome'],
    houseRules: ['Check-in: 3:00 PM', 'Check-out: 12:00 PM', 'No smoking', 'No pets', 'Maximum 14 guests', 'Events by arrangement'],
    faq: [
      { q: 'What makes this villa unique?', a: 'The combination of Belle Époque architecture, private beach access, and our legendary concierge service creates an unmatched experience.' },
      { q: 'Can we host a wedding here?', a: 'The villa can accommodate weddings up to 100 guests in the ballroom and gardens. Our event planning team handles every detail.' },
      { q: 'Is the spa fully equipped?', a: 'Yes, we have a hammam, treatment rooms, cold plunge, and can arrange any spa service with advance notice.' }
    ],
    reviews: [
      { name: 'Alexander Petrov', date: 'September 2024', rating: 5.0, text: 'The most luxurious villa I have ever experienced. The private beach and concierge service are world-class. Absolutely flawless.', avatar: 'AP' },
      { name: 'Charlotte Smith', date: 'August 2024', rating: 5.0, text: 'Like stepping into a dream. The art collection is extraordinary, and the staff made us feel like family. Unforgettable!', avatar: 'CS' },
      { name: 'Michael Johnson', date: 'July 2024', rating: 5.0, text: 'We celebrated our anniversary in style. The private boat trip arranged by the concierge was the highlight of our vacation.', avatar: 'MJ' }
    ],
    coordinates: { lat: 43.5611, lng: 7.1262 }
  }
]

// Villa Detail Page
function VillaDetail() {
  const { id } = useParams<{ id: string }>()
  const { t, lang } = useContext(LanguageContext)
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const location = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location])

  const villa = villas.find(v => v.id === parseInt(id || '0'))
  const isRTL = lang === 'ar'

  const similarVillas = villas.filter(v => v.id !== villa?.id).slice(0, 3)

  if (!villa) {
    return (
      <div className="min-h-screen bg-[#1A1814] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl text-white mb-4">Villa not found</h1>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-[#B8860B] text-white">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'amenities', label: t('amenities') },
    { key: 'location', label: t('location') },
    { key: 'reviews', label: t('reviews') }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1814]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#1A1814]/95 backdrop-blur-md shadow-lg py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-700 dark:text-white hover:text-[#B8860B] transition-colors">
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">{t('backToCollection')}</span>
          </button>
          <a href="#" className="editorial-heading text-xl tracking-[0.15em]">
            <span className="text-gray-900 dark:text-white">VILLA</span>
            <span className="text-[#B8860B] ml-2">ELITE</span>
          </a>
          <CallCenterButton />
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Image Gallery */}
        <div className="relative">
          <div className="aspect-[16/9] lg:aspect-[21/9] overflow-hidden cursor-pointer grid grid-cols-4 gap-1" onClick={() => setShowGallery(true)}>
            <div className="col-span-2 row-span-2 relative">
              <img src={villa.images[0]} alt={villa.name} className="w-full h-full object-cover" />
            </div>
            {villa.images.slice(1, 5).map((img, i) => (
              <div key={i} className="relative overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center col-span-2 row-span-2">
              <svg className="w-12 h-12 text-white opacity-0 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title & Quick Info */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-[#B8860B] uppercase tracking-[0.2em] mb-2">
                  <span>{villa.city}</span>
                  <span>•</span>
                  <span>{villa.country}</span>
                </div>
                <h1 className="editorial-heading text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">{villa.name}</h1>
                <div className="flex flex-wrap items-center gap-6 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-[#B8860B] fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="font-semibold">{villa.rating}</span>
                    <span className="text-gray-500 text-sm">({villa.reviewCount} {t('reviews').toLowerCase()})</span>
                  </div>
                  <span className="w-1 h-1 bg-[#B8860B] rounded-full hidden sm:block" />
                  <span className="text-gray-500">{villa.bedrooms} {t('bedrooms').toLowerCase()}</span>
                  <span className="w-1 h-1 bg-[#B8860B] rounded-full hidden sm:block" />
                  <span className="text-gray-500">{villa.bathrooms} {t('bathrooms').toLowerCase()}</span>
                  <span className="w-1 h-1 bg-[#B8860B] rounded-full hidden sm:block" />
                  <span className="text-gray-500">{villa.maxGuests} {t('maxGuests').toLowerCase()}</span>
                  <span className="w-1 h-1 bg-[#B8860B] rounded-full hidden sm:block" />
                  <span className="text-gray-500">{villa.size}m²</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === tab.key ? 'text-[#B8860B] border-[#B8860B]' : 'text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-white'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h2 className="editorial-heading text-2xl text-gray-900 dark:text-white mb-4">{t('description')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{villa.description}</p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{villa.longDescription}</p>
                  </div>

                  {/* What's Included */}
                  <div>
                    <h2 className="editorial-heading text-2xl text-gray-900 dark:text-white mb-4">{t('included')}</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {villa.included.map((item) => (
                        <div key={item} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* House Rules */}
                  <div>
                    <h2 className="editorial-heading text-2xl text-gray-900 dark:text-white mb-4">{t('houseRules')}</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {villa.houseRules.map((rule) => (
                        <div key={rule} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <svg className="w-4 h-4 text-[#B8860B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'amenities' && (
                <div>
                  <h2 className="editorial-heading text-2xl text-gray-900 dark:text-white mb-6">{t('amenities')}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {villa.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <svg className="w-5 h-5 text-[#B8860B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'location' && (
                <div>
                  <h2 className="editorial-heading text-2xl text-gray-900 dark:text-white mb-4">{t('location')}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{villa.location}, {villa.country}</p>
                  <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden mb-6">
                    <iframe
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${villa.coordinates.lng-0.05},${villa.coordinates.lat-0.05},${villa.coordinates.lng+0.05},${villa.coordinates.lat+0.05}&layer=mapnik&marker=${villa.coordinates.lat},${villa.coordinates.lng}`}
                      className="w-full h-full"
                      style={{ border: 0 }}
                      loading="lazy"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 border border-[#B8860B] text-[#B8860B] text-sm hover:bg-[#B8860B] hover:text-white transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {t('viewOnMap')}
                  </button>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  {/* Rating Summary */}
                  <div className="flex items-center gap-8 mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="text-center">
                      <div className="editorial-heading text-5xl text-[#B8860B]">{villa.rating}</div>
                      <div className="flex items-center gap-1 mt-2">
                        {[1,2,3,4,5].map((star) => (
                          <svg key={star} className="w-4 h-4 text-[#B8860B] fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{villa.reviewCount} reviews</p>
                    </div>
                    <div className="h-16 w-px bg-gray-300 dark:bg-gray-600" />
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div><span className="text-sm text-gray-500">{t('cleanRating')}</span><div className="w-full bg-gray-200 rounded-full h-2 mt-1"><div className="bg-[#B8860B] h-2 rounded-full" style={{ width: `${(villa.rating/5)*100}%` }} /></div></div>
                      <div><span className="text-sm text-gray-500">{t('locationRating')}</span><div className="w-full bg-gray-200 rounded-full h-2 mt-1"><div className="bg-[#B8860B] h-2 rounded-full" style={{ width: `${((villa.rating - 0.1)/5)*100}%` }} /></div></div>
                      <div><span className="text-sm text-gray-500">{t('serviceRating')}</span><div className="w-full bg-gray-200 rounded-full h-2 mt-1"><div className="bg-[#B8860B] h-2 rounded-full" style={{ width: `${((villa.rating + 0.05)/5)*100}%` }} /></div></div>
                      <div><span className="text-sm text-gray-500">{t('valueRating')}</span><div className="w-full bg-gray-200 rounded-full h-2 mt-1"><div className="bg-[#B8860B] h-2 rounded-full" style={{ width: `${((villa.rating - 0.2)/5)*100}%` }} /></div></div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {villa.reviews.map((review, i) => (
                      <div key={i} className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-[#B8860B] rounded-full flex items-center justify-center text-white font-medium">{review.avatar}</div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{review.name}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <div className="ml-auto flex items-center gap-1">
                            {[1,2,3,4,5].map((star) => (
                              <svg key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-[#B8860B] fill-current' : 'text-gray-300'}`} viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{review.text}</p>
                      </div>
                    ))}
                  </div>

                  <button className="mt-6 px-6 py-3 border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    {t('writeReview')}
                  </button>
                </div>
              )}

              {/* FAQ Section */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="editorial-heading text-2xl text-gray-900 dark:text-white mb-6">{t('faq')}</h2>
                <div className="space-y-4">
                  {villa.faq.map((item, i) => (
                    <div key={i} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">{item.q}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar Villas */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="editorial-heading text-2xl text-gray-900 dark:text-white mb-6">{t('similarVillas')}</h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  {similarVillas.map((v) => (
                    <div key={v.id} className="group cursor-pointer" onClick={() => navigate(`/villa/${v.id}`)}>
                      <div className="aspect-[4/3] overflow-hidden rounded-xl mb-3">
                        <img src={v.image} alt={v.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{v.name}</h3>
                      <p className="text-sm text-gray-500">{v.location}</p>
                      <p className="text-[#B8860B] mt-1">€{v.price}/night</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div>
              <div className="sticky top-32 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="mb-6">
                  <span className="editorial-heading text-4xl text-[#B8860B]">€{villa.price}</span>
                  <span className="text-gray-500 text-sm"> / {t('perNight')}</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs tracking-[0.1em] uppercase text-gray-500 mb-2">{t('checkIn')}</label>
                    <input type="date" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:border-[#B8860B] focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.1em] uppercase text-gray-500 mb-2">{t('checkOut')}</label>
                    <input type="date" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:border-[#B8860B] focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.1em] uppercase text-gray-500 mb-2">{t('addGuests')}</label>
                    <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:border-[#B8860B] focus:outline-none transition-colors">
                      {[...Array(villa.maxGuests)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button className="w-full py-4 bg-[#B8860B] text-white text-sm tracking-[0.2em] uppercase hover:bg-[#D4AF37] transition-all duration-300 mb-4">
                  {t('bookNow')}
                </button>
                <button className="w-full py-4 border border-[#B8860B] text-[#B8860B] text-sm tracking-[0.2em] uppercase hover:bg-[#B8860B] hover:text-white transition-all duration-300">
                  {t('requestAvailability')}
                </button>

                {/* Price Breakdown */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">€{villa.price} x 7 nights</span>
                    <span className="text-gray-900 dark:text-white">€{villa.price * 7}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t('serviceFee')}</span>
                    <span className="text-gray-900 dark:text-white">€350</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t('taxes')}</span>
                    <span className="text-gray-900 dark:text-white">€280</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between font-medium">
                    <span>{t('totalPrice')}</span>
                    <span className="text-[#B8860B]">€{villa.price * 7 + 630}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                  <p className="text-xs text-gray-500">{t('concierge24')}</p>
                  <p className="text-lg text-gray-900 dark:text-white font-medium">+1 (800) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setShowGallery(false)}>
          <button className="absolute top-6 right-6 text-white" onClick={() => setShowGallery(false)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img src={villa.images[selectedImage]} alt={villa.name} className="max-w-full max-h-[90vh] object-contain" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
            <button onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev === 0 ? villa.images.length - 1 : prev - 1)) }} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev === villa.images.length - 1 ? 0 : prev + 1)) }} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white text-sm">{selectedImage + 1} / {villa.images.length}</div>
        </div>
      )}
    </div>
  )
}

// Scroll animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// AI Chat Widget
function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hello! I\'m your AI assistant for Villa Elite. How can I help you find your perfect luxury villa?' }
  ])
  const [input, setInput] = useState('')
  const { t } = useContext(LanguageContext)

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: 'user', text: input }])
    const userInput = input
    setInput('')
    setTimeout(() => {
      const responses = [
        'I recommend Villa Azure Horizon in Santorini for its stunning infinity pool and sea views. Would you like more details?',
        'Our villas in the French Riviera are perfect for luxury getaways. Can I ask about your preferred dates?',
        'We offer exclusive amenities including private chefs, helicopter transfers, and spa services. What would you like to know more about?',
        'Let me help you find the perfect villa. Our concierge team can arrange everything from airport transfers to private dining experiences.'
      ]
      setMessages(prev => [...prev, { role: 'ai', text: responses[Math.floor(Math.random() * responses.length)] }])
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-[#B8860B] to-[#D4AF37] p-4">
            <h3 className="text-white font-semibold">{t('chatWithAI')}</h3>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-[#B8860B] text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('typeMessage')}
              className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:border-[#B8860B]"
            />
            <button onClick={handleSend} className="w-10 h-10 bg-[#B8860B] rounded-full flex items-center justify-center text-white hover:bg-[#D4AF37] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  )
}

// Weather Widget for Hurghada
function WeatherWidget() {
  const { t } = useContext(LanguageContext)
  const [weather] = useState({
    current: 32,
    condition: 'Sunny',
    humidity: 45,
    wind: 12
  })
  const days: (keyof typeof translations.en)[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const forecast = [32, 33, 31, 34, 35, 33, 32]

  return (
    <div className="fixed top-24 left-6 z-40 bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-4 w-56 hidden lg:block dark:bg-gray-800/90">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{t('hurghadaWeather')}</span>
        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2v2m0 16v2M4 12H2m20 0h-2m-2.93-7.07l-1.41 1.41m-9.19 9.19l-1.41 1.41m0-12.02l1.41 1.41m9.19 9.19l1.41 1.41M12 6a6 6 0 100 12 6 6 0 000-12z" />
        </svg>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl font-bold text-gray-800 dark:text-white">{weather.current}°C</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{weather.condition}</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day, i) => (
          <div key={day} className="text-center">
            <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">{t(day)}</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{forecast[i]}°</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Call Center Button
function CallCenterButton() {
  return (
    <a href="tel:+201234567890" className="group flex items-center gap-2 px-3 py-1.5 border border-[#B8860B]/40 hover:border-[#B8860B] hover:bg-[#B8860B]/5 text-[#B8860B] text-[10px] tracking-[0.15em] uppercase transition-all duration-300">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span>Call</span>
    </a>
  )
}

// Navigation Component
function Navigation() {
  const { lang, setLang, t } = useContext(LanguageContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isRTL = lang === 'ar'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 dark:bg-[#1A1814]/95 backdrop-blur-md shadow-lg py-3' : 'bg-gradient-to-b from-black/50 to-transparent py-5'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="editorial-heading text-xl lg:text-2xl tracking-[0.15em]">
          <span className={scrolled ? 'text-[#1A1814] dark:text-white' : 'text-white'}>VILLA</span>
          <span className="text-[#B8860B] ml-2">ELITE</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {[
            { key: 'collection', label: t('collection') },
            { key: 'experience', label: t('experience') },
            { key: 'about', label: t('about') },
            { key: 'contact', label: t('contact') }
          ].map((item) => (
            <a key={item.key} href={`#${item.key}`} className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 relative group ${scrolled ? 'text-gray-700 dark:text-white/90 hover:text-[#B8860B]' : 'text-white/90 hover:text-white'}`}>
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#B8860B] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <button onClick={() => setLang('en')} className={`text-xs px-2 py-1 rounded ${lang === 'en' ? 'bg-[#B8860B] text-white' : 'text-white/70 hover:text-white'}`}>EN</button>
            <button onClick={() => setLang('tr')} className={`text-xs px-2 py-1 rounded ${lang === 'tr' ? 'bg-[#B8860B] text-white' : 'text-white/70 hover:text-white'}`}>TR</button>
            <button onClick={() => setLang('ar')} className={`text-xs px-2 py-1 rounded ${lang === 'ar' ? 'bg-[#B8860B] text-white' : 'text-white/70 hover:text-white'}`}>AR</button>
          </div>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            {theme === 'dark' ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-[#1A1814]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <CallCenterButton />

          <button className="px-6 py-2.5 border border-[#B8860B] text-xs tracking-[0.15em] uppercase text-[#B8860B] hover:bg-[#B8860B] hover:text-white transition-all duration-300">
            {t('bookNow')}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''} ${scrolled ? 'bg-gray-800' : 'bg-white'}`} />
          <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? 'opacity-0' : ''} ${scrolled ? 'bg-gray-800' : 'bg-white'}`} />
          <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''} ${scrolled ? 'bg-gray-800' : 'bg-white'}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white dark:bg-[#1A1814]/98 backdrop-blur-md px-6 py-8 border-t border-gray-200 dark:border-white/10">
          <div className="flex flex-col gap-1">
            {[
              { key: 'collection', label: t('collection') },
              { key: 'experience', label: t('experience') },
              { key: 'about', label: t('about') },
              { key: 'contact', label: t('contact') }
            ].map((item, index) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className="text-sm tracking-[0.15em] uppercase py-3 border-b border-gray-200 dark:border-white/10 flex items-center justify-between hover:text-[#B8860B] transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
          <div className="flex gap-2 mt-6 pt-6">
            <button onClick={() => setLang('en')} className={`px-3 py-2 text-xs rounded ${lang === 'en' ? 'bg-[#B8860B] text-white' : 'bg-gray-100 text-gray-700'}`}>EN</button>
            <button onClick={() => setLang('tr')} className={`px-3 py-2 text-xs rounded ${lang === 'tr' ? 'bg-[#B8860B] text-white' : 'bg-gray-100 text-gray-700'}`}>TR</button>
            <button onClick={() => setLang('ar')} className={`px-3 py-2 text-xs rounded ${lang === 'ar' ? 'bg-[#B8860B] text-white' : 'bg-gray-100 text-gray-700'}`}>AR</button>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <CallCenterButton />
            <button className="w-full py-3.5 bg-[#B8860B] text-white text-xs tracking-[0.15em] uppercase hover:bg-[#D4AF37] transition-all duration-300">
              {t('bookNow')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Hero Section
function Hero() {
  const { t } = useContext(LanguageContext)
  const isRTL = false

  return (
    <section className="relative h-screen min-h-[800px] overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://thumbs.dreamstime.com/b/coastal-villa-rocky-shore-sunset-luxury-home-has-infinity-pool-over-ocean-panoramic-view-sea-croatia-scenic-travel-387291534.jpg"
        >
          <source src="https://videos.pexels.com/video-files/3203888/3203888-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-6 pt-20 pb-32">
        <div className="max-w-4xl w-full">
          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#B8860B]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#B8860B]">{t('villaEliteCollection')}</span>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#B8860B]" />
          </div>

          {/* Main Slogan */}
          <h1 className="editorial-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.0] mb-8">
            <span className="block text-[#D4AF37]">{t('escapeTo')}</span>
            <span className="block">{t('paradise')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/70 text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('discover')}
          </p>

          {/* Booking Widget on Video */}
          <div className="max-w-5xl mx-auto mt-8">
            <div className="bg-[#1A1814]/80 backdrop-blur-2xl border border-white/20 p-4 lg:p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-white/40 mb-2">{t('whereTo')}</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white text-sm focus:border-[#B8860B] focus:outline-none transition-colors appearance-none cursor-pointer">
                    <option value="" className="bg-[#1A1814]">{t('whereTo')}</option>
                    <option value="santorini" className="bg-[#1A1814]">Santorini, Greece</option>
                    <option value="amalfi" className="bg-[#1A1814]">Amalfi Coast, Italy</option>
                    <option value="marbella" className="bg-[#1A1814]">Marbella, Spain</option>
                    <option value="hurghada" className="bg-[#1A1814]">Hurghada, Egypt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-white/40 mb-2">{t('checkIn')}</label>
                  <input type="date" className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white text-sm focus:border-[#B8860B] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-white/40 mb-2">{t('checkOut')}</label>
                  <input type="date" className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white text-sm focus:border-[#B8860B] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-white/40 mb-2">{t('addGuests')}</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white text-sm focus:border-[#B8860B] focus:outline-none transition-colors appearance-none cursor-pointer">
                    <option value="" className="bg-[#1A1814]">{t('addGuests')}</option>
                    <option value="2" className="bg-[#1A1814]">2 Guests</option>
                    <option value="4" className="bg-[#1A1814]">4 Guests</option>
                    <option value="6" className="bg-[#1A1814]">6 Guests</option>
                    <option value="8+" className="bg-[#1A1814]">8+ Guests</option>
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1 flex items-end">
                  <button className="w-full py-3.5 bg-[#B8860B] text-white text-sm tracking-[0.15em] uppercase hover:bg-[#D4AF37] transition-all duration-300 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>{t('bookNow')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">{t('scroll')}</span>
          <svg className="w-5 h-5 text-[#B8860B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

// Stats Section
function Stats() {
  const { t } = useContext(LanguageContext)
  const { ref, isVisible } = useScrollAnimation()

  const stats = [
    { number: '150+', key: 'curatedVillas' },
    { number: '28', key: 'destinations' },
    { number: '12K+', key: 'happyGuests' },
    { number: '98%', key: 'satisfaction' }
  ]

  return (
    <section ref={ref} className="py-20 lg:py-32 px-6 lg:px-12 bg-gray-100 dark:bg-[#0F0E0C] border-y border-gray-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={stat.key} className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <p className="editorial-heading text-4xl lg:text-5xl text-[#B8860B] mb-2">{stat.number}</p>
              <p className="text-xs tracking-[0.2em] uppercase text-gray-500 dark:text-white/50">{t(stat.key as keyof typeof translations.en)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Villa Collection
function VillaCollection() {
  const { t } = useContext(LanguageContext)
  const { ref, isVisible } = useScrollAnimation()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  const filters = [
    { key: 'all', label: t('all') },
    { key: 'pool', label: t('pool') },
    { key: 'seaView', label: t('seaView') },
    { key: 'beach', label: t('beach') }
  ]

  return (
    <section id="collection" ref={ref} className="py-20 lg:py-40 px-6 lg:px-12 bg-white dark:bg-[#1A1814]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <p className="editorial-subheading text-lg text-[#B8860B] mb-3">{t('ourCollection')}</p>
            <h2 className="editorial-heading text-4xl lg:text-6xl text-gray-900 dark:text-white">{t('exceptionalVillas')}</h2>
          </div>
          <div className="flex gap-4 mt-6 lg:mt-0">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 text-xs tracking-[0.2em] uppercase border transition-all duration-300 ${filter === f.key ? 'bg-[#B8860B] text-white border-[#B8860B]' : 'border-gray-300 dark:border-white/30 text-gray-600 dark:text-white/60 hover:border-[#B8860B] hover:text-[#B8860B]'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Villa Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {villas.map((villa, index) => (
            <div
              key={villa.id}
              className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={villa.image}
                  alt={villa.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#B8860B] text-white text-xs tracking-[0.1em] uppercase">
                  {t('featured')}
                </div>
              </div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="editorial-heading text-2xl lg:text-3xl text-gray-900 dark:text-white mb-1">{villa.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-white/50 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {villa.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="editorial-heading text-2xl text-[#B8860B]">€{villa.price}</p>
                  <p className="text-xs text-gray-400 dark:text-white/40">{t('perNight')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 dark:text-white/50">
                <span>{villa.bedrooms} {t('beds')}</span>
                <span className="w-1 h-1 bg-[#B8860B] rounded-full" />
                <span>{villa.bathrooms} {t('baths')}</span>
                <span className="w-1 h-1 bg-[#B8860B] rounded-full" />
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-[#B8860B] fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {villa.rating}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {villa.features.slice(0, 3).map((feature) => (
                  <span key={feature} className="px-3 py-1 border border-gray-200 dark:border-white/20 text-[10px] tracking-[0.1em] uppercase text-gray-600 dark:text-white/60">
                    {feature}
                  </span>
                ))}
              </div>
              <button
                onClick={() => navigate(`/villa/${villa.id}`)}
                className="w-full px-6 py-3 border border-gray-300 dark:border-white/30 text-xs tracking-[0.2em] uppercase text-gray-700 dark:text-white hover:bg-[#B8860B] hover:border-[#B8860B] hover:text-white transition-all duration-300"
              >
                {t('viewDetails')}
              </button>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 border border-gray-300 dark:border-white/30 text-xs tracking-[0.2em] uppercase text-gray-700 dark:text-white hover:bg-[#B8860B] hover:border-[#B8860B] hover:text-white transition-all duration-300">
            {t('viewAllVillas')}
          </button>
        </div>
      </div>
    </section>
  )
}

// Experience Section
function Experience() {
  const { t } = useContext(LanguageContext)
  const { ref, isVisible } = useScrollAnimation()

  const amenities = [
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 6v4c0 4.418-3.582 8-8 8s-8-3.582-8-8v-4" strokeLinecap="round"/>
          <path d="M4 6h8c0 2.209-1.791 4-4 4s-4-1.791-4-4z"/>
          <path d="M28 6v4c0 4.418 3.582 8 8 8s8-3.582 8-8v-4" strokeLinecap="round"/>
          <path d="M44 6h-8c0 2.209 1.791 4 4 4s4-1.791 4-4z"/>
          <path d="M16 10v24c0 2.209 1.791 4 4 4s4-1.791 4-4V10" strokeLinecap="round"/>
          <path d="M24 14c-1.5 0-3 1-3 3v17" strokeLinecap="round"/>
        </svg>
      ),
      title: t('privateChef'),
      desc: t('privateChefDesc')
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 28c4-4 8-6 12-6s8 2 12 6 8 6 12 6" strokeLinecap="round"/>
          <path d="M4 20c4-4 8-6 12-6s8 2 12 6 8 6 12 6" strokeLinecap="round"/>
          <path d="M16 8v8M32 8v8" strokeLinecap="round"/>
        </svg>
      ),
      title: t('infinityPools'),
      desc: t('infinityPoolsDesc')
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M24 6c-8 0-14 6-14 14v12c0 2 2 4 4 4h20c2 0 4-2 4-4V20c0-8-6-14-14-14z"/>
          <path d="M14 20c0-4 2-8 10-8s10 4 10 8" strokeLinecap="round"/>
          <circle cx="24" cy="26" r="4"/>
          <path d="M24 30v4M20 34h8" strokeLinecap="round"/>
        </svg>
      ),
      title: t('spaServices'),
      desc: t('spaServicesDesc')
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="24" cy="20" rx="16" ry="8"/>
          <path d="M8 20v4c0 4 7 8 16 8s16-4 16-8v-4"/>
          <path d="M18 32v6l-6 2v-8zM30 32v6l6 2v-8z"/>
          <path d="M4 16h8M36 16h8" strokeLinecap="round"/>
          <path d="M24 8v-2M20 6l-2-2M28 6l2-2" strokeLinecap="round"/>
        </svg>
      ),
      title: t('helicopterTransfers'),
      desc: t('helicopterDesc')
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M24 4v6M20 6h8"/>
          <path d="M20 10c-4 0-6 2-6 6v22c0 4 4 6 10 6s10-2 10-6V16c0-4-2-6-6-6h-8z"/>
          <path d="M18 20h12M18 26h12M18 32h12" strokeLinecap="round"/>
          <path d="M14 10h4M30 10h4"/>
          <circle cx="24" cy="10" r="2"/>
        </svg>
      ),
      title: t('wineCellars'),
      desc: t('wineCellarsDesc')
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="6" y="10" width="36" height="28" rx="2"/>
          <path d="M6 18h36"/>
          <circle cx="16" cy="30" r="6"/>
          <circle cx="32" cy="30" r="6"/>
          <path d="M16 26v8M12 30h8M32 26v8M28 30h8"/>
          <path d="M18 10V6h12v4" strokeLinecap="round"/>
          <path d="M21 6v4M27 6v4"/>
        </svg>
      ),
      title: t('homeCinema'),
      desc: t('homeCinemaDesc')
    }
  ]

  return (
    <section id="experience" ref={ref} className="py-20 lg:py-40 px-6 lg:px-12 bg-gray-50 dark:bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className={`editorial-subheading text-lg text-[#C9A962] mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>{t('theExperience')}</p>
          <h2 className={`editorial-heading text-4xl lg:text-6xl text-gray-900 dark:text-[#2C2C2C] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
            {t('beyondExpectations')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {amenities.map((item, index) => (
            <div
              key={item.title}
              className={`text-center p-8 border border-[#C9A962]/20 hover:border-[#C9A962] hover:bg-white dark:hover:bg-[#FFFEF9] transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-center mb-6 text-[#C9A962] group-hover:text-[#B8860B] transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="editorial-heading text-xl text-gray-900 dark:text-[#2C2C2C] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-[#8B8680]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials
function Testimonials() {
  const { t } = useContext(LanguageContext)
  const { ref, isVisible } = useScrollAnimation()

  const testimonials = [
    {
      quote: "An absolutely breathtaking experience. The villa exceeded our expectations in every way. The private chef made our anniversary truly memorable.",
      author: "Sarah & James Mitchell",
      location: "London, UK"
    },
    {
      quote: "Villa Elite has transformed how we vacation. The level of service and attention to detail is unmatched. We've already booked our next stay.",
      author: "Michael Chen",
      location: "Singapore"
    },
    {
      quote: "From the moment we arrived, everything was perfect. The concierge team's attention to our every need was extraordinary.",
      author: "Elena Rossi",
      location: "Milan, Italy"
    }
  ]

  return (
    <section ref={ref} className="py-20 lg:py-40 px-6 lg:px-12 bg-white dark:bg-[#FFFEF9]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className={`editorial-subheading text-lg text-[#C9A962] mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>{t('guestStories')}</p>
          <h2 className={`editorial-heading text-4xl lg:text-6xl text-gray-900 dark:text-[#2C2C2C] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
            {t('wordsOfPraise')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className={`p-8 lg:p-10 bg-gray-50 dark:bg-[#F8F6F0] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <svg className="w-8 h-8 text-[#C9A962] mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-700 dark:text-[#2C2C2C] leading-relaxed mb-6">{testimonial.quote}</p>
              <div>
                <p className="editorial-heading text-lg text-gray-900 dark:text-[#2C2C2C]">{testimonial.author}</p>
                <p className="text-xs text-gray-500 dark:text-[#8B8680]">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Booking Form
function BookingForm() {
  const { t } = useContext(LanguageContext)
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-20 lg:py-40 px-6 lg:px-12 bg-gray-100 dark:bg-[#2C2C2C]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <p className="editorial-subheading text-lg text-[#C9A962] mb-3">{t('beginYourJourney')}</p>
            <h2 className="editorial-heading text-4xl lg:text-5xl text-gray-900 dark:text-[#F8F6F0] mb-6">{t('findYourPerfectVilla')}</h2>
            <p className="text-gray-600 dark:text-[#8B8680] mb-8 leading-relaxed">
              {t('conciergeDesc')}
            </p>
            <div className="flex items-center gap-4 text-gray-900 dark:text-[#F8F6F0]">
              <div className="w-12 h-12 rounded-full border border-[#C9A962] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#C9A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-[#8B8680] uppercase tracking-[0.1em]">{t('concierge24')}</p>
                <p className="text-lg text-gray-900 dark:text-[#F8F6F0]">+1 (800) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className={`bg-white dark:bg-[#FFFEF9] p-8 lg:p-12 shadow-xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: '200ms' }}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-gray-500 mb-2">{t('whereTo')}</label>
                <select className="w-full px-4 py-3 border border-gray-300 text-sm bg-transparent focus:border-[#C9A962] focus:outline-none transition-colors">
                  <option>Select Destination</option>
                  <option>Santorini, Greece</option>
                  <option>Amalfi Coast, Italy</option>
                  <option>Marbella, Spain</option>
                  <option>Hurghada, Egypt</option>
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-gray-500 mb-2">{t('addGuests')}</label>
                <select className="w-full px-4 py-3 border border-gray-300 text-sm bg-transparent focus:border-[#C9A962] focus:outline-none transition-colors">
                  <option>Number of Guests</option>
                  <option>2-4 guests</option>
                  <option>5-8 guests</option>
                  <option>9-12 guests</option>
                  <option>12+ guests</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-gray-500 mb-2">{t('checkIn')}</label>
                <input type="date" className="w-full px-4 py-3 border border-gray-300 text-sm bg-transparent focus:border-[#C9A962] focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-gray-500 mb-2">{t('checkOut')}</label>
                <input type="date" className="w-full px-4 py-3 border border-gray-300 text-sm bg-transparent focus:border-[#C9A962] focus:outline-none transition-colors" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-xs tracking-[0.1em] uppercase text-gray-500 mb-2">{t('email')}</label>
              <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 border border-gray-300 text-sm bg-transparent focus:border-[#C9A962] focus:outline-none transition-colors placeholder:text-gray-400" />
            </div>
            <button className="w-full py-4 bg-[#C9A962] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#2C2C2C] transition-all duration-300">
              {t('requestAvailability')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const { t, lang } = useContext(LanguageContext)
  const isRTL = lang === 'ar'

  return (
    <footer id="contact" className="py-20 lg:py-32 px-6 lg:px-12 bg-gray-900 dark:bg-[#2C2C2C]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16" dir={isRTL ? 'rtl' : 'ltr'}>
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="editorial-heading text-3xl tracking-wide block mb-6">
              <span className="text-white">VILLA</span>
              <span className="text-[#C9A962] ml-2">ELITE</span>
            </a>
            <p className="text-gray-400 mb-6 max-w-md">
              Curating the world's most extraordinary private villas for discerning travelers since 2010. Experience luxury reimagined.
            </p>
            <div className="flex gap-4">
              {['instagram', 'facebook', 'twitter', 'pinterest'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 border border-gray-600 flex items-center justify-center hover:border-[#C9A962] hover:bg-[#C9A962] transition-all duration-300 group">
                  <span className="text-xs text-gray-400 group-hover:text-white uppercase">{social.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {[t('ourCollectionLink'), t('experiences'), t('aboutUs'), t('press'), t('careers')].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 hover:text-[#C9A962] transition-colors duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white mb-6">{t('contact')}</h4>
            <ul className="space-y-3">
              <li className="text-sm text-gray-400">
                <span className="block text-[10px] text-gray-500 uppercase tracking-[0.1em]">{t('email')}</span>
                reservations@villaelite.com
              </li>
              <li className="text-sm text-gray-400">
                <span className="block text-[10px] text-gray-500 uppercase tracking-[0.1em]">{t('phone')}</span>
                +1 (800) 123-4567
              </li>
              <li className="text-sm text-gray-400">
                <span className="block text-[10px] text-gray-500 uppercase tracking-[0.1em]">{t('address')}</span>
                123 Luxury Lane, Monaco
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2024 {t('copyright')}</p>
          <div className="flex gap-6">
            {[t('privacyPolicy'), t('termsOfService'), t('cookiePolicy')].map((link) => (
              <a key={link} href="#" className="text-xs text-gray-500 hover:text-[#C9A962] transition-colors duration-300">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [lang, setLang] = useState<Language>('en')
  const [scrollProgress, setScrollProgress] = useState(0)

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const t = (key: keyof typeof translations.en): string => {
    return translations[lang][key] || translations.en[key]
  }

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.body.classList.toggle('bg-white', theme === 'light')
    document.body.classList.toggle('text-gray-900', theme === 'light')
    document.body.classList.toggle('dark:bg-[#1A1814]', theme === 'dark')
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ lang, setLang, t }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-[#1A1814] text-white'}`}>
                <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
                <Navigation />
                <WeatherWidget />
                <Hero />
                <Stats />
                <VillaCollection />
                <Experience />
                <Testimonials />
                <BookingForm />
                <Footer />
                <AIChatWidget />
              </div>
            } />
            <Route path="/villa/:id" element={<VillaDetail />} />
          </Routes>
        </BrowserRouter>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App