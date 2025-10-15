export function setUpLoading() {
  const app = document.getElementById('app')
  const loading = `
        <div style='position:fixed; left:0; top:0; right:0; bottom:0; background:#000;'></div>
    `
  if (app) {
    app.innerHTML = loading
  }
}
