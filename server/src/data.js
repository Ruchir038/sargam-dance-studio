import config from '../../studio.config.json' with { type: 'json' };

export const studioConfig = config;

export const danceStyles = [
  {
    id: 'style-1',
    slug: 'bollywood-commercial',
    name: 'Bollywood Commercial & Masala',
    nameHindi: 'बॉलीवुड मसाला',
    tagline: 'High energy, cinematic hooksteps, pure celebratory joy!',
    description: 'Master the iconic expressions, footwork, and viral choreography of Bollywood. From retro thumkas to modern chartbusters, this batch brings out your inner movie superstar.',
    level: ['All Levels', 'Beginner', 'Intermediate'],
    bpmRange: '100 - 130 BPM',
    color: '#FF2E93',
    accentColor: '#FFB000',
    tags: ['Trending Choreo', 'Expression / Thumkas', 'High Energy', 'Stage Confidence'],
    heroImage: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=900&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-dancers-performing-in-a-studio-41131-large.mp4',
    popularInJaipur: '⭐⭐⭐⭐⭐ #1 for College Events & Social Gatherings'
  },
  {
    id: 'style-2',
    slug: 'urban-hip-hop',
    name: 'Desi Hip-Hop & Street Urban',
    nameHindi: 'हिप-हॉप अर्बन',
    tagline: 'Grooves, popping, freezes, and raw street energy.',
    description: 'Learn authentic street styles including popping, locking, breaking basics, and urban choreography. Build rhythm precision, swag, and battle-ready freestyle.',
    level: ['Beginner', 'Advanced'],
    bpmRange: '85 - 110 BPM',
    color: '#7B2FFF',
    accentColor: '#00F5D4',
    tags: ['Popping & Waves', 'Freestyle Cyphers', 'B-Boy Basics', 'Urban Isolation'],
    heroImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=900&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-street-dancer-dancing-in-the-street-40995-large.mp4',
    popularInJaipur: 'Huge favorite among youth & university dancers in Malviya Nagar'
  },
  {
    id: 'style-3',
    slug: 'kathak-fusion',
    name: 'Kathak Fusion & Semi-Classical',
    nameHindi: 'कथक फ्यूजन',
    tagline: 'Graceful chakkars, intricate tatkar footwork, soulful fusion.',
    description: 'Jaipur Gharana Kathak fundamentals fused with modern musical aesthetics. Learn mudras, rhythm cycles (teentaal), expressive abhinaya, and fluid spins.',
    level: ['Beginner', 'Intermediate'],
    bpmRange: '90 - 120 BPM',
    color: '#FFB000',
    accentColor: '#FF2E93',
    tags: ['Jaipur Gharana', 'Ghungroo & Tatkar', 'Grace & Poise', 'Spins / Chakkars'],
    heroImage: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=900&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-female-dancer-dancing-ballet-in-a-studio-41135-large.mp4',
    popularInJaipur: 'Rooted in Jaipur heritage with a contemporary modern twist'
  },
  {
    id: 'style-4',
    slug: 'contemporary-lyrical',
    name: 'Contemporary & Lyrical Flow',
    nameHindi: 'कंटेम्परेरी',
    tagline: 'Storytelling through body lines, floorwork, and emotional release.',
    description: 'Explore floor transitions, controlled balance, leaps, and breath-connected movements. A deeply expressive style that enhances flexibility and core strength.',
    level: ['Intermediate', 'Open'],
    bpmRange: '75 - 95 BPM',
    color: '#00F5D4',
    accentColor: '#7B2FFF',
    tags: ['Floorwork', 'Emotional Release', 'Flexibility', 'Body Alignment'],
    heroImage: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=900&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-ballerina-spinning-in-a-dance-studio-41136-large.mp4',
    popularInJaipur: 'Soul-touching routines & stage performance training'
  },
  {
    id: 'style-5',
    slug: 'zumba-cardio-jam',
    name: 'Zumba Fitness & Cardio Jam',
    nameHindi: 'ज़ुम्बा फिटनेस',
    tagline: 'Burn 500+ calories with non-stop Bollywood & Latin beats!',
    description: 'Ditch the boring gym workout! Join high-intensity aerobic dance intervals set to energetic tracks. Boost cardiovascular health, tone muscles, and melt away stress.',
    level: ['All Levels / High Energy'],
    bpmRange: '120 - 145 BPM',
    color: '#FF2E93',
    accentColor: '#FFB000',
    tags: ['Calorie Burn 500+', 'Endurance', 'Fun Workout', 'Morning & Evening Batches'],
    heroImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-gym-class-with-people-exercising-in-a-gym-41870-large.mp4',
    popularInJaipur: 'Jaipur\'s #1 choice for weight loss & joyful fitness'
  },
  {
    id: 'style-6',
    slug: 'wedding-sangeet',
    name: 'Royal Wedding & Sangeet Choreography',
    nameHindi: 'संगीत एवं वेडिंग कोरियोग्राफी',
    tagline: 'Grand bridal entries, couple romantic duets, family flashmobs.',
    description: 'From luxury Jaipur palace weddings at Fairmont and Rambagh to destination sangeets, our choreographers craft customized, easy-to-learn routines for families, couples, and friends.',
    level: ['Custom / Non-Dancers Welcome'],
    bpmRange: '100 - 128 BPM',
    color: '#FFB000',
    accentColor: '#7B2FFF',
    tags: ['Couple Duets', 'Family Flash Mob', 'Concept Entries', 'Audio Editing Included'],
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-dancers-performing-in-a-studio-41131-large.mp4',
    popularInJaipur: 'Over 200+ blockbuster sangeet shows choreographed in Rajasthan'
  },
  {
    id: 'style-7',
    slug: 'kids-freestyle',
    name: 'Little Ustaads (Kids 4-12 Yrs)',
    nameHindi: 'छोटे उस्ताद (किड्स)',
    tagline: 'Coordination, posture, rhythm sense, and infectious joy.',
    description: 'A playful and structured dance program designed specifically for young energetic dancers. Nurtures musicality, motor skills, social teamwork, and confidence on stage.',
    level: ['Kids 4-7 yrs', 'Juniors 8-12 yrs'],
    bpmRange: '105 - 125 BPM',
    color: '#00F5D4',
    accentColor: '#FF2E93',
    tags: ['Confidence Building', 'Motor Skills', 'Stage Show Opportunities', 'Parent Mode App'],
    heroImage: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=900&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-dancers-performing-in-a-studio-41131-large.mp4',
    popularInJaipur: 'Weekend batches + annual stage showcases at Birla Auditorium'
  }
];

export const instructors = [
  {
    id: 'inst-1',
    name: 'Vikram "V-Funk" Sharma',
    role: 'Founder & Lead Urban Choreographer',
    experience: '12+ Years Experience',
    bio: 'Ex-Dance India Dance finalist and national battle judge. Vikram founded Sargam Dance Studio with the vision of putting Jaipur on India\'s professional dance map.',
    styles: ['Desi Hip-Hop', 'Bollywood Commercial', 'Urban Choreo'],
    signatureMove: 'The Jaipur Pop-Freeze',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    instagram: '@vikram_vfunk_jaipur',
    rating: 4.98
  },
  {
    id: 'inst-2',
    name: 'Pooja Shekhawat',
    role: 'Kathak Nritya Visharad & Contemporary Artist',
    experience: '9+ Years Experience',
    bio: 'Trained under Jaipur Gharana doyens. Pooja blends the royal grace of Rajasthan with modern contemporary floorwork, creating spellbinding stage pieces.',
    styles: ['Kathak Fusion', 'Contemporary Flow', 'Lyrical'],
    signatureMove: '32-Count Chakkars in Teentaal',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    instagram: '@pooja_kathak_flows',
    rating: 4.95
  },
  {
    id: 'inst-3',
    name: 'Rahul "B-Boy Beat" Verma',
    role: 'Street Style & Breaking Specialist',
    experience: '8+ Years Experience',
    bio: 'Pioneer of underground street cyphers in Jaipur. Rahul coaches the Sargam Crew for university battles and commercial music video productions.',
    styles: ['Breaking', 'Popping & Waves', 'House Dance'],
    signatureMove: 'Windmill into Air-Freeze',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    instagram: '@bboy_rahul_jaipur',
    rating: 4.92
  },
  {
    id: 'inst-4',
    name: 'Simran Mathur',
    role: 'Certified Zumba & Dance Aerobics Coach',
    experience: '7+ Years Experience',
    bio: 'Certified ZIN member with an electrifying playlist. Simran makes morning and evening workouts feel like a party where calories simply melt away.',
    styles: ['Zumba Fitness', 'Bollywood Cardio', 'HIIT Dance'],
    signatureMove: 'Bhangra High-Knee Drop',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
    instagram: '@simran_zumba_groove',
    rating: 4.97
  },
  {
    id: 'inst-5',
    name: 'Aryan Joshi',
    role: 'Wedding & Sangeet Creative Director',
    experience: '10+ Years Experience',
    bio: 'Choreographed 200+ grand sangeet productions across Jaipur, Udaipur, and Delhi. Known for patience with beginner family members and jaw-dropping bridal entries.',
    styles: ['Sangeet Special', 'Folk Fusion', 'Couples Choreo'],
    signatureMove: 'Cinematic Royal Duet Lift',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
    instagram: '@aryan_sangeet_jaipur',
    rating: 4.99
  }
];

