"use client";

import { useState, useEffect } from "react";
import { useUI } from "@/context/UIContext";

const plans = [
  {
    id: 1,
    name: "Free / Demo",
    price: "$1xx",
    period: "/month",
    description: "Sutiables for individuals to demo and explore cmlabs CMS",
    features: [
      "1 User",
      "5 Personal Projects",
      "500k / month API calls",
      "100 files media assets",
      "SEO Integrated",
    ],
    buttonText: "Get Started",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    isPopular: false,
  },
  {
    id: 2,
    name: "Professional",
    price: "$1xx",
    period: "/month",
    description: "Ideal for growing teams with full access only tranted to pro users",
    features: [
      "10 user for organization (must pro)",
      "50 Personal Projects",
      "10 organization (20 projects)",
      "5 million / month API calls",
      "5000 file media integrated",
      "SEO Integrated",
      "AI Assistance",
      "Custom Domain",
    ],
    buttonText: "Get Started",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    isPopular: false,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "$1xx",
    period: "/month",
    description: "Suitable for companies needing scalability, advanced featured, and smooth collaboration",
    features: [
      "50 user for organization (must pro)",
      "Unlimited Personal Projects",
      "50 organization (100 projects)",
      "10 milion / month API calls",
      "Unlimited file media integrated",
      "SEO Integrated",
      "AI Assistance",
      "Custom Domain",
    ],
    buttonText: "Get Started",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    isPopular: true,
  },
  {
    id: 4,
    name: "White Label",
    price: "",
    period: "",
    description: "Take full ownership off the CMS platform, deploy it under your infrastructure, with your own branding and configurations.",
    features: [
      "Full source code access",
      "Fully configurable modules",
      "Custom Banding",
      "CMS Ownership",
      "Lifetime license",
    ],
    buttonText: "Contact Us",
    buttonColor: "bg-emerald-500 hover:bg-emerald-600",
    isPopular: false,
  },
];

