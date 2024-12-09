import { useQueryClient } from "@tanstack/react-query";
import classes from "./PlacesList.module.scss";
import { CacheKeyContext } from "../../store/cacheKeyContext.tsx";
import {useContext} from "react";
import { SearchResultInterface } from "../../interfaces/interfaces.ts";
import PlaceCard from "./Components/PlaceCard/PlaceCard.tsx";

const PlacesList = (): JSX.Element => {
  const queryClient = useQueryClient();
  const cacheKeyCtx = useContext(CacheKeyContext);
  const cachedData: SearchResultInterface | undefined = queryClient.getQueryData([
    "search",
    cacheKeyCtx.searchTerm,
    cacheKeyCtx.coordinates,
  ]);
  return (
    <>
      {!cachedData && (
        <div className={classes.greetingsText}>
          <h1>Welcome!</h1>
          <p>Find Top 10 Places In Chosen City</p>
        </div>
      )}
      {cachedData && (
        <ul className={classes.list}>
          {cachedData?.results
            .sort((a, b) => b.rating !== undefined?  b.rating - a.rating: -1)
            .filter(
              (p) =>
                p.location.formatted_address !== undefined &&
                p.location.address !== undefined,
            )
            .map((place) => (
              <li key={place.fsq_id}>
                <PlaceCard fsq_id={place.fsq_id} />
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default PlacesList;
