import React from "react";
import OpinionsList from "./OpinionsList";
import OpinionInput from "./OpinionInput";

const ProfileDiscussion = props => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <hr className="my-3" />
                    <h4 style={{color: 'rgba(0,0,0,.6)'}}>Discussion</h4>
                    <p className="text-muted">Here you can post your opinion on this user</p>
                    <OpinionInput profile={props.profile} />
                </div>
            </div>
            <hr />  
            <div className="row">
                <div className="col">
                    <OpinionsList opinions={props.opinions} profile={props.profile} />  
                </div> 
            </div>
        </div>
    );
}

export default ProfileDiscussion;