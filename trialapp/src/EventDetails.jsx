import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaCommentDots,
  FaClock,
  FaTag,
  FaUserFriends,
} from 'react-icons/fa';
import emailjs from 'emailjs-com';
import './index.css';
import eventImg from './assets/event.jpg';

// Sample events data
const eventsData = [
  {
    id: '1',
    name: 'Tech Conference 2024',
    description: 'Join us for the annual Tech Conference to learn about the latest trends in technology.',
    date: '2024-06-15',
    location: 'San Francisco, CA',
    img_src: 'event1.jpg',
    speakers: ['John Doe', 'Jane Smith'],
    agenda: [
      { time: '09:00 AM', topic: 'Opening Keynote' },
      { time: '10:00 AM', topic: 'AI and Machine Learning' },
      { time: '11:00 AM', topic: 'Cybersecurity Trends' },
      { time: '12:00 PM', topic: 'Lunch Break' },
      { time: '01:00 PM', topic: 'Blockchain Innovations' },
    ],
    ticketPrice: '$199',
    contact: {
      phone: '+1 234 567 8901',
      email: 'info@techconference.com',
    },
    website: 'http://techconference2024.com',
  },
  // Add more events with varied details...
];

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find((event) => event.id === id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comments: '',
    numberOfTickets: 1,
    ticketHolders: [{ name: '', mobile: '' }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTicketHolderChange = (index, e) => {
    const newTicketHolders = [...formData.ticketHolders];
    newTicketHolders[index][e.target.name] = e.target.value;
    setFormData({ ...formData, ticketHolders: newTicketHolders });
  };

  const addTicketHolder = () => {
    setFormData({
      ...formData,
      ticketHolders: [...formData.ticketHolders, { name: '', mobile: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingDate = new Date().toLocaleDateString();

    // Send confirmation email
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      event_name: event.name,
      event_date: event.date,
      event_location: event.location,
      ticket_price: event.ticketPrice,
      number_of_tickets: formData.numberOfTickets,
      agenda: event.agenda.map((item) => `${item.time} - ${item.topic}`).join('\n'),
      comments: formData.comments,
      ticket_holders: formData.ticketHolders.map(holder => `${holder.name} (${holder.mobile})`).join(', '),
      booking_date: bookingDate,  // Current date as booking date
      support_link: "https://your-support-link.com"
    };

    emailjs.send('service_b7hqv3p', 'template_xpb3qmh', templateParams, 'GLHTEqxPVieoxx1TN')
      .then(() => {
        navigate('/confirmation', { state: { event, formData } });
      })
      .catch((err) => console.error('EmailJS Error:', err));
  };

  if (!event) {
    return <h2>Event not found!</h2>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <img src={eventImg} alt={event.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-yellow-500">{event.name}</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{event.description}</p>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            <FaCalendarAlt className="inline-block mr-2" />
            {event.date}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <FaMapMarkerAlt className="inline-block mr-2" />
            {event.location}
          </p>
          <p className="mt-4 font-semibold text-cyan-300">
            Ticket Price: <span className="text-yellow-300">{event.ticketPrice}</span>
          </p>
          <p className="mt-4 text-gray-100 dark:text-gray-200">
            <FaUserFriends className="inline-block mr-2" />
            Speakers: {event.speakers.join(', ')}
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            <FaPhone className="inline-block mr-2" />
            Contact: {event.contact.phone} |
            <FaEnvelope className="inline-block mx-2" />
            {event.contact.email}
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Website: <a href={event.website} className="text-cyan-300 hover:underline">{event.website}</a>
          </p>

          <h3 className="mt-4 font-semibold">Agenda:</h3>
          <ul className="list-disc ml-5">
            {event.agenda.map((item, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">{item.time} - {item.topic}</li>
            ))}
          </ul>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300" htmlFor="name">Name</label>
              <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-2 mt-2">
                <FaUserCircle className="text-gray-500 dark:text-gray-400 ml-2" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-transparent flex-1 p-2 outline-none text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300" htmlFor="email">Email</label>
              <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-2 mt-2">
                <FaEnvelope className="text-gray-500 dark:text-gray-400 ml-2" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent flex-1 p-2 outline-none text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300" htmlFor="phone">Phone</label>
              <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-2 mt-2">
                <FaPhone className="text-gray-500 dark:text-gray-400 ml-2" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-transparent flex-1 p-2 outline-none text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
  <label className="block text-gray-700 dark:text-gray-300" htmlFor="numberOfTickets">Number of Tickets</label>
  <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-2 mt-2">
    <FaTag className="text-gray-500 dark:text-gray-400 ml-2" />
    <input
      type="number"
      id="numberOfTickets"
      name="numberOfTickets"
      value={formData.numberOfTickets}
      onChange={(e) => {
        const value = Math.max(1, parseInt(e.target.value, 10) || 1); // Ensure at least 1 ticket
        const diff = value - formData.ticketHolders.length;

        setFormData((prevData) => {
          let newTicketHolders = [...prevData.ticketHolders];

          // Add or remove ticket holders based on the difference
          if (diff > 0) {
            for (let i = 0; i < diff; i++) {
              newTicketHolders.push({ name: '', mobile: '' });
            }
          } else {
            newTicketHolders = newTicketHolders.slice(0, value);
          }

          return {
            ...prevData,
            numberOfTickets: value,
            ticketHolders: newTicketHolders,
          };
        });
      }}
      min="1"
      className="bg-transparent flex-1 p-2 outline-none text-gray-900 dark:text-gray-100"
      required
    />
  </div>
</div>


            {formData.ticketHolders.map((holder, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold">Ticket Holder {index + 1}</h4>
                <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-2 mt-2">
                  <FaUserCircle className="text-gray-500 dark:text-gray-400 ml-2" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Holder Name"
                    value={holder.name}
                    onChange={(e) => handleTicketHolderChange(index, e)}
                    className="bg-transparent flex-1 p-2 outline-none text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-2 mt-2">
                  <FaPhone className="text-gray-500 dark:text-gray-400 ml-2" />
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Holder Mobile"
                    value={holder.mobile}
                    onChange={(e) => handleTicketHolderChange(index, e)}
                    className="bg-transparent flex-1 p-2 outline-none text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addTicketHolder}
              className="mt-2 text-yellow-300 hover:underline"
            >
              Add Another Ticket Holder
            </button>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300" htmlFor="comments">Comments</label>
              <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-2 mt-2">
                <FaCommentDots className="text-gray-500 dark:text-gray-400 ml-2" />
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  className="bg-transparent flex-1 p-2 outline-none text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 text-white rounded-full p-2 hover:bg-blue-700 transition duration-300"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
