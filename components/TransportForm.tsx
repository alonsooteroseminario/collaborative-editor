'use client'

import { useState } from 'react'

export function TransportForm({ onSubmit }: { onSubmit: (formData: any) => void }) {
    const [formData, setFormData] = useState({
      client: '',
      chantier: '',
      sousTraitant: '',
      plaque: '',
      date: '',
      vehicleType: '12 roues',
      startTime: '',
      startAmPm: 'am',
      endTime: '',
      endAmPm: 'am',
      totalHeuresSimple: '',
      totalHeuresDouble: '',
      totalVoyageSimple: '',
      totalVoyageDouble: '',
      infoVoyage: '',
      acceptePar: '',
    })
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }))
    }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(formData)
    }
  
    return (
    <form onSubmit={handleSubmit} className="bg-yellow-100 p-2 sm:p-4 md:p-6 w-full max-w-4xl mx-auto font-sans text-gray-900 text-xs sm:text-sm md:text-base">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-4">
        <div className="flex items-center mb-2 sm:mb-0">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-300 rounded-full mr-2"></div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold">MBLogix</h1>
            <p className="text-xs sm:text-sm">Courtier en transport</p>
          </div>
        </div>
        <div className="text-red-600 text-xs sm:text-sm">
          F0200.02.01 -5.75<br />
          .02 - 4
        </div>
      </div>

      <div className="text-xs sm:text-sm mb-2 sm:mb-4">
        <p>269 Alfred-Messier, Terrebonne, J6W 5S2</p>
        <p>Tél.: 514 880-7913 | facturation.mblogix@outlook.com</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2 sm:mb-4">
        <div className="flex flex-col">
          <label className="text-xs sm:text-sm">Client:</label>
          <input type="text" name="client" value={formData.client} onChange={handleChange} className="border-b border-black bg-transparent" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs sm:text-sm">Chantier:</label>
          <input type="text" name="chantier" value={formData.chantier} onChange={handleChange} className="border-b border-black bg-transparent" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs sm:text-sm">Sous-Traitant:</label>
          <input type="text" name="sousTraitant" value={formData.sousTraitant} onChange={handleChange} className="border-b border-black bg-transparent" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs sm:text-sm">Plaque:</label>
          <input type="text" name="plaque" value={formData.plaque} onChange={handleChange} className="border-b border-black bg-transparent" />
        </div>
      </div>

      <div className="mb-2 sm:mb-4">
        <label className="text-xs sm:text-sm">Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border-b border-black bg-transparent" />
      </div>

      {/* Vehicle type checkboxes */}
      <div className="flex flex-wrap justify-between mb-2 sm:mb-4">
        {['12 roues', 'Semi 2 essieux', 'Semi 3 essieux', 'Semi 4 essieux'].map(type => (
          <label key={type} className="flex items-center mr-2 mb-1">
            <input
              type="checkbox"
              name="vehicleType"
              value={type}
              checked={formData.vehicleType === type}
              onChange={handleChange}
              className="mr-1"
            />
            <span className="text-xs sm:text-sm">{type}</span>
          </label>
        ))}
      </div>

      {/* Time entry table */}
      <table className="w-full mb-2 sm:mb-4 text-xs sm:text-sm">
        <thead>
          <tr>
            <th className="text-left">De:</th>
            <th className="text-left">À:</th>
            <th className="text-right">HEURES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="w-20 border-b border-black bg-transparent" />
              <select name="startAmPm" value={formData.startAmPm} onChange={handleChange} className="bg-transparent">
                <option value="am">a.m.</option>
                <option value="pm">p.m.</option>
              </select>
            </td>
            <td>
              <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="w-20 border-b border-black bg-transparent" />
              <select name="endAmPm" value={formData.endAmPm} onChange={handleChange} className="bg-transparent">
                <option value="am">a.m.</option>
                <option value="pm">p.m.</option>
              </select>
            </td>
            <td className="text-right">{/* Calculate hours */}</td>
          </tr>
        </tbody>
      </table>

      {/* Totals section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2 sm:mb-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs sm:text-sm">TOTAL HEURES SIMPLE</span>
            <input type="text" name="totalHeuresSimple" value={formData.totalHeuresSimple} onChange={handleChange} className="w-16 border-b border-black bg-transparent" />
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-xs sm:text-sm">TOTAL HEURES DOUBLE</span>
            <input type="text" name="totalHeuresDouble" value={formData.totalHeuresDouble} onChange={handleChange} className="w-16 border-b border-black bg-transparent" />
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-xs sm:text-sm">TOTAL VOYAGE SIMPLE</span>
            <input type="text" name="totalVoyageSimple" value={formData.totalVoyageSimple} onChange={handleChange} className="w-16 border-b border-black bg-transparent" />
          </div>
          <div className="flex justify-between">
            <span className="text-xs sm:text-sm">TOTAL VOYAGE DOUBLE</span>
            <input type="text" name="totalVoyageDouble" value={formData.totalVoyageDouble} onChange={handleChange} className="w-16 border-b border-black bg-transparent" />
          </div>
        </div>
        <div className="bg-gray-200 p-2 flex flex-col justify-center items-center">
          <div className="text-center mb-1 text-xs sm:text-sm">TOTAL HRS JOURNÉE</div>
          <div className="text-center text-xl sm:text-3xl font-bold">{/* Calculate total hours */}</div>
          <div className="text-center text-xs sm:text-sm">HRS</div>
        </div>
      </div>

      <div className="mb-2 sm:mb-4">
        <label className="text-xs sm:text-sm">Info voyage:</label>
        <input type="text" name="infoVoyage" value={formData.infoVoyage} onChange={handleChange} className="w-full border-b border-black bg-transparent" />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <label className="mr-2 text-xs sm:text-sm">Accepté par:</label>
          <input type="text" name="acceptePar" value={formData.acceptePar} onChange={handleChange} className="w-8 border-b border-black bg-transparent" />
        </div>
        <div className="text-lg sm:text-2xl font-bold">No 12662</div>
      </div>

      <button type="submit" className="mt-2 sm:mt-4 bg-blue-500 text-white px-4 py-2 rounded text-xs sm:text-sm">
        Submit Form
      </button>
    </form>
    )
  }