import { useState } from 'react';
import { AlertCircle, Droplet, Users, MapPin, Award, TrendingUp, Wind } from 'lucide-react';

// Hardcoded login credentials
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'viscount2024';

// Mock database data for urinals
const mockUrinalData = [
  { id: 'URN-001', location: 'Building A - Floor 1', uses: 2450, maxUses: 5000, status: 'good', lastMaintenance: '2024-09-15' },
  { id: 'URN-002', location: 'Building A - Floor 2', uses: 4200, maxUses: 5000, status: 'warning', lastMaintenance: '2024-08-20' },
  { id: 'URN-003', location: 'Building B - Floor 1', uses: 5100, maxUses: 5000, status: 'replace', lastMaintenance: '2024-07-10' },
  { id: 'URN-004', location: 'Building B - Floor 2', uses: 1800, maxUses: 5000, status: 'good', lastMaintenance: '2024-09-28' },
  { id: 'URN-005', location: 'Building C - Floor 1', uses: 3600, maxUses: 5000, status: 'good', lastMaintenance: '2024-09-01' },
  { id: 'URN-006', location: 'Building C - Floor 2', uses: 4800, maxUses: 5000, status: 'warning', lastMaintenance: '2024-08-05' },
  { id: 'URN-007', location: 'Building D - Floor 1', uses: 5300, maxUses: 5000, status: 'replace', lastMaintenance: '2024-06-22' },
  { id: 'URN-008', location: 'Building D - Floor 2', uses: 2100, maxUses: 5000, status: 'good', lastMaintenance: '2024-09-18' },
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setIsLoggedIn(true);
      setCurrentPage('database');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'home' && <HomePage onNavigateToLogin={() => setCurrentPage('login')} />}
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} onBack={() => setCurrentPage('home')} />}
      {currentPage === 'database' && isLoggedIn && <DatabasePage onLogout={handleLogout} />}
    </div>
  );
}

function HomePage({ onNavigateToLogin }) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Droplet className="w-10 h-10 text-green-400" />
            <h1 className="text-3xl font-bold">Viscount Waterless</h1>
          </div>
          <button
            onClick={onNavigateToLogin}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 text-white py-24 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Revolutionizing Water Conservation</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Leading the industry with innovative waterless urinal technology, saving millions of gallons of water annually while maintaining the highest standards of hygiene.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-blue-900 mb-4">About Viscount Waterless</h3>
            <div className="w-24 h-1 bg-green-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Founded with a vision to transform traditional restroom facilities, Viscount Waterless has become a pioneer in sustainable sanitation solutions. Our innovative waterless urinal systems eliminate the need for water-based flushing, providing significant environmental and economic benefits.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With over a decade of experience, we've installed thousands of units worldwide, saving over 100 million gallons of water annually and reducing maintenance costs for our clients by up to 80%.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-900 p-3 rounded-lg">
                    <Droplet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-2">100M+ Gallons Saved</h4>
                    <p className="text-gray-600">Making a real impact on water conservation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-2">Award-Winning Technology</h4>
                    <p className="text-gray-600">Recognized globally for innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-blue-900 mb-4">What We Do</h3>
            <div className="w-24 h-1 bg-green-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Droplet className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-4">Waterless Urinal Systems</h4>
              <p className="text-gray-600">
                Our patented waterless technology uses advanced trap systems that eliminate odors without requiring any water for flushing, saving thousands of gallons per unit annually.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-4">Smart Monitoring</h4>
              <p className="text-gray-600">
                Real-time usage tracking and predictive maintenance alerts ensure optimal performance and help facilities managers stay ahead of maintenance needs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-4">Sustainability Consulting</h4>
              <p className="text-gray-600">
                We help organizations achieve their environmental goals through comprehensive water conservation strategies and sustainable facility management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-blue-900 mb-4">Our Team</h3>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A dedicated team of innovators, engineers, and sustainability experts committed to transforming the future of water conservation.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'Timothy Canev & Filip Fekete', role: 'Software Engineers', icon: Users },
              { name: 'Meno daj sem', role: 'Mechatronics', icon: TrendingUp },
              { name: 'Meno daj sem', role: 'Electronics', icon: Award },
              { name: 'Meno daj sem', role: 'EIB', icon: Wind },
              { name: 'Meno daj sem', role: 'EIB', icon: Droplet },
              { name: 'Meno daj sem', role: 'EIB', icon: Droplet }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-blue-900 to-green-700 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <member.icon className="w-16 h-16 text-white" />
                </div>
                <h4 className="font-bold text-blue-900 text-lg mb-2">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-blue-900 mb-4">Our Locations</h3>
            <div className="w-24 h-1 bg-green-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <MapPin className="w-12 h-12 text-green-600 mb-4" />
              <h4 className="text-xl font-bold text-blue-900 mb-3">Headquarters</h4>
              <p className="text-gray-600 mb-2">1234 Innovation Drive</p>
              <p className="text-gray-600 mb-2">San Francisco, CA 94105</p>
              <p className="text-gray-600">United States</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <MapPin className="w-12 h-12 text-green-600 mb-4" />
              <h4 className="text-xl font-bold text-blue-900 mb-3">European Office</h4>
              <p className="text-gray-600 mb-2">45 Green Park Road</p>
              <p className="text-gray-600 mb-2">London, EC2M 4TH</p>
              <p className="text-gray-600">United Kingdom</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <MapPin className="w-12 h-12 text-green-600 mb-4" />
              <h4 className="text-xl font-bold text-blue-900 mb-3">Asia Pacific Office</h4>
              <p className="text-gray-600 mb-2">88 Marina Boulevard</p>
              <p className="text-gray-600 mb-2">Singapore 018987</p>
              <p className="text-gray-600">Singapore</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-8 bg-gradient-to-r from-blue-900 to-green-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-12">Our Environmental Impact</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">100M+</div>
              <div className="text-blue-100">Gallons Saved Annually</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">10K+</div>
              <div className="text-blue-100">Units Installed</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-blue-100">Corporate Clients</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">35+</div>
              <div className="text-blue-100">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-8 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-blue-200">© 2025 Viscount Waterless. All rights reserved.</p>
          <p className="text-blue-300 mt-2">Leading the future of sustainable sanitation.</p>
        </div>
      </footer>
    </div>
  );
}

