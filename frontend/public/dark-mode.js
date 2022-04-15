const KEY = 'neotan.me-dark-mode'
if (
  localStorage.getItem(KEY) ||
  (!(KEY in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
