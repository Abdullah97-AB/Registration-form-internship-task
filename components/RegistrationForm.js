import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    gender: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed');

      setStatusMessage({ type: 'success', text: 'Success! User registered.' });
      setFormData({ firstName: '', lastName: '', dob: '', email: '', gender: '' });
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Error: Something went wrong.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
    
        style={{  maxWidth: '400px', 
                  margin: '50px auto', 
                  padding: '20px', 
                  border: '1px solid #ccc', 
                  borderRadius: '8px', 
                  fontFamily: 'sans-serif' 
              }}>
     
            <h2>Registration Form</h2>
      
        <form onSubmit={handleSubmit}>
      
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>First Name :</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
      
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Last Name :</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
      
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Date of Birth :</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
      
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
      <div style={{ marginBottom: '15px' }}>
         <label style={{ display: 'block', marginBottom: '5px' }}>Gender:</label>
  
            <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
         <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
        <input 
        type="radio" 
        name="gender" 
        value="male" 
        checked={formData.gender === 'male'} 
        onChange={handleChange} 
        required 
      />
      Male
         </label>

    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
      <input 
        type="radio" 
        name="gender" 
        value="female" 
        checked={formData.gender === 'female'} 
        onChange={handleChange} 
        required 
      />
      Female
    </label>

    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
      <input 
        type="radio" 
        name="gender" 
        value="other" 
        checked={formData.gender === 'other'} 
        onChange={handleChange} 
        required 
      />
      Other
    </label>
  </div>
</div>
        {/* <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}>
           
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div> */}

        <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isLoading ? 'Loading... ⏳' : 'Submit'}
        </button>
      </form>

      {statusMessage.text && (
        <div style={{ marginTop: '15px', padding: '10px', borderRadius: '4px', backgroundColor: statusMessage.type === 'success' ? '#d4edda' : '#f8d7da', color: statusMessage.type === 'success' ? '#155724' : '#721c24' }}>
          {statusMessage.text}
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;