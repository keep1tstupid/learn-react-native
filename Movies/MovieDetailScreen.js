import React from 'react';
import {Text, SafeAreaView, Image, StyleSheet, TouchableHighlight, ScrollView} from 'react-native';


export default class MovieDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: null,
            trailers: null,
        };
    }

    async getMovieInfo(id) {
        let API_KEY = 'ca272628df2d340d747729d79154457c';
        let BASE_URL = 'https://api.themoviedb.org/3/movie/' + id;
        let url = BASE_URL + '?api_key=' + API_KEY + '&append_to_response=videos';
        let response = await fetch(url);
        let data = await response.json();
        //console.log('data', data);
        this.setState({details: data});
    }

    async getMovieTrailer(id) {
        let API_KEY = 'ca272628df2d340d747729d79154457c';
        let BASE_URL = 'https://api.themoviedb.org/3/movie/' + id;
        let url = BASE_URL + '/videos?api_key=' + API_KEY;
        let response = await fetch(url);
        let data = await response.json();
        console.log('trailers', data);
        this.setState({trailers: data});
    }

    componentDidMount() {
        const { route } = this.props;
        const { movie } = route.params;
        this.getMovieInfo(movie.id);
        this.getMovieTrailer(movie.id);
    }

    linkPressed = (videoId) => {
        this.props.navigation.navigate(
            'TrailerScreen',
            { videoId, }
        );
    }

    render() {
        if (this.state.details === null ||this.state.trailers === null) {
            return null;
        }

        const { route } = this.props;
        const { movie } = route.params;
        const { details, trailers } = this.state;

        let IMAGE_PATH = 'http://image.tmdb.org/t/p/w500';
        let imageUrl = IMAGE_PATH + movie.backdrop_path;

        return (
            <SafeAreaView>
                <Image source={{uri: imageUrl}} style={styles.image}  />
                <Text style={styles.title}> {movie.title} </Text>
                <Text style={styles.text}> {movie.release_date} </Text>
                <Text style={styles.text}> {movie.overview} </Text>
                <Text style={styles.text}> Genres: {details.genres.map(item => item.name + ' ')} </Text>
                <Text style={styles.text}> Runtime: {details.runtime} min </Text>
                <Text style={styles.text}> Homepage: {details.homepage} </Text>
                <Text style={styles.text}> Videos: </Text>
                {trailers.results.map((item, idx) => (
                    <Text
                        key={item.name + idx}
                        style={styles.link}
                        onPress={() => this.linkPressed(item.key)}>

                        {item.name}

                    </Text>
                ))}


            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        aspectRatio: 670/250,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        margin: 5,
    },
    text: {
        fontSize: 12,
        flexWrap: 'wrap',
        margin: 5,
    },
    link: {
        fontSize: 13,
        color: 'blue',
        margin: 5,
    },
});
