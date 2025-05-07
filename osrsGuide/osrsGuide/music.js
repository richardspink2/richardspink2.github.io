// music.js
document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('background-music');
  if (!music) return;

  // set low volume
  music.volume = 0.1;

  // resume from last position
  const savedTime = localStorage.getItem('musicTime');
  if (savedTime) music.currentTime = parseFloat(savedTime);

  // try to play (unmuted)
  music.play().catch(() => {
    // if blocked, wait for first click
    document.body.addEventListener('click', () => {
      music.play();
    }, { once: true });
  });

  // save position when leaving or hiding
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      localStorage.setItem('musicTime', music.currentTime);
      music.pause();
    }
  });

  // pause music when any embedded media plays
  document.querySelectorAll('iframe, video').forEach(el => {
    el.addEventListener('play',  () => music.pause());
    el.addEventListener('pause', () => music.play());
  });
});