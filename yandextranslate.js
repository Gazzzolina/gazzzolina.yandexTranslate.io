var yatr = {

	lines : {},

	key : 'trnsl.1.1.20191024T112930Z.c3d0a1e529ff365b.1bec6a4bfa484abcfa5624d88e71511489180982',
	api : 'https://translate.yandex.net/api/v1.5/tr.json/translate',
	
	translate : function (id, callback) {
		var text = document.getElementById(id).innerHTML;
		document.getElementById(id).innerHTML = 'Перевод...'
		var url = this.api+'?';
		var that = this;
		
		url+= 'key='+this.key;
		url+= '&text='+text;
		url+= '&lang=ru-en';
		
		var ajax = new XMLHttpRequest();
		ajax.open('GET', url, true);
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4) {
				if (ajax.status == 200) {
					that.lines[id] = text;
					text = ajax.responseText;
					text = JSON.parse(text);
					text = text.text[0];
					document.getElementById(id).innerHTML = text;
				}
			}
		};
		ajax.send(null);
	},
	
	revert : function (id) {
	document.getElementById(id).innerHTML = this.lines[id];
	}
};