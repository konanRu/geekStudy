Vue.component('search', {
    data() {
        return {
            searchLine: '',
        }
    },
    template: `  <div class="search-box">                        
        <input type="text" class="search-box__input" v-model="searchLine">
        <button class="search-box__button" @click="$parent.$refs.products.filter(searchLine)">Поиск </button>
    </div> `
})