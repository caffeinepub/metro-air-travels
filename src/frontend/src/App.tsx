import {
  ArrowRight,
  Award,
  Bike,
  Bus,
  Car,
  CheckCircle2,
  CreditCard,
  FileText,
  Globe,
  Mail,
  MapPin,
  Menu,
  Phone,
  Plane,
  ScrollText,
  Stamp,
  Star,
  Train,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const LOGO = "/assets/image-019d443f-756e-763e-b918-ce63004d1ba7.png";

interface PlaceDetails {
  image: string;
  description: string;
  facts: Record<string, string>;
}

interface DestDetails {
  image: string;
  description: string;
  facts: Record<string, string>;
}

interface Place {
  name: string;
  emoji: string;
  details: PlaceDetails;
}

interface Destination {
  name: string;
  tagline: string;
  gradient: string;
  emoji: string;
  details: DestDetails;
  places: Place[];
}

interface ModalItem {
  name: string;
  emoji: string;
  details: PlaceDetails | DestDetails;
}

const SERVICES = [
  {
    category: "Flight Services",
    items: [
      {
        name: "Domestic Flight Tickets",
        icon: Plane,
        details: {
          image:
            "https://source.unsplash.com/800x400/?domestic-flight-india-airport",
          description:
            "Book domestic flight tickets to any city across India at the best prices. We offer both online and offline booking with instant confirmation.",
          facts: {
            Service: "Flight Ticket",

            Coverage: "All Indian Cities",
            Booking: "Online & Offline",
          },
        },
      },
      {
        name: "International Flight Tickets",
        icon: Globe,
        details: {
          image:
            "https://source.unsplash.com/800x400/?international-airport-flight",
          description:
            "We book international flight tickets to destinations worldwide — Gulf, Singapore, Malaysia, Thailand, Europe, Australia, and more.",
          facts: {
            Service: "Flight Ticket",

            Coverage: "Worldwide",
            Booking: "Online & Offline",
          },
        },
      },
      {
        name: "Umrah Services",
        icon: Star,
        details: {
          image: "https://source.unsplash.com/800x400/?mecca-kaaba-umrah",
          description:
            "Complete Umrah packages including flights, visa, accommodation near Haram, and guided group tours.",
          facts: {
            Service: "Pilgrimage",

            Includes: "Flight + Visa + Hotel",
            Season: "Year Round",
          },
        },
      },
      {
        name: "Haj Services",
        icon: Star,
        details: {
          image: "https://source.unsplash.com/800x400/?mecca-hajj-pilgrims",
          description:
            "Full Haji packages with all arrangements — flights, accommodation in Makkah & Madinah, visa processing, and guided support.",
          facts: {
            Service: "Pilgrimage",

            Includes: "Flight + Visa + Hotel",
            Season: "Dhul Hijja",
          },
        },
      },
    ],
  },
  {
    category: "Travel Documents",
    items: [
      {
        name: "Pan Card",
        icon: CreditCard,
        details: {
          image: "https://source.unsplash.com/800x400/?india-document-card-id",
          description:
            "Apply for a new PAN card or correction in existing PAN details quickly and easily through our documentation services.",
          facts: {
            Service: "Document",
            Type: "PAN / Correction",
            Processing: "15-20 Working Days",
            Authority: "Income Tax Dept.",
          },
        },
      },
      {
        name: "Passport Apply",
        icon: FileText,
        details: {
          image:
            "https://source.unsplash.com/800x400/?passport-travel-document",
          description:
            "New passport application and renewal services with expert guidance through the application process.",
          facts: {
            Service: "Document",
            Type: "Fresh / Renewal",
            Processing: "30-45 Working Days",
            Authority: "Passport Seva",
          },
        },
      },
      {
        name: "Visit Visa",
        icon: Stamp,
        details: {
          image:
            "https://source.unsplash.com/800x400/?visa-stamp-passport-travel",
          description:
            "Visit visa assistance for countries including UAE, Singapore, Malaysia, Thailand, and European nations.",
          facts: {
            Service: "Visa",
            Type: "Tourist / Business",
            Coverage: "UAE, SG, MY, TH, EU",
            Processing: "5-7 Working Days",
          },
        },
      },
      {
        name: "Emigration Clearance",
        icon: CheckCircle2,
        details: {
          image:
            "https://source.unsplash.com/800x400/?immigration-document-stamp",
          description:
            "Emigration clearance (ECR/ECNR) services for workers travelling to Gulf countries on work visas.",
          facts: {
            Service: "Emigration",

            Coverage: "Gulf Countries",
            Processing: "Depends on Working Days",
          },
        },
      },
      {
        name: "Visa Stamping",
        icon: ScrollText,
        details: {
          image: "https://source.unsplash.com/800x400/?visa-stamping-passport",
          description:
            "Visa stamping services for all major countries — UAE, Saudi Arabia, Qatar, Bahrain, and more.",
          facts: {
            Service: "Visa",
            Type: "Work / Visit",
            Coverage: "Gulf & Others",
            Processing: "3-5 Working Days",
          },
        },
      },
    ],
  },
  {
    category: "Other Services",
    items: [
      {
        name: "Group Tickets",
        icon: Users,
        details: {
          image:
            "https://source.unsplash.com/800x400/?group-travel-flight-airport",
          description:
            "Special group flight tickets for families, corporate teams, and pilgrimage groups at discounted rates.",
          facts: {
            Service: "Group Travel",
            "Min. Group": "10+ Persons",
            Discount: "Special Rates",
            Booking: "Advance Required",
          },
        },
      },
      {
        name: "Certificate Attestation",
        icon: Award,
        details: {
          image:
            "https://source.unsplash.com/800x400/?document-attestation-notary",
          description:
            "Certificate attestation for educational, personal, and commercial documents for use in foreign countries.",
          facts: {
            Service: "Attestation",
            Type: "HRD / MEA / Embassy",
            Coverage: "Gulf & Others",
            Processing: "7-15 Working Days",
          },
        },
      },
      {
        name: "Bus Tickets",
        icon: Bus,
        details: {
          image:
            "https://source.unsplash.com/800x400/?bus-travel-india-highway",
          description:
            "Book bus tickets for long-distance routes across Tamil Nadu and other states at competitive prices.",
          facts: {
            Service: "Bus Ticket",
            Coverage: "Tamil Nadu & More",

            Booking: "Online & Offline",
          },
        },
      },
      {
        name: "Train Tickets",
        icon: Train,
        details: {
          image:
            "https://source.unsplash.com/800x400/?india-train-railway-station",
          description:
            "Indian Railways ticket booking for all classes — Sleeper, 3AC, 2AC, 1AC, and general class.",
          facts: {
            Service: "Train Ticket",
            Coverage: "All India Routes",
            Classes: "SL, 3AC, 2AC, 1AC",
            Booking: "Online",
          },
        },
      },
    ],
  },
  {
    category: "Insurance",
    items: [
      {
        name: "Car Insurance",
        icon: Car,
        details: {
          image: "https://source.unsplash.com/800x400/?car-insurance-vehicle",
          description:
            "Comprehensive and third-party car insurance for all vehicle types at affordable premiums.",
          facts: {
            Service: "Insurance",

            Coverage: "Comprehensive / 3rd Party",
            Renewal: "Annual",
          },
        },
      },
      {
        name: "Bike Insurance",
        icon: Bike,
        details: {
          image:
            "https://source.unsplash.com/800x400/?motorcycle-bike-insurance",
          description:
            "Two-wheeler insurance for all bike brands — quick policy issuance and instant renewal.",
          facts: {
            Service: "Insurance",

            Coverage: "Comprehensive / 3rd Party",
            Renewal: "Annual",
          },
        },
      },
    ],
  },
];

const ALL_SERVICE_OPTIONS = [
  "Domestic Flight Tickets",
  "International Flight Tickets",
  "Umrah Services",
  "Haj Services",
  "Pan Card",
  "Passport Apply",
  "Visit Visa",
  "Emigration Clearance",
  "Visa Stamping",
  "Group Tickets",
  "Certificate Attestation",
  "Bus Tickets",
  "Train Tickets",
  "Car Insurance",
  "Bike Insurance",
  "Singapore Flights",
  "Malaysia Flights",
  "Gulf Flights",
  "Thailand Flights",
  "Other",
];

const DESTINATIONS: Destination[] = [
  {
    name: "Singapore",
    tagline: "The Lion City Awaits",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    emoji: "🇸🇬",
    details: {
      image: "https://source.unsplash.com/800x400/?singapore,skyline",
      description:
        "Singapore is a global city-state known for its modern skyline, diverse culture, and world-class food scene. A perfect blend of Asian traditions and Western influences.",
      facts: {
        Capital: "Singapore City",
        Currency: "SGD (S$)",
        Language: "English, Malay, Tamil, Mandarin",
        "Best Time": "Feb – Apr (dry season)",
        "Known For": "Marina Bay, Gardens by the Bay, Hawker Food",
      },
    },
    places: [
      {
        name: "Marina Bay Sands",
        emoji: "🏙️",
        details: {
          image: "https://source.unsplash.com/800x400/?marina-bay-sands",
          description:
            "Iconic integrated resort with a rooftop infinity pool offering stunning views of Singapore's skyline.",
          facts: {
            Type: "Resort & Casino",
            Highlight: "Infinity Pool",
            Entry: "Paid",
            Location: "Marina Bay",
          },
        },
      },
      {
        name: "Sentosa Island",
        emoji: "🏖️",
        details: {
          image:
            "https://source.unsplash.com/800x400/?sentosa-island-singapore",
          description:
            "A fun-filled island resort with Universal Studios, beaches, and Adventure Cove Waterpark.",
          facts: {
            Type: "Island Resort",
            Highlight: "Universal Studios",
            Entry: "Varies",
            Location: "South Singapore",
          },
        },
      },
      {
        name: "Gardens by the Bay",
        emoji: "🌿",
        details: {
          image:
            "https://source.unsplash.com/800x400/?gardens-by-the-bay-singapore",
          description:
            "Futuristic nature park featuring supertree structures and two stunning glass conservatories.",
          facts: {
            Type: "Nature Park",
            Highlight: "Supertrees",
            Entry: "Free/Paid",
            Location: "Marina Bay",
          },
        },
      },
      {
        name: "Orchard Road",
        emoji: "🛍️",
        details: {
          image:
            "https://source.unsplash.com/800x400/?orchard-road-singapore-shopping",
          description:
            "Singapore's premier shopping belt lined with malls, hotels, and international brands.",
          facts: {
            Type: "Shopping Street",
            Highlight: "Luxury Malls",
            Entry: "Free",
            Location: "Central Singapore",
          },
        },
      },
      {
        name: "Universal Studios",
        emoji: "🎢",
        details: {
          image:
            "https://source.unsplash.com/800x400/?universal-studios-singapore",
          description:
            "Asia's first Universal Studios theme park with thrilling rides and movie-themed attractions.",
          facts: {
            Type: "Theme Park",
            Highlight: "Transformers Ride",
            Entry: "Paid",
            Location: "Sentosa Island",
          },
        },
      },
      {
        name: "Chinatown",
        emoji: "🏮",
        details: {
          image: "https://source.unsplash.com/800x400/?singapore-chinatown",
          description:
            "Vibrant heritage district known for temples, traditional shophouses, and authentic street food.",
          facts: {
            Type: "Heritage District",
            Highlight: "Buddha Tooth Temple",
            Entry: "Free",
            Location: "South Singapore",
          },
        },
      },
    ],
  },
  {
    name: "Malaysia",
    tagline: "Truly Asia Experience",
    gradient: "linear-gradient(135deg, #0d5016 0%, #1a7a28 50%, #2ecc71 100%)",
    emoji: "🇲🇾",
    details: {
      image: "https://source.unsplash.com/800x400/?kuala-lumpur,malaysia",
      description:
        "Malaysia is a Southeast Asian gem with iconic twin towers, pristine beaches, lush rainforests, and a melting pot of Malay, Chinese, and Indian cultures.",
      facts: {
        Capital: "Kuala Lumpur",
        Currency: "MYR (RM)",
        Language: "Bahasa Malaysia, English",
        "Best Time": "Mar – Oct",
        "Known For": "Petronas Towers, Beaches, Street Food",
      },
    },
    places: [
      {
        name: "Kuala Lumpur",
        emoji: "🏙️",
        details: {
          image: "https://source.unsplash.com/800x400/?kuala-lumpur-petronas",
          description:
            "Malaysia's capital city, home to the iconic Petronas Twin Towers and a buzzing cultural scene.",
          facts: {
            Type: "Capital City",
            Highlight: "Petronas Towers",
            Currency: "MYR",
            Language: "Malay, English",
          },
        },
      },
      {
        name: "Penang",
        emoji: "🍜",
        details: {
          image: "https://source.unsplash.com/800x400/?penang-malaysia",
          description:
            "A UNESCO Heritage island famous for its colonial architecture, street art, and incredible food.",
          facts: {
            Type: "Heritage Island",
            Highlight: "George Town",
            Currency: "MYR",
            Language: "Malay, English, Mandarin",
          },
        },
      },
      {
        name: "Langkawi",
        emoji: "🏝️",
        details: {
          image: "https://source.unsplash.com/800x400/?langkawi-beach-malaysia",
          description:
            "A duty-free archipelago of 99 islands with pristine beaches, mangroves, and cable cars.",
          facts: {
            Type: "Island Getaway",
            Highlight: "Cable Car & Beaches",
            Currency: "MYR",
            Language: "Malay, English",
          },
        },
      },
      {
        name: "Johor Bahru",
        emoji: "🌉",
        details: {
          image: "https://source.unsplash.com/800x400/?johor-bahru",
          description:
            "A vibrant city just across from Singapore, known for LEGOLAND, malls, and authentic Johorean cuisine.",
          facts: {
            Type: "City",
            Highlight: "LEGOLAND Malaysia",
            Currency: "MYR",
            Language: "Malay, English",
          },
        },
      },
      {
        name: "Malacca",
        emoji: "🏯",
        details: {
          image:
            "https://source.unsplash.com/800x400/?malacca-malaysia-heritage",
          description:
            "A UNESCO World Heritage city with Portuguese, Dutch, and British colonial history layered over Malay culture.",
          facts: {
            Type: "Heritage City",
            Highlight: "Jonker Street",
            Currency: "MYR",
            Language: "Malay, English",
          },
        },
      },
      {
        name: "Cameron Highlands",
        emoji: "🌿",
        details: {
          image: "https://source.unsplash.com/800x400/?cameron-highlands-tea",
          description:
            "Malaysia's most visited hill resort, known for cool weather, tea plantations, strawberry farms, and scenic hikes.",
          facts: {
            Type: "Hill Station",
            Highlight: "Tea Plantations",
            Currency: "MYR",
            Language: "Malay, English",
          },
        },
      },
    ],
  },
  {
    name: "Gulf",
    tagline: "Desert Luxury & Business",
    gradient: "linear-gradient(135deg, #7d4e00 0%, #b8730a 50%, #d4a017 100%)",
    emoji: "🌙",
    details: {
      image: "https://source.unsplash.com/800x400/?dubai,gulf,desert",
      description:
        "The Gulf region offers a unique mix of ancient heritage and ultra-modern cities. From Dubai's skyscrapers to Oman's natural beauty, it's a hub for business and pilgrimage.",
      facts: {
        Countries: "Multiple countries",
        Currency: "USD widely accepted",
        Language: "Arabic, English",
        "Best Time": "Nov – Mar (cool season)",
        "Known For": "Burj Khalifa, Desert Safari, Umrah & Haji",
      },
    },
    places: [
      {
        name: "Bahrain",
        emoji: "🇧🇭",
        details: {
          image: "https://source.unsplash.com/800x400/?bahrain-manama",
          description:
            "A small island kingdom known for its ancient history, Formula 1 circuit, and modern financial district.",
          facts: {
            Capital: "Manama",
            Currency: "BHD",
            Language: "Arabic, English",
            "Known For": "F1 Grand Prix, Bahrain Fort",
          },
        },
      },
      {
        name: "Kuwait",
        emoji: "🇰🇼",
        details: {
          image: "https://source.unsplash.com/800x400/?kuwait-city",
          description:
            "A wealthy Gulf state with a striking city skyline, traditional souqs, and the iconic Kuwait Towers.",
          facts: {
            Capital: "Kuwait City",
            Currency: "KWD",
            Language: "Arabic, English",
            "Known For": "Kuwait Towers, The Grand Mosque",
          },
        },
      },
      {
        name: "Iraq",
        emoji: "🇮🇶",
        details: {
          image: "https://source.unsplash.com/800x400/?baghdad-iraq",
          description:
            "One of the world's oldest civilizations, home to ancient Mesopotamian ruins, the city of Baghdad, and religious sites.",
          facts: {
            Capital: "Baghdad",
            Currency: "IQD",
            Language: "Arabic, Kurdish",
            "Known For": "Ancient Ruins, Shrine Cities",
          },
        },
      },
      {
        name: "Oman",
        emoji: "🇴🇲",
        details: {
          image: "https://source.unsplash.com/800x400/?oman-muscat-desert",
          description:
            "A peaceful Gulf nation with dramatic landscapes — from Arabian deserts and wadis to pristine beaches and the charming capital Muscat.",
          facts: {
            Capital: "Muscat",
            Currency: "OMR",
            Language: "Arabic, English",
            "Known For": "Wadis, Forts, Deserts",
          },
        },
      },
      {
        name: "Qatar",
        emoji: "🇶🇦",
        details: {
          image: "https://source.unsplash.com/800x400/?qatar-doha-skyline",
          description:
            "A rapidly modernizing Gulf state renowned for the FIFA World Cup 2022, the Museum of Islamic Art, and luxury Doha.",
          facts: {
            Capital: "Doha",
            Currency: "QAR",
            Language: "Arabic, English",
            "Known For": "FIFA WC, Museum of Islamic Art",
          },
        },
      },
      {
        name: "Saudi Arabia",
        emoji: "🇸🇦",
        details: {
          image: "https://source.unsplash.com/800x400/?mecca-saudi-arabia",
          description:
            "The birthplace of Islam, home to the holiest sites Mecca and Medina, as well as the futuristic NEOM project and vast deserts.",
          facts: {
            Capital: "Riyadh",
            Currency: "SAR",
            Language: "Arabic",
            "Known For": "Mecca, Medina, Umrah & Haji",
          },
        },
      },
      {
        name: "United Arab Emirates",
        emoji: "🇦🇪",
        details: {
          image: "https://source.unsplash.com/800x400/?dubai-burj-khalifa-uae",
          description:
            "A dazzling federation of 7 emirates — from Dubai's Burj Khalifa to Abu Dhabi's Sheikh Zayed Grand Mosque and Sharjah's culture.",
          facts: {
            Capital: "Abu Dhabi",
            Currency: "AED",
            Language: "Arabic, English",
            "Known For": "Burj Khalifa, Desert Safari, Shopping",
          },
        },
      },
    ],
  },
  {
    name: "Thailand",
    tagline: "Land of Smiles",
    gradient: "linear-gradient(135deg, #4a0080 0%, #7b1fa2 50%, #ab47bc 100%)",
    emoji: "🇹🇭",
    details: {
      image: "https://source.unsplash.com/800x400/?thailand,bangkok,temple",
      description:
        "Thailand enchants visitors with ornate temples, turquoise waters, vibrant street markets, and warm hospitality. The land of smiles never disappoints.",
      facts: {
        Capital: "Bangkok",
        Currency: "THB (฿)",
        Language: "Thai, English",
        "Best Time": "Nov – Feb (cool & dry)",
        "Known For": "Temples, Beaches, Night Markets, Muay Thai",
      },
    },
    places: [
      {
        name: "Bangkok",
        emoji: "🏙️",
        details: {
          image: "https://source.unsplash.com/800x400/?bangkok-thailand-temple",
          description:
            "Thailand's vibrant capital, bursting with ornate temples, rooftop bars, tuk-tuks, and incredible street food.",
          facts: {
            Type: "Capital City",
            Highlight: "Wat Phra Kaew",
            Currency: "THB",
            Language: "Thai",
          },
        },
      },
      {
        name: "Phuket",
        emoji: "🏖️",
        details: {
          image: "https://source.unsplash.com/800x400/?phuket-beach-thailand",
          description:
            "Thailand's largest island, famous for stunning beaches, turquoise waters, nightlife, and island-hopping adventures.",
          facts: {
            Type: "Island",
            Highlight: "Patong Beach",
            Currency: "THB",
            Language: "Thai, English",
          },
        },
      },
      {
        name: "Chiang Mai",
        emoji: "🌸",
        details: {
          image:
            "https://source.unsplash.com/800x400/?chiang-mai-temple-thailand",
          description:
            "A cultural gem in northern Thailand, known for its ancient temples, elephant sanctuaries, night bazaars, and cool mountain climate.",
          facts: {
            Type: "Cultural City",
            Highlight: "Elephant Sanctuary",
            Currency: "THB",
            Language: "Thai",
          },
        },
      },
      {
        name: "Pattaya",
        emoji: "🎆",
        details: {
          image: "https://source.unsplash.com/800x400/?pattaya-thailand",
          description:
            "A lively beach resort city known for water sports, entertainment shows, and the nearby Coral Island.",
          facts: {
            Type: "Beach Resort",
            Highlight: "Coral Island",
            Currency: "THB",
            Language: "Thai, English",
          },
        },
      },
      {
        name: "Koh Samui",
        emoji: "🌴",
        details: {
          image: "https://source.unsplash.com/800x400/?koh-samui-beach",
          description:
            "A tropical island paradise with luxury resorts, beautiful beaches, the famous Big Buddha, and vibrant nightlife.",
          facts: {
            Type: "Island",
            Highlight: "Big Buddha Temple",
            Currency: "THB",
            Language: "Thai",
          },
        },
      },
      {
        name: "Krabi",
        emoji: "⛵",
        details: {
          image: "https://source.unsplash.com/800x400/?krabi-thailand-cliffs",
          description:
            "A breathtaking province of limestone cliffs, emerald waters, and stunning Railay Beach, perfect for rock climbing and island tours.",
          facts: {
            Type: "Province",
            Highlight: "Railay Beach",
            Currency: "THB",
            Language: "Thai",
          },
        },
      },
    ],
  },
  {
    name: "Europe",
    tagline: "Rich History & Culture",
    gradient: "linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)",
    emoji: "🇪🇺",
    details: {
      image: "https://source.unsplash.com/800x400/?europe,paris,eiffel",
      description:
        "Europe is a continent of incredible diversity — from the Eiffel Tower in Paris to the Colosseum in Rome. Experience world-class art, architecture, cuisine, and history across dozens of countries.",
      facts: {
        Continent: "Europe",
        Currency: "EUR (Euro) & others",
        Language: "Multiple languages",
        "Best Time": "Apr – Oct",
        "Known For": "Eiffel Tower, Colosseum, Big Ben, Alps",
      },
    },
    places: [
      {
        name: "Paris, France",
        emoji: "🗼",
        details: {
          image: "https://source.unsplash.com/800x400/?paris-eiffel-tower",
          description:
            "The City of Light — home to the Eiffel Tower, the Louvre Museum, and world-famous cuisine and fashion.",
          facts: {
            Capital: "Paris",
            Currency: "EUR",
            Language: "French",
            "Known For": "Eiffel Tower, Louvre, Versailles",
          },
        },
      },
      {
        name: "Rome, Italy",
        emoji: "🏛️",
        details: {
          image: "https://source.unsplash.com/800x400/?rome-colosseum-italy",
          description:
            "The Eternal City — a living museum with the Colosseum, Vatican, and ancient Roman ruins at every turn.",
          facts: {
            Capital: "Rome",
            Currency: "EUR",
            Language: "Italian",
            "Known For": "Colosseum, Vatican, Trevi Fountain",
          },
        },
      },
      {
        name: "London, UK",
        emoji: "🎡",
        details: {
          image: "https://source.unsplash.com/800x400/?london-big-ben-tower",
          description:
            "A world-class city blending royal heritage with modern culture — Big Ben, Buckingham Palace, and the London Eye.",
          facts: {
            Capital: "London",
            Currency: "GBP",
            Language: "English",
            "Known For": "Big Ben, Buckingham Palace, Tower Bridge",
          },
        },
      },
      {
        name: "Barcelona, Spain",
        emoji: "🏟️",
        details: {
          image:
            "https://source.unsplash.com/800x400/?barcelona-sagrada-familia",
          description:
            "Vibrant Catalan capital with Gaudí's masterpieces, beautiful beaches, and lively tapas culture.",
          facts: {
            City: "Barcelona",
            Currency: "EUR",
            Language: "Spanish, Catalan",
            "Known For": "Sagrada Familia, Park Güell, La Rambla",
          },
        },
      },
      {
        name: "Amsterdam, Netherlands",
        emoji: "🚲",
        details: {
          image:
            "https://source.unsplash.com/800x400/?amsterdam-canals-netherlands",
          description:
            "The Venice of the North — famous for its canals, Anne Frank House, Rijksmuseum, and cycling culture.",
          facts: {
            Capital: "Amsterdam",
            Currency: "EUR",
            Language: "Dutch, English",
            "Known For": "Canals, Anne Frank House, Rijksmuseum",
          },
        },
      },
      {
        name: "Switzerland",
        emoji: "🏔️",
        details: {
          image:
            "https://source.unsplash.com/800x400/?switzerland-alps-matterhorn",
          description:
            "Breathtaking Alpine landscapes, chocolate, cheese, and pristine lakes — Switzerland is the crown jewel of Europe.",
          facts: {
            Capital: "Bern",
            Currency: "CHF",
            Language: "German, French, Italian",
            "Known For": "Alps, Matterhorn, Zurich, Geneva",
          },
        },
      },
    ],
  },
  {
    name: "Australia",
    tagline: "Land Down Under",
    gradient: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%)",
    emoji: "🦘",
    details: {
      image:
        "https://source.unsplash.com/800x400/?sydney-opera-house-australia",
      description:
        "Australia is a vast continent of stunning natural wonders — the Great Barrier Reef, Uluru, endless golden beaches, and unique wildlife found nowhere else on Earth.",
      facts: {
        Capital: "Canberra",
        Currency: "AUD (A$)",
        Language: "English",
        "Best Time": "Sep – Nov / Mar – May",
        "Known For": "Sydney Opera House, Great Barrier Reef, Uluru",
      },
    },
    places: [
      {
        name: "Sydney",
        emoji: "🎭",
        details: {
          image: "https://source.unsplash.com/800x400/?sydney-harbour-opera",
          description:
            "Australia's iconic harbour city — home to the Opera House, Harbour Bridge, Bondi Beach, and a vibrant café culture.",
          facts: {
            State: "New South Wales",
            Currency: "AUD",
            Language: "English",
            "Known For": "Opera House, Harbour Bridge, Bondi Beach",
          },
        },
      },
      {
        name: "Melbourne",
        emoji: "☕",
        details: {
          image:
            "https://source.unsplash.com/800x400/?melbourne-australia-city",
          description:
            "Australia's cultural capital — famous for laneways, world-class coffee, art galleries, and the Melbourne Cricket Ground.",
          facts: {
            State: "Victoria",
            Currency: "AUD",
            Language: "English",
            "Known For": "Coffee Culture, Arts, MCG, Laneways",
          },
        },
      },
      {
        name: "Great Barrier Reef",
        emoji: "🐠",
        details: {
          image:
            "https://source.unsplash.com/800x400/?great-barrier-reef-australia",
          description:
            "The world's largest coral reef system — a UNESCO World Heritage Site teeming with colourful marine life and spectacular diving.",
          facts: {
            Location: "Queensland",
            Currency: "AUD",
            Language: "English",
            "Known For": "Coral Reefs, Diving, Snorkelling",
          },
        },
      },
      {
        name: "Uluru",
        emoji: "🪨",
        details: {
          image:
            "https://source.unsplash.com/800x400/?uluru-ayers-rock-australia",
          description:
            "A sacred sandstone monolith rising from the heart of the Australian desert — a spiritual and natural wonder of the world.",
          facts: {
            Location: "Northern Territory",
            Currency: "AUD",
            Language: "English, Anangu",
            "Known For": "Sacred Rock, Outback, Sunrise Views",
          },
        },
      },
      {
        name: "Gold Coast",
        emoji: "🏄",
        details: {
          image:
            "https://source.unsplash.com/800x400/?gold-coast-australia-beach",
          description:
            "A sun-soaked city of surf beaches, theme parks, and a vibrant nightlife strip — Australia's premier holiday destination.",
          facts: {
            State: "Queensland",
            Currency: "AUD",
            Language: "English",
            "Known For": "Surfers Paradise, Theme Parks, Beaches",
          },
        },
      },
      {
        name: "Cairns",
        emoji: "🌿",
        details: {
          image:
            "https://source.unsplash.com/800x400/?cairns-australia-rainforest",
          description:
            "Gateway to the Great Barrier Reef and the ancient Daintree Rainforest — the adventure capital of tropical Australia.",
          facts: {
            State: "Queensland",
            Currency: "AUD",
            Language: "English",
            "Known For": "Great Barrier Reef, Daintree Rainforest",
          },
        },
      },
    ],
  },
];

