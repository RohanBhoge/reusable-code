"use client";

import React, { useState } from 'react';
import TextInput from './TextInput'; // Adjust path as needed

const EventForm = () => {
  // State for all form fields (so you can control them individually)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'Academic',
    audience: 'All',
    startDate: '',
    endDate: '',
    location: '',
    organizer: '',
    status: 'Upcoming',
    registrationRequired: false,
  });

  // Generalized change handler for standard inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white border rounded-xl shadow-sm">
      <h2 className="text-base font-medium text-gray-900 mb-6">Event Details</h2>

      <form className="flex flex-col gap-5">
        {/* Full Width: Title */}
        <TextInput
          label="Event Title"
          placeholder="Enter event title"
          required
          value={formData.title}
          name="title"
          onChange={handleChange}
        />

        {/* Full Width: Description */}
        <TextInput
          label="Description"
          placeholder="Enter event description"
          required
          value={formData.description}
          name="description"
          onChange={handleChange}
        />

        {/* 2-Column Grid: Event Type & Target Audience (Using standard selects for now) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-900">
              Event Type <span className="text-red-500">*</span>
            </label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full rounded-lg bg-[#F3F3F5] px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <option value="Academic">Academic</option>
              <option value="Corporate">Corporate</option>
              <option value="Social">Social</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-900">
              Target Audience <span className="text-red-500">*</span>
            </label>
            <select
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              className="w-full rounded-lg bg-[#F3F3F5] px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <option value="All">All</option>
              <option value="Students">Students</option>
              <option value="Faculty">Faculty</option>
            </select>
          </div>
        </div>

        {/* 2-Column Grid: Start Date & End Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TextInput
            label="Start Date"
            required
            type="date"
            value={formData.startDate}
            name="startDate"
            onChange={handleChange}
          />
          <TextInput
            label="End Date"
            required
            type="date"
            value={formData.endDate}
            name="endDate"
            onChange={handleChange}
          />
        </div>

        {/* 2-Column Grid: Location & Organizer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TextInput
            label="Location"
            placeholder="Enter event location"
            required
            value={formData.location}
            name="location"
            onChange={handleChange}
          />
          <TextInput
            label="Organizer"
            placeholder="Enter organizer name"
            required
            value={formData.organizer}
            name="organizer"
            onChange={handleChange}
          />
        </div>

        {/* Full Width: Status Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-900">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#F3F3F5] px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Checkbox: Registration Required */}
        <div className="flex items-center gap-3 mt-1">
          <input
            type="checkbox"
            id="registration"
            name="registrationRequired"
            checked={formData.registrationRequired}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
          />
          <label htmlFor="registration" className="text-sm font-medium text-gray-700">
            Registration Required
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-[#111827] px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            {/* Your provided SVG for the icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1333 2C10.485 2.00501 10.8205 2.14878 11.0667 2.4L13.6 4.93333C13.8512 5.17951 13.995 5.51497 14 5.86667V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H10.1333Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.3333 13.9993V9.33268C11.3333 9.15587 11.2631 8.9863 11.138 8.86128C11.013 8.73625 10.8434 8.66602 10.6666 8.66602H5.33329C5.15648 8.66602 4.98691 8.73625 4.86189 8.86128C4.73686 8.9863 4.66663 9.15587 4.66663 9.33268V13.9993" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.66663 2V4.66667C4.66663 4.84348 4.73686 5.01305 4.86189 5.13807C4.98691 5.2631 5.15648 5.33333 5.33329 5.33333H9.99996" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Create Event
          </button>

          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;