// Spot layout for Spot Wars formation
const defaultFormation = [
  { id: 'F1', row: 'Front Row (Spotlight)', num: 1, isBooked: false, reservedFor: null },
  { id: 'F2', row: 'Front Row (Spotlight)', num: 2, isBooked: true, reservedFor: 'Ananya S.' },
  { id: 'F3', row: 'Front Row (Center Stage)', num: 3, isBooked: true, reservedFor: 'Kunal R.' },
  { id: 'F4', row: 'Front Row (Spotlight)', num: 4, isBooked: false, reservedFor: null },
  { id: 'M1', row: 'Mid Formation', num: 5, isBooked: false, reservedFor: null },
  { id: 'M2', row: 'Mid Formation', num: 6, isBooked: false, reservedFor: null },
  { id: 'M3', row: 'Mid Formation (Center)', num: 7, isBooked: true, reservedFor: 'Priya M.' },
  { id: 'M4', row: 'Mid Formation', num: 8, isBooked: false, reservedFor: null },
  { id: 'M5', row: 'Mid Formation', num: 9, isBooked: false, reservedFor: null },
  { id: 'B1', row: 'Back Row (Groove Zone)', num: 10, isBooked: false, reservedFor: null },
  { id: 'B2', row: 'Back Row (Groove Zone)', num: 11, isBooked: false, reservedFor: null },
  { id: 'B3', row: 'Back Row (Groove Zone)', num: 12, isBooked: false, reservedFor: null },
  { id: 'B4', row: 'Back Row (Groove Zone)', num: 13, isBooked: false, reservedFor: null },
  { id: 'B5', row: 'Back Row (Groove Zone)', num: 14, isBooked: true, reservedFor: 'Rohan V.' }
];

