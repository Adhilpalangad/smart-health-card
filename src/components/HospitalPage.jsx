import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Heart, Activity, 
  UserCheck, Droplets, LogOut, ArrowLeft, Menu, Home, Users, Eye, FileText, 
  Shield, Phone as PhoneIcon, Plus, Trash2, Building, UserPlus, Clock,
  TrendingUp, AlertCircle, CheckCircle
} from 'lucide-react';

const HospitalDashboard = () => {
  const [hospitalData, setHospitalData] = useState({
    name: 'City General Hospital',
    email: 'admin@citygeneral.com',
    phone: '+1 (555) 123-4567',
    address: '123 Healthcare Ave, Medical District',
    establishedDate: '1985-03-15',
    licenseNumber: 'HOS-2024-001',
    totalBeds: 250,
    availableBeds: 45,
    departments: 8,
    staff: 156
  });

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Smith',
      age: 35,
      gender: 'Male',
      blood: 'A+',
      phone: '+1 (555) 234-5678',
      email: 'john.smith@email.com',
      address: '456 Oak Street, City',
      emergencyContact: '+1 (555) 987-6543',
      registrationDate: '2024-01-15',
      lastVisit: '2024-01-20',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      age: 28,
      gender: 'Female',
      blood: 'O+',
      phone: '+1 (555) 345-6789',
      email: 'sarah.johnson@email.com',
      address: '789 Pine Avenue, City',
      emergencyContact: '+1 (555) 876-5432',
      registrationDate: '2024-01-10',
      lastVisit: '2024-01-18',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Michael Chen',
      age: 42,
      gender: 'Male',
      blood: 'B-',
      phone: '+1 (555) 456-7890',
      email: 'michael.chen@email.com',
      address: '321 Elm Drive, City',
      emergencyContact: '+1 (555) 765-4321',
      registrationDate: '2024-01-08',
      lastVisit: '2024-01-22',
      status: 'Inactive'
    }
  ]);

  const [visits, setVisits] = useState([
    {
      id: 1,
      patientId: 1,
      patientName: 'John Smith',
      date: '2024-01-20',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      diagnosis: 'Routine Checkup',
      status: 'Completed',
      notes: 'Blood pressure normal, heart rate stable. Continue current medication.',
      followUpRequired: false
    },
    {
      id: 2,
      patientId: 2,
      patientName: 'Sarah Johnson',
      date: '2024-01-18',
      doctor: 'Dr. Michael Chen',
      department: 'General Medicine',
      diagnosis: 'Flu Symptoms',
      status: 'Completed',
      notes: 'Prescribed rest and fluids. Follow-up if symptoms persist.',
      followUpRequired: true
    },
    {
      id: 3,
      patientId: 1,
      patientName: 'John Smith',
      date: '2024-01-15',
      doctor: 'Dr. Emily Davis',
      department: 'Dermatology',
      diagnosis: 'Skin Consultation',
      status: 'Scheduled',
      notes: 'Initial consultation for skin condition.',
      followUpRequired: false
    }
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showAddVisitModal, setShowAddVisitModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    blood: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: ''
  });

  const [newVisit, setNewVisit] = useState({
    patientId: '',
    date: '',
    doctor: '',
    department: '',
    diagnosis: '',
    status: 'Scheduled',
    notes: '',
    followUpRequired: false
  });

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'patients', name: 'Manage Patients', icon: Users },
    { id: 'visits', name: 'Manage Visits', icon: Calendar },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'settings', name: 'Hospital Settings', icon: Shield }
  ];

  const getBloodTypeColor = (bloodType) => {
    const colors = {
      'A+': 'bg-red-500', 'A-': 'bg-red-400',
      'B+': 'bg-blue-500', 'B-': 'bg-blue-400',
      'AB+': 'bg-purple-500', 'AB-': 'bg-purple-400',
      'O+': 'bg-green-500', 'O-': 'bg-green-400'
    };
    return colors[bloodType] || 'bg-gray-500';
  };

  const getGenderIcon = (gender) => {
    return gender?.toLowerCase() === 'male' ? '♂️' : gender?.toLowerCase() === 'female' ? '♀️' : '⚧️';
  };

  const handleAddPatient = () => {
    const patient = {
      ...newPatient,
      id: patients.length + 1,
      registrationDate: new Date().toISOString().split('T')[0],
      lastVisit: null,
      status: 'Active'
    };
    setPatients([...patients, patient]);
    setNewPatient({
      name: '', age: '', gender: '', blood: '', phone: '', email: '', address: '', emergencyContact: ''
    });
    setShowAddPatientModal(false);
  };

  const handleDeletePatient = (patientId) => {
    setPatients(patients.filter(p => p.id !== patientId));
    setSelectedPatient(null);
  };

  const handleAddVisit = () => {
    const selectedPatientData = patients.find(p => p.id === parseInt(newVisit.patientId));
    const visit = {
      ...newVisit,
      id: visits.length + 1,
      patientName: selectedPatientData?.name || '',
      patientId: parseInt(newVisit.patientId)
    };
    setVisits([...visits, visit]);
    setNewVisit({
      patientId: '', date: '', doctor: '', department: '', diagnosis: '', 
      status: 'Scheduled', notes: '', followUpRequired: false
    });
    setShowAddVisitModal(false);
  };

  const handleDeleteVisit = (visitId) => {
    setVisits(visits.filter(v => v.id !== visitId));
    setSelectedVisit(null);
  };

  const PatientModal = ({ patient, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Patient Details</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDeletePatient(patient.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors flex items-center space-x-2"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{patient.name}</h3>
                  <p className="text-gray-600">Patient ID: {patient.id.toString().padStart(6, '0')}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Age & Gender</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {patient.age} years • {getGenderIcon(patient.gender)} {patient.gender}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Blood Type</label>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 ${getBloodTypeColor(patient.blood)} text-white font-bold rounded-full`}>
                      {patient.blood}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-lg font-semibold text-gray-900">{patient.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-lg font-semibold text-gray-900">{patient.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="text-lg font-semibold text-gray-900">{patient.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                <p className="text-lg font-semibold text-gray-900">{patient.emergencyContact}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Registration Date</label>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(patient.registrationDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Last Visit</label>
                <p className="text-lg font-semibold text-gray-900">
                  {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'No visits yet'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {patient.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const VisitModal = ({ visit, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Visit Details</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDeleteVisit(visit.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors flex items-center space-x-2"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Patient</label>
                <p className="text-lg font-semibold text-gray-900">{visit.patientName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Date</label>
                <p className="text-lg font-semibold text-gray-900">{new Date(visit.date).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Doctor</label>
                <p className="text-lg font-semibold text-gray-900">{visit.doctor}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Department</label>
                <p className="text-lg font-semibold text-gray-900">{visit.department}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Diagnosis</label>
                <p className="text-lg font-semibold text-gray-900">{visit.diagnosis}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  visit.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                  visit.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {visit.status}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Doctor's Notes</label>
              <p className="mt-2 p-4 bg-gray-50 rounded-xl text-gray-700">{visit.notes}</p>
            </div>

            {visit.followUpRequired && (
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="text-yellow-600" size={20} />
                  <p className="font-medium text-yellow-800">Follow-up Required</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <>
      {/* Hospital Header */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              <Building size={48} />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <CheckCircle size={16} className="text-white" />
            </div>
          </div>
          
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{hospitalData.name}</h1>
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-2 lg:space-y-0 lg:space-x-4 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                License: {hospitalData.licenseNumber}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Est. {new Date(hospitalData.establishedDate).getFullYear()}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{hospitalData.address}</p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setEditing(!editing)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 hover:shadow-lg transform hover:scale-105"
            >
              <Edit size={20} />
              <span>Edit Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Patients</p>
              <p className="text-3xl font-bold text-gray-900">{patients.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Visits</p>
              <p className="text-3xl font-bold text-gray-900">{visits.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Calendar className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Available Beds</p>
              <p className="text-3xl font-bold text-gray-900">{hospitalData.availableBeds}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Activity className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Staff</p>
              <p className="text-3xl font-bold text-gray-900">{hospitalData.staff}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <UserCheck className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Patients</h3>
          <div className="space-y-4">
            {patients.slice(0, 3).map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.age} years • {patient.gender}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {patient.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Visits</h3>
          <div className="space-y-4">
            {visits.slice(0, 3).map((visit) => (
              <div key={visit.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-900">{visit.patientName}</p>
                  <p className="text-sm text-gray-600">{visit.department} • {new Date(visit.date).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  visit.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                  visit.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {visit.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderPatients = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Patients</h2>
        <button
          onClick={() => setShowAddPatientModal(true)}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Age</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Gender</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Blood</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{patient.name}</p>
                        <p className="text-sm text-gray-600">{patient.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{patient.age}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{getGenderIcon(patient.gender)} {patient.gender}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 ${getBloodTypeColor(patient.blood)} text-white font-bold rounded-full text-xs`}>
                      {patient.blood}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{patient.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedPatient(patient)}
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

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Patient</h2>
                <button
                  onClick={() => setShowAddPatientModal(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <select
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <select
                  value={newPatient.blood}
                  onChange={(e) => setNewPatient({...newPatient, blood: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none md:col-span-2"
                />
                <input
                  type="tel"
                  placeholder="Emergency Contact"
                  value={newPatient.emergencyContact}
                  onChange={(e) => setNewPatient({...newPatient, emergencyContact: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none md:col-span-2"
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleAddPatient}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Add Patient</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPatient && (
        <PatientModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
      )}
    </div>
  );

  const renderVisits = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Visits</h2>
        <button
          onClick={() => setShowAddVisitModal(true)}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Visit</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Department</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {visits.map((visit) => (
                <tr key={visit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{visit.patientName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{new Date(visit.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{visit.doctor}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{visit.department}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      visit.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      visit.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {visit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedVisit(visit)}
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

      {/* Add Visit Modal */}
      {showAddVisitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Schedule New Visit</h2>
                <button
                  onClick={() => setShowAddVisitModal(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <select
                  value={newVisit.patientId}
                  onChange={(e) => setNewVisit({...newVisit, patientId: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={newVisit.date}
                  onChange={(e) => setNewVisit({...newVisit, date: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <input
                  type="text"
                  placeholder="Doctor Name"
                  value={newVisit.doctor}
                  onChange={(e) => setNewVisit({...newVisit, doctor: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <select
                  value={newVisit.department}
                  onChange={(e) => setNewVisit({...newVisit, department: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Emergency">Emergency</option>
                </select>
                <input
                  type="text"
                  placeholder="Diagnosis"
                  value={newVisit.diagnosis}
                  onChange={(e) => setNewVisit({...newVisit, diagnosis: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none md:col-span-2"
                />
                <select
                  value={newVisit.status}
                  onChange={(e) => setNewVisit({...newVisit, status: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newVisit.followUpRequired}
                    onChange={(e) => setNewVisit({...newVisit, followUpRequired: e.target.checked})}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Follow-up Required</span>
                </label>
                <textarea
                  placeholder="Doctor's Notes"
                  value={newVisit.notes}
                  onChange={(e) => setNewVisit({...newVisit, notes: e.target.value})}
                  rows={3}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none md:col-span-2"
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleAddVisit}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Schedule Visit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedVisit && (
        <VisitModal visit={selectedVisit} onClose={() => setSelectedVisit(null)} />
      )}
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Patient Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Patients</span>
              <span className="font-bold text-gray-900">{patients.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Patients</span>
              <span className="font-bold text-green-600">{patients.filter(p => p.status === 'Active').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Male Patients</span>
              <span className="font-bold text-blue-600">{patients.filter(p => p.gender === 'Male').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Female Patients</span>
              <span className="font-bold text-pink-600">{patients.filter(p => p.gender === 'Female').length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Visit Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Visits</span>
              <span className="font-bold text-gray-900">{visits.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completed Visits</span>
              <span className="font-bold text-green-600">{visits.filter(v => v.status === 'Completed').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Scheduled Visits</span>
              <span className="font-bold text-blue-600">{visits.filter(v => v.status === 'Scheduled').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Follow-ups Required</span>
              <span className="font-bold text-orange-600">{visits.filter(v => v.followUpRequired).length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Department Activity</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Cardiology', 'General Medicine', 'Dermatology', 'Orthopedics', 'Neurology', 'Emergency'].map((dept) => {
            const visitCount = visits.filter(v => v.department === dept).length;
            return (
              <div key={dept} className="p-4 border border-gray-200 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">{dept}</h4>
                <p className="text-2xl font-bold text-blue-600">{visitCount}</p>
                <p className="text-sm text-gray-600">visits</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Hospital Settings</h2>
      
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Hospital Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Hospital Name</label>
            <p className="text-lg font-semibold text-gray-900">{hospitalData.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">License Number</label>
            <p className="text-lg font-semibold text-gray-900">{hospitalData.licenseNumber}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Phone</label>
            <p className="text-lg font-semibold text-gray-900">{hospitalData.phone}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-lg font-semibold text-gray-900">{hospitalData.email}</p>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-500">Address</label>
            <p className="text-lg font-semibold text-gray-900">{hospitalData.address}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Facility Information</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Total Beds</label>
            <p className="text-2xl font-bold text-gray-900">{hospitalData.totalBeds}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Available Beds</label>
            <p className="text-2xl font-bold text-green-600">{hospitalData.availableBeds}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Departments</label>
            <p className="text-2xl font-bold text-blue-600">{hospitalData.departments}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Staff Count</label>
            <p className="text-2xl font-bold text-purple-600">{hospitalData.staff}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'patients':
        return renderPatients();
      case 'visits':
        return renderVisits();
      case 'reports':
        return renderReports();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
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
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium hidden sm:block">Back</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <Building className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                HOSPITAL PORTAL
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                {hospitalData.name}
              </span>
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors">
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
                  onClick={() => setActiveSection(item.id)}
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
            <p>&copy; 2024 Hospital Management System - Secure & Efficient</p>
            <p className="mt-2">Managing Patient Care with Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HospitalDashboard;