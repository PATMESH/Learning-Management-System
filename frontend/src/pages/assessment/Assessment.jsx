import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { faBackward, faCheck, faTimes, faAward, faThumbsUp, faFrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'antd';
import { assessmentService } from '../../api/assessment.service';

function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.pathname.split("/")[2];
  const [test, setTest] = useState([]);
  const [userId] = useState(localStorage.getItem("id"));
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctCount, setCorrectCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [totalQsns, setTotalQsns] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const result = await assessmentService.getQuestions(courseId);
      if (result.success) {
        setTest(result.data);
        setTotalQsns(result.data.length);
      }
      setLoading(false);
    };
    fetchQuestions();
  }, [courseId]);

  const handleAnswerChange = (questionId, selectedOption) => {
    const question = test.find(q => q.id === questionId);
    const prevAnswer = selectedAnswers[questionId];
    const updatedSelectedAnswers = { ...selectedAnswers };
    let scoreChange = 0;

    if (prevAnswer === selectedOption) {
      delete updatedSelectedAnswers[questionId];
      if (question.answer === selectedOption) scoreChange = -1;
    } else {
      updatedSelectedAnswers[questionId] = selectedOption;
      if (prevAnswer && question.answer === prevAnswer) scoreChange -= 1;
      if (question.answer === selectedOption) scoreChange += 1;
    }

    setSelectedAnswers(updatedSelectedAnswers);
    setCorrectCount(prev => prev + scoreChange);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const marks = totalQsns > 0 ? (correctCount / totalQsns) * 100 : 0;
    const result = await assessmentService.submitAssessment(userId, courseId, marks);
    setSubmitting(false);
    if (result.success) setOpenModal(true);
    else alert("Failed to submit assessment. Please try again.");
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCorrectCount(0);
  };

  const getResultMessage = () => {
    const percentage = totalQsns > 0 ? (correctCount / totalQsns) * 100 : 0;
    if (percentage >= 80) return { message: 'Excellent!', icon: faAward, color: 'text-yellow-500' };
    if (percentage >= 60) return { message: 'Good Job!', icon: faThumbsUp, color: 'text-green-500' };
    return { message: 'Keep Learning!', icon: faFrown, color: 'text-orange-500' };
  };

  const resultData = getResultMessage();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(`/course/${courseId}`)}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
          >
            <FontAwesomeIcon icon={faBackward} />
            Back to Course
          </button>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-2xl shadow-lg">
            <h1 className="text-xl font-bold text-center">Assessment Questions</h1>
          </div>

          <div className="bg-white rounded-lg shadow-md px-4 py-2">
            <p className="text-sm text-gray-600">Progress</p>
            <p className="font-bold text-indigo-600">
              {Object.keys(selectedAnswers).length}/{totalQsns}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {test.map((question, index) => (
            <div
              key={question.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="bg-indigo-100 border-b border-indigo-200 p-4 text-start">
                <h3 className="text-lg font-semibold">
                  Question {index + 1}: {question.question}
                </h3>
              </div>

              <div className="p-6 space-y-3">
                {[question.option1, question.option2, question.option3, question.option4].map((option, optionIndex) => (
                  <label
                    key={`${question.id}-${optionIndex}`}
                    className={`flex items-center p-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedAnswers[question.id] === option
                        ? 'bg-indigo-100 border-2 border-indigo-500 text-indigo-800'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      checked={selectedAnswers[question.id] === option}
                      onChange={() => handleAnswerChange(question.id, option)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 ${
                        selectedAnswers[question.id] === option
                          ? 'border-indigo-500 bg-indigo-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedAnswers[question.id] === option && (
                        <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                      )}
                    </div>
                    <span className="text-gray-700 font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleReset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-md"
          >
            Reset All
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || Object.keys(selectedAnswers).length !== totalQsns}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg ${
              submitting || Object.keys(selectedAnswers).length !== totalQsns
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
            }`}
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
                Submitting...
              </>
            ) : (
              'Submit Assessment'
            )}
          </button>
        </div>
      </div>

      <Modal
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={[
          <button
            key="ok"
            onClick={() => navigate(`/course/${courseId}`)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Continue Learning
          </button>
        ]}
        className="assessment-modal"
        width={500}
      >
        <div className="text-center py-6">
          <div className={`text-6xl mb-4 ${resultData.color}`}>
            <FontAwesomeIcon icon={resultData.icon} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Assessment Complete!</h2>
          <h3 className={`text-3xl font-bold mb-4 ${resultData.color}`}>{resultData.message}</h3>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 mb-4">
            <div className="text-4xl font-bold text-indigo-600 mb-2">
              {totalQsns > 0 ? Math.round((correctCount / totalQsns) * 100) : 0}%
            </div>
            <p className="text-gray-600">
              You answered <span className="font-bold text-indigo-600">{correctCount}</span> out of{' '}
              <span className="font-bold text-indigo-600">{totalQsns}</span> questions correctly
            </p>
          </div>

          <div className="flex justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-1" />
              Correct: {correctCount}
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faTimes} className="text-red-500 mr-1" />
              Incorrect: {totalQsns - correctCount}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Assessment;
