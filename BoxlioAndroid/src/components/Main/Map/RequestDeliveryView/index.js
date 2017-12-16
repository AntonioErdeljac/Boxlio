import React from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import {Container, Content} from "native-base";
import SearchPlacesFrom from "../SearchPlacesFrom";
import LocationChooserTo from "../LocationChooser/LocationChooserTo";
import DeliveryGuyProfit from "../DeliveryGuyProfit";
import TransportationType from "../TransportationType";
import ShortMessage from "../ShortMessage";
import SearchPlacesTo from "../SearchPlacesTo";
import LocationChooser from "../LocationChooser";

class RequestDeliveryView extends React.Component{
    render(){
        return (
            <View style={styles.searchTo}>
                <SearchPlacesFrom />
                {this.props.placeFromChoosen ?
                    <SearchPlacesTo/>
                    : null}
                <LocationChooser />
                <LocationChooserTo />
                {this.props.placeFromChoosen && this.props.placeToChoosen ? <TransportationType /> : null}
                {this.props.placeFromChoosen && this.props.placeToChoosen && this.props.transportation !== '' && this.props.transportation !== null ? <DeliveryGuyProfit /> : null}
                {this.props.placeFromChoosen && this.props.placeToChoosen && this.props.transportation !== '' && this.props.transportation !== null && this.props.price ? <ShortMessage /> : null}
                {this.props.placeFromChoosen && this.props.placeToChoosen && this.props.transportation !== '' && this.props.transportation !== null && this.props.price && this.props.item ? <SendRequestButton handleSendRequest={this.props.handleSendRequest}/> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: Dimensions.get('window').width-100,
        marginRight: 30,
        backgroundColor: 'transparent',
        fontSize: 14,
        fontFamily: 'VarelaRound-Regular',
        color: 'rgba(0,0,0,.5)',
        zIndex: 1001,
        height: 200
    },
    iconTo:{
        color: '#2d89e5',
        fontSize: 15
    },
    searchTo: {
        zIndex: 1000,
        height: Dimensions.get('window').height-150 ,
        width: Dimensions.get('window').width-30,
        position: 'absolute',
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default RequestDeliveryView;