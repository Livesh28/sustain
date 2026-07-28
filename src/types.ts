/**
 * Leviathan Sustainability Intelligence Platform - Core Types
 */

export type UserRole = 'customer' | 'retailer' | 'green_brand' | 'procurement' | 'admin';

export interface EcoPreferences {
  materialWeight: number; // 0 - 100
  packagingWeight: number;
  energyWeight: number;
  durabilityWeight: number;
  carbonWeight: number;
  certificationWeight: number;
  prioritizePlasticFree: boolean;
  prioritizeLocalSourcing: boolean;
  maxCarbonBudgetKg?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  companyName?: string;
  ecoPreferences: EcoPreferences;
  wishlistProductIds: string[];
  purchaseHistory: Array<{
    id: string;
    productId: string;
    productTitle: string;
    date: string;
    price: number;
    carbonSavedKg: number;
  }>;
  carbonSavedTotalKg: number;
  rewardPoints: number;
  badges: Array<{ id: string; name: string; description: string; dateUnlocked: string }>;
}

export type GreenwashingRiskLevel = 'Low' | 'Medium' | 'High';

export interface GreenwashingAnalysis {
  riskLevel: GreenwashingRiskLevel;
  confidenceScore: number; // 0 - 100
  greenwashingScore: number; // 0 - 100 (100 = completely honest & verified)
  unsupportedClaims: string[];
  verifiedClaims: string[];
  assessmentSummary: string;
}

export interface BiodegradabilityProfile {
  biodegradabilityScore: number; // 0 - 100
  biodegradablePercent: number; // 0 - 100
  naturalFiberPercent: number; // 0 - 100
  syntheticPlasticPercent: number; // 0 - 100
  compostable: boolean;
  homeCompostable: boolean;
  industrialCompostable: boolean;
  estimatedDecompositionDays: number;
  decompositionEnvironment: 'Soil / Home Compost' | 'Industrial Facility' | 'Marine Waters' | 'Non-biodegradable (Landfill)';
  microplasticsRisk: 'None' | 'Low' | 'High';
}

export type CertificationCode = 
  | 'ENERGY_STAR' 
  | 'FSC' 
  | 'GOTS' 
  | 'EPEAT_GOLD' 
  | 'FAIRTRADE' 
  | 'CRADLE_TO_CRADLE' 
  | 'BLUE_ANGEL' 
  | 'OEKO_TEX' 
  | 'B_CORP'
  | 'USDA_ORGANIC';

export interface Certification {
  id: string;
  code: CertificationCode;
  name: string;
  issuer: string;
  level?: string;
  verified: boolean;
  verificationId?: string;
  validUntil?: string;
  description: string;
  logoUrl?: string;
  badgeColor?: string;
}

export interface Material {
  name: string;
  type: 'organic' | 'recycled' | 'bio-based' | 'synthetic' | 'virgin' | 'metal' | 'glass';
  percentage: number; // 0 - 100
  recyclable: boolean;
  compostable: boolean;
  carbonFactorKgCo2PerKg: number;
}

export interface Packaging {
  type: 'zero_plastic' | 'biodegradable' | 'recyclable_cardboard' | 'recycled_plastic' | 'conventional_plastic';
  weightGrams: number;
  plasticFree: boolean;
  biodegradableDays?: number;
  recyclabilityRatePercent: number;
}

export interface CarbonFootprint {
  rawMaterialsKg: number;
  manufacturingKg: number;
  logisticsKg: number;
  usagePowerKg: number;
  endOfLifeKg: number;
  totalCO2eKg: number;
  benchmarkAverageKg: number;
  reductionPercentVsBenchmark: number;
  treesEquivalentSaved: number;
}

export type SustainabilityGrade = 'A+' | 'A' | 'B' | 'C' | 'D';

export interface SustainabilityScore {
  overall: number; // 0 - 100
  materialsScore: number;
  packagingScore: number;
  energyScore: number;
  durabilityScore: number;
  repairabilityScore: number;
  carbonScore: number;
  certificationBonus: number;
  grade: SustainabilityGrade;
  breakdownSummary: string;
}

