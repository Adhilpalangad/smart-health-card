import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Heart, Activity, UserCheck, Droplets, LogOut, ArrowLeft, Menu, Home, Users, Eye, FileText, Shield, Phone as PhoneIcon } from 'lucide-react';
import { auth, db } from '../config/firebase.js';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const PatientProfile = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedVisit, setSelectedVisit] = useState(null);
  const navigate = useNavigate();

  // Sample data for demonstrations
  const [visitingRecords] = useState([
    {
      id: 1,
      date: '2024-01-15',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      diagnosis: 'Routine Checkup',
      status: 'Completed',
      notes: 'Blood pressure normal, heart rate stable. Continue current medication.'
    },
    {
      id: 2,
      date: '2024-01-08',
      doctor: 'Dr. Michael Chen',
      department: 'General Medicine',
      diagnosis: 'Flu Symptoms',
      status: 'Completed',
      notes: 'Prescribed rest and fluids. Follow-up if symptoms persist.'
    },
    {
      id: 3,
      date: '2024-01-02',
      doctor: 'Dr. Emily Davis',
      department: 'Dermatology',
      diagnosis: 'Skin Consultation',
      status: 'Completed',
      notes: 'Recommended sunscreen use and moisturizer for dry skin.'
    }
  ]);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setCurrentUser(user);
        fetchPatientData(user.uid);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchPatientData = async (userId) => {
    try {
      setLoading(true);
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = { id: docSnap.id, ...docSnap.data() };
        setPatientData(userData);
        setEditData(userData);
      } else {
        const initialData = {
          name: currentUser?.displayName || '',
          email: currentUser?.email || '',
          phone: '',
          age: '',
          gender: '',
          blood: '',
          address: '',
          emergencyContact: '',
          dateOfBirth: '',
          registrationDate: new Date().toISOString().split('T')[0]
        };
        
        await setDoc(docRef, initialData);
        setPatientData({ id: userId, ...initialData });
        setEditData({ id: userId, ...initialData });
      }
    } catch (err) {
      console.error('Error fetching patient data:', err);
      setError('Failed to load your profile data');
    } finally {
      setLoading(false);
    }
  };

  const updatePatientData = async () => {
    try {
      if (!currentUser) {
        setError('User not authenticated');
        return;
      }

      const docRef = doc(db, 'users', currentUser.uid);
      await updateDoc(docRef, editData);
      setPatientData(editData);
      setEditing(false);
      setError(null);
    } catch (err) {
      console.error('Error updating patient data:', err);
      setError('Failed to update your profile');
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Error signing out:', err);
      setError('Failed to sign out');
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const getGenderIcon = (gender) => {
    return gender?.toLowerCase() === 'male' ? '♂️' : gender?.toLowerCase() === 'female' ? '♀️' : '⚧️';
  };

  const getBloodTypeColor = (bloodType) => {
    const colors = {
      'A+': 'bg-red-500', 'A-': 'bg-red-400',
      'B+': 'bg-blue-500', 'B-': 'bg-blue-400',
      'AB+': 'bg-purple-500', 'AB-': 'bg-purple-400',
      'O+': 'bg-green-500', 'O-': 'bg-green-400'
    };
    return colors[bloodType] || 'bg-gray-500';
  };

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'visiting', name: 'Visiting Records', icon: Users },
    { id: 'bloodbank', name: 'Blood Bank', icon: Droplets },
    { id: 'emergency', name: 'Emergency Contact', icon: PhoneIcon },
    { id: 'documents', name: 'Medical Documents', icon: FileText }
  ];

  const renderVisitingRecords = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Visiting Records</h2>
      
      {selectedVisit ? (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Visit Details</h3>
            <button
              onClick={() => setSelectedVisit(null)}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors"
            >
              Back to List
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Date</label>
                <p className="text-lg font-semibold text-gray-900">{new Date(selectedVisit.date).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Doctor</label>
                <p className="text-lg font-semibold text-gray-900">{selectedVisit.doctor}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Department</label>
                <p className="text-lg font-semibold text-gray-900">{selectedVisit.department}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Diagnosis</label>
                <p className="text-lg font-semibold text-gray-900">{selectedVisit.diagnosis}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {selectedVisit.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-500">Doctor's Notes</label>
            <p className="mt-2 p-4 bg-gray-50 rounded-xl text-gray-700">{selectedVisit.notes}</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Doctor</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Diagnosis</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {visitingRecords.map((visit) => (
                  <tr key={visit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(visit.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{visit.doctor}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{visit.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{visit.diagnosis}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
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
      )}
    </div>
  );

  const renderBloodBank = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Blood Bank Information</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Your Blood Type</h3>
          <div className="text-center">
            {patientData?.blood ? (
              <div className={`inline-flex items-center justify-center w-24 h-24 ${getBloodTypeColor(patientData.blood)} text-white font-bold text-2xl rounded-full mb-4`}>
                {patientData.blood}
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-300 text-gray-600 font-bold text-lg rounded-full mb-4">
                N/A
              </div>
            )}
            <p className="text-gray-600">
              {patientData?.blood ? 'Your registered blood type' : 'Please update your profile to add blood type'}
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Donation History</h3>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-xl">
              <p className="font-medium text-red-800">Last Donation</p>
              <p className="text-sm text-red-600">No donation records found</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="font-medium text-blue-800">Eligible for Donation</p>
              <p className="text-sm text-blue-600">Contact blood bank for availability</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Nearby Blood Banks</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'City General Hospital Blood Bank', distance: '2.3 km', phone: '+1 (555) 123-4567' },
            { name: 'Red Cross Blood Center', distance: '3.1 km', phone: '+1 (555) 234-5678' },
            { name: 'Community Health Blood Bank', distance: '4.5 km', phone: '+1 (555) 345-6789' }
          ].map((bank, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-2">{bank.name}</h4>
              <p className="text-sm text-gray-600 mb-1">{bank.distance} away</p>
              <p className="text-sm text-blue-600">{bank.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEmergencyContact = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contacts</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Emergency Contact</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Contact Number</label>
              <p className="text-lg font-semibold text-gray-900">
                {patientData?.emergencyContact || 'Not provided'}
              </p>
            </div>
            <button
              onClick={() => setActiveSection('dashboard')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
            >
              Update in Profile
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Medical Emergency</h3>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="text-red-600" size={20} />
                <p className="font-bold text-red-800">Emergency Services</p>
              </div>
              <p className="text-2xl font-bold text-red-600">911</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Hospital Emergency Contacts</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'City General Hospital', phone: '+1 (555) 911-1111', type: 'Emergency Room' },
            { name: 'St. Mary Medical Center', phone: '+1 (555) 911-2222', type: 'Trauma Center' },
            { name: 'Community Hospital', phone: '+1 (555) 911-3333', type: 'Emergency Care' }
          ].map((hospital, index) => (
            <div key={index} className="p-4 border border-red-200 rounded-xl bg-red-50">
              <h4 className="font-semibold text-red-900 mb-1">{hospital.name}</h4>
              <p className="text-sm text-red-700 mb-2">{hospital.type}</p>
              <p className="text-lg font-bold text-red-600">{hospital.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMedicalDocuments = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Documents</h2>
      
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Document Library</h3>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            Upload Document
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { name: 'Lab Results - Blood Test', date: '2024-01-15', type: 'PDF', size: '245 KB' },
            { name: 'X-Ray Report - Chest', date: '2024-01-10', type: 'PDF', size: '1.2 MB' },
            { name: 'Prescription - Dr. Johnson', date: '2024-01-08', type: 'PDF', size: '89 KB' },
            { name: 'Medical History Summary', date: '2024-01-01', type: 'PDF', size: '156 KB' }
          ].map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="text-red-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                  <p className="text-sm text-gray-500">{doc.date} • {doc.type} • {doc.size}</p>
                </div>
              </div>
              <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors">
                <Eye size={14} />
                <span className="text-sm">View</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Document Categories</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Lab Reports', count: 5, icon: Activity },
            { name: 'X-Rays & Scans', count: 3, icon: Eye },
            { name: 'Prescriptions', count: 8, icon: FileText },
            { name: 'Insurance', count: 2, icon: Shield }
          ].map((category, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-xl text-center hover:bg-gray-50">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <category.icon className="text-blue-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{category.name}</h4>
              <p className="text-sm text-gray-600">{category.count} documents</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <>
      {/* Patient Header */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {patientData?.name ? patientData.name.split(' ').map(n => n[0]).join('').toUpperCase() : currentUser?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <UserCheck size={16} className="text-white" />
            </div>
          </div>
          
          <div className="flex-1 text-center lg:text-left">
            {editing ? (
              <input
                type="text"
                value={editData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="text-3xl font-bold text-gray-800 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 focus:outline-none mb-2 w-full"
                placeholder="Enter Your Full Name"
              />
            ) : (
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {patientData?.name || 'Complete Your Profile'}
              </h1>
            )}
            
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-2 lg:space-y-0 lg:space-x-4 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Patient ID: {currentUser?.uid?.slice(0, 8)}...
              </span>
              {patientData?.gender && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {getGenderIcon(patientData?.gender)} {patientData?.gender}
                </span>
              )}
              {patientData?.age && (
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                  Age: {patientData?.age} years
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-4">
              Member since: {patientData?.registrationDate ? new Date(patientData.registrationDate).toLocaleDateString() : 'Today'}
            </p>
          </div>
          
          <div className="flex space-x-3">
            {editing ? (
              <>
                <button
                  onClick={updatePatientData}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 hover:shadow-lg transform hover:scale-105"
                >
                  <Save size={20} />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setEditData(patientData);
                  }}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
                >
                  <X size={20} />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 hover:shadow-lg transform hover:scale-105"
              >
                <Edit size={20} />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Patient Information Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <User className="text-blue-600" size={24} />
            <span>Personal Information</span>
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Mail className="text-blue-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Email Address</p>
                <p className="text-lg font-semibold text-gray-900">{currentUser?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Phone className="text-green-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                {editing ? (
                  <input
                    type="tel"
                    value={editData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1 outline-none transition-all"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{patientData?.phone || 'Not provided'}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <MapPin className="text-purple-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Address</p>
                {editing ? (
                  <input
                    type="text"
                    value={editData.address || ''}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1 outline-none transition-all"
                    placeholder="Enter address"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{patientData?.address || 'Not provided'}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Calendar className="text-orange-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Date of Birth</p>
                {editing ? (
                  <input
                    type="date"
                    value={editData.dateOfBirth || ''}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1 outline-none transition-all"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">
                    {patientData?.dateOfBirth ? new Date(patientData.dateOfBirth).toLocaleDateString() : 'Not provided'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <Activity className="text-red-600" size={24} />
            <span>Medical Information</span>
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Droplets className="text-red-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Blood Type</p>
                {editing ? (
                  <select
                    value={editData.blood || ''}
                    onChange={(e) => handleInputChange('blood', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1 outline-none transition-all"
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
                ) : (
                  <div className="flex items-center space-x-3">
                    {patientData?.blood ? (
                      <span className={`px-3 py-1 ${getBloodTypeColor(patientData.blood)} text-white font-bold rounded-full`}>
                        {patientData.blood}
                      </span>
                    ) : (
                      <p className="text-lg font-semibold text-gray-900">Not provided</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <User className="text-indigo-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Gender</p>
                {editing ? (
                  <select
                    value={editData.gender || ''}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1 outline-none transition-all"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-lg font-semibold text-gray-900">
                    {patientData?.gender ? `${getGenderIcon(patientData.gender)} ${patientData.gender}` : 'Not provided'}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <Calendar className="text-teal-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Age</p>
                {editing ? (
                  <input
                    type="number"
                    value={editData.age || ''}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value) || '')}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1 outline-none transition-all"
                    min="0"
                    max="150"
                    placeholder="Enter age"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">
                    {patientData?.age ? `${patientData.age} years old` : 'Not provided'}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <Phone className="text-pink-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Emergency Contact</p>
                {editing ? (
                  <input
                    type="tel"
                    value={editData.emergencyContact || ''}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1 outline-none transition-all"
                    placeholder="Enter emergency contact"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{patientData?.emergencyContact || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Your Profile...</h2>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'visiting':
        return renderVisitingRecords();
      case 'bloodbank':
        return renderBloodBank();
      case 'emergency':
        return renderEmergencyContact();
      case 'documents':
        return renderMedicalDocuments();
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
                MEDCARD
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                Welcome, {currentUser?.email}
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
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {renderContent()}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 MEDCARD - Your Personal Health Profile</p>
            <p className="mt-2">Secure & Private - Only you can see your data</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PatientProfile;