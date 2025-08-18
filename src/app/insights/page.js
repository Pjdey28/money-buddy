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
    description: "You&apos;ve spent 20% more on food this week compared to last week. Consider cooking more meals at home.",
    type: "warning",
    icon: "🍽️"
  },
  {
    title: "Savings Milestone",
    description: "Great job! You&apos;ve saved ₹200 more than your target this month.",
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
          <h1 className="text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Financial Insights</h1>
          <p className="text-gray-600 mt-1">Deep dive into your spending patterns and trends</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="flex items-center justify-center space-x-2 border-2 hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center space-x-2 border-2 hover:bg-gray-50">
            <Calendar className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card className="card-premium card-hover-lift transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 font-medium text-sm lg:text-base">Savings Rate</p>
                <p className="text-2xl lg:text-3xl font-bold text-green-900">{savingsRate}%</p>
                <p className="text-xs lg:text-sm text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                  +2.3% from last month
                </p>
              </div>
              <div className="p-2 lg:p-3 rounded-full bg-gradient-to-r from-green-400 to-green-600">
                <TrendingUp className="h-8 w-8 lg:h-12 lg:w-12 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glass card-hover-lift transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 font-medium text-sm lg:text-base">Avg. Daily Spend</p>
                <p className="text-2xl lg:text-3xl font-bold text-blue-900">₹{Math.round(totalExpenses / 30)}</p>
                <p className="text-xs lg:text-sm text-blue-600 flex items-center mt-1">
                  <ArrowDown className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                  -₹15 from last month
                </p>
              </div>
              <div className="p-2 lg:p-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600">
                <BarChart3 className="h-8 w-8 lg:h-12 lg:w-12 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-border-gradient card-hover-lift transition-all duration-300 bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 font-medium text-sm lg:text-base">Budget Utilization</p>
                <p className="text-2xl lg:text-3xl font-bold text-purple-900">67%</p>
                <p className="text-xs lg:text-sm text-purple-600 flex items-center mt-1">
                  <Eye className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                  ₹3,300 remaining
                </p>
              </div>
              <div className="p-2 lg:p-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600">
                <PieChart className="h-8 w-8 lg:h-12 lg:w-12 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Category Breakdown */}
        <Card className="card-premium">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-t-xl border-b">
            <CardTitle className="flex items-center text-gray-900">
              <PieChart className="h-5 w-5 mr-2 text-orange-600" />
              Spending by Category
            </CardTitle>
            <CardDescription className="text-gray-600">Where your money goes this month</CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-6">
            <div className="space-y-4">
              {mockInsights.categorySpending.map((category, index) => (
                <div key={index} className="space-y-2 p-3 rounded-lg bg-gradient-to-r from-white/80 to-white/60 border border-white/30 hover:shadow-md transition-all">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm lg:text-base text-gray-900">{category.category}</span>
                    <div className="text-right">
                      <div className="font-bold text-sm lg:text-base text-gray-900">₹{category.amount.toLocaleString()}</div>
                      <div className="text-xs lg:text-sm text-gray-500">{category.percentage}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 lg:h-3">
                    <div 
                      className={`${category.color} h-2 lg:h-3 rounded-full transition-all duration-500 shadow-sm`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Spending Pattern */}
        <Card className="card-glass">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-xl border-b">
            <CardTitle className="flex items-center text-gray-900">
              <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
              Weekly Spending Pattern
            </CardTitle>
            <CardDescription className="text-gray-600">Your spending habits throughout the week</CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-6">
            <div className="space-y-4">
              {mockInsights.weeklySpending.map((day, index) => {
                const maxAmount = Math.max(...mockInsights.weeklySpending.map(d => d.amount))
                const percentage = (day.amount / maxAmount) * 100
                
                return (
                  <div key={index} className="flex items-center space-x-3 lg:space-x-4 p-2 rounded-lg hover:bg-white/50 transition-all">
                    <div className="w-8 lg:w-12 text-xs lg:text-sm font-medium text-gray-900">{day.day}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2 lg:h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 lg:h-3 rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 lg:w-16 text-xs lg:text-sm font-bold text-right text-gray-900">₹{day.amount}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="card-elevated">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-t-xl border-b">
          <CardTitle className="flex items-center text-gray-900">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            6-Month Financial Trend
          </CardTitle>
          <CardDescription className="text-gray-600">Track your income, expenses, and savings over time</CardDescription>
        </CardHeader>
        <CardContent className="p-4 lg:p-6">
          <div className="space-y-4 lg:space-y-6">
            {mockInsights.monthlyTrends.map((month, index) => (
              <div key={index} className="space-y-2 p-3 lg:p-4 rounded-xl bg-gradient-to-r from-white/90 to-white/80 border border-white/40 hover:shadow-lg transition-all">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                  <span className="font-medium text-base lg:text-lg text-gray-900">{month.month}</span>
                  <div className="flex flex-col sm:flex-row sm:space-x-4 lg:space-x-6 text-xs lg:text-sm space-y-1 sm:space-y-0">
                    <span className="text-green-600 font-medium">Income: ₹{month.income.toLocaleString()}</span>
                    <span className="text-red-600 font-medium">Expenses: ₹{month.expenses.toLocaleString()}</span>
                    <span className="text-blue-600 font-bold">Savings: ₹{month.savings.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex space-x-1 h-3 lg:h-4 rounded-lg overflow-hidden shadow-sm">
                  <div 
                    className="bg-gradient-to-r from-red-400 to-red-500"
                    style={{ width: `${(month.expenses / month.income) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-500"
                    style={{ width: `${(month.savings / month.income) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="card-border-gradient">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
          <CardTitle className="flex items-center text-white">
            🤖 AI-Powered Insights
          </CardTitle>
          <CardDescription className="text-indigo-100">Personalized recommendations based on your spending patterns</CardDescription>
        </CardHeader>
        <CardContent className="p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border-l-4 card-hover-lift transition-all duration-200 ${
                  insight.type === 'warning' ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400' :
                  insight.type === 'success' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400' :
                  'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-400'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl lg:text-3xl">{insight.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm lg:text-base">{insight.title}</h4>
                    <p className="text-xs lg:text-sm text-gray-600 mt-1 leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Period Tabs */}
      <Card className="card-premium">
        <CardHeader>
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="week" className="text-xs lg:text-sm">This Week</TabsTrigger>
              <TabsTrigger value="month" className="text-xs lg:text-sm">This Month</TabsTrigger>
              <TabsTrigger value="year" className="text-xs lg:text-sm">This Year</TabsTrigger>
            </TabsList>
            
            <div className="p-4 lg:p-6">
              <TabsContent value="week" className="space-y-4 mt-4">
                <div className="text-center p-6 lg:p-8 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <h3 className="text-lg lg:text-xl font-semibold mb-2 text-gray-900">Week Summary</h3>
                  <p className="text-gray-600 text-sm lg:text-base">Total spent: ₹2,780 | Daily average: ₹397</p>
                  <p className="text-sm lg:text-base text-green-600 mt-2 font-medium">15% under weekly budget 🎉</p>
                </div>
              </TabsContent>
              
              <TabsContent value="month" className="space-y-4 mt-4">
                <div className="text-center p-6 lg:p-8 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                  <h3 className="text-lg lg:text-xl font-semibold mb-2 text-gray-900">Month Summary</h3>
                  <p className="text-gray-600 text-sm lg:text-base">Total spent: ₹8,250 | Daily average: ₹275</p>
                  <p className="text-sm lg:text-base text-blue-600 mt-2 font-medium">Trending well for your monthly goals 📈</p>
                </div>
              </TabsContent>
              
              <TabsContent value="year" className="space-y-4 mt-4">
                <div className="text-center p-6 lg:p-8 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
                  <h3 className="text-lg lg:text-xl font-semibold mb-2 text-gray-900">Year Summary</h3>
                  <p className="text-gray-600 text-sm lg:text-base">Total spent: ₹49,550 | Monthly average: ₹8,258</p>
                  <p className="text-sm lg:text-base text-purple-600 mt-2 font-medium">Savings rate improved by 5% this year 🚀</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  )
}
