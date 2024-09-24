<script setup>
import MENU_LIST from '../menu/index';
import { Close, Crop, Expand, FullScreen, Moon, SemiSelect, Sunny } from '@element-plus/icons-vue';
import { useActiveRouter } from '../../../store/useActiveRouter.js';
import { useActiveTheme } from '../../../store/useActiveTheme.js';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { elIconColor } = useActiveTheme();
const { locale } = useI18n();
const router = useRouter();
const activeRouter = useActiveRouter();
const emit = defineEmits(['close', 'hide', 'fullScreen']);
const isFullScreen = ref(false);
const useDark = ref(false);

watch(useDark, () => {
    document.documentElement.className = useDark.value ? 'dark' : 'light';
});

async function handleFullScreen() {
    isFullScreen.value = !isFullScreen.value;
    emit('fullScreen', isFullScreen.value);
}

/**
 * @description 导航栏跳转事件
 * @params {Object} menuInfo 路由信息
 * @params {Boolean} level 路由等级
 * */
async function handleClickMenu(menuInfo, level = 1) {
    if (menuInfo.path === '/quit') {
        emit('close');
        return;
    }
    await router.push({
        path: menuInfo.path
    });

    switch (level) {
        case 1:
            activeRouter.firstMenu = menuInfo;
            activeRouter.secondMenu = menuInfo.subMenu;
            activeRouter.currentRoutePath = menuInfo.subMenu[0]?.path ?? menuInfo.path;
            break;
        case 2:
            activeRouter.currentRoutePath = menuInfo.path;
            break;
        default:
            break;
    }
}

async function handleSelectLanguage(language = 'cn') {
    locale.value = language;
    localStorage.setItem('language', language);
}

async function handleLogoClick() {}
</script>

<template>
    <div class="header-container">
        <div class="nav">
            <div class="nav-menu">
                <el-menu
                    :ellipsis="false"
                    :popper-offset="0"
                    class="menu"
                    mode="horizontal"
                    popper-class="menu-popper"
                >
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon
                                :size="44"
                                class="icon"
                            >
                                <Expand color="white" />
                            </el-icon>
                        </template>
                        <el-menu-item
                            v-for="item in MENU_LIST"
                            :key="item.path"
                            :index="item.path"
                            @click="handleClickMenu(item)"
                        >
                            {{ $i18n.locale === 'cn' ? item.cnName : item.enName }}
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
            <div
                class="logo"
                @click="handleLogoClick"
            >
                <img
                    class="logo-img"
                    src="../../../assets/logo2x.png"
                />
            </div>
            <div class="system-name">{{ $t('common.systemName') }}</div>
            <div>
                <span class="menu-item">{{
                    $i18n.locale === 'cn'
                        ? activeRouter.firstMenu.cnName
                        : activeRouter.firstMenu.enName
                }}</span>
                <el-divider
                    v-if="activeRouter.secondMenu.length"
                    direction="vertical"
                />
            </div>

            <div class="nav-list">
                <div
                    v-for="(item, index) in activeRouter.secondMenu"
                    :key="index"
                    :class="{
                        'active-menu-item': activeRouter.currentRoutePath === item.path
                    }"
                    class="menu-item second-menu-item"
                    @click="handleClickMenu(item, 2)"
                >
                    {{ $i18n.locale === 'cn' ? item.cnName : item.enName }}
                </div>
            </div>
        </div>
        <div class="drag"></div>
        <div class="window">
            <div class="control">
                <el-popover
                    popper-class="language-popper"
                    trigger="hover"
                >
                    <template #reference>
                        <div class="control-item language">
                            <img
                                class="language-icon"
                                src="../../../assets/language.svg"
                            />
                        </div>
                    </template>
                    <div class="language-options">
                        <div
                            class="language-option-item"
                            @click="handleSelectLanguage('en')"
                        >
                            English
                        </div>
                        <div
                            class="language-option-item"
                            @click="handleSelectLanguage('cn')"
                        >
                            中文（简体）
                        </div>
                    </div>
                </el-popover>
                <div class="control-item theme">
                    <el-switch
                        v-model="useDark"
                        :active-action-icon="Moon"
                        :inactive-action-icon="Sunny"
                    />
                </div>
                <div
                    class="control-item close"
                    @click.stop="$emit('hide')"
                >
                    <el-icon :size="12">
                        <SemiSelect :color="elIconColor" />
                    </el-icon>
                </div>
                <div
                    class="control-item full-screen"
                    @click.stop="handleFullScreen"
                >
                    <el-icon
                        v-if="isFullScreen"
                        :size="12"
                    >
                        <Crop :color="elIconColor" />
                    </el-icon>
                    <el-icon
                        v-else
                        :size="12"
                    >
                        <FullScreen :color="elIconColor" />
                    </el-icon>
                </div>
                <div
                    class="control-item hide"
                    @click.stop="$emit('close')"
                >
                    <el-icon :size="18">
                        <Close :color="elIconColor" />
                    </el-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
