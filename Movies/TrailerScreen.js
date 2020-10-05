import React from 'react';
import YouTube from 'react-native-youtube';
import { View } from 'react-native';


export default class TrailerScreen extends React.Component {
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    render() {
        const { route } = this.props;
        const { videoId } = route.params;
        console.log('ID', videoId);
        return (
            <View>
                <YouTube
                    apiKey="AIzaSyBF9sheoGrUvZGaGc6jVnrFL_g_N1sk1ac"
                    videoId={videoId}
                    onError={e => console.log(e)}
                    style={{ alignSelf: 'stretch', height: 300 }}
                    play={true}
                />
            </View>
        );
    }
}
