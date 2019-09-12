import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      quotes: '',
      text: '',
      author: '',
      backgroundColor: '#16a085',
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
  }

  handleClick = () => {
    console.log('Howdy');
    this.newQuote();
    this.changeBackground();
  }

  newQuote = () => {
    const newIndex = Math.floor(Math.random() * Math.floor(this.state.quotes.length));
    this.setState({
      text: this.state.quotes[newIndex].quote,
      author: this.state.quotes[newIndex].author,
    });
  }

  changeBackground = () => {
    const colors = ['#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
    const randomColor = Math.floor(Math.random() * Math.floor(colors.length));
    this.setState({
      backgroundColor: colors[randomColor],
    })
  }

  render() {
    return (
      <div id='background' style={{backgroundColor: this.state.backgroundColor, transition: 'all 1s',}}>
        <div id='quote-box'>
          <p id='text' style={{color: this.state.backgroundColor, transition: 'all 1s',}}>"{this.state.text}"</p>
          <p id='author' style={{color: this.state.backgroundColor, transition: 'all 1s',}}>- {this.state.author}</p>
          <div id='buttons'>
            <button id='tweet-quote' style={{backgroundColor: this.state.backgroundColor, transition: 'all 1s',}}></button>
            <button id='new-quote' style={{backgroundColor: this.state.backgroundColor, transition: 'all 1s',}} onClick={this.handleClick}>New Quote</button>
          </div>
        </div>
      </div>
    )
  }

}

export default App;
