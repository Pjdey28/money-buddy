'use client'

import { useState } from 'react'
import { 
  Gift, 
  Users, 
  Share2, 
  Copy, 
  Trophy, 
  Star,
  DollarSign,
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  Facebook,
  Twitter,
  MessageCircle,
  Mail,
  Link,
  Smartphone,
  UserPlus
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

const referralData = {
  totalReferred: 12,
  successfulReferrals: 8,
  pendingReferrals: 4,
  totalEarnings: 2400,
  currentTierRewards: 300,
  nextTierTarget: 15,
  referralCode: "PRIYA2024",
  shareLink: "https://financetracker.app/join/PRIYA2024"
}

const referralHistory = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.s@email.com",
    dateReferred: "2024-01-15",
    status: "completed",
    reward: 300,
    milestones: ["signup", "first_transaction", "7_day_active"],
    avatar: "👨‍💼"
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.p@email.com",
    dateReferred: "2024-01-18",
    status: "active",
    reward: 200,
    milestones: ["signup", "first_transaction"],
    avatar: "👩‍🎓"
  },
  {
    id: 3,
    name: "Arjun Kumar",
    email: "arjun.k@email.com",
    dateReferred: "2024-01-20",
    status: "pending",
    reward: 100,
    milestones: ["signup"],
    avatar: "👨‍🎓"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.r@email.com",
    dateReferred: "2024-01-22",
    status: "pending",
    reward: 0,
    milestones: [],
    avatar: "👩‍💻"
  }
]

const rewardTiers = [
  {
    tier: "Bronze",
    referralsNeeded: 0,
    rewardPerReferral: 100,
    bonusReward: 0,
    perks: ["Basic referral tracking", "Standard support"],
    color: "bg-orange-100 text-orange-800",
    current: false
  },
  {
    tier: "Silver",
    referralsNeeded: 5,
    rewardPerReferral: 200,
    bonusReward: 500,
    perks: ["Increased rewards", "Priority support", "Monthly bonus"],
    color: "bg-gray-100 text-gray-800",
    current: true
  },
  {
    tier: "Gold",
    referralsNeeded: 15,
    rewardPerReferral: 300,
    bonusReward: 1500,
    perks: ["Maximum rewards", "VIP support", "Exclusive features", "Quarterly bonus"],
    color: "bg-yellow-100 text-yellow-800",
    current: false
  },
  {
    tier: "Platinum",
    referralsNeeded: 30,
    rewardPerReferral: 500,
    bonusReward: 3000,
    perks: ["Premium rewards", "Dedicated account manager", "Beta features", "Annual bonus"],
    color: "bg-purple-100 text-purple-800",
    current: false
  }
]

const socialShareOptions = [
  {
    platform: "WhatsApp",
    icon: MessageCircle,
    color: "bg-green-500",
    shareText: "Hey! I've been using this amazing finance tracker app. Join me and we both get rewards! Use my code: PRIYA2024"
  },
  {
    platform: "Facebook",
    icon: Facebook,
    color: "bg-blue-600",
    shareText: "Managing my finances has never been easier! Join me on this finance tracker app and let's achieve our financial goals together!"
  },
  {
    platform: "Twitter",
    icon: Twitter,
    color: "bg-blue-400",
    shareText: "Loving this finance tracker! Students, you need to check this out. Use my referral code: PRIYA2024 for bonuses! 💰📊"
  },
  {
    platform: "Email",
    icon: Mail,
    color: "bg-gray-600",
    shareText: "I wanted to share something that's been helping me manage my finances better..."
  }
]

const achievements = [
  {
    id: 1,
    title: "First Referral",
    description: "Successfully refer your first friend",
    icon: "🎯",
    earned: true,
    reward: 100,
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "Social Butterfly",
    description: "Refer 5 friends successfully",
    icon: "🦋",
    earned: true,
    reward: 250,
    date: "2024-01-20"
  },
  {
    id: 3,
    title: "Network Builder",
    description: "Reach 10 successful referrals",
    icon: "🏗️",
    earned: false,
    reward: 500,
    progress: 8
  },
  {
    id: 4,
    title: "Influence Master",
    description: "Refer 25 friends successfully",
    icon: "👑",
    earned: false,
    reward: 1000,
    progress: 8
  }
]

