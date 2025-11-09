import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreatorEvents.css"; // For styling

const CreatorEvents = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventTitle, setSelectedEventTitle] = useState(""); // New state for event title
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/events/createdByMe",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const viewParticipants = async (eventId, eventTitle) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/events/${eventId}/participants`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setParticipants(response.data);
      setSelectedEvent(eventId);
      setSelectedEventTitle(eventTitle); // Set the event title
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setParticipants([]);
    setSelectedEvent(null);
    setSelectedEventTitle(""); // Reset the event title
  };

  const handlePrint = () => {
    window.print(); // Trigger the print dialog
  };

  return (
    <div className="creator-events-container">
      <button onClick={() => navigate("/create-event")}>Add Event</button>
      <h2>Your Created Events</h2>
      <div className="event-list">
        {events.map((event) => (
          <div className="event-card" key={event._id}>
            <div className="event-image-container">
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
              />
            </div>
            <div className="event-content">
              <h1 className="topnone">{event.title}</h1>
              <p>{event.description}</p>
              <p>
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </p>
              <p>Location: {event.location}</p>
              <button onClick={() => viewParticipants(event._id, event.title)}>
                View Participants
              </button>{" "}
              {/* Pass the event title */}
            </div>
          </div>
        ))}
      </div>

      {modalVisible && (
        <div className="modal2-overlay">
          <div className="modal2-content">
            <h2 className="print-heading">
              Participants for {selectedEventTitle}
            </h2>{" "}
            {/* Use event title here */}
            <table className="print-table">
              <thead>
                <tr>
                  <th>Register Number(s)</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Email</th>
                  <th>Phone No.</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((group, groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    {group.users.map((user, userIndex) => (
                      <tr key={user.registerNumber}>
                        {userIndex === 0 && (
                          <td rowSpan={group.users.length}>
                            {group.registerNumbers.map((regNo, index) => (
                              <div key={index}>{regNo}</div>
                            ))}
                          </td>
                        )}
                        <td>{user.name}</td>
                        <td>{user.class}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <button onClick={closeModal}>Close</button>
            <button onClick={handlePrint}>Print</button> {/* Print button */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorEvents;
