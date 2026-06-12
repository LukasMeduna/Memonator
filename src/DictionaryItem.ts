export default class DictionaryItem {
  question: string;
  answer: string;
  hasBeenAnsweredWrong: boolean;
  constructor(question: string, answer: string) {
    this.question = question;
    this.answer = answer;
    this.hasBeenAnsweredWrong = false;
  }
}
