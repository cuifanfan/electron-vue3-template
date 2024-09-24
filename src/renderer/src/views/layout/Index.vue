<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

function closeApp() {
    window.electron.ipcRenderer.send('closeApp');
}

function hideApp() {
    window.electron.ipcRenderer.send('hideApp');
}

function setFullScreen(operator) {
    window.electron.ipcRenderer.send('setFullScreen', operator);
}
</script>

<template>
    <div class="layout-container">
        <div class="header-container">
            <Header
                @close="closeApp"
                @hide="hideApp"
                @full-screen="setFullScreen"
            ></Header>
        </div>
        <div class="main-container">
            <router-view></router-view>
        </div>
        <div class="footer-container">
            <Footer></Footer>
        </div>
    </div>
</template>

<style scoped>
.layout-container {
    height: 100vh;
    display: flex;
    flex-direction: column;

    .main-container {
        flex: 1;
        overflow: hidden;
    }
}
</style>
