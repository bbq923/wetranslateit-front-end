export class TranslationController {
  constructor ($http, $sce) {
    'ngInject';

    this.$http = $http;
    this.$sce = $sce;
  }

  translate() { // drag한 text를 포함하는 element를 찾아낸다.
    var text = "";
    var element;
    if (window.getSelection) {
      text = window.getSelection().toString();
      element = window.getSelection().anchorNode.parentNode;
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
      element = document.selection.createRange().parentElement();
    }
    // return text;
    element.innerHTML = "번역완료됐엉~"
    console.log(text);
    console.log(element);
  }
}
