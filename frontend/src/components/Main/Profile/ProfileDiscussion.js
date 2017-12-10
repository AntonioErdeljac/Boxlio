import React from "react";
import OpinionsList from "./OpinionsList";
import OpinionInput from "./OpinionInput";

const ProfileDiscussion = props => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <div className="row">
                        <div className="col">
                            <h4 className=" my-3" style={{color: 'rgba(0,0,0,.6)'}}>Discussion</h4>
                            {props.currentUser.username !== props.profile.username ?
                            <OpinionInput errors={props.errors} profile={props.profile} /> : null}

                        </div>
                    </div>
                    <hr />  
                    <div className="row">
                        <div className="col">
                            <OpinionsList opinions={props.opinions} profile={props.profile} />  
                        </div> 
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default ProfileDiscussion;