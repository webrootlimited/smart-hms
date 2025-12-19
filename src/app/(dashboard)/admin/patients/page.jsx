'use client';

import React from 'react';
import { Search, MoreVertical, Calendar, Phone, Mail, MapPin, Shield, User, Heart, Activity, Clock, DollarSign, Edit, Trash2, Plus } from 'lucide-react';

export default function PatientManagementDashboard() {
  const patients = [
    {
      id: 'PT-2847',
      name: 'Sarah Anderson',
      age: 34,
      gender: 'Female',
      bloodType: 'O+',
      visits: 24,
      phone: '+1 (555) 123-4567',
      email: 'sarah.anderson@email.com',
      address: '742 Evergreen Terrace',
      insurance: 'Blue Cross',
      primaryDoctor: 'Dr. James Wilson',
      lastVisit: '2 days ago',
      nextAppointment: 'Dec 18, 2025',
      balance: 450.00,
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      active: true,
      avatarColor: 'bg-pink-500'
    },
    {
      id: 'PT-2846',
      name: 'Michael Chen',
      age: 42,
      gender: 'Male',
      bloodType: 'A+',
      visits: 18,
      phone: '+1 (555) 234-5678',
      email: 'michael.chen@email.com',
      address: '123 Oak Street, Boston',
      insurance: 'Aetna',
      primaryDoctor: 'Dr. Sarah Johnson',
      lastVisit: '5 days ago',
      nextAppointment: 'Dec 20, 2025',
      balance: 0.00,
      conditions: ['Asthma'],
      active: true,
      avatarColor: 'bg-blue-500'
    },
    {
      id: 'PT-2845',
      name: 'Emily Rodriguez',
      age: 28,
      gender: 'Female',
      bloodType: 'B+',
      visits: 12,
      phone: '+1 (555) 345-6789',
      email: 'emily.rodriguez@email.com',
      address: '456 Maple Ave, Los',
      insurance: 'United Health',
      primaryDoctor: 'Dr. Michael Brown',
      lastVisit: '1 week ago',
      nextAppointment: 'Not scheduled',
      balance: 125.50,
      conditions: [],
      active: true,
      avatarColor: 'bg-pink-500'
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div className="flex items-start md:items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl flex-shrink-0">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Patient Management</h1>
                  <p className="text-xs text-gray-500 mt-0.5">Manage all patient records and information</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 self-start md:self-center">
                <Plus className="w-4 h-4" />
                Export
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-100 rounded-xl p-4">
                <p className="text-2xl font-bold text-gray-900">2,847</p>
                <p className="text-xs text-gray-600 mt-1">Total Patients</p>
              </div>
              <div className="bg-green-100 rounded-xl p-4">
                <p className="text-2xl font-bold text-green-700">124</p>
                <p className="text-xs text-gray-600 mt-1">New This Month</p>
              </div>
              <div className="bg-purple-100 rounded-xl p-4">
                <p className="text-2xl font-bold text-purple-700">456</p>
                <p className="text-xs text-gray-600 mt-1">Appointments Today</p>
              </div>
              <div className="bg-pink-100 rounded-xl p-4">
                <p className="text-2xl font-bold text-pink-700">+18%</p>
                <p className="text-xs text-gray-600 mt-1">Growth Rate</p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, ID, phone, or email..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">All Patients</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">Active</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">New</button>
                <button className="p-2 bg-gray-100 rounded-lg">
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Patient List */}
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="bg-white rounded-2xl shadow-sm p-6">
                {/* Responsive Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${patient.avatarColor} rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
                      {patient.gender === 'Female' ? '♀' : '♂'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{patient.name}</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                          <span className="text-sm text-gray-500">{patient.id}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-600">
                        <span>{patient.age} years</span>
                        <span className="hidden xs:inline">•</span>
                        <span>{patient.gender}</span>
                        <span className="hidden xs:inline">•</span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {patient.bloodType}
                        </span>
                        <span className="hidden xs:inline">•</span>
                        <span className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          {patient.visits} visits
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg self-start sm:self-center">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* Patient Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                      <Phone className="w-3 h-3" />
                      Phone
                    </div>
                    <p className="text-sm font-medium text-gray-900">{patient.phone}</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                      <Mail className="w-3 h-3" />
                      Email
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate">{patient.email}</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                      <MapPin className="w-3 h-3" />
                      Address
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate">{patient.address}</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                      <Shield className="w-3 h-3" />
                      Insurance
                    </div>
                    <p className="text-sm font-medium text-gray-900">{patient.insurance}</p>
                  </div>
                </div>

                {/* Details Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Primary Doctor</p>
                    <p className="text-sm font-medium text-gray-900">{patient.primaryDoctor}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3 h-3 text-purple-600" />
                      <p className="text-xs text-gray-600">Last Visit</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{patient.lastVisit}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-3 h-3 text-green-600" />
                      <p className="text-xs text-gray-600">Next Appointment</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{patient.nextAppointment}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${patient.balance > 0 ? 'bg-yellow-100' : 'bg-green-50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-3 h-3 text-yellow-600" />
                      <p className="text-xs text-gray-600">Balance Due</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${patient.balance.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Conditions */}
                {patient.conditions.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-600 mb-2">Conditions:</p>
                    <div className="flex flex-wrap gap-2">
                      {patient.conditions.map((condition) => (
                        <span key={condition} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700">
                    <User className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-50">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-50">
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </button>
                  <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}

            {/* Load More */}
            <div className="flex justify-center mt-8">
              <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Load More Patients
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}