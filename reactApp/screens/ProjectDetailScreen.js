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
import { RecursiveTaskList } from '../components/RecursiveTaskList'
import { Card,CardItem,Container, Header, Content,Left, Body, Right,Title, Button, Icon, List, ListItem, Text,Form, Item, Input, Label } from 'native-base';
import { CheckBox } from 'react-native-elements';
import * as Progress from 'react-native-progress';

const mockPJ = {
  title:"Booking System 0001",
  description:"This is Booking System 0001 description. This is Booking System 0001 description. This is Booking System 0001 description. This is Booking System 0001 description. This is Booking System 0001 description. This is Booking System 0001 description. ",
  todo: [
    {
      title: "brainstorm idea",
      finish: true,
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
    const newData = [...this.state.project.todo];
    newData.splice(rowId, 1);
    this.setState({ project: newData });
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
                <Text style={styles.pjHeader}>
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
            {/* <List
              leftOpenValue={75}
              rightOpenValue={-75}
              dataSource={this.ds.cloneWithRows(this.state.project.todo)}
              renderRow={data =>
                <ListItem >
              {/* <TodoCheckBox checked={data.finish} />
              <CheckBox checked={data.finish} />
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
            /> */}
            <RecursiveTaskList data={this.ds.cloneWithRows(this.state.project.todo)} level={0} />
          </Content>
        </Container>

        {/* ------modal for create task----------- */}
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
                  <Title>New Task</Title>
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
                    <Label>Task Name</Label>
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
  pjHeader: {
    marginLeft: 20,
  },
});
