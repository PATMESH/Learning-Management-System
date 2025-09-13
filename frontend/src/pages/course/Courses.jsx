import React, { useState, useEffect } from "react";
import Navbar from "../../Components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { courseService } from "../../api/course.service";
import { learningService } from "../../api/learning.service";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id");
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await courseService.getAllCourses();
        if (coursesRes.success) setCourses(coursesRes.data);

        if (userId) {
          const enrollmentsRes = await learningService.getEnrollments(userId);
          if (enrollmentsRes.success) {
            setEnrolled(enrollmentsRes.data.map((item) => item.course_id));
          }
        }
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const enrollCourse = async (courseId) => {
    if (!authToken) {
      toast.error("You need to login to continue", { autoClose: 1500 });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const res = await learningService.enrollCourse(userId, courseId);
    if (res.success && res.data === "Enrolled successfully") {
      toast.success("Course Enrolled successfully", { autoClose: 1500 });
      setTimeout(() => navigate(`/course/${courseId}`), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <Navbar page="courses" />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-lg">No courses available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.course_id}
                className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-lg transition-shadow p-2"
              >
                <img src={course.p_link} alt={course.course_name} className="h-40 w-full object-cover rounded-xl" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-neutral mb-2">
                    {course.course_name.length < 8 ? `${course.course_name} Tutorial` : course.course_name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">
                    Price: {course.price}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    Tutorial by {course.instructor}
                  </p>

                  {enrolled.includes(course.course_id) ? (
                    <button
                      onClick={() => navigate("/learnings")}
                      className="w-full py-2 rounded-xl bg-primary/10 hover:bg-primary/20 bg-neutral text-warning-dark font-semibold hover:bg-neutral/90 transition"
                    >
                      Enrolled
                    </button>
                  ) : (
                    <button
                      onClick={() => enrollCourse(course.course_id)}
                      className="w-full py-2 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition"
                    >
                      Enroll
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
