import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { Progress, Modal } from "antd";
import { Play, Lock, MessageSquare, ArrowLeft, BookOpen, Users, Clock, Award } from "lucide-react";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import Feedback from "./Feedback";
import Forum from "./forum";
import { courseService } from "../../api/course.service";
import { progressService } from "../../api/progress.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Course = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [duration, setDuration] = useState(null);
  const [played, setPlayed] = useState(0);
  const [changePlayed, setChangePlayed] = useState(0);
  const [progressLoading, setProgressLoading] = useState(true);
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];
  const playerRef = useRef(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await courseService.getCourseById(courseId);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  const handleDuration = () => {
    const videoDuration = playerRef.current.getDuration();
    setDuration(videoDuration);
    if (videoDuration > 0) {
      progressService.updateDuration(userId, courseId, videoDuration);
    }
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setProgressLoading(true);
        const res = await progressService.getProgress(userId, courseId);
        if (res.success) {
          setPlayed(res.data);
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setProgressLoading(false);
      }
    };

    if (userId && courseId) {
      fetchProgress();
    }
  }, [userId, courseId]);

  useEffect(() => {
    const updateProgress = async () => {
      if (courseId && userId && duration) {
        const res = await progressService.updateProgress(userId, courseId, played, duration);
        if (res.success) {
          setPlayed(changePlayed < played ? played : changePlayed);
        }
      }
    };
    updateProgress();
  }, [changePlayed, courseId, userId, duration, played]);

  const getProgressPercent = () => {
    if (progressLoading || !duration || duration === 0) {
      return 0;
    }
    return Math.min(Math.ceil((played / duration) * 100), 100);
  };

  const progressPercent = getProgressPercent();

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Something went wrong!</div>;

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/learnings")}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-4 rounded-lg shadow-2xl transition-all duration-200 hover:shadow-lg"
          >
            <FontAwesomeIcon icon={faBackward} />
            Back
          </button>
          <div className="flex-1 mx-6">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 rounded-xl p-3 text-center shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-white italic">
                The Complete {course.course_name} Course – 2025 Edition
              </h3>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          <ReactPlayer
            ref={playerRef}
            onProgress={(progress) => {
              if (changePlayed + 10 <= progress.playedSeconds) {
                setChangePlayed(progress.playedSeconds);
              }
            }}
            url={course.y_link}
            controls
            type="video/mp4"
            width="100%"
            height="440px"
            onDuration={handleDuration}
            played={played}
            className="rounded-xl bg-neutral shadow-2xl p-2"
          />

          <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-2xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <Play className="w-5 h-5 text-primary" />
              <h4 className="text-lg font-semibold text-neutral">Course Format</h4>
            </div>
            <p className="text-gray-600 text-xs mb-4 text-left">
              This is a self-paced online course, consisting of video lectures, coding exercises,
              and quizzes. You can complete the course at your own pace within 8 weeks.
            </p>

            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5 text-primary" />
              <h4 className="text-lg font-semibold text-neutral">Prerequisites</h4>
            </div>
            <p className="text-gray-600 text-xs mb-4 text-left">
              No prior programming experience is required, but basic computer literacy is recommended.
            </p>

            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5 text-primary" />
              <h4 className="text-lg font-semibold text-neutral">Who Should Take This Course</h4>
            </div>
            <ul className="list-disc list-inside text-gray-600 text-xs mb-4 text-left">
              <li>Beginners interested in learning programming.</li>
              <li>Individuals looking to add {course.course_name} to their skillset.</li>
              <li>Students preparing for computer science courses.</li>
            </ul>

            <div className="flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-primary" />
              <h4 className="text-lg font-semibold text-neutral">Evaluate Yourself</h4>
            </div>
            <p className="text-gray-600 text-xs mb-4 text-left">
              Take assessments to reinforce your learning and get valuable feedback.
            </p>

            {progressPercent >= 98 ? (
              <button
                onClick={() => navigate(`/assessment/${course.course_id}`)}
                className="w-full py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                Take Quiz
              </button>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 bg-gray-300 text-gray-600 rounded-lg font-semibold cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Quiz Locked
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white shadow-2xl rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-primary" />
            <h4 className="text-lg font-semibold text-neutral">Description</h4>
          </div>
          <p className="text-gray-600 italic">{course.description}</p>
        </div>

        <div className="mt-8 bg-white shadow-2xl rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-neutral">Progress</h3>
          </div>
          {progressLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-500">Loading progress...</span>
            </div>
          ) : (
            <>
              <Progress
                percent={progressPercent}
                status={progressPercent === 100 ? "success" : "active"}
                strokeColor="#6366f1"
              />
              <p className="mt-2 text-sm text-gray-600">
                You have completed <span className="font-semibold">{progressPercent}%</span> of this course.
              </p>
            </>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-lg hover:shadow-xl flex items-center gap-2"
            onClick={() => setIsDiscussionOpen(true)}
          >
            <MessageSquare className="w-4 h-4" />
            Discussion
          </button>
        </div>

        <Modal
          title="Note:"
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        >
          <p className="text-neutral font-semibold">Complete 100% of your course to unlock the quiz.</p>
        </Modal>

        <Modal
          title={
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Discussion Forum
            </div>
          }
          open={isDiscussionOpen}
          onCancel={() => setIsDiscussionOpen(false)}
          footer={null}
          width={800}
          className="discussion-modal"
        >
          <Forum courseId={courseId} />
        </Modal>

        <div className="mt-10">
          <Feedback courseid={courseId} />
        </div>
      </div>
    </div>
  );
};

export default Course;