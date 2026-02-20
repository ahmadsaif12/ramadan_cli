import React, { useState, useEffect } from 'react';
import { Country, City } from 'country-state-city';

const SetupWizard = ({ onComplete }) => {
  const [countries] = useState(Country.getAllCountries());
  const [cities, setCities] = useState([]);
  
  // Defaulting to Nepal and Kathmandu for your specific setup
  const [selectedCountryCode, setSelectedCountryCode] = useState('NP');
  const [selectedCity, setSelectedCity] = useState('Kathmandu');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const countryCities = City.getCitiesOfCountry(selectedCountryCode);
    setCities(countryCities);
    // Only auto-select first city if we aren't already on Kathmandu
    if (countryCities.length > 0 && selectedCountryCode !== 'NP') {
      setSelectedCity(countryCities[0].name);
    }
  }, [selectedCountryCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const countryName = Country.getCountryByCode(selectedCountryCode)?.name || "Nepal";
    
    const config = {
      username: username || "Guest_User", 
      city: selectedCity,
      country: countryName,
      school: parseInt(e.target.school.value),
    };

    localStorage.setItem('ramadan_prefs', JSON.stringify(config));
    onComplete(config);
  };

  const selectClass = "w-full bg-black/60 border border-ramadan-border p-3 outline-none focus:border-ramadan-green text-ramadan-green cursor-pointer appearance-none transition-all hover:bg-black/80 font-mono text-sm shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]";
  
  const inputClass = "w-full bg-black/60 border border-ramadan-border p-3 outline-none focus:border-ramadan-green text-ramadan-green transition-all hover:bg-black/80 font-mono text-sm placeholder:opacity-30 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]";

  return (
    <div className="max-w-sm mx-auto animate-in fade-in zoom-in duration-500">
      <h2 className="text-hanafi-yellow text-lg mb-6 border-b border-ramadan-border pb-2 italic tracking-widest font-bold uppercase">
        {">"} Initialize_User_Profile
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Username Input - Critical for Identity tracking */}
        <div className="space-y-2 relative">
          <label className="text-[10px] uppercase opacity-60 tracking-[0.2em] font-bold">01. User_Identity</label>
          <input 
            type="text"
            required
            placeholder="E.G. AHMADSAIF / SAIFALI"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Country Selector */}
        <div className="space-y-2 relative">
          <label className="text-[10px] uppercase opacity-60 tracking-[0.2em] font-bold">02. Select_Nation</label>
          <div className="relative group">
            <select 
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value)}
              className={selectClass}
            >
              {countries.map((c) => (
                <option key={c.isoCode} value={c.isoCode} className="bg-[#061a12]">
                  {c.name.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-ramadan-green opacity-50">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* City Selector */}
        <div className="space-y-2 relative">
          <label className="text-[10px] uppercase opacity-60 tracking-[0.2em] font-bold">03. Select_Coordinate</label>
          <div className="relative group">
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className={selectClass}
            >
              {cities.length > 0 ? (
                cities.map((city, index) => (
                  <option key={`${city.name}-${index}`} value={city.name} className="bg-[#061a12]">
                    {city.name.toUpperCase()}
                  </option>
                ))
              ) : (
                <option className="bg-[#061a12]">NO_DATA_FOUND</option>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-ramadan-green opacity-50">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Fiqh Selection */}
        <div className="space-y-2 relative">
          <label className="text-[10px] uppercase opacity-60 tracking-[0.2em] font-bold">04. Calculation_Logic</label>
          <div className="relative group">
            <select 
              name="school" 
              className={selectClass}
            >
              <option value="1" className="bg-[#061a12]">HANAFI_LOGIC</option>
              <option value="0" className="bg-[#061a12]">STANDARD_LOGIC</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-ramadan-green opacity-50">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-ramadan-green text-ramadan-dark font-black py-4 mt-2 hover:bg-white transition-all active:scale-95 uppercase tracking-[0.3em] text-xs shadow-[0_0_15px_rgba(74,222,128,0.2)]"
        >
          [ EXECUTE_BOOT_SEQUENCE ]
        </button>
      </form>
    </div>
  );
};

export default SetupWizard;