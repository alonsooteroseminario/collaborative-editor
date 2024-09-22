'use client';

import React from 'react';
import { useMutation, useStorage } from '@liveblocks/react';

interface FormData {
  title: string;
  author: string;
  date: string;
  category: string;
  tags: string;
  summary: string;
  mainContent: string;
  imageUrl: string;
  videoUrl: string;
  sourceUrl: string;
  relatedArticles: string;
  seoKeywords: string;
  metaDescription: string;
  status: 'draft' | 'published' | 'archived';
}

const EditorForm: React.FC = () => {
  const formData: any = useStorage((root: any) => root.formData);

  const updateFormData: any = useMutation(({ storage }: any, key: keyof FormData, value: string) => {
    storage.get('formData').set(key, value);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData(name as keyof FormData, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you can add logic to send the form data to your backend or process it further
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData?.title}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>

      {/* Repeat this pattern for all other form fields */}
      {/* ... */}

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          value={formData?.status}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditorForm;