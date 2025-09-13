import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  faAward, 
  faDownload, 
  faTrophy, 
  faChartLine, 
  faCheckCircle, 
  faClock, 
  faGraduationCap,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { performanceService } from "../../api/performance.service";

const Performance = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingCert, setDownloadingCert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerformanceData = async () => {
      setLoading(true);
      const userId = localStorage.getItem("id");
      const result = await performanceService.getPerformanceData(userId);
      
      if (result.success) {
        setPerformanceData(result.data);
      } else {
        console.error("Failed to fetch performance data:", result.error);
      }
      setLoading(false);
    };

    fetchPerformanceData();
  }, []);

  const handleCertificateDownload = async (courseId) => {
    setDownloadingCert(courseId);
    const userId = localStorage.getItem("id");

    console.log(courseId);
    
    navigate(`/certificate/${courseId}`);
    
    setDownloadingCert(null);
  };

  const getScoreColor = (marks) => {
    if (marks >= 80) return "text-green-600 bg-green-50";
    if (marks >= 60) return "text-yellow-600 bg-yellow-50";
    if (marks >= 40) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const getScoreIcon = (marks) => {
    if (marks >= 80) return { icon: faTrophy, color: "text-yellow-500" };
    if (marks >= 60) return { icon: faStar, color: "text-blue-500" };
    return { icon: faChartLine, color: "text-gray-500" };
  };

  const calculateStats = () => {
    const completed = performanceData.filter(data => data.marks > 0).length;
    const totalCourses = performanceData.length;
    const avgScore = performanceData.length > 0 
      ? performanceData.reduce((sum, data) => sum + data.marks, 0) / performanceData.length 
      : 0;
    
    return { completed, totalCourses, avgScore: Math.round(avgScore) };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading Your Performance</h3>
          <p className="text-gray-600">Please wait while we fetch your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4">
      <div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Courses</p>
                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                <p className="text-sm text-gray-500">out of {stats.totalCourses}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-indigo-600">{stats.avgScore}%</p>
                <p className="text-sm text-gray-500">across all courses</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faChartLine} className="text-2xl text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Certificates Earned</p>
                <p className="text-3xl font-bold text-purple-600">{stats.completed}</p>
                <p className="text-sm text-gray-500">ready for download</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faAward} className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FontAwesomeIcon icon={faTrophy} />
              Course Performance
            </h2>
          </div>

          {performanceData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Details
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Certificate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {performanceData.map((data, index) => {
                    const scoreData = getScoreIcon(data.marks);
                    return (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                  {data.course.course_name.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {data.course.course_name}
                              </div>
                              <div className="text-sm text-gray-500">
                                Course ID: {data.course.course_id}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {data.marks > 0 ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                              Completed
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <FontAwesomeIcon icon={faClock} className="mr-1" />
                              In Progress
                            </span>
                          )}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {data.marks > 0 ? (
                            <div className="flex items-center justify-center gap-2">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(data.marks)}`}>
                                <FontAwesomeIcon icon={scoreData.icon} className={`mr-1 ${scoreData.color}`} />
                                {data.marks}%
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400 font-medium">—</span>
                          )}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {data.marks > 0 ? (
                            <button
                              onClick={() => handleCertificateDownload(data.course.course_id)}
                              disabled={downloadingCert === data.course.course_id}
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {downloadingCert === data.course.course_id ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                                  Download
                                </>
                              )}
                            </button>
                          ) : (
                            <span className="text-gray-400 italic text-sm">Complete course first</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                <FontAwesomeIcon icon={faChartLine} className="h-full w-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Performance Data Yet</h3>
              <p className="text-gray-500 mb-6">
                Start taking assessments to see your performance metrics here.
              </p>
              <button
                onClick={() => navigate('/courses')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                Browse Courses
              </button>
            </div>
          )}
        </div>

        {/* Achievement Badge */}
        {stats.completed > 0 && (
          <div className="mt-10 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-full shadow-lg">
              <FontAwesomeIcon icon={faAward} className="mr-2 text-xl" />
              🎉 Congratulations! You've completed {stats.completed} course{stats.completed > 1 ? 's' : ''}!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Performance;