function LoginPage({ onLogin, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError('Invalid username or password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Droplet className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-blue-900">Viscount Waterless</h2>
          <p className="text-gray-600 mt-2">Admin Dashboard Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Login
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo credentials:</p>
          <p className="font-mono">Username: admin | Password: viscount2024</p>
        </div>
      </div>
    </div>
  );
}

function DatabasePage({ onLogout }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'replace': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'good': return 'Good Condition';
      case 'warning': return 'Maintenance Soon';
      case 'replace': return 'Replacement Needed';
      default: return 'Unknown';
    }
  };

  const goodCount = mockUrinalData.filter(u => u.status === 'good').length;
  const warningCount = mockUrinalData.filter(u => u.status === 'warning').length;
  const replaceCount = mockUrinalData.filter(u => u.status === 'replace').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-4 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Droplet className="w-8 h-8 text-green-400" />
            <div>
              <h1 className="text-2xl font-bold">Viscount Waterless</h1>
              <p className="text-blue-200 text-sm">Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Units</h3>
            <p className="text-3xl font-bold text-blue-900">{mockUrinalData.length}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-md border-2 border-green-200">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Good Condition</h3>
            <p className="text-3xl font-bold text-green-700">{goodCount}</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg shadow-md border-2 border-yellow-200">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Needs Maintenance</h3>
            <p className="text-3xl font-bold text-yellow-700">{warningCount}</p>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow-md border-2 border-red-200">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Replacement Needed</h3>
            <p className="text-3xl font-bold text-red-700">{replaceCount}</p>
          </div>
        </div>

        {/* Database Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-green-800 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Urinal Usage Database</h2>
            <p className="text-blue-100 text-sm mt-1">Real-time monitoring and maintenance tracking</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Unit ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Usage Count
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Usage %
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Last Maintenance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockUrinalData.map((urinal) => {
                  const usagePercent = Math.round((urinal.uses / urinal.maxUses) * 100);
                  return (
                    <tr key={urinal.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono font-semibold text-blue-900">{urinal.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {urinal.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-900">{urinal.uses.toLocaleString()}</span>
                        <span className="text-gray-500 text-sm"> / {urinal.maxUses.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                usagePercent >= 100 ? 'bg-red-600' :
                                usagePercent >= 80 ? 'bg-yellow-500' : 'bg-green-600'
                              }`}
                              style={{ width: `${Math.min(usagePercent, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{usagePercent}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {urinal.lastMaintenance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(urinal.status)}`}>
                          {getStatusText(urinal.status)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alert Section */}
        {replaceCount > 0 && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-2">Immediate Action Required</h3>
                <p className="text-red-700">
                  {replaceCount} urinal{replaceCount > 1 ? 's have' : ' has'} exceeded the maximum usage threshold and require{replaceCount === 1 ? 's' : ''} immediate replacement to maintain optimal performance and hygiene standards.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;