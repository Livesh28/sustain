import { Product, DataAdapter, AuditLog, AIModelConfig, UserProfile } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    title: 'BioTray Sugarcane Bagasse & Palm Leaf Meal Set 50-Pack',
    brand: 'EcoEarth India',
    category: 'Kitchen & Dining',
    price: 899,
    originalPrice: 1299,
    currency: '₹',
    rating: 4.9,
    reviewCount: 342,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
    ],
    description: '100% home compostable dining set made from upcycled agricultural sugarcane bagasse and fallen South Indian Areca palm leaves. Decomposes naturally in home soil in under 90 days with zero toxic residue.',
    specs: {
      Material: '100% Sugarcane Bagasse & Areca Palm Leaf',
      Quantity: '50 Meal Trays + 50 Bamboo Cutlery Sets',
      Decomposition: 'Home Compostable in 60-90 Days',
      MicrowaveSafe: 'Yes (Up to 120°C)',
      OilResistant: '100% Leakproof Water & Oil Guard'
    },
    materials: [
      { name: 'Upcycled Sugarcane Bagasse', type: 'bio-based', percentage: 70, recyclable: false, compostable: true, carbonFactorKgCo2PerKg: -0.8 },
      { name: 'Natural Areca Palm Leaf', type: 'bio-based', percentage: 30, recyclable: false, compostable: true, carbonFactorKgCo2PerKg: -1.2 }
    ],
    packaging: {
      type: 'zero_plastic',
      weightGrams: 80,
      plasticFree: true,
      biodegradableDays: 60,
      recyclabilityRatePercent: 100
    },
    durabilityYears: 2,
    repairabilityIndex: 10,
    certifications: [
      { id: 'c1', code: 'FAIRTRADE', name: 'CPCB Certified Compostable', issuer: 'Central Pollution Control Board India', verified: true, verificationId: 'CPCB-2026-9912', description: 'Certified 100% biodegradable and compostable under IS/ISO 17088.' },
      { id: 'c2', code: 'USDA_ORGANIC', name: 'BIS Food Contact IS 9845', issuer: 'Bureau of Indian Standards', verified: true, verificationId: 'BIS-IN-7712', description: '100% food-safe with zero chemical bleaching or PFAS.' }
    ],
    carbonFootprint: {
      rawMaterialsKg: -2.1,
      manufacturingKg: 0.8,
      logisticsKg: 0.4,
      usagePowerKg: 0.0,
      endOfLifeKg: -1.5,
      totalCO2eKg: -2.4,
      benchmarkAverageKg: 18.5,
      reductionPercentVsBenchmark: 112.9,
      treesEquivalentSaved: 2.4
    },
    sustainabilityScore: {
      overall: 99,
      materialsScore: 100,
      packagingScore: 100,
      energyScore: 96,
      durabilityScore: 92,
      repairabilityScore: 100,
      carbonScore: 100,
      certificationBonus: 20,
      grade: 'A+',
      breakdownSummary: 'Zero-plastic compostable tableware replacing single-use styrofoam and plastic catering waste.'
    },
    decisionScore: {
      overall: 97,
      priceScore: 96,
      qualityScore: 98,
      warrantyScore: 90,
      repairabilityScore: 100,
      energyScore: 98,
      sustainabilityScore: 99,
      userMatchPercent: 98,
      explainabilityNote: 'Top eco choice for home & catering waste reduction with certified 90-day soil decomposition.'
    },
    seller: {
      name: 'EcoEarth India Hub',
      verifiedEcoSeller: true,
      rating: 4.92,
      location: 'Coimbatore, Tamil Nadu'
    },
    inventory: 180,
    priceHistory: [
      { date: '2026-01-01', price: 1299 },
      { date: '2026-05-01', price: 899 }
    ],
    reviews: [
      { id: 'r1', author: 'Arjun Mehta', rating: 5, date: '2026-06-20', text: 'Used these for a family function of 100 people in Bengaluru. Completely leakproof for hot sambar and curry, and buried them in my garden compost afterwards!', sentiment: 'positive', ecoKeywords: ['compostable', 'bagasse', 'leakproof'], verifiedPurchase: true }
    ],
    reviewIntelligence: {
      sentimentSummary: 'Exceptional feedback for sturdiness, heat resistance, and clean soil composting.',
      sentimentDistribution: { positive: 98, neutral: 2, negative: 0 },
      pros: ['100% Home compostable in 60-90 days', 'CPCB & BIS food safety certified', 'Sturdy and leakproof for hot curries'],
      cons: ['Single-event disposable set'],
      frequentlyMentionedEcoTopics: ['Home Compostable', 'Sugarcane Bagasse', 'CPCB Certified'],
      overallEcoRating: 4.95
    },
    similarProductIds: ['prod-003', 'prod-005']
  },
  {
    id: 'prod-002',
    title: 'SolarFlow Portable 1000W Power Station & Solar Kit',
    brand: 'Solitude Green Energy',
    category: 'Solar & Energy',
    price: 49999,
    originalPrice: 64999,
    currency: '₹',
    rating: 4.9,
    reviewCount: 512,
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Off-grid 1024Wh LiFePO4 solar generator with 3500+ life cycles. Comes with high-efficiency 200W foldable monocrystalline solar panel made with recycled glass and aluminum frame.',
    specs: {
      Capacity: '1024Wh LiFePO4',
      SolarInput: '200W Monocrystalline Panel',
      Lifespan: '3500+ Cycles (10+ Years)',
      Outputs: '4x AC 230V 1000W, 2x USB-C 100W PD',
      Weight: '10.5 kg',
      Warranty: '5 Years Manufacturer Warranty'
    },
    materials: [
      { name: 'LiFePO4 LFP Battery', type: 'recycled', percentage: 45, recyclable: true, compostable: false, carbonFactorKgCo2PerKg: 3.5 },
      { name: 'Recycled Aluminum Housing', type: 'recycled', percentage: 35, recyclable: true, compostable: false, carbonFactorKgCo2PerKg: 1.5 },
      { name: 'Solar Grade Silicon & Glass', type: 'virgin', percentage: 20, recyclable: true, compostable: false, carbonFactorKgCo2PerKg: 4.0 }
    ],
    packaging: {
      type: 'recyclable_cardboard',
      weightGrams: 450,
      plasticFree: true,
      recyclabilityRatePercent: 98
    },
    durabilityYears: 12,
    repairabilityIndex: 8.8,
    powerConsumptionWatts: 0,
    energyRating: 'BEE 5-Star',
    certifications: [
      { id: 'c4', code: 'ENERGY_STAR', name: 'BEE Star Solar Certified', issuer: 'BEE India', verified: true, description: 'Certified high-efficiency solar storage.' },
      { id: 'c5', code: 'CRADLE_TO_CRADLE', name: 'BIS Safety Standard IS 16046', issuer: 'BIS India', verified: true, description: 'Safe, non-toxic battery chemistry.' }
    ],
    carbonFootprint: {
      rawMaterialsKg: 65.0,
      manufacturingKg: 42.0,
      logisticsKg: 12.0,
      usagePowerKg: -320.0,
      endOfLifeKg: -25.0,
      totalCO2eKg: -226.0,
      benchmarkAverageKg: 180.0,
      reductionPercentVsBenchmark: 225.5,
      treesEquivalentSaved: 18.5
    },
    sustainabilityScore: {
      overall: 98,
      materialsScore: 94,
      packagingScore: 96,
      energyScore: 100,
      durabilityScore: 98,
      repairabilityScore: 88,
      carbonScore: 100,
      certificationBonus: 18,
      grade: 'A+',
      breakdownSummary: 'Net carbon-negative energy solution offsetting over 320kg of grid CO2e in Indian homes & offices.'
    },
    decisionScore: {
      overall: 96,
      priceScore: 88,
      qualityScore: 98,
      warrantyScore: 95,
      repairabilityScore: 88,
      energyScore: 100,
      sustainabilityScore: 98,
      userMatchPercent: 98,
      explainabilityNote: 'Best long-term ROI with net-negative carbon footprint for home solar backup.'
    },
    seller: {
      name: 'Solitude Green Energy Ltd',
      verifiedEcoSeller: true,
      rating: 4.95,
      location: 'Hyderabad, Telangana'
    },
    inventory: 35,
    priceHistory: [
      { date: '2026-01-01', price: 64999 },
      { date: '2026-04-10', price: 54999 },
      { date: '2026-07-01', price: 49999 }
    ],
    reviews: [
      { id: 'r3', author: 'Rajesh Kumar', rating: 5, date: '2026-06-15', text: 'Off-grid setup generated over 120 kWh during my mountain trip in Himachal. Fully powered all laptop & camera gear!', sentiment: 'positive', ecoKeywords: ['off-grid', 'no emissions', 'solar'], verifiedPurchase: true }
    ],
    reviewIntelligence: {
      sentimentSummary: 'Highest customer satisfaction for carbon-offsetting solar technology and battery lifespan.',
      sentimentDistribution: { positive: 96, neutral: 3, negative: 1 },
      pros: ['Net carbon negative over 10-year lifespan', 'LiFePO4 high safety non-toxic chemistry', '5-Year Warranty'],
      cons: ['Unit weight is 10.5 kg'],
      frequentlyMentionedEcoTopics: ['Net Negative Carbon', 'Zero Grid Energy', 'Long Life Cycle'],
      overallEcoRating: 4.95
    },
    similarProductIds: ['prod-001', 'prod-008']
  },
  {
    id: 'prod-003',
    title: 'TerraThread Organic Cotton & Hemp Khadi Hoodie',
    brand: 'Khadi Eco Craft',
    category: 'Apparel',
    price: 2999,
    originalPrice: 3999,
    currency: '₹',
    rating: 4.7,
    reviewCount: 289,
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    description: '100% GOTS-certified organic cotton blended with hand-woven Indian khadi hemp. Dyed with non-toxic, closed-loop botanical indigo dyes in a Fairtrade certified Jaipur cooperative.',
    specs: {
      Composition: '70% GOTS Organic Cotton, 30% Indian Khadi Hemp',
      Dyeing: 'Natural Indigo & Botanical Plant Dyes',
      Cooperative: 'Khadi & Village Industries (KVIC) Certified',
      Care: 'Machine wash cold, air dry recommended',
      Origin: 'Jaipur, Rajasthan, India'
    },
    materials: [
      { name: 'GOTS Organic Cotton', type: 'organic', percentage: 70, recyclable: true, compostable: true, carbonFactorKgCo2PerKg: 1.1 },
      { name: 'Indian Industrial Hemp', type: 'bio-based', percentage: 30, recyclable: true, compostable: true, carbonFactorKgCo2PerKg: -0.8 }
    ],
    packaging: {
      type: 'biodegradable',
      weightGrams: 45,
      plasticFree: true,
      biodegradableDays: 60,
      recyclabilityRatePercent: 100
    },
    durabilityYears: 6,
    repairabilityIndex: 9.5,
    certifications: [
      { id: 'c6', code: 'GOTS', name: 'GOTS Organic Certified', issuer: 'GOTS International', verified: true, verificationId: 'GOTS-CU81920', description: 'Guarantees organic status from harvesting to ethical manufacturing.' },
      { id: 'c7', code: 'FAIRTRADE', name: 'KVIC Khadi Certified', issuer: 'Khadi & Village Industries Commission', verified: true, verificationId: 'KVIC-RJ-9012', description: 'Ensures artisan fair wages and rural community development.' },
      { id: 'c8', code: 'OEKO_TEX', name: 'India Organic NPOP', issuer: 'Ministry of Commerce India', verified: true, description: '100% free from harmful chemical fertilizers.' }
    ],
    carbonFootprint: {
      rawMaterialsKg: 2.1,
      manufacturingKg: 1.8,
      logisticsKg: 0.9,
      usagePowerKg: 0.4,
      endOfLifeKg: -0.8,
      totalCO2eKg: 4.4,
      benchmarkAverageKg: 18.2,
      reductionPercentVsBenchmark: 75.8,
      treesEquivalentSaved: 0.8
    },
    sustainabilityScore: {
      overall: 96,
      materialsScore: 98,
      packagingScore: 99,
      energyScore: 92,
      durabilityScore: 94,
      repairabilityScore: 98,
      carbonScore: 95,
      certificationBonus: 20,
      grade: 'A+',
      breakdownSummary: '100% biodegradable garment with triple ethical organic certifications.'
    },
    decisionScore: {
      overall: 93,
      priceScore: 90,
      qualityScore: 95,
      warrantyScore: 85,
      repairabilityScore: 98,
      energyScore: 92,
      sustainabilityScore: 96,
      userMatchPercent: 95,
      explainabilityNote: 'Zero microplastics, fully compostable at end of life, fair trade artisan made.'
    },
    seller: {
      name: 'Khadi & Organic Crafts Co',
      verifiedEcoSeller: true,
      rating: 4.88,
      location: 'Jaipur, Rajasthan'
    },
    inventory: 120,
    priceHistory: [
      { date: '2026-01-01', price: 3999 },
      { date: '2026-05-01', price: 2999 }
    ],
    reviews: [
      { id: 'r4', author: 'Ananya Roy', rating: 5, date: '2026-05-18', text: 'Incredibly soft khadi texture and durable stitching. Love that hemp actually improves soil quality while growing in Rajasthan!', sentiment: 'positive', ecoKeywords: ['khadi', 'hemp', 'organic'], verifiedPurchase: true }
    ],
    reviewIntelligence: {
      sentimentSummary: 'Customers appreciate the soft organic feel, zero plastic guilt, and ethical artisan credentials.',
      sentimentDistribution: { positive: 94, neutral: 5, negative: 1 },
      pros: ['Zero microplastic shedding', '100% Biodegradable & Compostable', 'Fairtrade artisan living wages'],
      cons: ['Air drying recommended'],
      frequentlyMentionedEcoTopics: ['Organic Cotton', 'Khadi Certified', 'Zero Microplastics'],
      overallEcoRating: 4.88
    },
    similarProductIds: ['prod-004', 'prod-006']
  },
  {
    id: 'prod-004',
    title: 'ErgoGreen Ergonomic Ocean Mesh Office Chair',
    brand: 'Fabrika Eco Furniture',
    category: 'Furniture',
    price: 18999,
    originalPrice: 24999,
    currency: '₹',
    rating: 4.6,
    reviewCount: 410,
    imageUrl: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'High-performance ergonomic task chair made with 100% ocean-bound plastic mesh woven from fishing nets collected along the Indian coastline.',
    specs: {
      Mesh: '100% Upcycled Indian Coastal Ocean Plastics',
      Frame: 'Recycled Cast Aluminum & Polypropylene',
      Ergonomics: '4D Adjustable Armrests, Synchro-Tilt',
      WeightCapacity: '135 kg',
      Warranty: '10 Years Frame Warranty'
    },
    materials: [
      { name: 'Upcycled Ocean Net Mesh', type: 'recycled', percentage: 55, recyclable: true, compostable: false, carbonFactorKgCo2PerKg: 1.2 },
      { name: 'Recycled Aluminum Base', type: 'recycled', percentage: 35, recyclable: true, compostable: false, carbonFactorKgCo2PerKg: 1.5 },
      { name: 'Bio-Polyurethane Foam', type: 'bio-based', percentage: 10, recyclable: true, compostable: false, carbonFactorKgCo2PerKg: 2.0 }
    ],
    packaging: {
      type: 'recyclable_cardboard',
      weightGrams: 350,
      plasticFree: true,
      recyclabilityRatePercent: 100
    },
    durabilityYears: 12,
    repairabilityIndex: 9.1,
    certifications: [
      { id: 'c9', code: 'B_CORP', name: 'GreenPro Certified (CII)', issuer: 'Confederation of Indian Industry', verified: true, description: 'Meets rigorous environmental metrics for green buildings.' },
      { id: 'c10', code: 'FAIRTRADE', name: 'BIS Ergonomic Standard IS 17631', issuer: 'BIS India', verified: true, description: 'Guarantees posture health and high durability.' }
    ],
    carbonFootprint: {
      rawMaterialsKg: 14.2,
      manufacturingKg: 8.6,
      logisticsKg: 2.5,
      usagePowerKg: 0.0,
      endOfLifeKg: -5.0,
      totalCO2eKg: 20.3,
      benchmarkAverageKg: 65.0,
      reductionPercentVsBenchmark: 68.8,
      treesEquivalentSaved: 2.1
    },
    sustainabilityScore: {
      overall: 93,
      materialsScore: 94,
      packagingScore: 96,
      energyScore: 90,
      durabilityScore: 98,
      repairabilityScore: 92,
      carbonScore: 94,
      certificationBonus: 15,
      grade: 'A+',
      breakdownSummary: 'High-durability ergonomic chair diverting ocean plastic waste into 12-year office furniture.'
    },
    decisionScore: {
      overall: 91,
      priceScore: 86,
      qualityScore: 95,
      warrantyScore: 98,
      repairabilityScore: 92,
      energyScore: 90,
      sustainabilityScore: 93,
      userMatchPercent: 94,
      explainabilityNote: 'Excellent lumbo-sacral support with 10-year warranty and upcycled ocean plastic mesh.'
    },
    seller: {
      name: 'Fabrika Eco Furniture',
      verifiedEcoSeller: true,
      rating: 4.85,
      location: 'Pune, Maharashtra'
    },
    inventory: 62,
    priceHistory: [
      { date: '2026-01-01', price: 24999 },
      { date: '2026-06-01', price: 18999 }
    ],
    reviews: [
      { id: 'r5', author: 'Vikramaditya S.', rating: 5, date: '2026-06-11', text: 'Transformed my WFH posture completely. Mesh is breathable during humid Indian summers!', sentiment: 'positive', ecoKeywords: ['ocean plastic', 'breathable mesh', 'ergonomic'], verifiedPurchase: true }
    ],
    reviewIntelligence: {
      sentimentSummary: 'Praised for lumbar ergonomics and ocean plastic recycling impact.',
      sentimentDistribution: { positive: 92, neutral: 6, negative: 2 },
      pros: ['Ocean plastic diverted from Indian oceans', 'Breathable mesh for hot climates', '10-Year Frame Warranty'],
      cons: ['Requires 15 min tool assembly'],
      frequentlyMentionedEcoTopics: ['Ocean Plastic Mesh', 'GreenPro Certified', '10 Year Warranty'],
      overallEcoRating: 4.85
    },
    similarProductIds: ['prod-008']
  },
  {
    id: 'prod-005',
    title: 'PureFlow Insulated Copper & Stainless Steel Bottle 1L',
    brand: 'PureEarth Crafts',
    category: 'Home & Kitchen',
    price: 1299,
    originalPrice: 1799,
    currency: '₹',
    rating: 4.8,
    reviewCount: 620,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Eliminates single-use plastic water bottles with a triple-wall food-grade 304 stainless steel & pure inner copper lining handcrafted by traditional Tamil Nadu metalsmiths.',
    specs: {
      Capacity: '1 Liter (1000 ml)',
      BodyMaterial: '304 Food-Grade Stainless Steel & 99.9% Pure Copper Lining',
      Insulation: '24 Hours Cold / 12 Hours Hot',
      PlasticReduction: 'Saves 1,800 Single-use plastic bottles / year',
      Origin: 'Coimbatore, Tamil Nadu, India'
    },
    materials: [
      { name: 'Stainless Steel 304 (Recycled)', type: 'recycled', percentage: 70, recyclable: true, compostable: false, carbonFactorKgCo2PerKg: 1.2 },
      { name: 'Pure Indian Copper Inner', type: 'virgin', percentage: 25, recyclable: true, compostable: false, carbonFactorKgCo2PerKg: 2.1 },
      { name: 'FSC Bamboo Cap', type: 'bio-based', percentage: 5, recyclable: false, compostable: true, carbonFactorKgCo2PerKg: -0.4 }
    ],
    packaging: {
      type: 'zero_plastic',
      weightGrams: 60,
      plasticFree: true,
      recyclabilityRatePercent: 100
    },
    durabilityYears: 15,
    repairabilityIndex: 9.8,
    certifications: [
      { id: 'c11', code: 'FSC', name: 'BIS Food Grade IS 17803', issuer: 'BIS India', verified: true, description: 'Certified 100% lead-free and non-toxic.' },
      { id: 'c12', code: 'BLUE_ANGEL', name: 'Zero Plastic Alliance India', issuer: 'Plastic Free India', verified: true, description: '100% plastic-free packaging and product design.' }
    ],
    carbonFootprint: {
      rawMaterialsKg: 1.2,
      manufacturingKg: 0.8,
      logisticsKg: 0.3,
      usagePowerKg: 0.0,
      endOfLifeKg: -0.9,
      totalCO2eKg: 1.4,
      benchmarkAverageKg: 45.0,
      reductionPercentVsBenchmark: 96.9,
      treesEquivalentSaved: 3.2
    },
    sustainabilityScore: {
      overall: 98,
      materialsScore: 98,
      packagingScore: 100,
      energyScore: 100,
      durabilityScore: 99,
      repairabilityScore: 99,
      carbonScore: 98,
      certificationBonus: 16,
      grade: 'A+',
      breakdownSummary: 'Plastic-free copper-lined flask preventing microplastic leaching and replacing thousands of plastic bottles.'
    },
    decisionScore: {
      overall: 96,
      priceScore: 95,
      qualityScore: 98,
      warrantyScore: 92,
      repairabilityScore: 99,
      energyScore: 100,
      sustainabilityScore: 98,
      userMatchPercent: 98,
      explainabilityNote: 'Traditional copper inner liner combined with modern vacuum insulation.'
    },
    seller: {
      name: 'PureEarth Crafts',
      verifiedEcoSeller: true,
      rating: 4.9,
      location: 'Coimbatore, Tamil Nadu'
    },
    inventory: 210,
    priceHistory: [
      { date: '2026-01-01', price: 1799 },
      { date: '2026-04-01', price: 1299 }
    ],
    reviews: [
      { id: 'r6', author: 'Divya Nair', rating: 5, date: '2026-06-25', text: 'Keeps water icy cold even in 42°C summer heat in Chennai. The copper lining gives a natural fresh mineral taste!', sentiment: 'positive', ecoKeywords: ['copper lining', 'cold insulation', 'no plastic'], verifiedPurchase: true }
    ],
    reviewIntelligence: {
      sentimentSummary: 'Extremely popular for zero plastic taste, copper wellness benefits, and 24-hour insulation.',
      sentimentDistribution: { positive: 96, neutral: 3, negative: 1 },
      pros: ['Zero plastic in contact with water', 'Ayurvedic copper inner lining', '24-hour thermal insulation'],
      cons: ['Hand wash copper liner gently'],
      frequentlyMentionedEcoTopics: ['Zero Plastic', 'Copper Lining', 'Thermal Insulation'],
      overallEcoRating: 4.92
    },
    similarProductIds: ['prod-006']
  },
  {
    id: 'prod-006',
    title: 'BioDental Neem Wood Toothbrush & Organic Charcoal Kit',
    brand: 'NatuCare Botanicals',
    category: 'Personal Care',
    price: 499,
    originalPrice: 799,
    currency: '₹',
    rating: 4.8,
    reviewCount: 310,
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Zero-plastic dental care kit featuring 4 natural medicinal Neem wood handles, BPA-free bio-based castor oil bristles, natural coconut charcoal tooth powder, and 100% compostable packaging.',
    specs: {
      Handle: '100% Wild Indian Neem Wood (Antimicrobial)',
      Bristles: 'Bio-based Castor Seed Oil Bristles (PFAS Free)',
      Decomposition: 'Compostable Handle in 180 Days',
      Includes: '4 Toothbrushes + 50g Coconut Charcoal Powder'
    },
    materials: [
      { name: 'Antimicrobial Indian Neem Wood', type: 'bio-based', percentage: 85, recyclable: false, compostable: true, carbonFactorKgCo2PerKg: -0.9 },
      { name: 'Castor Seed Bio-Bristles', type: 'bio-based', percentage: 15, recyclable: false, compostable: true, carbonFactorKgCo2PerKg: -0.2 }
    ],
    packaging: {
      type: 'zero_plastic',
      weightGrams: 30,
      plasticFree: true,
      biodegradableDays: 45,
      recyclabilityRatePercent: 100
    },
    durabilityYears: 1,
    repairabilityIndex: 10,
    certifications: [
      { id: 'c13', code: 'USDA_ORGANIC', name: 'AYUSH Certified Herbal Product', issuer: 'Ministry of AYUSH India', verified: true, description: '100% natural Ayurvedic oral health care.' },
      { id: 'c14', code: 'FAIRTRADE', name: 'NPOP Organic India Certified', issuer: 'APEDA India', verified: true, description: 'Wildcrafted sustainable neem harvest.' }
    ],
    carbonFootprint: {
      rawMaterialsKg: -0.8,
      manufacturingKg: 0.2,
      logisticsKg: 0.1,
      usagePowerKg: 0.0,
      endOfLifeKg: -0.4,
      totalCO2eKg: -0.9,
      benchmarkAverageKg: 6.5,
      reductionPercentVsBenchmark: 113.8,
      treesEquivalentSaved: 0.9
    },
    sustainabilityScore: {
      overall: 98,
      materialsScore: 99,
      packagingScore: 100,
      energyScore: 96,
      durabilityScore: 90,
      repairabilityScore: 100,
      carbonScore: 99,
      certificationBonus: 18,
      grade: 'A+',
      breakdownSummary: 'Plastic-free Ayurvedic oral care preventing plastic toothbrush landfill pollution.'
    },
    decisionScore: {
      overall: 96,
      priceScore: 98,
      qualityScore: 96,
      warrantyScore: 88,
      repairabilityScore: 100,
      energyScore: 98,
      sustainabilityScore: 98,
      userMatchPercent: 97,
      explainabilityNote: 'Zero plastic waste oral hygiene with natural antibacterial Neem wood.'
    },
    seller: {
      name: 'NatuCare Botanicals Kerala',
      verifiedEcoSeller: true,
      rating: 4.88,
      location: 'Kochi, Kerala'
    },
    inventory: 240,
    priceHistory: [
      { date: '2026-01-01', price: 799 },
      { date: '2026-05-01', price: 499 }
    ],
    reviews: [
      { id: 'r7', author: 'Kavita Reddy', rating: 5, date: '2026-07-01', text: 'Smooth neem wood feel and bristles are soft on gums. Great knowing I won’t throw another plastic toothbrush into the ocean!', sentiment: 'positive', ecoKeywords: ['neem wood', 'plastic free', 'castor bristles'], verifiedPurchase: true }
    ],
    reviewIntelligence: {
      sentimentSummary: 'Praised for soft castor bristles, natural neem taste, and 100% zero plastic packaging.',
      sentimentDistribution: { positive: 96, neutral: 3, negative: 1 },
      pros: ['Antimicrobial wild neem wood', 'Zero plastic packaging', 'AYUSH certified Ayurvedic safety'],
      cons: ['Keep handle dry in bathroom tray'],
      frequentlyMentionedEcoTopics: ['Neem Wood', 'Zero Plastic Oral Care', 'AYUSH Certified'],
      overallEcoRating: 4.88
    },
    similarProductIds: ['prod-001', 'prod-005']
  },
  {
    id: 'prod-007',
    title: 'BioStation Seed Paper Plantable Notebook & Bamboo Pen Set',
    brand: 'GreenPaper Craft',
    category: 'Office & Stationery',
    price: 399,
    originalPrice: 599,
    currency: '₹',
    rating: 4.9,
    reviewCount: 380,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Zero-waste eco notebook embedded with native Indian wildflower and tulsi seeds in handmade cotton rag paper. Comes with 2 refillable FSC bamboo ballpoint pens with non-toxic soy ink.',
    specs: {
      Paper: '100% Handmade Recycled Cotton Rag (Zero Tree Pulp)',
      Seeds: 'Tulsi, Marigold, and Tomato Seed Embedment',
      Pages: '120 Unruled Acid-Free Eco Pages',
      Pens: '2 FSC Assam Bamboo Refillable Pens with Soy Ink'
    },
    materials: [
      { name: 'Upcycled Cotton Rag Seed Paper', type: 'recycled', percentage: 80, recyclable: false, compostable: true, carbonFactorKgCo2PerKg: -1.1 },
      { name: 'FSC Assam Bamboo Pen Shell', type: 'bio-based', percentage: 20, recyclable: false, compostable: true, carbonFactorKgCo2PerKg: -0.5 }
    ],
    packaging: {
      type: 'zero_plastic',
      weightGrams: 40,
      plasticFree: true,
      biodegradableDays: 30,
      recyclabilityRatePercent: 100
    },
    durabilityYears: 3,
    repairabilityIndex: 10,
    certifications: [
      { id: 'c15', code: 'FSC', name: 'Khadi Handmade Paper Certified', issuer: 'KVIC India', verified: true, description: '100% tree-free recycled cotton pulp.' },
      { id: 'c16', code: 'USDA_ORGANIC', name: 'NPOP Organic Seed Standard', issuer: 'APEDA India', verified: true, description: 'Non-GMO native Indian seeds guaranteed to germinate.' }
    ],
    carbonFootprint: {
      rawMaterialsKg: -1.2,
      manufacturingKg: 0.3,
      logisticsKg: 0.2,
      usagePowerKg: 0.0,
      endOfLifeKg: -0.8,
      totalCO2eKg: -1.5,
      benchmarkAverageKg: 8.0,
      reductionPercentVsBenchmark: 118.7,
      treesEquivalentSaved: 1.2
    },
    sustainabilityScore: {
      overall: 99,
      materialsScore: 100,
      packagingScore: 100,
      energyScore: 98,
      durabilityScore: 92,
      repairabilityScore: 100,
      carbonScore: 100,
      certificationBonus: 20,
      grade: 'A+',
      breakdownSummary: 'Zero-tree plantable notebook growing into Tulsi plants after note-taking completion.'
    },
    decisionScore: {
      overall: 98,
      priceScore: 99,
      qualityScore: 97,
      warrantyScore: 90,
      repairabilityScore: 100,
      energyScore: 98,
      sustainabilityScore: 99,
      userMatchPercent: 99,
      explainabilityNote: 'Plant the used notebook cover in soil to grow fresh tulsi and marigold flowers.'
    },
    seller: {
      name: 'GreenPaper Craft Jaipur',
      verifiedEcoSeller: true,
      rating: 4.93,
      location: 'Jaipur, Rajasthan'
    },
    inventory: 300,
    priceHistory: [
      { date: '2026-01-01', price: 599 },
      { date: '2026-06-15', price: 399 }
    ],
    reviews: [
      { id: 'r8', author: 'Sanjay Verma', rating: 5, date: '2026-06-29', text: 'Planted my old notebook cover in a pot last month and now have healthy tulsi saplings sprouting! Ink doesn’t bleed through at all.', sentiment: 'positive', ecoKeywords: ['plantable', 'tulsi seeds', 'cotton paper'], verifiedPurchase: true }
    ],
    reviewIntelligence: {
      sentimentSummary: 'Delighted reviews for tulsi seed germination, zero bleed paper texture, and bamboo pens.',
      sentimentDistribution: { positive: 97, neutral: 3, negative: 0 },
      pros: ['Grows into Tulsi plants when buried', '100% Tree-free cotton paper', 'Refillable bamboo pens'],
      cons: ['Handmade texture has slight organic variation'],
      frequentlyMentionedEcoTopics: ['Tulsi Seeds', 'Tree-Free Paper', 'Bamboo Pens'],
      overallEcoRating: 4.93
    },
    similarProductIds: ['prod-001', 'prod-003']
  },
  {
    id: 'prod-008',
    title: 'EcoFurn Reclaimed Sheesham Wood Ergonomic Office Desk',
    brand: 'EcoFurn Heritage Artisans',
    category: 'Furniture',
    price: 34999,
    originalPrice: 42999,
    currency: '₹',
    rating: 4.9,
    reviewCount: 195,
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handcrafted standing/sitting hybrid desk constructed from 100% upcycled reclaimed Indian Sheesham timber with organic beeswax finish and zero-VOC waterborne glues.',
    specs: {
      Wood: '100% Reclaimed Sheesham Wood (FSC Recycled)',
      Finish: 'Non-toxic organic beeswax & mustard oil finish',
      Frame: 'Recycled steel with silent dual-motor lift',
      WeightCapacity: '120 kg',
      Warranty: '10 Years Frame, 5 Years Motor'
    },
    materials: [
      { name: 'Reclaimed Sheesham Wood', type: 'recycled', percentage: 75, recyclable: true, compostable: true, carbonFactorKgCo2PerKg: -1.8 },
      { name: 'Recycled Structural Steel', type: 'recycled', percentage: 25, recyclable: true, compostable: false, carbonFactorKgCo2PerKg: 1.2 }
    ],
    packaging: {
      type: 'zero_plastic',
      weightGrams: 850,
      plasticFree: true,
      recyclabilityRatePercent: 100
    },
    durabilityYears: 20,
    repairabilityIndex: 9.0,
    powerConsumptionWatts: 1,
    energyRating: 'BEE 5-Star',
    certifications: [
      { id: 'c17', code: 'FSC', name: 'FSC 100% Recycled Wood', issuer: 'FSC India', verified: true, description: '100% reclaimed timber prevents Indian deforestation.' },
      { id: 'c18', code: 'CRADLE_TO_CRADLE', name: 'GreenPro Furniture Certified', issuer: 'CII India', verified: true, description: 'Zero toxic off-gassing and fully circular.' }
    ],
    carbonFootprint: {
      rawMaterialsKg: -45.0,
      manufacturingKg: 15.0,
      logisticsKg: 18.0,
      usagePowerKg: 1.5,
      endOfLifeKg: -10.0,
      totalCO2eKg: -20.5,
      benchmarkAverageKg: 120.0,
      reductionPercentVsBenchmark: 117.0,
      treesEquivalentSaved: 12.0
    },
    sustainabilityScore: {
      overall: 97,
      materialsScore: 99,
      packagingScore: 98,
      energyScore: 96,
      durabilityScore: 100,
      repairabilityScore: 90,
      carbonScore: 99,
      certificationBonus: 18,
      grade: 'A+',
      breakdownSummary: 'Carbon-negative desk sequesters forest carbon in durable 20-year Indian Sheesham wood furniture.'
    },
    decisionScore: {
      overall: 95,
      priceScore: 86,
      qualityScore: 99,
      warrantyScore: 96,
      repairabilityScore: 90,
      energyScore: 96,
      sustainabilityScore: 97,
      userMatchPercent: 97,
      explainabilityNote: 'Zero-VOC finish ensures healthy indoor air quality with 20+ year heirloom durability.'
    },
    seller: {
      name: 'EcoFurn Heritage Artisans',
      verifiedEcoSeller: true,
      rating: 4.95,
      location: 'Jodhpur, Rajasthan'
    },
    inventory: 18,
    priceHistory: [
      { date: '2026-01-01', price: 42999 },
      { date: '2026-05-01', price: 34999 }
    ],
    reviews: [
      { id: 'r9', author: 'Sneha Patel', rating: 5, date: '2026-07-05', text: 'The natural Sheesham grain is breathtaking and knowing no fresh trees were felled gives me total peace of mind in my home office.', sentiment: 'positive', ecoKeywords: ['reclaimed wood', 'no VOC', 'stunning wood'], verifiedPurchase: true }
    ],
    reviewIntelligence: {
      sentimentSummary: 'Adored for natural Sheesham grain, sturdy lift mechanism, and zero VOC smell.',
      sentimentDistribution: { positive: 96, neutral: 3, negative: 1 },
      pros: ['Carbon negative reclaimed Sheesham timber', 'Zero VOC non-toxic finish', '10-Year Frame Warranty'],
      cons: ['Heavy solid wood top requires two people to assemble'],
      frequentlyMentionedEcoTopics: ['Reclaimed Sheesham', 'Zero Offgassing', 'Solid Quality'],
      overallEcoRating: 4.95
    },
    similarProductIds: ['prod-002', 'prod-001']
  }
];

