export class MainController {
  constructor ($http, $sce) {
    'ngInject';

    this.$http = $http;
    this.$sce = $sce;
    this.getPages();
  }

  getPages() {
    var vm = this; // vm = view model
    this.$http.get('http://localhost:5000/api/search').then(function(result) {
      vm.pages = result.data;
    });
  }

  searchByURL() {
    var vm = this;
    this.$http.post('http://localhost:5000/api/search', {src: this.page}).then(function(res){
      vm.message = res.data.message;
      vm.source = res.data.source;
      vm.modifiedUrl = 'http://localhost:5000/api/get/' + res.data.modifiedUrl;
      console.log(vm.message);
      console.log(vm.source);
      console.log(vm.modifiedUrl);
    });
  }

  trustSrc(src) { // iframe을 사용하지 않으면서 필요 없어진 부분
    return this.$sce.trustAsResourceUrl(src);
  }

  trustHtml(str) {
    return this.$sce.trustAsHtml(str);
  }

  saveByURL() {
    this.$http.post('http://localhost:5000/api/save', {src: this.page});
    console.log("src 보내기 성공");
  }

  translate() { // drag한 text를 포함하는 element를 찾아낸다.
    var vm = this;
    var text = "";
    var element;
    if (window.getSelection) {
      element = window.getSelection().anchorNode.parentNode;
      // text = window.getSelection().toString();
      text = window.getSelection().anchorNode.nodeValue;
    } else if (document.selection && document.selection.type != "Control") {
      element = document.selection.createRange().parentElement();
      text = window.getSelection().anchorNode.nodeValue;
      // text = document.selection.createRange().text;
    }
    vm.highlighted = text;
    vm.element = element;
    // return text;
    // element.innerHTML = "번역완료됐엉~"
    console.log(text);
    console.log(element);
  }

  change() {
    console.log(this.trans);
    var path = [];
    var node = this.element;
    console.log(node);
    var previous = node;
    var myself = node.nodeName.toLowerCase();
    var i = 1;
    while( (previous = previous.previousSibling) != null) i++;
    myself += ':nth-child(' + i/2 + ')';
    path.unshift(myself);

    // 나중에 page 로드할 때 로딩 된 page에서 번역 완료된 element들을 찾아 번역을 적용해 주기 위해 unique selector를 얻는 코드
    while (node.nodeName.toLowerCase() != 'html' && (node = node.parentNode)) {
      var name = node.nodeName.toLowerCase();
      if (node.id) {
        name += '#' + node.id;
      } else if (node.className) {
        name += '.' + node.className.replace(/\s+/g, ".");
      } else {
        var index = 0;
        var prev = node;
        while( (prev = prev.previousSibling) != null) index++;
        name += ':nth-child(' + index + ')';
      }
      path.unshift(name);
    }
    path = path.join(" > ");
    console.log('해당 element의 unique selector: ' + path);
    console.log(document.querySelector(path));
    this.element.innerHTML = this.trans;
  }

  show() {
    var vm = this;
    this.$http.post('http://localhost:5000/api/show', {src: this.page}).then(function(res){
      if (res) {
        console.log("html 파일 읽기 성공");
        vm.html = res.data;
      } else {
        console.log("error!!");
      }
    });
  }
  
}




