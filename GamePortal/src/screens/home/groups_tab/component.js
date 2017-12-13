import React, {Component} from "react";
import {AsyncStorage, ScrollView, View} from "react-native";
import {List, ListItem} from 'react-native-elements';
import * as firebase from "firebase/index";
import {getGroup} from "../../../util/firebase_groups";

export default class GroupsTabComponent extends Component {

    constructor() {
        super();
        this.firstLoad = true;
    }

    componentWillMount() {
        if (this.firstLoad) {
            AsyncStorage.getItem('userData').then(udJSON => {
                let userData = JSON.parse(udJSON);
                let myUserId = userData.firebaseUserId;

                firebase.database().ref('users/' + myUserId + '/privateButAddable/groups').on('value', value => {

                    this.processGroups(value.val());
                });
            });
        }

        this.firstLoad = false;
    }

    processGroups(groups) {
        const {addGroup} = this.props;

        for (let groupId in groups) {

            if (groups.hasOwnProperty(groupId)) {
                getGroup(groupId).then(response => {
                    let group = {};

                    group.groupId = groupId;
                    group.groupName = response.groupName;
                    group.messages = response.messages === '' ? {} : response.messages;
                    group.createdOn = response.createdOn;
                    group.participants = response.participants === '' ? {} : response.participants;
                    
                    addGroup(group);
                }).catch(error => console.log(error));
            }
        }
    }

    render() {
        const {groups} = this.props;

        return (
            <View>
                <ScrollView>
                    <List>
                        {
                            groups.map((group, index) => (
                                <ListItem
                                    roundAvatar
                                    key={index}
                                    title={group.groupName}
                                    onPress={() => this.goChatting(group)}
                                />
                            ))
                        }
                    </List>
                </ScrollView>
            </View>
        );
    }

    goChatting(group) {
        const {switchChatRoom, switchScreen} = this.props;
        switchChatRoom(group);
        switchScreen('Chat');
    }

}