export const batches = [
  {
    id: 'batch-1',
    title: 'Bollywood Hookstep Hype (Evening)',
    styleSlug: 'bollywood-commercial',
    instructorId: 'inst-1',
    branch: 'Malviya Nagar (Main Studio)',
    level: 'All Levels',
    days: ['Mon', 'Wed', 'Fri'],
    time: '6:30 PM – 7:30 PM',
    capacity: 14,
    enrolledCount: 9,
    price: 2499,
    status: 'Filling Fast 🔥',
    spotsMap: defaultFormation,
    nextSessionCountdownMinutes: 45
  },
  {
    id: 'batch-2',
    title: 'Desi Hip-Hop & Urban Cypher',
    styleSlug: 'urban-hip-hop',
    instructorId: 'inst-3',
    branch: 'Malviya Nagar (Main Studio)',
    level: 'Beginner to Intermediate',
    days: ['Tue', 'Thu', 'Sat'],
    time: '7:30 PM – 8:30 PM',
    capacity: 14,
    enrolledCount: 11,
    price: 2499,
    status: 'Only 3 Spots Left!',
    spotsMap: defaultFormation,
    nextSessionCountdownMinutes: 105
  },
  {
    id: 'batch-3',
    title: 'Kathak & Semi-Classical Grace',
    styleSlug: 'kathak-fusion',
    instructorId: 'inst-2',
    branch: 'Vaishali Nagar Studio',
    level: 'Beginner & Foundation',
    days: ['Tue', 'Thu', 'Sat'],
    time: '5:30 PM – 6:30 PM',
    capacity: 14,
    enrolledCount: 7,
    price: 2699,
    status: 'Open for Enrolment',
    spotsMap: defaultFormation,
    nextSessionCountdownMinutes: 220
  },
  {
    id: 'batch-4',
    title: 'Morning Zumba Glow Sweat',
    styleSlug: 'zumba-cardio-jam',
    instructorId: 'inst-4',
    branch: 'Malviya Nagar (Main Studio)',
    level: 'All Levels',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    time: '7:00 AM – 8:00 AM',
    capacity: 16,
    enrolledCount: 12,
    price: 2299,
    status: 'Active & Energetic',
    spotsMap: defaultFormation,
    nextSessionCountdownMinutes: 540
  },
  {
    id: 'batch-5',
    title: 'Contemporary Floor & Lyrical Flow',
    styleSlug: 'contemporary-lyrical',
    instructorId: 'inst-2',
    branch: 'Malviya Nagar (Main Studio)',
    level: 'Intermediate',
    days: ['Mon', 'Wed', 'Fri'],
    time: '8:30 PM – 9:30 PM',
    capacity: 12,
    enrolledCount: 8,
    price: 2699,
    status: 'Filling Fast',
    spotsMap: defaultFormation,
    nextSessionCountdownMinutes: 165
  },
  {
    id: 'batch-6',
    title: 'Little Ustaads Junior Stars',
    styleSlug: 'kids-freestyle',
    instructorId: 'inst-1',
    branch: 'Vaishali Nagar Studio',
    level: 'Kids 5-11 yrs',
    days: ['Sat', 'Sun'],
    time: '4:00 PM – 5:15 PM',
    capacity: 14,
    enrolledCount: 10,
    price: 1999,
    status: 'Weekend Special',
    spotsMap: defaultFormation,
    nextSessionCountdownMinutes: 820
  }
];

export const workshops = [
  {
    id: 'ws-1',
    slug: 'jaipur-hip-hop-masterclass',
    title: 'Mega Hip-Hop & Urban Intensive with V-Funk',
    guestArtist: 'Vikram "V-Funk" & Surprise Guest from DID',
    date: 'Sunday, 26 October 2026',
    time: '11:00 AM – 3:30 PM (4.5 Hours)',
    venue: 'Sargam Main Studio, Near Gaurav Tower, Malviya Nagar, Jaipur',
    poster: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=900&auto=format&fit=crop&q=80',
    description: '4.5 hours of high-octane popping isolations, musicality breakdown, and an exclusive camera shoot routine. Every participant receives high-def reel video footage and a certification badge!',
    status: 'Drop Live 🚀',
    earlyBirdDeadline: '3 Days Left',
    tiers: [
      { name: 'Early Bird Pass', price: 799, originalPrice: 1299, limit: 25, sold: 19, tag: 'Selling Fast!' },
      { name: 'VIP Front Formation + Solo Reel', price: 1499, originalPrice: 2199, limit: 10, sold: 8, tag: 'Only 2 Left!' },
      { name: 'Duo Pass (Dance with a Friend)', price: 1399, originalPrice: 2400, limit: 15, sold: 10, tag: 'Best Value' }
    ]
  },
  {
    id: 'ws-2',
    slug: 'royal-rajasthani-sangeet-mastery',
    title: 'Grand Bollywood & Sangeet Workshop for Couples & Solo',
    guestArtist: 'Aryan Joshi & Pooja Shekhawat',
    date: 'Saturday, 1 November 2026',
    time: '4:00 PM – 7:00 PM',
    venue: 'Sargam Studio, Vaishali Nagar Branch, Jaipur',
    poster: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&auto=format&fit=crop&q=80',
    description: 'Learn viral wedding choreography routines, graceful couple spins, and stage presence secrets for the upcoming Rajasthan wedding season.',
    status: 'Upcoming Drop',
    earlyBirdDeadline: 'Opens in 4 days',
    tiers: [
      { name: 'Solo Dancer Entry', price: 699, originalPrice: 999, limit: 30, sold: 7, tag: 'Available' },
      { name: 'Couple Entry (2 Passes)', price: 1199, originalPrice: 1800, limit: 20, sold: 12, tag: 'Popular' }
    ]
  }
];

