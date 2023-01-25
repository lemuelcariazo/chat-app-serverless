import { config } from "../config";
import useFetch from "../hooks/useFetch";

type LOG = {
  getLogs: React.Dispatch<React.SetStateAction<boolean>>;
};

function Profile() {
  const { development, production } = config;

  const { value, isLoading, error } = useFetch(
    `${development.BASE_URL}/api/profile`
  );

  const { id, email, loggedIn } = value;

  return (
    <div className="flex justify-center items-center">
      {loggedIn ? (
        <h1 className="text-center">
          {isLoading ? "Loading..." : `Hello, ${id} ${email} ${loggedIn}`}
        </h1>
      ) : (
        error
      )}
    </div>
  );
}

export default Profile;
