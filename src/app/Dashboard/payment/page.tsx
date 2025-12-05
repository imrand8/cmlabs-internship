"use client";

import { useState, useEffect } from "react";
import { useUI } from "@/context/UIContext";
import Link from "next/link";

export default function PlanAndBillingPage() {
  const { isDark } = useUI();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "billing" | "payment" | "confirm" | "summary" | null
  >(null);
  const [paymentStep, setPaymentStep] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [selectedConfirmPayment, setSelectedConfirmPayment] = useState<
    string | null
  >(null);

  // Enhanced payment states
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedEwallet, setSelectedEwallet] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [formData, setFormData] = useState({
    fullName: "Bilal Al Ihsan",
    billingEmail: "cmlabs@gmail.com",
    country: "Indonesia",
    city: "Klaten",
    zip: "6748453",
    state: "Central Java",
    address: "Candi V streets no.332",
    company: "PT . Bitalmulidigital",
  });

  const [paymentFormData, setPaymentFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    cvv: "",
    expiryDate: "",
  });

  // Format functions
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(" ") : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formatted = formatCardNumber(value);
      if (formatted.replace(/\s/g, "").length <= 16) {
        setPaymentFormData((prev) => ({ ...prev, [name]: formatted }));
      }
    } else if (name === "expiryDate") {
      const formatted = formatExpiry(value);
      if (formatted.replace(/\//g, "").length <= 4) {
        setPaymentFormData((prev) => ({ ...prev, [name]: formatted }));
      }
    } else if (name === "cvv") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length <= 3) {
        setPaymentFormData((prev) => ({ ...prev, [name]: cleaned }));
      }
    } else {
      setPaymentFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsModalOpen(false);
    setModalType(null);
  };

  const openUpdateModal = () => {
    setModalType("billing");
    setIsModalOpen(true);
  };

  const openPaymentModal = () => {
    setModalType("payment");
    setPaymentStep(0);
    setSelectedPayment(null);
    setSelectedCardType(null);
    setSelectedBank(null);
    setSelectedEwallet(null);
    setPhoneNumber("");
    setIsModalOpen(true);
  };

  const openPaymentConfirmModal = () => {
    setModalType("confirm");
    setSelectedConfirmPayment(null);
    setIsModalOpen(true);
  };

  const handleSelectPayment = (method: string) => {
    setSelectedPayment(method);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setPaymentStep(0);
    setSelectedConfirmPayment(null);
    setSelectedPayment(null);
    setSelectedCardType(null);
    setSelectedBank(null);
    setSelectedEwallet(null);
    setPhoneNumber("");
    setPaymentFormData({
      cardNumber: "",
      cardHolder: "",
      cvv: "",
      expiryDate: "",
    });
  };

  return (
    <div className={`${isDark ? "bg-slate-900" : "bg-[#F4F5FA]"} min-h-screen`}>
      <div className="mx-auto max-w-[1200px] px-6 py-6 space-y-6">
        <div className="text-sm text-blue-600 dark:text-blue-400">
          Dashboard / Pages /{" "}
          <span className="font-medium">Plan and Billing</span>
        </div>

        <h1
          className={`text-4xl font-bold ${
            isDark ? "text-slate-100" : "text-slate-900"
          }`}
        >
          Plan and Billing
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`rounded-lg overflow-hidden shadow-md ${
              isDark ? "bg-slate-800" : "bg-white"
            }`}
          >
            <div
              className={`${
                isDark ? "bg-blue-600/80" : "bg-blue-600"
              } text-white px-6 py-4`}
            >
              <h2 className="text-lg font-semibold">Information Package</h2>
            </div>
            <div
              className={`p-6 space-y-4 ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
            >
              <div
                className={`flex items-center justify-between pb-4 border-b-2 border-dashed ${
                  isDark ? "border-slate-600" : "border-blue-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Professional</span>
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Active
                  </span>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xs ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Subscription end date
                  </div>
                  <div className="text-sm font-semibold">12 Dec 2025</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="renewal"
                  className="w-4 h-4 rounded mt-1"
                />
                <div>
                  <label
                    htmlFor="renewal"
                    className="text-sm font-medium block"
                  >
                    Auto Renewal
                  </label>
                  <p
                    className={`text-xs ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Enable to automatically renew your subscription at the end
                    of each billing using your saved payment method
                  </p>
                </div>
              </div>

              <div className="text-4xl font-bold">$1XX</div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={openPaymentConfirmModal}
                  className={`px-4 py-2 text-sm font-semibold rounded transition-colors ${
                    isDark
                      ? "bg-slate-700 text-slate-100 hover:bg-slate-600"
                      : "bg-slate-300 text-slate-900 hover:bg-slate-400"
                  }`}
                >
                  Pay Package
                </button>

                <Link
                  href="/Dashboard/payment/price"
                  className="px-4 py-2 text-sm font-semibold rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-colors inline-block"
                >
                  Upgrade Package
                </Link>

                <button
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to cancel this package?")
                    ) {
                      console.log("Package cancelled");
                    }
                  }}
                  className="px-4 py-2 text-sm font-semibold rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Cancel Package
                </button>
              </div>
            </div>
          </div>

          <div
            className={`rounded-lg overflow-hidden shadow-md ${
              isDark ? "bg-slate-800" : "bg-white"
            }`}
          >
            <div
              className={`${
                isDark ? "bg-blue-600/80" : "bg-blue-600"
              } text-white px-6 py-4`}
            >
              <h2 className="text-lg font-semibold">System Usage Overview</h2>
            </div>
            <div
              className={`p-6 space-y-4 ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-medium mb-1">Status</div>
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs font-semibold rounded-full">
                    Good
                  </span>
                </div>
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <div className="text-center text-white">
                    <div className="text-sm font-semibold">Used</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span
                    className={isDark ? "text-slate-400" : "text-slate-600"}
                  >
                    Bandwidth
                  </span>
                  <span className="font-medium">50 / 100 GB</span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={isDark ? "text-slate-400" : "text-slate-600"}
                  >
                    API calls
                  </span>
                  <span className="font-medium">200K / 500K</span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={isDark ? "text-slate-400" : "text-slate-600"}
                  >
                    Media Assets
                  </span>
                  <span className="font-medium">1350 / 5000 file</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`rounded-lg overflow-hidden shadow-md ${
            isDark ? "bg-slate-800" : "bg-white"
          }`}
        >
          <div
            className={`${
              isDark ? "bg-emerald-600/80" : "bg-emerald-500"
            } text-white px-6 py-4`}
          >
            <h2 className="text-lg font-semibold">Billing Address</h2>
          </div>
          <div
            className={`p-6 space-y-4 ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="text-sm font-medium">Full Name</span>
                <p className={isDark ? "text-slate-400" : "text-slate-600"}>
                  {formData.fullName}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium">Billing Email</span>
                <p className={isDark ? "text-slate-400" : "text-slate-600"}>
                  {formData.billingEmail}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium">Country</span>
                <p className={isDark ? "text-slate-400" : "text-slate-600"}>
                  {formData.country}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium">City</span>
                <p className={isDark ? "text-slate-400" : "text-slate-600"}>
                  {formData.city}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium">State / Province</span>
                <p className={isDark ? "text-slate-400" : "text-slate-600"}>
                  {formData.state}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium">Zip</span>
                <p className={isDark ? "text-slate-400" : "text-slate-600"}>
                  {formData.zip}
                </p>
              </div>
              <div className="md:col-span-2">
                <span className="text-sm font-medium">Address</span>
                <p className={isDark ? "text-slate-400" : "text-slate-600"}>
                  {formData.address}
                </p>
              </div>
              <div className="md:col-span-2">
                <span className="text-sm font-medium">Company (optional)</span>
                <p className={isDark ? "text-slate-400" : "text-slate-600"}>
                  {formData.company}
                </p>
              </div>
            </div>
            <button
              onClick={openUpdateModal}
              className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Update Information
            </button>
          </div>
        </div>

        <div
          className={`rounded-lg overflow-hidden shadow-md ${
            isDark ? "bg-slate-800" : "bg-white"
          }`}
        >
          <div
            className={`${
              isDark ? "bg-indigo-700/80" : "bg-indigo-700"
            } text-white px-6 py-4`}
          >
            <h2 className="text-lg font-semibold">Payment Information</h2>
          </div>
          <div
            className={`p-6 space-y-4 ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            <div
              className={`flex items-center justify-between p-4 rounded-lg border ${
                isDark
                  ? "bg-slate-700/50 border-slate-600"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">
                  VISA
                </div>
                <div>
                  <p className="font-medium text-sm">Credit card</p>
                  <p
                    className={`text-xs ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    •••• •••• •••• 4007
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-red-500 text-sm font-medium hover:underline">
                  Delete
                </button>
                <button className="text-blue-500 text-sm font-medium hover:underline">
                  Change Credit Card
                </button>
              </div>
            </div>

            <div
              className={`flex items-center justify-between p-4 rounded-lg border ${
                isDark
                  ? "bg-slate-700/50 border-slate-600"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                  D
                </div>
                <div>
                  <p className="font-medium text-sm">E-wallet (Dana)</p>
                  <p
                    className={`text-xs ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    62•• •••• •85
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-red-500 text-sm font-medium hover:underline">
                  Delete
                </button>
                <button className="text-blue-500 text-sm font-medium hover:underline">
                  Change Dana
                </button>
              </div>
            </div>

            <button
              onClick={openPaymentModal}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Payment Method
            </button>
          </div>
        </div>
      </div>

      {/* MODAL - Update Billing Address */}
      {isModalOpen && modalType === "billing" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden ${
              isDark ? "bg-slate-800" : "bg-white"
            }`}
          >
            <div
              className={`p-6 border-b ${
                isDark ? "border-slate-700" : "border-gray-200"
              }`}
            >
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                Update Billing Address
              </h2>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded border ${
                      isDark
                        ? "bg-slate-700 border-slate-600 text-slate-100"
                        : "bg-white border-gray-300 text-slate-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Billing Email
                  </label>
                  <input
                    type="email"
                    name="billingEmail"
                    value={formData.billingEmail}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded border ${
                      isDark
                        ? "bg-slate-700 border-slate-600 text-slate-100"
                        : "bg-white border-gray-300 text-slate-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded border ${
                      isDark
                        ? "bg-slate-700 border-slate-600 text-slate-100"
                        : "bg-white border-gray-300 text-slate-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded border ${
                      isDark
                        ? "bg-slate-700 border-slate-600 text-slate-100"
                        : "bg-white border-gray-300 text-slate-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded border ${
                      isDark
                        ? "bg-slate-700 border-slate-600 text-slate-100"
                        : "bg-white border-gray-300 text-slate-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Zip
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded border ${
                      isDark
                        ? "bg-slate-700 border-slate-600 text-slate-100"
                        : "bg-white border-gray-300 text-slate-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded border ${
                      isDark
                        ? "bg-slate-700 border-slate-600 text-slate-100"
                        : "bg-white border-gray-300 text-slate-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Company (optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded border ${
                      isDark
                        ? "bg-slate-700 border-slate-600 text-slate-100"
                        : "bg-white border-gray-300 text-slate-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className={`px-6 py-2 font-semibold rounded-lg transition-colors ${
                    isDark
                      ? "bg-slate-700 text-slate-100 hover:bg-slate-600"
                      : "bg-gray-200 text-slate-900 hover:bg-gray-300"
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL - Add Payment Method (ONLY 3 OPTIONS) */}
      {isModalOpen && modalType === "payment" && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
            <div
              className={`rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col pointer-events-auto ${
                isDark ? "bg-slate-800" : "bg-white"
              }`}
            >
              <div
                className={`p-5 border-b flex-shrink-0 ${
                  isDark ? "border-slate-700" : "border-gray-200"
                }`}
              >
                <h2
                  className={`text-xl font-bold ${
                    isDark ? "text-slate-100" : "text-slate-900"
                  }`}
                >
                  Add Payment Method
                </h2>
              </div>

              <div className="p-5 space-y-3 overflow-y-auto flex-1">
                {/* Credit/Debit Card Button */}
                {!selectedPayment && (
                  <button
                    onClick={() => handleSelectPayment("credit-card")}
                    className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      isDark
                        ? "border-slate-600 hover:border-slate-500 bg-slate-700/30"
                        : "border-gray-200 hover:border-gray-300 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        width="32"
                        height="22"
                        viewBox="0 0 40 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="40" height="28" rx="4" fill="white" />
                        <circle cx="15" cy="14" r="8" fill="#EB001B" />
                        <circle cx="25" cy="14" r="8" fill="#F79E1B" />
                        <path
                          d="M20 8.5C21.6569 10.1569 21.6569 13.1569 20 14.8137C18.3431 13.1569 18.3431 10.1569 20 8.5Z"
                          fill="#FF5F00"
                        />
                      </svg>
                      <span
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        Credit/Debit Card
                      </span>
                    </div>
                  </button>
                )}

                {/* Credit Card Type Selection */}
                {selectedPayment === "credit-card" && !selectedCardType && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        Select Card Type
                      </h3>
                      <button
                        onClick={() => {
                          setSelectedPayment(null);
                          setSelectedCardType(null);
                        }}
                        className={`text-xs ${
                          isDark
                            ? "text-slate-400 hover:text-slate-300"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        ← Back
                      </button>
                    </div>

                    <button
                      onClick={() => setSelectedCardType("visa")}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark
                          ? "border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20"
                          : "border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50"
                      }`}
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">
                          VISA
                        </span>
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        Visa
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedCardType("mastercard")}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark
                          ? "border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20"
                          : "border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50"
                      }`}
                    >
                      <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0 border border-gray-300">
                        <svg
                          width="32"
                          height="20"
                          viewBox="0 0 40 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="15" cy="14" r="8" fill="#EB001B" />
                          <circle cx="25" cy="14" r="8" fill="#F79E1B" />
                        </svg>
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        Mastercard
                      </span>
                    </button>
                  </>
                )}

                {/* Credit Card Form */}
                {selectedPayment === "credit-card" && selectedCardType && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        Card Details
                      </h3>
                      <button
                        onClick={() => {
                          setSelectedCardType(null);
                          setPaymentFormData({
                            cardNumber: "",
                            cardHolder: "",
                            cvv: "",
                            expiryDate: "",
                          });
                        }}
                        className={`text-xs ${
                          isDark
                            ? "text-slate-400 hover:text-slate-300"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        ← Change Card
                      </button>
                    </div>

                    <div
                      className={`p-4 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 space-y-3`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {selectedCardType === "visa" && (
                          <>
                            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-xs">
                                VISA
                              </span>
                            </div>
                            <span
                              className={`text-sm font-semibold ${
                                isDark ? "text-slate-100" : "text-slate-900"
                              }`}
                            >
                              Visa Card
                            </span>
                          </>
                        )}
                        {selectedCardType === "mastercard" && (
                          <>
                            <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0 border border-gray-300">
                              <svg
                                width="32"
                                height="20"
                                viewBox="0 0 40 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="15" cy="14" r="8" fill="#EB001B" />
                                <circle cx="25" cy="14" r="8" fill="#F79E1B" />
                              </svg>
                            </div>
                            <span
                              className={`text-sm font-semibold ${
                                isDark ? "text-slate-100" : "text-slate-900"
                              }`}
                            >
                              Mastercard
                            </span>
                          </>
                        )}
                      </div>

                      <div>
                        <label
                          className={`text-xs font-medium ${
                            isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentFormData.cardNumber}
                          onChange={handlePaymentChange}
                          placeholder="1234 5678 9012 3456"
                          className={`w-full px-3 py-2 mt-1 rounded border ${
                            isDark
                              ? "bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-500"
                              : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            className={`text-xs font-medium ${
                              isDark ? "text-slate-300" : "text-slate-700"
                            }`}
                          >
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={paymentFormData.expiryDate}
                            onChange={handlePaymentChange}
                            placeholder="MM/YY"
                            className={`w-full px-3 py-2 mt-1 rounded border ${
                              isDark
                                ? "bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-500"
                                : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        <div>
                          <label
                            className={`text-xs font-medium ${
                              isDark ? "text-slate-300" : "text-slate-700"
                            }`}
                          >
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={paymentFormData.cvv}
                            onChange={handlePaymentChange}
                            placeholder="123"
                            maxLength={3}
                            className={`w-full px-3 py-2 mt-1 rounded border ${
                              isDark
                                ? "bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-500"
                                : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (
                          paymentFormData.cardNumber.replace(/\s/g, "")
                            .length === 16 &&
                          paymentFormData.expiryDate.length === 5 &&
                          paymentFormData.cvv.length === 3
                        ) {
                          alert("Card added successfully!");
                          closeModal();
                        } else {
                          alert("Please fill all card details correctly");
                        }
                      }}
                      disabled={
                        paymentFormData.cardNumber.replace(/\s/g, "").length !==
                          16 ||
                        paymentFormData.expiryDate.length !== 5 ||
                        paymentFormData.cvv.length !== 3
                      }
                      className={`w-full py-2.5 rounded-lg font-semibold transition-all text-sm ${
                        paymentFormData.cardNumber.replace(/\s/g, "").length ===
                          16 &&
                        paymentFormData.expiryDate.length === 5 &&
                        paymentFormData.cvv.length === 3
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-400 text-gray-200 cursor-not-allowed"
                      }`}
                    >
                      Add Card
                    </button>
                  </>
                )}

                {/* E-wallet Button */}
                {!selectedPayment && (
                  <button
                    onClick={() => handleSelectPayment("e-wallet")}
                    className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      isDark
                        ? "border-slate-600 hover:border-slate-500 bg-slate-700/30"
                        : "border-gray-200 hover:border-gray-300 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-800 dark:bg-slate-700 rounded flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                        </svg>
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        E-Wallet
                      </span>
                    </div>
                  </button>
                )}

                {/* E-wallet Selection */}
                {selectedPayment === "e-wallet" && !selectedEwallet && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        Select E-Wallet
                      </h3>
                      <button
                        onClick={() => {
                          setSelectedPayment(null);
                          setSelectedEwallet(null);
                        }}
                        className={`text-xs ${
                          isDark
                            ? "text-slate-400 hover:text-slate-300"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        ← Back
                      </button>
                    </div>

                    <button
                      onClick={() => setSelectedEwallet("dana")}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark
                          ? "border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20"
                          : "border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50"
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">
                          DANA
                        </span>
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        DANA
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedEwallet("gopay")}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark
                          ? "border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20"
                          : "border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50"
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">GO</span>
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        GoPay
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedEwallet("shopeepay")}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark
                          ? "border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20"
                          : "border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50"
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-[10px]">
                          Shopee
                        </span>
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        ShopeePay
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedEwallet("ovo")}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        isDark
                          ? "border-slate-600 hover:border-blue-500 bg-slate-700/30 hover:bg-blue-900/20"
                          : "border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50"
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-500 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">
                          OVO
                        </span>
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        OVO
                      </span>
                    </button>
                  </>
                )}

                {/* E-wallet Phone Number Input */}
                {selectedPayment === "e-wallet" && selectedEwallet && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        Enter Phone Number
                      </h3>
                      <button
                        onClick={() => {
                          setSelectedEwallet(null);
                          setPhoneNumber("");
                        }}
                        className={`text-xs ${
                          isDark
                            ? "text-slate-400 hover:text-slate-300"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        ← Change E-Wallet
                      </button>
                    </div>

                    <div
                      className={`p-3 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {selectedEwallet === "dana" && (
                          <>
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-xs">
                                DANA
                              </span>
                            </div>
                            <span
                              className={`text-sm font-semibold ${
                                isDark ? "text-slate-100" : "text-slate-900"
                              }`}
                            >
                              DANA
                            </span>
                          </>
                        )}
                        {selectedEwallet === "gopay" && (
                          <>
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-xs">
                                GO
                              </span>
                            </div>
                            <span
                              className={`text-sm font-semibold ${
                                isDark ? "text-slate-100" : "text-slate-900"
                              }`}
                            >
                              GoPay
                            </span>
                          </>
                        )}
                        {selectedEwallet === "shopeepay" && (
                          <>
                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-[10px]">
                                Shopee
                              </span>
                            </div>
                            <span
                              className={`text-sm font-semibold ${
                                isDark ? "text-slate-100" : "text-slate-900"
                              }`}
                            >
                              ShopeePay
                            </span>
                          </>
                        )}
                        {selectedEwallet === "ovo" && (
                          <>
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-500 rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-xs">
                                OVO
                              </span>
                            </div>
                            <span
                              className={`text-sm font-semibold ${
                                isDark ? "text-slate-100" : "text-slate-900"
                              }`}
                            >
                              OVO
                            </span>
                          </>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          className={`text-xs font-medium ${
                            isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          Phone Number
                        </label>
                        <div className="flex gap-2">
                          <div
                            className={`px-3 py-2 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 flex items-center ${
                              isDark ? "text-slate-300" : "text-slate-700"
                            }`}
                          >
                            <span className="text-sm font-medium">+62</span>
                          </div>
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              setPhoneNumber(value);
                            }}
                            placeholder="812XXXXXXXX"
                            className={`flex-1 px-3 py-2 rounded border ${
                              isDark
                                ? "bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-500"
                                : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        <p
                          className={`text-[10px] ${
                            isDark ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          Enter your phone number registered with{" "}
                          {selectedEwallet === "dana"
                            ? "DANA"
                            : selectedEwallet === "gopay"
                            ? "GoPay"
                            : selectedEwallet === "shopeepay"
                            ? "ShopeePay"
                            : "OVO"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (phoneNumber.length >= 9) {
                          alert("E-wallet added successfully!");
                          closeModal();
                        } else {
                          alert("Please enter a valid phone number");
                        }
                      }}
                      disabled={phoneNumber.length < 9}
                      className={`w-full py-2.5 rounded-lg font-semibold transition-all text-sm ${
                        phoneNumber.length >= 9
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-400 text-gray-200 cursor-not-allowed"
                      }`}
                    >
                      Add E-Wallet
                    </button>
                  </>
                )}

                {/* Virtual Account Button */}
                {!selectedPayment && (
                  <button
                    onClick={() => handleSelectPayment("virtual-account")}
                    className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      isDark
                        ? "border-slate-600 hover:border-slate-500 bg-slate-700/30"
                        : "border-gray-200 hover:border-gray-300 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-800 dark:bg-slate-700 rounded flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path
                            fillRule="evenodd"
                            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        Virtual Account
                      </span>
                    </div>
                  </button>
                )}

                {/* Virtual Account Confirmation */}
                {selectedPayment === "virtual-account" && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        Virtual Account
                      </h3>
                      <button
                        onClick={() => setSelectedPayment(null)}
                        className={`text-xs ${
                          isDark
                            ? "text-slate-400 hover:text-slate-300"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        ← Back
                      </button>
                    </div>

                    <div
                      className={`p-4 rounded-lg ${
                        isDark ? "bg-slate-700/50" : "bg-gray-100"
                      }`}
                    >
                      <p
                        className={`text-sm ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        You will be able to select your bank when making a
                        payment
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        alert("Virtual Account added successfully!");
                        closeModal();
                      }}
                      className="w-full py-2.5 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 transition-all text-sm"
                    >
                      Confirm
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL - Confirm Payment */}
      {isModalOpen && modalType === "confirm" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`rounded-2xl shadow-2xl w-full max-w-md ${
              isDark ? "bg-slate-800" : "bg-white"
            }`}
          >
            <div
              className={`p-6 border-b ${
                isDark ? "border-slate-700" : "border-gray-200"
              }`}
            >
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                Select Payment Method
              </h2>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={() => {
                  setSelectedConfirmPayment("visa");
                  setModalType("summary");
                }}
                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                  selectedConfirmPayment === "visa"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : isDark
                    ? "border-slate-600 hover:border-slate-500 bg-slate-700/30"
                    : "border-gray-200 hover:border-gray-300 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">
                    VISA
                  </div>
                  <div>
                    <p className="font-medium text-sm">Credit card</p>
                    <p
                      className={`text-xs ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      •••• •••• •••• 4007
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedConfirmPayment("dana");
                  setModalType("summary");
                }}
                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                  selectedConfirmPayment === "dana"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : isDark
                    ? "border-slate-600 hover:border-slate-500 bg-slate-700/30"
                    : "border-gray-200 hover:border-gray-300 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                    D
                  </div>
                  <div>
                    <p className="font-medium text-sm">E-wallet (Dana)</p>
                    <p
                      className={`text-xs ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      62•• •••• •85
                    </p>
                  </div>
                </div>
              </button>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeModal}
                  className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-colors ${
                    isDark
                      ? "bg-slate-700 text-slate-100 hover:bg-slate-600"
                      : "bg-gray-200 text-slate-900 hover:bg-gray-300"
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL - Payment Summary */}
      {isModalOpen && modalType === "summary" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`rounded-2xl shadow-2xl w-full max-w-md ${
              isDark ? "bg-slate-800" : "bg-white"
            }`}
          >
            <div
              className={`p-6 border-b ${
                isDark ? "border-slate-700" : "border-gray-200"
              }`}
            >
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                Payment Summary
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div
                className={`p-4 rounded-lg border ${
                  isDark
                    ? "bg-slate-700/50 border-slate-600"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-sm ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Plan
                  </span>
                  <span
                    className={`font-semibold ${
                      isDark ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    Professional
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-sm ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Payment Method
                  </span>
                  <span
                    className={`font-semibold ${
                      isDark ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    {selectedConfirmPayment === "visa"
                      ? "VISA •••• 4007"
                      : "Dana 62•• •85"}
                  </span>
                </div>
                <div
                  className={`pt-3 mt-3 border-t ${
                    isDark ? "border-slate-600" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-semibold ${
                        isDark ? "text-slate-100" : "text-slate-900"
                      }`}
                    >
                      Total
                    </span>
                    <span
                      className={`text-2xl font-bold ${
                        isDark ? "text-slate-100" : "text-slate-900"
                      }`}
                    >
                      $1XX
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setModalType("confirm")}
                  className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-colors ${
                    isDark
                      ? "bg-slate-700 text-slate-100 hover:bg-slate-600"
                      : "bg-gray-200 text-slate-900 hover:bg-gray-300"
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    alert("Payment successful!");
                    closeModal();
                  }}
                  className="flex-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
