export default function clearSession() {
    sessionStorage.clear();
    window.location.href = "/";
}