// ─── Types ────────────────────────────────────────────────────────────────────

export type Role = "super_admin" | "admin" | "agent" | "viewer";
export type LeadStatus = "new" | "contacted" | "visit_scheduled" | "interested" | "negotiation" | "closed" | "lost";
export type LeadTemp = "hot" | "warm" | "cold";
export type TransactionType = "sale" | "lease" | "resale";
export type PropertyStatus = "active" | "archived" | "hidden";
export type PossessionStatus = "ready" | "under_construction" | "resale";
export type ViewType = "sea" | "city" | "garden" | "pool" | "skyline" | "mixed" | "na";
export type Configuration = "2bhk" | "3bhk" | "4bhk" | "duplex" | "penthouse" | "villa";

export interface Property {
  id: string;
  slug: string;
  title: string;
  buildingName: string;
  location: string;
  microLocation: string;
  address: string;
  configuration: Configuration;
  propertyType: string;
  transactionType: TransactionType;
  status: PropertyStatus;
  possessionStatus: PossessionStatus;
  reraNumber: string;
  priceDisplay: string;
  priceValue: number | null;
  pricePerSqFt: string;
  maintenance: string;
  carpetArea: string;
  builtUpArea: string;
  superBuiltUpArea: string;
  deckArea: string;
  balconyArea: string;
  floorNumber: string;
  totalFloors: number;
  viewType: ViewType;
  facing: string;
  vastuStatus: "yes" | "no" | "unknown";
  bedrooms: number;
  bathrooms: number;
  powderRoom: boolean;
  servantRoom: boolean;
  studyRoom: boolean;
  familyLounge: boolean;
  utilityArea: boolean;
  parking: string;
  amenities: string[];
  images: PropertyImage[];
  floorPlans: FloorPlan[];
  nearbyLandmarks: NearbyLandmark[];
  shortHighlight: string;
  description: string;
  lifestyleDescription: string;
  investmentNote: string;
  neighbourhoodNote: string;
  agentRemarks: string;
  internalNotes: string;
  assignedAgentId: string;
  showOnHomepage: boolean;
  showInListings: boolean;
  featured: boolean;
  hotProperty: boolean;
  hidePrice: boolean;
  hideExactAddress: boolean;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  caption: string;
  type: "exterior" | "interior" | "view" | "amenity" | "layout";
  isCover: boolean;
}

export interface FloorPlan {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  notes: string;
  carpetArea: string;
  roomCount: string;
}

export interface NearbyLandmark {
  category: string;
  name: string;
  distance: string;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  passwordHash: string;
  role: Role;
  active: boolean;
  assignedLocations: string[];
  assignedProperties: string[];
  createdAt: string;
}

