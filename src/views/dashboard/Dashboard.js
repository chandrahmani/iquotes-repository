import Quotes from "components/quotes/Quotes";
import { useAuthHook } from "hooks/useAuthHook";
import { useEffect } from "react";

const Dashboard = () => {
  const { noAuth } = useAuthHook();

  useEffect(() => {
    noAuth();
  }, []);

  return (
    <>
      <Quotes />
    </>
  );
};
export default Dashboard;
