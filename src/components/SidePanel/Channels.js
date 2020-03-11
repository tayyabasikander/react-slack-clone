import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';

class Channels extends React.Component {
    state = {
        user: this.props.currentUser,
        channels: [],
        modal: false,
        channelName: '',
        channelDetails: '',
        channelref: firebase.database().ref('channels'),
    }
    openModal = () => {
        this.setState({ modal: true });
    }
    closeModal = () => {
        this.setState({ modal: false });
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.addChannel();
        }
    }

    componentDidMount() {
        this.addListeners();
    }
    addListeners = () => {
        let loadedChannels = []
        this.state.channelref.on('child_added', snap => {
            loadedChannels.push(snap.val());
            this.setState({ channels: loadedChannels })
            console.log("channels are", this.state.channels)
        })
    }
    changeChannel=channel =>{
        this.props.setCurrentChannel(channel)
    }
    displayChannels = channels => (
        channels.length > 0 && channels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => console.log("This Channel is",channel)}
                name={channel.name}
                style={{ opacity: 0.7 }}
            >
                #{channel.name}
            </Menu.Item>
        ))
    )

    addChannel = () => {
        const
            { channelref, channelName, channelDetails, user } = this.state;
        const key = channelref.push().key;
        console.log("key is", key)
        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        };
        channelref.child(key).update(newChannel)
            .then(() => {

                this.setState({ channelName: '', channelDetails: '' })
                this.closeModal();
                console.log("channel added")
            })
            .catch(err => {
                console.log(err);
            })
    }
    isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails;

    render() {
        // console.log("channel name is",this.channelName)
        const { channels, modal } = this.state;
        return (
            <React.Fragment>
                <Menu.Menu style={{ paddingBottom: 2 }}>
                    <Menu.Item>
                        <span>
                            <Icon name="exchange" />CHANNELS
                    </span>{' '}
                    ({channels.length})<Icon name="add" onClick={this.openModal} />
                    </Menu.Item>
                    {this.displayChannels(channels)}

                    {/* channels */}
                </Menu.Menu>
                {/* Add Channel Modal */}
                <Modal basic open={modal} onClose={this.closeModal}>
                    <Modal.Header>Add a channel</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="About the Channel"
                                    name="channelName"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Name Of Channel"
                                    name="channelDetails"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" inverted onClick={this.handleSubmit}>
                            <Icon name="checkmark" />Add
                    </Button>
                        <Button color="red" inverted onClick={this.closeModal}>
                            <Icon name="remove" />Cancel
                    </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>

        );
    }
}
export default Channels
