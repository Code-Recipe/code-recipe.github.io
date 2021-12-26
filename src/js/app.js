
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import $ from 'jquery';
window.$ = $;

import { converter } from 'utils/converter';
window.converter = converter;

import Vue from 'vue';
window.Vue = Vue;

import axios from 'axios';
//window.axios = axios; // For testing purposes
Vue.prototype.$http = axios;
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

import '../sass/app.scss';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import courseUtils from 'utils/courseUtils';
window.courseUtils = courseUtils;
import urljoin from 'url-join';
window.urljoin = urljoin;


window.noXCSRF = true; // to prevent OPTIONS pre-flight which causes permission error
var url = location.href;

var hash = location.hash.substring(1).split("/");

var repoName = hash[0] || "Java_Beginning";
var repoURL = url.substring(0, url.indexOf("/", 8)) + "/" + repoName;
var srcURL = "https://github.com/Code-Recipe/" + repoName;

var display_chapter_index = parseInt(hash[1]) || 0;

const srcContentURL = courseUtils.getSrcUrl(repoURL, "content.json");
console.log(srcContentURL);
$.ajax({
  url: srcContentURL,
  success: (data) => {
    var contents = data;
    window.contents = contents;
    main(contents);
  },
  error: (data) => {
    alert("Error:", data.statusText);
  }
});


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(BootstrapVue);

// Components
import Navbar from 'components/Navbar';
import Contents from 'components/Contents';

// Pages
import HomeGuest from 'pages/HomeGuest';
import Learn from 'pages/Learn';


function main(contents) {
  window.vueData = {
    // author: 0,
    course: {
      course_name: repoName,
      content: contents
    },
    displayChapterIndex: display_chapter_index,
    srcURL: srcURL,
    repoURL: repoURL,
  };
  window.vueMethods = {
    onContentLoaded: function (v) {
      this.$refs.contents.$emit('content-loaded');
    },
  }
  const chapterName = (contents.chapters[display_chapter_index] ? contents.chapters[display_chapter_index].name : contents.name) || "Learn";
  if (document.getElementById("app")) {
    document.title = `${chapterName} - Code Recipe 程谱`;
    const app = new Vue({
        el: '#app',
        data() {
          return window.vueData;
          // so we can use additional-content to pass in data (and the data is shared)
        },
        methods: window.vueMethods,
        mounted: window.mounted || (()=>{}),
        components: {
          Navbar,
          Learn,
          Contents,
          HomeGuest
        }
    });
  
    // window.app = app;
    // For testing
  } else {
    window.prerenderReady = true;
  }
}

window.renderElements = (renderedElements, course = {}) => {
  let radioSetNum = 0;
  $("notice").remove();
  $("cr").each((k,v)=>{
    if(renderedElements.includes(v)){
      return; // don't override rendered elements
    }
    let elm = $(v);
    let parameters = elm.attr("parameters");
    parameters = parameters?parameters:"";
    console.log(parameters);
    switch(elm.attr("type")) {
      case "hidden":
        elm.hide();
        $(`<p class='click-to-show'>${parameters?parameters:'点击查看隐藏内容'}</p>`).insertBefore(elm).click(function(){ // We need this
          elm.show();
          $(this).hide();
        });
      break;
      case "player":
        elm.html(`<iframe height=498 width=510 src='https://player.youku.com/embed/${parameters}' 'allowfullscreen'></iframe>`);
      break;
      case "video":
        elm.html(`<video controls style="min-height:498px; width:100%">
            <source src="/${parameters}" type="video/mp4">
          </video>`);
      break;
      case "input":
        parameters = JSON.parse(parameters);
        elm.html(`<p class="question-title">${parameters[0]}</p><textarea class="input form-control" placeholder="${parameters[1]}"></textarea>`);
        $(`<p style="padding-top:5px;"><button class='btn btn-primary'>${parameters[2]}</button></p>`).insertAfter(elm).click(function(){ // We need this
          $(this).text(parameters[3]);
        });
      break;
      case "hidden-btn": // Button style hidden content
        elm.hide();
        $(`<button class='btn btn-primary'>${parameters?parameters:'点击查看隐藏内容'}</button>`).insertBefore(elm).click(function(){ // We need this
          elm.show();
          $(this).hide();
        });
      break;
      case "select":
        let answers = JSON.parse(parameters);
        let chooseHTML = `<p class="question-title">${answers[0]}</p>`;
        radioSetNum++;
        for(let i = 0; i < answers.length-2; i++) {
          chooseHTML += `<p><div class="custom-control custom-radio">
          <input type="radio" id="radio-${radioSetNum}-${i}" name="radio-set-${radioSetNum}" class="custom-control-input" value="${i}">
          <label class="custom-control-label" for="radio-${radioSetNum}-${i}">${answers[i+1]}</label>
        </div></p>`;
        }
        chooseHTML += `<p><button class='btn btn-primary' id="check-answer-${radioSetNum}">点击查看答案</button></p>`;
        elm.html(chooseHTML);
        $(`#check-answer-${radioSetNum}`).click(function(){
          let answer = $(`input[name=radio-set-${radioSetNum}]:checked`).val();
          if (answer) {
            if (answer == answers[answers.length-1]) {
              $(this).text(`答案正确`);
            } else {
              $(this).text(`答案为${answers[answers[answers.length-1]+1][0]}`);
            }
          }
        });
      break;
    }
    renderedElements.push(v);
  });
  $("lab").each((k,v)=>{
    if(renderedElements.includes(v)){
      return; // don't override rendered elements
    }
    let code = $(v).text().trim();
    if(code) {
      console.log("Code", code);
    }
    let lang = $(v).attr("lang");
    let parameters = $(v).attr("parameters");
    parameters = parameters?parameters:"";
    lang = lang?lang:"";
    
    code = code.replace(/&gt;/g,">")
      .replace(/&lt;/g,"<")
      .replace(/&amp;/g,"&")
      .replace(/&quot;/g,"\"");

    if(parameters.length===0) {
      parameters = "code="+encodeURIComponent(code);
    }else{
      parameters += "&code="+encodeURIComponent(code);
    }
    switch(lang) {
      case "block":
      case "blocks":
        $(v).html(`<iframe class="lab" src="/blockly/inline?${parameters}&course=${course.course_name?course.course_name:''}"></iframe>`);
      break;
      case "java":
        $(v).html(`<iframe class="lab" src="/lab/inline?${parameters}&lang=java"></iframe>`);
      break;
      case "python":
      case "python3":
        $(v).html(`<iframe class="lab" src="/lab/inline?${parameters}&lang=python3"></iframe>`);
      break;
      case "python2":
        $(v).html(`<iframe class="lab" src="/lab/inline?${parameters}&lang=python2"></iframe>`);
      break;
      default:
      break;
    }
    renderedElements.push(v);
    // console.log(k,v);
  })
  $("table").each((k,v)=>{
    if(renderedElements.includes(v)){
      return; // don't override rendered elements
    }
    $(v).addClass("table");
    $(v).addClass("table-striped");
    renderedElements.push(v);
  });
};

$(()=>{
  $("input[type=file]").each(function (index, elm) {
    console.log(elm);
    var fieldVal = elm.files[0]?elm.files[0].name:undefined;
    if (fieldVal != undefined || fieldVal != "") {
      $(this).next(".custom-file-label").text(fieldVal);
    }
  });
  $("input[type=file]").change(function (event) {
    var fieldVal = event.target.files[0].name;
    if (fieldVal != undefined || fieldVal != "") {
      $(this).next(".custom-file-label").text(fieldVal);
    }
  });
});
