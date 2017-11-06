;var bittacle = bittacle || (function(){
	var oU={},oC={},oF={},urlChecked=false;
	function readURL (){
		oU.host = window.location.hostname;
		oU.path = window.location.pathname;
		oU.protcol = window.location.protocol;
		oU.query = window.location.search;
		oU.href = window.location.href;
		oU.params = {};
		var qString = (oU.query.length && oU.query.substring(0,1) === '?')? oU.query.substring(1) : oU.query;
		var aPairs = qString.split('&');
		for(var i=0;i<aPairs.length;i++) {
			var aKeyVal = aPairs[i].split('=');
			if(aKeyVal[0].trim().length) oU.params[aKeyVal[0].trim()] = (aKeyVal[1])? aKeyVal[1].trim() : true;
		}
		urlChecked=true;
	}
	function readCookies (){
		var arrCookies = document.cookie.split('; ');
		for(var i=0;i<arrCookies.length;i++) {
			var arrCookie = arrCookies[i].split('=');
			if(arrCookie[1]) oC[arrCookie[0]] = arrCookie[1];
		}
	}
	function readForms (){
		for(var i=0;i<document.forms.length;i++) {
			var tempForm = document.forms[i];
			var formKey = (tempForm.id.length)? tempForm.id : tempForm.name;
			oF[formKey] = {
				name : tempForm.name,
				id : tempForm.id,
				action : tempForm.action,
				method : tempForm.method,
				fields : {}
			};
			for(var j=0;j<tempForm.elements.length;j++) {
				var tempEl = tempForm.elements[j];
				var elKey = (tempEl.id.length)? tempEl.id : tempEl.name;
				oF[formKey].fields[elKey] = {
					name : tempEl.name,
					id : tempEl.id,
					type : tempEl.type,
					value : tempEl.value
				};
			}
		}
	}
	var APP = {
		url : function() { return oU; },
		cookies : function() { return oC; },
		forms : function() { return oF; },
		storage : {
			local : function () {
				try { return localStorage; } catch (err) { return {}; }
			},
			session : function () {
				try { return sessionStorage; } catch (err) { return {}; }
			}
		},
		read : function() {
			if(!urlChecked) readURL();
			readCookies();
			readForms();
		}
	};
	APP.read();
	return APP;
})();