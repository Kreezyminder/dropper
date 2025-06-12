import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Clock,
  Star,
  RefreshCw,
  AlertTriangle
} from 'lucide-react'
import './App.css'

// Mock data for demonstration
const salesData = [
  { name: 'Jan', revenue: 4000, orders: 240 },
  { name: 'Feb', revenue: 3000, orders: 198 },
  { name: 'Mar', revenue: 5000, orders: 300 },
  { name: 'Apr', revenue: 4500, orders: 278 },
  { name: 'May', revenue: 6000, orders: 350 },
  { name: 'Jun', revenue: 5500, orders: 325 }
]

const topProducts = [
  { name: 'Mini Waffle Maker', sales: 1250, revenue: 36250 },
  { name: 'Portable Blender', sales: 980, revenue: 29400 },
  { name: 'Insulated Tumbler', sales: 750, revenue: 22500 },
  { name: 'Skincare Tool Set', sales: 620, revenue: 24800 },
  { name: 'Personalized Jewelry', sales: 450, revenue: 22500 }
]

const channelData = [
  { name: 'TikTok Shop', value: 35, color: '#8884d8' },
  { name: 'Amazon', value: 30, color: '#82ca9d' },
  { name: 'Etsy', value: 20, color: '#ffc658' },
  { name: 'Own Website', value: 15, color: '#ff7300' }
]

function App() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d')

  const MetricCard = ({ title, value, change, icon: Icon, trend }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {trend === 'up' ? (
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
          )}
          <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
            {change}
          </span>
          <span className="ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dropshipping Operations Dashboard</h1>
              <p className="text-muted-foreground">Monitor your business performance in real-time</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </Button>
              <Badge variant="secondary">Last updated: 2 min ago</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Time Range Selector */}
        <div className="mb-6">
          <Tabs value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <TabsList>
              <TabsTrigger value="7d">7 Days</TabsTrigger>
              <TabsTrigger value="30d">30 Days</TabsTrigger>
              <TabsTrigger value="90d">90 Days</TabsTrigger>
              <TabsTrigger value="1y">1 Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <MetricCard
            title="Total Revenue"
            value="$28,450"
            change="+12.5%"
            icon={DollarSign}
            trend="up"
          />
          <MetricCard
            title="Total Orders"
            value="1,691"
            change="+8.2%"
            icon={ShoppingCart}
            trend="up"
          />
          <MetricCard
            title="Avg. Order Value"
            value="$16.83"
            change="+3.1%"
            icon={TrendingUp}
            trend="up"
          />
          <MetricCard
            title="Customer Satisfaction"
            value="4.7/5"
            change="-0.1"
            icon={Star}
            trend="down"
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Revenue & Orders Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Orders Trend</CardTitle>
              <CardDescription>Monthly performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                  <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sales by Channel */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Channel</CardTitle>
              <CardDescription>Revenue distribution across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Best performers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">${product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Operational Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Metrics</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Avg. Shipping Time</span>
                    <span>5.2 days</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Target: 7 days</p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Order Fulfillment Rate</span>
                    <span>98.5%</span>
                  </div>
                  <Progress value={98.5} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Target: 95%</p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Return Rate</span>
                    <span>2.1%</span>
                  </div>
                  <Progress value={21} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Target: &lt;5%</p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Customer Acquisition Cost</span>
                    <span>$8.50</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Target: &lt;$10</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Alerts & Notifications</CardTitle>
              <CardDescription>Important updates and warnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Low Stock Alert</p>
                    <p className="text-xs text-muted-foreground">Mini Waffle Maker inventory below 50 units</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Sales Milestone</p>
                    <p className="text-xs text-muted-foreground">Reached 1,500 orders this month!</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Shipping Delay</p>
                    <p className="text-xs text-muted-foreground">3 orders delayed due to supplier issues</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App

