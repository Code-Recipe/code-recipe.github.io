<template>
  <div class="card learn-card card-seperate">
    <div class="card-body">
      <div style="float:right; display: inline-block">
        <a :href="this.srcUrl" class="btn btn-primary d-none d-md-inline-block" style="height: 40px">
          <span class="icon">&#xeee2;</span> Github仓库
        </a>
      </div>
      <div lg="11" xl="10" class="section course-content" v-for="(section, sectionIndex) in sections" :key="sectionIndex">
        <!-- <h2 :class="Object.values(bookmarks).includes(String(sectionIndex-1))?'bookmarked':'unbookmarked'" :id="section[1]" v-if="section[0]" v-html="section[0]" @click="toggleBookmark(sectionIndex-1, section[0])"></h2> -->
        <h2 :id="section[1]" v-if="section[0]" v-html="section[0]"></h2>
        <div v-html="section[2]"></div>
        <!-- <span v-for="(paragraph, paragraphIndex) in paragraphs">
          <div class="course-content" v-html="paragraph">
          </div>
        </span> -->
        <div class="master-btn" v-if="ready && sectionIndex > 0">
          <template v-if="!guest">
            <button class="btn btn-success mastered" disabled="disabled" @click="unmaster(sectionIndex-1)" 
              v-if="sectionProgresses[displayChapterIndex] && sectionProgresses[displayChapterIndex].includes(sectionIndex-1)">已掌握</button>
            <button class="btn btn-success unmastered" @click="master(sectionIndex-1)" v-else>未掌握</button>
          </template>
          <a class="btn btn-primary next-chapter" :href="`/learn#${course.course_name}/${(displayChapterIndex + 1)}`" 
            v-if="sectionIndex == (sections.length - 1) && (displayChapterIndex + 1) != course.chapterNum">下一章</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "~sass/_variables.scss";
</style>
<script>
  import courseUtils from 'utils/courseUtils';
  import urljoin from 'url-join';
  import { api } from 'api';
  var renderedElements = [];
  var contentLoaded = false;
  export default {
    data() {
      return {
        sections: [[null,null,"本章内容加载中..."]],
        ready: false
      };
    },
    components: {
    },
    methods: {
    },
    props: {
      guest: {
        type: Boolean,
        required: false
      },
      srcUrl: {
        type: String,
        required: true
      },
      repoUrl: {
        type: String,
        required: true
      },
      displayChapterIndex: {
        type: Number,
        required: true
      },
      course: {
        type: Object,
        required: true
      },
      sectionProgresses: {
        type: [ Array, Object ],
        required: false
      },
      content: {
        type: Object,
        required: true
      },
      bookmarks: {
        type: Object,
        required: false
      }
    },
    mounted() {
      var chapterURL = courseUtils.getChapterURL(this.repoUrl, this.content, this.displayChapterIndex); // this also sets contentURLBase
      $.ajax({
        url: chapterURL,
        success: (data) => {
          // console.log(data);
          var courseContent = converter.makeHtml(data);
          // TODO: make the code below better
          var sectionsText = courseContent.split("<h2");
          var sections = new Array();
          sections.push([null, null, sectionsText[0]]);
          console.log("section", sectionsText[0]); // TODO: add h2 title back
          for (var i = 1 ; i < sectionsText.length; i++) {
            var sectionText = "<h2" + sectionsText[i];
            // console.log(sectionText);
            var found = sectionText.match(/<\s*h2(?:\s+.*?id="(.*)")?.*>([^<]*)<\/\s*h2\s*>/i);
            // console.log(found);
            // title, id, content
            sections.push([found[2], found[1], sectionText.substring(found[0].length)]);
            // console.log([found[2], found[1], sectionText.substring(found[0].length)]);
          }
          this.sections = sections;
          this.ready = true;
        },
        error: (data) => {
          console.log(data);
          alert("本章内容加载出现问题，请稍后刷新再试");
          this.sections = [];
        }
      });
    },
    updated: function () {
      this.$nextTick(function () {
        if(this.ready){
          window.prerenderReady = true; // we don't need to load additional features for prerender
        }
        window.renderElements(renderedElements, this.course);
        if(!contentLoaded){
          this.$emit('content-loaded'); // we emit this only once
          contentLoaded = true;
        }
      });
    }
  }
</script>
