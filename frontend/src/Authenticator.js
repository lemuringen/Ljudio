export async function isLoggedIn() {
    let loggedInUser = null
    let response = await fetch('/api/login/whoami')
    try {
        loggedInUser = await response.json()
    } catch (error) {
        console.log(error)
    }
    if (loggedInUser.error !== undefined) {
        return false
    }
    return true;
}
