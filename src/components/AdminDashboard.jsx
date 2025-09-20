import React, { useState, useEffect } from 'react';
import {
  Menu,
  ArrowLeft,
  Heart,
  LogOut,
  Users,
  Building2,
  BarChart3,
  Eye,
  Plus,
  Search,
  Filter,
  Calendar,
  Activity,
  Droplets,
  FileText,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  X,
  Save,
  UserCheck,
  Shield,
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showAddHospital, setShowAddHospital] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const [adminStats] = useState({
    totalUsers: 12847,
    totalHospitals: 156,
    activeUsers: 8932,
    totalAppointments: 45632,
    monthlyGrowth: 12.5,
    hospitalGrowth: 8.3
  });

  const [users] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      bloodType: "O+",
      age: 34,
      gender: "Male",
      registrationDate: "2024-01-15",
      lastVisit: "2024-01-20",
      status: "active",
      emergencyContact: "+1 (555) 987-6543",
      address: "123 Main St, New York, NY 10001",
      totalVisits: 5,
      medicalHistory: ["Hypertension", "Diabetes Type 2"]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 234-5678",
      bloodType: "A-",
      age: 28,
      gender: "Female",
      registrationDate: "2024-01-10",
      lastVisit: "2024-01-18",
      status: "active",
      emergencyContact: "+1 (555) 876-5432",
      address: "456 Oak Ave, Los Angeles, CA 90001",
      totalVisits: 3,
      medicalHistory: ["Asthma"]
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "m.brown@email.com",
      phone: "+1 (555) 345-6789",
      bloodType: "B+",
      age: 45,
      gender: "Male",
      registrationDate: "2024-01-05",
      lastVisit: "2024-01-12",
      status: "inactive",
      emergencyContact: "+1 (555) 765-4321",
      address: "789 Pine St, Chicago, IL 60601",
      totalVisits: 8,
      medicalHistory: ["Heart Disease", "High Cholesterol"]
    }
  ]);

  const [hospitals] = useState([
    {
      id: 1,
      name: "City General Hospital",
      address: "123 Medical Center Drive, New York, NY 10001",
      phone: "+1 (555) 100-2000",
      email: "info@citygeneralhospital.com",
      type: "General Hospital",
      beds: 500,
      departments: ["Emergency", "Cardiology", "Orthopedics", "Neurology", "Pediatrics"],
      rating: 4.8,
      established: "1985",
      director: "Dr. Emily Watson",
      status: "active",
      totalPatients: 15420,
      emergencyServices: true,
      accreditation: "JCI Accredited"
    },
    {
      id: 2,
      name: "St. Mary Medical Center",
      address: "456 Healthcare Blvd, Los Angeles, CA 90001",
      phone: "+1 (555) 200-3000",
      email: "contact@stmarymedical.com",
      type: "Specialty Hospital",
      beds: 350,
      departments: ["Oncology", "Cardiology", "Surgery", "ICU"],
      rating: 4.6,
      established: "1992",
      director: "Dr. Robert Chen",
      status: "active",
      totalPatients: 8750,
      emergencyServices: true,
      accreditation: "NABH Accredited"
    },
    {
      id: 3,
      name: "Community Health Center",
      address: "789 Community Way, Chicago, IL 60601",
      phone: "+1 (555) 300-4000",
      email: "info@communityhealthcenter.org",
      type: "Community Hospital",
      beds: 150,
      departments: ["Family Medicine", "Pediatrics", "Women's Health"],
      rating: 4.2,
      established: "2005",
      director: "Dr. Lisa Martinez",
      status: "active",
      totalPatients: 4200,
      emergencyServices: false,
      accreditation: "State Licensed"
    }
  ]);

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'users', name: 'Manage Users', icon: Users },
    { id: 'hospitals', name: 'Manage Hospitals', icon: Building2 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBloodTypeColor = (bloodType) => {
    const colors = {
      'A+': 'bg-red-500', 'A-': 'bg-red-600',
      'B+': 'bg-blue-500', 'B-': 'bg-blue-600',
      'AB+': 'bg-purple-500', 'AB-': 'bg-purple-600',
      'O+': 'bg-green-500', 'O-': 'bg-green-600'
    };
    return colors[bloodType] || 'bg-gray-500';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || hospital.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">+{adminStats.monthlyGrowth}%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{adminStats.totalUsers.toLocaleString()}</h3>
          <p className="text-gray-600">Total Users</p>
          <p className="text-sm text-green-600 mt-2">{adminStats.activeUsers.toLocaleString()} active this month</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Building2 className="text-green-600" size={24} />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">+{adminStats.hospitalGrowth}%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{adminStats.totalHospitals}</h3>
          <p className="text-gray-600">Total Hospitals</p>
          <p className="text-sm text-green-600 mt-2">12 new partnerships</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">+18%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{adminStats.totalAppointments.toLocaleString()}</h3>
          <p className="text-gray-600">Total Appointments</p>
          <p className="text-sm text-green-600 mt-2">1,245 this week</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Activity className="text-orange-600" size={24} />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">+5.2%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">98.5%</h3>
          <p className="text-gray-600">System Uptime</p>
          <p className="text-sm text-green-600 mt-2">Excellent performance</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent User Registrations</h3>
          <div className="space-y-4">
            {users.slice(0, 5).map((user, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Hospital Performance</h3>
          <div className="space-y-4">
            {hospitals.slice(0, 5).map((hospital, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Building2 className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{hospital.name}</h4>
                    <p className="text-sm text-gray-600">{hospital.totalPatients.toLocaleString()} patients</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-yellow-600">
                    <span className="text-lg font-bold">★</span>
                    <span className="font-semibold">{hospital.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">Manage Users</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {selectedUser ? (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">User Details</h3>
            <button
              onClick={() => setSelectedUser(null)}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors"
            >
              Back to List
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  {selectedUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedUser.status)}`}>
                    {selectedUser.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedUser.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedUser.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedUser.emergencyContact}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Blood Type</label>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 ${getBloodTypeColor(selectedUser.bloodType)} text-white font-bold rounded-full`}>
                      {selectedUser.bloodType}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Age & Gender</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedUser.age} years, {selectedUser.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Registration Date</label>
                  <p className="text-lg font-semibold text-gray-900">{new Date(selectedUser.registrationDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Visit</label>
                  <p className="text-lg font-semibold text-gray-900">{new Date(selectedUser.lastVisit).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Visits</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedUser.totalVisits}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Medical History</label>
                <div className="mt-2 space-y-2">
                  {selectedUser.medicalHistory.map((condition, index) => (
                    <span key={index} className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium mr-2">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">User</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Blood Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Last Visit</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 ${getBloodTypeColor(user.bloodType)} text-white font-bold rounded-full text-xs`}>
                        {user.bloodType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(user.lastVisit).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors"
                      >
                        <Eye size={14} />
                        <span className="text-xs">View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const renderHospitals = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">Manage Hospitals</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            onClick={() => setShowAddHospital(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors"
          >
            <Plus size={20} />
            <span>Add Hospital</span>
          </button>
        </div>
      </div>

      {selectedHospital ? (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Hospital Details</h3>
            <button
              onClick={() => setSelectedHospital(null)}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors"
            >
              Back to List
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Building2 className="text-white" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedHospital.name}</h3>
                  <p className="text-gray-600">{selectedHospital.type}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold">{selectedHospital.rating}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedHospital.status)}`}>
                      {selectedHospital.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedHospital.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact Information</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedHospital.phone}</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedHospital.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Director</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedHospital.director}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Bed Capacity</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedHospital.beds} beds</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Patients</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedHospital.totalPatients.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Established</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedHospital.established}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Accreditation</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedHospital.accreditation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Emergency Services</label>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedHospital.emergencyServices ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedHospital.emergencyServices ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Departments</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedHospital.departments.map((dept, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : showAddHospital ? (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Add New Hospital</h3>
            <button
              onClick={() => setShowAddHospital(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <form className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter hospital name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Type</label>
                <select className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  <option value="">Select type</option>
                  <option value="General Hospital">General Hospital</option>
                  <option value="Specialty Hospital">Specialty Hospital</option>
                  <option value="Community Hospital">Community Hospital</option>
                  <option value="Teaching Hospital">Teaching Hospital</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  rows="3"
                  placeholder="Enter complete address"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Director Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter director name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bed Capacity</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter bed capacity"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter year established"
                />
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departments</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter departments (comma separated)"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Emergency Services Available</span>
                </label>
              </div>
              
              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors"
                >
                  Add Hospital
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddHospital(false)}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Hospital</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Beds</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Patients</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredHospitals.map((hospital) => (
                  <tr key={hospital.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                          <Building2 className="text-white" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{hospital.name}</p>
                          <p className="text-sm text-gray-600">{hospital.director}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{hospital.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{hospital.beds}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{hospital.totalPatients.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-semibold">{hospital.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hospital.status)}`}>
                        {hospital.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedHospital(hospital)}
                          className="flex items-center space-x-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors"
                        >
                          <Eye size={14} />
                          <span className="text-xs">View</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors">
                          <Edit size={14} />
                          <span className="text-xs">Edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return renderUsers();
      case 'hospitals':
        return renderHospitals();
      default:
        return renderDashboard();
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Admin logged out');
  };

  const handleBackClick = () => {
    // Add navigation logic here
    console.log('Navigate back');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              
              <button
                onClick={handleBackClick}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium hidden sm:block">Back</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                MEDCARD ADMIN
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                Admin Dashboard
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 min-h-screen transition-all duration-300 ease-in-out`}>
          <div className="p-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSelectedUser(null);
                    setSelectedHospital(null);
                    setShowAddHospital(false);
                    setSearchTerm('');
                    setFilterStatus('all');
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={20} />
                  {sidebarOpen && <span className="font-medium">{item.name}</span>}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 MEDCARD Admin Panel - Healthcare Management System</p>
            <p className="mt-2">Secure Administrative Dashboard</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;