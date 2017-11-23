import React from "react";

const Errors = props => {
    if(props.errors){

        const {errors} = props;
        return (
            <ul className="list-group my-3">
                {
                    Object.keys(errors).map(key => {
                        return (
                            <li className="list-group-item list-group-item-danger">{key[0].toUpperCase()}{key.slice(1)} {errors[key]}</li>
                        )
                    })
                }
            </ul>
        );
    }
    return null;
};

export default Errors;