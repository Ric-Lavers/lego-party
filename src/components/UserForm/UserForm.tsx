import { useEffect, FC } from "react";
import Skeleton from "react-loading-skeleton";
import { useSetState } from "react-use";
import { IUseUserData } from "../../hooks/useUserData";

const UserForm: FC<Pick<IUseUserData, "loading" | "user" | "createUser">> = ({
  loading,
  user,
  createUser,
}) => {
  const [userDetails, setUserState] = useSetState(user);
  useEffect(() => {
    setUserState(user);
  }, [user]);

  if (user._id && user.name) {
    return <h1>Hey {user.name}</h1>;
  }

  if (loading)
    return (
      <div id="rsvp-form-container">
        <form id="rsvp-form">
          <p>
            <Skeleton width={100} />
          </p>
          <br />
          <label htmlFor="name">
            <Skeleton width={75} />
            <br />
            <Skeleton width={150} />
          </label>
          <br />

          <label htmlFor="number">
            <Skeleton width={75} />
            <br />
            <Skeleton width={150} />
          </label>
          <br />

          <input type="submit" value="join us" />
        </form>
      </div>
    );

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUserState({ [name]: value });
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(userDetails, user);
    const { name, number, _id } = userDetails;
    createUser({ name, number, _id });
  };

  return (
    <div id="rsvp-form-container">
      <form className="rsvp-form" onSubmit={handleSubmit} id="rsvp-form">
        <p>RSVP</p>
        <br />
        <label htmlFor="name">
          <br />
          <input
            id="name"
            name="name"
            type="text"
            value={userDetails.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </label>
        <br />

        <label htmlFor="number">
          <br />
          <input
            id="number"
            name="number"
            type="text"
            value={userDetails.number}
            onChange={handleChange}
            placeholder="Mobile number"
          />
        </label>
        <br />

        <input type="submit" value="join us" />
      </form>
    </div>
  );
};

export default UserForm;
