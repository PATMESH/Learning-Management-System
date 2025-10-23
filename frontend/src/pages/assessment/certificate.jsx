import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Confetti from "react-dom-confetti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faShare,
  faAward,
  faCalendar,
  faIdCard,
  faCheckCircle,
  faGraduationCap,
  faStar,
  faArrowLeft,
  faCertificate,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import img from '../../assets/images/logo.jpg';
import seal from '../../assets/images/seal.png';
import { courseService } from "../../api/course.service";
import { profileService } from "../../api/profile.service";

const Certificate = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfDownloading, setPdfDownloading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { courseId } = useParams();
  const authToken = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  
  const [course, setCourse] = useState({
    course_name: "",
    instructor: "",
    description: "",
  });

  const certificateNumber = `CERT-${courseId}-${userId}-${Date.now().toString().slice(-6)}`;
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [userRes, courseRes] = await Promise.all([
          profileService.getUserDetails(userId),
          courseService.getCourseById(courseId)
        ]);

        if (userRes.success) {
          setUserDetails(userRes.data);
        } else {
          throw new Error("Failed to fetch user details");
        }

        if (courseRes.success) {
          setCourse(courseRes.data);          
        } else {
          throw new Error("Failed to fetch course details");
        }

        // Show confetti after data loads
        setTimeout(() => setShowConfetti(true), 500);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load certificate data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken, navigate, userId, courseId]);

  const handleDownloadPDF = async () => {
    setPdfDownloading(true);
    
    try {
      const certificateElement = document.getElementById("certificate");
      
      if (!certificateElement) {
        throw new Error("Certificate element not found");
      }

      const buttonsContainer = document.getElementById("certificate-buttons");
      if (buttonsContainer) {
        buttonsContainer.style.display = "none";
      }

      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;

      let imgWidth, imgHeight;
      if (imgAspectRatio > pdfAspectRatio) {
        imgWidth = pdfWidth;
        imgHeight = pdfWidth / imgAspectRatio;
      } else {
        imgHeight = pdfHeight;
        imgWidth = pdfHeight * imgAspectRatio;
      }

      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save(`${userDetails?.username || 'Certificate'}_${course?.course_name || 'Course'}_Certificate.pdf`);

      // Show buttons again
      if (buttonsContainer) {
        buttonsContainer.style.display = "flex";
      }
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setPdfDownloading(false);
    }
  };

  const handleShare = (platform) => {
    const shareText = `🎉 I just completed ${course?.course_name} and earned my certificate! #Achievement #Learning`;
    const shareUrl = window.location.href;
    
    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-6"></div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Preparing Your Certificate</h3>
          <p className="text-gray-600">Please wait while we generate your achievement certificate...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <FontAwesomeIcon icon={faAward} className="text-6xl text-red-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-10 top-0 mt-4 ml-0 inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
            <FontAwesomeIcon icon={faGraduationCap} className="text-3xl text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Congratulations! 🎉
          </h1>
          <p className="text-xl text-gray-600">You've earned your completion certificate!</p>
        </div>

        {/* Certificate */}
        <div className="max-w-4xl mx-auto">
          <div
            id="certificate"
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500"
            style={{
              background: "linear-gradient(135deg, #fef9e7 0%, #fff 50%, #fef3e2 100%)",
              position: "relative"
            }}
          >
            {/* Decorative Border */}
            <div className="absolute inset-4 border-4 border-yellow-300 rounded-2xl opacity-30"></div>
            <div className="absolute inset-8 border-2 border-yellow-200 rounded-xl opacity-20"></div>
            
            <div className="relative p-16 text-center">
              {/* Logo */}
              <div className="mb-8">
                <img
                  src={img}
                  alt="Institution Logo"
                  className="w-48 h-14 mx-auto rounded-full shadow-lg bg-white p-1"
                />
              </div>

              {/* Certificate Title */}
              <div className="mb-8">
                <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-yellow-600 via-yellow-500 to-orange-500 bg-clip-text mb-4">
                  Certificate of Achievement
                </h1>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1"></div>
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-2xl" />
                  <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1"></div>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="mb-12 space-y-6">
                <p className="text-xl text-gray-700 leading-relaxed">
                  This is to proudly certify that
                </p>
                
                <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text py-2">
                  {userDetails?.username || "Student"}
                </h2>
                
                <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  has successfully completed the comprehensive course
                </p>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mx-auto max-w-2xl border border-green-200">
                  <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
                    {course?.course_name?.length > 50 
                      ? course?.course_name 
                      : `${course?.course_name} - Complete Course`}
                  </h3>
                </div>

                <p className="text-lg text-gray-600 mt-8">
                  demonstrating dedication, skill, and mastery of the subject matter
                </p>
              </div>

              {/* Certificate Details */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-12 bg-gray-50 rounded-2xl p-8 mx-8">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                  <FontAwesomeIcon icon={faCalendar} className="text-indigo-600 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Date Issued</p>
                    <p className="text-lg font-bold text-gray-800">{currentDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faIdCard} className="text-purple-600 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Certificate ID</p>
                    <p className="text-lg font-bold text-gray-800">{certificateNumber}</p>
                  </div>
                </div>
              </div>

              {/* Signature and Seal */}
              <div className="flex justify-center items-center">
                <div className="text-center">
                  <img
                    src={seal}
                    alt="Official Seal"
                    className="w-32 h-24 mx-auto mb-4 opacity-80"
                  />
                  <div className="border-t-2 border-gray-400 pt-2 w-48">
                    <p className="text-lg font-semibold text-gray-800">Authorized Signature</p>
                    <p className="text-sm text-gray-600">Learning Platform</p>
                  </div>
                </div>
              </div>

              {/* Verification Notice */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm border border-green-200">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span>This certificate can be verified online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div id="certificate-buttons" className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              onClick={handleDownloadPDF}
              disabled={pdfDownloading}
              className="flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed"
            >
              {pdfDownloading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faDownload} className="text-xl" />
                  Download Certificate
                </>
              )}
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                LinkedIn
              </button>
              
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-xl" />
                Twitter
              </button>
              
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                Facebook
              </button>
            </div>
          </div>

          {/* Certificate Info */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">About Your Achievement</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <FontAwesomeIcon icon={faGraduationCap} className="text-3xl text-indigo-600 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Course Completed</h4>
                <p className="text-gray-600 text-sm">You have successfully finished all course requirements</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <FontAwesomeIcon icon={faCertificate} className="text-3xl text-green-600 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Verified Certificate</h4>
                <p className="text-gray-600 text-sm">This certificate is digitally verified and authentic</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <FontAwesomeIcon icon={faShare} className="text-3xl text-purple-600 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Share Your Success</h4>
                <p className="text-gray-600 text-sm">Show your achievement on social media platforms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;