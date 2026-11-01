const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".hamburger-menu");

if (hamburger && menu) {

  // ハンバーガーを押したとき
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("is-open");
  });

  // メニュー内を押したとき
  menu.addEventListener("click", (e) => {
    e.stopPropagation();

    // リンクを押したら閉じる
    if (e.target.closest("a")) {
      menu.classList.remove("is-open");
    }
  });

  // メニュー以外を押したら閉じる
  document.addEventListener("click", (e) => {
    if (
      !menu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      menu.classList.remove("is-open");
    }
  });

  // ESCキーでも閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menu.classList.remove("is-open");
    }
  });

}


/* =======================================
   Lyrics - Smartphone only
======================================== */

if (window.innerWidth <= 768) {

  document.querySelectorAll(".track-title").forEach(title => {

    title.addEventListener("click", (e) => {

      e.stopPropagation();

      // 他の歌詞を閉じる
      document.querySelectorAll(".track-title.is-open").forEach(openTitle => {

        if (openTitle !== title) {
          openTitle.classList.remove("is-open");
        }

      });

      // タップした曲の歌詞を開閉
      title.classList.toggle("is-open");

    });

  });

}