export const reviews = [
  {
    id: 'rev-1',
    name: 'Ritika Khandelwal',
    locality: 'Malviya Nagar, Jaipur',
    rating: 5,
    style: 'Bollywood Commercial',
    text: 'Sargam is not just a dance class; it is pure therapy! Vikram sir breaks down steps so effortlessly that even introverts like me were dancing in the front row within 2 weeks. The energy in the studio is unreal! 💖',
    date: '2 weeks ago',
    source: 'Google Review',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Aditya Singhania',
    locality: 'Vaishali Nagar, Jaipur',
    rating: 5,
    style: 'Desi Hip-Hop',
    text: 'Best hip-hop studio in Jaipur hands down. Rahul sir\'s popping techniques and musicality drills are top-notch. The studio mirrors, neon lighting, and sound system feel like Mumbai or Delhi level.',
    date: '1 month ago',
    source: 'Google Review',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Dr. Meenakshi Rathore',
    locality: 'C-Scheme, Jaipur',
    rating: 5,
    style: 'Kathak Fusion',
    text: 'Pooja ma\'am explains the teentaal rhythms and chakkars with so much patience and depth. After years of pause, I finally rekindled my classical love. Very grateful to Sargam Dance Studio.',
    date: '3 weeks ago',
    source: 'Google Review',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Sameer & Tanvi Agarwal',
    locality: 'Mansarovar, Jaipur',
    rating: 5,
    style: 'Wedding Sangeet',
    text: 'Aryan choreographed our wedding sangeet at Fairmont Jaipur. Our non-dancer chachas and cousins stole the entire show! Every guest asked which academy taught us. Worth every single rupee!',
    date: 'Last month',
    source: 'Google Review',
    verified: true
  },
  {
    id: 'rev-5',
    name: 'Neha Chhabra',
    locality: 'Raja Park, Jaipur',
    rating: 5,
    style: 'Zumba Fitness',
    text: 'Lost 4 kgs in 6 weeks with Simran\'s Zumba morning batch! Her Bollywood playlist makes you forget that you are actually burning 500+ calories. Super friendly crowd!',
    date: '2 weeks ago',
    source: 'Google Review',
    verified: true
  }
];

export const packages = [
  {
    id: 'pkg-trial',
    name: 'First Beat Trial Pass',
    badge: '100% Free / Jaipur Resident',
    price: 0,
    classes: 1,
    validity: 'Valid for 7 Days',
    features: [
      'Access to any 1 regular batch',
      'Free dance posture & style assessment',
      'Meet instructor & tour Jaipur studio',
      'Zero obligation'
    ],
    cta: 'Claim Free Trial',
    isPopular: false
  },
  {
    id: 'pkg-dropin',
    name: 'Single Class Drop-In',
    badge: 'Flexible',
    price: 399,
    classes: 1,
    validity: 'Valid for 1 Day',
    features: [
      'Attend any style session',
      'Formation spot reservation',
      'Studio locker & water station access',
      'Great for visitors & travelers'
    ],
    cta: 'Book Single Class',
    isPopular: false
  },
  {
    id: 'pkg-monthly',
    name: 'Groove 12 Pass (Monthly)',
    badge: '🔥 Most Popular',
    price: 2499,
    classes: 12,
    validity: '30 Days Validity',
    features: [
      '12 Scheduled Batch Classes (3x/week)',
      'Free routine video shoots with studio lights',
      'Reschedule up to 2 missed classes',
      'Access to student community cyphers',
      '10% off guest weekend workshops'
    ],
    cta: 'Join Groove 12',
    isPopular: true
  },
  {
    id: 'pkg-unlimited',
    name: 'All-Access Unlimited Pro',
    badge: 'Dancer VIP',
    price: 3999,
    classes: 30,
    validity: '30 Days Validity',
    features: [
      'Unlimited classes across all styles & branches',
      'Bollywood + Hip-Hop + Zumba combo',
      'Free admission to 1 monthly masterclass',
      'Priority front-row formation booking',
      'Exclusive Sargam studio merch t-shirt'
    ],
    cta: 'Go Unlimited',
    isPopular: false
  },
  {
    id: 'pkg-sangeet',
    name: 'Shaadi Sangeet Express',
    badge: 'Wedding Special',
    price: 9999,
    classes: 10,
    validity: 'Custom Duration',
    features: [
      '5 customized routine choreographies',
      'Couple duet + family flashmob track editing',
      'Rehearsal studio slots reserved',
      'Video guide practice tutorials sent to WhatsApp',
      'On-stage dry run rehearsal at venue'
    ],
    cta: 'Plan Your Sangeet',
    isPopular: false
  }
];

