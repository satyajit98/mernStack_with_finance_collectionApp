import { useEffect } from "react";
import { useCollectionContext } from "../hooks/useCollectionContext";
// Components
import CollectionDetails from "../components/CollectionDetails";
import CollectionForm from "../components/CollectionForm";

const Home = () => {
  const { collections, dispatch } = useCollectionContext();

  useEffect(() => {
    const fetchCollection = async () => {
      const response = await fetch("/api/details");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_COLLECTION", payload: json });
      }
    };
    fetchCollection();
  }, [dispatch]);

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
