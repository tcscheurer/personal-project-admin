import React, {Component} from 'react'
import {Launcher} from 'react-chat-window';
import axios from 'axios';

import io from 'socket.io-client';



 
class MessageWindow extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      endpoint: 'http://localhost:5000',
      boolean: true
    };
    
    
  }

  componentDidMount(){
    const chatButton = document.getElementsByClassName("sc-closed-icon")
    const chatButton2 = document.getElementsByClassName("sc-header--close-button")
    chatButton[0].addEventListener('click', ()  => this.props.handleZ())
    chatButton2[0].addEventListener('click', ()  => this.props.handleZ())
    const phone = this.props.phone;
    axios.get(`/api/messages/${phone}`).then(response=>{
        let unfiltered = response.data;
        let actual = [];
        for(let i=0;i<unfiltered.length;i++){
            if(unfiltered[i].type==='toEmpl'){
                actual[i] = {
                    author: 'me',
                    type: 'text',
                    data: {text: unfiltered[i].body}
                }
            } else {
                actual[i] = {
                    author: 'them',
                    type: 'text',
                    data: {text: unfiltered[i].body}
                }
            }
        }
        this.setState({
            messageList: actual
        })
    }).catch(err=>console.log(err))
    const {endpoint} = this.state;
    const socket = io(endpoint);
    socket.on('MessagesChange',()=>{
        axios.get(`/api/messages/${phone}`).then(response=>{
            let unfiltered = response.data;
            let actual = [];
            for(let i=0;i<unfiltered.length;i++){
                if(unfiltered[i].type==='toEmpl'){
                    actual[i] = {
                        author: 'me',
                        type: 'text',
                        data: {text: unfiltered[i].body}
                    }
                } else {
                    actual[i] = {
                        author: 'them',
                        type: 'text',
                        data: {text: unfiltered[i].body}
                    }
                }
            }
            this.setState({
                messageList: actual
            })
        }).catch(err=>console.log(err))
    })
    }

    componentWillReceiveProps(nextProps){
        if(this.props!==nextProps){
            const phone = nextProps.phone;
            axios.get(`/api/messages/${phone}`).then(response=>{
                let unfiltered = response.data;
                let actual = [];
                for(let i=0;i<unfiltered.length;i++){
                    if(unfiltered[i].type==='toEmpl'){
                        actual[i] = {
                            author: 'me',
                            type: 'text',
                            data: {text: unfiltered[i].body}
                        }
                    } else {
                        actual[i] = {
                            author: 'them',
                            type: 'text',
                            data: {text: unfiltered[i].body}
                        }
                    }
                }
                this.setState({
                    messageList: actual
                })
            }).catch(err=>console.log(err))
        }
    }
 
  _onMessageWasSent(message) {
      // Gotta handle posting of message to DB, Probably through an action creator
      
    this.setState({
      messageList: [...this.state.messageList, message]
    })
    const obj = {
        phone: this.props.phone,
        body: message.data.text
    }
    axios.post('/api/message/user',obj).then(response=>{
        console.log(response)
    }).catch(err=>console.log(err))

    const {endpoint} = this.state;
    const socket = io(endpoint);
    socket.emit('MessagesChange');
  }

 
  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }

 
 
  render() {
      
      
    return (<div>
      <Launcher
        agentProfile={{
          teamName: this.props.userNameToDisplay
          
        }}
        
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji={false}
      />
    </div>)
  }
}

export default MessageWindow;

// Props to send in
//Parent: userNameToDisplay
//Ducks: messages...

