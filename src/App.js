import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      history: [0],
      quoteIndex: 0,
      quotes: '',
      text: '',
      author: '',
      backgroundColor: '#16a085',
      currentFont: 'Arial',
    }
  };


  componentDidMount() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(response => response.json())
    .then((quoteList) => {
      this.setState({
        quotes: quoteList.quotes,
        text: quoteList.quotes[0].quote,
        author: quoteList.quotes[0].author,
        })
    })
  };

  handleClick = () => {
    this.newQuote();
    this.changeBackground();
    this.changeFont();
  };

  handleClickPrev = () => {
    if (this.state.history.length !== 1) {
      this.prevQuote();
      this.changeBackground();
      this.changeFont();
    };
  };

  newQuote = () => {
 
    let newQuoteIndex = this.state.quoteIndex;
    while (this.state.quoteIndex === newQuoteIndex) {
      newQuoteIndex = Math.floor(Math.random() * Math.floor(this.state.quotes.length));
    };

    this.setState({
      history: this.state.history.concat(newQuoteIndex),
      quoteIndex: newQuoteIndex,
      text: this.state.quotes[newQuoteIndex].quote,
      author: this.state.quotes[newQuoteIndex].author,
    }, function() {
        console.log(this.state.history);
        console.log(this.state.quoteIndex, this.state.author);
      }
    );
  };

  prevQuote = () => {

    let newHistory = this.state.history;
    if (newHistory.length > 1) {
      newHistory.pop();
    };

    let newQuoteIndex = newHistory[newHistory.length - 1];
    this.setState({
      history: newHistory,
      quoteIndex: newQuoteIndex,
      text: this.state.quotes[newQuoteIndex].quote,
      author: this.state.quotes[newQuoteIndex].author,
    }, function() {
        console.log(this.state.history);
        console.log(this.state.quoteIndex, this.state.author);
      }
    )
  };

  changeBackground = () => {
    const colors = ['#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
    let randomColor = Math.floor(Math.random() * Math.floor(colors.length));
    while (this.state.backgroundColor === colors[randomColor]) {
      randomColor = Math.floor(Math.random() * Math.floor(colors.length));
    }
    this.setState({
      backgroundColor: colors[randomColor],
    })
  };

  changeFont = () => {
    const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Times', 'Courier New', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Trebuchet MS', 'Arial Black', 'Impact', 'Satisfy'];
    let randomFont = Math.floor(Math.random() * Math.floor(fonts.length));
    while (this.state.currentFont === fonts[randomFont]) {
      randomFont = Math.floor(Math.random() * Math.floor(fonts.length));
    }
    this.setState({
      currentFont: fonts[randomFont],
    })
  };

  render() {
    return (
      <div id='background' style={{backgroundColor: this.state.backgroundColor, transition: 'all 1s',}}>
        <div id='quote-box'>
          <p id='text' style={{color: this.state.backgroundColor, transition: 'all 1s', fontFamily: this.state.currentFont}}>"{this.state.text}"</p>
          <p id='author' style={{color: this.state.backgroundColor, transition: 'all 1s', fontFamily: this.state.currentFont}}>- {this.state.author}</p>
          <div id='buttons'>
            <div id='share-icons'>
              <a id="tweet-quote" title="Tweet this quote!" href='https://twitter.com/intent/tweet?text=' target='_blank' rel="noopener noreferrer" style={{backgroundColor: this.state.backgroundColor, transition: 'all 1s',}}>
                <FontAwesomeIcon id='tweet-icon' icon={faTwitter} />
              </a>
              <a id="facebook-quote" title="Share on FaceBook!" href='https://www.facebook.com/sharer/sharer.php?u=#url' target='_blank' rel="noopener noreferrer" style={{backgroundColor: this.state.backgroundColor, transition: 'all 1s',}}>
                <FontAwesomeIcon id='facebook-icon' icon={faFacebookF} />
              </a>
            </div>
            <div id='previous-new'>
              <button id='prev-quote' title='Previous Quote' style={{backgroundColor: this.state.backgroundColor, transition: 'all 1s',}} onClick={this.handleClickPrev}><FontAwesomeIcon id='back-arrow' icon={faArrowLeft} /></button>
              <button id='new-quote' style={{backgroundColor: this.state.backgroundColor, transition: 'all 1s',}} onClick={this.handleClick}>New Quote</button>
            </div>
          </div>
        </div>
        <footer>by Rob Young</footer>
      </div>
    )
  };

}

export default App;
