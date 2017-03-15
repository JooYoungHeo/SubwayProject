import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';

const styles = StyleSheet.create({
  description: {
      marginBottom: 20,
      fontSize: 18,
      textAlign: 'center',
      color: '#656565'
  },
  container: {
      padding: 30,
      marginTop: 65,
      alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48bbec',
    borderColor: '#48bbec',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    borderWidth: 1,
    borderColor: '#48bbec',
    borderRadius: 8,
    color: '#48bbec'
  },
  image: {
    width: 217,
    height: 138
  }
});

function urlForQueryAndPage(key, value, pageNumber){
  var data = {
    country: 'uk',
    pretty: '1',
    encoding: 'json',
    listing_type: 'buy',
    action: 'search_listings',
    page: pageNumber
  };

  data[key] = value;

  var querystring = Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&');

  return 'http://api.nestoria.co.uk/api?' + querystring;
};

class SearchPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchString: 'london',
      isLoading: false,
      message: ''
    }
  }

  onSearchTextChanged(e){
    this.setState({
      searchString: e.nativeEvent.text
    });
    console.log(this.state.searchString);
  }

  _executeQuery(query){
    console.log(query);
    this.setState({
      isLoading: true
    });
    fetch(query).then(response => response.json()).then(json => this._handleResponse(json.response))
      .catch(error => this.setState({
        isLoading: false,
        message: 'Something bad happened ' + error
      }));
  }

  onSearchPressed(){
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }

  _handleResponse(response){
    this.setState({
      isLoading: false,
      message: ''
    });
    if(response.application_response_code.substr(0, 1) === '1'){
      console.log('Properties found: ' + response.listings.length);
    } else {
      this.setState({
        message: 'Location not recognized; please try again.'
      });
    }
  }

  render(){
    var spinner = this.state.isLoading? <ActivityIndicator size='large'/>: <View/>;
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='Search via name or postcode'/>
          <TouchableHighlight style={styles.button} underlayColor="#99d9f4" onPress={this.onSearchPressed.bind(this)}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.flowRight}>
          <TouchableHighlight style={styles.button} underlayColor="#99d9f4">
            <Text style={styles.buttonText}>Location</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.description}>{this.state.message}</Text>
        <Image source={{uri: 'https://dsh602wr9lxr7.cloudfront.net/suzy.jpg'}} style={styles.image} />
        {spinner}
      </View>
    );
  }
}

export default SearchPage;