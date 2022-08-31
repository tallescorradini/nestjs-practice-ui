import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";

interface Props {
  user: { email: string; id: string };
}
export const Profile: NextPage<Props> = ({ user }) => {
  const router = useRouter();

  function handleSignOut() {
    document.cookie = `accessToken=; Expires=${new Date(
      0,
      0,
      1
    ).toUTCString()}; Secure`;

    router.push("/");
  }
  return (
    <>
      Welcome, userId: {user.id}
      <Button onClick={handleSignOut} variant="contained" size="large">
        Sign out
      </Button>
    </>
  );
};

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { accessToken } = context.req.cookies;

  if (!accessToken)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const jwtPayload = parseJwt(accessToken);
  return {
    props: { user: { email: jwtPayload.username, id: jwtPayload.sub } },
  };
}

function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}
