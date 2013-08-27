;(function(){

	var settings = {};


	function linkClicked(e){
		settings.sameWindow ? window.open(this.getAttribute('title'),'trelloExternalUrlWindow') : window.open(this.getAttribute('title'));
		e.preventDefault();
		e.stopPropagation();
		return false;
	}

	function linkReplacement(m,id){
		return ' <span class="externally-linked" title="' + (settings.scheme||'http://').replace(/%d/g,id) + '" style="color:blue;cursor:pointer">#'+id+'</span> ';
	}

	function replaceIds(elmt){
		elmt || (elmt = this);
		if( ! (elmt && elmt.tagName === 'A' && elmt.className && elmt.className.match(/list-card-title/) && !elmt.className.match(/externally-linked/) && elmt.innerHTML.match(/\s#\d+(\s|$)/) )){
			return false;
		}
		elmt.className += ' externally-linked';
		elmt.innerHTML = elmt.innerHTML.replace(/\s#(\d+)(?=\s|$)/g, linkReplacement);
		var links = elmt.querySelectorAll('span.externally-linked');
		links && [].slice.call(links).forEach(function(link){
			link.addEventListener('click', linkClicked, false);
		});
	}

	chrome.extension.sendRequest({method: "externalUrlSettings"}, function(externalUrlSettings) {
		settings = externalUrlSettings && JSON.parse(externalUrlSettings) || {};

		//initialize already inserted node:
		var cardTitles = document.querySelectorAll('.list-card-title');
		cardTitles && [].slice.call(cardTitles).forEach(replaceIds)

		//-- track newly inserted nodes
		var listArea = document.querySelector('.list-area'), observer = new MutationObserver(function(mutations){
			mutations
				.filter(function(mutation){
					return !!(mutation.target && mutation.target.className.match(/list-card-details/));
				})
				.forEach(function(mutation){
					replaceIds(mutation.target.querySelector('.list-card-title'));
				})
			;
		});
		observer.observe(document, {childList:true, subtree:true})

	});

})()