export const INITIAL_DATA_ADAPTERS: DataAdapter[] = [
  { id: 'ad-01', sourceName: 'Amazon India (amazon.in)', status: 'active', lastSyncTime: '2026-07-26 18:00', itemsProcessed: 1420, errorCount: 0, autoSyncIntervalMinutes: 60, endpointUrl: 'https://api.amazon.in/sustainability/v1' },
  { id: 'ad-02', sourceName: 'Flipkart Green Seller Hub', status: 'active', lastSyncTime: '2026-07-26 17:30', itemsProcessed: 980, errorCount: 0, autoSyncIntervalMinutes: 120, endpointUrl: 'https://api.flipkart.com/affiliate/sustainability' },
  { id: 'ad-03', sourceName: 'Myntra Eco-Grounded Direct', status: 'idle', lastSyncTime: '2026-07-25 18:00', itemsProcessed: 650, errorCount: 0, autoSyncIntervalMinutes: 360, endpointUrl: 'https://api.myntra.com/apparel/eco' },
  { id: 'ad-04', sourceName: 'Tata CLiQ Sustainable API', status: 'active', lastSyncTime: '2026-07-26 16:45', itemsProcessed: 430, errorCount: 0, autoSyncIntervalMinutes: 180, endpointUrl: 'https://api.tatacliq.com/v2/products/energy-ratings' },
  { id: 'ad-05', sourceName: 'SEBI BRSR Compliance CSV Ingest', status: 'idle', lastSyncTime: '2026-07-24 14:15', itemsProcessed: 1200, errorCount: 0, autoSyncIntervalMinutes: 0 },
  { id: 'ad-06', sourceName: 'CPCB EPR Live Webhook Pipeline', status: 'active', lastSyncTime: '2026-07-26 18:15', itemsProcessed: 3200, errorCount: 0, autoSyncIntervalMinutes: 15, endpointUrl: '/api/v1/webhooks/cpcb-epr' }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 'log-101', timestamp: '2026-07-26 18:05:10', user: 'Admin System', role: 'admin', action: 'REINDEX_VECTOR_DB', module: 'FAISS Vector Search', details: 'Updated embedding space with 8 Indian eco products. FAISS indexing latency 3ms.', status: 'success' },
  { id: 'log-102', timestamp: '2026-07-26 17:40:00', user: 'GreenTech Hub Bengaluru', role: 'green_brand', action: 'UPDATE_CERTIFICATION', module: 'Certification Engine', details: 'Uploaded valid BIS & BEE 5-Star proof for prod-001', status: 'success' },
  { id: 'log-103', timestamp: '2026-07-26 17:15:22', user: 'Pipeline Worker', role: 'admin', action: 'FETCH_API_FEED', module: 'Data Pipeline', details: 'Synced Flipkart Green Seller Hub feed: 980 items processed.', status: 'success' },
  { id: 'log-104', timestamp: '2026-07-26 16:50:00', user: 'Gemini XAI Service', role: 'admin', action: 'GENERATE_EXPLANATION', module: 'Explainable AI', details: 'Generated 96% match explanation for Indian climate & energy efficiency query.', status: 'success' }
];

