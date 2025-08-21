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
    { id: 2, name: 'Friend Birthday', date: '8 days', estimatedCost: 500 },
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
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r from-orange-400 to-orange-800
           bg-clip-text text-transparent">Good morning, Ankit! 👋</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Here is your financial overview</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button 
            onClick={() => setShowQuickAdd(true)}
            className="bg-blue-500 hover:bg-blue-700 w-full sm:w-auto"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
          <Button variant="outline" className="border-2 w-full sm:w-auto">
            <Camera className="h-4 w-4 mr-2" />
            Scan Receipt
          </Button>
        </div>
      </div>

      {/* Quick Add Modal */}
      {showQuickAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md card-premium card-elevated">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-xl">
              <CardTitle className="flex items-center text-white">
                <Zap className="h-5 w-5 mr-2 text-yellow-300" />
                Quick Add Expense
              </CardTitle>
              <CardDescription className="text-purple-100">Log your expense in under 5 seconds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={quickAmount}
                  onChange={(e) => setQuickAmount(e.target.value)}
                  className="text-lg border-2 focus:border-purple-400"
                />
                <select 
                  value={quickCategory}
                  onChange={(e) => setQuickCategory(e.target.value)}
                  className="px-3 py-2 border-2 rounded-md focus:border-purple-400 bg-white"
                >
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Entertainment</option>
                  <option>Shopping</option>
                  <option>Education</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleQuickAdd} 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Add Expense
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowQuickAdd(false)}
                  className="border-2 hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <Card className="card-premium card-hover-lift transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 font-medium text-sm lg:text-base">Current Balance</p>
                <p className="text-xl lg:text-2xl font-bold text-green-900">₹{mockData.balance.toLocaleString()}</p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.2% this month
                </div>
              </div>
              <div className="p-2 lg:p-3 rounded-full bg-gradient-to-r from-green-400 to-green-600">
                <Wallet className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glass card-hover-lift transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 font-medium text-sm lg:text-base">Monthly Income</p>
                <p className="text-xl lg:text-2xl font-bold text-blue-900">₹{mockData.monthlyIncome.toLocaleString()}</p>
                <div className="flex items-center text-xs text-blue-600 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  Stable income
                </div>
              </div>
              <div className="p-2 lg:p-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600">
                <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated card-hover-lift transition-all duration-300 bg-gradient-to-br from-red-50 to-rose-100 border-red-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 font-medium text-sm lg:text-base">Monthly Expenses</p>
                <p className="text-xl lg:text-2xl font-bold text-red-900">₹{mockData.monthlyExpenses.toLocaleString()}</p>
                <div className="flex items-center text-xs text-red-600 mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -3.1% vs last month
                </div>
              </div>
              <div className="p-2 lg:p-3 rounded-full bg-gradient-to-r from-red-400 to-red-600">
                <TrendingDown className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-border-gradient card-hover-lift transition-all duration-300 bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 sm:col-span-2 xl:col-span-1">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 font-medium text-sm lg:text-base">Total Savings</p>
                <p className="text-xl lg:text-2xl font-bold text-purple-900">₹{mockData.savings.toLocaleString()}</p>
                <div className="flex items-center text-xs text-purple-600 mt-1">
                  <Target className="h-3 w-3 mr-1" />
                  30% of income
                </div>
              </div>
              <div className="p-2 lg:p-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600">
                <Target className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
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
              className={`p-4 rounded-xl border card-glass transition-all duration-200 hover:shadow-lg ${
                alert.type === 'warning' ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 text-yellow-800' :
                alert.type === 'success' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800' :
                'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 text-blue-800'
              }`}
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${
                  alert.type === 'warning' ? 'bg-yellow-200' :
                  alert.type === 'success' ? 'bg-green-200' :
                  'bg-blue-200'
                }`}>
                  <Bell className="h-4 w-4" />
                </div>
                <span className="font-medium">{alert.message}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Recent Transactions */}
        <div className="xl:col-span-2">
          <Card className="card-premium">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl border-b">
              <CardTitle className="text-gray-900 text-lg lg:text-xl">Recent Transactions</CardTitle>
              <CardDescription className="text-gray-600">Your latest financial activity</CardDescription>
            </CardHeader>
            <CardContent className="p-4 lg:p-6">
              <div className="space-y-3 lg:space-y-4">
                {mockData.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 lg:p-4 rounded-xl bg-gradient-to-r from-white/80 to-white/60 border border-white/30 hover:shadow-md transition-all duration-200 card-hover-lift">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="text-2xl lg:text-3xl p-2 rounded-full bg-white/80">
                        {transaction.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm lg:text-base">{transaction.description}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1 space-y-1 sm:space-y-0">
                          <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium border-2 ${categoryColors[transaction.category]}`}>
                            {transaction.category}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{transaction.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className={`p-1 rounded-full mr-2 ${transaction.type === 'expense' ? 'bg-red-100' : 'bg-green-100'}`}>
                        {transaction.type === 'expense' ? (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <span className={`font-bold text-base lg:text-lg ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
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
        <div className="space-y-4 lg:space-y-6">
          {/* Savings Goals */}
          <Card className="card-glass card-floating">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-xl">
              <CardTitle className="flex items-center text-white text-lg">
                <Target className="h-5 w-5 mr-2" />
                Savings Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 lg:p-6">
              {mockData.goals.map((goal) => (
                <div key={goal.id} className="space-y-3 p-3 lg:p-4 rounded-xl bg-gradient-to-r from-white/90 to-white/80 border border-white/40">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm text-gray-900">{goal.name}</span>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} className="h-2 lg:h-3" />
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-600">
                      {Math.round((goal.current / goal.target) * 100)}% complete
                    </div>
                    <div className="text-xs font-medium text-purple-600">
                      ₹{(goal.target - goal.current).toLocaleString()} to go
                    </div>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-4 border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Goal
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="card-border-gradient">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-xl">
              <CardTitle className="flex items-center text-white text-lg">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 lg:p-6">
              {mockData.upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 lg:p-4 rounded-xl bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200 hover:shadow-lg transition-all duration-200 card-hover-lift">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{event.name}</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-3 w-3 text-green-600 mr-1" />
                        <p className="text-xs text-green-700 font-medium">in {event.date}</p>
                      </div>
                    </div>
                    <div className="text-right bg-white/80 p-2 rounded-lg">
                      <p className="text-xs text-gray-500">Est. cost</p>
                      <p className="font-bold text-sm text-gray-900">₹{event.estimatedCost}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-4 border-2 border-green-200 hover:bg-green-50 hover:border-green-300 transition-all"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