export default function ReferralsPage() {
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'code') setCopiedCode(true)
      if (type === 'link') setCopiedLink(true)
      setTimeout(() => {
        setCopiedCode(false)
        setCopiedLink(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const currentTier = rewardTiers.find(tier => tier.current)
  const nextTier = rewardTiers.find(tier => tier.referralsNeeded > referralData.successfulReferrals)
  const progressToNextTier = nextTier ? (referralData.successfulReferrals / nextTier.referralsNeeded) * 100 : 100

  return (
    <div className="space-y-6">
      {/* Header with Beautiful Background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-display font-bold mb-2">Referral Program 🎁</h1>
          <p className="text-green-100 text-lg">Share the wealth, earn rewards together!</p>
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
                <p className="text-sm font-medium text-gray-600">Total Referred</p>
                <p className="text-3xl font-bold text-blue-600">{referralData.totalReferred}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Successful</p>
                <p className="text-3xl font-bold text-green-600">{referralData.successfulReferrals}</p>
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
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold text-purple-600">₹{referralData.totalEarnings}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Tier</p>
                <p className="text-3xl font-bold text-orange-600">{currentTier?.tier}</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Referral Code Section */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="h-5 w-5 mr-2" />
                Share Your Referral Code
              </CardTitle>
              <CardDescription>
                Invite friends and family to join. You both earn rewards when they successfully sign up!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Your Referral Code</label>
                <div className="flex items-center space-x-2">
                  <Input 
                    value={referralData.referralCode} 
                    readOnly 
                    className="font-mono text-lg bg-gray-50"
                  />
                  <Button 
                    onClick={() => copyToClipboard(referralData.referralCode, 'code')}
                    variant="outline"
                  >
                    {copiedCode ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Share Link</label>
                <div className="flex items-center space-x-2">
                  <Input 
                    value={referralData.shareLink} 
                    readOnly 
                    className="font-mono text-sm bg-gray-50"
                  />
                  <Button 
                    onClick={() => copyToClipboard(referralData.shareLink, 'link')}
                    variant="outline"
                  >
                    {copiedLink ? <CheckCircle className="h-4 w-4" /> : <Link className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Share on Social Media</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {socialShareOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <Button 
                        key={option.platform}
                        variant="outline" 
                        className="flex flex-col items-center space-y-2 h-auto py-4"
                      >
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${option.color}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="text-xs">{option.platform}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tier Progress */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Tier Progress
              </CardTitle>
              <CardDescription>
                Unlock higher tiers for better rewards and exclusive perks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    {currentTier?.tier} → {nextTier?.tier}
                  </span>
                  <span className="text-sm text-gray-600">
                    {referralData.successfulReferrals} / {nextTier?.referralsNeeded}
                  </span>
                </div>
                <Progress value={progressToNextTier} className="h-3" />
                <p className="text-xs text-gray-600 mt-1">
                  {nextTier ? `${nextTier.referralsNeeded - referralData.successfulReferrals} more referrals to reach ${nextTier.tier}` : 'Maximum tier reached!'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewardTiers.map((tier) => (
                  <div 
                    key={tier.tier}
                    className={`p-4 rounded-lg border-2 ${
                      tier.current 
                        ? 'border-green-500 bg-green-50' 
                        : referralData.successfulReferrals >= tier.referralsNeeded
                          ? 'border-gray-300 bg-gray-50'
                          : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{tier.tier}</h4>
                      {tier.current && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-sm space-y-1">
                      <p><strong>Reward:</strong> ₹{tier.rewardPerReferral}/referral</p>
                      {tier.bonusReward > 0 && (
                        <p><strong>Bonus:</strong> ₹{tier.bonusReward}</p>
                      )}
                      <p><strong>Referrals needed:</strong> {tier.referralsNeeded}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Referral History */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Referral History
              </CardTitle>
              <CardDescription>
                Track the progress of your referred friends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referralHistory.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{referral.avatar}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{referral.name}</h4>
                        <p className="text-sm text-gray-600">{referral.email}</p>
                        <p className="text-xs text-gray-500">Referred on {referral.dateReferred}</p>
                        
                        {/* Milestone Progress */}
                        <div className="flex items-center space-x-2 mt-2">
                          {['signup', 'first_transaction', '7_day_active'].map((milestone) => (
                            <div 
                              key={milestone}
                              className={`w-3 h-3 rounded-full ${
                                referral.milestones.includes(milestone) 
                                  ? 'bg-green-500' 
                                  : 'bg-gray-300'
                              }`}
                              title={milestone.replace('_', ' ').toUpperCase()}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        referral.status === 'completed' ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        ₹{referral.reward}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        referral.status === 'completed' ? 'bg-green-100 text-green-800' :
                        referral.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {referral.status}
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
          {/* How It Works */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold">Share Your Code</h4>
                  <p className="text-sm text-gray-600">Send your referral code to friends and family</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold">They Sign Up</h4>
                  <p className="text-sm text-gray-600">Your friend creates an account using your code</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold">Complete Milestones</h4>
                  <p className="text-sm text-gray-600">Earn rewards as they use the app actively</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold">4</div>
                <div>
                  <h4 className="font-semibold">Get Rewarded</h4>
                  <p className="text-sm text-gray-600">Both of you receive rewards and bonuses!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-3 rounded-lg border ${
                    achievement.earned 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`text-2xl ${achievement.earned ? '' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                      {!achievement.earned && achievement.progress && (
                        <div className="mt-2">
                          <Progress value={(achievement.progress / 10) * 100} className="h-1" />
                          <p className="text-xs text-gray-500 mt-1">{achievement.progress}/10</p>
                        </div>
                      )}
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className={`h-3 w-3 ${achievement.earned ? 'text-yellow-500' : 'text-gray-400'}`} />
                        <span className={`text-xs ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`}>
                          ₹{achievement.reward}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="font-semibold">67%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg. Time to Convert</span>
                <span className="font-semibold">3 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Best Referral Source</span>
                <span className="font-semibold">WhatsApp</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Next Payout</span>
                <span className="font-semibold">Jan 31</span>
              </div>
            </CardContent>
          </Card>

          {/* Invite More */}
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6 text-center">
              <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-80" />
              <h3 className="font-bold text-lg mb-2">Invite More Friends!</h3>
              <p className="text-green-100 text-sm mb-4">
                The more friends you invite, the more you both earn. Start sharing today!
              </p>
              <Button variant="secondary" className="w-full">
                Share Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
