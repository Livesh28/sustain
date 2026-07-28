import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CheckCircle2, Truck, Leaf, CreditCard, QrCode, FileText, Download, Sparkles, AlertCircle } from 'lucide-react';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  userEcoPoints: number;
  onCompleteCheckout: (orderDetails: {
    items: CartItem[];
    totalPrice: number;
    discountAmount: number;
    shippingFee: number;
    finalPrice: number;
    carbonSavedKg: number;
    plasticAvoidedGrams: number;
    pointsEarned: number;
    pointsRedeemed: number;
    address: string;
    paymentMethod: string;
    orderId: string;
  }) => void;
}

export const CartDrawerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  userEcoPoints,
  onCompleteCheckout
}) => {
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');

  // Checkout Form State
  const [fullName, setFullName] = useState('Aarav Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('42, Eco Heights, HSR Layout Sector 1');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560102');
  const [deliveryType, setDeliveryType] = useState<'ev_express' | 'standard'>('ev_express');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  if (!isOpen) return null;

  // Total Calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const rawCarbonSaved = items.reduce((sum, item) => {
    const diff = item.product.carbonFootprint.benchmarkAverageKg - item.product.carbonFootprint.totalCO2eKg;
    return sum + (diff > 0 ? diff * item.quantity : 1 * item.quantity);
  }, 0);
  const carbonSavedKg = Math.max(1, Math.round(rawCarbonSaved * 10) / 10);

  const plasticAvoidedGrams = items.reduce((sum, item) => {
    return sum + (item.product.packaging.plasticFree ? 120 * item.quantity : 40 * item.quantity);
  }, 0);

  // Discount & Points
  const pointsDiscount = redeemPoints ? Math.min(subtotal * 0.2, Math.floor(userEcoPoints / 10)) : 0;
  const couponDiscount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const totalDiscount = pointsDiscount + couponDiscount;

  const shippingFee = subtotal > 499 || deliveryType === 'standard' ? 0 : 40;
  const finalPrice = Math.max(0, subtotal - totalDiscount + shippingFee);
  const pointsEarned = Math.round(finalPrice * 0.05);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'ECOEARTH10' || couponCode.trim().toUpperCase() === 'PLASTICFREE') {
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code. Try ECOEARTH10 for 10% off!');
    }
  };

  const handleProcessOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = `ORD-IN-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderData = {
        items,
        totalPrice: subtotal,
        discountAmount: totalDiscount,
        shippingFee,
        finalPrice,
        carbonSavedKg,
        plasticAvoidedGrams,
        pointsEarned,
        pointsRedeemed: redeemPoints ? Math.min(userEcoPoints, Math.floor(pointsDiscount * 10)) : 0,
        address: `${address}, ${city}, ${state} - ${pincode}`,
        paymentMethod: paymentMethod.toUpperCase(),
        orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };

      setCompletedOrder(orderData);
      onCompleteCheckout(orderData);
      setIsProcessing(false);
      setStep('confirmation');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-lg bg-[#F9F7F3] h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#2C3333] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#5F7161] rounded-xl text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base flex items-center gap-2">
                Your Eco Cart
                <span className="text-xs font-normal text-[#D4A373] bg-[#D4A373]/20 px-2 py-0.5 rounded-full border border-[#D4A373]/30">
                  {items.reduce((s, i) => s + i.quantity, 0)} Items
                </span>
              </h2>
              <p className="text-[11px] text-[#A3B18A]">Zero-Plastic & Carbon Neutral Order</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-white/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {items.length > 0 && step !== 'confirmation' && (
          <div className="bg-[#E1D7C6]/40 px-6 py-2.5 border-b border-[#E1D7C6] flex items-center justify-between text-xs font-bold text-[#5F7161] shrink-0">
            <span className={step === 'cart' ? 'text-[#2C3333] underline decoration-2 underline-offset-4' : 'text-[#5F7161]'}>
              1. Cart Items
            </span>
            <span className="text-gray-300">→</span>
            <span className={step === 'shipping' ? 'text-[#2C3333] underline decoration-2 underline-offset-4' : 'text-[#8D9971]'}>
              2. Green Shipping
            </span>
            <span className="text-gray-300">→</span>
            <span className={step === 'payment' ? 'text-[#2C3333] underline decoration-2 underline-offset-4' : 'text-[#8D9971]'}>
              3. Payment
            </span>
          </div>
        )}

        {/* Scrollable Main Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {items.length === 0 && step !== 'confirmation' ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-[#E1D7C6]/50 rounded-full flex items-center justify-center mx-auto text-[#5F7161]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-[#2C3333] text-base">Your cart is empty</h3>
                <p className="text-xs text-[#2C3333]/70 mt-1 max-w-xs mx-auto">
                  Explore certified compostable dining, neem oral care, and seed paper products to start reducing your carbon footprint.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#5F7161] hover:bg-[#4E5D50] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Browse Sustainable Catalog
              </button>
            </div>
          ) : step === 'cart' ? (
            <>
              {/* Eco Impact Banner for Cart */}
              <div className="bg-[#5F7161]/10 border border-[#5F7161]/30 rounded-2xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#5F7161] text-white rounded-xl">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2C3333]">Cart Eco Impact</p>
                    <p className="text-[11px] text-[#5F7161] font-medium">
                      Avoids ~{plasticAvoidedGrams}g plastic & saves {carbonSavedKg} kg CO₂e
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-[#D4A373] bg-white px-2 py-1 rounded-lg border border-[#E1D7C6]">
                  100% Compostable
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="bg-white border border-[#E1D7C6] rounded-2xl p-3.5 flex gap-3 items-center hover:border-[#5F7161]/50 transition-colors"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-xl border border-[#E1D7C6] shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#2C3333] truncate">{product.title}</h4>
                      <p className="text-[10px] text-[#5F7161] font-semibold">{product.brand}</p>

                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs font-bold text-[#2C3333]">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-[10px] text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-[#F5F2ED] border border-[#E1D7C6] rounded-xl px-2 py-1">
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="p-1 hover:bg-white rounded-lg text-[#2C3333] transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#2C3333] min-w-4 text-center">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="p-1 hover:bg-white rounded-lg text-[#2C3333] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Coupon Code & EcoPoints Redemption */}
              <div className="bg-white border border-[#E1D7C6] rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#2C3333]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#D4A373]" /> Redeem EcoPoints
                  </span>
                  <span className="text-[#D4A373] text-[11px] font-semibold">{userEcoPoints} Pts Available</span>
                </div>

                <label className="flex items-center gap-2 text-xs text-[#2C3333] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={redeemPoints}
                    onChange={(e) => setRedeemPoints(e.target.checked)}
                    disabled={userEcoPoints < 100}
                    className="rounded-md text-[#5F7161] focus:ring-[#5F7161]"
                  />
                  <span>
                    Use EcoPoints for discount (10 EcoPoints = ₹1 OFF)
                    {userEcoPoints < 100 && <span className="text-red-500 text-[10px] block">(Min 100 Pts required)</span>}
                  </span>
                </label>

                <div className="pt-2 border-t border-[#E1D7C6] flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. ECOEARTH10)"
                    className="flex-1 bg-[#F9F7F3] border border-[#E1D7C6] rounded-xl px-3 py-1.5 text-xs text-[#2C3333] uppercase focus:outline-none"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-3 py-1.5 bg-[#2C3333] hover:bg-[#5F7161] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[11px] font-bold text-green-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 10% Eco Coupon applied successfully!
                  </p>
                )}
              </div>
            </>
          ) : step === 'shipping' ? (
            <div className="space-y-4">
              <h3 className="font-bold text-[#2C3333] text-sm flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#5F7161]" /> Green Shipping Address
              </h3>

              <div className="bg-white border border-[#E1D7C6] rounded-2xl p-4 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#2C3333] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#F9F7F3] border border-[#E1D7C6] rounded-xl p-2.5 text-xs text-[#2C3333]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#2C3333] mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F9F7F3] border border-[#E1D7C6] rounded-xl p-2.5 text-xs text-[#2C3333]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#2C3333] mb-1">Pincode</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-[#F9F7F3] border border-[#E1D7C6] rounded-xl p-2.5 text-xs text-[#2C3333]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#2C3333] mb-1">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#F9F7F3] border border-[#E1D7C6] rounded-xl p-2.5 text-xs text-[#2C3333]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#2C3333] mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#F9F7F3] border border-[#E1D7C6] rounded-xl p-2.5 text-xs text-[#2C3333]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#2C3333] mb-1">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-[#F9F7F3] border border-[#E1D7C6] rounded-xl p-2.5 text-xs text-[#2C3333]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Speed Options */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-[#2C3333]">Delivery Partner</label>
                
                <div
                  onClick={() => setDeliveryType('ev_express')}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                    deliveryType === 'ev_express'
                      ? 'bg-[#5F7161]/10 border-[#5F7161]'
                      : 'bg-white border-[#E1D7C6]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#5F7161] text-white rounded-xl">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#2C3333]">Green EV Express Delivery</p>
                      <p className="text-[10px] text-[#5F7161]">100% Zero-Emission Electric Vehicle (Ather/Tata Fleet)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2C3333]">{subtotal > 499 ? 'FREE' : '₹40'}</span>
                </div>

                <div
                  onClick={() => setDeliveryType('standard')}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                    deliveryType === 'standard'
                      ? 'bg-[#5F7161]/10 border-[#5F7161]'
                      : 'bg-white border-[#E1D7C6]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-200 text-gray-700 rounded-xl">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#2C3333]">Standard Postal Delivery</p>
                      <p className="text-[10px] text-gray-500">Delivered in 3-5 business days via India Post</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2C3333]">FREE</span>
                </div>
              </div>
            </div>
          ) : step === 'payment' ? (
            <div className="space-y-4">
              <h3 className="font-bold text-[#2C3333] text-sm flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#5F7161]" /> Secure Eco Payment
              </h3>

              <div className="bg-white border border-[#E1D7C6] rounded-2xl p-4 space-y-3">
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                    paymentMethod === 'upi' ? 'bg-[#5F7161]/10 border-[#5F7161]' : 'border-[#E1D7C6]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-[#5F7161]" />
                    <span className="text-xs font-bold text-[#2C3333]">Instant UPI (GPay, PhonePe, Paytm, BHIM)</span>
                  </div>
                  <span className="text-[10px] text-green-700 font-bold">Fastest</span>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="p-3 bg-[#F9F7F3] rounded-xl border border-[#E1D7C6] space-y-2">
                    <label className="block text-[10px] font-bold text-[#2C3333]">Enter VPA / UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@upi"
                      className="w-full bg-white border border-[#E1D7C6] rounded-lg p-2 text-xs text-[#2C3333]"
                    />
                  </div>
                )}

                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                    paymentMethod === 'card' ? 'bg-[#5F7161]/10 border-[#5F7161]' : 'border-[#E1D7C6]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#5F7161]" />
                    <span className="text-xs font-bold text-[#2C3333]">Credit / Debit Card (RuPay, Visa, Mastercard)</span>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                    paymentMethod === 'cod' ? 'bg-[#5F7161]/10 border-[#5F7161]' : 'border-[#E1D7C6]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#5F7161]" />
                    <span className="text-xs font-bold text-[#2C3333]">Cash on Delivery (Green Box Verification)</span>
                  </div>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-[#2C3333] text-white p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-[#D4A373] font-semibold">
                    <span>Eco Discount & Points</span>
                    <span>-₹{totalDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-300">
                  <span>Green EV Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-white">
                  <span>Total Amount</span>
                  <span className="text-[#A3B18A]">₹{finalPrice}</span>
                </div>
              </div>
            </div>
          ) : (
            /* Order Confirmation View */
            <div className="text-center py-6 space-y-5 animate-in fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-700">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5F7161] bg-[#5F7161]/10 px-2.5 py-1 rounded-full">
                  Order Verified & Dispatched
                </span>
                <h3 className="text-lg font-bold text-[#2C3333] mt-2">Thank you for your order!</h3>
                <p className="text-xs text-[#2C3333]/80 font-semibold mt-1">Order ID: {completedOrder?.orderId}</p>
              </div>

              {/* Order Impact Badge */}
              <div className="bg-white border border-[#E1D7C6] rounded-2xl p-4 text-left space-y-2.5 text-xs">
                <div className="flex items-center justify-between font-bold text-[#2C3333] border-b border-[#E1D7C6] pb-2">
                  <span>Order Summary</span>
                  <span>₹{completedOrder?.finalPrice}</span>
                </div>
                <div className="text-[11px] text-[#2C3333]/80 space-y-1">
                  <p><strong>Shipping To:</strong> {completedOrder?.address}</p>
                  <p><strong>Payment Method:</strong> {completedOrder?.paymentMethod}</p>
                </div>
                <div className="bg-[#5F7161]/10 border border-[#5F7161]/30 rounded-xl p-3 flex items-center justify-between text-[#2C3333]">
                  <div>
                    <p className="text-xs font-bold text-[#5F7161]">Environmental Impact Achieved</p>
                    <p className="text-[11px] font-semibold text-[#2C3333]">
                      Saved ~{completedOrder?.carbonSavedKg} kg CO₂e & avoided {completedOrder?.plasticAvoidedGrams}g plastic!
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#D4A373]">+{completedOrder?.pointsEarned} Pts</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const invoiceContent = `====================================================
LEVIATHAN ECO COMMERCE - GST TAX INVOICE
====================================================
Order ID: ${completedOrder?.orderId}
Date: ${completedOrder?.date}
Customer: ${fullName}
Address: ${completedOrder?.address}

