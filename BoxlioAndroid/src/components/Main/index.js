import React from "react";
import {Container} from "native-base";
import {Text} from "react-native";
import { Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';


class Main extends React.Component{
	render(){
		return (
			<Container>
			<Content />
				<Footer>
          <FooterTab style={{backgroundColor: '#1fcf7c'}}>
            <Button style={{backgroundColor: '#1fcf7c'}}>
              <Icon style={{color: '#fff'}} name="globe" />
            </Button>
            <Button style={{backgroundColor: '#1fcf7c'}}>
              <Icon style={{color: '#fff'}} name="ios-compass-outline" />
            </Button>
            <Button style={{backgroundColor: '#1fcf7c'}}>
              <Icon style={{color: '#fff'}} name="person" />
            </Button>
          </FooterTab>
        </Footer>
			</Container>
		);
	}
}

const style = {

}

export default Main;