export const reelsMedia = [
  {
    id: 'reel-1',
    title: 'Gully Hip-Hop Jaipur Street Cypher',
    choreographer: 'Rahul & Vikram',
    views: '48.2K',
    likes: '3.4K',
    style: 'Hip-Hop',
    audio: 'Divine × Karan Aujla - 100 Million Remix',
    thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-street-dancer-dancing-in-the-street-40995-large.mp4'
  },
  {
    id: 'reel-2',
    title: 'Tauba Tauba Hookstep Mania at Sargam',
    choreographer: 'Vikram Sharma',
    views: '89.5K',
    likes: '7.8K',
    style: 'Bollywood',
    audio: 'Karan Aujla - Tauba Tauba',
    thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-dancers-performing-in-a-studio-41131-large.mp4'
  },
  {
    id: 'reel-3',
    title: 'Ghoomar Meets Contemporary Spin',
    choreographer: 'Pooja Shekhawat',
    views: '35.1K',
    likes: '4.1K',
    style: 'Kathak / Fusion',
    audio: 'Padmaavat - Ghoomar Classical Chill Edit',
    thumbnail: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-ballerina-spinning-in-a-dance-studio-41136-large.mp4'
  },
  {
    id: 'reel-4',
    title: 'Morning 7 AM Zumba Sweat Energy!',
    choreographer: 'Simran Mathur',
    views: '22.8K',
    likes: '2.1K',
    style: 'Zumba',
    audio: 'Daddy Yankee × Bollywood Beat Mashup',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-gym-class-with-people-exercising-in-a-gym-41870-large.mp4'
  }
];

export const leaderboard = [
  { rank: 1, name: 'Tanya Saxena', xp: 4820, streakWeeks: 14, belt: 'Star 🌟', styles: ['Bollywood', 'Hip-Hop'], avatar: '👩‍🎤' },
  { rank: 2, name: 'Harshit Bansal', xp: 4350, streakWeeks: 11, belt: 'Fire 🔥', styles: ['Urban Cypher'], avatar: '🕺' },
  { rank: 3, name: 'Ananya Shekhawat', xp: 3980, streakWeeks: 9, belt: 'Fire 🔥', styles: ['Kathak Fusion'], avatar: '💃' },
  { rank: 4, name: 'Karan Meena', xp: 3410, streakWeeks: 8, belt: 'Flow 🌊', styles: ['Zumba', 'Bollywood'], avatar: '⚡' },
  { rank: 5, name: 'Divya Purohit', xp: 3120, streakWeeks: 6, belt: 'Flow 🌊', styles: ['Contemporary'], avatar: '🌸' },
  { rank: 6, name: 'Rohan Verma', xp: 2850, streakWeeks: 5, belt: 'Groove 🎵', styles: ['Hip-Hop'], avatar: '🧢' }
];

