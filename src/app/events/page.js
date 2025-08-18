'use client'

import { useState } from 'react'
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Bell,
  Eye
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const events = [
  {
    id: 1,
    title: "College Semester Fee",
    amount: 35000,
    date: "2024-02-01",
    time: "09:00",
    type: "expense",
    category: "Education",
    priority: "high",
    status: "upcoming",
    description: "Semester fee payment deadline",
    recurring: false,
    reminderDays: 7,
    icon: "🎓",
    color: "red"
  },
  {
    id: 2,
    title: "Part-time Job Salary",
    amount: 12000,
    date: "2024-01-30",
    time: "17:00",
    type: "income",
    category: "Salary",
    priority: "medium",
    status: "upcoming",
    description: "Monthly salary from tutoring job",
    recurring: true,
    recurringType: "monthly",
    reminderDays: 3,
    icon: "💼",
    color: "green"
  },
  {
    id: 3,
    title: "Laptop EMI Payment",
    amount: 5500,
    date: "2024-02-05",
    time: "10:00",
    type: "expense",
    category: "Technology",
    priority: "high",
    status: "upcoming",
    description: "Monthly laptop EMI installment",
    recurring: true,
    recurringType: "monthly",
    reminderDays: 5,
    icon: "💻",
    color: "red"
  },
  {
    id: 4,
    title: "Birthday Money from Family",
    amount: 8000,
    date: "2024-01-25",
    time: "12:00",
    type: "income",
    category: "Gift",
    priority: "low",
    status: "completed",
    description: "Birthday gift money",
    recurring: false,
    reminderDays: 0,
    icon: "🎂",
    color: "green"
  },
  {
    id: 5,
    title: "Mobile Recharge",
    amount: 599,
    date: "2024-02-10",
    time: "14:00",
    type: "expense",
    category: "Utilities",
    priority: "medium",
    status: "upcoming",
    description: "Monthly mobile plan renewal",
    recurring: true,
    recurringType: "monthly",
    reminderDays: 2,
    icon: "📱",
    color: "orange"
  },
  {
    id: 6,
    title: "Freelance Project Payment",
    amount: 15000,
    date: "2024-02-15",
    time: "16:00",
    type: "income",
    category: "Freelance",
    priority: "high",
    status: "upcoming",
    description: "Website development project completion",
    recurring: false,
    reminderDays: 7,
    icon: "💻",
    color: "green"
  },
  {
    id: 7,
    title: "Gym Membership",
    amount: 2000,
    date: "2024-02-20",
    time: "11:00",
    type: "expense",
    category: "Health",
    priority: "low",
    status: "upcoming",
    description: "Quarterly gym membership renewal",
    recurring: true,
    recurringType: "quarterly",
    reminderDays: 10,
    icon: "🏋️‍♂️",
    color: "blue"
  }
]

const monthlyOverview = [
  { month: "January", income: 25000, expenses: 18500, net: 6500 },
  { month: "February", income: 27000, expenses: 42000, net: -15000 },
  { month: "March", income: 25000, expenses: 16000, net: 9000 },
  { month: "April", income: 28000, expenses: 19500, net: 8500 },
]

export default function EventsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const filterOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expenses' },
    { value: 'high', label: 'High Priority' }
  ]

  const filteredEvents = events.filter(event => {
    const matchesFilter = selectedFilter === 'all' || 
                         event.status === selectedFilter || 
                         event.type === selectedFilter ||
                         event.priority === selectedFilter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const upcomingEvents = events.filter(e => e.status === 'upcoming')
  const totalUpcomingIncome = upcomingEvents.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0)
  const totalUpcomingExpenses = upcomingEvents.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header with Beautiful Background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-display font-bold mb-2">Financial Events & Planning 📅</h1>
          <p className="text-indigo-100 text-lg">Stay ahead with smart financial event management</p>
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
                <p className="text-sm font-medium text-gray-600">Upcoming Income</p>
                <p className="text-3xl font-bold text-green-600">₹{totalUpcomingIncome.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Expenses</p>
                <p className="text-3xl font-bold text-red-600">₹{totalUpcomingExpenses.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Forecast</p>
                <p className={`text-3xl font-bold ${
                  totalUpcomingIncome - totalUpcomingExpenses > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ₹{(totalUpcomingIncome - totalUpcomingExpenses).toLocaleString()}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                totalUpcomingIncome - totalUpcomingExpenses > 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <DollarSign className={`h-6 w-6 ${
                  totalUpcomingIncome - totalUpcomingExpenses > 0 ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-blue-600">{events.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Events List */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filter Bar */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedFilter(option.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedFilter === option.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <Card key={event.id} className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                event.status === 'completed' ? 'opacity-75' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="text-3xl">{event.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.priority === 'high' ? 'bg-red-100 text-red-800' :
                            event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {event.priority}
                          </span>
                          {event.recurring && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              Recurring
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                            <span>{event.category}</span>
                          </div>
                          {event.reminderDays > 0 && (
                            <div className="flex items-center space-x-1">
                              <Bell className="h-4 w-4" />
                              <span>{event.reminderDays}d reminder</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          event.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {event.type === 'income' ? '+' : '-'}₹{event.amount.toLocaleString()}
                        </div>
                        <div className={`text-xs ${
                          event.status === 'completed' ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {event.status === 'completed' ? (
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3" />
                              <span>Completed</span>
                            </div>
                          ) : (
                            event.status
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
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
          {/* Calendar Widget */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Quick Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-7 gap-1 text-xs text-center font-medium text-gray-500 mb-2">
                  <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-xs text-center">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 2; // Start from a random day
                    const hasEvent = day > 0 && day < 32 && Math.random() > 0.7;
                    return (
                      <div
                        key={i}
                        className={`h-8 w-8 flex items-center justify-center rounded ${
                          day > 0 && day < 32
                            ? hasEvent
                              ? 'bg-blue-100 text-blue-800 font-medium'
                              : 'hover:bg-gray-100 cursor-pointer'
                            : 'text-gray-300'
                        }`}
                      >
                        {day > 0 && day < 32 ? day : ''}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Alerts */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Upcoming Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.slice(0, 4).map((event) => (
                <div key={event.id} className={`p-3 rounded-lg border-l-4 ${
                  event.priority === 'high' ? 'bg-red-50 border-red-400' :
                  event.priority === 'medium' ? 'bg-yellow-50 border-yellow-400' :
                  'bg-blue-50 border-blue-400'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-gray-600">{event.date}</p>
                    </div>
                    <span className={`text-xs font-semibold ${
                      event.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {event.type === 'income' ? '+' : '-'}₹{event.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Monthly Overview */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Monthly Forecast</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {monthlyOverview.map((month) => (
                <div key={month.month} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{month.month}</span>
                    <span className={`text-sm font-semibold ${
                      month.net > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {month.net > 0 ? '+' : ''}₹{month.net.toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Income:</span>
                      <span className="text-green-600 font-medium ml-1">₹{month.income.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Expenses:</span>
                      <span className="text-red-600 font-medium ml-1">₹{month.expenses.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Add Income Event
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Reminder
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Filter className="h-4 w-4 mr-2" />
                Export Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
