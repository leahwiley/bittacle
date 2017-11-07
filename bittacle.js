;var bittacle = bittacle || (function(){
	var oP={},oC={},oF={},oL={},oS={},clock=new Date(),
		gimbals={ck:!navigator.cookieEnabled,ls:false,ss:false},
		oU={
			host : window.location.hostname,
			path : window.location.pathname,
			protcol : window.location.protocol,
			query : window.location.search,
			href : window.location.href
		};
	if(oU.query.length){
		var qString = (oU.query.substring(0,1) === '?')? oU.query.substring(1) : oU.query;
		var aPairs = qString.split('&');
		for(var i=0;i<aPairs.length;i++) {
			var aKeyVal = aPairs[i].split('=');
			if(aKeyVal[0].trim().length) oP[aKeyVal[0].trim()] = (aKeyVal[1])? aKeyVal[1].trim() : true;
		}
	}
	try{ localStorage; } catch (err) { gimbals.ls = true; }
	try{ sessionStorage; } catch (err) { gimbals.ss = true; }
	if(gimbals.ck){
		document.cookie = 'testCookies';
		gimbals.ck = (document.cookie.indexOf('testCookies') == -1)? true : false;
	}
	if(!gimbals.ck){
		var arrCookies = document.cookie.split('; ');
		for(var i=0;i<arrCookies.length;i++) {
			var arrCookie = arrCookies[i].split('=');
			if(arrCookie[1]) oC[arrCookie[0]] = arrCookie[1];
		}
	}
	var APP = {
		url : {
			src : function() { return oU.href; },
			get : function(k) {
				return (oU.hasOwnProperty(k))? oU[k] : null;
			},
			data : function() { return oU; }
		},
		params : {
			src : function() { return oU.query; },
			get : function(k) {
				return (oP.hasOwnProperty(k))? oP[k] : null;
			},
			data : function() { return oP; }
		},
		cookies : {
			src : function() { return document.cookie; },
			simulated : function() { return gimbals.ck; },
			data : function() { return oC; },
			get : function(k) {
				return (oC.hasOwnProperty(k))? oC[k] : null;
			},
			set : function(k,v){
				oC[k] = v;
				if(!gimbals.ck) document.cookie = k+'='+v+'; path=/';
			},
			delete : function(k){
				if(oC.hasOwnProperty(k)){
					delete oC[k];
					if(!gimbals.ck) document.cookie = k+'=""; path=/; expires='+clock;
				}
			}
		},
		storage : {
			local : {
				simulated : function() { return gimbals.ls; },
				data : function() { return (gimbals.ls)? oL : localStorage; },
				get : function(k) {
					if(gimbals.ls){
						return (oL.hasOwnProperty(k))? oL[k] : null;
					} else {
						return localStorage.getItem(k);
					}
				},
				set : function(k,v) {
					if(gimbals.ls){
						oL[k] = v;
					} else {
						localStorage.setItem(k,v);
					}
				},
				delete : function(k) {
					if(gimbals.ls){
						if(oL.hasOwnProperty(k)) delete oL[k];
					} else {
						localStorage.removeItem(k)
					}
				}
			},
			session : {
				simulated : function() { return gimbals.ss; },
				data : function() { return (gimbals.ss)? oS : sessionStorage; },
				get : function(k) {
					if(gimbals.ss){
						return (oS.hasOwnProperty(k))? oS[k] : null;
					} else {
						return sessionStorage.getItem(k);
					}
				},
				set : function(k,v) {
					if(gimbals.ss){
						oS[k] = v;
					} else {
						sessionStorage.setItem(k,v);
					}
				},
				delete : function(k) {
					if(gimbals.ss){
						if(oS.hasOwnProperty(k)) delete oS[k];
					} else {
						sessionStorage.removeItem(k)
					}
				}
			}
		},
		forms : {
			data : function() { return oF; },
			read : function() { 
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
		},
		clock : function() {
			return clock;
		}
	};
	APP.forms.read();
	return APP;
})();