const NAV_LINKS = ["home", "services", "destinations", "contact"] as const;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedDest, setExpandedDest] = useState<string | null>(null);
  const [modalItem, setModalItem] = useState<ModalItem | null>(null);
  const [serviceModal, setServiceModal] = useState<{
    name: string;
    details: {
      image: string;
      description: string;
      facts: Record<string, string>;
    };
  } | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Metro Air Travels!%0A%0AName: ${encodeURIComponent(form.name)}%0AEmail: ${encodeURIComponent(form.email)}%0APhone: ${encodeURIComponent(form.phone)}%0ALocation: ${encodeURIComponent(form.location)}%0AService/Destination: ${encodeURIComponent(form.service)}%0AMessage: ${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/917871819777?text=${text}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="font-poppins">
      {/* ===== DESTINATION DETAIL MODAL ===== */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={() => setModalItem(null)}
            data-ocid="destination.modal"
          >
            <motion.div
              key="modal-card"
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 30 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero image */}
              <div className="relative">
                <img
                  src={modalItem.details.image}
                  alt={modalItem.name}
                  className="w-full h-52 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://source.unsplash.com/800x400/?travel,destination";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setModalItem(null)}
                  className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                  data-ocid="destination.modal.close_button"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{modalItem.emoji}</span>
                  <h2
                    className="text-2xl font-black uppercase"
                    style={{ color: "oklch(0.27 0.06 222)" }}
                  >
                    {modalItem.name}
                  </h2>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {modalItem.details.description}
                </p>

                {/* Facts grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {Object.entries(modalItem.details.facts).map(
                    ([label, value]) => (
                      <div
                        key={label}
                        className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
                      >
                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">
                          {label}
                        </p>
                        <p
                          className="text-sm font-bold leading-snug"
                          style={{ color: "oklch(0.27 0.06 222)" }}
                        >
                          {value}
                        </p>
                      </div>
                    ),
                  )}
                </div>

                {/* Enquire Now button */}
                <button
                  type="button"
                  onClick={() => {
                    setModalItem(null);
                    setTimeout(() => scrollTo("contact"), 150);
                  }}
                  className="w-full py-3 rounded-full font-bold text-white uppercase tracking-wide flex items-center justify-center gap-2 transition-all orange-btn"
                  data-ocid="destination.modal.primary_button"
                >
                  Enquire Now <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== SERVICE DETAIL MODAL ===== */}
      <AnimatePresence>
        {serviceModal && (
          <motion.div
            key="service-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={() => setServiceModal(null)}
            data-ocid="services.modal"
          >
            <motion.div
              key="service-modal-card"
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 30 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={serviceModal.details.image}
                  alt={serviceModal.name}
                  className="w-full h-52 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://source.unsplash.com/800x400/?travel,service";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setServiceModal(null)}
                  className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                  data-ocid="services.modal.close_button"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6">
                <h2
                  className="text-2xl font-black uppercase mb-3"
                  style={{ color: "oklch(0.27 0.06 222)" }}
                >
                  {serviceModal.name}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {serviceModal.details.description}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {Object.entries(serviceModal.details.facts).map(
                    ([label, value]) => (
                      <div
                        key={label}
                        className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
                      >
                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">
                          {label}
                        </p>
                        <p
                          className="text-sm font-bold leading-snug"
                          style={{ color: "oklch(0.27 0.06 222)" }}
                        >
                          {value}
                        </p>
                      </div>
                    ),
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setServiceModal(null);
                    setTimeout(() => scrollTo("contact"), 150);
                  }}
                  className="w-full py-3 rounded-full font-bold text-white uppercase tracking-wide flex items-center justify-center gap-2 transition-all orange-btn"
                  data-ocid="services.modal.primary_button"
                >
                  Enquire Now <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== HEADER / NAV ===== */}
      <header className="nav-navy sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={LOGO}
              alt="Metro Air Travels Logo"
              className="h-12 w-12 rounded-full object-contain bg-white p-0.5"
            />
            <div>
              <div className="text-white font-bold text-sm md:text-base leading-tight tracking-wide">
                METRO AIR TRAVELS
              </div>
              <div className="text-blue-200 text-xs">Kumbakonam, India</div>
            </div>
          </div>

          <nav
            className="hidden md:flex items-center gap-6"
            data-ocid="main.nav.panel"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => scrollTo(link)}
                className="text-white/80 hover:text-white text-sm font-medium uppercase tracking-wide transition-colors"
                data-ocid={`nav.${link}.link`}
              >
                {link}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="orange-btn px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wide"
              data-ocid="nav.enquire.button"
            >
              Enquire Now
            </button>
          </nav>

          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.menu.toggle"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden nav-navy border-t border-white/10"
            >
              <div className="px-4 py-3 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link}
                    type="button"
                    onClick={() => scrollTo(link)}
                    className="text-white/80 hover:text-white text-sm font-medium uppercase tracking-wide text-left transition-colors"
                  >
                    {link}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  className="orange-btn px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wide w-max"
                >
                  Enquire Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== HERO ===== */}
      <section
        id="home"
        className="hero-gradient min-h-[90vh] flex items-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-20 right-10 text-white"
            style={{ fontSize: "200px" }}
          >
            ✈
          </div>
          <div
            className="absolute bottom-10 left-5 text-white"
            style={{ fontSize: "120px" }}
          >
            ✈
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-sky-400" />
              <span className="text-sky-400 text-sm font-semibold uppercase tracking-widest">
                Your Trusted Travel Partner
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase leading-tight mb-4">
              METRO AIR
              <br />
              <span style={{ color: "oklch(0.55 0.18 220)" }}>TRAVELS</span>
            </h1>
            <p className="text-blue-100 text-xl md:text-2xl font-medium mb-3">
              Enjoy your trip with our tickets...
            </p>
            <p className="text-blue-200 text-base mb-8 max-w-lg">
              Book your flight tickets online/offline in our travels. We offer a
              complete range of travel and documentation services.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="orange-btn px-8 py-3 rounded-full font-bold text-base uppercase tracking-wide flex items-center gap-2"
                data-ocid="hero.enquire.button"
              >
                Enquire Now <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollTo("services")}
                className="px-8 py-3 rounded-full font-bold text-base uppercase tracking-wide border-2 border-white/40 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                data-ocid="hero.services.button"
              >
                Our Services <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 flex flex-wrap gap-8"
          >
            {[
              { label: "Destinations", value: "20+" },
              { label: "Happy Customers", value: "5000+" },
              { label: "Services", value: "15+" },
              { label: "Years Experience", value: "20+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-blue-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Announcement bar */}
      <div className="bg-sky-500 text-white text-center py-3 px-4">
        <p className="font-semibold text-sm tracking-wide">
          ✈ Flight Tickets are now available — Singapore · Malaysia · Gulf ·
          Thailand · Europe · Australia · Domestic Routes
        </p>
      </div>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-12 bg-sky-400" />
              <span className="text-sky-500 text-sm font-semibold uppercase tracking-widest">
                What We Offer
              </span>
              <div className="h-px w-12 bg-sky-400" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-black uppercase"
              style={{ color: "oklch(0.27 0.06 222)" }}
            >
              OUR SERVICES
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Please contact us if you have any further questions. We are here
              to serve all your travel needs.
            </p>
          </motion.div>

          <div className="space-y-12">
            {SERVICES.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.1 }}
              >
                <h3
                  className="text-lg font-bold uppercase tracking-wide mb-5 flex items-center gap-2"
                  style={{ color: "oklch(0.27 0.06 222)" }}
                >
                  <span
                    className="h-1 w-8 rounded-full inline-block"
                    style={{ background: "oklch(0.55 0.18 220)" }}
                  />
                  {group.category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {group.items.map((item, ii) => {
                    const Icon = item.icon;
                    return (
                      <button
                        type="button"
                        key={item.name}
                        onClick={() =>
                          setServiceModal({
                            name: item.name,
                            details: item.details,
                          })
                        }
                        className="service-card bg-white border border-gray-100 rounded-xl p-5 flex flex-col items-center gap-3 text-center shadow-xs cursor-pointer hover:border-sky-300 hover:shadow-md transition-all"
                        data-ocid={`services.item.${gi * 10 + ii + 1}`}
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ background: "oklch(0.55 0.18 220 / 0.12)" }}
                        >
                          <Icon
                            size={22}
                            style={{ color: "oklch(0.55 0.18 220)" }}
                          />
                        </div>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "oklch(0.27 0.06 222)" }}
                        >
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section id="destinations" className="py-20 beige-section">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-12 bg-sky-400" />
              <span className="text-sky-500 text-sm font-semibold uppercase tracking-widest">
                Where We Fly
              </span>
              <div className="h-px w-12 bg-sky-400" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-black uppercase"
              style={{ color: "oklch(0.27 0.06 222)" }}
            >
              FLIGHT DESTINATIONS
            </h2>
            <p className="text-gray-600 mt-3">
              Click on a destination or place to explore details — or use the
              arrow to see all famous places!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTINATIONS.map((dest, i) => {
              const isExpanded = expandedDest === dest.name;
              return (
                <motion.div
                  key={dest.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="dest-card rounded-2xl overflow-hidden shadow-card"
                  data-ocid={`destinations.item.${i + 1}`}
                >
                  {/* Gradient header — clickable to open modal */}
                  <button
                    type="button"
                    className="w-full h-48 flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity relative group"
                    style={{ background: dest.gradient }}
                    onClick={() =>
                      setModalItem({
                        name: dest.name,
                        emoji: dest.emoji,
                        details: dest.details,
                      })
                    }
                    data-ocid={`destinations.card.${i + 1}`}
                  >
                    <span className="text-5xl mb-2">{dest.emoji}</span>
                    <h3 className="text-white text-2xl font-black uppercase tracking-wide">
                      {dest.name}
                    </h3>
                    <span className="absolute bottom-2 right-3 text-white/50 text-xs group-hover:text-white/80 transition-colors">
                      Tap to explore ›
                    </span>
                  </button>

                  {/* Bottom bar */}
                  <div className="bg-white px-5 py-4 flex items-center justify-between">
                    <p className="text-gray-600 text-sm">{dest.tagline}</p>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedDest(isExpanded ? null : dest.name)
                      }
                      className="text-sky-500 hover:text-sky-600 transition-colors flex-shrink-0 ml-2"
                      aria-label={
                        isExpanded ? "Collapse places" : "Expand places"
                      }
                      data-ocid={`destinations.toggle.${i + 1}`}
                    >
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    </button>
                  </div>

                  {/* Expanded places panel */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="places"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-white border-t border-gray-100"
                      >
                        <div className="px-4 py-4">
                          <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 mb-3">
                            Famous Places
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {dest.places.map((place) => (
                              <button
                                key={place.name}
                                type="button"
                                onClick={() =>
                                  setModalItem({
                                    name: place.name,
                                    emoji: place.emoji,
                                    details: place.details,
                                  })
                                }
                                className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2.5 py-2 text-left hover:border-sky-300 hover:bg-sky-50 transition-colors"
                              >
                                <span className="text-base leading-none flex-shrink-0">
                                  {place.emoji}
                                </span>
                                <span className="text-xs font-medium text-gray-700 leading-tight">
                                  {place.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CONTACT / ENQUIRY ===== */}
      <section id="contact" className="py-20 contact-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-12 bg-white/60" />
              <span className="text-white/80 text-sm font-semibold uppercase tracking-widest">
                Reach Out
              </span>
              <div className="h-px w-12 bg-white/60" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-white">
              GET IN TOUCH
            </h2>
            <p className="text-white/80 mt-3">
              Fill the form below — we will connect with you via WhatsApp!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20"
              data-ocid="enquiry.form"
            >
              <h3 className="text-white text-xl font-bold mb-6">
                Send Enquiry
              </h3>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10"
                    data-ocid="enquiry.success_state"
                  >
                    <CheckCircle2
                      size={64}
                      className="mx-auto mb-4 text-green-300"
                    />
                    <p className="text-white text-lg font-semibold">
                      Opening WhatsApp...
                    </p>
                    <p className="text-white/70 text-sm mt-2">
                      Your enquiry details are being sent!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <label
                        htmlFor="enq-name"
                        className="block text-white/80 text-sm font-medium mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        id="enq-name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all"
                        data-ocid="enquiry.name.input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="enq-email"
                        className="block text-white/80 text-sm font-medium mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        id="enq-email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all"
                        data-ocid="enquiry.email.input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="enq-phone"
                        className="block text-white/80 text-sm font-medium mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="enq-phone"
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all"
                        data-ocid="enquiry.phone.input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="enq-location"
                        className="block text-white/80 text-sm font-medium mb-1"
                      >
                        Native / Stay Place *
                      </label>
                      <input
                        id="enq-location"
                        type="text"
                        required
                        placeholder="Your city, town or village"
                        value={form.location}
                        onChange={(e) =>
                          setForm({ ...form, location: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all"
                        data-ocid="enquiry.location.input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="enq-service"
                        className="block text-white/80 text-sm font-medium mb-1"
                      >
                        Destination / Service *
                      </label>
                      <select
                        id="enq-service"
                        required
                        value={form.service}
                        onChange={(e) =>
                          setForm({ ...form, service: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all appearance-none"
                        style={{ colorScheme: "dark" }}
                        data-ocid="enquiry.service.select"
                      >
                        <option value="" disabled className="text-gray-800">
                          Select a service...
                        </option>
                        {ALL_SERVICE_OPTIONS.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            className="text-gray-800"
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="enq-message"
                        className="block text-white/80 text-sm font-medium mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="enq-message"
                        rows={3}
                        placeholder="Tell us more about your requirements..."
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all resize-none"
                        data-ocid="enquiry.message.textarea"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-full font-bold text-white uppercase tracking-wide flex items-center justify-center gap-2 transition-all"
                      style={{ background: "oklch(0.27 0.06 222)" }}
                      data-ocid="enquiry.submit.button"
                    >
                      <span>Send via WhatsApp</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        role="img"
                      >
                        <title>WhatsApp</title>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.829L.057 23.998l6.305-1.655A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.792 9.792 0 01-5.002-1.376l-.359-.213-3.723.977 1.002-3.634-.234-.374A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                      </svg>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">
                        Phone
                      </p>
                      <a
                        href="tel:+917871819777"
                        className="text-white font-semibold hover:text-sky-300 transition-colors"
                      >
                        7871819777
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">
                        Email
                      </p>
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=metroairtravel@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-semibold hover:text-sky-300 transition-colors break-all"
                      >
                        metroairtravel@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-sky-300" /> Main Office
                </h3>
                <p className="text-white/80 leading-relaxed">
                  3/25 E, New Bazaar St,
                  <br />
                  (Near Darling Electronics),
                  <br />
                  Natchiarkoil - 612 602,
                  <br />
                  Kumbakonam-TK.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-sky-300" /> Branch Office
                </h3>
                <p className="text-white/80 leading-relaxed">
                  PLA Residency,
                  <br />
                  122 Kamaraj Road,
                  <br />
                  (Opp. Railway station),
                  <br />
                  Kumbakonam - 612 001.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={LOGO}
                  alt="Metro Air Travels"
                  className="h-12 w-12 rounded-full object-contain bg-white/10 p-0.5"
                />
                <div>
                  <div className="font-bold text-sm tracking-wide">
                    METRO AIR TRAVELS
                  </div>
                  <div className="text-gray-400 text-xs">
                    Your Trusted Travel Partner
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Book your flight tickets online/offline in our travels. Serving
                Kumbakonam and surrounding areas.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4 text-sky-400">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link)}
                      className="text-gray-400 hover:text-white text-sm capitalize transition-colors"
                    >
                      {link.charAt(0).toUpperCase() + link.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4 text-sky-400">
                Contact Us
              </h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-sky-400" />
                  <a
                    href="tel:+917871819777"
                    className="hover:text-white transition-colors"
                  >
                    7871819777
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-sky-400" />
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=metroairtravel@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    metroairtravel@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin
                    size={14}
                    className="text-sky-400 mt-0.5 flex-shrink-0"
                  />
                  <span>3/25 E, New Bazaar St, Natchiarkoil - 612 602</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-500">
            <p>© {currentYear} Metro Air Travels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
