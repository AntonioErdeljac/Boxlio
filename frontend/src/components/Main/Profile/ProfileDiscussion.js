import React from "react";

const ProfileDiscussion = props => {
    return (
        <div className="row">
            <div className="col">
                <hr className="my-3" />
                <h4 style={{color: 'rgba(0,0,0,.6)'}}>Discussion</h4>
                <p className="text-muted">Here you can post your opinion on this user</p>
                <textarea className="form-control" rows="3"></textarea>
                <button className="orderbtn btn btn-primary my-3  float-right"
                        style={{backgroundColor: '#2d89e5', borderStyle: 'none'}}>
                    <i className="fa fa-paper-plane"></i> Post opinion
                </button>
            </div>
        </div>
    );
}

export default ProfileDiscussion;