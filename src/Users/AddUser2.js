import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, User, Briefcase, Mail, Key, Car as IdCard, UserCircle, HelpCircle, Shield, Eye, EyeOff } from 'lucide-react';





function AddUser2() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    id: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Personal Info Validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (parseInt(formData.age) < 18 || parseInt(formData.age) > 100) 
      newErrors.age = 'Age must be between 18 and 100';
    if (!formData.gender) newErrors.gender = 'Gender is required';

    // Professional Info Validation
    if (!formData.id.trim()) newErrors.id = 'ID is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) 
      newErrors.email = 'Invalid email format';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) 
      newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) 
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const isValid = Object.values(formData).every(value => value.trim() !== '');
    setIsFormValid(isValid);
    if (Object.keys(touched).length > 0) {
      validateForm();
    }
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleBlur = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: false
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission here
    }
  };

  const InputField = ({ 
    label, 
    name, 
    type = 'text', 
    value, 
    error,
    icon: Icon,
    tooltip
  }) => {
    const isValid = touched[name] && !error;
    const isPassword = name === 'password' || name === 'confirmPassword';
    const showPasswordState = name === 'password' ? showPassword : showConfirmPassword;
    
    return (
      <div className="mb-6 flex-1">
        <div className="flex items-center gap-1 mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-50">
            {label}
          </label>
          {tooltip && (
            <div className="group relative">
              <HelpCircle className="h-4 w-4 text-gray-300 dark:text-gray-600 cursor-help" />
              <div className="absolute max-w-36 bottom-full left-1/3 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200  z-10">
                {tooltip}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-300 dark:text-gray-600" />
          </div>
          {name === 'gender' ? (
            <select
              name={name}
              value={value}
              onChange={handleChange}
              onBlur={() => handleBlur(name)}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg appearance-none bg-white
                ${error ? 'border-red-500' : isValid ? 'border-green-500' : 'border-gray-300 dark:border-gray-600'}
                focus:outline-none focus:ring-2 
                ${error ? 'focus:ring-red-200' : 'focus:ring-blue-200'}
                focus:border-transparent transition-colors duration-200`}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <input
              type={isPassword ? (showPasswordState ? 'text' : 'password') : type}
              name={name}
              value={value}
              onChange={handleChange}
              onBlur={() => handleBlur(name)}
              className={`w-full pl-10 ${isPassword ? 'pr-10' : 'pr-3'} py-3 border rounded-lg bg-gray-100 dark:bg-gray-800
                 placeholder:text-gray-300 dark:placeholder:text-gray-600
                 text-gray-700 dark:text-gray-50
                ${error ? 'border-red-500' : isValid ? 'border-green-500' : 'border-gray-300 dark:border-gray-600'}
                focus:outline-none focus:ring-2 
                ${error ? 'focus:ring-red-200' : 'focus:ring-blue-200'}
                focus:border-transparent transition-colors duration-200`}
              placeholder={`Enter your ${label.toLowerCase()}`}
            />
          )}
          {isPassword && (
            <button
              type="button"
              onClick={() => {
                if (name === 'password') {
                  setShowPassword(!showPassword);
                } else {
                  setShowConfirmPassword(!showConfirmPassword);
                }
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPasswordState  ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
          {touched[name] && !isPassword && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {error ? (
                <AlertCircle className="h-5 w-5 text-red-500" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
            </div>
          )}
        </div>
        {error && touched[name] && (
          <div className="flex items-center mt-1.5 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen  py-10">
      <div className="max-w-3xl  mx-auto">
        <form onSubmit={handleSubmit} >
          {/* <div className="px-8 py-6 bg-blue-50 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Registration Form</h2>
            </div>
            <p className="mt-2 text-gray-600">Please fill in all the required information to complete your registration.</p>
          </div> */}
          
          <div className="">
            <div className="grid grid-cols-1  gap-8">
              {/* Personal Information Section */}
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                <div className="flex items-center gap-2  border-b border-gray-300 dark:border-gray-600 bg-gray-50  dark:bg-gray-700 rounded-t-lg  px-8 py-4">
                  <User className="w-5 h-5 text-purple-700" />
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-50">Personal Information</h3>
                </div>
                <div className='px-8 py-4 dark:bg-gray-900 rounded-b-lg'>
                <InputField 
                  label="Name" 
                  name="name" 
                  value={formData.name} 
                  error={errors.name}
                  icon={User}
                />
                <div className=' flex items-center gap-10 w-full'>
                <InputField 
                  label="Age" 
                  name="age" 
                  type="number" 
                  value={formData.age} 
                  error={errors.age}
                  icon={UserCircle}
                />
                <InputField 
                  label="Gender" 
                  name="gender" 
                  value={formData.gender} 
                  error={errors.gender}
                  icon={User}
                />

                </div>

                </div>
              
              
              </div>

              {/* Professional Information Section */}
              <div className="border rounded-lg shadow-sm">
                <div className="flex items-center gap-2 px-8 py-4 border-b border-gray-300 dark:border-gray-600">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-700">Professional Information</h3>
                </div>
                <div className='px-8 py-4'>
                <InputField 
                  label="Email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  error={errors.email}
                  icon={Mail}
                />
                <div className='flex w-full gap-10'>
                <InputField 
                  label="ID" 
                  name="id" 
                  value={formData.id} 
                  error={errors.id}
                  icon={IdCard}
                />
               
                <InputField 
                  label="Role" 
                  name="role" 
                  value={formData.role} 
                  error={errors.role}
                  icon={Briefcase}
                />

                </div>
                <div className='flex w-full gap-10'>
                <InputField 
                  label="Password" 
                  name="password" 
                  type="password" 
                  value={formData.password} 
                  error={errors.password}
                  icon={Key}
                  tooltip="Password must be at least 6 characters long"
                />
                <InputField 
                  label="Confirm Password" 
                  name="confirmPassword" 
                  type="password" 
                  value={formData.confirmPassword} 
                  error={errors.confirmPassword}
                  icon={Key}
                />

                </div>

                </div>
                

                
               
              </div>
            </div>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`px-6 py-3 rounded-lg text-white font-medium text-sm
                  ${isFormValid 
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md' 
                    : 'bg-gray-400 cursor-not-allowed'
                  } transition-all duration-200`}
              >
                Complete Registration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser2;