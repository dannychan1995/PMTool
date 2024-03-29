import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { ProjectDetailScreen } from '../screens/ProjectDetailScreen';
import { ListView,Modal,TouchableHighlight } from 'react-native';
import { Container, Header, Content,Left, Body, Right,Title, Button, Icon, List, ListItem, Text,Form, Item, Input, Label } from 'native-base';

const datas = [
  'Project Name',
  'Booking system 0001',
  'Project ABCDE',
  'Project Sakho',
  'Project Moreno',
  'Project 1234',
  'Project Allen',
  'Project Coutinho',
];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: datas,
      modalVisible: false,
    };
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
   toggleModal(visible) {
      this.setState({ modalVisible: visible });
   }

  render() {
    return (
      <View style={styles.container}>
        <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon active name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Projects</Title>
            </Body>
            <Right>
              <Button transparent onPress = {() => {this.toggleModal(true)}}>
                <Icon active name="add" />
              </Button>
            </Right>
          </Header>
          <Content>
            <List
              leftOpenValue={75}
              rightOpenValue={-75}
              dataSource={this.ds.cloneWithRows(this.state.listViewData)}
              renderRow={data =>
                <ListItem onPress={() => this.props.navigation.navigate('ProjectDetailScreen', {name: 'Jane'})}>
                  <Text> {data} </Text>
                </ListItem>}
              renderLeftHiddenRow={data =>
                <Button full onPress={() => alert(data)}>
                  <Icon active name="information-circle" />
                </Button>}
              renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                  <Icon active name="trash" />
                </Button>}
            />
          </Content>
        </Container>

        {/* ------modal for create project----------- */}
        <Modal animationType = {"slide"} transparent = {false}
          visible = {this.state.modalVisible}
          onRequestClose = {() => { console.log("Modal has been closed.") } }>
          <View style = {styles.container}>
            <Container>
              <Header>
                <Left>
                  <Button transparent onPress = {() => {
                    this.toggleModal(!this.state.modalVisible)}}>
                    <Icon active name='arrow-back' />
                  </Button>
                </Left>
                <Body>
                  <Title>New Project</Title>
                </Body>
                <Right>
                  <Button transparent onPress = {() => {this.toggleModal(true)}}>
                    <Text>Save</Text>
                  </Button>
                </Right>
              </Header>
              <Content>
                <Form>
                  <Item fixedLabel>
                    <Label>Project Name</Label>
                    <Input />
                  </Item>
                  <Item fixedLabel last>
                    <Label>Description</Label>
                    <Input />
                  </Item>
                </Form>
              </Content>
            </Container>


          </View>
        </Modal>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
