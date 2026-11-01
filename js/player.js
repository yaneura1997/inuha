/* ========================================
   Audio Player
======================================== */

document.querySelectorAll(".track").forEach(track => {

  const audio = track.querySelector("audio");
  const play = track.querySelector(".play");
  const seek = track.querySelector(".seek");

  const current = track.querySelector(".current");
  const duration = track.querySelector(".duration");

  const lyrics = track.querySelector(".lyrics-popup");
  const lyricsToggle = track.querySelector(".lyrics-toggle");
  const lyricsClose = track.querySelector(".lyrics-close");


  /* ---------- Play / Pause ---------- */

  if (play && audio) {

    play.addEventListener("click", () => {

      if (audio.paused) {

        document.querySelectorAll("audio").forEach(a => {
          if (a !== audio) a.pause();
        });

        document.querySelectorAll(".play").forEach(b => {
          if (b !== play) b.textContent = "▶";
        });

        audio.play();
        play.textContent = "❚❚";

      } else {

        audio.pause();
        play.textContent = "▶";

      }

    });

    audio.addEventListener("pause", () => {
      play.textContent = "▶";
    });

    audio.addEventListener("ended", () => {
      play.textContent = "▶";
    });

  }


  /* ---------- Audio Seek ---------- */

  if (audio && seek) {

    audio.addEventListener("loadedmetadata", () => {

      seek.max = audio.duration;

      if (duration) {
        duration.textContent = format(audio.duration);
      }

    });

    audio.addEventListener("timeupdate", () => {

      seek.value = audio.currentTime;

      if (current) {
        current.textContent = format(audio.currentTime);
      }

    });

    seek.addEventListener("input", () => {
      audio.currentTime = seek.value;
    });

  }


  /* ---------- Lyrics Open ---------- */

  if (lyrics && lyricsToggle) {

    lyricsToggle.addEventListener("click", e => {

      e.stopPropagation();

      // 他の歌詞を閉じる
      document.querySelectorAll(".lyrics-popup.is-open").forEach(popup => {
        if (popup !== lyrics) {
          popup.classList.remove("is-open");
        }
      });

      // 表示・非表示を切り替える
      lyrics.classList.toggle("is-open");

    });

  }


  /* ---------- Lyrics Close ---------- */

  if (lyrics && lyricsClose) {

    lyricsClose.addEventListener("click", e => {

      e.stopPropagation();

      lyrics.classList.remove("is-open");

    });

  }

});


/* ---------- Outside Click ---------- */

document.addEventListener("click", e => {

  if (!e.target.closest(".lyrics-popup") &&
      !e.target.closest(".lyrics-toggle")) {

    document.querySelectorAll(".lyrics-popup.is-open").forEach(popup => {
      popup.classList.remove("is-open");
    });

  }

});


/* ---------- Time Format ---------- */

function format(sec) {

  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);

  return `${m}:${String(s).padStart(2, "0")}`;

}