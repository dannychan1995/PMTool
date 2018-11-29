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
import {  ListView,Modal,TouchableHighlight } from 'react-native';
import { TodoCheckBox } from '../components/TodoCheckBox'
import { Card,CardItem,Container, Header, Content,Left, Body, Right,Title, Button, Icon, List, ListItem, Text,Form, Item, Input, Label } from 'native-base';
import * as Progress from 'react-native-progress';

const mockPJ = {
  title:"backtest",
  description:"this is back test idea 7, tasfasmd asd asd.his is back test idea 7, tasfasmd asd asd.his is back test idea 7, tasfasmd asd asd.his is back test idea 7, tasfasmd asd asd.his is back test idea 7, tasfasmd asd asd.his is back test idea 7, tasfasmd asd asd.his is back test idea 7, tasfasmd asd asd.",
  todo: [
    {
      title: "brainstorm idea",
      finish: false,
      subTodo: [
        {
          title: "sub 1",
          finish: true,
          subTodo: [
            {
              title: "sub sub1",
              finish: true,
            },
            {
              title: "sub sub2",
              finish: true,
            },
            {
              title: "sub sub3",
              finish: true,
            }
          ]
        },
        {
          title: "sub2",
          finish: true,
        },
        {
          title: "sub3",
          finish: false,
        }
      ]
    },
    {
      title: "Implement",
      finish: false,
    },
    {
      title: "Test",
      finish: false,
    }
  ]
};


export default class ProjectDetailScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };


  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    console.log(this.calSubTodoPercentage(mockPJ.todo))
    this.state = {
      basic: true,
      project: mockPJ,
      modalVisible: false,
      progress: 0,
    };

  }
  calSubTodoPercentage(subTodo){
    // console.log(subTodo);
    let total = 0;
    let finish = 0;
    for(todo of subTodo){
      total += 1;
      if(todo.subTodo && todo.subTodo.length > 0){
        finish += this.calSubTodoPercentage(todo.subTodo);
      } else {
        finish += todo.finish? 1: 0;
      }
    }
    return total===0? 0 :finish / total;

  };
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
   toggleModal(visible) {
      this.setState({ modalVisible: visible });
   }
   componentDidMount() {
    this.animate();
  }

  animate() {
    let progress = 0;
    this.setState({ progress });
    progress = this.calSubTodoPercentage(mockPJ.todo);

    setTimeout(() => {
      this.setState({ progress });
    }, 100);

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
              <Title>Detail</Title>
            </Body>
            <Right>
              <Button transparent onPress = {() => {this.toggleModal(true)}}>
                <Icon active name="add" />
              </Button>
            </Right>
          </Header>
          <Content>
            <Card>
              <CardItem hader>
                <Progress.Circle showsText animated textStyle ={{fontSize: 15}} progress={this.state.progress} size={50} />
                <Text>
                  {this.state.project.title}
                </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    {this.state.project.description}
                  </Text>
                </Body>
              </CardItem>
            </Card>
            <List
              leftOpenValue={75}
              rightOpenValue={-75}
              dataSource={this.ds.cloneWithRows(this.state.project.todo)}
              renderRow={data =>
                <ListItem>
                  <TodoCheckBox checked={data.finish} />
                  <Text> {data.title} </Text>
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
        {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
          source={
          __DEV__
          ? require('../assets/images/robot-dev.png')
          : require('../assets/images/robot-prod.png')
          }
          style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening123</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
          <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
          Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
          <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>

          <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View> */}
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
