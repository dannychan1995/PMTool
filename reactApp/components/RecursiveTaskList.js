import React from 'react';

import {  ListView } from 'react-native';
import { Card,CardItem,Container, Header, Content,Left, Body, Right,Title, Button, Icon, List, ListItem, Text,Form, Item, Input, Label } from 'native-base';
import { CheckBox } from 'react-native-elements';


export class RecursiveTaskList extends React.Component {

  render() {
    return (
      <List
        leftOpenValue={75}
        rightOpenValue={-75}
        dataSource={this.props.data}
        renderRow={data =>
          <ListItem style={{marginLeft:this.props.level * 50}}>
            {/* <TodoCheckBox checked={data.finish} /> */}
            <CheckBox checked={data.finish} />
            <Text> {data.title} </Text>
            {/* {data.subTodo &&
              <RecursiveTaskList data={new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(data.subTodo)} level={this.props.level + 1} />
            } */}
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
		);
  }
}
