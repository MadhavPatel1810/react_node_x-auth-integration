import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Timeline from "../components/Timeline";
import userLogo from "@/assets/images/png/user.png";
import { useLogout } from "@/components/hooks/useLogout";
import twitterLogo from "@/assets/images/png/twitter.png";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import { useTwitterProfile } from "@/components/hooks/useTwitterProfile";
import { FiLogOut } from "react-icons/fi";

function Profile() {
  const { profile, isLoading, error } = useTwitterProfile();
  const { logout } = useLogout();

  // Handle logout with confirmation
  const handleLogout = async () => {
    await ConfirmationDialog({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ff4d4d",
      cancelButtonColor: "#1da1f2",
      onConfirm: logout,
      onCancel: () => console.log("Logout canceled"),
    });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>xAuth | My Profile</title>
      </Helmet>
      <div className="xauth-profile">
        <button className="logout-button-top" onClick={handleLogout}>
          <FiLogOut className="logout-icon" /> Logout
        </button>
        <div className="xauth-background">
          <div className="xauth-logo xauth-logo-x">𝕏</div>
          <div className="xauth-logo xauth-logo-twitter">
            <img src={twitterLogo} alt="Twitter Logo" />
          </div>
          <div className="xauth-background-overlay"></div>
        </div>
        <Timeline />
        <motion.div className="profile-card">
          <motion.img
            src={profile?.profile_image_url || userLogo}
            className="profile-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = userLogo;
            }}
          />
          {isLoading ? (
            <p className="profile-loading">Loading...</p>
          ) : error ? (
            <p className="profile-error">{error}</p>
          ) : profile ? (
            <>
              <h1 className="profile-name">{profile?.name || "N/A"}</h1>
              <p className="profile-username">
                @{profile?.screen_name || "N/A"}
              </p>
              <p className="profile-description">
                {profile?.description || "No bio available."}
              </p>
              <p className="profile-id">User ID: {profile?.id_str}</p>
              <p className="profile-followers">
                Followers: {profile?.followers_count}
              </p>
              <p className="profile-following">
                Following: {profile?.friends_count}
              </p>
              <p className="profile-created">
                Joined: {new Date(profile?.created_at)?.toDateString()}
              </p>
            </>
          ) : (
            <p className="profile-loading">No Profile Data</p>
          )}
        </motion.div>
      </div>
    </>
  );
}
export default Profile;