export interface AccessCode {
  id: string;
  code: string;
  label: string;
  assignedAgentId: string;
  allowedPropertyIds: string[];
  allowedLocations: string[];
  expiryDate: string | null;
  usageLimit: number | null;
  usageCount: number;
  active: boolean;
  notes: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  accessCodeUsed: string;
  propertyId: string;
  budget: string;
  preferredLocation: string;
  requirement: string;
  message: string;
  assignedAgentId: string;
  status: LeadStatus;
  leadTemperature: LeadTemp;
  notes: string;
  followUpDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  agentId?: string;
  clientName?: string;
  propertyId?: string;
  leadId?: string;
  createdAt: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const AGENTS: Agent[] = [
  {
    id: "agent-1",
    name: "Arjun Mehta",
    phone: "+91 98200 11234",
    email: "arjun@southmumbailuxury.in",
    passwordHash: "hashed_password_1",
    role: "admin",
    active: true,
    assignedLocations: ["Worli", "Prabhadevi", "Mahalaxmi"],
    assignedProperties: ["prop-1", "prop-2", "prop-3"],
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "agent-2",
    name: "Priya Kapoor",
    phone: "+91 98200 55678",
    email: "priya@southmumbailuxury.in",
    passwordHash: "hashed_password_2",
    role: "agent",
    active: true,
    assignedLocations: ["Malabar Hill", "Altamount Road", "Breach Candy"],
    assignedProperties: ["prop-4", "prop-5"],
    createdAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "agent-3",
    name: "Rahul Singhania",
    phone: "+91 98200 99012",
    email: "rahul@southmumbailuxury.in",
    passwordHash: "hashed_password_3",
    role: "agent",
    active: true,
    assignedLocations: ["Colaba", "Cuffe Parade", "Lower Parel"],
    assignedProperties: ["prop-6", "prop-7", "prop-8"],
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "super-1",
    name: "Admin User",
    phone: "+91 98200 00001",
    email: "admin@southmumbailuxury.in",
    passwordHash: "hashed_password_admin",
    role: "super_admin",
    active: true,
    assignedLocations: [],
    assignedProperties: [],
    createdAt: "2024-01-01T00:00:00Z",
  },
];

export const ACCESS_CODES: AccessCode[] = [
  {
    id: "ac-1",
    code: "PRIVATE2026",
    label: "General VIP Access 2026",
    assignedAgentId: "agent-1",
    allowedPropertyIds: [],
    allowedLocations: [],
    expiryDate: "2026-12-31",
    usageLimit: null,
    usageCount: 14,
    active: true,
    notes: "Master access code for all VIP clients",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "ac-2",
    code: "WORLI50",
    label: "Worli Campaign — Q1 2026",
    assignedAgentId: "agent-1",
    allowedPropertyIds: ["prop-1", "prop-2", "prop-3"],
    allowedLocations: ["Worli"],
    expiryDate: "2026-06-30",
    usageLimit: 50,
    usageCount: 8,
    active: true,
    notes: "Campaign targeting Worli buyers",
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "ac-3",
    code: "COLABAELITE",
    label: "Colaba Elite Clients",
    assignedAgentId: "agent-3",
    allowedPropertyIds: ["prop-6", "prop-7"],
    allowedLocations: ["Colaba", "Cuffe Parade"],
    expiryDate: "2026-09-30",
    usageLimit: 20,
    usageCount: 3,
    active: true,
    notes: "Exclusive Colaba listings access",
    createdAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "ac-4",
    code: "VIPCLIENT",
    label: "VIP Ultra-Premium",
    assignedAgentId: "agent-2",
    allowedPropertyIds: [],
    allowedLocations: [],
    expiryDate: null,
    usageLimit: 5,
    usageCount: 2,
    active: true,
    notes: "Personal access for ultra-HNI clients",
    createdAt: "2024-03-01T00:00:00Z",
  },
];

export const PROPERTIES: Property[] = [
  {
    id: "prop-1",
    slug: "lodha-malabar-walkeshwar",
    title: "Lodha Malabar — Sea-Facing Residence",
    buildingName: "Lodha Malabar",
    location: "Malabar Hill",
    microLocation: "Walkeshwar",
    address: "B.G. Kher Road, Walkeshwar, Malabar Hill, Mumbai 400006",
    configuration: "4bhk",
    propertyType: "Luxury Apartment",
    transactionType: "sale",
    status: "active",
    possessionStatus: "ready",
    reraNumber: "P51900012345",
    priceDisplay: "₹28 Cr onwards",
    priceValue: 28,
    pricePerSqFt: "₹87,500 per sq. ft.",
    maintenance: "₹3.5 Lakh per month",
    carpetArea: "3,200 sq. ft.",
    builtUpArea: "3,800 sq. ft.",
    superBuiltUpArea: "4,200 sq. ft.",
    deckArea: "320 sq. ft.",
    balconyArea: "180 sq. ft.",
    floorNumber: "18th",
    totalFloors: 22,
    viewType: "sea",
    facing: "West",
    vastuStatus: "yes",
    bedrooms: 4,
    bathrooms: 4,
    powderRoom: true,
    servantRoom: true,
    studyRoom: true,
    familyLounge: true,
    utilityArea: true,
    parking: "2 designated covered",
    amenities: [
      "Swimming Pool", "Gymnasium", "Spa", "Concierge", "Valet Parking",
      "Private Lift Lobby", "24x7 Security", "Clubhouse", "Sea View Deck",
      "Business Lounge", "Visitor Parking", "Banquet Area",
    ],
    images: [
      { id: "img-1a", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200", caption: "Sea-facing residence exterior", type: "exterior", isCover: true },
      { id: "img-1b", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200", caption: "Living area with panoramic views", type: "interior", isCover: false },
      { id: "img-1c", url: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200", caption: "Arabian Sea view", type: "view", isCover: false },
      { id: "img-1d", url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200", caption: "Pool and amenities deck", type: "amenity", isCover: false },
    ],
    floorPlans: [
      { id: "fp-1a", title: "4 BHK Layout", type: "primary", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", notes: "Standard 4 BHK with study and servant quarters", carpetArea: "3,200 sq. ft.", roomCount: "4+1" },
    ],
    nearbyLandmarks: [
      { category: "Business", name: "BKC / Bandra-Kurla Complex", distance: "25 min" },
      { category: "School", name: "Walsingham House School", distance: "5 min" },
      { category: "Hospital", name: "Breach Candy Hospital", distance: "8 min" },
      { category: "Club", name: "Willingdon Sports Club", distance: "10 min" },
      { category: "Infrastructure", name: "Bandra-Worli Sea Link", distance: "12 min" },
    ],
    shortHighlight: "Sea-facing luxury residence with private lift lobby and world-class amenities on Malabar Hill.",
    description: "Lodha Malabar presents one of South Mumbai's most coveted addresses — a 4 BHK sea-facing residence on the prestigious B.G. Kher Road in Walkeshwar. This extraordinary home commands sweeping views of the Arabian Sea from the 18th floor, offering a living experience that is rarely available in this rarefied neighbourhood.\n\nThe residence spans 3,200 sq. ft. of carpet area, thoughtfully configured across four bedrooms, a study, a family lounge, and a private lift lobby that opens directly into the home. Every detail has been curated — from the imported marble flooring to the floor-to-ceiling glass that frames the sea.",
    lifestyleDescription: "Life at Lodha Malabar is defined by quiet luxury and exclusivity. The building's 24-hour concierge, private lift lobbies, and hotel-calibre amenities make every day feel resort-like. The neighbourhood itself is Mumbai's most discreet — home to the city's most distinguished families, judges, industrialists, and diplomats.",
    investmentNote: "Malabar Hill sea-facing properties are among the rarest in India. With inventory virtually non-existent and prices historically appreciating 8–12% annually, this represents a blue-chip real estate asset.",
    neighbourhoodNote: "Walkeshwar is one of Mumbai's most exclusive micro-markets — minutes from the High Court, diplomatic bungalows, the Hanging Gardens, and Breach Candy Club. The neighbourhood's pace, green cover, and old-world character make it irreplaceable.",
    agentRemarks: "Owner is a serious seller. Site visits available on appointment.",
    internalNotes: "Two families have shown strong interest. Price negotiable by ~3% for serious buyers.",
    assignedAgentId: "agent-2",
    showOnHomepage: true,
    showInListings: true,
    featured: true,
    hotProperty: true,
    hidePrice: false,
    hideExactAddress: false,
    seoTitle: "Lodha Malabar 4 BHK Sea-Facing Apartment | Walkeshwar, Mumbai",
    seoDescription: "Rare 4 BHK sea-facing apartment at Lodha Malabar, Walkeshwar. 3,200 sq ft carpet, panoramic Arabian Sea views. ₹28 Cr onwards.",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-05-10T00:00:00Z",
  },
  {
    id: "prop-2",
    slug: "raheja-imperia-worli",
    title: "Raheja Imperia — Skyline Residence",
    buildingName: "Raheja Imperia",
    location: "Worli",
    microLocation: "Worli Seaface",
    address: "Dr. Annie Besant Road, Worli, Mumbai 400018",
    configuration: "3bhk",
    propertyType: "Luxury Apartment",
    transactionType: "sale",
    status: "active",
    possessionStatus: "ready",
    reraNumber: "P51900023456",
    priceDisplay: "₹11 Cr onwards",
    priceValue: 11,
    pricePerSqFt: "₹64,700 per sq. ft.",
    maintenance: "₹1.8 Lakh per month",
    carpetArea: "1,700–3,000 sq. ft.",
    builtUpArea: "2,200–3,800 sq. ft.",
    superBuiltUpArea: "2,500–4,200 sq. ft.",
    deckArea: "200 sq. ft.",
    balconyArea: "120 sq. ft.",
    floorNumber: "24th–38th",
    totalFloors: 42,
    viewType: "skyline",
    facing: "West / North-West",
    vastuStatus: "yes",
    bedrooms: 3,
    bathrooms: 3,
    powderRoom: true,
    servantRoom: true,
    studyRoom: false,
    familyLounge: false,
    utilityArea: true,
    parking: "1 covered",
    amenities: [
      "Swimming Pool", "Gymnasium", "24x7 Security", "Clubhouse",
      "Kids Play Area", "Visitor Parking", "Business Lounge", "Lounge",
    ],
    images: [
      { id: "img-2a", url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200", caption: "Worli skyline view", type: "exterior", isCover: true },
      { id: "img-2b", url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200", caption: "Contemporary living space", type: "interior", isCover: false },
      { id: "img-2c", url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200", caption: "Modern kitchen", type: "interior", isCover: false },
    ],
    floorPlans: [
      { id: "fp-2a", title: "3 BHK Standard", type: "primary", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", notes: "1,700 sq ft 3 BHK", carpetArea: "1,700 sq. ft.", roomCount: "3" },
      { id: "fp-2b", title: "3 BHK Large", type: "alternate", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", notes: "3,000 sq ft premium 3 BHK", carpetArea: "3,000 sq. ft.", roomCount: "3+1" },
    ],
    nearbyLandmarks: [
      { category: "Business", name: "Lower Parel", distance: "10 min" },
      { category: "School", name: "Bombay Scottish School", distance: "15 min" },
      { category: "Hospital", name: "Hinduja Hospital", distance: "12 min" },
      { category: "Infrastructure", name: "Sea Link", distance: "8 min" },
    ],
    shortHighlight: "Premium high-rise with iconic Worli skyline and sea views. 3 & 4 BHK residences available.",
    description: "Raheja Imperia stands as one of Worli's most recognisable luxury high-rises, offering panoramic views of the Mumbai skyline and glimpses of the Arabian Sea. With residences available from the 24th floor onwards, every home here enjoys an elevated perspective of the city.\n\nThe 3 BHK residences span 1,700 to 3,000 sq. ft. of carpet area, with generous living spaces, well-proportioned bedrooms, and private balconies that bring the city's energy right to your doorstep.",
    lifestyleDescription: "Worli's Dr. Annie Besant Road is South Mumbai's most dynamic luxury corridor — flanked by five-star hotels, fine dining, and premium retail. Raheja Imperia residents enjoy the best of both worlds: the calm of a managed luxury tower and the buzz of the city's most exciting neighbourhood.",
    investmentNote: "Worli has seen consistent demand from NRIs, HNIs, and institutional buyers. The Sea Link connectivity makes this one of the most liquid luxury micro-markets in Mumbai.",
    neighbourhoodNote: "Worli is bordered by the Arabian Sea to the west and Prabhadevi to the east. It houses the city's finest hotels, corporate headquarters, fine dining restaurants, and luxury showrooms.",
    agentRemarks: "Multiple units available across floors. Best views on 32nd floor and above.",
    internalNotes: "Builder inventory — few units left.",
    assignedAgentId: "agent-1",
    showOnHomepage: true,
    showInListings: true,
    featured: true,
    hotProperty: false,
    hidePrice: false,
    hideExactAddress: false,
    seoTitle: "Raheja Imperia 3 BHK Luxury Apartment | Worli, Mumbai",
    seoDescription: "3 & 4 BHK residences at Raheja Imperia, Worli. Skyline and sea views. 1,700–3,000 sq ft. ₹11 Cr onwards.",
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-05-12T00:00:00Z",
  },
  {
    id: "prop-3",
    slug: "oberoi-three-sixty-west-worli",
    title: "Oberoi Three Sixty West — Ultra-Luxury Residence",
    buildingName: "Oberoi Three Sixty West",
    location: "Worli",
    microLocation: "Worli Seaface",
    address: "Worli Seaface, Worli, Mumbai 400018",
    configuration: "4bhk",
    propertyType: "Ultra-Luxury / Branded Residence",
    transactionType: "resale",
    status: "active",
    possessionStatus: "ready",
    reraNumber: "P51900034567",
    priceDisplay: "Price on Request",
    priceValue: null,
    pricePerSqFt: "On Request",
    maintenance: "₹5 Lakh per month",
    carpetArea: "4,000+ sq. ft.",
    builtUpArea: "5,200 sq. ft.",
    superBuiltUpArea: "6,000 sq. ft.",
    deckArea: "500 sq. ft.",
    balconyArea: "280 sq. ft.",
    floorNumber: "30th+",
    totalFloors: 55,
    viewType: "sea",
    facing: "West",
    vastuStatus: "unknown",
    bedrooms: 4,
    bathrooms: 5,
    powderRoom: true,
    servantRoom: true,
    studyRoom: true,
    familyLounge: true,
    utilityArea: true,
    parking: "3 designated covered",
    amenities: [
      "Swimming Pool", "Gymnasium", "Spa", "Concierge", "Valet Parking",
      "Private Lift Lobby", "24x7 Security", "Clubhouse", "Sea View Deck",
      "Business Lounge", "Visitor Parking", "Banquet Area", "Library",
      "Lounge", "Indoor Games", "Outdoor Garden",
    ],
    images: [
      { id: "img-3a", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200", caption: "Three Sixty West exterior", type: "exterior", isCover: true },
      { id: "img-3b", url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200", caption: "Grand living area", type: "interior", isCover: false },
      { id: "img-3c", url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200", caption: "Infinity pool", type: "amenity", isCover: false },
    ],
    floorPlans: [
      { id: "fp-3a", title: "4 BHK Residence", type: "primary", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", notes: "Ultra-luxury 4 BHK", carpetArea: "4,000 sq. ft.", roomCount: "4+2" },
      { id: "fp-3b", title: "Duplex Layout", type: "duplex", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", notes: "Upper + lower duplex configuration", carpetArea: "5,500 sq. ft.", roomCount: "5+2" },
    ],
    nearbyLandmarks: [
      { category: "Hotel", name: "The St. Regis Mumbai", distance: "3 min" },
      { category: "Business", name: "Bandra-Kurla Complex", distance: "20 min" },
      { category: "Infrastructure", name: "Sea Link", distance: "5 min" },
      { category: "Restaurant", name: "Hakkasan Mumbai", distance: "5 min" },
    ],
    shortHighlight: "The benchmark of Mumbai's ultra-luxury market. Hotel-style amenities, private lift lobby, unobstructed sea views.",
    description: "Oberoi Three Sixty West is the most iconic address in contemporary South Mumbai real estate — a joint venture between the Oberoi Group and Oasis Realty that has redefined what ultra-luxury means in this city. The building towers over the Worli Seaface, offering unobstructed 360-degree views of the Arabian Sea, Bandra-Worli Sea Link, and the sprawling Mumbai skyline.\n\nResidences here begin at 4,000 sq. ft. of carpet area, with duplex configurations available for those seeking the pinnacle of space and privacy. Hotel-style amenities, butler services, a private club floor, and Oberoi's legendary hospitality management make this a truly unparalleled address.",
    lifestyleDescription: "Living at Three Sixty West is living within a five-star hotel. The Oberoi's concierge team manages every need — from dinner reservations and private car hires to housekeeping and maintenance. The building's Club Floor features a private bar, screening room, and a residents-only lounge with panoramic sea views.",
    investmentNote: "Oberoi Three Sixty West is the gold standard of Mumbai luxury real estate. Secondary market transactions here are infrequent — and when they occur, they command premium prices with virtually no negotiation. An extraordinarily rare opportunity.",
    neighbourhoodNote: "The Worli Seaface is Mumbai's most prestigious stretch — lined with India's finest restaurants, luxury hotels, and premium addresses. The Sea Link connects this neighbourhood to Bandra in under 10 minutes, making it supremely well-connected.",
    agentRemarks: "Very few units available in the secondary market. Seller is highly selective about the next buyer.",
    internalNotes: "Price to be shared in person only. NDA may be required.",
    assignedAgentId: "agent-1",
    showOnHomepage: true,
    showInListings: true,
    featured: true,
    hotProperty: true,
    hidePrice: true,
    hideExactAddress: false,
    seoTitle: "Oberoi Three Sixty West 4 BHK | Worli Seaface, Mumbai",
    seoDescription: "Ultra-luxury 4 BHK and duplex residences at Oberoi Three Sixty West, Worli. Sea views, hotel amenities. Price on request.",
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-05-15T00:00:00Z",
  },
  {
    id: "prop-4",
    slug: "the-imperial-tardeo",
    title: "The Imperial — Iconic Tardeo Address",
    buildingName: "The Imperial",
    location: "Tardeo",
    microLocation: "Tardeo",
    address: "Tardeo Road, Tardeo, Mumbai 400034",
    configuration: "3bhk",
    propertyType: "Luxury Apartment",
    transactionType: "resale",
    status: "active",
    possessionStatus: "ready",
    reraNumber: "P51900045678",
    priceDisplay: "₹18 Cr onwards",
    priceValue: 18,
    pricePerSqFt: "₹72,000 per sq. ft.",
    maintenance: "₹2.5 Lakh per month",
    carpetArea: "2,500–4,500 sq. ft.",
    builtUpArea: "3,100–5,600 sq. ft.",
    superBuiltUpArea: "3,500–6,200 sq. ft.",
    deckArea: "300 sq. ft.",
    balconyArea: "200 sq. ft.",
    floorNumber: "20th–55th",
    totalFloors: 60,
    viewType: "skyline",
    facing: "East / West",
    vastuStatus: "yes",
    bedrooms: 3,
    bathrooms: 3,
    powderRoom: true,
    servantRoom: true,
    studyRoom: true,
    familyLounge: true,
    utilityArea: true,
    parking: "2 covered",
    amenities: [
      "Swimming Pool", "Gymnasium", "Concierge", "Valet Parking",
      "Private Lift Lobby", "24x7 Security", "Clubhouse",
      "Business Lounge", "Visitor Parking", "Banquet Area",
    ],
    images: [
      { id: "img-4a", url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200", caption: "The Imperial towers, Tardeo", type: "exterior", isCover: true },
      { id: "img-4b", url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200", caption: "Panoramic city views", type: "view", isCover: false },
      { id: "img-4c", url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200", caption: "Modern kitchen", type: "interior", isCover: false },
    ],
    floorPlans: [
      { id: "fp-4a", title: "3 BHK Mid-Rise", type: "primary", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", notes: "2,500 sq ft 3 BHK", carpetArea: "2,500 sq. ft.", roomCount: "3+1" },
      { id: "fp-4b", title: "4 BHK High-Floor", type: "premium", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", notes: "4,500 sq ft 4 BHK penthouse level", carpetArea: "4,500 sq. ft.", roomCount: "4+2" },
    ],
    nearbyLandmarks: [
      { category: "Business", name: "Lower Parel", distance: "15 min" },
      { category: "Hospital", name: "Breach Candy Hospital", distance: "5 min" },
      { category: "Club", name: "CCI — Cricket Club of India", distance: "10 min" },
      { category: "Infrastructure", name: "Haji Ali", distance: "8 min" },
    ],
    shortHighlight: "South Mumbai's most iconic twin-tower development with panoramic views and resort-like amenities.",
    description: "The Imperial stands as one of South Mumbai's most iconic silhouettes — twin towers rising majestically over Tardeo, offering one of the city's most extraordinary living experiences. With residences available from the 20th to the 60th floor, The Imperial commands unmatched panoramic views of the Arabian Sea, the city skyline, and the green expanse of the Mahalaxmi racecourse.\n\nAvailable in 3 and 4 BHK configurations ranging from 2,500 to 4,500 sq. ft., these residences are finished to a level of craftsmanship that befits the address.",
    lifestyleDescription: "Residents of The Imperial enjoy access to a private residents' club, rooftop pool, business centre, and one of South Mumbai's finest banquet facilities. The building's heritage and prestige ensure that your neighbours are drawn from Mumbai's most established families.",
    investmentNote: "Tardeo's Central Business District positioning, proximity to South Mumbai courts, embassies, and prime retail makes The Imperial one of the most location-resilient investments in the city.",
    neighbourhoodNote: "Tardeo is at the heart of South Mumbai — steps from Haji Ali, Mahalaxmi, Breach Candy, and the iconic Pedder Road. The neighbourhood's connectivity, retail, and dining options are exceptional.",
    agentRemarks: "Resale units — seller is flexible on timing. Price slightly negotiable.",
    internalNotes: "Two units available. High floor preferred by buyer 1.",
    assignedAgentId: "agent-2",
    showOnHomepage: true,
    showInListings: true,
    featured: true,
    hotProperty: false,
    hidePrice: false,
    hideExactAddress: false,
    seoTitle: "The Imperial 3 BHK Apartment | Tardeo, South Mumbai",
    seoDescription: "Luxury 3 & 4 BHK at The Imperial, Tardeo. Panoramic Mumbai views, 2,500–4,500 sq ft. ₹18 Cr onwards.",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-05-20T00:00:00Z",
  },
  {
    id: "prop-5",
    slug: "lodha-sea-face-worli",
    title: "Lodha Sea Face — Signature Sea-Facing Residence",
    buildingName: "Lodha Sea Face",
    location: "Worli",
    microLocation: "Worli Seaface",
    address: "Worli Seaface, Worli, Mumbai 400018",
    configuration: "4bhk",
    propertyType: "Ultra-Luxury Signature Residence",
    transactionType: "sale",
    status: "active",
    possessionStatus: "ready",
    reraNumber: "P51900056789",
    priceDisplay: "₹40 Cr onwards",
    priceValue: 40,
    pricePerSqFt: "₹88,800 per sq. ft.",
    maintenance: "₹6 Lakh per month",
    carpetArea: "4,500 sq. ft.",
    builtUpArea: "5,800 sq. ft.",
    superBuiltUpArea: "6,500 sq. ft.",
    deckArea: "600 sq. ft.",
    balconyArea: "350 sq. ft.",
    floorNumber: "35th+",
    totalFloors: 50,
    viewType: "sea",
    facing: "West",
    vastuStatus: "yes",
    bedrooms: 4,
    bathrooms: 5,
    powderRoom: true,
    servantRoom: true,
    studyRoom: true,
    familyLounge: true,
    utilityArea: true,
    parking: "3 designated covered",
    amenities: [
      "Swimming Pool", "Gymnasium", "Spa", "Concierge", "Valet Parking",
      "Private Lift Lobby", "24x7 Security", "Clubhouse", "Sea View Deck",
      "Business Lounge", "Kids Play Area", "Visitor Parking",
      "Library", "Lounge", "Outdoor Garden",
    ],
    images: [
      { id: "img-5a", url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200", caption: "Lodha Sea Face exterior", type: "exterior", isCover: true },
      { id: "img-5b", url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200", caption: "Sea-facing living room", type: "interior", isCover: false },
      { id: "img-5c", url: "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=1200", caption: "Infinity pool", type: "amenity", isCover: false },
    ],
    floorPlans: [
      { id: "fp-5a", title: "Signature 4 BHK", type: "primary", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", notes: "4,500 sq ft with double-height lobby", carpetArea: "4,500 sq. ft.", roomCount: "4+2" },
    ],
    nearbyLandmarks: [
      { category: "Hotel", name: "Four Seasons Hotel Mumbai", distance: "5 min" },
      { category: "Infrastructure", name: "Sea Link", distance: "3 min" },
      { category: "Restaurant", name: "Tian / Zoe", distance: "7 min" },
    ],
    shortHighlight: "Rare sea-facing luxury address by Lodha Group on the prestigious Worli Seaface. 4,500 sq ft signature residences.",
    description: "Lodha Sea Face is among the most rarified addresses in all of India — a sea-facing ultra-luxury development positioned at the Worli Seaface with uninterrupted views of the Arabian Sea and the Bandra-Worli Sea Link. Developed by Lodha Group, India's largest real estate developer, this property combines exceptional craftsmanship with an address that simply cannot be replicated.\n\nThe 4 BHK signature residences span 4,500 sq. ft. of carpet area, with a private double-height entry lobby, panoramic sea views from all bedrooms, and a private deck that extends the living space outdoors.",
    lifestyleDescription: "Every residence at Lodha Sea Face feels like a private estate in the sky. The building's bespoke amenities — including a private cinema, rooftop garden, and Lodha's signature concierge service — ensure that every moment of every day is attended to. This is Mumbai's highest standard of private residential living.",
    investmentNote: "Sea-facing residences at this location are once-in-a-decade opportunities. The Worli Seaface micro-market commands premium pricing with zero inventory pressure. Appreciation over 5 years has consistently outpaced the broader luxury segment.",
    neighbourhoodNote: "The Worli Seaface is unquestionably Mumbai's most desirable stretch of real estate — a coastal promenade lined with landmark buildings, five-star hotels, and the city's finest dining. The Sea Link provides a direct 10-minute connection to Bandra.",
    agentRemarks: "Only 2 units available. This is not a negotiation situation — price is firm.",
    internalNotes: "Buyer needs to be introduced via agent. Direct approach not acceptable to seller.",
    assignedAgentId: "agent-1",
    showOnHomepage: true,
    showInListings: true,
    featured: true,
    hotProperty: true,
    hidePrice: false,
    hideExactAddress: false,
    seoTitle: "Lodha Sea Face 4 BHK Sea-Facing Residence | Worli, Mumbai",
    seoDescription: "Ultra-luxury 4 BHK at Lodha Sea Face, Worli. 4,500 sq ft carpet, unobstructed sea views. ₹40 Cr onwards.",
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-05-22T00:00:00Z",
  },
  {
    id: "prop-6",
    slug: "kalpataru-avana-parel",
    title: "Kalpataru Avana — Premium Gated Community",
    buildingName: "Kalpataru Avana",
    location: "Lower Parel",
    microLocation: "Parel",
    address: "Ganpatrao Kadam Marg, Parel, Mumbai 400012",
    configuration: "3bhk",
    propertyType: "Premium Apartment",
    transactionType: "sale",
    status: "active",
    possessionStatus: "ready",
    reraNumber: "P51900067890",
    priceDisplay: "₹9 Cr onwards",
    priceValue: 9,
    pricePerSqFt: "₹50,000 per sq. ft.",
    maintenance: "₹1.2 Lakh per month",
    carpetArea: "1,800–3,200 sq. ft.",
    builtUpArea: "2,300–4,100 sq. ft.",
    superBuiltUpArea: "2,600–4,600 sq. ft.",
    deckArea: "180 sq. ft.",
    balconyArea: "140 sq. ft.",
    floorNumber: "10th–35th",
    totalFloors: 40,
    viewType: "city",
    facing: "East / North",
    vastuStatus: "yes",
    bedrooms: 3,
    bathrooms: 3,
    powderRoom: false,
    servantRoom: true,
    studyRoom: false,
    familyLounge: false,
    utilityArea: true,
    parking: "1 covered",
    amenities: [
      "Swimming Pool", "Gymnasium", "24x7 Security", "Clubhouse",
      "Kids Play Area", "Outdoor Garden", "Indoor Games", "Visitor Parking",
    ],
    images: [
      { id: "img-6a", url: "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=1200", caption: "Kalpataru Avana exterior", type: "exterior", isCover: true },
      { id: "img-6b", url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200", caption: "Living room", type: "interior", isCover: false },
    ],
    floorPlans: [
      { id: "fp-6a", title: "3 BHK Standard", type: "primary", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", notes: "1,800 sq ft 3 BHK", carpetArea: "1,800 sq. ft.", roomCount: "3+1" },
    ],
    nearbyLandmarks: [
      { category: "Business", name: "Lower Parel Business District", distance: "5 min" },
      { category: "Mall", name: "Palladium Mall", distance: "7 min" },
      { category: "Hospital", name: "KEM Hospital", distance: "10 min" },
      { category: "Infrastructure", name: "Parel Railway Station", distance: "8 min" },
    ],
    shortHighlight: "Premium gated development in Parel with lifestyle amenities and excellent connectivity to Lower Parel.",
    description: "Kalpataru Avana offers a premium residential experience in one of Mumbai's most rapidly evolving neighbourhoods. Strategically located in Parel, this gated development provides easy access to the Lower Parel business district, world-class retail at Palladium Mall, and the city's finest dining and entertainment.\n\nAvailable in 3 and 4 BHK configurations ranging from 1,800 to 3,200 sq. ft., these residences are ideal for professionals and families seeking luxury living with exceptional connectivity.",
    lifestyleDescription: "Kalpataru Avana's community-focused design creates a resort-like living environment in the heart of Central Mumbai. The landscaped gardens, children's play areas, and modern clubhouse foster a vibrant community of like-minded residents.",
    investmentNote: "Parel and Lower Parel have emerged as Mumbai's second central business district, driving consistent demand from young HNIs and NRIs. Capital appreciation here has been strong and sustained.",
    neighbourhoodNote: "Parel connects seamlessly to Lower Parel's financial district, South Mumbai's heritage core, and the northern suburbs. The neighbourhood has transformed remarkably over the past decade.",
    agentRemarks: "Builder inventory available. Negotiation possible on select floors.",
    internalNotes: "Good first buy for HNI client looking at under ₹12 Cr.",
    assignedAgentId: "agent-3",
    showOnHomepage: true,
    showInListings: true,
    featured: false,
    hotProperty: false,
    hidePrice: false,
    hideExactAddress: false,
    seoTitle: "Kalpataru Avana 3 BHK Apartment | Parel, Mumbai",
    seoDescription: "3 & 4 BHK at Kalpataru Avana, Parel. Premium gated community, 1,800–3,200 sq ft. ₹9 Cr onwards.",
    createdAt: "2024-02-15T00:00:00Z",
    updatedAt: "2024-05-25T00:00:00Z",
  },
  {
    id: "prop-7",
    slug: "rustomjee-crown-prabhadevi",
    title: "Rustomjee Crown — Prabhadevi Landmark",
    buildingName: "Rustomjee Crown",
    location: "Prabhadevi",
    microLocation: "Prabhadevi",
    address: "Prabhadevi Road, Prabhadevi, Mumbai 400025",
    configuration: "4bhk",
    propertyType: "Luxury Apartment",
    transactionType: "sale",
    status: "active",
    possessionStatus: "ready",
    reraNumber: "P51900078901",
    priceDisplay: "₹15 Cr onwards",
    priceValue: 15,
    pricePerSqFt: "₹65,000 per sq. ft.",
    maintenance: "₹2 Lakh per month",
    carpetArea: "2,300–3,800 sq. ft.",
    builtUpArea: "2,900–4,800 sq. ft.",
    superBuiltUpArea: "3,200–5,400 sq. ft.",
    deckArea: "250 sq. ft.",
    balconyArea: "160 sq. ft.",
    floorNumber: "15th–30th",
    totalFloors: 35,
    viewType: "city",
    facing: "North / West",
    vastuStatus: "yes",
    bedrooms: 4,
    bathrooms: 4,
    powderRoom: true,
    servantRoom: true,
    studyRoom: true,
    familyLounge: false,
    utilityArea: true,
    parking: "2 covered",
    amenities: [
      "Swimming Pool", "Gymnasium", "Spa", "Concierge",
      "Private Lift Lobby", "24x7 Security", "Clubhouse",
      "Business Lounge", "Kids Play Area",
    ],
    images: [
      { id: "img-7a", url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200", caption: "Rustomjee Crown", type: "exterior", isCover: true },
      { id: "img-7b", url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200", caption: "Living room", type: "interior", isCover: false },
    ],
    floorPlans: [
      { id: "fp-7a", title: "4 BHK Residence", type: "primary", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", notes: "2,300 sq ft 4 BHK", carpetArea: "2,300 sq. ft.", roomCount: "4+1" },
    ],
    nearbyLandmarks: [
      { category: "Temple", name: "Siddhivinayak Temple", distance: "2 min" },
      { category: "Business", name: "Lower Parel", distance: "8 min" },
      { category: "Infrastructure", name: "Sea Link", distance: "15 min" },
    ],
    shortHighlight: "Landmark Prabhadevi address steps from Siddhivinayak. Spacious 4 BHK residences with premium amenities.",
    description: "Rustomjee Crown occupies one of Prabhadevi's most prestigious positions, steps from the iconic Siddhivinayak Temple. This 35-storey tower offers generously proportioned 4 BHK residences with private lift lobbies and a comprehensive amenities package befitting South Mumbai's finest addresses.",
    lifestyleDescription: "Prabhadevi's community feel combined with Rustomjee Crown's premium specifications makes this ideal for established families seeking both luxury and a sense of neighbourhood. The building's proximity to Worli and Lower Parel means the city's best dining and business hubs are minutes away.",
    investmentNote: "Prabhadevi's central location between Worli and Lower Parel ensures consistent demand and strong long-term value. Rustomjee as a developer commands a premium in the resale market.",
    neighbourhoodNote: "Prabhadevi is one of South Mumbai's most character-rich neighbourhoods — blending old-world community living with modern luxury. The Siddhivinayak Temple draws devotees from across the city and world.",
    agentRemarks: "Builder inventory — limited units available.",
    internalNotes: "Good alternative for buyer who liked Worli but found prices steep.",
    assignedAgentId: "agent-3",
    showOnHomepage: false,
    showInListings: true,
    featured: false,
    hotProperty: false,
    hidePrice: false,
    hideExactAddress: false,
    seoTitle: "Rustomjee Crown 4 BHK Apartment | Prabhadevi, Mumbai",
    seoDescription: "Luxury 4 BHK at Rustomjee Crown, Prabhadevi. 2,300–3,800 sq ft. ₹15 Cr onwards.",
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-05-28T00:00:00Z",
  },
  {
    id: "prop-8",
    slug: "palais-royale-worli",
    title: "Palais Royale — Worli's Most Exclusive Tower",
    buildingName: "Palais Royale",
    location: "Worli",
    microLocation: "Worli",
    address: "Elphinstone Road, Worli, Mumbai 400013",
    configuration: "duplex",
    propertyType: "Ultra-Luxury Duplex",
    transactionType: "resale",
    status: "active",
    possessionStatus: "ready",
    reraNumber: "P51900089012",
    priceDisplay: "₹35 Cr onwards",
    priceValue: 35,
    pricePerSqFt: "₹85,000 per sq. ft.",
    maintenance: "₹5.5 Lakh per month",
    carpetArea: "4,100 sq. ft.",
    builtUpArea: "5,300 sq. ft.",
    superBuiltUpArea: "6,100 sq. ft.",
    deckArea: "450 sq. ft.",
    balconyArea: "300 sq. ft.",
    floorNumber: "40th–42nd",
    totalFloors: 66,
    viewType: "mixed",
    facing: "West / North",
    vastuStatus: "unknown",
    bedrooms: 4,
    bathrooms: 5,
    powderRoom: true,
    servantRoom: true,
    studyRoom: true,
    familyLounge: true,
    utilityArea: true,
    parking: "3 covered",
    amenities: [
      "Swimming Pool", "Gymnasium", "Spa", "Concierge", "Valet Parking",
      "Private Lift Lobby", "24x7 Security", "Clubhouse", "Sea View Deck",
      "Business Lounge", "Banquet Area", "Library", "Lounge",
    ],
    images: [
      { id: "img-8a", url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200", caption: "Palais Royale tower", type: "exterior", isCover: true },
      { id: "img-8b", url: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200", caption: "Duplex living space", type: "interior", isCover: false },
    ],
    floorPlans: [
      { id: "fp-8a", title: "Duplex — Lower Floor", type: "duplex", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", notes: "Entry level — living, dining, kitchen", carpetArea: "2,000 sq. ft.", roomCount: "2 beds" },
      { id: "fp-8b", title: "Duplex — Upper Floor", type: "duplex", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", notes: "Upper level — master + 2 beds + family lounge", carpetArea: "2,100 sq. ft.", roomCount: "2 beds + lounge" },
    ],
    nearbyLandmarks: [
      { category: "Infrastructure", name: "Sea Link", distance: "8 min" },
      { category: "Business", name: "Lower Parel", distance: "10 min" },
      { category: "Hospital", name: "Global Hospital", distance: "12 min" },
    ],
    shortHighlight: "Among Mumbai's tallest towers, Palais Royale offers duplex residences with staggering 360° views.",
    description: "Palais Royale is one of Mumbai's most discussed luxury addresses — a 66-storey tower in Worli that offers one of the city's most dramatic residential experiences. The duplex residences spread across two floors, offering an almost palatial sense of scale that is exceptionally rare in South Mumbai.",
    lifestyleDescription: "At over 400 feet above sea level, life in Palais Royale feels removed from the city below. The private residents' club, rooftop pool, and unparalleled views create an experience that few addresses in India can match.",
    investmentNote: "Palais Royale's unique positioning — height, scarcity, Worli address, and brand — makes it a compelling portfolio asset. Very limited inventory available in the secondary market.",
    neighbourhoodNote: "Central Worli's transformation into a luxury residential and commercial hub has been one of Mumbai's most significant urban shifts of the past decade. Infrastructure investment continues at pace.",
    agentRemarks: "Resale — motivated seller. Price reflects current market, no upside for buyer in further negotiation.",
    internalNotes: "One of the best value ultra-luxury units currently available in the market.",
    assignedAgentId: "agent-1",
    showOnHomepage: false,
    showInListings: true,
    featured: false,
    hotProperty: true,
    hidePrice: false,
    hideExactAddress: false,
    seoTitle: "Palais Royale Duplex | Worli, Mumbai",
    seoDescription: "Ultra-luxury duplex at Palais Royale, Worli. 4,100 sq ft carpet, 360° views. ₹35 Cr onwards.",
    createdAt: "2024-03-10T00:00:00Z",
    updatedAt: "2024-05-30T00:00:00Z",
  },
  {
    id: "prop-9",
    slug: "lodha-world-one-worli",
    title: "Lodha World One — World's Tallest Residential Tower",
    buildingName: "Lodha World One",
    location: "Worli",
    microLocation: "Lower Parel / Worli",
    address: "World One, Senapati Bapat Marg, Lower Parel, Mumbai 400013",
    configuration: "penthouse",
    propertyType: "Ultra-Luxury Penthouse",
    transactionType: "resale",
    status: "active",
    possessionStatus: "ready",
    reraNumber: "P51900090123",
    priceDisplay: "₹55 Cr onwards",
    priceValue: 55,
    pricePerSqFt: "₹95,000 per sq. ft.",
    maintenance: "₹8 Lakh per month",
    carpetArea: "5,800 sq. ft.",
    builtUpArea: "7,200 sq. ft.",
    superBuiltUpArea: "8,500 sq. ft.",
    deckArea: "800 sq. ft.",
    balconyArea: "500 sq. ft.",
    floorNumber: "65th+",
    totalFloors: 117,
    viewType: "sea",
    facing: "West",
    vastuStatus: "unknown",
    bedrooms: 4,
    bathrooms: 6,
    powderRoom: true,
    servantRoom: true,
    studyRoom: true,
    familyLounge: true,
    utilityArea: true,
    parking: "4 covered",
    amenities: [
      "Swimming Pool", "Gymnasium", "Spa", "Concierge", "Valet Parking",
      "Private Lift Lobby", "24x7 Security", "Clubhouse", "Sea View Deck",
      "Business Lounge", "Kids Play Area", "Banquet Area", "Library",
      "Lounge", "Outdoor Garden",
    ],
    images: [
      { id: "img-9a", url: "https://images.unsplash.com/photo-1614197043100-be4e83e498e0?w=1200", caption: "World One tower exterior", type: "exterior", isCover: true },
      { id: "img-9b", url: "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=1200", caption: "Penthouse living space", type: "interior", isCover: false },
    ],
    floorPlans: [
      { id: "fp-9a", title: "Sky Penthouse", type: "penthouse", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", notes: "5,800 sq ft penthouse on 65th floor", carpetArea: "5,800 sq. ft.", roomCount: "4+2+study" },
    ],
    nearbyLandmarks: [
      { category: "Business", name: "Lower Parel / BKC via Expressway", distance: "10 min" },
      { category: "Luxury Hotel", name: "The Lodhi", distance: "Adjacent" },
      { category: "Mall", name: "Palladium Luxury", distance: "5 min" },
    ],
    shortHighlight: "Residences in the world's tallest residential tower. Mumbai's ultimate luxury address.",
    description: "Lodha World One — the world's tallest purely residential tower at 117 storeys — represents the absolute pinnacle of Mumbai luxury living. Penthouse residences on the upper floors command impossible views: the full panorama of the Arabian Sea, the sprawling city, and on clear days, glimpses of distant coastline.\n\nThese are not apartments — they are private estates in the sky, finished to a standard that rivals the finest residences anywhere in the world.",
    lifestyleDescription: "Life at World One is life at the very apex. The sky club, private cinema, observatory deck, and Lodha's world-class concierge services set a standard that simply does not exist anywhere else in India.",
    investmentNote: "The last of the penthouse units at World One represent a once-in-a-generation opportunity. These residences are already international trophies. Future appreciation is expected to significantly outperform the market.",
    neighbourhoodNote: "Positioned at the nexus of Lower Parel and Worli, World One enjoys exceptional access to the Sea Link, the expressway, and the finest commercial and retail destinations in Mumbai.",
    agentRemarks: "This is a rare secondary market opportunity. Price is non-negotiable. Serious buyers only.",
    internalNotes: "Introduction letter required before site visit.",
    assignedAgentId: "agent-1",
    showOnHomepage: false,
    showInListings: true,
    featured: true,
    hotProperty: true,
    hidePrice: false,
    hideExactAddress: false,
    seoTitle: "Lodha World One Penthouse | Lower Parel, Mumbai",
    seoDescription: "Sky penthouse at Lodha World One — the world's tallest residential tower. 5,800 sq ft. ₹55 Cr onwards.",
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2024-05-31T00:00:00Z",
  },
  {
    id: "prop-10",
    slug: "maker-tower-cuffe-parade",
    title: "Maker Tower — Heritage Cuffe Parade Address",
    buildingName: "Maker Tower",
    location: "Cuffe Parade",
    microLocation: "Cuffe Parade",
    address: "Cuffe Parade, Colaba, Mumbai 400005",
    configuration: "3bhk",
    propertyType: "Luxury Apartment",
    transactionType: "resale",
    status: "active",
    possessionStatus: "resale",
    reraNumber: "Legacy — Pre-RERA",
    priceDisplay: "₹14 Cr onwards",
    priceValue: 14,
    pricePerSqFt: "₹58,000 per sq. ft.",
    maintenance: "₹1.5 Lakh per month",
    carpetArea: "2,400 sq. ft.",
    builtUpArea: "3,100 sq. ft.",
    superBuiltUpArea: "3,500 sq. ft.",
    deckArea: "200 sq. ft.",
    balconyArea: "180 sq. ft.",
    floorNumber: "12th",
    totalFloors: 28,
    viewType: "sea",
    facing: "West",
    vastuStatus: "unknown",
    bedrooms: 3,
    bathrooms: 3,
    powderRoom: false,
    servantRoom: true,
    studyRoom: false,
    familyLounge: false,
    utilityArea: true,
    parking: "1 covered",
    amenities: [
      "Swimming Pool", "Gymnasium", "24x7 Security",
      "Visitor Parking", "Clubhouse",
    ],
    images: [
      { id: "img-10a", url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200", caption: "Maker Tower, Cuffe Parade", type: "exterior", isCover: true },
      { id: "img-10b", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200", caption: "Living room with sea view", type: "interior", isCover: false },
    ],
    floorPlans: [
      { id: "fp-10a", title: "3 BHK Standard", type: "primary", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", notes: "Classic 3 BHK layout", carpetArea: "2,400 sq. ft.", roomCount: "3+1" },
    ],
    nearbyLandmarks: [
      { category: "Heritage", name: "Taj Mahal Palace Hotel", distance: "10 min" },
      { category: "Business", name: "NCPA", distance: "5 min" },
      { category: "Club", name: "Breach Candy Club", distance: "20 min" },
      { category: "Infrastructure", name: "CST Station", distance: "20 min" },
    ],
    shortHighlight: "Coveted heritage address at Cuffe Parade with sea views and old-world character. Rare resale opportunity.",
    description: "Maker Tower at Cuffe Parade is one of Mumbai's most enduring luxury addresses — a heritage residential complex that has been home to the city's most distinguished families for decades. The 12th floor 3 BHK apartment offers commanding views of the Arabian Sea and the Nariman Point skyline.\n\nThese residences have a character and spaciousness that new developments rarely replicate — high ceilings, generous proportions, and the quiet dignity of an established neighbourhood.",
    lifestyleDescription: "Cuffe Parade is South Mumbai's southernmost point — a peninsula neighbourhood with a yacht club, the NCPA, and some of the city's most exclusive residential addresses. Life here moves at a slower, more gracious pace than the rest of the city.",
    investmentNote: "Heritage addresses like Maker Tower at Cuffe Parade have limited turnover and consistent demand from NRI families with deep Mumbai roots. The land value alone makes this a compelling hold.",
    neighbourhoodNote: "Cuffe Parade occupies a unique position at the southern tip of Mumbai — flanked by the sea on two sides, with direct views of the harbour and the Gateway of India precinct. It remains one of the city's most exclusive residential pockets.",
    agentRemarks: "Owner has owned for 20+ years and is selling due to relocation abroad.",
    internalNotes: "Seller is motivated. Priced to move within 60 days.",
    assignedAgentId: "agent-3",
    showOnHomepage: false,
    showInListings: true,
    featured: false,
    hotProperty: false,
    hidePrice: false,
    hideExactAddress: false,
    seoTitle: "Maker Tower 3 BHK Resale | Cuffe Parade, Mumbai",
    seoDescription: "Rare resale 3 BHK at Maker Tower, Cuffe Parade. Sea views, 2,400 sq ft. ₹14 Cr onwards.",
    createdAt: "2024-04-01T00:00:00Z",
    updatedAt: "2024-05-31T00:00:00Z",
  },
];

export const LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Vikram Malhotra",
    phone: "+91 98100 12345",
    email: "vikram.m@example.com",
    source: "access_page",
    accessCodeUsed: "PRIVATE2026",
    propertyId: "prop-3",
    budget: "₹45 Cr+",
    preferredLocation: "Worli, Malabar Hill",
    requirement: "4 BHK sea-facing, min 4000 sqft",
    message: "Looking for a primary residence for my family. Need sea views and private lobby.",
    assignedAgentId: "agent-1",
    status: "visit_scheduled",
    leadTemperature: "hot",
    notes: "Very serious buyer. Visit scheduled for Saturday.",
    followUpDate: "2026-06-07",
    createdAt: "2026-05-28T10:30:00Z",
    updatedAt: "2026-05-30T15:00:00Z",
  },
  {
    id: "lead-2",
    name: "Ananya Sharma",
    phone: "+91 98200 67890",
    email: "ananya.s@example.com",
    source: "property_detail",
    accessCodeUsed: "WORLI50",
    propertyId: "prop-2",
    budget: "₹12–18 Cr",
    preferredLocation: "Worli",
    requirement: "3 BHK with city view",
    message: "NRI — relocating to Mumbai. Need modern finishes and good building security.",
    assignedAgentId: "agent-1",
    status: "interested",
    leadTemperature: "warm",
    notes: "NRI buyer from Singapore. Zoom call preferred.",
    followUpDate: "2026-06-10",
    createdAt: "2026-05-25T14:00:00Z",
    updatedAt: "2026-05-29T11:00:00Z",
  },
  {
    id: "lead-3",
    name: "Rajesh Patel",
    phone: "+91 97690 34567",
    email: "rajesh.p@example.com",
    source: "homepage_form",
    accessCodeUsed: "VIPCLIENT",
    propertyId: "",
    budget: "₹20–30 Cr",
    preferredLocation: "Malabar Hill, Altamount Road",
    requirement: "Sea view essential. 3–4 BHK.",
    message: "For investment and occasional personal use. Not in a rush.",
    assignedAgentId: "agent-2",
    status: "contacted",
    leadTemperature: "warm",
    notes: "Investor mindset — wants best ROI in 5 years.",
    followUpDate: "2026-06-15",
    createdAt: "2026-05-20T09:00:00Z",
    updatedAt: "2026-05-27T10:00:00Z",
  },
  {
    id: "lead-4",
    name: "Meera Joshi",
    phone: "+91 99870 78901",
    email: "meera.j@example.com",
    source: "whatsapp_click",
    accessCodeUsed: "COLABAELITE",
    propertyId: "prop-10",
    budget: "₹12–16 Cr",
    preferredLocation: "Cuffe Parade, Colaba",
    requirement: "Old Mumbai charm, heritage building preferred",
    message: "Grew up in Colaba. Want to move back. Sea views mandatory.",
    assignedAgentId: "agent-3",
    status: "new",
    leadTemperature: "warm",
    notes: "Very specific about location. Won't consider Worli.",
    followUpDate: "2026-06-05",
    createdAt: "2026-05-31T08:00:00Z",
    updatedAt: "2026-05-31T08:00:00Z",
  },
  {
    id: "lead-5",
    name: "Sanjay Gupta",
    phone: "+91 98450 23456",
    email: "sanjay.g@example.com",
    source: "property_detail",
    accessCodeUsed: "PRIVATE2026",
    propertyId: "prop-9",
    budget: "₹55 Cr+",
    preferredLocation: "Worli",
    requirement: "Penthouse only",
    message: "Want the best in Mumbai. Price is not the primary concern.",
    assignedAgentId: "agent-1",
    status: "negotiation",
    leadTemperature: "hot",
    notes: "CEO of a listed company. Met in person. Very serious.",
    followUpDate: "2026-06-03",
    createdAt: "2026-05-15T12:00:00Z",
    updatedAt: "2026-05-31T16:00:00Z",
  },
];

export const ACTIVITIES: Activity[] = [
  { id: "act-1", type: "client_access", description: "Vikram Malhotra accessed using PRIVATE2026", clientName: "Vikram Malhotra", propertyId: "", createdAt: "2026-05-28T10:25:00Z" },
  { id: "act-2", type: "property_view", description: "Vikram Malhotra viewed Oberoi Three Sixty West", clientName: "Vikram Malhotra", propertyId: "prop-3", createdAt: "2026-05-28T10:35:00Z" },
  { id: "act-3", type: "lead_created", description: "New lead from Vikram Malhotra — property enquiry", leadId: "lead-1", createdAt: "2026-05-28T10:40:00Z" },
  { id: "act-4", type: "client_access", description: "Ananya Sharma accessed using WORLI50", clientName: "Ananya Sharma", createdAt: "2026-05-25T14:00:00Z" },
  { id: "act-5", type: "property_update", description: "Arjun Mehta updated Lodha Sea Face listing", agentId: "agent-1", propertyId: "prop-5", createdAt: "2026-05-22T11:00:00Z" },
  { id: "act-6", type: "lead_status_change", description: "Lead Sanjay Gupta moved to Negotiation", leadId: "lead-5", agentId: "agent-1", createdAt: "2026-05-31T16:00:00Z" },
  { id: "act-7", type: "client_access", description: "Meera Joshi accessed using COLABAELITE", clientName: "Meera Joshi", createdAt: "2026-05-31T08:00:00Z" },
  { id: "act-8", type: "property_view", description: "Meera Joshi viewed Maker Tower, Cuffe Parade", clientName: "Meera Joshi", propertyId: "prop-10", createdAt: "2026-05-31T08:10:00Z" },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return PROPERTIES.filter((p) => p.showOnHomepage && p.status === "active");
}

export function getListingProperties(filters?: {
  location?: string;
  configuration?: string;
  possessionStatus?: string;
  viewType?: string;
  minPrice?: number;
  maxPrice?: number;
}): Property[] {
  let props = PROPERTIES.filter((p) => p.showInListings && p.status === "active");
  if (!filters) return props;
  if (filters.location) props = props.filter((p) => p.location.toLowerCase() === filters.location!.toLowerCase());
  if (filters.configuration) props = props.filter((p) => p.configuration === filters.configuration);
  if (filters.possessionStatus) props = props.filter((p) => p.possessionStatus === filters.possessionStatus);
  if (filters.viewType) props = props.filter((p) => p.viewType === filters.viewType);
  return props;
}

export function validateAccessCode(code: string): AccessCode | null {
  const ac = ACCESS_CODES.find((a) => a.code === code.toUpperCase());
  if (!ac) return null;
  if (!ac.active) return null;
  if (ac.expiryDate && new Date(ac.expiryDate) < new Date()) return null;
  if (ac.usageLimit !== null && ac.usageCount >= ac.usageLimit) return null;
  return ac;
}

export const LOCATIONS = [
  "Worli", "Tardeo", "Mahalaxmi", "Prabhadevi", "Colaba",
  "Malabar Hill", "Lower Parel", "Cuffe Parade", "Breach Candy", "Altamount Road",
];

export const LOCATION_DESCRIPTIONS: Record<string, { description: string; count: number }> = {
  Worli: { description: "Mumbai's most dynamic luxury corridor, flanked by the Arabian Sea and the iconic Sea Link.", count: 4 },
  Tardeo: { description: "South Mumbai's central pulse — home to The Imperial towers and Haji Ali's seafront promenade.", count: 1 },
  Mahalaxmi: { description: "Adjacent to the iconic racecourse and Haji Ali, offering old-world prestige and luxury living.", count: 1 },
  Prabhadevi: { description: "Serene and central, with the Siddhivinayak Temple at its heart and Worli steps away.", count: 1 },
  Colaba: { description: "Mumbai's most storied neighbourhood — heritage architecture, the Gateway of India, and discreet luxury.", count: 1 },
  "Malabar Hill": { description: "The city's most exclusive hilltop enclave, home to senior judiciary, diplomats, and Mumbai's founding families.", count: 1 },
  "Lower Parel": { description: "Mumbai's new business district — a transformation story with world-class luxury developments.", count: 2 },
  "Cuffe Parade": { description: "Mumbai's southernmost luxury peninsula — quiet, sea-flanked, and deeply prestigious.", count: 1 },
};

export const AMENITY_ICONS: Record<string, string> = {
  "Swimming Pool": "🏊",
  Gymnasium: "🏋️",
  Spa: "🧖",
  Concierge: "🛎️",
  "Valet Parking": "🚗",
  "Private Lift Lobby": "🛗",
  "24x7 Security": "🔒",
  Clubhouse: "🏛️",
  "Kids Play Area": "🎡",
  "Business Lounge": "💼",
  "Sea View Deck": "🌊",
  "Visitor Parking": "🅿️",
  "Banquet Area": "🎉",
  Library: "📚",
  Lounge: "🛋️",
  "Indoor Games": "🎯",
  "Outdoor Garden": "🌿",
};
