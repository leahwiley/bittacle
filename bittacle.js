;var bittacle = bittacle || (function(){
	var oP={},oC={},oF={},oL={},oS={},clock=new Date,
		gimbals={ck:false,ls:false,ss:false},
		oU={
			host : window.location.hostname,
			path : window.location.pathname,
			protcol : window.location.protocol,
			query : window.location.search,
			href : window.location.href
		};
	var qString = (oU.query.length && oU.query.substring(0,1) === '?')? oU.query.substring(1) : oU.query;
	var aPairs = qString.split('&');
	for(var i=0;i<aPairs.length;i++) {
		var aKeyVal = aPairs[i].split('=');
		if(aKeyVal[0].trim().length){
			oP[aKeyVal[0].trim()] = (aKeyVal[1])? aKeyVal[1].trim() : true;
		}
	}
	if(!navigator.cookieEnabled){
		document.cookie = 'testCookies';
		if(document.cookie.indexOf('testCookies') == -1) gimbals.ck = true;
	}
	try{ localStorage; } catch (err) { gimbals.ls = true; }
	try{ sessionStorage; } catch (err) { gimbals.ss = true; }
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
			get : function(k) {
				return (oC.hasOwnProperty(k))? oC[k] : null;
			},
			// set,
			// change expiration
			data : function() { return oC; }
		},
		storage : {
			local : {
				simulated : function() { return gimbals.ls; },
				data : function() { return (!gimbals.ls)? oL : localStorage; },
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
				}
			},
			session : {
				simulated : function() { return gimbals.ss; },
				data : function() { return (!gimbals.ss)? oL : sessionStorage; },
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
				}
			}
		},
		forms : function() { return oF; },
		clock : function() {
			return clock;
		},
		read : function() {
			if(!gimbals.ck) readCookies();
			readForms();
		}
	};
	APP.read();
	return APP;
})();
/*
			expire:function(name,daysToLive){
				cookieValue = APP.read(name);
				if(cookieValue || typeof cookieValue === 'string'){
					// Only edit the expiration of an existing cookie without altering its value
					APP.update(name,APP.read(name),daysToLive);
				}
			},
			create:function(name,value,daysToLive,encodeValue) {
				//console.log(name+', '+value+', '+daysToLive+', '+encodeValue);
				value = value || '';
				encodeValue = encodeValue || false;
				if(typeof value === 'string') value = value.trim();
				if(encodeValue) value = encodeURIComponent(value);
				//console.log(value);
				var cookieString = name+'='+value+'; path=/';
				if(daysToLive && $.isNumeric(daysToLive)){
					var expireDate = new Date();
					expireDate.setTime(expireDate.getTime()+(daysToLive*24*60*60*1000));
					cookieString += '; expires='+expireDate.toGMTString();
				}
				document.cookie = cookieString;
				APP.refresh();
			},
			new:function(settings) {
				// Example: {name: 'stuff', value: 'stuff', encodeValue: 'stuff', daysToLive: 1, minutesToLive: 0}
				// console.log(name+', '+value+', '+daysToLive+', '+encodeValue);

				// Use local variables so we don't have to type "settings.something" all the time.
				var name = settings.name || '',
					value = settings.value || false,
					encodeValue = settings.encodeValue || false,
					daysToLive = settings.daysToLive,
					minutesToLive = settings.minutesToLive;

				// Encode value if necessary.
				if(typeof value === 'string') value = value.trim();
				if(encodeValue) value = encodeURIComponent(value);

				// Establish beginning of cookie string.
				var cookieString = name+'='+value+'; path=/';


				// If either days or minutes were given.
				if (daysToLive || minutesToLive) {

					var expireDate = new Date();


					// If neither of these execute, then both days and minutes were given.
					if (daysToLive) {
						expireDate.setTime(expireDate.getTime()+(parseInt(daysToLive)*24*60*60*1000));
					}
					if (minutesToLive) {
						expireDate.setTime(expireDate.getTime()+(parseInt(minutesToLive)*60*1000));
					}

					// Add to cookie string.
					cookieString += '; expires='+expireDate.toGMTString();
				}

				document.cookie = cookieString;
				APP.refresh();
			},
			destroy:function(name) {
				APP.update(name,'',-1);
			}
		}
		return APP;
	})();
*/