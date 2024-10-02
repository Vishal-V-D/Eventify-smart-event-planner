import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaRegCalendarCheck, FaClipboardList, FaConciergeBell, FaPalette } from 'react-icons/fa';
import './index.css'; // Import your CSS file

const serviceDetails = {
  1: {
    title: 'Event Planning',
    description: 'Comprehensive event planning services, from concept to execution. We help you with everything from venue selection to theme planning.',
    icon: <FaRegCalendarCheck className="text-4xl text-blue-600 mb-4" />,
  },
  2: {
    title: 'Event Coordination',
    description: 'On-site coordination to ensure everything runs smoothly on the big day. Our team manages logistics and helps resolve any issues that arise.',
    icon: <FaClipboardList className="text-4xl text-blue-600 mb-4" />,
  },
  3: {
    title: 'Catering Services',
    description: 'Delicious catering options tailored to your event needs. We offer various cuisines and dietary options to suit your guests.',
    icon: <FaConciergeBell className="text-4xl text-blue-600 mb-4" />,
  },
  4: {
    title: 'Event Decoration',
    description: 'Creative decoration services to enhance the ambiance of your event. We provide themed decor and floral arrangements that reflect your vision.',
    icon: <FaPalette className="text-4xl text-blue-600 mb-4" />,
  },
};

function ServiceDetail() {
  const { id } = useParams();
  const service = serviceDetails[id];

  if (!service) {
    return <h2>Service not found!</h2>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center text-blue-900 dark:text-yellow-500 mb-8">{service.title}</h1>
        <div className="flex flex-col items-center">
          {service.icon}
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-center">{service.description}</p>
        </div>
        <Link to="/services" className="block mt-6 text-blue-600 dark:text-yellow-500 hover:underline">
          Back to Services
        </Link>
      </div>
    </div>
  );
}

export default ServiceDetail;
