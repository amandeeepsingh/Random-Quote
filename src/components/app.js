import React, { Component } from 'react';
import axios from 'axios';

// Material-UI
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {lightBlue800} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Autorenew from 'material-ui/svg-icons/action/autorenew';
import Share from 'material-ui/svg-icons/social/share';
import Avatar from 'material-ui/Avatar';

// MUI Theme for Material-UI
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightBlue800,
  },
  appBar: {
    height: 70,
  },
});

class RandomQuote extends Component {
  constructor() {
    super();
    this.state={
      quote: "",
      quoteBy: "",
      randNum: 1,
      twitterURL: "https://twitter.com/intent/tweet?text=",
      tweetURL: ""
    };
  }

  getNewQuote = () => {
    axios.get(`http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40`)
        .then(response => {
            this.setState({
              quote: response.data[this.state.randNum].content,
              quoteBy: response.data[this.state.randNum].title,
            });

            var elem = document.createElement('textarea');
            elem.innerHTML = this.state.quote;
            var rawQuote = elem.value.replace(/<(?:.|\n)*?>/gm, '');;
            this.setState({
              tweetURL: `${this.state.twitterURL}` + encodeURIComponent(`${rawQuote}-${this.state.quoteBy}`),
            });
            this.state.randNum = Math.floor(Math.random()*(39)+1);
        })
        .catch(error => {
            console.log('Error fetching and parsing data...', error);
        });
  }

  updateQuote = () => {
    this.getNewQuote();
  }

  componentDidMount() {
    this.getNewQuote();
  }

  // Used for Material-UI
  static childContextTypes = {muiTheme: React.PropTypes.object}
  getChildContext(){return {muiTheme: getMuiTheme()}}


  render() {
    return (
      <div className="container-fluid">

        <div className="QuoteContainer">
          <Paper className="quotePaper" zDepth={5} >
          <AppBar
            title={<span >Random Quotes</span>}
            className="AppBar"
            iconElementLeft={<a href={this.state.tweetURL} target="_blank"><img className="twitterLogo" src="twitter.png" /></a>}
            iconElementRight={<IconButton><Autorenew /></IconButton>}
            onRightIconButtonTouchTap={this.updateQuote}
          />
            <div className="quoteText" dangerouslySetInnerHTML={{__html: this.state.quote}} />
            <div className="quoteTitle" dangerouslySetInnerHTML={{__html: this.state.quoteBy}} />
          </Paper>
        </div>

        <div className="Footer">
          ©️ Amandeep Singh ・ Internet Programming ・ CCNY
        </div>
      </div>
    );
  }
}

export default RandomQuote;
