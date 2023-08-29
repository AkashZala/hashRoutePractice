const single = document.getElementById('single');
const all = document.getElementById('all');

const state = {
    options: [],
    selected: null
};

window.addEventListener("hashchange", () => {
    selectOption();
});

function selectOption() {
    getEventFromHash();
    renderSelectedDetails();
}

function getEventFromHash() {
    const title = window.location.hash.slice(1).replaceAll("%20"," ");
    const singlePost = state.options.find((post) => {
        return post.title === title
    });
    state.selected = singlePost;
}

function renderSelectedDetails() {
    if (state.selected) {
        getSelected();
    }
}

async function getSelected() {
    const selectedFetch = await fetch(`https://jsonplaceholder.typicode.com/posts/${state.selected.id}`);
    const selectedData = await selectedFetch.json();
    state.selected = selectedData;
    single.innerHTML = `
            <h2>${state.selected.title}</h2>
            <ul><li>${state.selected.body}</li></ul>
            `;

}

async function renderOptionList() {
    await getOptionList();
    allOptions = state.options.map((option) => {
        return `
            <li> <a href=#${option.title.replaceAll(" ","%20")}> ${option.title} </a></li>
        `;
    }).join('');
    all.innerHTML = allOptions;
}

async function getOptionList() {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    state.options = await data.json();
    
}

async function render() {
    await getOptionList();
    renderOptionList();
    selectOption();
}

render();