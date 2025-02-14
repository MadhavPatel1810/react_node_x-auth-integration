import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Timeline from "../components/Timeline";
import userLogo from "@/assets/images/png/user.png";
import twitterLogo from "@/assets/images/png/twitter.png";
import { useTwitterProfile } from "@/components/hooks/useTwitterProfile";

function Profile() {
  const { profile, isLoading, error } = useTwitterProfile();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>xAuth | My Profile</title>
      </Helmet>
      <div className="xauth-profile">
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
              <h1 className="profile-name">{profile?.name}</h1>
              <p className="profile-username">Username: @{profile?.username}</p>
              <p className="profile-description">ID: {profile?.id}</p>
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
