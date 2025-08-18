'use client'

import { useState } from 'react'
import { 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  ArrowUp,
  ArrowDown,
  Eye,
  Filter
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

// Mock data for charts and insights
const mockInsights = {
  weeklySpending: [
    { day: 'Mon', amount: 320 },
    { day: 'Tue', amount: 180 },
    { day: 'Wed', amount: 450 },
    { day: 'Thu', amount: 290 },
    { day: 'Fri', amount: 680 },
    { day: 'Sat', amount: 520 },
    { day: 'Sun', amount: 340 },
  ],
  categorySpending: [
    { category: 'Food', amount: 2800, percentage: 35, color: 'bg-orange-500' },
    { category: 'Transport', amount: 1200, percentage: 15, color: 'bg-blue-500' },
    { category: 'Entertainment', amount: 1600, percentage: 20, color: 'bg-purple-500' },
    { category: 'Education', amount: 800, percentage: 10, color: 'bg-green-500' },
    { category: 'Shopping', amount: 1200, percentage: 15, color: 'bg-pink-500' },
    { category: 'Other', amount: 400, percentage: 5, color: 'bg-gray-500' },
  ],
  monthlyTrends: [
    { month: 'Jan', income: 15000, expenses: 8200, savings: 6800 },
    { month: 'Feb', income: 15000, expenses: 7800, savings: 7200 },
    { month: 'Mar', income: 16000, expenses: 8500, savings: 7500 },
    { month: 'Apr', income: 15500, expenses: 8000, savings: 7500 },
    { month: 'May', income: 17000, expenses: 8800, savings: 8200 },
    { month: 'Jun', income: 16500, expenses: 8250, savings: 8250 },
  ]
}

const insights = [
  {
    title: "Food Spending Alert",
    description: "You've spent 20% more on food this week compared to last week. Consider cooking more meals at home.",
    type: "warning",
    icon: "🍽️"
  },
  {
    title: "Savings Milestone",
    description: "Great job! You've saved ₹200 more than your target this month.",
    type: "success",
    icon: "🎯"
  },
  {
    title: "Transport Optimization",
    description: "Using public transport on weekdays could save you ₹300/month.",
    type: "info",
    icon: "🚌"
  },
  {
    title: "Weekend Spending Pattern",
    description: "Your weekend expenses are 40% higher than weekdays. Budget accordingly.",
    type: "info",
    icon: "📅"
  }
]

export default function InsightsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  
  const totalIncome = mockInsights.monthlyTrends[mockInsights.monthlyTrends.length - 1].income
  const totalExpenses = mockInsights.monthlyTrends[mockInsights.monthlyTrends.length - 1].expenses
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Financial Insights</h1>
          <p className="text-gray-600 mt-1">Deep dive into your spending patterns and trends</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 font-medium">Savings Rate</p>
                <p className="text-3xl font-bold text-green-900">{savingsRate}%</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +2.3% from last month
                </p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 font-medium">Avg. Daily Spend</p>
                <p className="text-3xl font-bold text-blue-900">₹{Math.round(totalExpenses / 30)}</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  -₹15 from last month
                </p>
              </div>
              <BarChart3 className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 font-medium">Budget Utilization</p>
                <p className="text-3xl font-bold text-purple-900">67%</p>
                <p className="text-sm text-purple-600 flex items-center mt-1">
                  <Eye className="h-4 w-4 mr-1" />
                  ₹3,300 remaining
                </p>
              </div>
              <PieChart className="h-12 w-12 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Where your money goes this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockInsights.categorySpending.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.category}</span>
                    <div className="text-right">
                      <div className="font-bold">₹{category.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{category.percentage}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${category.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Spending Pattern */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Spending Pattern</CardTitle>
            <CardDescription>Your spending habits throughout the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockInsights.weeklySpending.map((day, index) => {
                const maxAmount = Math.max(...mockInsights.weeklySpending.map(d => d.amount))
                const percentage = (day.amount / maxAmount) * 100
                
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium">{day.day}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-16 text-sm font-bold text-right">₹{day.amount}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>6-Month Financial Trend</CardTitle>
          <CardDescription>Track your income, expenses, and savings over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockInsights.monthlyTrends.map((month, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg">{month.month}</span>
                  <div className="flex space-x-6 text-sm">
                    <span className="text-green-600">Income: ₹{month.income.toLocaleString()}</span>
                    <span className="text-red-600">Expenses: ₹{month.expenses.toLocaleString()}</span>
                    <span className="text-blue-600 font-bold">Savings: ₹{month.savings.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex space-x-1 h-4 rounded-lg overflow-hidden">
                  <div 
                    className="bg-red-400"
                    style={{ width: `${(month.expenses / month.income) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-blue-400"
                    style={{ width: `${(month.savings / month.income) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            🤖 AI-Powered Insights
          </CardTitle>
          <CardDescription>Personalized recommendations based on your spending patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  insight.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  insight.type === 'success' ? 'bg-green-50 border-green-400' :
                  'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{insight.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Period Tabs */}
      <Card>
        <CardHeader>
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="year">This Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="week" className="space-y-4">
            <div className="text-center p-8">
              <h3 className="text-lg font-semibold mb-2">Week Summary</h3>
              <p className="text-gray-600">Total spent: ₹2,780 | Daily average: ₹397</p>
              <p className="text-sm text-green-600 mt-2">15% under weekly budget 🎉</p>
            </div>
          </TabsContent>
          
          <TabsContent value="month" className="space-y-4">
            <div className="text-center p-8">
              <h3 className="text-lg font-semibold mb-2">Month Summary</h3>
              <p className="text-gray-600">Total spent: ₹8,250 | Daily average: ₹275</p>
              <p className="text-sm text-blue-600 mt-2">Trending well for your monthly goals 📈</p>
            </div>
          </TabsContent>
          
          <TabsContent value="year" className="space-y-4">
            <div className="text-center p-8">
              <h3 className="text-lg font-semibold mb-2">Year Summary</h3>
              <p className="text-gray-600">Total spent: ₹49,550 | Monthly average: ₹8,258</p>
              <p className="text-sm text-purple-600 mt-2">Savings rate improved by 5% this year 🚀</p>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  )
}
