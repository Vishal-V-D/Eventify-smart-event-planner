import React from 'react';

import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './index.css'; // Import your CSS file

const features = [
  'User-friendly interface for effortless event management.',
  'Comprehensive event planning tools to keep everything organized.',
  'Real-time updates and notifications to stay informed.',
  'Seamless integration with social media for easy sharing.',
  'Customizable templates for event invitations and promotions.',
];

const benefits = [
  'Save time and resources with efficient planning tools.',
  'Increase attendee engagement through personalized experiences.',
  'Enhance collaboration among team members and stakeholders.',
  'Gain insights through analytics to improve future events.',
  'Access to a network of trusted vendors and partners.',
];

const testimonials = [
  {
    name: 'Alice Johnson',
    feedback: 'This app made my event planning so easy! I loved the organization tools and how everything was in one place.',
  },
  {
    name: 'Mark Smith',
    feedback: 'A fantastic experience! The event went smoothly, and the features provided made it all stress-free.',
  },
  {
    name: 'Emily Davis',
    feedback: 'I appreciated the easy-to-use interface and helpful support. Highly recommend it for anyone planning an event!',
  },
];

function More() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center text-blue-900 dark:text-yellow-500 mb-8">More About Our App</h1>

        {/* Features Section */}
        <h2 className="text-2xl font-semibold text-blue-900 dark:text-yellow-500 mb-4">Features</h2>
        <ul className="list-disc list-inside mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center mb-2">
              <FaCheckCircle className="text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Benefits Section */}
        <h2 className="text-2xl font-semibold text-blue-900 dark:text-yellow-500 mb-4">Benefits</h2>
        <ul className="list-disc list-inside mb-8">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center mb-2">
              <FaCheckCircle className="text-green-500 mr-2" />
              {benefit}
            </li>
          ))}
        </ul>

        {/* Testimonials Section */}
        <h2 className="text-2xl font-semibold text-blue-900 dark:text-yellow-500 mb-4">What Our Users Say</h2>
        <div className="space-y-4 mb-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-800 dark:text-gray-200 italic">"{testimonial.feedback}"</p>
              <p className="text-gray-600 dark:text-gray-300 text-right">- {testimonial.name}</p>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="text-center">
  <h2 className="text-2xl font-semibold text-blue-900 dark:text-yellow-500 mb-4">Ready to Get Started?</h2>
  <p className="mb-6">Join us now and take your event planning to the next level!</p>
  <Link to="/login"> {/* Use Link for navigation */}
    <button className="bg-blue-600 dark:bg-yellow-500 text-white py-3 px-6 rounded-full hover:bg-blue-500 dark:hover:bg-yellow-400 transition-all duration-300">
      Sign Up Now
    </button>
  </Link>
</div>
      </div>
    </div>
  );
}

export default More;
