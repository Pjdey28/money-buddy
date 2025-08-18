'use client'

import { useState, useEffect } from 'react'
import { 
  PlusCircle, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Target,
  Calendar,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Camera,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data for demonstration
const mockData = {
  balance: 12750,
  monthlyIncome: 15000,
  monthlyExpenses: 8250,
  savings: 4500,
  recentTransactions: [
    { id: 1, type: 'expense', amount: 120, category: 'Food', description: 'Lunch at Canteen', time: '2 hours ago', icon: '🍽️' },
    { id: 2, type: 'income', amount: 500, category: 'Tutoring', description: 'Math tutoring session', time: '1 day ago', icon: '📚' },
    { id: 3, type: 'expense', amount: 80, category: 'Transport', description: 'Bus fare', time: '2 days ago', icon: '🚌' },
    { id: 4, type: 'expense', amount: 200, category: 'Entertainment', description: 'Movie tickets', time: '3 days ago', icon: '🎬' },
    { id: 5, type: 'expense', amount: 450, category: 'Shopping', description: 'New headphones', time: '4 days ago', icon: '🎧' },
  ],
  goals: [
    { id: 1, name: 'Trip to Darjeeling', target: 5000, current: 2800, color: 'bg-blue-500' },
    { id: 2, name: 'New Laptop', target: 45000, current: 12000, color: 'bg-purple-500' },
    { id: 3, name: 'Emergency Fund', target: 10000, current: 6500, color: 'bg-green-500' },
  ],
  alerts: [
    { id: 1, message: 'You\'re 75% through your Food budget this week', type: 'warning' },
    { id: 2, message: 'Great job! You saved ₹200 more than last month', type: 'success' },
    { id: 3, message: 'Rent due in 3 days', type: 'info' },
  ],
  upcomingEvents: [
    { id: 1, name: 'Tech Fest 2025', date: '15 days', estimatedCost: 2000 },
    { id: 2, name: 'Friend\'s Birthday', date: '8 days', estimatedCost: 500 },
  ]
}

const categoryColors = {
  'Food': 'bg-orange-100 text-orange-800 border-orange-200',
  'Transport': 'bg-blue-100 text-blue-800 border-blue-200',
  'Entertainment': 'bg-purple-100 text-purple-800 border-purple-200',
  'Education': 'bg-green-100 text-green-800 border-green-200',
  'Shopping': 'bg-pink-100 text-pink-800 border-pink-200',
  'Health': 'bg-teal-100 text-teal-800 border-teal-200',
  'Bills': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'Tutoring': 'bg-emerald-100 text-emerald-800 border-emerald-200',
}

export default function Dashboard() {
  const [quickAmount, setQuickAmount] = useState('')
  const [quickCategory, setQuickCategory] = useState('Food')
  const [showQuickAdd, setShowQuickAdd] = useState(false)

  const handleQuickAdd = () => {
    if (quickAmount) {
      // Mock adding expense
      console.log(`Added ₹${quickAmount} for ${quickCategory}`)
      setQuickAmount('')
      setShowQuickAdd(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Good morning, Alex! 👋</h1>
          <p className="text-gray-600 mt-1">Here's your financial overview</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setShowQuickAdd(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
          <Button variant="outline" className="border-2">
            <Camera className="h-4 w-4 mr-2" />
            Scan Receipt
          </Button>
        </div>
      </div>

      {/* Quick Add Modal */}
      {showQuickAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                Quick Add Expense
              </CardTitle>
              <CardDescription>Log your expense in under 5 seconds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={quickAmount}
                  onChange={(e) => setQuickAmount(e.target.value)}
                  className="text-lg"
                />
                <select 
                  value={quickCategory}
                  onChange={(e) => setQuickCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Entertainment</option>
                  <option>Shopping</option>
                  <option>Education</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleQuickAdd} className="flex-1">Add Expense</Button>
                <Button variant="outline" onClick={() => setShowQuickAdd(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 font-medium">Current Balance</p>
                <p className="text-2xl font-bold text-green-900">₹{mockData.balance.toLocaleString()}</p>
              </div>
              <Wallet className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 font-medium">Monthly Income</p>
                <p className="text-2xl font-bold text-blue-900">₹{mockData.monthlyIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 font-medium">Monthly Expenses</p>
                <p className="text-2xl font-bold text-red-900">₹{mockData.monthlyExpenses.toLocaleString()}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 font-medium">Total Savings</p>
                <p className="text-2xl font-bold text-purple-900">₹{mockData.savings.toLocaleString()}</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {mockData.alerts.length > 0 && (
        <div className="space-y-3">
          {mockData.alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                alert.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                'bg-blue-50 border-blue-200 text-blue-800'
              }`}
            >
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                {alert.message}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{transaction.icon}</div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${categoryColors[transaction.category]}`}>
                            {transaction.category}
                          </span>
                          <span className="text-xs text-gray-500">{transaction.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {transaction.type === 'expense' ? (
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      )}
                      <span className={`font-bold ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                        ₹{transaction.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Savings Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Savings Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.goals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{goal.name}</span>
                    <span className="text-xs text-gray-500">
                      ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                  <div className="text-xs text-gray-500">
                    {Math.round((goal.current / goal.target) * 100)}% complete
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Goal
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{event.name}</p>
                      <p className="text-xs text-gray-500">in {event.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Est. cost</p>
                      <p className="font-bold text-sm">₹{event.estimatedCost}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
