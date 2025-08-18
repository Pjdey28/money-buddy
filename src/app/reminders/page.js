'use client'

import { useState } from 'react'
import { 
  Bell, 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Target,
  Repeat,
  Volume2,
  Settings,
  Smartphone,
  Mail,
  MessageSquare
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

const reminders = [
  {
    id: 1,
    title: "Pay College Fee",
    description: "Semester fee payment due tomorrow",
    amount: 35000,
    dueDate: "2024-01-21",
    dueTime: "17:00",
    priority: "high",
    category: "Education",
    type: "payment",
    status: "active",
    recurring: false,
    notificationMethods: ["push", "email"],
    reminderTimes: ["1 day", "2 hours"],
    completed: false,
    icon: "🎓",
    color: "red"
  },
  {
    id: 2,
    title: "Update Budget Spreadsheet",
    description: "Weekly budget review and expense tracking",
    dueDate: "2024-01-22",
    dueTime: "20:00",
    priority: "medium",
    category: "Finance Management",
    type: "task",
    status: "active",
    recurring: true,
    recurringType: "weekly",
    notificationMethods: ["push"],
    reminderTimes: ["1 day"],
    completed: false,
    icon: "📊",
    color: "blue"
  },
  {
    id: 3,
    title: "Check Investment Portfolio",
    description: "Review mutual fund and SIP performance",
    dueDate: "2024-01-25",
    dueTime: "15:00",
    priority: "low",
    category: "Investment",
    type: "review",
    status: "active",
    recurring: true,
    recurringType: "monthly",
    notificationMethods: ["push", "email"],
    reminderTimes: ["3 days", "1 day"],
    completed: false,
    icon: "📈",
    color: "green"
  },
  {
    id: 4,
    title: "Mobile Bill Payment",
    description: "Monthly mobile plan renewal",
    amount: 599,
    dueDate: "2024-01-20",
    dueTime: "12:00",
    priority: "medium",
    category: "Utilities",
    type: "payment",
    status: "completed",
    recurring: true,
    recurringType: "monthly",
    notificationMethods: ["push"],
    reminderTimes: ["2 days"],
    completed: true,
    icon: "📱",
    color: "green"
  },
  {
    id: 5,
    title: "Emergency Fund Goal Check",
    description: "Review progress towards ₹50,000 emergency fund",
    targetAmount: 50000,
    currentAmount: 15000,
    dueDate: "2024-01-30",
    dueTime: "18:00",
    priority: "medium",
    category: "Savings Goal",
    type: "goal",
    status: "active",
    recurring: true,
    recurringType: "monthly",
    notificationMethods: ["push"],
    reminderTimes: ["1 week"],
    completed: false,
    icon: "🎯",
    color: "purple"
  },
  {
    id: 6,
    title: "Apply for Scholarship",
    description: "Submit application for merit-based scholarship",
    dueDate: "2024-02-15",
    dueTime: "23:59",
    priority: "high",
    category: "Education",
    type: "deadline",
    status: "active",
    recurring: false,
    notificationMethods: ["push", "email", "sms"],
    reminderTimes: ["1 week", "3 days", "1 day"],
    completed: false,
    icon: "🏆",
    color: "gold"
  },
  {
    id: 7,
    title: "Tax Document Collection",
    description: "Gather all documents for ITR filing",
    dueDate: "2024-03-01",
    dueTime: "12:00",
    priority: "medium",
    category: "Tax",
    type: "preparation",
    status: "active",
    recurring: true,
    recurringType: "yearly",
    notificationMethods: ["push", "email"],
    reminderTimes: ["1 month", "2 weeks"],
    completed: false,
    icon: "📋",
    color: "orange"
  }
]

const reminderStats = {
  total: reminders.length,
  active: reminders.filter(r => r.status === 'active').length,
  completed: reminders.filter(r => r.completed).length,
  overdue: reminders.filter(r => new Date(r.dueDate) < new Date() && !r.completed).length
}

const notificationSettings = {
  pushNotifications: true,
  emailNotifications: true,
  smsNotifications: false,
  soundEnabled: true,
  quietHours: { start: "22:00", end: "08:00" },
  defaultReminderTime: "1 day"
}

export default function RemindersPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const filterOptions = [
    { value: 'all', label: 'All Reminders' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'high', label: 'High Priority' },
    { value: 'payment', label: 'Payments' },
    { value: 'goal', label: 'Goals' }
  ]

  const filteredReminders = reminders.filter(reminder => {
    const matchesFilter = selectedFilter === 'all' || 
                         reminder.status === selectedFilter || 
                         reminder.priority === selectedFilter ||
                         reminder.type === selectedFilter
    const matchesSearch = reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getTimeUntilDue = (dueDate, dueTime) => {
    const due = new Date(`${dueDate}T${dueTime}`)
    const now = new Date()
    const diff = due - now
    
    if (diff < 0) return "Overdue"
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    return `${hours}h`
  }

  const toggleCompleted = (id) => {
    // In a real app, this would update the reminder status
    console.log(`Toggle completed for reminder ${id}`)
  }

  return (
    <div className="space-y-6">
      {/* Header with Beautiful Background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-display font-bold mb-2">Smart Reminders & Alerts 🔔</h1>
          <p className="text-orange-100 text-lg">Never miss a payment or deadline again</p>
        </div>
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reminders</p>
                <p className="text-3xl font-bold text-blue-600">{reminderStats.total}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-3xl font-bold text-green-600">{reminderStats.active}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-purple-600">{reminderStats.completed}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-3xl font-bold text-red-600">{reminderStats.overdue}</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Reminders List */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filter Bar */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <Input
                  placeholder="Search reminders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <div className="flex gap-2 flex-wrap">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedFilter(option.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedFilter === option.value
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reminder
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reminders List */}
          <div className="space-y-4">
            {filteredReminders.map((reminder) => (
              <Card key={reminder.id} className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                reminder.completed ? 'opacity-75' : ''
              } ${reminder.priority === 'high' ? 'border-l-4 border-red-500' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleCompleted(reminder.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            reminder.completed
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-green-500'
                          }`}
                        >
                          {reminder.completed && <CheckCircle className="h-4 w-4" />}
                        </button>
                        <div className="text-2xl">{reminder.icon}</div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`text-lg font-semibold ${
                            reminder.completed ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}>
                            {reminder.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            reminder.priority === 'high' ? 'bg-red-100 text-red-800' :
                            reminder.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {reminder.priority}
                          </span>
                          {reminder.recurring && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              <Repeat className="h-3 w-3 inline mr-1" />
                              {reminder.recurringType}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{reminder.description}</p>
                        
                        {/* Goal Progress */}
                        {reminder.type === 'goal' && reminder.targetAmount && (
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{Math.round((reminder.currentAmount / reminder.targetAmount) * 100)}%</span>
                            </div>
                            <Progress value={(reminder.currentAmount / reminder.targetAmount) * 100} className="h-2" />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>₹{reminder.currentAmount?.toLocaleString()}</span>
                              <span>₹{reminder.targetAmount?.toLocaleString()}</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{reminder.dueDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{reminder.dueTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                            <span>{reminder.category}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Bell className="h-4 w-4" />
                            <span>{reminder.reminderTimes.join(', ')}</span>
                          </div>
                        </div>
                        
                        {/* Notification methods */}
                        <div className="flex items-center space-x-2 mt-2">
                          {reminder.notificationMethods.includes('push') && (
                            <div className="flex items-center space-x-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              <Smartphone className="h-3 w-3" />
                              <span>Push</span>
                            </div>
                          )}
                          {reminder.notificationMethods.includes('email') && (
                            <div className="flex items-center space-x-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              <Mail className="h-3 w-3" />
                              <span>Email</span>
                            </div>
                          )}
                          {reminder.notificationMethods.includes('sms') && (
                            <div className="flex items-center space-x-1 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                              <MessageSquare className="h-3 w-3" />
                              <span>SMS</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        {reminder.amount && (
                          <div className={`text-xl font-bold ${
                            reminder.type === 'goal' ? 'text-purple-600' : 'text-red-600'
                          }`}>
                            ₹{reminder.amount.toLocaleString()}
                          </div>
                        )}
                        <div className={`text-sm font-medium ${
                          getTimeUntilDue(reminder.dueDate, reminder.dueTime) === 'Overdue' 
                            ? 'text-red-600' 
                            : 'text-gray-600'
                        }`}>
                          {getTimeUntilDue(reminder.dueDate, reminder.dueTime)}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notification Settings */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Push Notifications</span>
                  </div>
                  <div className={`w-10 h-6 rounded-full ${notificationSettings.pushNotifications ? 'bg-blue-600' : 'bg-gray-300'} relative`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notificationSettings.pushNotifications ? 'translate-x-5' : 'translate-x-1'}`}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Email Alerts</span>
                  </div>
                  <div className={`w-10 h-6 rounded-full ${notificationSettings.emailNotifications ? 'bg-green-600' : 'bg-gray-300'} relative`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notificationSettings.emailNotifications ? 'translate-x-5' : 'translate-x-1'}`}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Sound</span>
                  </div>
                  <div className={`w-10 h-6 rounded-full ${notificationSettings.soundEnabled ? 'bg-purple-600' : 'bg-gray-300'} relative`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notificationSettings.soundEnabled ? 'translate-x-5' : 'translate-x-1'}`}></div>
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t">
                <div className="text-sm text-gray-600 mb-2">Quiet Hours</div>
                <div className="flex items-center space-x-2 text-sm">
                  <span>{notificationSettings.quietHours.start}</span>
                  <span>-</span>
                  <span>{notificationSettings.quietHours.end}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Reminders */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Today&apos;s Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {reminders.filter(r => r.dueDate === '2024-01-21' && !r.completed).map((reminder) => (
                <div key={reminder.id} className={`p-3 rounded-lg border-l-4 ${
                  reminder.priority === 'high' ? 'bg-red-50 border-red-400' :
                  'bg-yellow-50 border-yellow-400'
                }`}>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{reminder.icon}</span>
                    <div>
                      <p className="text-sm font-medium">{reminder.title}</p>
                      <p className="text-xs text-gray-600">{reminder.dueTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Add</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Payment Reminder
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Goal Check-in
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Custom Reminder
              </Button>
            </CardContent>
          </Card>

          {/* Reminder Categories */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {['Payment', 'Goal', 'Task', 'Deadline', 'Review'].map((category) => {
                  const count = reminders.filter(r => r.type === category.toLowerCase()).length
                  return (
                    <div key={category} className="flex justify-between items-center">
                      <span>{category}</span>
                      <span className="text-gray-500">{count}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