@nav-height: 44px;
@nav-font-size: 18px;
.header-container {
    width: 100%;
    height: @nav-height;
    display: flex;
    justify-content: space-between;
    background-color: var(--header-bg-color);
    color: var(--header-text-color);
    user-select: none;

    .nav {
        display: flex;

        .menu {
            border: 0;
            background-color: transparent;

            .el-sub-menu {
                width: 100%;
                height: @nav-height;
                display: flex;
                align-items: center;
                justify-content: center;

                .el-sub-menu__title {
                    font-size: @nav-font-size;
                    padding: 0 10px;
                    border: none;
                    background-color: transparent;

                    .el-sub-menu__icon-arrow {
                        display: none;
                    }
                }
            }
        }

        .logo,
        .nav-list,
        .system-name {
            display: flex;
            align-items: center;
        }

        .logo-img {
            height: 50%;
            cursor: pointer;
        }

        .system-name {
            padding: 0 20px;
            font-size: 22px;
            font-weight: 700;
        }

        .menu-item {
            padding: 0 20px;
            line-height: @nav-height;
        }

        .second-menu-item {
            cursor: pointer;

            &:hover {
                background-color: var(--header-hover-bg-color);
            }
        }

        .active-menu-item {
            background-color: var(--header-hover-bg-color);
        }
    }

    .drag {
        flex: 1;
        -webkit-app-region: drag;
    }

    .window {
        display: flex;

        .control {
            display: flex;
            align-items: center;

            .control-item {
                display: flex;
                align-items: center;
                justify-content: center;
                width: @nav-height;
                height: @nav-height;
                cursor: pointer;
            }

            .theme {
                .el-switch {
                    &.is-checked .el-switch__core {
                        background: var(--header-text-color);
                        border-color: var(--header-text-color);
                    }

                    .el-switch__action {
                        color: #121212;
                    }
                }
            }

            .language {
                overflow: hidden;

                .language-icon {
                    width: 50%;
                    filter: drop-shadow(var(--header-text-color) 100px 0);
                    transform: translateX(-100px);
                }
            }

            .close,
            .hide,
            .full-screen {
                &:hover {
                    background-color: var(--header-hover-bg-color);
                }
            }
        }
    }
}
</style>
<style lang="less">
@nav-height: 44px;
@nav-font-size: 18px;
.menu-popper .el-menu--horizontal .el-menu--popup {
    padding: 0;
    margin-top: -1px;

    .el-menu-item {
        height: @nav-height;
        font-size: 16px;
        background-color: var(--header-bg-color);
        color: var(--header-text-color);
    }

    .el-menu-item:hover {
        background-color: var(--hover-bg-color);
        color: var(--hover-text-color);
    }
}

.el-popover.el-popper.language-popper {
    padding: 10px 1px;
    border-radius: 10px;

    .language-options {
        cursor: pointer;

        .language-option-item {
            padding: 5px;
            text-indent: 1em;
            font-size: @nav-font-size;

            &:hover {
                background-color: var(--header-bg-color);
                color: var(--header-text-color);
            }
        }
    }
}
</style>