export interface DecisionScore {
  overall: number; // 0 - 100
  priceScore: number;
  qualityScore: number;
  warrantyScore: number;
  repairabilityScore: number;
  energyScore: number;
  sustainabilityScore: number;
  userMatchPercent: number;
  explainabilityNote: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  ecoKeywords: string[];
  verifiedPurchase: boolean;
}

export interface ReviewIntelligence {
  sentimentSummary: string;
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  pros: string[];
  cons: string[];
  frequentlyMentionedEcoTopics: string[];
  overallEcoRating: number; // 1 - 5
}

export interface PricePoint {
  date: string;
  price: number;
}

export type ProductCategory = 
  | 'Kitchen & Dining'
  | 'Packaging'
  | 'Grocery & Daily Essentials'
  | 'Personal Care'
  | 'Home & Cleaning'
  | 'Office & Stationery'
  | 'Fashion & Accessories'
  | 'Gardening'
  | 'Household Products'
  | 'Apparel'
  | 'Home & Kitchen'
  | 'Solar & Energy'
  | 'Furniture';

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  currency: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  materials: Material[];
  packaging: Packaging;
  durabilityYears: number;
  repairabilityIndex: number; // 1 - 10
  powerConsumptionWatts?: number;
  energyRating?: 'BEE 5-Star' | 'BEE 4-Star' | 'BEE 3-Star' | '5 Star' | '4 Star' | '3 Star' | 'A+++' | 'A++' | 'A' | 'N/A';
  certifications: Certification[];
  carbonFootprint: CarbonFootprint;
  sustainabilityScore: SustainabilityScore;
  decisionScore: DecisionScore;
  seller: {
    name: string;
    verifiedEcoSeller: boolean;
    rating: number;
    location: string;
  };
  inventory: number;
  priceHistory: PricePoint[];
  embeddingVector?: number[];
  reviews: Review[];
  reviewIntelligence: ReviewIntelligence;
  similarProductIds?: string[];
  greenwashingAnalysis?: GreenwashingAnalysis;
  biodegradabilityProfile?: BiodegradabilityProfile;
}

export interface ExplainableRecommendation {
  productId: string;
  productTitle: string;
  matchScore: number; // 0 - 100
  whyRecommended: string[];
  whyNotRecommended: string[]; // Tradeoffs
  sustainabilityAdvantages: string[];
  environmentalImpact: {
    carbonSavedKgYear: number;
    plasticAvoidedGrams: number;
    energySavedKwhYear: number;
    waterSavedLitersYear: number;
  };
  longTermValue: string;
  confidenceScore: number; // 0 - 100
}

export interface FilterOptions {
  searchQuery: string;
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  minSustainabilityScore: number;
  maxCarbonKg: number;
  certifications: string[];
  materialTypes: string[];
  minRepairability: number;
  minDurability: number;
  onlyPlasticFree: boolean;
  sortBy: 'sustainability_desc' | 'decision_score' | 'carbon_asc' | 'price_asc' | 'price_desc' | 'rating_desc';
}

export type PipelineSource = 
  | 'Amazon India (amazon.in)' 
  | 'Flipkart Green Seller Hub' 
  | 'Myntra Eco-Grounded Direct' 
  | 'Tata CLiQ Sustainable API' 
  | 'SEBI BRSR Compliance CSV Ingest' 
  | 'CPCB EPR Live Webhook Pipeline'
  | 'Amazon' 
  | 'Flipkart' 
  | 'Myntra' 
  | 'Ajio' 
  | 'Croma' 
  | 'Reliance Digital' 
  | 'CSV' 
  | 'JSON' 
  | 'REST API';

export interface DataAdapter {
  id: string;
  sourceName: PipelineSource;
  status: 'active' | 'syncing' | 'idle' | 'error';
  lastSyncTime: string;
  itemsProcessed: number;
  errorCount: number;
  endpointUrl?: string;
  autoSyncIntervalMinutes: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  module: string;
  details: string;
  status: 'success' | 'warning' | 'error';
}

export interface AIModelConfig {
  productSimilarityWeight: number;
  sustainabilityScoreWeight: number;
  decisionScoreWeight: number;
  carbonPenaltyFactor: number;
  reviewSentimentWeight: number;
  vectorSimilarityThreshold: number;
  geminiModelAlias: string;
  lastTrainedDate: string;
}
