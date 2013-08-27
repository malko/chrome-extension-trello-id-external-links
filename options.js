var urlSchemeSettings = localStorage.getItem('externalUrlSettings');
urlSchemeSettings || (urlSchemeSettings = '{"scheme":"","sameWindow":""}');
urlSchemeSettings = JSON.parse(urlSchemeSettings);

var save = document.getElementById('save')
    scheme = document.getElementById('externalUrl_scheme')
    sameWindow = document.getElementById('externalUrl_sameWindow')
;


function updateSettings(){
    urlSchemeSettings = {
        scheme:scheme.value
        ,sameWindow:!!sameWindow.checked
    };
    localStorage['externalUrlSettings'] = JSON.stringify(urlSchemeSettings);
}
save.addEventListener('click',updateSettings,false);
scheme.addEventListener('change',updateSettings,false);
sameWindow.addEventListener('change',updateSettings,false);
// restore previous settings to display
console.log(urlSchemeSettings);
urlSchemeSettings.scheme && (scheme.value = urlSchemeSettings.scheme);
urlSchemeSettings.sameWindow && (sameWindow.checked = urlSchemeSettings.sameWindow);
