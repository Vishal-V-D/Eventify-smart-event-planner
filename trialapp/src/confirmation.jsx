import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaUserCircle, FaEnvelope, FaPhone, FaClipboardCheck } from 'react-icons/fa';
import './index.css';

function Confirmation() {
  const { state } = useLocation();
  const { event, formData } = state;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-4xl font-bold text-blue-900 dark:text-yellow-500">Booking Confirmation</h2>
          
          {/* Event Details Section */}
          <div className="mt-4 border-b border-gray-300 dark:border-gray-600 pb-4">
            <h3 className="text-2xl font-semibold text-blue-800 dark:text-yellow-300">{event.name}</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{event.description}</p>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              <FaCalendarAlt className="inline-block mr-2" />
              <strong>Date:</strong> {event.date}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <FaMapMarkerAlt className="inline-block mr-2" />
              <strong>Location:</strong> {event.location}
            </p>
          </div>

          {/* User Details Section */}
          <h3 className="text-2xl font-semibold mt-6">Your Details</h3>
          <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-400">
            <li>
              <FaUserCircle className="inline-block mr-2" />
              <strong>Name:</strong> {formData.name}
            </li>
            <li>
              <FaEnvelope className="inline-block mr-2" />
              <strong>Email:</strong> {formData.email}
            </li>
            <li>
              <FaPhone className="inline-block mr-2" />
              <strong>Phone:</strong> {formData.phone}
            </li>
            {formData.comments && (
              <li>
                <strong>Comments:</strong> {formData.comments}
              </li>
            )}
          </ul>

          {/* Next Steps Section */}
          <div className="mt-6 bg-blue-50 dark:bg-cyan-700 rounded p-4">
            <h4 className="text-lg font-semibold text-blue-800 dark:text-yellow-300">Next Steps</h4>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              You will receive a confirmation email shortly with all the details of your booking.
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Please arrive at the venue at least 15 minutes before the scheduled time to ensure a smooth check-in process.
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              If you have any questions, feel free to contact us via the details provided in your confirmation email.
            </p>
          </div>

          {/* User Agreement Section */}
          <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded p-4">
            <h4 className="text-lg font-semibold text-blue-800 dark:text-yellow-300">User Agreement</h4>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              By booking this event, you agree to abide by the terms and conditions set forth by the event organizers. 
              Please ensure to respect the venue rules and the privacy of other attendees.
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Any cancellation or changes to your booking must be communicated at least 48 hours in advance.
            </p>
          </div>

          {/* Principles Section */}
          <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded p-4">
            <h4 className="text-lg font-semibold text-blue-800 dark:text-yellow-300">Principles</h4>
            <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300">
              <li>Your safety and comfort are our top priorities.</li>
              <li>We promote inclusivity and respect for all attendees.</li>
              <li>We encourage feedback to improve future events.</li>
            </ul>
          </div>

          <p className="mt-4 text-green-600 font-bold">
            <FaClipboardCheck className="inline-block mr-2" />
            Thank you for your booking!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
