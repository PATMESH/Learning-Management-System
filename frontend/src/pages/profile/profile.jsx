import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";
import ImgUpload from "./ImgUpload";
import Performance from "./Performance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import {
  faUser,
  faEnvelope,
  faPhone,
  faVenus,
  faMars,
  faCalendar,
  faBriefcase,
  faMapMarkerAlt,
  faBookOpen,
  faEdit,
  faTrophy
} from "@fortawesome/free-solid-svg-icons";
import { profileService } from "../../api/profile.service";
import EditProfileModal from "./EditProfileModal";

function Profile() {
  const id = localStorage.getItem("id");
  const [userDetails, setUserDetails] = useState(null);
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");
  const [loadingImage, setLoadingImage] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userRes = await profileService.getUserDetails(id);
        if (userRes.success) {
          setUserDetails(userRes.data);
        }

        const imgRes = await profileService.getProfileImage(id);
        if (imgRes.success) {
          setProfileImage(imgRes.data);
        }
      } finally {
        setLoadingImage(false);
      }
    }
    fetchUserDetails();
  }, [id]);

  const updateUser = async (updatedData) => {
    try {
      const res = await profileService.updateUser(id, updatedData);

      setUserDetails(prevDetails => ({
        ...prevDetails,
        ...updatedData
      }));

      return true;
    } catch (err) {
      console.error("Error updating user:", err);
      return false;
    }
  };

  const handleEditProfile = () => {
    setIsEditModalVisible(true);
  };

  const handleModalClose = () => {
    setIsEditModalVisible(false);
  };

  const handleProfileUpdate = async (updatedData) => {
    const success = await updateUser(updatedData);
    return success;
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const res = await profileService.uploadProfileImage(id, file);
    if (res.success) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const getGenderIcon = (gender) => {
    if (gender?.toLowerCase() === 'female') return faVenus;
    if (gender?.toLowerCase() === 'male') return faMars;
    return faUser;
  };

  if (!userDetails && !loadingImage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
        <Navbar page="profile" />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <Navbar page="profile" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">


          {/* Profile Info */}
          <div className="relative px-8 pb-8">
            {/* Profile Picture */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end mb-6">
              <div className="relative z-10">
                <ImgUpload
                  onChange={handleImageChange}
                  src={loadingImage ? null : profileImage}
                  isLoading={loadingImage}
                />
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">
                      {userDetails?.username || "User"}
                    </h2>
                    <p className="text-gray-600 text-lg">{userDetails?.profession || "Learner"}</p>
                    {userDetails?.location && (<div className="flex items-center text-gray-500 mt-1">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-sm" />
                      {userDetails?.location}
                    </div>)}
                  </div>

                  <button
                    onClick={handleEditProfile}
                    className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {(userDetails?.linkedin_url || userDetails?.github_url) && (
              <div className="flex gap-4 mb-6">
                {userDetails?.linkedin_url && (
                  <a
                    href={userDetails.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                    LinkedIn
                  </a>
                )}
                {userDetails?.github_url && (
                  <a
                    href={userDetails.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                    GitHub
                  </a>
                )}
              </div>
            )}

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === "overview"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
                  }`}
              >
                <FontAwesomeIcon icon={faUser} />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("performance")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === "performance"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
                  }`}
              >
                <FontAwesomeIcon icon={faTrophy} />
                Performance
              </button>
            </div>
          </div>
        </div>

        {activeTab === "overview" ? (
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-indigo-600" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard
                  icon={faEnvelope}
                  label="Email Address"
                  value={userDetails?.email}
                  iconColor="text-red-500"
                />
                <InfoCard
                  icon={faPhone}
                  label="Phone Number"
                  value={userDetails?.mobileNumber}
                  iconColor="text-green-500"
                />
                <InfoCard
                  icon={getGenderIcon(userDetails?.gender)}
                  label="Gender"
                  value={userDetails?.gender}
                  iconColor="text-purple-500"
                />
                <InfoCard
                  icon={faCalendar}
                  label="Date of Birth"
                  value={userDetails?.dob}
                  iconColor="text-blue-500"
                />
                <InfoCard
                  icon={faBriefcase}
                  label="Profession"
                  value={userDetails?.profession}
                  iconColor="text-orange-500"
                />
                <InfoCard
                  icon={faBookOpen}
                  label="Learning Courses"
                  value={userDetails?.learningCourses?.length || 0}
                  iconColor="text-indigo-500"
                />
              </div>
            </div>
          </div>
        ) : (
          <Performance />
        )}
      </div>

      <EditProfileModal
        visible={isEditModalVisible}
        onCancel={handleModalClose}
        userDetails={userDetails}
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
}

function InfoCard({ icon, label, value, iconColor = "text-gray-400" }) {
  return (
    <div className="group p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-100">
      <div className="flex items-start gap-3">
        <div className={`mt-1 ${iconColor}`}>
          <FontAwesomeIcon icon={icon} className="text-lg" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-600 mb-1">{label}</h4>
          <p className="text-gray-900 group-hover:text-indigo-600 transition-colors">
            {value || "Not specified"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;