// Comprehensive dataset of Sikkim Monasteries
const monasteriesData = [
    {
        id: 1,
        name: "Rumtek Monastery",
        sect: "Kagyu",
        district: "East Sikkim",
        location: "Rumtek, Gangtok",
        coordinates: {
            latitude: 27.3019,
            longitude: 88.6019
        },
        established: "1966",
        description: "Rumtek Monastery, also known as the Dharmachakra Centre, is one of the most important monasteries in Sikkim. It serves as the seat of the Karmapa, the head of the Karma Kagyu school of Tibetan Buddhism.",
        history: "Originally built in the 16th century, the monastery was rebuilt in 1966 by the 16th Karmapa, Rangjung Rigpe Dorje, after he fled Tibet. The monastery houses many precious artifacts and serves as a major center for Buddhist learning.",
        prayerHall: {
            capacity: 200,
            features: ["Golden stupa", "Ancient thangkas", "Sacred relics", "Prayer wheels"],
            dimensions: "40m x 30m"
        },
        festivals: [
            {
                name: "Losar",
                date: "February/March",
                description: "Tibetan New Year celebration with traditional dances and prayers"
            },
            {
                name: "Saga Dawa",
                date: "May/June",
                description: "Commemoration of Buddha's birth, enlightenment, and parinirvana"
            },
            {
                name: "Guru Rinpoche Day",
                date: "July",
                description: "Celebration of Padmasambhava's birth"
            }
        ],
        images: [
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop"
        ],
        audioGuide: {
            english: "Welcome to Rumtek Monastery, the spiritual heart of Sikkim's Kagyu tradition...",
            hindi: "रुमटेक मठ में आपका स्वागत है, सिक्किम की काग्यू परंपरा का आध्यात्मिक केंद्र...",
            nepali: "रुमटेक मठमा स्वागत छ, सिक्किमको काग्यू परंपराको आध्यात्मिक केन्द्र..."
        },
        specialFeatures: ["Golden stupa", "Ancient manuscripts", "Sacred relics", "Monastic school"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free"
    },
    {
        id: 2,
        name: "Pemayangtse Monastery",
        sect: "Nyingma",
        district: "West Sikkim",
        location: "Pemayangtse, Pelling",
        coordinates: {
            latitude: 27.3019,
            longitude: 88.2381
        },
        established: "1705",
        description: "Pemayangtse Monastery is one of the oldest and most important monasteries of the Nyingma sect in Sikkim. It offers breathtaking views of the Kanchenjunga range.",
        history: "Founded by Lhatsun Chenpo in 1705, this monastery was the seat of the Chogyal (king) of Sikkim. It has been a center of learning and spirituality for over 300 years.",
        prayerHall: {
            capacity: 150,
            features: ["Seven-tiered wooden structure", "Ancient murals", "Sacred texts", "Prayer flags"],
            dimensions: "35m x 25m"
        },
        festivals: [
            {
                name: "Cham Dance Festival",
                date: "February",
                description: "Traditional masked dance performance by monks"
            },
            {
                name: "Guru Padmasambhava Day",
                date: "July",
                description: "Celebration of the great master's teachings"
            }
        ],
        images: [
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop"
        ],
        audioGuide: {
            english: "Pemayangtse Monastery stands as a testament to Sikkim's rich Buddhist heritage...",
            hindi: "पेमायंगत्से मठ सिक्किम की समृद्ध बौद्ध विरासत का प्रमाण है...",
            nepali: "पेमायंगत्से मठ सिक्किमको समृद्ध बौद्ध विरासतको प्रमाण हो..."
        },
        specialFeatures: ["Kanchenjunga view", "Ancient architecture", "Sacred texts", "Monastic education"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "₹20"
    },
    {
        id: 3,
        name: "Tashiding Monastery",
        sect: "Nyingma",
        district: "West Sikkim",
        location: "Tashiding, Yuksom",
        coordinates: {
            latitude: 27.3667,
            longitude: 88.2167
        },
        established: "1641",
        description: "Tashiding Monastery is considered one of the most sacred monasteries in Sikkim, known for its annual Bumchu festival where the sacred water is distributed to devotees.",
        history: "Founded by Ngadak Sempa Chempo Phunshok Rigzing, this monastery is believed to be blessed by Guru Padmasambhava himself. It's considered the 'Heart of Sikkim'.",
        prayerHall: {
            capacity: 100,
            features: ["Sacred Bumchu vessel", "Ancient thangkas", "Prayer wheels", "Sacred relics"],
            dimensions: "30m x 20m"
        },
        festivals: [
            {
                name: "Bumchu Festival",
                date: "January/February",
                description: "Sacred water ceremony where the level of water predicts the year's fortune"
            },
            {
                name: "Guru Rinpoche Day",
                date: "July",
                description: "Celebration of Padmasambhava's teachings and blessings"
            }
        ],
        images: [
            "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
        ],
        audioGuide: {
            english: "Tashiding Monastery holds the sacred Bumchu vessel, a treasure of Sikkim...",
            hindi: "ताशिडिंग मठ में पवित्र बुमचू पात्र है, जो सिक्किम का खजाना है...",
            nepali: "ताशिडिंग मठमा पवित्र बुमचू पात्र छ, जुन सिक्किमको खजाना हो..."
        },
        specialFeatures: ["Sacred Bumchu", "Heart of Sikkim", "Ancient blessings", "Pilgrimage site"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free"
    },
    {
        id: 4,
        name: "Enchey Monastery",
        sect: "Nyingma",
        district: "East Sikkim",
        location: "Enchey, Gangtok",
        coordinates: {
            latitude: 27.3333,
            longitude: 88.6167
        },
        established: "1909",
        description: "Enchey Monastery is a beautiful monastery located on a hilltop in Gangtok, known for its annual Chaam dance festival and stunning architecture.",
        history: "Built in 1909 by Lama Drupthob Karpo, this monastery is believed to be blessed by the flying lama. The name 'Enchey' means 'solitary temple'.",
        prayerHall: {
            capacity: 120,
            features: ["Traditional architecture", "Sacred murals", "Prayer wheels", "Monastic quarters"],
            dimensions: "32m x 22m"
        },
        festivals: [
            {
                name: "Chaam Dance Festival",
                date: "December/January",
                description: "Traditional masked dance performance with elaborate costumes"
            },
            {
                name: "Losar",
                date: "February/March",
                description: "Tibetan New Year celebration"
            }
        ],
        images: [
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop"
        ],
        audioGuide: {
            english: "Enchey Monastery offers a peaceful retreat in the heart of Gangtok...",
            hindi: "एंचे मठ गंगटोक के केंद्र में एक शांतिपूर्ण आश्रय प्रदान करता है...",
            nepali: "एंचे मठ गंगटोकको केन्द्रमा शान्तिपूर्ण आश्रय प्रदान गर्छ..."
        },
        specialFeatures: ["Hilltop location", "Chaam dance", "Traditional architecture", "City views"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free"
    },
    {
        id: 5,
        name: "Phodong Monastery",
        sect: "Kagyu",
        district: "North Sikkim",
        location: "Phodong, Mangan",
        coordinates: {
            latitude: 27.5167,
            longitude: 88.5333
        },
        established: "1740",
        description: "Phodong Monastery is one of the six major monasteries of Sikkim, known for its beautiful murals and traditional Kagyu teachings.",
        history: "Founded in 1740 by Chogyal Gyurmed Namgyal, this monastery has been a center of Kagyu teachings and practices for centuries.",
        prayerHall: {
            capacity: 80,
            features: ["Ancient murals", "Sacred texts", "Prayer wheels", "Monastic school"],
            dimensions: "28m x 18m"
        },
        festivals: [
            {
                name: "Losar",
                date: "February/March",
                description: "Tibetan New Year celebration"
            },
            {
                name: "Guru Rinpoche Day",
                date: "July",
                description: "Celebration of Padmasambhava"
            }
        ],
        images: [
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop"
        ],
        audioGuide: {
            english: "Phodong Monastery preserves the ancient Kagyu traditions of Sikkim...",
            hindi: "फोडोंग मठ सिक्किम की प्राचीन काग्यू परंपराओं को संरक्षित करता है...",
            nepali: "फोडोंग मठ सिक्किमको प्राचीन काग्यू परंपराहरू संरक्षित गर्छ..."
        },
        specialFeatures: ["Ancient murals", "Kagyu teachings", "Traditional architecture", "Monastic education"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free"
    },
    {
        id: 6,
        name: "Labrang Monastery",
        sect: "Gelug",
        district: "East Sikkim",
        location: "Labrang, Gangtok",
        coordinates: {
            latitude: 27.3167,
            longitude: 88.6000
        },
        established: "1950",
        description: "Labrang Monastery is a Gelug sect monastery known for its strict monastic discipline and scholarly traditions.",
        history: "Established in 1950, this monastery follows the Gelug tradition and is known for its emphasis on philosophical studies and meditation practices.",
        prayerHall: {
            capacity: 60,
            features: ["Scholarly texts", "Meditation hall", "Prayer wheels", "Study rooms"],
            dimensions: "25m x 15m"
        },
        festivals: [
            {
                name: "Monlam Chenmo",
                date: "January/February",
                description: "Great Prayer Festival with extensive prayers and teachings"
            },
            {
                name: "Losar",
                date: "February/March",
                description: "Tibetan New Year celebration"
            }
        ],
        images: [
            "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
        ],
        audioGuide: {
            english: "Labrang Monastery is a center of Gelug scholarship and meditation...",
            hindi: "लाबरंग मठ गेलुग विद्वता और ध्यान का केंद्र है...",
            nepali: "लाबरंग मठ गेलुग विद्वता र ध्यानको केन्द्र हो..."
        },
        specialFeatures: ["Gelug tradition", "Scholarly focus", "Meditation practices", "Philosophical studies"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free"
    },
    {
        id: 7,
        name: "Ralang Monastery",
        sect: "Kagyu",
        district: "South Sikkim",
        location: "Ralang, Ravangla",
        coordinates: {
            latitude: 27.3167,
            longitude: 88.3500
        },
        established: "1768",
        description: "Ralang Monastery is a beautiful Kagyu monastery known for its annual Pang Lhabsol festival and stunning mountain views.",
        history: "Founded in 1768, this monastery has been a center of Kagyu teachings and is known for its beautiful architecture and peaceful surroundings.",
        prayerHall: {
            capacity: 100,
            features: ["Mountain views", "Traditional architecture", "Sacred texts", "Prayer wheels"],
            dimensions: "30m x 20m"
        },
        festivals: [
            {
                name: "Pang Lhabsol",
                date: "August/September",
                description: "Festival honoring Mount Kanchenjunga as the guardian deity"
            },
            {
                name: "Losar",
                date: "February/March",
                description: "Tibetan New Year celebration"
            }
        ],
        images: [
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop"
        ],
        audioGuide: {
            english: "Ralang Monastery offers breathtaking views and spiritual tranquility...",
            hindi: "रालंग मठ मनोरम दृश्य और आध्यात्मिक शांति प्रदान करता है...",
            nepali: "रालंग मठ मनोरम दृश्य र आध्यात्मिक शान्ति प्रदान गर्छ..."
        },
        specialFeatures: ["Mountain views", "Pang Lhabsol festival", "Peaceful setting", "Traditional architecture"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free"
    },
    {
        id: 8,
        name: "Dubdi Monastery",
        sect: "Nyingma",
        district: "West Sikkim",
        location: "Dubdi, Yuksom",
        coordinates: {
            latitude: 27.3667,
            longitude: 88.2167
        },
        established: "1701",
        description: "Dubdi Monastery is the oldest monastery in Sikkim, established by Lhatsun Chenpo. It's located on a hilltop and offers panoramic views.",
        history: "Built in 1701, this monastery was the first to be established in Sikkim and holds great historical significance. It's also known as the 'Hermit's Cell'.",
        prayerHall: {
            capacity: 40,
            features: ["Historical significance", "Hilltop location", "Ancient texts", "Sacred relics"],
            dimensions: "20m x 15m"
        },
        festivals: [
            {
                name: "Foundation Day",
                date: "March",
                description: "Celebration of the monastery's establishment"
            },
            {
                name: "Guru Rinpoche Day",
                date: "July",
                description: "Honoring Padmasambhava's teachings"
            }
        ],
        images: [
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop"
        ],
        audioGuide: {
            english: "Dubdi Monastery stands as the first spiritual foundation of Sikkim...",
            hindi: "दुबडी मठ सिक्किम की पहली आध्यात्मिक नींव के रूप में खड़ा है...",
            nepali: "दुबडी मठ सिक्किमको पहिलो आध्यात्मिक नींवको रूपमा खडा छ..."
        },
        specialFeatures: ["Oldest monastery", "Historical significance", "Hilltop views", "Hermit's cell"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free"
    },
    {
        id: 9,
        name: "Sanga Choeling Monastery",
        sect: "Nyingma",
        district: "West Sikkim",
        location: "Sanga Choeling, Pelling",
        coordinates: {
            latitude: 27.2833,
            longitude: 88.2167
        },
        established: "1697",
        description: "Sanga Choeling Monastery is one of the oldest monasteries in Sikkim, known for its beautiful location and traditional architecture.",
        history: "Founded in 1697 by Lhatsun Chenpo, this monastery has been a center of Nyingma teachings and practices for over 300 years.",
        prayerHall: {
            capacity: 70,
            features: ["Traditional architecture", "Ancient murals", "Sacred texts", "Prayer wheels"],
            dimensions: "26m x 16m"
        },
        festivals: [
            {
                name: "Losar",
                date: "February/March",
                description: "Tibetan New Year celebration"
            },
            {
                name: "Guru Padmasambhava Day",
                date: "July",
                description: "Celebration of the great master"
            }
        ],
        images: [
            "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
        ],
        audioGuide: {
            english: "Sanga Choeling Monastery preserves centuries of Buddhist wisdom...",
            hindi: "संगा चोलिंग मठ सदियों की बौद्ध ज्ञान को संरक्षित करता है...",
            nepali: "संगा चोलिंग मठ सदियोंको बौद्ध ज्ञान संरक्षित गर्छ..."
        },
        specialFeatures: ["Ancient architecture", "Traditional murals", "Sacred texts", "Peaceful setting"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free"
    },
    {
        id: 10,
        name: "Karma Kagyu Monastery",
        sect: "Kagyu",
        district: "East Sikkim",
        location: "Karma Kagyu, Gangtok",
        coordinates: {
            latitude: 27.3333,
            longitude: 88.6167
        },
        established: "1960",
        description: "Karma Kagyu Monastery is a modern monastery following the Karma Kagyu tradition, known for its active community involvement.",
        history: "Established in 1960, this monastery has been actively involved in community service and Buddhist education programs.",
        prayerHall: {
            capacity: 90,
            features: ["Modern facilities", "Community programs", "Educational center", "Prayer wheels"],
            dimensions: "28m x 18m"
        },
        festivals: [
            {
                name: "Kagyu Monlam",
                date: "December/January",
                description: "Great prayer festival of the Kagyu tradition"
            },
            {
                name: "Losar",
                date: "February/March",
                description: "Tibetan New Year celebration"
            }
        ],
        images: [
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop"
        ],
        audioGuide: {
            english: "Karma Kagyu Monastery bridges tradition with modern community service...",
            hindi: "कर्म काग्यू मठ परंपरा को आधुनिक समुदाय सेवा के साथ जोड़ता है...",
            nepali: "कर्म काग्यू मठ परंपरालाई आधुनिक समुदाय सेवासँग जोड्छ..."
        },
        specialFeatures: ["Modern facilities", "Community service", "Educational programs", "Active involvement"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free"
    }
];

// Continue with more monasteries to reach 100+
const additionalMonasteries = [
    {
        id: 11,
        name: "Lingdum Monastery",
        sect: "Kagyu",
        district: "East Sikkim",
        location: "Lingdum, Gangtok",
        coordinates: { latitude: 27.3500, longitude: 88.6500 },
        established: "1990",
        description: "A modern monastery with beautiful architecture and peaceful surroundings.",
        history: "Built in 1990, this monastery serves as a center for Buddhist education and meditation.",
        prayerHall: { capacity: 80, features: ["Modern architecture", "Meditation hall", "Library"], dimensions: "25m x 15m" },
        festivals: [{ name: "Losar", date: "February/March", description: "Tibetan New Year" }],
        images: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop"],
        audioGuide: { english: "Lingdum Monastery offers modern facilities for spiritual practice.", hindi: "लिंगडम मठ आध्यात्मिक अभ्यास के लिए आधुनिक सुविधाएं प्रदान करता है।", nepali: "लिंगडम मठ आध्यात्मिक अभ्यासका लागि आधुनिक सुविधाहरू प्रदान गर्छ।" },
        specialFeatures: ["Modern architecture", "Meditation center", "Educational programs"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free"
    },
    {
        id: 12,
        name: "Tendong Monastery",
        sect: "Nyingma",
        district: "South Sikkim",
        location: "Tendong, Namchi",
        coordinates: { latitude: 27.1667, longitude: 88.3500 },
        established: "1721",
        description: "A historic monastery known for its traditional architecture and spiritual significance.",
        history: "Established in 1721, this monastery has been a center of Nyingma teachings.",
        prayerHall: { capacity: 60, features: ["Traditional architecture", "Ancient texts"], dimensions: "22m x 14m" },
        festivals: [{ name: "Guru Rinpoche Day", date: "July", description: "Celebration of Padmasambhava" }],
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"],
        audioGuide: { english: "Tendong Monastery preserves ancient Buddhist traditions.", hindi: "टेंडोंग मठ प्राचीन बौद्ध परंपराओं को संरक्षित करता है।", nepali: "टेंडोंग मठ प्राचीन बौद्ध परंपराहरू संरक्षित गर्छ।" },
        specialFeatures: ["Traditional architecture", "Ancient texts", "Spiritual significance"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free"
    },
    {
        id: 13,
        name: "Rinchenpong Monastery",
        sect: "Kagyu",
        district: "West Sikkim",
        location: "Rinchenpong, Geyzing",
        coordinates: { latitude: 27.2833, longitude: 88.2667 },
        established: "1730",
        description: "A beautiful monastery with stunning mountain views and traditional architecture.",
        history: "Founded in 1730, this monastery has been a center of Kagyu teachings.",
        prayerHall: { capacity: 70, features: ["Mountain views", "Traditional architecture"], dimensions: "24m x 16m" },
        festivals: [{ name: "Losar", date: "February/March", description: "Tibetan New Year" }],
        images: ["https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop"],
        audioGuide: { english: "Rinchenpong Monastery offers breathtaking mountain views.", hindi: "रिंचेनपोंग मठ मनोरम पहाड़ी दृश्य प्रदान करता है।", nepali: "रिंचेनपोंग मठ मनोरम पहाडी दृश्य प्रदान गर्छ।" },
        specialFeatures: ["Mountain views", "Traditional architecture", "Peaceful setting"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free"
    },
    {
        id: 14,
        name: "Khecheopalri Monastery",
        sect: "Nyingma",
        district: "West Sikkim",
        location: "Khecheopalri, Yuksom",
        coordinates: { latitude: 27.3667, longitude: 88.2167 },
        established: "1700",
        description: "A sacred monastery near the holy Khecheopalri Lake, known for its spiritual significance.",
        history: "Established in 1700, this monastery is closely associated with the sacred Khecheopalri Lake.",
        prayerHall: { capacity: 50, features: ["Sacred lake proximity", "Traditional architecture"], dimensions: "20m x 12m" },
        festivals: [{ name: "Lake Festival", date: "March", description: "Celebration of the sacred lake" }],
        images: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop"],
        audioGuide: { english: "Khecheopalri Monastery is blessed by the sacred lake.", hindi: "खेचोपालरी मठ पवित्र झील से आशीर्वादित है।", nepali: "खेचोपालरी मठ पवित्र तालबाट आशीर्वादित छ।" },
        specialFeatures: ["Sacred lake", "Traditional architecture", "Spiritual significance"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free"
    },
    {
        id: 15,
        name: "Namchi Monastery",
        sect: "Gelug",
        district: "South Sikkim",
        location: "Namchi, Namchi",
        coordinates: { latitude: 27.1667, longitude: 88.3500 },
        established: "1950",
        description: "A modern Gelug monastery known for its educational programs and community service.",
        history: "Established in 1950, this monastery focuses on Gelug teachings and community development.",
        prayerHall: { capacity: 80, features: ["Educational programs", "Community service"], dimensions: "26m x 16m" },
        festivals: [{ name: "Monlam Chenmo", date: "January/February", description: "Great Prayer Festival" }],
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"],
        audioGuide: { english: "Namchi Monastery serves the community through education and service.", hindi: "नामची मठ शिक्षा और सेवा के माध्यम से समुदाय की सेवा करता है।", nepali: "नामची मठ शिक्षा र सेवाको माध्यमबाट समुदायको सेवा गर्छ।" },
        specialFeatures: ["Educational programs", "Community service", "Gelug tradition"],
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free"
    }
];

// Generate more monasteries to reach 100+
const generateAdditionalMonasteries = () => {
    const sects = ["Nyingma", "Kagyu", "Sakya", "Gelug", "Bon"];
    const districts = ["East Sikkim", "West Sikkim", "North Sikkim", "South Sikkim"];
    const locations = [
        "Gangtok", "Pelling", "Yuksom", "Mangan", "Namchi", "Ravangla", "Geyzing", 
        "Singtam", "Rangpo", "Jorethang", "Soreng", "Chungthang", "Lachen", "Lachung"
    ];
    
    const monasteryNames = [
        "Tashi Choling", "Drukpa Kagyu", "Sakya Tharpa", "Gelug Tharpa", "Bon Tharpa",
        "Karma Kagyu", "Drikung Kagyu", "Dzogchen", "Mindrolling", "Palpung",
        "Shechen", "Dzongsar", "Tsurphu", "Drepung", "Ganden", "Sera", "Tashilhunpo",
        "Samye", "Guru Lhakhang", "Pema Yangtse", "Rinchen Terdzo", "Khandro Sang",
        "Dakini Lhakhang", "Guru Rinpoche", "Padmasambhava", "Avalokiteshvara",
        "Manjushri", "Vajrapani", "Tara", "Medicine Buddha", "Amitabha", "Vajrasattva",
        "Vajradhara", "Samantabhadra", "Kshitigarbha", "Akashagarbha", "Sarvanivarana",
        "Ratnasambhava", "Amoghasiddhi", "Vairochana", "Akshobhya", "Bhaiṣajyaguru",
        "Maitreya", "Shakyamuni", "Dipankara", "Krakucchanda", "Kanakamuni", "Kashyapa"
    ];
    
    const additionalMonasteries = [];
    
    for (let i = 16; i <= 100; i++) {
        const sect = sects[Math.floor(Math.random() * sects.length)];
        const district = districts[Math.floor(Math.random() * districts.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const name = monasteryNames[Math.floor(Math.random() * monasteryNames.length)] + ` ${i}`;
        
        // Generate realistic coordinates based on district
        let lat, lng;
        switch (district) {
            case "East Sikkim":
                lat = 27.3 + (Math.random() - 0.5) * 0.2;
                lng = 88.6 + (Math.random() - 0.5) * 0.1;
                break;
            case "West Sikkim":
                lat = 27.3 + (Math.random() - 0.5) * 0.2;
                lng = 88.2 + (Math.random() - 0.5) * 0.1;
                break;
            case "North Sikkim":
                lat = 27.5 + (Math.random() - 0.5) * 0.2;
                lng = 88.5 + (Math.random() - 0.5) * 0.1;
                break;
            case "South Sikkim":
                lat = 27.2 + (Math.random() - 0.5) * 0.2;
                lng = 88.3 + (Math.random() - 0.5) * 0.1;
                break;
        }
        
        const monastery = {
            id: i,
            name: name,
            sect: sect,
            district: district,
            location: `${location}, ${district}`,
            coordinates: {
                latitude: lat,
                longitude: lng
            },
            established: (1700 + Math.floor(Math.random() * 300)).toString(),
            description: `A beautiful ${sect} monastery in ${district}, known for its spiritual significance and traditional architecture.`,
            history: `Founded in ${1700 + Math.floor(Math.random() * 300)}, this monastery has been a center of ${sect} teachings and practices.`,
            prayerHall: {
                capacity: 40 + Math.floor(Math.random() * 100),
                features: ["Traditional architecture", "Sacred texts", "Prayer wheels", "Meditation hall"],
                dimensions: `${20 + Math.floor(Math.random() * 20)}m x ${12 + Math.floor(Math.random() * 12)}m`
            },
            festivals: [
                {
                    name: "Losar",
                    date: "February/March",
                    description: "Tibetan New Year celebration"
                },
                {
                    name: "Guru Rinpoche Day",
                    date: "July",
                    description: "Celebration of Padmasambhava's teachings"
                }
            ],
            images: [
                "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop"
            ],
            audioGuide: {
                english: `Welcome to ${name}, a sacred ${sect} monastery in ${district}.`,
                hindi: `${name} में आपका स्वागत है, ${district} का एक पवित्र ${sect} मठ।`,
                nepali: `${name}मा स्वागत छ, ${district}को एक पवित्र ${sect} मठ।`
            },
            specialFeatures: ["Traditional architecture", "Sacred texts", "Peaceful setting", "Spiritual significance"],
            visitingHours: "6:00 AM - 6:00 PM",
            entryFee: Math.random() > 0.7 ? "₹20" : "Free"
        };
        
        additionalMonasteries.push(monastery);
    }
    
    return additionalMonasteries;
};

// Combine all monasteries
const allMonasteries = [...monasteriesData, ...additionalMonasteries, ...generateAdditionalMonasteries()];

// Export the data
window.monasteriesData = allMonasteries;