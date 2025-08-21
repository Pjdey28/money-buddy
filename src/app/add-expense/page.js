'use client'

import { useState } from 'react'
import { 
  PlusCircle, 
  Camera, 
  DollarSign, 
  Calendar,
  Tag,
  Upload,
  Zap,
  Receipt,
  Smartphone
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const categories = [
  { name: 'Food', icon: '🍽️', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { name: 'Transport', icon: '🚌', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { name: 'Entertainment', icon: '🎬', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { name: 'Education', icon: '📚', color: 'bg-green-100 text-green-800 border-green-200' },
  { name: 'Shopping', icon: '🛍️', color: 'bg-pink-100 text-pink-800 border-pink-200' },
  { name: 'Health', icon: '🏥', color: 'bg-teal-100 text-teal-800 border-teal-200' },
  { name: 'Bills', icon: '📄', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  { name: 'Other', icon: '💰', color: 'bg-gray-100 text-gray-800 border-gray-200' },
]

const incomeCategories = [
  { name: 'Tutoring', icon: '📚', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { name: 'Part-time Job', icon: '💼', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { name: 'Freelance', icon: '💻', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { name: 'Allowance', icon: '💳', color: 'bg-green-100 text-green-800 border-green-200' },
  { name: 'Scholarship', icon: '🎓', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { name: 'Gig Work', icon: '🚗', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { name: 'Other', icon: '💰', color: 'bg-gray-100 text-gray-800 border-gray-200' },
]

export default function AddExpensePage() {
  const [activeTab, setActiveTab] = useState('expense')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [merchant, setMerchant] = useState('')
  const [isRecurring, setIsRecurring] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!amount || !selectedCategory) return
    
    const transaction = {
      type: activeTab,
      amount: parseFloat(amount),
      category: selectedCategory,
      description: description || `${activeTab} transaction`,
      date,
      merchant,
      isRecurring
    }
    
    console.log('Adding transaction:', transaction)
    // Here you would typically save to backend
    
    // Reset form
    setAmount('')
    setDescription('')
    setSelectedCategory(null)
    setMerchant('')
    setIsRecurring(false)
  }

  const categorizeFromMerchant = (merchantName) => {
    const lowercased = merchantName.toLowerCase()
    if (lowercased.includes('restaurant') || lowercased.includes('cafe') || lowercased.includes('food')) {
      setSelectedCategory('Food')
    } else if (lowercased.includes('uber') || lowercased.includes('bus') || lowercased.includes('metro')) {
      setSelectedCategory('Transport')
    } else if (lowercased.includes('movie') || lowercased.includes('netflix') || lowercased.includes('spotify')) {
      setSelectedCategory('Entertainment')
    } else if (lowercased.includes('book') || lowercased.includes('course') || lowercased.includes('university')) {
      setSelectedCategory('Education')
    }
  }

  const currentCategories = activeTab === 'expense' ? categories : incomeCategories

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Smart Expense Tracking</h1>
        <p className="text-gray-600 mt-1">Log expenses and income in under 5 seconds</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <Zap className="h-12 w-12 mx-auto text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Quick Add</h3>
            <p className="text-sm text-gray-600">1-tap expense logging</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6 text-center">
            <Camera className="h-12 w-12 mx-auto text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Scan Receipt</h3>
            <p className="text-sm text-gray-600">OCR auto-fill details</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
          <CardContent className="p-6 text-center">
            <Smartphone className="h-12 w-12 mx-auto text-orange-600 mb-3" />
            <h3 className="font-semibold text-gray-900">SMS Import</h3>
            <p className="text-sm text-gray-600">Auto-detect from SMS</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Form */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="expense" className="flex items-center space-x-2">
                <Receipt className="h-4 w-4" />
                <span>Add Expense</span>
              </TabsTrigger>
              <TabsTrigger value="income" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Add Income</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="pl-8 text-lg h-12"
                  required
                />
              </div>
            </div>

            {/* Merchant/Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === 'expense' ? 'Merchant/Place' : 'Income Source'}
              </label>
              <Input
                type="text"
                value={merchant}
                onChange={(e) => {
                  setMerchant(e.target.value)
                  categorizeFromMerchant(e.target.value)
                }}
                placeholder={activeTab === 'expense' ? "e.g., Canteen, Uber, Netflix" : "e.g., Tutoring, Part-time job"}
                className="h-12"
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category * {selectedCategory && (
                  <span className="text-green-600 ml-2">
                    ✓ Auto-detected
                  </span>
                )}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {currentCategories.map((category) => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => setSelectedCategory(category.name)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedCategory === category.name
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="text-xs font-medium">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`Brief description of this ${activeTab}`}
                className="h-12"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Recurring Option */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="recurring"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="recurring" className="text-sm text-gray-700">
                This is a recurring {activeTab}
              </label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-12 text-lg bg-blue-500 text-black "
              disabled={!amount || !selectedCategory}
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add {activeTab === 'expense' ? 'Expense' : 'Income'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Smart Features Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🤖 Auto-Categorization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              Our smart system automatically categorizes expenses based on merchant names and descriptions.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Accuracy Rate:</span>
                <span className="font-semibold text-green-600">87%</span>
              </div>
              <div className="flex justify-between">
                <span>Categories Learned:</span>
                <span className="font-semibold">247</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">⚡ Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Avg. logging time:</span>
                <span className="font-semibold text-green-600">3.2 seconds</span>
              </div>
              <div className="flex justify-between">
                <span>Expenses this month:</span>
                <span className="font-semibold">47</span>
              </div>
              <div className="flex justify-between">
                <span>Income entries:</span>
                <span className="font-semibold">8</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
