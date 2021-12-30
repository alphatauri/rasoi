import type { NextPage } from "next";
import { useQuery } from "react-query";

interface Dog {
  message: string;
  status: string;
}

const Home: NextPage = () => {
  const { data, isLoading, error } = useQuery<Dog, Error>(
    "dogs",
    async function () {
      return fetch("https://dog.ceo/api/breeds/image/random").then((r) =>
        r.json()
      );
    }
  );

  if (error && !isLoading) return <div>some error occured</div>;

  return (
    <div className="mx-auto w-95 mt-24">
      {isLoading ? "loading..." : <img src={data?.message} alt="" />}
    </div>
  );
};

export default Home;
