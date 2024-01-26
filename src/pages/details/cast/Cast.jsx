import React from "react";
import { useSelector } from "react-redux";

import "./style.css";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../Images/avatar.png";

const Cast = ({ data, loading }) => {
    // Selecting 'url' from the global state using useSelector hook
    const { url } = useSelector((state) => state.home);

    // Function to render skeleton loader
    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div> {/* Skeleton circle */}
                <div className="row skeleton"></div> {/* Skeleton row */}
                <div className="row2 skeleton"></div> {/* Another skeleton row */}
            </div>
        );
    };

    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div> {/* Section heading */}
                {/* Check if data is not loading */}
                {!loading ? (
                    <div className="listItems"> {/* List of cast members */}
                        {data?.map((item) => {
                            // Determine image URL for each cast member
                            let imgUrl = item.profile_path ? url.profile + item.profile_path : avatar;

                            return (
                                <div key={item.id} className="listItem"> {/* Individual cast member item */}
                                    <div className="profileImg"> {/* Profile image */}
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="name">{item.name}</div> {/* Cast member name */}
                                    <div className="character">{item.character}</div> {/* Character played by the cast member */}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // Render skeleton loader while data is loading
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};


export default Cast;
