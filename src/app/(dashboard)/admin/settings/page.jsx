'use client';

import React from 'react';
import {
  Settings, Globe, Shield, Zap, Clock, Database, Bell,
  Mail, AlertTriangle, Lock, UserCheck, RefreshCw, Download, Upload,
  ChevronDown
} from 'lucide-react';

export default function SystemSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">System Settings</h1>
                <p className="text-xs text-gray-500 mt-0.5">Configure global system preferences and integrations</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Database className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Version</p>
                <p className="text-sm font-semibold text-gray-900">V2.4.1</p>
                <p className="text-xs text-green-600 flex items-center gap-1 justify-end">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Up to date
                </p>
              </div>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-xs text-gray-600 mb-1">Server Status</p>
              <p className="text-lg font-semibold text-green-800">Online</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-xs text-gray-600 mb-1">Security Status</p>
              <p className="text-lg font-semibold text-blue-800">Secure</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-xs text-gray-600 mb-1">Uptime</p>
              <p className="text-lg font-semibold text-purple-800">98.9%</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4">
              <p className="text-xs text-gray-600 mb-1">Last Backup</p>
              <p className="text-lg font-semibold text-yellow-800">2 days</p>
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
              <p className="text-xs text-gray-500">Basic system configuration</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Organization Name</label>
              <input
                type="text"
                defaultValue="Memorial Healthcare Center"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Time Zone</label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>(UTC-05:00) Eastern Time</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Primary Contact Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  defaultValue="admin@memorialhealthcare.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Website URL</label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="url"
                  defaultValue="https://memorialhealthcare.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security & Backup - Two Columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Security Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
                <p className="text-xs text-gray-500">Access control and authentication</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-600">Require 2FA for all admin users</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <p className="text-xs text-green-700 mt-2 ml-8">2FA is enabled for 24 users</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-xs text-gray-600 mb-2">Session Timeout</p>
                <div className="flex items-center gap-4">
                  <input type="number" defaultValue="30" className="w-20 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm" />
                  <span className="text-sm text-gray-700">minutes</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">Current: 30 minutes</p>
                <p className="text-xs text-gray-500 mt-1">Auto-logout users after inactivity</p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4">
                <p className="text-xs text-gray-600 mb-2">Maximum Login Attempts</p>
                <div className="flex items-center gap-4">
                  <input type="number" defaultValue="5" className="w-20 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm" />
                  <span className="text-sm text-gray-700">attempts</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">Current: 5 attempts</p>
                <p className="text-xs text-gray-500 mt-1">Lock account after failed attempts</p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Password Requirements</p>
                    <ul className="text-xs text-gray-600 mt-1 space-y-0.5">
                      <li>• Minimum 8 characters</li>
                      <li>• Require uppercase letters</li>
                      <li>• Require numbers</li>
                      <li>• Require special characters</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Backup & Recovery */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <RefreshCw className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Backup & Recovery</h2>
                <p className="text-xs text-gray-500">Data backup configuration</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Automatic Backups</p>
                      <p className="text-xs text-gray-600">Daily automated database backups</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Backup Frequency</p>
                  <p className="text-sm font-medium text-gray-900">Daily at 2:00 AM</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Last Backup</p>
                  <p className="text-sm font-medium text-gray-900">2 days ago</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Backup Size</p>
                  <p className="text-sm font-medium text-gray-900">2.4 GB</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Backup Location</p>
                  <input
                    type="text"
                    placeholder="Secure cloud storage"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm mt-1"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-2">Retention Period</p>
                  <p className="text-xs text-gray-500 mb-2">Keep backups for 90 days</p>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700">30 days</button>
                    <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">90 days</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700">365 days</button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  Download Backup
                </button>
                <button className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-purple-700">
                  <Upload className="w-4 h-4" />
                  Restore Backup
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Bell className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
              <p className="text-xs text-gray-500">System-wide notification settings</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                  <p className="text-xs text-gray-600">Send system alerts via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Critical Alerts</p>
                  <p className="text-xs text-gray-600">Notify admins of system issues</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pb-8">
          <button className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            Reset to Defaults
          </button>
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2">
            Save All Changes
          </button>
        </div>

      </div>
    </div>
  );
}