export const DEFAULT_MODEL_CONFIG: AIModelConfig = {
  productSimilarityWeight: 0.35,
  sustainabilityScoreWeight: 0.40,
  decisionScoreWeight: 0.25,
  carbonPenaltyFactor: 1.5,
  reviewSentimentWeight: 0.20,
  vectorSimilarityThreshold: 0.75,
  geminiModelAlias: 'gemini-3.6-flash',
  lastTrainedDate: '2026-07-26'
};

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'usr-901',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@eco-intelligence.in',
  role: 'customer',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  companyName: 'Sustainable Tech India Ltd',
  ecoPreferences: {
    materialWeight: 80,
    packagingWeight: 90,
    energyWeight: 85,
    durabilityWeight: 75,
    carbonWeight: 95,
    certificationWeight: 80,
    prioritizePlasticFree: true,
    prioritizeLocalSourcing: true,
    maxCarbonBudgetKg: 100
  },
  wishlistProductIds: ['prod-001', 'prod-002', 'prod-007'],
  purchaseHistory: [
    { id: 'ord-101', productId: 'prod-005', productTitle: 'PureFlow Insulated Copper & Stainless Steel Bottle 1L', date: '2026-05-12', price: 1299, carbonSavedKg: 80.4 },
    { id: 'ord-102', productId: 'prod-003', productTitle: 'TerraThread Organic Cotton & Hemp Khadi Hoodie', date: '2026-06-04', price: 2999, carbonSavedKg: 14.2 }
  ],
  carbonSavedTotalKg: 94.6,
  rewardPoints: 1850,
  badges: [
    { id: 'b1', name: 'Plastic Pioneer India', description: 'Saved over 1,500 single-use plastic bottles in India', dateUnlocked: '2026-05-15' },
    { id: 'b2', name: 'CPCB Carbon Champion', description: 'Avoided 90+ kg CO2e in eco product purchases', dateUnlocked: '2026-06-10' }
  ]
};
