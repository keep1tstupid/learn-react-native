import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    View,
    Text,
    Image,
    StatusBar,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

class MovieListItem extends React.Component {
    render() {
        let IMAGE_PATH = 'http://image.tmdb.org/t/p/w500';
        let imageUrl = IMAGE_PATH + this.props.movie.poster_path;

        return (
            <View style={styles.movieItem}>
                <View style={styles.movieItemImage}>
                    <Image source={{uri: imageUrl}} style={{width: 99, height: 146}} />
                </View>
                <View style={{marginRight: 50}}>
                    <Text style={styles.movieItemTitle}>{this.props.movie.title}</Text>
                    <Text style={styles.movieItemText}>
                        {this.props.movie.release_date}
                    </Text>
                    <Text
                        numberOfLines={6}
                        ellipsizeMode="tail"
                        style={styles.movieItemText}>
                        {this.props.movie.overview}
                    </Text>
                </View>
            </View>
        );
    }
}

class MoviesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {movies: null};
    }

    async getMovies() {
        let API_KEY = 'ca272628df2d340d747729d79154457c';
        let BASE_URL = 'https://api.themoviedb.org/3/movie/now_playing';
        let url = BASE_URL + '?api_key=' + API_KEY;
        let response = await fetch(url);
        let data = await response.json();
        this.setState({movies: data.results});
    }

    // ?? what for you are here ??
    componentDidMount() {
        this.getMovies();
    }

    itemPressed = (index) => {
        this.props.navigation.navigate(
            'MovieDetails',
            { movie: this.state.movies[index] }
        );
    }

    render() {
        if (this.state.movies == null) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <Text>Loading, please wait...</Text>
                </View>
            );
        }
        const items = this.state.movies.map(function (movie, index) {
            return (
                <TouchableHighlight onPress={_ => this.itemPressed(index)}
                                    underlayColor="lightgray" key={index}>
                    <MovieListItem movie={movie} key={index}/>
                </TouchableHighlight>
            )
        }.bind(this));
        return <ScrollView>{items}</ScrollView>;
    }
}

const MovieListScreen = ({ navigation }) => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <MoviesList navigation={ navigation }/>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    movieItem: {
        margin: 5,
        flex: 1,
        flexDirection: 'row',
    },
    movieItemImage: {
        marginRight: 5,
    },
    movieItemTitle: {
        fontWeight: 'bold',
    },
    movieItemText: {
        flexWrap: 'wrap',
    },
});

export default MovieListScreen;
