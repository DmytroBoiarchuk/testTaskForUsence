
import classes from "./PlaceCard.module.scss";
import { PlaceDataInterface } from "../../../../interfaces/interfaces.ts";
import { useQuery } from "@tanstack/react-query";
import { getPlaceInfo } from "../../../../Functions/requests/getPlaceInfo.ts";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { useContext, useState } from "react";
import loadingSpinner from "../../../../assets/spinner-loading-dots.svg";
import { MdOutlineQuestionMark } from "react-icons/md";
import Gallery from "../../../Galery/Gallery.tsx";
import PlaceTips from "./Components/PlaceTips/PlaceTips.tsx";
import { WishListContext } from "../../../../store/wishListContext.tsx";
import { motion } from "motion/react";
import Error from "../../../Error/Error.tsx";

//set size of mini-icon of place
const sizeOfIcon: string = "64";

const PlaceCard = ({ fsq_id }: { fsq_id: string }): JSX.Element => {
    //check if card was saved
    const wishListCtx = useContext(WishListContext);
    const wasSaved: boolean = wishListCtx.storedArray.some(
        (savedPlace: string) => savedPlace === fsq_id,
    );
    const [isSaved, setIsSaved] = useState<boolean>(wasSaved);
    //toggle tips
    const [isTipsShown, setIsTipsShown] = useState<boolean>(false);
    function showTipsHandler() {
        setIsTipsShown((prevState) => !prevState);
    }
    //save to localStorage /through the context, to update list of saved places after deleting them
    function onSaveHandler(save: boolean) {
        if (save) wishListCtx.setPlace(fsq_id);
        else wishListCtx.removePlace(fsq_id);
        setIsSaved(save);
    }
    //fetch place data
    const { data, isPending, error, isError } = useQuery<PlaceDataInterface>({
        queryKey: ["search", fsq_id],
        queryFn: () => getPlaceInfo(fsq_id),
        staleTime: Infinity,
        gcTime: 10 * 60 * 1000,
        retry: false,
    });
    return (
        <>
            <motion.div layout='position' className={classes.cardExpanded}>
                <div
                    className={
                        !isPending
                            ? classes.card
                            : `${classes.card} ${classes.cardInPending}`
                    }
                >
                    {isPending && (
                        <img
                            className={classes.loading}
                            src={loadingSpinner}
                            alt="spiner"
                        />
                    )}
                    {!isPending && (
                        <>
                            {data?.categories[0] !== undefined ? (
                                <img
                                    className={classes.icon}
                                    src={`${data?.categories[0].icon.prefix}${sizeOfIcon}${data?.categories[0].icon.suffix}`}
                                    alt="ICON"
                                />
                            ) : (
                                <MdOutlineQuestionMark size="45px" />
                            )}
                            <div className={classes.photoContainer}>
                                <Gallery photos={data!.photos} alt="place-photo" />
                            </div>
                            <div className={classes.infoWrapper}>
                                <h1>
                                    {data?.name}
                                    {data?.rating && (
                                        <span className={classes.rating}>({data.rating}/10)</span>
                                    )}
                                </h1>

                                {data?.description && (
                                    <p className={classes.description}>{data?.description}</p>
                                )}
                                <div className={classes.location}>
                                    <CiLocationOn />
                                    <p>
                                        {data?.location.address ?? data?.location.formatted_address}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                    {!isPending && !isSaved && (
                        <button
                            onClick={() => onSaveHandler(true)}
                            className={classes.savedSign}
                        >
                            <FaRegHeart />
                        </button>
                    )}
                    {!isPending && isSaved && (
                        <button
                            onClick={() => onSaveHandler(false)}
                            className={classes.savedSign}
                        >
                            <FaHeart />
                        </button>
                    )}
                    {data?.tips && data?.tips.length > 0 && (
                        <button
                            onClick={showTipsHandler}
                            className={classes.showTipsButton}
                        >
                            <span>Show Tips</span>
                        </button>
                    )}
                </div>
                <PlaceTips isTipsShown={isTipsShown} tips={data?.tips} />
            </motion.div>
            {isError && <Error error={error} />}
        </>
    );
};

export default PlaceCard;
