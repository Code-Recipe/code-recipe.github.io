<template>
  <b-card :title="`正在学习 - ${content.name}`" class="card-seperate contents-card">
<svg width="100%" :height="`${78+70*content.chapters.length}px`" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs></defs>
    <g id="学习" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-172.000000, -191.000000)" id="Penal-1">
            <g transform="translate(154.000000, 97.000000)">
                <g id="Group-4" transform="translate(17.000000, 90.000000)">
                  <template v-for="(chapter, chapterIndex) in content.chapters">
                    <a @click="goto(`/learn#${courseName}/${chapterIndex}`)" style="cursor:pointer">
                      <g :transform="`translate(138, ${29+70*chapterIndex})`">
                        <text font-family="PingFangSC-Regular, PingFang SC" font-size="22" font-weight="normal" fill="#000000">
                            <tspan x="31" y="23">{{chapter.name}}</tspan>
                        </text>
                        <text font-family="PingFangSC-Regular, PingFang SC" font-size="18" font-weight="normal" fill="#9E9E9E">
                            <tspan x="31" y="44" color="#9E9E9E">{{chapter.sections.map(_=>_.name).join("、")}}</tspan>
                        </text>
                        
                        <!--<path v-if="progressChapterIndex > chapterIndex" d="M0,16.5 C0,10.7006016 4.70020733,6 10.5,6 C16.2993984,6 21,10.7002073 21,16.5 C21,22.2993984 16.2997927,27 10.5,27 C4.70060161,27 0,22.2997927 0,16.5 Z M1,16.5 C1,21.7474924 5.25286437,26 10.5,26 C15.7474924,26 20,21.7471356 20,16.5 C20,11.2525076 15.7471356,7 10.5,7 C5.25250765,7 1,11.2528644 1,16.5 Z M8.85296937,18.7870211 L15.0528831,13.155062 C15.5704948,12.684867 16.3469125,13.3901595 15.8293007,13.8603545 L9.24117821,19.8449598 L9.24099893,19.8451226 C9.13827387,19.9383608 8.99935206,19.9986877 8.85296937,20 C8.71325834,19.9987475 8.5803436,19.9437372 8.47920829,19.8576635 C8.47645817,19.855323 8.47373156,19.8529595 8.47102894,19.8505734 C8.46895255,19.8487447 8.46685442,19.8468619 8.46476053,19.8449598 L5.17069926,16.8526572 C4.65308747,16.3824622 5.42950516,15.6771697 5.94711695,16.1473647 L8.85296937,18.7870211 Z" id="Tick-2" fill="#79E286" fill-rule="nonzero"></path>-->
                        <path d="M18.9855382,17 C18.7363261,21.2962482 15.2962482,24.7363261 11,24.9855382 L11,26.5 C11,26.7761424 10.7761424,27 10.5,27 C10.2238576,27 10,26.7761424 10,26.5 L10,24.9855382 C5.70375176,24.7363261 2.26367394,21.2962482 2.01446179,17 L0.5,17 C0.223857625,17 0,16.7761424 0,16.5 C0,16.2238576 0.223857625,16 0.5,16 L2.01446179,16 C2.26367394,11.7037518 5.70375176,8.26367394 10,8.01446179 L10,6.5 C10,6.22385763 10.2238576,6 10.5,6 C10.7761424,6 11,6.22385763 11,6.5 L11,8.01446179 C15.2962482,8.26367394 18.7363261,11.7037518 18.9855382,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L18.9855382,17 Z M10.5,24 C14.6421356,24 18,20.6421356 18,16.5 C18,12.3578644 14.6421356,9 10.5,9 C6.35786438,9 3,12.3578644 3,16.5 C3,20.6421356 6.35786438,24 10.5,24 Z M11,20 C9.34314575,20 8,18.6568542 8,17 C8,15.3431458 9.34314575,14 11,14 C12.6568542,14 14,15.3431458 14,17 C14,18.6568542 12.6568542,20 11,20 Z M11,19 C12.1045695,19 13,18.1045695 13,17 C13,15.8954305 12.1045695,15 11,15 C9.8954305,15 9,15.8954305 9,17 C9,18.1045695 9.8954305,19 11,19 Z" id="Target" fill="#153FEC" fill-rule="nonzero"></path>
                        <!--<path v-else="progressChapterIndex < chapterIndex" d="M0,15.5 C0,9.70060161 4.70020733,5 10.5,5 C16.2993984,5 21,9.70020733 21,15.5 C21,21.2993984 16.2997927,26 10.5,26 C4.70060161,26 0,21.2997927 0,15.5 Z M1,15.5 C1,20.7474924 5.25286437,25 10.5,25 C15.7474924,25 20,20.7471356 20,15.5 C20,10.2525076 15.7471356,6 10.5,6 C5.25250765,6 1,10.2528644 1,15.5 Z M10,17.5 L10,9.5 C10,8.83333333 11,8.83333333 11,9.5 L11,17.5 C11,18.1666667 10,18.1666667 10,17.5 Z M10,21 C9.44771525,21 9,20.5522847 9,20 C9,19.4477153 9.44771525,19 10,19 C10.5522847,19 11,19.4477153 11,20 C11,20.5522847 10.5522847,21 10,21 Z" id="Danger-2" fill="#F82505" fill-rule="nonzero"></path>-->
                      </g>
                    </a>
                    <!--<g id="Checkpoint-4" transform="translate(138.000000, 239.000000)">
                        <text id="Checkpoint-1" font-family="PingFangSC-Regular, PingFang SC" font-size="22" font-weight="normal" fill="#000000">
                            <tspan x="35" y="23">Checkpoint 1</tspan>
                        </text>
                        <text id="小标题" font-family="PingFangSC-Regular, PingFang SC" font-size="18" font-weight="normal" fill="#9E9E9E">
                            <tspan x="113" y="49">小标题</tspan>
                        </text>
                        <path d="M0,14.5 C0,8.70060161 4.70020733,4 10.5,4 C16.2993984,4 21,8.70020733 21,14.5 C21,20.2993984 16.2997927,25 10.5,25 C4.70060161,25 0,20.2997927 0,14.5 Z M1,14.5 C1,19.7474924 5.25286437,24 10.5,24 C15.7474924,24 20,19.7471356 20,14.5 C20,9.25250765 15.7471356,5 10.5,5 C5.25250765,5 1,9.25286437 1,14.5 Z M10,16.5 L10,8.5 C10,7.83333333 11,7.83333333 11,8.5 L11,16.5 C11,17.1666667 10,17.1666667 10,16.5 Z M10,20 C9.44771525,20 9,19.5522847 9,19 C9,18.4477153 9.44771525,18 10,18 C10.5522847,18 11,18.4477153 11,19 C11,19.5522847 10.5522847,20 10,20 Z" id="Danger-2" fill="#F82505" fill-rule="nonzero"></path>
                    </g>
                    <g id="Checkpoint-3" transform="translate(138.000000, 169.000000)">
                        <text id="Checkpoint-1" font-family="PingFangSC-Regular, PingFang SC" font-size="22" font-weight="normal" fill="#000000">
                            <tspan x="33" y="23">Checkpoint 1</tspan>
                        </text>
                        <text id="小标题" font-family="PingFangSC-Regular, PingFang SC" font-size="18" font-weight="normal" fill="#9E9E9E">
                            <tspan x="113" y="44">小标题</tspan>
                        </text>
                        <path d="M0,15.5 C0,9.70060161 4.70020733,5 10.5,5 C16.2993984,5 21,9.70020733 21,15.5 C21,21.2993984 16.2997927,26 10.5,26 C4.70060161,26 0,21.2997927 0,15.5 Z M1,15.5 C1,20.7474924 5.25286437,25 10.5,25 C15.7474924,25 20,20.7471356 20,15.5 C20,10.2525076 15.7471356,6 10.5,6 C5.25250765,6 1,10.2528644 1,15.5 Z M10,17.5 L10,9.5 C10,8.83333333 11,8.83333333 11,9.5 L11,17.5 C11,18.1666667 10,18.1666667 10,17.5 Z M10,21 C9.44771525,21 9,20.5522847 9,20 C9,19.4477153 9.44771525,19 10,19 C10.5522847,19 11,19.4477153 11,20 C11,20.5522847 10.5522847,21 10,21 Z" id="Danger-2" fill="#F82505" fill-rule="nonzero"></path>
                    </g>
                    <g id="Checkpoint-2" transform="translate(138.000000, 99.000000)">
                        <text id="Checkpoint-1" font-family="PingFangSC-Regular, PingFang SC" font-size="22" font-weight="normal" fill="#000000">
                            <tspan x="33" y="23">Checkpoint 1</tspan>
                        </text>
                        <text id="小标题" font-family="PingFangSC-Regular, PingFang SC" font-size="18" font-weight="normal" fill="#9E9E9E">
                            <tspan x="111" y="49">小标题</tspan>
                        </text>
                        <path d="M18.9855382,17 C18.7363261,21.2962482 15.2962482,24.7363261 11,24.9855382 L11,26.5 C11,26.7761424 10.7761424,27 10.5,27 C10.2238576,27 10,26.7761424 10,26.5 L10,24.9855382 C5.70375176,24.7363261 2.26367394,21.2962482 2.01446179,17 L0.5,17 C0.223857625,17 0,16.7761424 0,16.5 C0,16.2238576 0.223857625,16 0.5,16 L2.01446179,16 C2.26367394,11.7037518 5.70375176,8.26367394 10,8.01446179 L10,6.5 C10,6.22385763 10.2238576,6 10.5,6 C10.7761424,6 11,6.22385763 11,6.5 L11,8.01446179 C15.2962482,8.26367394 18.7363261,11.7037518 18.9855382,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L18.9855382,17 Z M10.5,24 C14.6421356,24 18,20.6421356 18,16.5 C18,12.3578644 14.6421356,9 10.5,9 C6.35786438,9 3,12.3578644 3,16.5 C3,20.6421356 6.35786438,24 10.5,24 Z M11,20 C9.34314575,20 8,18.6568542 8,17 C8,15.3431458 9.34314575,14 11,14 C12.6568542,14 14,15.3431458 14,17 C14,18.6568542 12.6568542,20 11,20 Z M11,19 C12.1045695,19 13,18.1045695 13,17 C13,15.8954305 12.1045695,15 11,15 C9.8954305,15 9,15.8954305 9,17 C9,18.1045695 9.8954305,19 11,19 Z" id="Target" fill="#153FEC" fill-rule="nonzero"></path>
                    </g>
                    <g id="Checkpoint-1" transform="translate(138.000000, 29.000000)">
                        <text font-family="PingFangSC-Regular, PingFang SC" font-size="22" font-weight="normal" fill="#000000">
                            <tspan x="31" y="23">Checkpoint 1</tspan>
                        </text>
                        <text id="小标题" font-family="PingFangSC-Regular, PingFang SC" font-size="18" font-weight="normal" fill="#9E9E9E">
                            <tspan x="111" y="44">小标题</tspan>
                        </text>
                        <path d="M0,16.5 C0,10.7006016 4.70020733,6 10.5,6 C16.2993984,6 21,10.7002073 21,16.5 C21,22.2993984 16.2997927,27 10.5,27 C4.70060161,27 0,22.2997927 0,16.5 Z M1,16.5 C1,21.7474924 5.25286437,26 10.5,26 C15.7474924,26 20,21.7471356 20,16.5 C20,11.2525076 15.7471356,7 10.5,7 C5.25250765,7 1,11.2528644 1,16.5 Z M8.85296937,18.7870211 L15.0528831,13.155062 C15.5704948,12.684867 16.3469125,13.3901595 15.8293007,13.8603545 L9.24117821,19.8449598 L9.24099893,19.8451226 C9.13827387,19.9383608 8.99935206,19.9986877 8.85296937,20 C8.71325834,19.9987475 8.5803436,19.9437372 8.47920829,19.8576635 C8.47645817,19.855323 8.47373156,19.8529595 8.47102894,19.8505734 C8.46895255,19.8487447 8.46685442,19.8468619 8.46476053,19.8449598 L5.17069926,16.8526572 C4.65308747,16.3824622 5.42950516,15.6771697 5.94711695,16.1473647 L8.85296937,18.7870211 Z" id="Tick-2" fill="#79E286" fill-rule="nonzero"></path>
                    </g>-->
                    </template>
                    <text font-family="PingFangSC-Regular, PingFang SC" font-size="22" font-weight="normal" fill="#000000">
                        <tspan x="0" y="23">开始学习</tspan>
                    </text>
                    <g id="Finished" :transform="`translate(138, ${34+70*content.chapters.length})`">
                        <text font-family="PingFangSC-Regular, PingFang SC" font-size="22" font-weight="normal" fill="#000000">
                            <tspan x="20" y="23">教程完成</tspan>
                        </text>
                        <text font-family="PingFangSC-Regular, PingFang SC" font-size="18" font-weight="normal" fill="#9E9E9E">
                            <tspan x="20" y="46">完成所有任务</tspan>
                        </text>
                        <path v-if="progressChapterIndex >= content.chapters.length" d="M141.734142,10.2795799 C142.023724,9.9068067 142.49323,9.9068067 142.782813,10.2795799 C143.072396,10.6523531 143.072396,11.2567378 142.782813,11.629511 L127.952361,30.7204201 C127.662779,31.0931933 127.193273,31.0931933 126.90369,30.7204201 L126.217187,29.8366999 C125.927604,29.4639267 125.927604,28.859542 126.217187,28.4867688 C126.50677,28.1139956 126.976276,28.1139956 127.265858,28.4867688 L127.428026,28.6955234 L141.734142,10.2795799 Z M123.765288,23.2899983 C124.078237,23.6811848 124.078237,24.3154235 123.765288,24.7066101 C123.452339,25.0977966 122.944948,25.0977966 122.631999,24.7066101 L120.234712,21.7100017 C119.921763,21.3188152 119.921763,20.6845765 120.234712,20.2933899 C120.547661,19.9022034 121.055052,19.9022034 121.368001,20.2933899 L123.765288,23.2899983 Z M135.773017,10.2795799 C136.053706,9.9068067 136.508794,9.9068067 136.789483,10.2795799 C137.070172,10.6523531 137.070172,11.2567378 136.789483,11.629511 L122.414483,30.7204201 C122.133794,31.0931933 121.678706,31.0931933 121.398017,30.7204201 L114.210517,21.1749656 C113.929828,20.8021924 113.929828,20.1978076 114.210517,19.8250344 C114.491206,19.4522612 114.946294,19.4522612 115.226983,19.8250344 L121.90625,28.6955234 L135.773017,10.2795799 Z" id="Check-All" fill="#3EDC5C" fill-rule="nonzero"></path>
                    </g>
                    <g id="line_default/-5.1" transform="translate(96.000000, 12.000000)">
                        <g>
                            <path :d="`M30,3 L30,3 C32.7614237,3 35,5.23857625 35,8 L35,${41+70*content.chapters.length} C35,${43+70*content.chapters.length} 37.2385763,${46+70*content.chapters.length} 40,${46+70*content.chapters.length} L50,${46+70*content.chapters.length}`" id="Path-3" stroke="#50E3C2"></path>
                            <polygon id="Triangle-2-Copy" fill="#50E3C2" :points="`48 ${49+70*content.chapters.length} 48 ${43+70*content.chapters.length} 51 ${46+70*content.chapters.length}`"></polygon>
                            <path d="M3,3 L30,3 L3,3 Z" id="Path-4" stroke="#50E3C2"></path>
                            <circle id="Oval--Copy" stroke="#50E3C2" fill="#109F7F" cx="3" cy="3" r="2.5"></circle>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
    <!--<ul>
      <template v-for="(chapter, chapterIndex) in content.chapters">
        <li v-if="progressChapterIndex > chapterIndex" :class="`completed ${displayChapterIndex === chapterIndex?'current-chapter':''}`" @click="clickChapter(chapterIndex)">
          <a :href='"/learn#"+courseName+"/"+chapterIndex'>{{chapter.name}}</a>
        </li>
        <li v-else-if="progressChapterIndex === chapterIndex" :class="`${guest?'incompleted':'learning'} ${displayChapterIndex === chapterIndex?'current-chapter':''}`" @click="clickChapter(chapterIndex)">
          <a :href='"/learn#"+courseName+"/"+chapterIndex'>{{chapter.name}}</a>
        </li>
        <!-- We won't display learning for a guest ->
        <li v-else="progressChapterIndex < chapterIndex" :class="`incompleted ${displayChapterIndex === chapterIndex?'current-chapter':''}`" @click="clickChapter(chapterIndex)">
          <a :href='"/learn#"+courseName+"/"+chapterIndex'>{{chapter.name}}</a>
        </li>
        <ul v-if="displayChapterIndex === chapterIndex">
          <li v-for="(section, sectionIndex) in chapter.sections"
          :class="`${(sectionProgresses[displayChapterIndex] && sectionProgresses[displayChapterIndex].includes(sectionIndex))?'mastered':'unmastered'}`"
          @click="clickSection(sectionIndex)">
            {{section.name}}
          </li>
        </ul>
      </template>
    </ul>-->
  </b-card>
