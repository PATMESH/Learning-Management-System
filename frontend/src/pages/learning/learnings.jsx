import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/common/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { learningService } from "../../api/learning.service";

function Learnings() {
  const userId = localStorage.getItem("id");
  const [courses, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await learningService.getEnrollments(userId);
        setCourse(response.data);        
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
        <Navbar page="learnings" />
        <div className="flex justify-center items-center h-[70vh]">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
        <Navbar page="learnings" />
        <div className="text-center mt-40 px-4">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            You haven’t enrolled in any courses yet 🚀
          </h1>
          <p className="text-lg text-gray-600">
            Explore our collection of courses and begin your learning journey today.
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Explore Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <Navbar page="learnings" />

      <div className="max-w-7xl mx-auto py-10 px-6">

        <div className="flex flex-wrap gap-6 justify-center">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex items-center justify-between bg-gray-50 border border-gray-300 bg-white rounded-2xl shadow-xl hover:shadow-lg transition w-[46%] px-4 py-3
              max-md:w-[90%]"
            >
              <img
                src={course.p_link}
                alt={course.course_name}
                className="rounded-lg shadow-md w-[180px] h-[120px] mr-4 object-cover max-md:w-[130px] max-md:h-[90px]"
              />
              <div className="flex-1 text-left">
                <h3 className="text-lg font-bold text-neutral mb-1 max-md:text-sm">
                  {course.course_name.length < 8
                    ? `${course.course_name} Tutorial`
                    : course.course_name}
                </h3>
                <p className="text-sm text-gray-600 max-md:text-xs">
                  by {course.instructor}
                </p>
              </div>
              <Link to={`/course/${course.course_id}`} className="ml-3">
                <button className="bg-secondary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary-dark/80 transition max-md:px-2 max-md:py-1 max-md:text-[10px]">
                  Start Learning
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Learnings;
