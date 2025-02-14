import loading from "@/assets/images/gif/loader.gif";
const Loader = () => {
  return (
    <div className={`loader show`}>
      <img src={loading} alt="Loading..." width={"60px"} />
    </div>
  );
};
export default Loader;
