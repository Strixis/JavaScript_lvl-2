Vue.component('server-error', {
    template: `<div class="server-error">
                    <p>{{this.$root.serverError}}</p>
                    <a href="index.html">Reload</a>
               </div>`,
})