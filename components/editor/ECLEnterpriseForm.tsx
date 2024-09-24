'use client';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { ADD_DATE_ENTRY, handleSubmitTimeSheet, SET_FORM_DATA, SET_USER_INFO, UPDATE_DATE_ENTRY, UPDATE_FIELD, UserInfo } from '@/app/store/slice/formSlice';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const ECLEnterpriseForm = () => {
  const dispatch = useAppDispatch();
  const { 
    form,
    userInfo
  } = useAppSelector(state => state.form);
  const [formData, setFormData] = useState({
    form: '', // Add the 'form' property here
    client: '',
    workLocation: '',
    contractNumber: '',
    dateEntries: [{ date: '', startTime: '', endTime: '', hours: '' }],
    totalHeuresSimple: '',
    totalHeuresDouble: '',
    totalVoyageSimple: '',
    totalVoyageDouble: '',
    materialTransported: '',
    autresPrecisions: '',
    ejesCamion: '',
    numeroCamion: '',
    transporteur: '',
    nomChauffeur: '',
    numeroPlaque: '',
    signature: '',
  });
  const { user: clerkUser } = useUser();
  const { user, isLoaded, isSignedIn } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);



  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      dispatch(SET_USER_INFO({
        id: user.id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
      }));
    }
  }, [isLoaded, isSignedIn, user, dispatch]);


  useEffect(() => {
    if(userInfo){
      console.log('User Info:', userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    if (Object.keys(form).length === 0) {
      dispatch(SET_FORM_DATA({
        client: '',
        workLocation: '',
        contractNumber: '',
        dateEntries: [{ date: '', startTime: '', endTime: '', hours: '' }],
        totalHeuresSimple: '',
        totalHeuresDouble: '',
        totalVoyageSimple: '',
        totalVoyageDouble: '',
        materialTransported: '',
        autresPrecisions: '',
        ejesCamion: '',
        numeroCamion: '',
        transporteur: '',
        nomChauffeur: '',
        numeroPlaque: '',
        signature: '',
      }));
    }
  }, [dispatch, form]);

  useEffect(() => {
    console.log('Form data:', formData);

    // SET_FORM_DATA
    dispatch(SET_FORM_DATA(formData));


  }, [dispatch, formData]);

  const [documentId, setDocumentId] = useState('');

  useEffect(() => {
    // This effect will only run in the browser
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const parts = path.split('/');
      const id = parts[parts.length - 1];
      setDocumentId(id);
    }
  }, []);

  useEffect(() => {
    if(documentId !==``) {
        

        if(clerkUser) {
            console.log('clerkUser:', clerkUser);
            console.log('Document ID:', documentId);

            // dispatch GET_UNIQUE_DOCUMENT_INFO with clerkUser and documentId



        }


    }
  }, [clerkUser, documentId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(UPDATE_FIELD({ name, value }));
  };

  const handleDateEntryChange = (index: number, field: string, value: string) => {
    dispatch(UPDATE_DATE_ENTRY({ index, field, value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!userInfo || !documentId) {
      toast.error("User information or document ID is missing");
      setIsSubmitting(false);
      return;
    }

    const object = {
      ...form,
      userInfo,
      documentId
    };

    try {
      const resultAction = await dispatch(handleSubmitTimeSheet({ object }));
      if (handleSubmitTimeSheet.fulfilled.match(resultAction)) {
        toast.success("TimeSheet submitted successfully");
        // Optionally reset the form or redirect the user
        // setFormData(initialFormState);
        // router.push('/dashboard'); // If you want to redirect after submission
      } else if (handleSubmitTimeSheet.rejected.match(resultAction)) {
        throw new Error(resultAction.error.message);
      }
    } catch (error: any) {
      toast.error(`Failed to submit TimeSheet: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddDateEntry = () => {
    dispatch(ADD_DATE_ENTRY());
  };

  const WatermarkTag = ({ id }: any) => (
    <div className="">
      <p className="text-[9px] text-pink-600 font-semibold">Unique ID: {documentId}</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-pink-100 shadow-lg rounded-lg border-2 border-pink-300" style={{ fontFamily: 'Arial, sans-serif' }}>
      
        <div className="text-center mb-6 border-b-2 border-pink-300 pb-4">
            <h1 className="text-3xl font-bold text-pink-800">ECL ENTREPRISE</h1>
            <p className="text-sm text-pink-600">7230 rue l&apos;Archeveque, porte 6</p>
            <p className="text-sm text-pink-600">Montreal QC H1K 2K3</p>
            <p className="text-sm text-pink-600">T: 514 649-9430</p>
        </div>
        <div className='absolute top-0'>
            <WatermarkTag id={documentId} />
        </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-pink-700">CLIENT</label>
            <input
              type="text"
              id="client"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="workLocation" className="block text-sm font-medium text-pink-700">LIEU DE TRAVAIL</label>
            <input
              type="text"
              id="workLocation"
              name="workLocation"
              value={formData.workLocation}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
        </div>
        <div>
          <label htmlFor="contractNumber" className="block text-sm font-medium text-pink-700">NUMÉRO DE CONTRAT</label>
          <input
            type="text"
            id="contractNumber"
            name="contractNumber"
            value={formData.contractNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
          />
        </div>
        
        {/* Date Entries Table */}
        <div className="mt-6">
          <table className="min-w-full border border-pink-300">
            <thead className="bg-pink-200">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider border-r border-pink-300">DATE</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider border-r border-pink-300">DE</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider border-r border-pink-300">À</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">HRS</th>
              </tr>
            </thead>
            <tbody>
              {formData.dateEntries.map((entry, index) => (
                <tr key={index} className="border-b border-pink-300">
                  <td className="px-4 py-2 border-r border-pink-300">
                    <input
                      type="date"
                      value={entry.date}
                      onChange={(e) => handleDateEntryChange(index, 'date', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0"
                    />
                  </td>
                  <td className="px-4 py-2 border-r border-pink-300">
                    <input
                      type="time"
                      value={entry.startTime}
                      onChange={(e) => handleDateEntryChange(index, 'startTime', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0"
                    />
                  </td>
                  <td className="px-4 py-2 border-r border-pink-300">
                    <input
                      type="time"
                      value={entry.endTime}
                      onChange={(e) => handleDateEntryChange(index, 'endTime', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={entry.hours}
                      onChange={(e) => handleDateEntryChange(index, 'hours', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={handleAddDateEntry}
            className="mt-2 text-sm text-pink-600 hover:text-pink-800"
          >
            + Ajouter une entrée
          </button>
        </div>

        {/* Double Hours Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="totalHeuresSimple" className="block text-sm font-medium text-pink-700">TOTAL HEURES SIMPLE</label>
            <input
              type="number"
              id="totalHeuresSimple"
              name="totalHeuresSimple"
              value={formData.totalHeuresSimple}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="totalHeuresDouble" className="block text-sm font-medium text-pink-700">TOTAL HEURES DOUBLE</label>
            <input
              type="number"
              id="totalHeuresDouble"
              name="totalHeuresDouble"
              value={formData.totalHeuresDouble}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="totalVoyageSimple" className="block text-sm font-medium text-pink-700">TOTAL VOYAGE SIMPLE</label>
            <input
              type="number"
              id="totalVoyageSimple"
              name="totalVoyageSimple"
              value={formData.totalVoyageSimple}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="totalVoyageDouble" className="block text-sm font-medium text-pink-700">TOTAL VOYAGE DOUBLE</label>
            <input
              type="number"
              id="totalVoyageDouble"
              name="totalVoyageDouble"
              value={formData.totalVoyageDouble}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
        </div>

        {/* Material Transported and New Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="materialTransported" className="block text-sm font-medium text-pink-700">MATÉRIEL TRANSPORTÉ</label>
            <input
              type="text"
              id="materialTransported"
              name="materialTransported"
              value={formData.materialTransported}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="autresPrecisions" className="block text-sm font-medium text-pink-700">AUTRES PRÉCISIONS</label>
            <input
              type="text"
              id="autresPrecisions"
              name="autresPrecisions"
              value={formData.autresPrecisions}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ejesCamion" className="block text-sm font-medium text-pink-700">ESSIEUX DU CAMION</label>
            <input
              type="text"
              id="ejesCamion"
              name="ejesCamion"
              value={formData.ejesCamion}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="numeroCamion" className="block text-sm font-medium text-pink-700">Nº CAMION</label>
            <input
              type="text"
              id="numeroCamion"
              name="numeroCamion"
              value={formData.numeroCamion}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="transporteur" className="block text-sm font-medium text-pink-700">TRANSPORTEUR</label>
            <input
              type="text"
              id="transporteur"
              name="transporteur"
              value={formData.transporteur}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="nomChauffeur" className="block text-sm font-medium text-pink-700">NOM DU CHAUFFEUR</label>
            <input
              type="text"
              id="nomChauffeur"
              name="nomChauffeur"
              value={formData.nomChauffeur}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
        </div>
        <div>
          <label htmlFor="numeroPlaque" className="block text-sm font-medium text-pink-700">NUMÉRO DE PLAQUE</label>
          <input
            type="text"
            id="numeroPlaque"
            name="numeroPlaque"
            value={formData.numeroPlaque}
            onChange={handleInputChange}
            className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
          />
        </div>

        <div>
          <label htmlFor="signature" className="block text-sm font-medium text-pink-700">SIGNATURE</label>
          <input
            type="text"
            id="signature"
            name="signature"
            value={formData.signature}
            onChange={handleInputChange}
            className="mt-1 block w-full border-b-2 border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            placeholder="Tapez votre nom pour signer"
          />
        </div>
        <div className="text-right mt-6">
          <button 
            type="submit" 
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Soumission en cours...' : 'Soumettre'}
          </button>
        </div>
      </form>
      <div className='absolute bottom-0'>
            <WatermarkTag id={documentId} />
        </div>
    </div>
  );
};

export default ECLEnterpriseForm;