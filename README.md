[Demo](https://server-side-wordle.vercel.app/)

This is an experiment of a Wordle-like clone that validates the user input on the server side (unlike the official Wordle implementation, which is mostly implemented client side) using the Next.js app router and server actions.

This app uses [RazorSh4rk's Random Word API](RazorSh4rk/random-word-api/) to fetch a list of words and determine the word of the day.

This is very much a work in progress/proof of concept and is not yet feature complete. The current implementation is very basic and lacks many features that the official Wordle implementation has, but serves to demonstrate and practice simple server-side validations with Next.js server actions.

### Features missing:

- [ ] User authentication. The official wordle implementation uses cookies and local storage to store the user's progress.
- [ ] A simple "how to play" guide.
- [ ] Multi-language support.
- [ ] Network error handling.
- [ ] Improved state management.
- [ ] Improved animation handling.
