'use client'

import { useState } from 'react'
import { 
  MessageCircle, 
  Send,
  BookOpen,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Shield
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Mock chat conversation
const mockConversation = [
  {
    id: 1,
    type: 'bot',
    message: "Hi! I&apos;m MoneyBuddy, your AI financial assistant. I&apos;m here to help with budgeting, saving tips, and general financial guidance. How can I help you today?",
    timestamp: new Date(Date.now() - 300000),
    suggestions: [
      "How can I save ₹2000 in 2 months?",
      "Should I take a student loan?",
      "Help me budget for a trip",
      "What&apos;s a good emergency fund?"
    ]
  }
]

const financialEducation = [
  {
    id: 1,
    title: "Credit Card Basics",
    description: "Understanding credit cards, interest rates, and responsible usage",
    duration: "3 min read",
    difficulty: "Beginner",
    points: 50,
    completed: true,
    icon: "💳"
  },
  {
    id: 2,
    title: "Emergency Fund 101",
    description: "Why you need one and how to build it as a student",
    duration: "4 min read",
    difficulty: "Beginner",
    points: 60,
    completed: true,
    icon: "🛡️"
  },
  {
    id: 3,
    title: "Student Loan Strategy",
    description: "When to take loans and how to manage them effectively",
    duration: "6 min read",
    difficulty: "Intermediate",
    points: 80,
    completed: false,
    icon: "🎓"
  },
  {
    id: 4,
    title: "Investment Basics",
    description: "Simple investment options for students and young professionals",
    duration: "5 min read",
    difficulty: "Intermediate",
    points: 75,
    completed: false,
    icon: "📈"
  },
  {
    id: 5,
    title: "Tax Planning for Students",
    description: "Understanding basic tax concepts and deductions",
    duration: "4 min read",
    difficulty: "Beginner",
    points: 55,
    completed: false,
    icon: "📋"
  },
  {
    id: 6,
    title: "Budgeting Mastery",
    description: "Advanced budgeting techniques and apps",
    duration: "7 min read",
    difficulty: "Advanced",
    points: 100,
    completed: false,
    icon: "🎯"
  }
]

const gigsAndOpportunities = [
  {
    id: 1,
    title: "Math Tutor Needed",
    description: "Help high school students with mathematics",
    pay: "₹300/hour",
    location: "Near MG Road Metro",
    type: "tutoring",
    timeCommitment: "3-4 hours/week",
    requirements: "Strong in mathematics, patient teaching style"
  },
  {
    id: 2,
    title: "Content Writing",
    description: "Write articles for educational blog",
    pay: "₹500/article",
    location: "Remote",
    type: "freelance",
    timeCommitment: "Flexible",
    requirements: "Good English writing skills, research ability"
  },
  {
    id: 3,
    title: "Food Delivery Partner",
    description: "Deliver food orders in your spare time",
    pay: "₹200-400/day",
    location: "City-wide",
    type: "gig",
    timeCommitment: "2-6 hours/day",
    requirements: "Own vehicle, smartphone, driving license"
  },
  {
    id: 4,
    title: "Web Design Project",
    description: "Design website for local business",
    pay: "₹8000/project",
    location: "Remote",
    type: "freelance",
    timeCommitment: "2-3 weeks",
    requirements: "HTML/CSS knowledge, design portfolio"
  }
]

const stockNews = [
  {
    id: 1,
    title: "Indian IT Stocks Rally on Strong Q3 Results",
    summary: "TCS, Infosys show robust growth in latest quarter",
    time: "2 hours ago",
    category: "Technology",
    impact: "positive"
  },
  {
    id: 2,
    title: "RBI Holds Interest Rates Steady",
    summary: "Central bank maintains repo rate at 6.5% for third consecutive meeting",
    time: "5 hours ago",
    category: "Banking",
    impact: "neutral"
  },
  {
    id: 3,
    title: "Startup Funding Picks Up in January",
    summary: "Young companies raise ₹2,400 crore across 45 deals",
    time: "1 day ago",
    category: "Startups",
    impact: "positive"
  }
]

export default function ChatAndEducationPage() {
  const [messages, setMessages] = useState(mockConversation)
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')

  const sendMessage = async (message) => {
    if (!message.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: message,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: generateBotResponse(message),
        timestamp: new Date(),
        suggestions: getBotSuggestions(message)
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
      return "Great question about saving! Here&apos;s a simple 2-month saving plan: 1) Track all expenses for a week to identify spending patterns. 2) Cut non-essential expenses like eating out or subscription services. 3) Set up automatic transfers of ₹1000/month to savings. 4) Look for part-time income opportunities. 5) Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings. Remember, I&apos;m not a licensed financial advisor - these are general educational tips!"
    }
    
    if (lowerMessage.includes('loan') || lowerMessage.includes('student loan')) {
      return "Student loans can be helpful but require careful consideration. Key points: 1) Only borrow what you absolutely need for education. 2) Compare interest rates from different lenders. 3) Understand repayment terms and grace periods. 4) Consider your expected post-graduation income. 5) Explore scholarships and grants first. 6) Read all terms carefully before signing. This is general guidance - consult with your bank or a financial advisor for personalized advice."
    }
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('trip')) {
      return "Budgeting for a trip? Here&apos;s how to plan: 1) Research total costs (transport, accommodation, food, activities). 2) Add 10-15% buffer for unexpected expenses. 3) Set a timeline and save weekly toward the goal. 4) Look for student discounts on transport and accommodation. 5) Consider traveling in groups to split costs. 6) Set aside money gradually rather than paying all at once. Would you like specific budgeting strategies?"
    }
    
    if (lowerMessage.includes('emergency fund')) {
      return "An emergency fund is crucial! For students, aim for ₹5,000-10,000 initially. Here&apos;s how: 1) Start small - even ₹100/week adds up. 2) Keep it in a separate savings account. 3) Only use for true emergencies (medical, urgent repairs, job loss). 4) Gradually build to 3-6 months of expenses. 5) Automate transfers to make it easier. 6) Don&apos;t invest emergency funds - keep them liquid and safe."
    }
    
    return "I understand you&apos;re looking for financial guidance. While I can provide general educational information about budgeting, saving, and financial planning, please remember that I&apos;m not a licensed financial advisor. For specific investment advice or major financial decisions, consider consulting with a qualified professional. Is there a particular aspect of personal finance you&apos;d like to learn more about?"
  }

  const getBotSuggestions = (userMessage) => {
    return [
      "Tell me more about budgeting",
      "How do I start investing?",
      "What about insurance for students?",
      "Help with debt management"
    ]
  }

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">AI Assistant & Education</h1>
        <p className="text-gray-600 mt-1">Learn about finance and get personalized guidance</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'chat'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MessageCircle className="h-4 w-4 mr-2 inline" />
          AI Chat
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'education'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BookOpen className="h-4 w-4 mr-2 inline" />
          Education
        </button>
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'opportunities'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <DollarSign className="h-4 w-4 mr-2 inline" />
          Opportunities
        </button>
      </div>

      {/* AI Chat Tab */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  MoneyBuddy AI Assistant
                </CardTitle>
                <CardDescription>
                  Get financial guidance and educational information
                </CardDescription>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                      
                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="block w-full text-left p-2 text-xs bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-600">MoneyBuddy is typing...</p>
                    </div>
                  </div>
                )}
              </CardContent>
              
              {/* Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ask me about budgeting, saving, loans, or any finance topic..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(newMessage)}
                    className="flex-1"
                  />
                  <Button onClick={() => sendMessage(newMessage)}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Disclaimer Sidebar */}
          <div className="space-y-4">
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Important Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-600">
                  MoneyBuddy provides general educational information only. 
                  This is not personalized financial advice. Always consult 
                  qualified professionals for investment or major financial decisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Popular Topics</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {[
                  "Emergency fund basics",
                  "Student loan guidance",
                  "Budgeting strategies",
                  "Investment fundamentals",
                  "Credit card tips"
                ].map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(`Tell me about ${topic}`)}
                    className="w-full text-left p-2 text-xs bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Education Tab */}
      {activeTab === 'education' && (
        <div className="space-y-6">
          {/* Progress Overview */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Your Learning Progress</h3>
                  <p className="text-gray-600">Continue building your financial knowledge</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600">
                    {financialEducation.filter(item => item.completed).length}/
                    {financialEducation.length}
                  </div>
                  <div className="text-sm text-gray-600">Modules Complete</div>
                  <div className="flex items-center mt-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold">
                      {financialEducation.filter(item => item.completed).reduce((sum, item) => sum + item.points, 0)} points earned
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {financialEducation.map((module) => (
              <Card key={module.id} className={`relative overflow-hidden ${
                module.completed 
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
                  : 'hover:shadow-lg transition-shadow cursor-pointer'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{module.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                    </div>
                    {module.completed && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{module.duration}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      module.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {module.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{module.points} points</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant={module.completed ? "outline" : "default"}
                      className={module.completed ? "text-green-700 border-green-300" : ""}
                    >
                      {module.completed ? "Review" : "Start Learning"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Opportunities Tab */}
      {activeTab === 'opportunities' && (
        <div className="space-y-6">
          {/* Gigs and Jobs */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Income Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gigsAndOpportunities.map((gig) => (
                <Card key={gig.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{gig.title}</CardTitle>
                        <CardDescription>{gig.description}</CardDescription>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        gig.type === 'tutoring' ? 'bg-green-100 text-green-800' :
                        gig.type === 'freelance' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {gig.type}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Pay:</span>
                        <div className="font-semibold text-green-600">{gig.pay}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Location:</span>
                        <div className="font-medium">{gig.location}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Time:</span>
                        <div className="font-medium">{gig.timeCommitment}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Requirements:</span>
                        <div className="font-medium text-xs">{gig.requirements}</div>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stock News */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial News & Updates</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Latest Financial News
                </CardTitle>
                <CardDescription>
                  Stay informed about market trends (informational only, not investment advice)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stockNews.map((news) => (
                    <div key={news.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{news.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{news.summary}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">{news.time}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{news.category}</span>
                          </div>
                        </div>
                        <div className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${
                          news.impact === 'positive' ? 'bg-green-100 text-green-800' :
                          news.impact === 'negative' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {news.impact}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <p className="text-xs text-yellow-800">
                      <strong>Disclaimer:</strong> This information is for educational purposes only. 
                      It is not investment advice. Always do your own research and consult with 
                      qualified professionals before making investment decisions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
