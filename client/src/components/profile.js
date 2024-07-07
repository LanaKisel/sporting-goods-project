import { useGetCurrentUserQuery } from "../services/sportingGoodsApi"

const Profile = () => {
  const { data: currUser, isLoading: currUserIsLoading } = useGetCurrentUserQuery()

  if (currUserIsLoading) {
    return <div style={{ display: 'inline-block', width: "100%", textAlign: "right" }}>Loading ...</div>;
  }

  return (
    !currUser ? <></> :
      <div style={{ display: 'inline-block', width: "100%" }}>
        {/* <img src={user.picture} alt={user.name} /> */}
        <h2 style={{ textAlign: "right" }}>{currUser.name}</h2>
        {/* <p>{user.email}</p> */}
      </div>
  );
};

export default Profile;