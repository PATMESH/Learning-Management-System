import React, { useEffect, useState } from "react";
import { message } from "antd";
import { courseService } from "../../api/course.service";

const Feedback = ({ courseid }) => {
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const res = await courseService.getFeedbacks(courseid);
    if (res.success) {
      setFeedbacks(res.data.slice(0, 5));
    } else {
      message.error(res.error || "Failed to load feedbacks");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [courseid]);

  const sendFeedback = async () => {
    if (!feedback.trim()) {
      message.warning("Please enter feedback before submitting");
      return;
    }

    const res = await courseService.postFeedback(courseid, feedback);
    if (res.success) {
      message.success("Feedback submitted 🎉");
      setFeedback("");
      fetchFeedbacks();
    } else {
      message.error(res.error || "Failed to submit feedback");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-10">
      <h3 className="text-xl font-bold text-neutral mb-4">Feedback</h3>

      {/* Feedback List */}
      <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
        {feedbacks.length > 0 ? (
          feedbacks.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* Avatar with initials */}
              <div className="w-4 h-4 flex items-center justify-center rounded-full bg-primary text-white font-bold">
                {''}
              </div>
              <p className="text-gray-700">{item.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No feedback yet. Be the first!</p>
        )}
      </div>

      {/* Input Section */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Write your feedback..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setFeedback(e.target.value)}
          value={feedback}
        />
        <button
          onClick={sendFeedback}
          className="px-5 py-2 bg-primary text-white font-semibold rounded-full hover:bg-accent/90 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Feedback;
