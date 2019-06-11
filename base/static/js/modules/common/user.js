import {post, postJson} from "./network"

export const setLanguage = function(config, language) {
    return post('/api/i18n/setlang/', {language}).then(
        () => {
            config.language = language
            const oldI18N = document.querySelector('#i18n')
            if (oldI18N) {
                document.head.removeChild(oldI18N)
            }
            return new Promise((resolve, reject) => {
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = '/api/jsi18n/'
                script.id = 'i18n'
                script.addEventListener('load', () => resolve(), false)
                script.addEventListener('error', () => reject(), false)
                document.head.appendChild(script)
            })
        }
    )
}

export const getUserInfo = function() {
    return postJson('/api/user/info/')
}

export const loginUser = function(config, login, password, remember) {
    return post('/api/user/login/', {login, password, remember}).then(
        () => {
            config.loggedIn = true
        }
    )
}
