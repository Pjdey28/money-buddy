'use client'

import { useState } from 'react'
import { 
  Users, 
  Plus, 
  Upload, 
  DollarSign,
  Share,
  Calculator,
  CreditCard,
  QrCode,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data for bill splitting
const mockSplits = [
  {
    id: 1,
    title: 'Rent - January 2025',
    totalAmount: 12000,
    participants: ['Alex', 'Priya', 'Rohan'],
    status: 'pending',
    creator: 'Alex',
    dueDate: '2025-01-31',
    paid: [{ name: 'Alex', amount: 4000 }],
    pending: [
      { name: 'Priya', amount: 4000 },
      { name: 'Rohan', amount: 4000 }
    ]
  },
  {
    id: 2,
    title: 'Goa Trip Expenses',
    totalAmount: 8500,
    participants: ['Alex', 'Kavya', 'Amit', 'Neha'],
    status: 'completed',
    creator: 'Kavya',
    dueDate: '2025-01-15',
    paid: [
      { name: 'Alex', amount: 2125 },
      { name: 'Kavya', amount: 2125 },
      { name: 'Amit', amount: 2125 },
      { name: 'Neha', amount: 2125 }
    ],
    pending: []
  },
  {
    id: 3,
    title: 'Dinner at Restaurant',
    totalAmount: 2400,
    participants: ['Alex', 'Priya'],
    status: 'settling',
    creator: 'Priya',
    dueDate: '2025-01-20',
    paid: [{ name: 'Priya', amount: 2400 }],
    pending: [{ name: 'Alex', amount: 1200 }]
  }
]

export default function SplitBillsPage() {
  const [showCreateSplit, setShowCreateSplit] = useState(false)
  const [newSplit, setNewSplit] = useState({
    title: '',
    amount: '',
    participants: [''],
    splitType: 'equal'
  })

  const handleCreateSplit = (e) => {
    e.preventDefault()
    console.log('Creating split:', newSplit)
    setNewSplit({ title: '', amount: '', participants: [''], splitType: 'equal' })
    setShowCreateSplit(false)
  }

  const addParticipant = () => {
    setNewSplit({
      ...newSplit,
      participants: [...newSplit.participants, '']
    })
  }

  const updateParticipant = (index, value) => {
    const updated = [...newSplit.participants]
    updated[index] = value
    setNewSplit({ ...newSplit, participants: updated })
  }

  const removeParticipant = (index) => {
    const updated = newSplit.participants.filter((_, i) => i !== index)
    setNewSplit({ ...newSplit, participants: updated })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">UPI Bill Splitting</h1>
          <p className="text-gray-600 mt-1">Split expenses and settle up with friends instantly</p>
        </div>
        <Button 
          onClick={() => setShowCreateSplit(true)}
          className="bg-gradient-to-r from-orange-400 to-orange-800 hover:from-orange-300 hover:to-orange-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Split
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6 text-center">
            <Upload className="h-12 w-12 mx-auto text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Upload Bill</h3>
            <p className="text-sm text-gray-600">Scan receipt and auto-split</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <Calculator className="h-12 w-12 mx-auto text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Manual Split</h3>
            <p className="text-sm text-gray-600">Enter amounts manually</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <QrCode className="h-12 w-12 mx-auto text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900">QR Split</h3>
            <p className="text-sm text-gray-600">Share via QR code</p>
          </CardContent>
        </Card>
      </div>

      {/* Create Split Modal */}
      {showCreateSplit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create Bill Split</CardTitle>
              <CardDescription>Split a bill with friends and family</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateSplit} className="space-y-4">
                <Input
                  placeholder="Bill description (e.g., Dinner at Pizza Hut)"
                  value={newSplit.title}
                  onChange={(e) => setNewSplit({...newSplit, title: e.target.value})}
                  required
                />
                
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <Input
                    type="number"
                    placeholder="Total amount"
                    value={newSplit.amount}
                    onChange={(e) => setNewSplit({...newSplit, amount: e.target.value})}
                    className="pl-8"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Split Type
                  </label>
                  <select 
                    value={newSplit.splitType}
                    onChange={(e) => setNewSplit({...newSplit, splitType: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="equal">Split Equally</option>
                    <option value="percentage">By Percentage</option>
                    <option value="custom">Custom Amounts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Participants
                  </label>
                  {newSplit.participants.map((participant, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <Input
                        placeholder="Name or phone number"
                        value={participant}
                        onChange={(e) => updateParticipant(index, e.target.value)}
                        className="flex-1"
                      />
                      {newSplit.participants.length > 1 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeParticipant(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addParticipant}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Participant
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">Create Split</Button>
                  <Button variant="outline" onClick={() => setShowCreateSplit(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Active Splits */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Your Bill Splits</h2>
        
        {mockSplits.map((split) => (
          <Card key={split.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{split.title}</CardTitle>
                  <CardDescription>
                    Created by {split.creator} • Due: {new Date(split.dueDate).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  split.status === 'completed' ? 'bg-green-100 text-green-800' :
                  split.status === 'settling' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {split.status === 'completed' ? '✓ Completed' :
                   split.status === 'settling' ? '⏳ Settling' : '❌ Pending'}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Total Amount */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Total Amount</span>
                <span className="text-xl font-bold">₹{split.totalAmount.toLocaleString()}</span>
              </div>

              {/* Participants Status */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Payment Status</h4>
                
                {/* Paid participants */}
                {split.paid.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{payment.name}</span>
                      <span className="text-sm text-gray-600">• Paid</span>
                    </div>
                    <span className="font-semibold text-green-700">₹{payment.amount.toLocaleString()}</span>
                  </div>
                ))}

                {/* Pending participants */}
                {split.pending.map((pending, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-red-600" />
                      <span className="font-medium">{pending.name}</span>
                      <span className="text-sm text-gray-600">• Owes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-red-700">₹{pending.amount.toLocaleString()}</span>
                      {pending.name === 'Alex' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CreditCard className="h-3 w-3 mr-1" />
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Share className="h-4 w-4 mr-2" />
                  Share Split
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {split.status !== 'completed' && (
                  <Button size="sm" className="flex-1">
                    Send Reminder
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* UPI Integration Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            UPI Integration
          </CardTitle>
          <CardDescription>Seamless payments with all major UPI apps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-sm font-medium">Google Pay</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl mb-2">💜</div>
              <div className="text-sm font-medium">PhonePe</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl mb-2">🔵</div>
              <div className="text-sm font-medium">Paytm</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm font-medium">Other UPI</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">How it works:</h4>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Create a split and add participants</li>
              <li>2. Share invite links with non-users</li>
              <li>3. Participants get UPI payment links</li>
              <li>4. One-tap payments settle the bill</li>
              <li>5. Everyone gets notifications when paid</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">47</div>
            <div className="text-sm text-gray-600">Total Splits Created</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">₹23,450</div>
            <div className="text-sm text-gray-600">Total Amount Split</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
            <div className="text-sm text-gray-600">Settlement Rate</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
