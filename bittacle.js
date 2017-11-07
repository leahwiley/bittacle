;var bittacle = bittacle || (function(){
	var oC={},oF={},oL={},oS={},clock=new Date,
		gimbals={ck:false,ls:false,ss:false},
		oU={
			host : window.location.hostname,
			path : window.location.pathname,
			protcol : window.location.protocol,
			query : window.location.search,
			href : window.location.href,
			params : {}
		};
	var qString = (oU.query.length && oU.query.substring(0,1) === '?')? oU.query.substring(1) : oU.query;
	var aPairs = qString.split('&');
	for(var i=0;i<aPairs.length;i++) {
		var aKeyVal = aPairs[i].split('=');
		if(aKeyVal[0].trim().length){
			oU.params[aKeyVal[0].trim()] = (aKeyVal[1])? aKeyVal[1].trim() : true;
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
		clock : function() {
			return clock;
		},
		isSimulated : function() {
			return gimbals;
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
	AECookie = (function(){
		var APP = {
			init:function() {
				APP.props = {};
				APP.refresh();
			},
			refresh:function() {
				//console.log(document.cookie);
				var arrCookies = document.cookie.split('; ');
				for(var i=0;i<arrCookies.length;i++) {
					var arrCookie = arrCookies[i].split('=');
					APP.props[arrCookie[0]] = arrCookie[1];
				}
				//console.log(APP.props);
			},
			read:function(name) {
				APP.refresh();
				if (name && name.length){
					return APP.props[name];
				} else {
					return APP.props;
				}
			},
			update:function(name,value,daysToLive,encodeValue) {
				// THIS FUNCTION ALWAYS RESETS THE VALUE AND EXPIRATION OF THE COOKIE
				APP.create(name,value,daysToLive,encodeValue);
			},
			exists:function(name){
				var exists = (document.cookie.indexOf(name) > -1) ? true : false;
				return exists;
			},
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