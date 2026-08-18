"use client";

import React, { useState } from 'react';
import TextInput from './TextInput';
import TextArea from './TextArea';
import Dropdown from './Dropdown';
import { validateFieldValue } from './useFormValidation';
import styles from './FormComponents.module.css';

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: '',
    audience: '',
    startDate: '',
    endDate: '',
    location: '',
    organizer: '',
    status: 'Upcoming',
    registrationRequired: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const eventTypeOptions = ['Academic', 'Corporate', 'Social'];
  const audienceOptions = ['All', 'Students', 'Faculty'];
  const statusOptions = ['Upcoming', 'Ongoing', 'Completed'];

  const validationRules = {
    title: { required: true, label: 'Event Title', minLength: 3 },
    description: { required: true, label: 'Description', minLength: 10, maxLength: 500 },
    eventType: { required: true, label: 'Event Type' },
    audience: { required: true, label: 'Target Audience' },
    startDate: { required: true, label: 'Start Date' },
    endDate: {
      required: true,
      label: 'End Date',
      customValidation: (val) => {
        if (formData.startDate && new Date(val) < new Date(formData.startDate)) {
          return 'End Date cannot be earlier than Start Date';
        }
        return '';
      },
    },
    location: { required: true, label: 'Location' },
    organizer: { required: true, label: 'Organizer' },
    status: { required: true, label: 'Status' },
  };

  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';
    return validateFieldValue(value, rules);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    if (touched[name] || errors[name]) {
      const err = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const newTouched = {};

    Object.keys(validationRules).forEach((field) => {
      newTouched[field] = true;
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    console.log('Form Submitted Successfully:', formData);
    alert('Event Created Successfully!');
  };

  return (
    <div className={styles.formCard}>
      <h2 className="h5 font-semibold text-dark mb-4">Create New Event</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Event Title */}
        <TextInput
          label="Event Title"
          name="title"
          placeholder="Enter event title"
          required
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.title}
        />

        {/* Description */}
        <TextArea
          label="Description"
          name="description"
          placeholder="Provide a detailed description of the event"
          required
          rows={4}
          maxLength={500}
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.description}
        />

        {/* Grid: Event Type & Target Audience */}
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <Dropdown
              label="Event Type"
              name="eventType"
              options={eventTypeOptions}
              placeholder="Select event type"
              required
              value={formData.eventType}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.eventType}
            />
          </div>
          <div className="col-12 col-md-6">
            <Dropdown
              label="Target Audience"
              name="audience"
              options={audienceOptions}
              placeholder="Select audience"
              required
              value={formData.audience}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.audience}
            />
          </div>
        </div>

        {/* Grid: Start Date & End Date */}
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <TextInput
              label="Start Date"
              name="startDate"
              type="date"
              required
              value={formData.startDate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.startDate}
            />
          </div>
          <div className="col-12 col-md-6">
            <TextInput
              label="End Date"
              name="endDate"
              type="date"
              required
              value={formData.endDate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.endDate}
            />
          </div>
        </div>

        {/* Grid: Location & Organizer */}
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <TextInput
              label="Location"
              name="location"
              placeholder="Enter event location"
              required
              value={formData.location}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.location}
            />
          </div>
          <div className="col-12 col-md-6">
            <TextInput
              label="Organizer"
              name="organizer"
              placeholder="Enter organizer name"
              required
              value={formData.organizer}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.organizer}
            />
          </div>
        </div>

        {/* Status Dropdown */}
        <Dropdown
          label="Status"
          name="status"
          options={statusOptions}
          required
          value={formData.status}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.status}
        />

        {/* Checkbox: Registration Required */}
        <div className="form-check d-flex align-items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="registrationRequired"
            name="registrationRequired"
            checked={formData.registrationRequired}
            onChange={handleChange}
            className={`form-check-input mt-0 ${styles.customCheckbox}`}
          />
          <label htmlFor="registrationRequired" className="form-check-label text-sm font-medium text-secondary cursor-pointer">
            Registration Required
          </label>
        </div>

        {/* Action Buttons */}
        <div className="d-flex align-items-center gap-2 pt-2">
          <button
            type="submit"
            className="btn btn-dark d-inline-flex align-items-center gap-2 px-4 py-2 rounded-3 text-sm font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1333 2C10.485 2.00501 10.8205 2.14878 11.0667 2.4L13.6 4.93333C13.8512 5.17951 13.995 5.51497 14 5.86667V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H10.1333Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.3333 13.9993V9.33268C11.3333 9.15587 11.2631 8.9863 11.138 8.86128C11.013 8.73625 10.8434 8.66602 10.6666 8.66602H5.33329C5.15648 8.66602 4.98691 8.73625 4.86189 8.86128C4.73686 8.9863 4.66663 9.15587 4.66663 9.33268V13.9993" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.66663 2V4.66667C4.66663 4.84348 4.73686 5.01305 4.86189 5.13807C4.98691 5.2631 5.15648 5.33333 5.33329 5.33333H9.99996" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Create Event
          </button>

          <button
            type="button"
            onClick={() => setFormData({ title: '', description: '', eventType: '', audience: '', startDate: '', endDate: '', location: '', organizer: '', status: 'Upcoming', registrationRequired: false })}
            className="btn btn-outline-secondary px-4 py-2 rounded-3 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;