<template>
  <div class="grid py-2 h-fit videos--card">
    <div class="h-px text-2xl font-header font-medium" style="grid-area: header">
      <div>Page Videos</div>
    </div>
    <div style="grid-area: content">
      <div v-if="videoList.length">
        <div
          v-for="(video, index) in videoList"
          :key="index"
          style="grid-template-columns: 8px 1fr auto"
          class="grid hover:cursor-pointer video-item hover:bg-primary-700 hover:text-on-primary-700"
          @mouseenter="highlightVideo({ video: video })"
          @mouseleave="removeHighlightFromVideo"
          @click="selectVideo(video)"
        >
          <Divider v-if="index === 0" style="grid-column: 1/3" class="border-surface-200" />
          <div class="flex flex-col gap-1 h-11 my-2 justify-center" style="grid-column: 2 / 3">
            <div>Video {{ index + 1 }} ({{formatTime(video.lastTimestamp)}})</div>
            <div v-if="false" class="text-xs">({{ video.origin }} - {{ video.id }})</div>
          </div>
          <Divider style="grid-column: 1/3" class="border-surface-200" />
        </div>
      </div>
      <div v-else class="px-8">No videos found in current tab.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, PropType } from 'vue';
import Duration from 'luxon/src/duration';
import { Video } from '@/video/store';

import Divider from '@/components/Divider.vue';
import { useInjectStore } from '@/composables/useInjectStore';

export default defineComponent({
  components: {
    Divider
  },
  props: {
    selectFn: {
      type: Function as PropType<(payload: {video: Video}) => unknown | undefined>,
      required: false,
      default: () => undefined
    }
  },
  setup(props) {
    const videoStore = useInjectStore('videoStore');

    onUnmounted(() => videoStore.actions.removeHighlight());

    return {
      highlightVideo: videoStore.actions.highlight,
      removeHighlightFromVideo: videoStore.actions.removeHighlight,
      videoList: videoStore.getters.list,
      selectVideo: async (video: Video) => {
        await videoStore.actions.setCurrent({ video });
        if(props?.selectFn){
          props.selectFn({video});
        }
      },
      formatTime: (ms) => Duration.fromMillis(ms).toFormat('hh:mm:ss')
    };
  }
});
</script>

<style scoped>
.videos--card {
  grid-template-areas:
    '. header .'
    '. . .'
    'content content content'
    '. . .';
  grid-template-rows: 50px 4px auto 8px;
  grid-template-columns: 16px auto 16px;
}
</style>