export const initialLeads = [
  {
    id: 'lead-1',
    name: 'Siddharth Bhargava',
    phone: '+91 98291 55678',
    email: 'sid.bhargava@gmail.com',
    interestedStyle: 'Urban Hip-Hop',
    branch: 'Malviya Nagar',
    status: 'Trial Scheduled',
    message: 'Want to join evening cypher batch after office at 7 PM.',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'lead-2',
    name: 'Apeksha Goyal',
    phone: '+91 99280 23411',
    email: 'apeksha.goyal@yahoo.com',
    interestedStyle: 'Bollywood Commercial',
    branch: 'Vaishali Nagar',
    status: 'New Lead',
    message: 'Looking for trial class for me and my sister this Saturday.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'lead-3',
    name: 'Rajesh & Suman Gupta',
    phone: '+91 94140 88219',
    email: 'gupta.sangeet@gmail.com',
    interestedStyle: 'Wedding Sangeet',
    branch: 'Malviya Nagar',
    status: 'Contacted',
    message: 'Daughter\'s wedding in December in Jaipur. Need 4 family songs choreographed.',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
  }
];

export const choreoMoves = [
  { id: 'm-1', name: 'Jaipur Thumka', style: 'Bollywood', bpm: 105, icon: '💃', beats: 4 },
  { id: 'm-2', name: 'Street Wave Isolation', style: 'Hip-Hop', bpm: 100, icon: '🌊', beats: 4 },
  { id: 'm-3', name: 'Kathak Spin (Chakkar)', style: 'Classical', bpm: 95, icon: '🌪️', beats: 8 },
  { id: 'm-4', name: 'B-Boy Kick Freeze', style: 'Breaking', bpm: 110, icon: '⚡', beats: 4 },
  { id: 'm-5', name: 'Bhangra Shoulder Pop', style: 'Folk', bpm: 120, icon: '🕺', beats: 4 },
  { id: 'm-6', name: 'Lyrical Sweep & Drop', style: 'Contemporary', bpm: 85, icon: '🍃', beats: 8 },
  { id: 'm-7', name: 'Viral Hookstep Bounce', style: 'Bollywood', bpm: 115, icon: '🔥', beats: 4 },
  { id: 'm-8', name: 'Zumba Salsa Stomp', style: 'Fitness', bpm: 125, icon: '✨', beats: 4 }
];

export const studioPlaylists = [
  {
    id: 'pl-1',
    title: 'High-Voltage Bollywood Hype 2026',
    curator: 'Vikram V-Funk',
    tracksCount: 24,
    duration: '1 hr 18 min',
    vibe: 'Party / Workout / Cinematic',
    cover: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=500&auto=format&fit=crop&q=80',
    topTracks: ['Tauba Tauba', 'Chaleya Remix', 'What Jhumka Club Mix', 'Badass Babua']
  },
  {
    id: 'pl-2',
    title: 'Desi Street Underground Cypher',
    curator: 'Rahul B-Boy Beat',
    tracksCount: 18,
    duration: '58 min',
    vibe: 'Popping / Battle / 90s Beats',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80',
    topTracks: ['100 Million', 'Gully Gang Anthem', 'Mirchi Funk', 'Street King Cypher']
  },
  {
    id: 'pl-3',
    title: 'Royal Sangeet & Folk Fusion',
    curator: 'Aryan Joshi & Pooja',
    tracksCount: 30,
    duration: '1 hr 42 min',
    vibe: 'Wedding / Celebratory / Chakkars',
    cover: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&auto=format&fit=crop&q=80',
    topTracks: ['Ghoomar Chill Edit', 'Kala Chashma Dhol', 'London Thumakda', 'Kesariya Sufi']
  },
  {
    id: 'pl-4',
    title: 'Morning Zumba Cardio Jam (135 BPM)',
    curator: 'Simran Mathur',
    tracksCount: 20,
    duration: '1 hr 05 min',
    vibe: 'High BPM / Calorie Burn / Non-Stop',
    cover: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=80',
    topTracks: ['Danza Kuduro', 'Gallan Goodiyaan Fast', 'Peggy Gou (Nanana)', 'Zumba Bomba']
  }
];
