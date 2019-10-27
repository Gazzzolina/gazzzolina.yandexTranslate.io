var yatr = {

	key : 'trnsl.1.1.20191024T112930Z.c3d0a1e529ff365b.1bec6a4bfa484abcfa5624d88e71511489180982',
	api : 'https://translate.yandex.net/api/v1.5/tr.json/translate',
	apiLangs : 'https://translate.yandex.net/api/v1.5/tr.json/getLangs',

	translate : function () {
		var sourceID = 'text';
		var resultID = 'result';
		var langID = 'lang';
		var text = document.getElementById(sourceID).value;
		document.getElementById(resultID).innerHTML = 'Перевод...'
		var url = this.api+'?';
		
		var data = 'key=' + this.key;
		data += '&text=' + encodeURIComponent(text);
		data += '&format=html';
		data += '&lang=' + document.getElementById(langID).value;
		
		var ajax = new XMLHttpRequest();
		ajax.open('POST', url, true);
		ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4) {
				if (ajax.status == 200) {
					var text = ajax.responseText;
					text = JSON.parse(text);
					text = text.text[0];
					document.getElementById(resultID).innerHTML = text;
				}
			}
		};
		ajax.send(data);
	},
	
	getLangs : function() {
		var langsID = 'lang';
		
		var url = this.apiLangs+'?';
		var data = 'key=' + this.key;
		
		var ajax = new XMLHttpRequest();
		ajax.open('POST', url, true);
		ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4) {
				if (ajax.status == 200) {
					var text = ajax.responseText;
					text = JSON.parse(text);
					for (var i = 0; i < text.dirs.length; i++) {
						var option = document.createElement('option');
						option.value = text.dirs[i];
						option.innerHTML = text.dirs[i];
						document.getElementById('lang').appendChild(option);
					}
				}
			}
		};
		ajax.send(data);
		
	}
};
