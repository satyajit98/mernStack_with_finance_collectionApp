import { useEffect } from "react";
import { useCollectionContext } from "../hooks/useCollectionContext";
import { useAuthContext } from "../hooks/useAuthContext";
// Components
import CollectionDetails from "../components/CollectionDetails";
import CollectionForm from "../components/CollectionForm";

const Home = () => {
  const { collections, dispatch } = useCollectionContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCollection = async () => {
      const response = await fetch("/api/details", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_COLLECTION", payload: json });
      }
    };
    if (user) {
      fetchCollection();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="collections">
        {collections &&
          collections.map((collection) => (
            <CollectionDetails key={collection._id} collection={collection} />
          ))}
      </div>
      <CollectionForm />
    </div>
  );
};

export default Home;
