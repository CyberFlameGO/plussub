/**
 * Created by sonste on 27.02.2016.
 */

var srtPlayer = srtPlayer || {};

srtPlayer.FindVideoService = srtPlayer.FindVideoService || (() => {
        "use strict";

        const CONTENT_CHANNEL = messageBus.channel(srtPlayer.Descriptor.CHANNEL.CONTENT_SERVICE);

        const detectNotTaggedVideos = function () {
            const cssTagForDetectedVideos = "plussubDetectedVideo";
            const videoList = Array.from(document.querySelectorAll('video'));
            videoList
                .filter(video => !video.classList.contains(cssTagForDetectedVideos))
                .forEach(video => {
                    video.classList.add(cssTagForDetectedVideos);

                    CONTENT_CHANNEL.publish({
                        topic: srtPlayer.Descriptor.CONTENT_SERVICE.FIND_VIDEO.PUB.FOUND,
                        data: video
                    });
                });
        };
        detectNotTaggedVideos();

        new MutationObserver(detectNotTaggedVideos).observe(document.querySelector('body'), {childList: true, subtree: true});

    })();