"use client";

import { useState } from "react";
import { useUI } from "@/context/UIContext";
import Link from "next/link";
import SidebarPayment from "@/components/SidebarPayments";

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
    company: "Pt. Bilalmultidigital",
  });

  const [paymentFormData, setPaymentFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    cvv: "",
    expiryDate: "",
  });

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
      <SidebarPayment />

      <div className="ml-24">
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

          {/* TOP GRID: Package + Usage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Information Package */}
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
                      <span className="w-2 h-2 bg-white rounded-full" />
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

                <div className="flex gap-2 pt-2 flex-wrap">
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
                        confirm(
                          "Are you sure you want to cancel this package?",
                        )
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

            {/* System Usage Overview */}
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
                <h2 className="text-lg font-semibold">
                  System Usage Overview
                </h2>
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
                      className={
                        isDark ? "text-slate-400" : "text-slate-600"
                      }
                    >
                      Bandwidth
                    </span>
                    <span className="font-medium">50 / 100 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={
                        isDark ? "text-slate-400" : "text-slate-600"
                      }
                    >
                      API calls
                    </span>
                    <span className="font-medium">200K / 500K</span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={
                        isDark ? "text-slate-400" : "text-slate-600"
                      }
                    >
                      Media Assets
                    </span>
                    <span className="font-medium">1350 / 5000 file</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Address */}
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
                  <p
                    className={
                      isDark ? "text-slate-400" : "text-slate-600"
                    }
                  >
                    {formData.fullName}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">Billing Email</span>
                  <p
                    className={
                      isDark ? "text-slate-400" : "text-slate-600"
                    }
                  >
                    {formData.billingEmail}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">Country</span>
                  <p
                    className={
                      isDark ? "text-slate-400" : "text-slate-600"
                    }
                  >
                    {formData.country}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">City</span>
                  <p
                    className={
                      isDark ? "text-slate-400" : "text-slate-600"
                    }
                  >
                    {formData.city}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">
                    State / Province
                  </span>
                  <p
                    className={
                      isDark ? "text-slate-400" : "text-slate-600"
                    }
                  >
                    {formData.state}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">Zip</span>
                  <p
                    className={
                      isDark ? "text-slate-400" : "text-slate-600"
                    }
                  >
                    {formData.zip}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-sm font-medium">Address</span>
                  <p
                    className={
                      isDark ? "text-slate-400" : "text-slate-600"
                    }
                  >
                    {formData.address}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-sm font-medium">
                    Company (optional)
                  </span>
                  <p
                    className={
                      isDark ? "text-slate-400" : "text-slate-600"
                    }
                  >
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

          {/* Payment Information */}
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

          {/* Detail Project Usage + Billing History
              (bisa lanjutkan persis seperti di file lamamu) */}
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
                  {[
                    "fullName",
                    "billingEmail",
                    "country",
                    "city",
                    "state",
                    "zip",
                  ].map((field) => (
                    <div
                      key={field}
                      className={
                        field === "zip" || field === "state"
                          ? ""
                          : undefined
                      }
                    >
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        {field === "fullName"
                          ? "Full Name"
                          : field === "billingEmail"
                          ? "Billing Email"
                          : field === "country"
                          ? "Country"
                          : field === "city"
                          ? "City"
                          : field === "state"
                          ? "State / Province"
                          : "Zip"}
                      </label>
                      <input
                        type={field === "billingEmail" ? "email" : "text"}
                        name={field}
                        value={(formData as any)[field]}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded border ${
                          isDark
                            ? "bg-slate-700 border-slate-600 text-slate-100"
                            : "bg-white border-gray-300 text-slate-900"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                  ))}

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

        {/* Modal payment, confirm, summary bisa lanjut pakai kode lamamu
            dengan state yang sama seperti di atas. */}
      </div>
    </div>
  );
}
