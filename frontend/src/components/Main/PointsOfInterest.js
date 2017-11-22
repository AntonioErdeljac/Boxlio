import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class PointsOfInterest extends React.Component{
    render(){


        if(!this.props.nearStoresLoaded){
        const setNearStores = (results) => {
            this.props.onSetNearStores(results)
        };

        const lat = this.props.currentUser.geometry[0];
        const lng = this.props.currentUser.geometry[1];
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500&type=food&key=AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ`;
        console.log(url);
        fetch(url)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                console.log(data.results);
                setNearStores(data.results);
            });
        }
        if(this.props.nearStoresLoaded){
            let counter = 0;
            let img = '';
            return (
                <div className="float-modal-places">
                    <div className="container">
                        <div className="row">
                            {this.props.stores.map((store) => {
                                counter++;
                                if(!store.photos || counter > 3){return null} else {
                                    console.log(counter);


                                    const setOuterVariable = data => {
                                        img = data.url;
                                    };
                                    fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${store.photos[0].photo_reference}&key=AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ`)
                                        .then(function(data){
                                            setOuterVariable(data);
                                        });

                                    console.log(img, 'PHOTO');
                                    return (
                                        <div style={{marginLeft: '70px'}} className="col-4 store">
                                            <div className="card ">
                                                <img src={img} alt=""/>
                                                <div className="card-body">
                                                {store.name}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    positionSet: state.common.positionSet,
    ...state.pointsOfInterest
});

const mapDispatchToProps = dispatch => ({
    onSetNearStores: results =>
        dispatch({type: 'SET_NEAR_STORES', results})
});



export default connect(mapStateToProps, mapDispatchToProps)(PointsOfInterest);


