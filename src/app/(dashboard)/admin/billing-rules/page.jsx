
import React from 'react';
import { 
  DollarSign, CreditCard, Shield, Wallet, Banknote, Percent, Tag,
  Settings, Plus, Edit2, Trash2, Calculator, Save
} from 'lucide-react';

export default function BillingRulesConfiguration() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Billing Rules & Configuration</h1>
                <p className="text-xs text-gray-500 mt-0.5">Manage payment methods, pricing, and billing settings</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-5 py-2.5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2">
                <DollarSign className="w-4 h-4" />
                Create Invoice
              </button>
              <button className="px-5 py-2.5 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs text-green-700 mb-1">
                <span className="text-lg">↑15%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">$428K</p>
              <p className="text-xs text-gray-600 mt-1">Total Revenue</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs text-blue-700 mb-1">
                <span className="text-lg">↑8%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">$124K</p>
              <p className="text-xs text-gray-600 mt-1">Pending Payments</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs text-purple-700 mb-1">
                <span className="text-lg">↑12%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
              <p className="text-xs text-gray-600 mt-1">Total Invoices</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs text-yellow-700 mb-1">
                <span className="text-lg">↑6%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">96.4%</p>
              <p className="text-xs text-gray-600 mt-1">Collection Rate</p>
            </div>
          </div>
        </div>

        {/* Accepted Payment Methods */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Accepted Payment Methods</h2>
                <p className="text-xs text-gray-500">Configure how patients can pay</p>
              </div>
            </div>
            <button className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Method
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Credit/Debit Card */}
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Credit/Debit Card</p>
                    <p className="text-xs text-gray-600">Card Payment</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-gray-600">Transaction Fee</span><span className="font-medium">2.9% + $0.30</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Processing Time</span><span className="font-medium">Instant</span></div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-green-700 flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Active</span>
                <button className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Edit2 className="w-3 h-3" />Edit</button>
              </div>
            </div>

            {/* Insurance Claims */}
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Insurance Claims</p>
                    <p className="text-xs text-gray-600">Insurance</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-gray-600">Transaction Fee</span><span className="font-medium">0%</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Processing Time</span><span className="font-medium">14-30 days</span></div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-green-700 flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Active</span>
                <button className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Edit2 className="w-3 h-3" />Edit</button>
              </div>
            </div>

            {/* Cash Payment */}
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Banknote className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Cash Payment</p>
                    <p className="text-xs text-gray-600">Cash</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-gray-600">Transaction Fee</span><span className="font-medium">0%</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Processing Time</span><span className="font-medium">Instant</span></div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-green-700 flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Active</span>
                <button className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Edit2 className="w-3 h-3" />Edit</button>
              </div>
            </div>

            {/* Bank Transfer */}
            <div className="bg-yellow-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Bank Transfer</p>
                    <p className="text-xs text-gray-600">ACH Transfer</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-gray-600">Transaction Fee</span><span className="font-medium">0.8%</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Processing Time</span><span className="font-medium">1-3 days</span></div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-green-700 flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Active</span>
                <button className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Edit2 className="w-3 h-3" />Edit</button>
              </div>
            </div>

            {/* Digital Wallet */}
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Digital Wallet</p>
                    <p className="text-xs text-gray-600">Mobile Payment</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-gray-600">Transaction Fee</span><span className="font-medium">1.5%</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Processing Time</span><span className="font-medium">Instant</span></div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-500">Disabled</span>
                <button className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Edit2 className="w-3 h-3" />Edit</button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Tiers & Tax/Fee Settings */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pricing Tiers */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Tag className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Pricing Tiers</h2>
                  <p className="text-xs text-gray-500">Service pricing structure</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Basic Consultation */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Basic Consultation</p>
                    <p className="text-xs text-gray-600">Standard office visit</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">$15</p>
                </div>
                <ul className="text-xs text-gray-600 space-y-1 mb-3">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Physical Examination</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Medical History Review</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Basic Diagnosis</li>
                </ul>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-1">
                    <Edit2 className="w-3 h-3" />Edit
                  </button>
                  <button className="flex-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-1">
                    <Calculator className="w-3 h-3" />Calculate
                  </button>
                </div>
              </div>

              {/* Comprehensive Visit */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Comprehensive Visit</p>
                    <p className="text-xs text-gray-600">Detailed examination with tests</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">$35</p>
                </div>
                <ul className="text-xs text-gray-600 space-y-1 mb-3">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Full Physical Exam</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Lab Tests</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Imaging</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Treatment Plan</li>
                </ul>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-1">
                    <Edit2 className="w-3 h-3" />Edit
                  </button>
                  <button className="flex-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-1">
                    <Calculator className="w-3 h-3" />Calculate
                  </button>
                </div>
              </div>

              {/* Specialist Consultation */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Specialist Consultation</p>
                    <p className="text-xs text-gray-600">Expert specialist visit</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">$45</p>
                </div>
                <ul className="text-xs text-gray-600 space-y-1 mb-3">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Specialist Exam</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Advanced Diagnostics</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Treatment Protocol</li>
                </ul>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-1">
                    <Edit2 className="w-3 h-3" />Edit
                  </button>
                  <button className="flex-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-1">
                    <Calculator className="w-3 h-3" />Calculate
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tax & Fee Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Percent className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Tax & Fee Settings</h2>
                <p className="text-xs text-gray-500">Configure taxes and penalties</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-yellow-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">Sales Tax Rate</p>
                  <p className="text-xs text-gray-600">Current: 8.5%</p>
                </div>
                <input type="text" defaultValue="8.5%" className="w-full px-3 py-2 bg-white border border-yellow-300 rounded-lg text-sm font-medium" />
                <p className="text-xs text-gray-600 mt-2">Applied to all taxable services and products</p>
              </div>

              <div className="bg-pink-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">Late Payment Fee</p>
                  <p className="text-xs text-gray-600">Current: $25</p>
                </div>
                <input type="text" defaultValue="$25" className="w-full px-3 py-2 bg-white border border-pink-300 rounded-lg text-sm font-medium" />
                <p className="text-xs text-gray-600 mt-2">Charged after grace period expires</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">Payment Grace Period</p>
                  <p className="text-xs text-gray-600">Current: 30 days</p>
                </div>
                <input type="text" defaultValue="30" className="w-20 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm" />
                <span className="text-sm text-gray-700 ml-2">days</span>
                <p className="text-xs text-gray-600 mt-2">Days before late fee is applied</p>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Automatic Payment Reminders</p>
                    <p className="text-xs text-gray-600">Send reminders before due date</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2 mt-6">
                <Save className="w-4 h-4" />
                Save Configuration
              </button>
            </div>
          </div>
        </div>

        {/* Discount Rules */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Percent className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Discount Rules</h2>
                <p className="text-xs text-gray-500">Manage promotional offers and discounts</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Discount
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <Percent className="w-6 h-6 text-purple-600" />
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>Active
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Senior Citizens</p>
              <p className="text-xs text-gray-600 mb-3">Age 65 and above</p>
              <p className="text-2xl font-bold text-purple-700">-15%</p>
              <p className="text-xs text-gray-600">discount</p>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 text-xs text-blue-600 hover:underline flex items-center justify-center gap-1"><Edit2 className="w-3 h-3" />Edit</button>
                <button className="text-xs text-red-600 hover:underline flex items-center gap-1"><Trash2 className="w-3 h-3" />Delete</button>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <Percent className="w-6 h-6 text-green-600" />
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>Active
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Family Plan</p>
              <p className="text-xs text-gray-600 mb-3">3+ family members</p>
              <p className="text-2xl font-bold text-green-700">-20%</p>
              <p className="text-xs text-gray-600">discount</p>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 text-xs text-blue-600 hover:underline flex items-center justify-center gap-1"><Edit2 className="w-3 h-3" />Edit</button>
                <button className="text-xs text-red-600 hover:underline flex items-center gap-1"><Trash2 className="w-3 h-3" />Delete</button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <Percent className="w-6 h-6 text-blue-600" />
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>Active
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Early Payment</p>
              <p className="text-xs text-gray-600 mb-3">Pay within 7 days</p>
              <p className="text-2xl font-bold text-blue-700">-5%</p>
              <p className="text-xs text-gray-600">discount</p>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 text-xs text-blue-600 hover:underline flex items-center justify-center gap-1"><Edit2 className="w-3 h-3" />Edit</button>
                <button className="text-xs text-red-600 hover:underline flex items-center gap-1"><Trash2 className="w-3 h-3" />Delete</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}