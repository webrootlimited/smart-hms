'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

export default function PaymentsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back to Dashboard Button */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto py-2">
                    <Link href="/patient/dashboard"
                        className="w-fit md:w-auto flex items-center justify-center md:justify-start space-x-3 px-5 py-2 hover:bg-gray-200 rounded-xl transition text-gray-800 font-medium text-base"
                    >
                        <span className="text-xl">←</span>
                        <span>Back to Dashboard</span>
                    </Link>
                </div>
            </div>

            <div className="p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900">Payments & Cards</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Manage your payment methods and copays
                        </p>
                    </div>

                    {/* Top Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-200">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="text-green-600 text-xl">✓</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Current Balance</p>
                                    <p className="text-2xl font-bold text-gray-900">$0.00</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-200">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-blue-600 text-2xl">💳</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Payment Methods</p>
                                    <p className="text-2xl font-bold text-gray-900">3</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-200">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                    <span className="text-purple-600 text-2xl">$</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Paid This Year</p>
                                    <p className="text-2xl font-bold text-gray-900">$145.00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods Section */}
                    <section className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
                            >
                                + Add Payment Method
                            </button>
                        </div>

                        {/* Responsive Card Grid */}


                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {/* VISA Card */}
                            <div>
                                <div className="bg-[linear-gradient(270deg,_#4D8BE9_22.29%,_#2F548B_54.27%)] rounded-2xl p-6 text-white shadow-lg mb-3">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center space-x-2">
                                            {/* Card icon */}
                                            <CreditCard className="w-6 h-6 text-white/80" />
                                            <p className="text-sm font-medium opacity-90">VISA</p>
                                        </div>
                                    </div>

                                    <p className="text-xl font-mono tracking-wider mt-3">•••• •••• •••• 4242</p>

                                    <div className="flex justify-between items-center mt-4">
                                        <div>
                                            <p className="text-sm font-medium">John Doe</p>
                                            <p className="text-xs opacity-80">Cardholder</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs opacity-80">Expires</p>
                                            <p className="text-sm mt-1">12/25</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <button className="flex-1 border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 text-sm px-4 py-2 rounded-lg">
                                        Set as Primary
                                    </button>
                                    <button className="w-fit border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 text-sm px-4 py-2 rounded-lg">
                                        Edit
                                    </button>
                                    <button className="w-fit border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 text-sm px-4 py-2 rounded-lg">
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* HSA Card */}
                            <div>
                                <div className="bg-[linear-gradient(135deg,_#00C950_0%,_#008236_100%)] rounded-2xl p-6 text-white shadow-lg mb-3">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center space-x-2">
                                            <CreditCard className="w-6 h-6 text-white/80" />
                                            <p className="text-sm font-medium opacity-90">HSA</p>
                                        </div>
                                    </div>

                                    <p className="text-xl font-mono tracking-wider mt-3">•••• •••• •••• 8901</p>

                                    <div className="flex justify-between items-center mt-4">
                                        <div>
                                            <p className="text-sm font-medium">John Doe</p>
                                            <p className="text-xs opacity-80">Cardholder</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs opacity-80">Expires</p>
                                            <p className="text-sm mt-1">06/26</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <button className="flex-1 border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 text-sm px-4 py-2 rounded-lg">
                                        Set as Primary
                                    </button>
                                    <button className="w-fit border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 text-sm px-4 py-2 rounded-lg">
                                        Edit
                                    </button>
                                    <button className="w-fit border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 text-sm px-4 py-2 rounded-lg">
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* Mastercard */}
                            <div>
                                <div className="bg-[linear-gradient(135deg,_#AD46FF_0%,_#8200DB_100%)] rounded-2xl p-6 text-white shadow-lg mb-3">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center space-x-2">
                                            <CreditCard className="w-6 h-6 text-white/80" />
                                            <p className="text-sm font-medium opacity-90">MASTERCARD</p>
                                        </div>
                                    </div>

                                    <p className="text-xl font-mono tracking-wider mt-3">•••• •••• •••• 5678</p>

                                    <div className="flex justify-between items-center mt-4">
                                        <div>
                                            <p className="text-sm font-medium">John Doe</p>
                                            <p className="text-xs opacity-80">Cardholder</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs opacity-80">Expires</p>
                                            <p className="text-sm mt-1">09/24</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <button className="flex-1 border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 text-sm px-4 py-2 rounded-lg">
                                        Set as Primary
                                    </button>
                                    <button className="w-fit border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 text-sm px-4 py-2 rounded-lg">
                                        Edit
                                    </button>
                                    <button className="w-fit border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 text-sm px-4 py-2 rounded-lg">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* HSA & FSA Banner */}
                        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-600 text-sm font-bold">i</span>
                                </div>
                                <div>
                                    <p className="text-base font-medium text-blue-900">HSA & FSA Accepted</p>
                                    <p className="text-sm text-blue-800 mt-1">
                                        We accept Health Savings Account (HSA) and Flexible Spending Account (FSA) cards for eligible medical expenses. Make sure to use these cards for qualified healthcare services.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Insurance Information */}
                    <section className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                                <span className="text-green-600 text-xl">🛡️</span>
                                <span>Insurance Information</span>
                            </h2>
                            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                                Verified
                            </span>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Insurance Provider</p>
                                    <p className="text-lg font-semibold mt-1">Blue Cross Blue Shield</p>

                                    <div className="mt-5 space-y-3 text-sm">
                                        <p><span className="text-gray-600">Member ID:</span> ABC23456789</p>
                                        <p><span className="text-gray-600">Group Number:</span> GRP987654</p>
                                        <p><span className="text-gray-600">Plan Type:</span> PPO</p>
                                    </div>

                                    <div className="mt-6 flex space-x-4">
                                        <button className="text-blue-600 text-sm font-medium hover:underline">View Insurance Card</button>
                                        <button className="text-blue-600 text-sm font-medium hover:underline">Update Insurance</button>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-900 mb-4">Your Copay Amounts</p>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between"><span className="text-gray-700">Primary Care Visit</span><span className="font-medium">$25</span></div>
                                        <div className="flex justify-between"><span className="text-gray-700">Specialist Visit</span><span className="font-medium">$50</span></div>
                                        <div className="flex justify-between"><span className="text-gray-700">Urgent Care</span><span className="font-medium">$75</span></div>
                                        <div className="flex justify-between"><span className="text-gray-700">Emergency Room</span><span className="font-medium">$15</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Recent Payments */}
                    <section className="mb-12">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Payments</h2>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-200">
                            {[
                                { title: "Annual Physical", date: "December 16, 2025", method: "Visa •••• 4242", amount: "$70" },
                                { title: "Cardiology Follow-up", date: "November 21, 2025", method: "HSA •••• 8901", amount: "$45.00" },
                                { title: "Lab Tests", date: "November 6, 2025", method: "Visa •••• 4242", amount: "$30.00" },
                            ].map((payment, i) => (
                                <div key={i} className="p-5 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="text-green-600 text-lg">✓</span>
                                        </div>
                                        <div>
                                            <p className="text-base font-medium text-gray-900">{payment.title}</p>
                                            <p className="text-sm text-gray-600">{payment.date} • {payment.method}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-base font-medium text-gray-900">{payment.amount}</p>
                                        <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full mt-1 inline-block">Completed</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 text-center">
                            <button className="text-blue-600 text-sm font-medium hover:underline">View All Payments</button>
                        </div>
                    </section>

                    {/* Security Footer */}
                    <div className="bg-blue-50 rounded-2xl p-6 text-center">
                        <p className="text-base text-blue-900 font-medium">Secure & Easy Payments</p>
                        <p className="text-sm text-blue-800 mt-2 max-w-2xl mx-auto">
                            All payment information is encrypted and processed securely. We never store your full card details. You can set up autopay for copays or pay invoices anytime through the portal.
                        </p>
                        <p className="text-sm text-blue-700 mt-3 font-mono">256-bit SSL encryption</p>
                    </div>
                </div>
            </div>

            {/* Add Payment Method Modal */}
            {isModalOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsModalOpen(false)} />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="relative px-6 pt-6 pb-4 border-b border-gray-200">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl font-light"
                                >
                                    ×
                                </button>
                                <h3 className="text-xl font-semibold text-gray-900">Add Payment Method</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Add a credit card, debit card, or HSA/FSA card to your account
                                </p>
                            </div>

                            {/* Scrollable Body */}
                            <div className="flex-1 overflow-y-auto px-6 py-6">
                                <form className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>Select card type</option>
                                            <option>Credit Card</option>
                                            <option>Debit Card</option>
                                            <option>HSA/FSA Card</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                                        <input
                                            type="text"
                                            defaultValue="John Doe"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                        <input
                                            type="text"
                                            defaultValue="1234 5678 9012 3456"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                            <input
                                                type="text"
                                                defaultValue="123"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Billing ZIP Code</label>
                                        <input
                                            type="text"
                                            defaultValue="10001"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="bg-blue-50 rounded-xl px-4 py-3 flex items-center space-x-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 text-lg">🔒</span>
                                        </div>
                                        <p className="text-sm text-blue-900">
                                            Your payment information is encrypted and secure
                                        </p>
                                    </div>
                                </form>
                            </div>

                            {/* Fixed Footer */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">
                                    Add Card
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}