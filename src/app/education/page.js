'use client'

import { useState } from 'react'
import { 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle, 
  Play,
  Star,
  TrendingUp,
  DollarSign,
  Shield,
  Brain,
  Target,
  Lightbulb
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const educationModules = [
  {
    id: 1,
    title: "Personal Finance Basics",
    description: "Learn the fundamentals of managing your money as a student",
    duration: "25 min",
    difficulty: "Beginner",
    completed: true,
    progress: 100,
    points: 100,
    lessons: 5,
    image: "💰",
    category: "Fundamentals"
  },
  {
    id: 2,
    title: "Budgeting Like a Pro",
    description: "Master the art of creating and sticking to a budget",
    duration: "30 min",
    difficulty: "Beginner",
    completed: true,
    progress: 100,
    points: 120,
    lessons: 6,
    image: "📊",
    category: "Budgeting"
  },
  {
    id: 3,
    title: "Emergency Fund Essentials",
    description: "Why you need one and how to build it step by step",
    duration: "20 min",
    difficulty: "Beginner",
    completed: false,
    progress: 60,
    points: 80,
    lessons: 4,
    image: "🛡️",
    category: "Saving"
  },
  {
    id: 4,
    title: "Student Loans & Debt Management",
    description: "Navigate student loans smartly and manage debt effectively",
    duration: "35 min",
    difficulty: "Intermediate",
    completed: false,
    progress: 0,
    points: 150,
    lessons: 7,
    image: "🎓",
    category: "Debt"
  },
  {
    id: 5,
    title: "Investment Basics for Beginners",
    description: "Start your investment journey with simple, safe options",
    duration: "40 min",
    difficulty: "Intermediate",
    completed: false,
    progress: 0,
    points: 180,
    lessons: 8,
    image: "📈",
    category: "Investing"
  },
  {
    id: 6,
    title: "Credit Cards & Credit Score",
    description: "Build good credit habits and understand credit scores",
    duration: "25 min",
    difficulty: "Intermediate",
    completed: false,
    progress: 20,
    points: 110,
    lessons: 5,
    image: "💳",
    category: "Credit"
  },
  {
    id: 7,
    title: "Tax Planning for Students",
    description: "Understand taxes and maximize your deductions",
    duration: "30 min",
    difficulty: "Advanced",
    completed: false,
    progress: 0,
    points: 140,
    lessons: 6,
    image: "📋",
    category: "Taxes"
  },
  {
    id: 8,
    title: "Side Hustles & Income Streams",
    description: "Create multiple income sources while studying",
    duration: "28 min",
    difficulty: "Intermediate",
    completed: false,
    progress: 0,
    points: 130,
    lessons: 6,
    image: "💼",
    category: "Income"
  }
]

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    earned: true,
    points: 50
  },
  {
    id: 2,
    title: "Budget Master",
    description: "Complete the budgeting module",
    icon: "📊",
    earned: true,
    points: 100
  },
  {
    id: 3,
    title: "Knowledge Seeker",
    description: "Complete 3 modules",
    icon: "🧠",
    earned: false,
    points: 200
  },
  {
    id: 4,
    title: "Financial Wizard",
    description: "Complete all 8 modules",
    icon: "🧙‍♂️",
    earned: false,
    points: 500
  }
]

const weeklyTips = [
  {
    id: 1,
    tip: "Track every expense for a week to identify spending patterns",
    category: "Budgeting",
    difficulty: "Easy"
  },
  {
    id: 2,
    tip: "Set up automatic transfers to your savings account",
    category: "Saving",
    difficulty: "Easy"
  },
  {
    id: 3,
    tip: "Use the 24-hour rule before making non-essential purchases",
    category: "Spending",
    difficulty: "Medium"
  }
]

export default function EducationPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['All', 'Fundamentals', 'Budgeting', 'Saving', 'Debt', 'Investing', 'Credit', 'Taxes', 'Income']
  
  const filteredModules = educationModules.filter(module => {
    const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalPoints = educationModules.filter(m => m.completed).reduce((sum, m) => sum + m.points, 0)
  const completedModules = educationModules.filter(m => m.completed).length
  const totalProgress = educationModules.reduce((sum, m) => sum + m.progress, 0) / educationModules.length

  return (
    <div className="space-y-6">
      {/* Header with Beautiful Background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-display font-bold mb-2">Financial Education Hub 📚</h1>
          <p className="text-purple-100 text-lg">Master your money with interactive lessons and expert guidance</p>
        </div>
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-3xl font-bold text-purple-600">{totalPoints}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">{completedModules}/8</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                <p className="text-3xl font-bold text-blue-600">{Math.round(totalProgress)}%</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Learning Streak</p>
                <p className="text-3xl font-bold text-orange-600">7 days</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filter */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search modules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredModules.map((module) => (
              <Card key={module.id} className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                module.completed ? 'ring-2 ring-green-200' : ''
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{module.image}</div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                    </div>
                    {module.completed && (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{module.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4 text-gray-500" />
                        <span>{module.lessons} lessons</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      module.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {module.difficulty}
                    </span>
                  </div>
                  
                  {module.progress > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{module.points} points</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant={module.completed ? "outline" : "default"}
                      className={module.completed ? "text-green-700 border-green-300" : ""}
                    >
                      {module.completed ? (
                        <><CheckCircle className="h-4 w-4 mr-1" /> Review</>
                      ) : module.progress > 0 ? (
                        <><Play className="h-4 w-4 mr-1" /> Continue</>
                      ) : (
                        <><Play className="h-4 w-4 mr-1" /> Start</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`p-3 rounded-lg border ${
                  achievement.earned 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`text-2xl ${achievement.earned ? '' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className={`h-3 w-3 ${achievement.earned ? 'text-yellow-500' : 'text-gray-400'}`} />
                        <span className={`text-xs ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`}>
                          {achievement.points} points
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Tips */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Weekly Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {weeklyTips.map((tip) => (
                <div key={tip.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-800">{tip.tip}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-blue-600 font-medium">{tip.category}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      tip.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {tip.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Study Plan */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Recommended Path
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="line-through text-gray-500">Personal Finance Basics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="line-through text-gray-500">Budgeting Like a Pro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
                  <span className="font-medium text-blue-600">Emergency Fund Essentials</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 border-2 border-gray-300 rounded-full"></div>
                  <span className="text-gray-500">Credit Cards & Credit Score</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 border-2 border-gray-300 rounded-full"></div>
                  <span className="text-gray-500">Student Loans & Debt</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
