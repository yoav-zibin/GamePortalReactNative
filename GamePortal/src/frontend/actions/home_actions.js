/*
 The user's home screen has many tabs, use this action to switch the tabs
 */
export function switchTab(tab) {
    return {
        type: 'SWITCH_TAB',
        tab: tab
    }
}