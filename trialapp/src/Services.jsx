import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegCalendarCheck, FaClipboardList, FaConciergeBell, FaPalette } from 'react-icons/fa';
import './index.css'; // Import your CSS file

const services = [
  {
    id: 1,
    title: 'Event Planning',
    description: 'Comprehensive event planning services, from concept to execution.',
    icon: <FaRegCalendarCheck className="text-4xl text-blue-600 mb-4" />,
  },
  {
    id: 2,
    title: 'Event Coordination',
    description: 'On-site coordination to ensure everything runs smoothly on the big day.',
    icon: <FaClipboardList className="text-4xl text-blue-600 mb-4" />,
  },
  {
    id: 3,
    title: 'Catering Services',
    description: 'Delicious catering options tailored to your event needs.',
    icon: <FaConciergeBell className="text-4xl text-blue-600 mb-4" />,
  },
  {
    id: 4,
    title: 'Event Decoration',
    description: 'Creative decoration services to enhance the ambiance of your event.',
    icon: <FaPalette className="text-4xl text-blue-600 mb-4" />,
  },
];

function Services() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center text-blue-900 dark:text-yellow-500 mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(service => (
            <div key={service.id} className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md p-6 flex flex-col items-center">
              {service.icon}
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{service.title}</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">{service.description}</p>
              <Link to={`/services/${service.id}`} className="mt-4 bg-blue-600 dark:bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 dark:hover:bg-yellow-400 transition duration-300">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
