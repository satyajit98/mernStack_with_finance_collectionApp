import { useCollectionContext } from "../hooks/useCollectionContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const CollectionDetails = ({ collection }) => {
  const { dispatch } = useCollectionContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/details/" + collection._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_COLLECTION", payload: json });
    }
  };
  return (
    <div className="collection-details">
      <h4>{collection.full_name}</h4>
      <p>
        <strong>Price:</strong>
        {collection.price}
      </p>
      <p>
        <strong>Location:</strong>
        {collection.location}
      </p>
      <p>
        <strong>Phone Number:</strong>
        {collection.ph_number}
      </p>
      <p>
        {formatDistanceToNow(new Date(collection.createdAt), {
          addSuffix: true,
        })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default CollectionDetails;
