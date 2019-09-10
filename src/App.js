import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: '',
      author: '',
      jsonLength: '',
    }
  }

  componentDidMount() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(response => response.json())
    .then((quoteList) => {
      this.setState({
        quoteList: quoteList,
        text: quoteList.quotes[0].quote,
        author: quoteList.quotes[0].author,
        jsonLength: quoteList.quotes.length,
      })
    })
  }

  handleClick = () => {
    console.log('Howdy');
    this.newQuote();
  }

  newQuote = () => {
    const newIndex = Math.floor(Math.random() * Math.floor(this.state.jsonLength));
    this.setState({
      text: this.state.quoteList.quotes[newIndex].quote,
      author: this.state.quoteList.quotes[newIndex].author,
    })
  }

  render() {
    return (
      <div id='background'>
          <div id='quote-box'>
          <p id='text'>{this.state.text}</p>
          <p id='author'>{this.state.author}</p>
          <button id='new-quote' onClick={this.handleClick}>New Quote</button>
          <button id='tweet-quote'></button>
        </div>
      </div>
    )
  }
}

export default App;
