'use client'

import { useState } from 'react'
import { 
  Target, 
  PlusCircle, 
  Trophy,
  Star,
  Calendar,
  Coins,
  TrendingUp,
  Gift,
  Zap,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data for goals and gamification
const mockGoals = [
  {
    id: 1,
    name: 'Trip to Darjeeling',
    target: 5000,
    current: 2800,
    deadline: '2025-03-15',
    category: 'Travel',
    autoSave: 500,
    streak: 7,
    color: 'bg-blue-500',
    image: '🏔️',
    priority: 'high'
  },
  {
    id: 2,
    name: 'New Laptop',
    target: 45000,
    current: 12000,
    deadline: '2025-06-01',
    category: 'Electronics',
    autoSave: 2000,
    streak: 12,
    color: 'bg-purple-500',
    image: '💻',
    priority: 'medium'
  },
  {
    id: 3,
    name: 'Emergency Fund',
    target: 10000,
    current: 6500,
    deadline: '2025-08-31',
    category: 'Security',
    autoSave: 800,
    streak: 15,
    color: 'bg-green-500',
    image: '🛡️',
    priority: 'high'
  },
  {
    id: 4,
    name: 'Birthday Gift for Mom',
    target: 2000,
    current: 1200,
    deadline: '2025-02-20',
    category: 'Family',
    autoSave: 200,
    streak: 4,
    color: 'bg-pink-500',
    image: '🎁',
    priority: 'high'
  }
]

const achievements = [
  { id: 1, title: 'First Goal', description: 'Created your first savings goal', icon: '🎯', earned: true },
  { id: 2, title: 'Week Streak', description: 'Saved for 7 consecutive days', icon: '🔥', earned: true },
  { id: 3, title: 'Goal Crusher', description: 'Completed your first goal', icon: '💪', earned: true },
  { id: 4, title: 'Smart Saver', description: 'Used auto-save feature', icon: '🤖', earned: true },
  { id: 5, title: 'Month Master', description: 'Saved for 30 consecutive days', icon: '👑', earned: false },
  { id: 6, title: 'Triple Threat', description: 'Have 3 active goals', icon: '⚡', earned: false },
]

const savingTips = [
  {
    title: 'Round-up Savings',
    description: 'Round up your purchases to the nearest ₹10 and save the difference',
    potential: '₹150/month',
    category: 'automation'
  },
  {
    title: 'Skip the Coffee',
    description: 'Make coffee at home 3 times a week instead of buying',
    potential: '₹600/month',
    category: 'lifestyle'
  },
  {
    title: 'Student Discounts',
    description: 'Always ask for student discounts on purchases',
    potential: '₹300/month',
    category: 'discounts'
  },
  {
    title: 'Monthly Reviews',
    description: 'Review and cancel unused subscriptions monthly',
    potential: '₹250/month',
    category: 'subscriptions'
  }
]

export default function GoalsPage() {
  const [showCreateGoal, setShowCreateGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    deadline: '',
    category: 'General',
    autoSave: ''
  })

  const userLevel = 7
  const userPoints = 2450
  const nextLevelPoints = 3000

  const handleCreateGoal = (e) => {
    e.preventDefault()
    console.log('Creating goal:', newGoal)
    // Reset form
    setNewGoal({ name: '', target: '', deadline: '', category: 'General', autoSave: '' })
    setShowCreateGoal(false)
  }

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date()
    const targetDate = new Date(deadline)
    const diffTime = targetDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getProgressColor = (current, target) => {
    const percentage = (current / target) * 100
    if (percentage >= 75) return 'bg-green-500'
    if (percentage >= 50) return 'bg-blue-500'
    if (percentage >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Savings Goals</h1>
          <p className="text-gray-600 mt-1">Gamified goal tracking with smart automation</p>
        </div>
        <Button 
          onClick={() => setShowCreateGoal(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Goal
        </Button>
      </div>

      {/* User Progress */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Level {userLevel} Saver</h3>
                <p className="text-gray-600">You're doing great! Keep up the momentum</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Coins className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold">{userPoints} points</span>
                  <span className="text-gray-500">• {nextLevelPoints - userPoints} to next level</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-sm text-gray-600">
                {achievements.filter(a => a.earned).length} / {achievements.length} badges
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={(userPoints / nextLevelPoints) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Create Goal Modal */}
      {showCreateGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create New Goal</CardTitle>
              <CardDescription>Set up your savings target with smart automation</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateGoal} className="space-y-4">
                <Input
                  placeholder="Goal name (e.g., Trip to Goa)"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                  required
                />
                <Input
                  type="number"
                  placeholder="Target amount (₹)"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                  required
                />
                <Input
                  type="date"
                  placeholder="Target date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  required
                />
                <select 
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option>General</option>
                  <option>Travel</option>
                  <option>Electronics</option>
                  <option>Education</option>
                  <option>Emergency</option>
                  <option>Family</option>
                </select>
                <Input
                  type="number"
                  placeholder="Auto-save amount per week (₹)"
                  value={newGoal.autoSave}
                  onChange={(e) => setNewGoal({...newGoal, autoSave: e.target.value})}
                />
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">Create Goal</Button>
                  <Button variant="outline" onClick={() => setShowCreateGoal(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Active Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockGoals.map((goal) => {
          const progressPercentage = (goal.current / goal.target) * 100
          const daysLeft = getDaysUntilDeadline(goal.deadline)
          const weeklyNeeded = Math.ceil((goal.target - goal.current) / (daysLeft / 7))
          
          return (
            <Card key={goal.id} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{goal.image}</div>
                    <div>
                      <CardTitle className="text-lg">{goal.name}</CardTitle>
                      <CardDescription>{goal.category}</CardDescription>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    goal.priority === 'high' ? 'bg-red-100 text-red-800' :
                    goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {goal.priority}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-500">
                      ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                      {progressPercentage.toFixed(1)}% complete
                    </span>
                    <span className="text-xs text-gray-500">
                      ₹{(goal.target - goal.current).toLocaleString()} remaining
                    </span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className={daysLeft <= 30 ? 'text-red-600' : 'text-gray-600'}>
                      {daysLeft} days left
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-green-600">₹{weeklyNeeded}/week needed</span>
                  </div>
                </div>

                {/* Streak */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Zap className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">{goal.streak} day streak</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Auto-save: ₹{goal.autoSave}/week</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Add Funds
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Achievements and Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Achievements
            </CardTitle>
            <CardDescription>Unlock badges as you hit milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-3 rounded-lg border text-center ${
                    achievement.earned 
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <div className="text-xs font-semibold">{achievement.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{achievement.description}</div>
                  {achievement.earned && (
                    <CheckCircle className="h-4 w-4 text-green-500 mx-auto mt-1" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Saving Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Smart Saving Tips
            </CardTitle>
            <CardDescription>Personalized recommendations to boost your savings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savingTips.map((tip, index) => (
                <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{tip.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">{tip.potential}</div>
                      <div className="text-xs text-gray-500">{tip.category}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goal Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Goal Summary</CardTitle>
          <CardDescription>Your overall savings progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {mockGoals.length}
              </div>
              <div className="text-sm text-gray-600">Active Goals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ₹{mockGoals.reduce((sum, goal) => sum + goal.current, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                ₹{mockGoals.reduce((sum, goal) => sum + goal.target, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Target</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(mockGoals.reduce((sum, goal, _, arr) => sum + (goal.current / goal.target), 0) / mockGoals.length * 100)}%
              </div>
              <div className="text-sm text-gray-600">Avg Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