</template>
<style lang="scss" scoped>
</style>
<script>
  import urljoin from 'url-join';
  export default {
    props: {
      repoUrl: {
        type: String,
        required: true
      },
      content: {
        type: Object,
        required: true
      },
      displayChapterIndex: {
        type: Number,
        required: true
      },
      progressChapterIndex: {
        type: Number,
        default: 0
      },
      courseName: {
        type: String,
        required: true
      },
      guest: {
        type: Boolean
      },
      sectionProgresses: {
        type: [ Array, Object ],
        required: false
      }
    },
    data() {
      return {
        currentSectionIndex: this.getSectionIndexFromAnchor(decodeURIComponent(location.href.split("#")[1]||""))
      };
    },
    methods: {
      getCurrentSectionAnchorName() {
        return getSectionAnchorName(this.currentSectionIndex);
      },
      getSectionAnchorName(sectionIndex){
        if(sectionIndex == -1){
          sectionIndex = 0; // if we are on the top then show we are on index 0
        }
        let currentChapter = this.content.chapters[this.displayChapterIndex];
        if(currentChapter.sections[sectionIndex]){
          if(currentChapter.sections[sectionIndex].anchor){
            console.log("Found anchor", currentChapter.sections[sectionIndex].anchor.toLowerCase().trim());
            return "section-" + currentChapter.sections[sectionIndex].anchor.toLowerCase().trim();
          }else if(currentChapter.sections[sectionIndex].name){
            return "section-" + this.parseSectionNameToAnchor(currentChapter.sections[sectionIndex].name);
          }
        }else{
          console.warn("Section not found.");
        }
        return "";
      },
      parseSectionNameToAnchor(sectionName) {
        // CREDIT: code adapted from showdown
        return sectionName.replace(/ /g, '-')
            // replace previously escaped chars (&, ¨ and $)
            .replace(/&amp;/g, '')
            .replace(/¨T/g, '')
            .replace(/¨D/g, '')
            // replace rest of the chars (&~$ are repeated as they might have been escaped)
            // borrowed from github's redcarpet (some they should produce similar results)
            .replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, '')
            .toLowerCase().trim();
      },
      clickSection(sectionIndex) {
          this.gotoSection(sectionIndex, true);
      },
      clickChapter(chapterIndex) {
          location.href = "/learn#"+this.courseName+"/"+chapterIndex;
          // TODO: scroll to the top of the page if it's the current chapter
      },
      gotoSection(sectionIndex, updateURL) {
        this.currentSectionIndex = sectionIndex;
        var anchor = `#${this.getSectionAnchorName(sectionIndex)}`;
        if($(anchor).length == 0){
          // not found
          console.log("Default anchor not found", sectionIndex, anchor);
          let id = $(".learn-card .card-body h2").eq(sectionIndex).attr("id");
          // eq(0) may cause problem, but it is really unlikely
          console.log($(".learn-card .card-body h2").eq(sectionIndex), id);
          anchor = `#${id}`;
        }
        console.log("Go to", sectionIndex, anchor);
        // TODO: use #
        if($(anchor).offset()){
          // ajax may not be loaded when page starts, so it might be undefined at this time
          if(updateURL) {
            var scrollTop = $(document).scrollTop(); // record where we are
            location.href = anchor; // this will cause the scroll directly without animation
            $("html, body").scrollTop(scrollTop);
            console.log("updateURL: we are at", scrollTop);
          }
          $("html, body").animate({
              scrollTop: $(anchor).offset().top + "px"
          }, 500);
        }
      },
      getSectionIndexFromAnchor(anchorName) {
        if(!anchorName){ // if we don't have # in URL
          return -1;
        }
        anchorName = anchorName.replace("section-","");
        let sectionsOfCurrentChapter = this.content.chapters[this.displayChapterIndex].sections||[];
        console.log("anchor", anchorName, sectionsOfCurrentChapter);
        if(sectionsOfCurrentChapter[anchorName]) {
          // console.log("Found chapter");
          this.gotoSection(Number(anchorName), true);
          return Number(anchorName);
        }
        for(let sectionIndex in sectionsOfCurrentChapter){
            if(sectionsOfCurrentChapter[sectionIndex].anchor && sectionsOfCurrentChapter[sectionIndex].anchor.trim() == anchorName.trim()){
              return sectionIndex;
            }else if(sectionsOfCurrentChapter[sectionIndex].name && 
              this.parseSectionNameToAnchor(sectionsOfCurrentChapter[sectionIndex].name) == this.parseSectionNameToAnchor(anchorName)){
                    // Some anchor are not real anchor, they are just section names
              return sectionIndex;
            }
        }
        console.warn("Section not found.", anchorName, sectionsOfCurrentChapter);
        return isNaN(anchorName)?-1:Number(anchorName);
      },
      goto(url) {
        window.location.href=url;
      }
    },
    mounted() {
      if (location.href.split("#")[1] && 'scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
        console.log("Manual scroll restoration");
      }
      this.$nextTick(function () {
        this.$on('content-loaded', function () {
          console.log("Content has been loaded");
          if(this.currentSectionIndex >= 0){
            this.gotoSection(this.currentSectionIndex);
            setTimeout(()=>{this.gotoSection(this.currentSectionIndex)}, 300); // images may be loaded then
          }
        });
      });
    }
  }
</script>