export default function UpgradePage() {
  const { isDark } = useUI();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [paymentStep, setPaymentStep] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [virtualAccountNumber, setVirtualAccountNumber] = useState<string>("");
  
  // Credit Card States
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCVV, setCardCVV] = useState<string>("");
  
  // QRIS States
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [qrisTimer, setQrisTimer] = useState<number>(900); // 15 minutes in seconds

  // Timer for QRIS
  useEffect(() => {
    if (selectedPayment === 'qris' && qrisTimer > 0) {
      const timer = setInterval(() => {
        setQrisTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedPayment, qrisTimer]);

  // Format card number
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  // Format expiry
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleGetStarted = (plan: any) => {
    if (plan.name === "White Label") {
      return;
    }
    setSelectedPlan(plan);
    setPaymentStep(0);
    setSelectedPayment(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
    setPaymentStep(0);
    setSelectedPayment(null);
    setSelectedBank(null);
    setSelectedCardType(null);
    setPhoneNumber("");
    setVirtualAccountNumber("");
    setCardNumber("");
    setCardExpiry("");
    setCardCVV("");
    setQrCodeUrl("");
    setQrisTimer(900);
  };

  const handleQRISSelect = () => {
    setSelectedPayment('qris');
    // Generate QR Code with payment data
    const paymentData = `QRIS-PAYMENT-${selectedPlan?.name}-${Date.now()}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentData)}`;
    setQrCodeUrl(qrUrl);
    setQrisTimer(900);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`${isDark ? "bg-slate-900" : "bg-gray-100"} min-h-screen py-12`}>
      <div className="mx-auto max-w-[1400px] px-6">
        
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-bold mb-4 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
            Choose Plan
          </h1>
          <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Choose a plan that suits your project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border-t-2 bg-slate-800 border-gray-400/30 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 transform hover:scale-110 hover:shadow-2xl h-full ${
                isDark ? "bg-slate-800" : "bg-white"
              }`}
            >
              <div className={`p-6 rounded-t-2xl ${isDark ? "bg-slate-900/20 border-b border-slate-600" : "bg-gray-50 border-1 border-gray-200 border-b-1 border-b-gray-300"}`}>
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                {plan.price && (
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                      {plan.price}
                    </span>
                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>
                      {plan.period}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <p className={`text-sm mb-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  {plan.description}
                </p>

                <div className="space-y-3 flex-1 mb-6">
                  <h4 className={`font-semibold text-sm mb-3 ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                    Included Features
                  </h4>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className={`text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleGetStarted(plan)}
                  className={`w-full py-3 px-4 rounded-full font-semibold text-white text-center transition-colors ${plan.buttonColor} mt-auto`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal - Payment Method Selection */}
      {isModalOpen && paymentStep === 0 && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
            <div className={`rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col pointer-events-auto ${isDark ? "bg-slate-800" : "bg-white"}`}>
              
              <div className={`p-5 border-b flex-shrink-0 ${isDark ? "border-slate-700" : "border-gray-200"}`}>
                <h2 className={`text-xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                  Payment Method
                </h2>
                <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Selected Plan: <span className="font-semibold">{selectedPlan?.name}</span>
                </p>
              </div>

              <div className="p-5 space-y-3 overflow-y-auto flex-1">
                
                {/* Credit Card Button */}
                {!selectedPayment && (
                  <button
                    onClick={() => setSelectedPayment('credit-card')}
                    className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      isDark ? 'border-slate-600 hover:border-slate-500 bg-slate-700/30' : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg width="32" height="22" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="28" rx="4" fill="white"/>
                        <circle cx="15" cy="14" r="8" fill="#EB001B"/>
                        <circle cx="25" cy="14" r="8" fill="#F79E1B"/>
                        <path d="M20 8.5C21.6569 10.1569 21.6569 13.1569 20 14.8137C18.3431 13.1569 18.3431 10.1569 20 8.5Z" fill="#FF5F00"/>
                      </svg>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Credit Card</span>
                    </div>
                  </button>
                )}

                {/* Credit Card Type Selection */}
                {selectedPayment === 'credit-card' && !selectedCardType && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Select Card Type</h3>
                      <button
                        onClick={() => {
                          setSelectedPayment(null);
                          setSelectedCardType(null);
                        }}
                        className={`text-xs ${isDark ? "text-slate-400 hover:text-slate-300" : "text-slate-600 hover:text-slate-900"}`}
                      >
                        ← Back
                      </button>
                    </div>

                    <button
                      onClick={() => setSelectedCardType('visa')}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20' : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50'
                      }`}
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">VISA</span>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Visa</span>
                    </button>

                    <button
                      onClick={() => setSelectedCardType('mastercard')}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20' : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50'
                      }`}
                    >
                      <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0 border border-gray-300">
                        <svg width="32" height="20" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="15" cy="14" r="8" fill="#EB001B"/>
                          <circle cx="25" cy="14" r="8" fill="#F79E1B"/>
                        </svg>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Mastercard</span>
                    </button>
                  </>
                )}

                {/* Credit Card Form */}
                {selectedPayment === 'credit-card' && selectedCardType && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Card Details</h3>
                      <button
                        onClick={() => {
                          setSelectedCardType(null);
                          setCardNumber("");
                          setCardExpiry("");
                          setCardCVV("");
                        }}
                        className={`text-xs ${isDark ? "text-slate-400 hover:text-slate-300" : "text-slate-600 hover:text-slate-900"}`}
                      >
                        ← Change Card
                      </button>
                    </div>

                    <div className={`p-4 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 space-y-3`}>
                      <div className="flex items-center gap-2 mb-3">
                        {selectedCardType === 'visa' && (
                          <>
                            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-xs">VISA</span>
                            </div>
                            <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Visa Card</span>
                          </>
                        )}
                        {selectedCardType === 'mastercard' && (
                          <>
                            <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0 border border-gray-300">
                              <svg width="32" height="20" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="15" cy="14" r="8" fill="#EB001B"/>
                                <circle cx="25" cy="14" r="8" fill="#F79E1B"/>
                              </svg>
                            </div>
                            <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Mastercard</span>
                          </>
                        )}
                      </div>

                      {/* Card Number */}
                      <div>
                        <label className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            if (formatted.replace(/\s/g, '').length <= 16) {
                              setCardNumber(formatted);
                            }
                          }}
                          placeholder="1234 5678 9012 3456"
                          className={`w-full px-3 py-2 mt-1 rounded border ${isDark ? "bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-500" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>

                      {/* Expiry and CVV */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => {
                              const formatted = formatExpiry(e.target.value);
                              if (formatted.replace(/\//g, '').length <= 4) {
                                setCardExpiry(formatted);
                              }
                            }}
                            placeholder="MM/YY"
                            className={`w-full px-3 py-2 mt-1 rounded border ${isDark ? "bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-500" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        <div>
                          <label className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                            CVV
                          </label>
                          <input
                            type="text"
                            value={cardCVV}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              if (value.length <= 3) {
                                setCardCVV(value);
                              }
                            }}
                            placeholder="123"
                            maxLength={3}
                            className={`w-full px-3 py-2 mt-1 rounded border ${isDark ? "bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-500" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg border ${isDark ? "border-slate-600 bg-slate-700/30" : "border-gray-300 bg-gray-50"}`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-900"}`}>Total Amount:</span>
                        <span className={`text-xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{selectedPlan?.price}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (cardNumber.replace(/\s/g, '').length === 16 && cardExpiry.length === 5 && cardCVV.length === 3) {
                          setPaymentStep(1);
                        } else {
                          alert("Please fill all card details correctly");
                        }
                      }}
                      disabled={cardNumber.replace(/\s/g, '').length !== 16 || cardExpiry.length !== 5 || cardCVV.length !== 3}
                      className={`w-full py-2.5 rounded-lg font-semibold transition-all text-sm ${
                        cardNumber.replace(/\s/g, '').length === 16 && cardExpiry.length === 5 && cardCVV.length === 3
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      }`}
                    >
                      Continue to Payment
                    </button>
                  </>
                )}

                {/* Virtual Account Button */}
                {!selectedPayment && (
                  <button
                    onClick={() => setSelectedPayment('virtual-account')}
                    className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      isDark ? 'border-slate-600 hover:border-slate-500 bg-slate-700/30' : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-800 dark:bg-slate-700 rounded flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Virtual Account</span>
                    </div>
                  </button>
                )}

                {/* Bank Selection for Virtual Account */}
                {selectedPayment === 'virtual-account' && !selectedBank && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Select Bank</h3>
                      <button
                        onClick={() => {
                          setSelectedPayment(null);
                          setSelectedBank(null);
                        }}
                        className={`text-xs ${isDark ? "text-slate-400 hover:text-slate-300" : "text-slate-600 hover:text-slate-900"}`}
                      >
                        ← Back
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedBank('bca');
                        const vaNumber = '70012' + Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
                        setVirtualAccountNumber(vaNumber);
                      }}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20' : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50'
                      }`}
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">BCA</span>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Bank Central Asia</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedBank('mandiri');
                        const vaNumber = '88808' + Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
                        setVirtualAccountNumber(vaNumber);
                      }}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20' : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50'
                      }`}
                    >
                      <div className="w-10 h-10 bg-yellow-500 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">Mandiri</span>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Bank Mandiri</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedBank('bri');
                        const vaNumber = '26215' + Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
                        setVirtualAccountNumber(vaNumber);
                      }}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20' : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50'
                      }`}
                    >
                      <div className="w-10 h-10 bg-blue-800 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">BRI</span>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Bank Rakyat Indonesia</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedBank('bni');
                        const vaNumber = '8808' + Math.floor(Math.random() * 100000000000).toString().padStart(11, '0');
                        setVirtualAccountNumber(vaNumber);
                      }}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20' : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50'
                      }`}
                    >
                      <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">BNI</span>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Bank Negara Indonesia</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedBank('seabank');
                        const vaNumber = '89508' + Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
                        setVirtualAccountNumber(vaNumber);
                      }}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20' : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50'
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-[10px]">SeaBank</span>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>SeaBank Indonesia</span>
                    </button>
                  </>
                )}

                {/* VA Payment Instructions */}
                {selectedPayment === 'virtual-account' && selectedBank && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Virtual Account Number</h3>
                      <button
                        onClick={() => {
                          setSelectedBank(null);
                          setVirtualAccountNumber("");
                        }}
                        className={`text-xs ${isDark ? "text-slate-400 hover:text-slate-300" : "text-slate-600 hover:text-slate-900"}`}
                      >
                        ← Change Bank
                      </button>
                    </div>

                    <div className={`p-3 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20`}>
                      <div className="flex items-center gap-2 mb-2">
                        {selectedBank === 'bca' && (
                          <>
                            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-sm">BCA</span>
                            </div>
                            <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Bank Central Asia</span>
                          </>
                        )}
                        {selectedBank === 'mandiri' && (
                          <>
                            <div className="w-10 h-10 bg-yellow-500 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-xs">Mandiri</span>
                            </div>
                            <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Bank Mandiri</span>
                          </>
                        )}
                        {selectedBank === 'bri' && (
                          <>
                            <div className="w-10 h-10 bg-blue-800 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-sm">BRI</span>
                            </div>
                            <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Bank Rakyat Indonesia</span>
                          </>
                        )}
                        {selectedBank === 'bni' && (
                          <>
                            <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-sm">BNI</span>
                            </div>
                            <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Bank Negara Indonesia</span>
                          </>
                        )}
                        {selectedBank === 'seabank' && (
                          <>
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-[10px]">SeaBank</span>
                            </div>
                            <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>SeaBank Indonesia</span>
                          </>
                        )}
                      </div>

                      <div className="space-y-1">
                        <p className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                          Virtual Account Number:
                        </p>
                        <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600">
                          <span className="text-base font-mono font-bold text-blue-600 dark:text-blue-400">
                            {virtualAccountNumber}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(virtualAccountNumber);
                              alert("VA Number copied!");
                            }}
                            className="px-2 py-1 bg-blue-500 text-white text-[10px] font-semibold rounded hover:bg-blue-600 transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${isDark ? "bg-slate-700/50" : "bg-gray-100"}`}>
                      <h4 className={`font-semibold text-xs mb-1 ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                        Payment Instructions:
                      </h4>
                      <ol className={`text-xs space-y-0.5 list-decimal list-inside ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        <li>Open your mobile banking or ATM</li>
                        <li>Select Transfer or Virtual Account</li>
                        <li>Enter the VA number above</li>
                        <li>Verify payment details and amount</li>
                        <li>Complete the transaction</li>
                        <li>Payment will be verified automatically</li>
                      </ol>
                    </div>

                    <div className={`p-3 rounded-lg border ${isDark ? "border-slate-600 bg-slate-700/30" : "border-gray-300 bg-gray-50"}`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-900"}`}>Total Amount:</span>
                        <span className={`text-xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{selectedPlan?.price}</span>
                      </div>
                      <p className={`text-[10px] mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Payment valid until: {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString('id-ID')}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        console.log("VA Payment initiated");
                        alert("Payment instruction noted! Complete payment within 24 hours.");
                        closeModal();
                      }}
                      className="w-full py-2.5 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 transition-all text-sm"
                    >
                      I have Noted the Instructions
                    </button>
                  </>
                )}

                {/* E-wallet Button */}
                {!selectedPayment && (
                  <button
                    onClick={() => setSelectedPayment('e-wallet')}
                    className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      isDark ? 'border-slate-600 hover:border-slate-500 bg-slate-700/30' : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-800 dark:bg-slate-700 rounded flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                        </svg>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>E-Wallet</span>
                    </div>
                  </button>
                )}

                {/* E-wallet Selection */}
                {selectedPayment === 'e-wallet' && !selectedBank && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Select E-Wallet</h3>
                      <button
                        onClick={() => {
                          setSelectedPayment(null);
                          setSelectedBank(null);
                        }}
                        className={`text-xs ${isDark ? "text-slate-400 hover:text-slate-300" : "text-slate-600 hover:text-slate-900"}`}
                      >
                        ← Back
                      </button>
                    </div>

                    <button
                      onClick={() => setSelectedBank('dana')}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20' : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50'
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">DANA</span>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>DANA</span>
                    </button>

                    <button
                      onClick={() => setSelectedBank('gopay')}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20' : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50'
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">GO</span>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>GoPay</span>
                    </button>

                    <button
                      onClick={() => setSelectedBank('shopeepay')}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20' : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50'
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-[10px]">Shopee</span>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>ShopeePay</span>
                    </button>

                    <button
                      onClick={() => setSelectedBank('ovo')}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20' : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50'
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-500 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">OVO</span>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>OVO</span>
                    </button>
                  </>
                )}

                {/* E-wallet Phone Number Input */}
                {selectedPayment === 'e-wallet' && selectedBank && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Enter Phone Number</h3>
                      <button
                        onClick={() => {
                          setSelectedBank(null);
                          setPhoneNumber("");
                        }}
                        className={`text-xs ${isDark ? "text-slate-400 hover:text-slate-300" : "text-slate-600 hover:text-slate-900"}`}
                      >
                        ← Change E-Wallet
                      </button>
                    </div>

                    <div className={`p-3 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20`}>
                      <div className="flex items-center gap-2 mb-3">
                        {selectedBank === 'dana' && (
                          <>
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-xs">DANA</span>
                            </div>
                            <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>DANA</span>
                          </>
                        )}
                        {selectedBank === 'gopay' && (
                          <>
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-xs">GO</span>
                            </div>
                            <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>GoPay</span>
                          </>
                        )}
                        {selectedBank === 'shopeepay' && (
                          <>
                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-[10px]">Shopee</span>
                            </div>
                            <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>ShopeePay</span>
                          </>
                        )}
                        {selectedBank === 'ovo' && (
                          <>
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-500 rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-xs">OVO</span>
                            </div>
                            <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>OVO</span>
                          </>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                          Phone Number
                        </label>
                        <div className="flex gap-2">
                          <div className={`px-3 py-2 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 flex items-center ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                            <span className="text-sm font-medium">+62</span>
                          </div>
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              setPhoneNumber(value);
                            }}
                            placeholder="812XXXXXXXX"
                            className={`flex-1 px-3 py-2 rounded border ${isDark ? "bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-500" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        <p className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                          Enter your phone number registered with {selectedBank === 'dana' ? 'DANA' : selectedBank === 'gopay' ? 'GoPay' : selectedBank === 'shopeepay' ? 'ShopeePay' : 'OVO'}
                        </p>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${isDark ? "bg-slate-700/50" : "bg-gray-100"}`}>
                      <h4 className={`font-semibold text-xs mb-1 ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                        Payment Instructions:
                      </h4>
                      <ol className={`text-xs space-y-0.5 list-decimal list-inside ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        <li>Enter your registered phone number</li>
                        <li>You will receive a payment notification</li>
                        <li>Open your {selectedBank === 'dana' ? 'DANA' : selectedBank === 'gopay' ? 'Gojek/GoPay' : selectedBank === 'shopeepay' ? 'Shopee' : 'OVO'} app</li>
                        <li>Confirm the payment</li>
                        <li>Payment will be processed automatically</li>
                      </ol>
                    </div>

                    <div className={`p-3 rounded-lg border ${isDark ? "border-slate-600 bg-slate-700/30" : "border-gray-300 bg-gray-50"}`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-900"}`}>Total Amount:</span>
                        <span className={`text-xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{selectedPlan?.price}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (phoneNumber.length >= 9) {
                          setPaymentStep(1);
                        } else {
                          alert("Please enter a valid phone number");
                        }
                      }}
                      disabled={phoneNumber.length < 9}
                      className={`w-full py-2.5 rounded-lg font-semibold transition-all text-sm ${
                        phoneNumber.length >= 9
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      }`}
                    >
                      Continue to Payment
                    </button>
                  </>
                )}

                {/* QRIS Button */}
                {!selectedPayment && (
                  <button
                    onClick={handleQRISSelect}
                    className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      isDark ? 'border-slate-600 hover:border-slate-500 bg-slate-700/30' : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-800 dark:bg-slate-700 rounded flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd"/>
                          <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z"/>
                        </svg>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>QRIS</span>
                    </div>
                  </button>
                )}

                {/* QRIS QR Code Display */}
                {selectedPayment === 'qris' && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Scan QR Code</h3>
                      <button
                        onClick={() => {
                          setSelectedPayment(null);
                          setQrCodeUrl("");
                          setQrisTimer(900);
                        }}
                        className={`text-xs ${isDark ? "text-slate-400 hover:text-slate-300" : "text-slate-600 hover:text-slate-900"}`}
                      >
                        ← Back
                      </button>
                    </div>

                    <div className={`p-4 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20`}>
                      <div className="flex flex-col items-center">
                        <div className="bg-white p-4 rounded-lg mb-3">
                          <img 
                            src={qrCodeUrl} 
                            alt="QRIS Code" 
                            className="w-48 h-48"
                          />
                        </div>
                        
                        <div className={`text-center mb-2`}>
                          <p className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                            Payment expires in:
                          </p>
                          <p className={`text-2xl font-bold ${qrisTimer < 300 ? 'text-red-500' : 'text-blue-600'}`}>
                            {formatTime(qrisTimer)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${isDark ? "bg-slate-700/50" : "bg-gray-100"}`}>
                      <h4 className={`font-semibold text-xs mb-1 ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                        Payment Instructions:
                      </h4>
                      <ol className={`text-xs space-y-0.5 list-decimal list-inside ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        <li>Open your e-wallet or mobile banking app</li>
                        <li>Select Scan QR or QRIS menu</li>
                        <li>Scan the QR code above</li>
                        <li>Verify payment details and amount</li>
                        <li>Complete the payment</li>
                        <li>Payment will be verified automatically</li>
                      </ol>
                    </div>

                    <div className={`p-3 rounded-lg border ${isDark ? "border-slate-600 bg-slate-700/30" : "border-gray-300 bg-gray-50"}`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-900"}`}>Total Amount:</span>
                        <span className={`text-xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{selectedPlan?.price}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        console.log("QRIS Payment initiated");
                        alert("Scan the QR code to complete payment!");
                        closeModal();
                      }}
                      className="w-full py-2.5 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 transition-all text-sm"
                    >
                      I have Scanned the QR Code
                    </button>
                  </>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Order Summary */}
      {isModalOpen && paymentStep === 1 && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
            <div className={`rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto ${isDark ? "bg-slate-800" : "bg-white"}`}>
              
              <div className={`p-5 border-b ${isDark ? "border-slate-700" : "border-gray-200"}`}>
                <h2 className={`text-xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                  Order Summary
                </h2>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center gap-2">
                    {selectedPayment === 'credit-card' && selectedCardType === 'visa' && (
                      <>
                        <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">VISA</span>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Visa</span>
                          <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>**** {cardNumber.slice(-4)}</span>
                        </div>
                      </>
                    )}
                    {selectedPayment === 'credit-card' && selectedCardType === 'mastercard' && (
                      <>
                        <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0 border border-gray-300">
                          <svg width="32" height="20" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="14" r="8" fill="#EB001B"/>
                            <circle cx="25" cy="14" r="8" fill="#F79E1B"/>
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Mastercard</span>
                          <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>**** {cardNumber.slice(-4)}</span>
                        </div>
                      </>
                    )}
                    {selectedPayment === 'e-wallet' && selectedBank === 'dana' && (
                      <>
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">DANA</span>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>DANA</span>
                          <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>+62{phoneNumber}</span>
                        </div>
                      </>
                    )}
                    {selectedPayment === 'e-wallet' && selectedBank === 'gopay' && (
                      <>
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">GO</span>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>GoPay</span>
                          <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>+62{phoneNumber}</span>
                        </div>
                      </>
                    )}
                    {selectedPayment === 'e-wallet' && selectedBank === 'shopeepay' && (
                      <>
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-[10px]">Shopee</span>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>ShopeePay</span>
                          <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>+62{phoneNumber}</span>
                        </div>
                      </>
                    )}
                    {selectedPayment === 'e-wallet' && selectedBank === 'ovo' && (
                      <>
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-500 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">OVO</span>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>OVO</span>
                          <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>+62{phoneNumber}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <h3 className={`text-base font-semibold mb-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    Order Summary
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-900"}`}>{selectedPlan?.name}</p>
                        <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>{selectedPlan?.price}</p>
                      </div>
                      <p className={`text-base font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{selectedPlan?.price}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className={`text-xs ${isDark ? "text-slate-300" : "text-slate-700"}`}>Month</p>
                      <p className={`text-xs font-medium ${isDark ? "text-slate-100" : "text-slate-900"}`}>1</p>
                    </div>

                    <div className={`border-t pt-2 ${isDark ? "border-slate-600" : "border-gray-300"}`}>
                      <div className="flex justify-between items-center">
                        <p className={`text-base font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Total</p>
                        <p className={`text-xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{selectedPlan?.price}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="agreeTerms" className="w-4 h-4 rounded mt-0.5" defaultChecked />
                  <label htmlFor="agreeTerms" className={`text-xs ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    I agree the Terms of Use and acknowledge the Privacy Policy
                  </label>
                </div>

                <button
                  onClick={() => {
                    console.log("Payment completed");
                    closeModal();
                  }}
                  className="w-full py-2.5 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 transition-all text-sm"
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