----------------------------------------------------
ITEMS PURCHASED:
${completedOrder?.items.map((i: any) => `- ${i.product.title} (x${i.quantity}) @ ₹${i.product.price}`).join('\n')}

----------------------------------------------------
Subtotal: ₹${completedOrder?.totalPrice}
Discounts: -₹${completedOrder?.discountAmount}
Shipping: ₹${completedOrder?.shippingFee}
TOTAL AMOUNT PAID: ₹${completedOrder?.finalPrice}
----------------------------------------------------
ENVIRONMENTAL SAVINGS:
Carbon Prevented: ${completedOrder?.carbonSavedKg} kg CO2e
Single-Use Plastic Avoided: ${completedOrder?.plasticAvoidedGrams} grams
EcoPoints Earned: +${completedOrder?.pointsEarned} Pts
Delivery Partner: Electric EV Fleet (Zero Emissions)

Thank you for choosing certified zero-plastic products!
====================================================`;
                    const blob = new Blob([invoiceContent], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Invoice-${completedOrder?.orderId}.txt`;
                    a.click();
                  }}
                  className="w-full py-3 bg-[#5F7161] hover:bg-[#4E5D50] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Official GST Tax Invoice
                </button>

                <button
                  onClick={() => {
                    onClearCart();
                    setStep('cart');
                    onClose();
                  }}
                  className="w-full py-2.5 bg-white border border-[#E1D7C6] hover:bg-[#F5F2ED] text-[#2C3333] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Checkout Action Bar */}
        {items.length > 0 && step !== 'confirmation' && (
          <div className="bg-white border-t border-[#E1D7C6] p-4 shrink-0 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <div>
                <p className="text-[10px] text-gray-500 font-semibold">Total Payable</p>
                <p className="text-base font-bold text-[#2C3333]">₹{finalPrice}</p>
              </div>
              <div className="text-right text-[10px] text-[#5F7161] font-bold">
                +{pointsEarned} EcoPoints Earned
              </div>
            </div>

            {step === 'cart' && (
              <button
                onClick={() => setStep('shipping')}
                className="w-full py-3 bg-[#5F7161] hover:bg-[#4E5D50] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                Proceed to Green Shipping <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 'shipping' && (
              <div className="flex gap-2">
                <button
                  onClick={() => setStep('cart')}
                  className="py-3 px-4 bg-[#F5F2ED] hover:bg-[#E1D7C6] text-[#2C3333] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('payment')}
                  className="flex-1 py-3 bg-[#5F7161] hover:bg-[#4E5D50] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  Proceed to Payment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="flex gap-2">
                <button
                  onClick={() => setStep('shipping')}
                  className="py-3 px-4 bg-[#F5F2ED] hover:bg-[#E1D7C6] text-[#2C3333] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleProcessOrder}
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-[#2C3333] hover:bg-[#5F7161] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isProcessing ? 'Verifying & Dispatched...' : `Pay ₹${finalPrice} & Place Order`}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
