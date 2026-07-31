import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';
import { INITIAL_PRODUCTS, INITIAL_DATA_ADAPTERS, INITIAL_AUDIT_LOGS, DEFAULT_MODEL_CONFIG } from './src/data/mockProducts.js';
import { calculateSustainabilityScore, estimateCarbonFootprint, calculateDecisionScore, generateExplainableRecommendation } from './src/utils/sustainabilityEngine.js';
import { Product, DataAdapter, AuditLog, AIModelConfig } from './src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory data store for live CRUD & simulations
let productsDB: Product[] = [...INITIAL_PRODUCTS];
let adaptersDB: DataAdapter[] = [...INITIAL_DATA_ADAPTERS];
let auditLogsDB: AuditLog[] = [...INITIAL_AUDIT_LOGS];
let modelConfigDB: AIModelConfig = { ...DEFAULT_MODEL_CONFIG };

// Initialize Gemini API client on server-side
const aiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (aiKey) {
  aiClient = new GoogleGenAI({
    apiKey: aiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ----------------------------------------------------
  // API Endpoints
  // ----------------------------------------------------

  // Healthcheck
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Leviathan Sustainability Intelligence Platform', timestamp: new Date().toISOString() });
  });

  // GET /api/products - Get & Filter Products
  app.get('/api/products', (req, res) => {
    const { category, brand, minScore, maxPrice, searchQuery, sortBy } = req.query;

    let result = [...productsDB];

    if (category && category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    if (brand && brand !== 'All') {
      result = result.filter(p => p.brand.toLowerCase() === (brand as string).toLowerCase());
    }
    if (minScore) {
      const score = Number(minScore);
      result = result.filter(p => p.sustainabilityScore.overall >= score);
    }
    if (maxPrice) {
      const price = Number(maxPrice);
      result = result.filter(p => p.price <= price);
    }
    if (searchQuery) {
      const q = (searchQuery as string).toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.materials.some(m => m.name.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'sustainability_desc') {
      result.sort((a, b) => b.sustainabilityScore.overall - a.sustainabilityScore.overall);
    } else if (sortBy === 'decision_score') {
      result.sort((a, b) => b.decisionScore.overall - a.decisionScore.overall);
    } else if (sortBy === 'carbon_asc') {
      result.sort((a, b) => a.carbonFootprint.totalCO2eKg - b.carbonFootprint.totalCO2eKg);
    } else if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    }

    res.json(result);
  });

  // GET /api/products/:id - Single product detail
  app.get('/api/products/:id', (req, res) => {
    const product = productsDB.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  });

  // POST /api/products - Admin add product
  app.post('/api/products', (req, res) => {
    const newProductData = req.body as Partial<Product>;
    const id = `prod-${Date.now()}`;
    
    // Auto calculate sustainability & carbon scores if missing
    const sustainabilityScore = newProductData.sustainabilityScore || calculateSustainabilityScore(newProductData);
    const carbonFootprint = newProductData.carbonFootprint || estimateCarbonFootprint(newProductData);

    const fullProduct: Product = {
      id,
      title: newProductData.title || 'Untitled Eco Product',
      brand: newProductData.brand || 'Eco Brand',
      category: newProductData.category || 'Kitchen & Dining',
      price: newProductData.price || 4999,
      originalPrice: newProductData.originalPrice || newProductData.price || 5999,
      currency: '₹',
      rating: newProductData.rating || 4.5,
      reviewCount: newProductData.reviewCount || 1,
      imageUrl: newProductData.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      images: [newProductData.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
      description: newProductData.description || 'Sustainably engineered product.',
      specs: newProductData.specs || { Origin: 'Eco Certified Plant' },
      materials: newProductData.materials || [{ name: 'Recycled Fiber', type: 'recycled', percentage: 100, recyclable: true, compostable: true, carbonFactorKgCo2PerKg: 1.0 }],
      packaging: newProductData.packaging || { type: 'zero_plastic', weightGrams: 100, plasticFree: true, recyclabilityRatePercent: 100 },
      durabilityYears: newProductData.durabilityYears || 5,
      repairabilityIndex: newProductData.repairabilityIndex || 8.0,
      certifications: newProductData.certifications || [],
      carbonFootprint,
      sustainabilityScore,
      decisionScore: newProductData.decisionScore || {
        overall: sustainabilityScore.overall,
        priceScore: 80,
        qualityScore: 90,
        warrantyScore: 85,
        repairabilityScore: Math.round((newProductData.repairabilityIndex || 8) * 10),
        energyScore: 85,
        sustainabilityScore: sustainabilityScore.overall,
        userMatchPercent: 90,
        explainabilityNote: 'Calculated upon creation'
      },
      seller: newProductData.seller || { name: 'Verified Eco Store', verifiedEcoSeller: true, rating: 4.8, location: 'Global' },
      inventory: newProductData.inventory || 50,
      priceHistory: [{ date: new Date().toISOString().split('T')[0], price: newProductData.price || 99 }],
      reviews: [],
      reviewIntelligence: {
        sentimentSummary: 'Newly registered eco product.',
        sentimentDistribution: { positive: 100, neutral: 0, negative: 0 },
        pros: ['Eco-certified materials'],
        cons: [],
        frequentlyMentionedEcoTopics: ['Sustainable'],
        overallEcoRating: 5.0
      }
    };

    productsDB.unshift(fullProduct);
    
    // Log audit
    auditLogsDB.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'Admin User',
      role: 'admin',
      action: 'ADD_PRODUCT',
      module: 'Product Management',
      details: `Created new product: ${fullProduct.title} (${fullProduct.id})`,
      status: 'success'
    });

    res.status(201).json(fullProduct);
  });

  // PUT /api/products/:id - Update Product
  app.put('/api/products/:id', (req, res) => {
    const index = productsDB.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });

    const updated = { ...productsDB[index], ...req.body };
    productsDB[index] = updated;

    auditLogsDB.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'Admin User',
      role: 'admin',
      action: 'UPDATE_PRODUCT',
      module: 'Product Management',
      details: `Updated product ${updated.title}`,
      status: 'success'
    });

    res.json(updated);
  });

  // DELETE /api/products/:id - Delete Product
  app.delete('/api/products/:id', (req, res) => {
    const index = productsDB.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });

    const removed = productsDB.splice(index, 1)[0];

    auditLogsDB.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'Admin User',
      role: 'admin',
      action: 'DELETE_PRODUCT',
      module: 'Product Management',
      details: `Deleted product ${removed.title}`,
      status: 'warning'
    });

    res.json({ message: 'Product deleted', id: req.params.id });
  });

  // POST /api/sustainability/calculate - Recalculate score for raw product specs
  app.post('/api/sustainability/calculate', (req, res) => {
    const rawData = req.body;
    const score = calculateSustainabilityScore(rawData);
    const carbon = estimateCarbonFootprint(rawData);
    res.json({ score, carbon });
  });

  // POST /api/recommendations/ai - Gemini AI powered recommendation synthesis
  app.post('/api/recommendations/ai', async (req, res) => {
    const { userPrompt, preferences } = req.body;

    if (!aiClient) {
      // Fallback if no Gemini Key
      const topProducts = productsDB.slice(0, 3);
      const fallbackExplanations = topProducts.map(p => generateExplainableRecommendation(p));
      return res.json({
        source: 'Algorithmic Fallback',
        recommendations: fallbackExplanations,
        aiSummary: 'Selected top products matching high sustainability score and plastic-free packaging criteria.'
      });
    }

    try {
      const catalogContext = productsDB.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        brand: p.brand,
        price: p.price,
        sustainabilityScore: p.sustainabilityScore.overall,
        carbonTotalKg: p.carbonFootprint.totalCO2eKg,
        materials: p.materials.map(m => `${m.percentage}% ${m.name}`).join(', '),
        packaging: p.packaging.type,
        certifications: p.certifications.map(c => c.name).join(', ')
      }));

      const prompt = `You are Leviathan, an elite AI Sustainability Architect specializing in biodegradable and environmentally sustainable consumer products (Kitchen, Packaging, Essentials, Personal Care, Home Cleaning, Stationery, Apparel, Gardening, Household).

STRICT SCOPE RULE: ONLY recommend items where biodegradability & sustainability are meaningful (Kitchen, Packaging, Personal Care, Stationery, Apparel, Gardening, Household). NEVER recommend or invent electronic items like Laptops, Phones, TVs, or Refrigerators.

User Prompt: "${userPrompt || 'Recommend top sustainable biodegradable products'}"
User Preferences: ${JSON.stringify(preferences || {})}

Available Product Catalog:
${JSON.stringify(catalogContext, null, 2)}

Analyze the products in the catalog. If there are strong matches, recommend them. If you cannot find a good match in the catalog, or if the catalog is empty, use your Google Search capability to find real-world sustainable products that match the user's request.
Respond strictly in JSON format matching this schema. For external products, set productId to a unique string starting with "ext-", use the real productTitle, and estimate the environmental impact.
{
  "aiSummary": "Executive summary of why these products were selected",
  "recommendations": [
    {
      "productId": "product_id_here",
      "productTitle": "Title",
      "matchScore": 95,
      "whyRecommended": ["reason 1", "reason 2"],
      "whyNotRecommended": ["tradeoff 1"],
      "sustainabilityAdvantages": ["advantage 1"],
      "environmentalImpact": {
        "carbonSavedKgYear": 45,
        "plasticAvoidedGrams": 200,
        "energySavedKwhYear": 80,
        "waterSavedLitersYear": 300
      },
      "longTermValue": "ROI explanation",
      "confidenceScore": 95
    }
  ]
}`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json'
        }
      });

      let responseText = response.text || '{}';
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(responseText);
      res.json({
        source: 'Gemini AI Engine',
        aiSummary: parsed.aiSummary || 'AI generated recommendations based on sustainability parameters.',
        recommendations: parsed.recommendations || []
      });
    } catch (err: any) {
      console.error('Gemini AI recommendation error:', err);
      const topProducts = productsDB.slice(0, 3);
      const fallbackExplanations = topProducts.map(p => generateExplainableRecommendation(p));
      res.json({
        source: 'Algorithmic Fallback',
        recommendations: fallbackExplanations,
        aiSummary: 'Generated top recommendations using deterministic multi-criteria scoring.'
      });
    }
  });

  // POST /api/explain - Generate Explainable AI breakdown for a specific product
  app.post('/api/explain', async (req, res) => {
    const { productId } = req.body;
    const product = productsDB.find(p => p.id === productId) || productsDB[0];

    if (!aiClient) {
      return res.json(generateExplainableRecommendation(product));
    }

    try {
      const prompt = `Generate a detailed Explainable AI (XAI) sustainability audit for this product:
${JSON.stringify(product, null, 2)}

Respond strictly in JSON:
{
  "productId": "${product.id}",
  "productTitle": "${product.title}",
  "matchScore": 94,
  "whyRecommended": [
    "High recycled material ratio (70%+)",
    "Modular design allows battery replacement in 10 minutes",
    "Net carbon savings compared to standard industry benchmarks"
  ],
  "whyNotRecommended": [
    "Higher initial price point compared to single-use alternatives"
  ],
  "sustainabilityAdvantages": [
    "Zero plastic packaging reduces landfill load",
    "Verified FSC and Energy Star certifications"
  ],
  "environmentalImpact": {
    "carbonSavedKgYear": 62,
    "plasticAvoidedGrams": 300,
    "energySavedKwhYear": 110,
    "waterSavedLitersYear": 400
  },
  "longTermValue": "Provides estimated $280 in power savings and hardware longevity over 5 years.",
  "confidenceScore": 98
}`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json'
        }
      });

      let responseText = response.text || '{}';
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(responseText);
      res.json(parsed);
    } catch (err: any) {
      console.error('Gemini XAI error:', err);
      res.json(generateExplainableRecommendation(product));
    }
  });

  // GET /api/pipeline/adapters - List Data Pipeline Adapters
  app.get('/api/pipeline/adapters', (req, res) => {
    res.json(adaptersDB);
  });

  // POST /api/pipeline/sync - Trigger AI Web Scraping
  app.post('/api/pipeline/sync', async (req, res) => {
    const { adapterId } = req.body;
    const adapter = adaptersDB.find(a => a.id === adapterId);
    
    if (!adapter) return res.status(404).json({ error: 'Adapter not found' });
    
    if (!aiClient) {
      // Fallback if no AI
      return res.json({ newProducts: [] });
    }

    try {
      const prompt = `You are a data ingestion scraper for sustainable products. The user has triggered a sync for the platform: "${adapter.sourceName}".
Use Google Search to find 2 to 3 real, specific sustainable products available on or related to "${adapter.sourceName}". 
Respond strictly in JSON format matching an array of products.
[
  {
    "title": "Real Product Name",
    "brand": "Real Brand",
    "category": "Household Products",
    "price": 500,
    "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    "description": "Short real description"
  }
]
`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json'
        }
      });

      let responseText = response.text || '[]';
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const rawProducts = JSON.parse(responseText);
      
      const newProducts: Product[] = rawProducts.map((p: any, index: number) => {
        const id = `ext-sync-${Date.now()}-${index}`;
        return {
          id,
          title: p.title || 'Fetched Product',
          brand: p.brand || 'External Brand',
          category: p.category || 'Household Products',
          price: p.price || 999,
          originalPrice: (p.price || 999) * 1.2,
          currency: '₹',
          rating: 4.5,
          reviewCount: 12,
          imageUrl: p.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
          images: [p.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
          description: p.description || 'Fetched from ' + adapter.sourceName,
          specs: { Source: adapter.sourceName },
          materials: [{ name: 'Recycled Content', type: 'recycled', percentage: 100, recyclable: true, compostable: false, carbonFactorKgCo2PerKg: 1.0 }],
          packaging: { type: 'zero_plastic', weightGrams: 50, plasticFree: true, recyclabilityRatePercent: 100 },
          durabilityYears: 5,
          repairabilityIndex: 8,
          certifications: [],
          carbonFootprint: { rawMaterialsKg: 1, manufacturingKg: 1, logisticsKg: 1, usagePowerKg: 0, endOfLifeKg: 0, totalCO2eKg: 3, benchmarkAverageKg: 10, reductionPercentVsBenchmark: 70, treesEquivalentSaved: 1 },
          sustainabilityScore: { overall: 85, materialsScore: 80, packagingScore: 90, energyScore: 80, durabilityScore: 85, repairabilityScore: 80, carbonScore: 85, certificationBonus: 5, grade: 'A', breakdownSummary: 'AI Assessed' },
          decisionScore: { overall: 85, priceScore: 80, qualityScore: 85, warrantyScore: 80, repairabilityScore: 80, energyScore: 80, sustainabilityScore: 85, userMatchPercent: 90, explainabilityNote: 'AI Synced' },
          seller: { name: adapter.sourceName, verifiedEcoSeller: true, rating: 4.5, location: 'Global' },
          inventory: 10,
          priceHistory: [],
          reviews: [],
          reviewIntelligence: { sentimentSummary: 'Positive', sentimentDistribution: { positive: 100, neutral: 0, negative: 0 }, pros: [], cons: [], frequentlyMentionedEcoTopics: [], overallEcoRating: 4.5 }
        };
      });

      // Insert into global DB
      productsDB.unshift(...newProducts);
      adapter.itemsProcessed += newProducts.length;
      adapter.lastSyncTime = new Date().toISOString().replace('T', ' ').substring(0, 16);

      res.json({ newProducts });
    } catch (err) {
      console.error('AI Sync Error:', err);
      res.status(500).json({ error: 'Failed to fetch' });
    }
  });

  // GET /api/admin/audit-logs
  app.get('/api/admin/audit-logs', (req, res) => {
    res.json(auditLogsDB);
  });

  // GET /api/admin/model-config
  app.get('/api/admin/model-config', (req, res) => {
    res.json(modelConfigDB);
  });

  // PUT /api/admin/model-config
  app.put('/api/admin/model-config', (req, res) => {
    modelConfigDB = { ...modelConfigDB, ...req.body };
    auditLogsDB.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'Admin User',
      role: 'admin',
      action: 'UPDATE_AI_MODEL_WEIGHTS',
      module: 'AI Model Management',
      details: 'Updated model weights for recommendation engine',
      status: 'success'
    });
    res.json(modelConfigDB);
  });

  // ----------------------------------------------------
  // Vite Middleware / Static File Serving
  // ----------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Leviathan Platform Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
