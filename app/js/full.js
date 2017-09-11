!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){e.extend(e.fn,{validate:function(t){if(!this.length)return void (t&&t.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var n=e.data(this[0],"validator");return n?n:(this.attr("novalidate","novalidate"),n=new e.validator(t,this[0]),e.data(this[0],"validator",n),n.settings.onsubmit&&(this.validateDelegate(":submit","click",function(t){n.settings.submitHandler&&(n.submitButton=t.target),e(t.target).hasClass("cancel")&&(n.cancelSubmit=!0),void 0!==e(t.target).attr("formnovalidate")&&(n.cancelSubmit=!0)}),this.submit(function(t){function r(){var r;return n.settings.submitHandler?(n.submitButton&&(r=e("<input type='hidden'/>").attr("name",n.submitButton.name).val(e(n.submitButton).val()).appendTo(n.currentForm)),n.settings.submitHandler.call(n,n.currentForm,t),n.submitButton&&r.remove(),!1):!0}return n.settings.debug&&t.preventDefault(),n.cancelSubmit?(n.cancelSubmit=!1,r()):n.form()?n.pendingRequest?(n.formSubmitted=!0,!1):r():(n.focusInvalid(),!1)})),n)},valid:function(){var t,n;return e(this[0]).is("form")?t=this.validate().form():(t=!0,n=e(this[0].form).validate(),this.each(function(){t=n.element(this)&&t})),t},removeAttrs:function(t){var n={},r=this;return e.each(t.split(/\s/),function(e,t){n[t]=r.attr(t),r.removeAttr(t)}),n},rules:function(t,n){var r,i,s,o,u,f,l=this[0];if(t)switch(r=e.data(l.form,"validator").settings,i=r.rules,s=e.validator.staticRules(l),t){case"add":e.extend(s,e.validator.normalizeRule(n)),delete s.messages,i[l.name]=s,n.messages&&(r.messages[l.name]=e.extend(r.messages[l.name],n.messages));break;case"remove":return n?(f={},e.each(n.split(/\s/),function(t,n){f[n]=s[n],delete s[n],"required"===n&&e(l).removeAttr("aria-required")}),f):(delete i[l.name],s)}return o=e.validator.normalizeRules(e.extend({},e.validator.classRules(l),e.validator.attributeRules(l),e.validator.dataRules(l),e.validator.staticRules(l)),l),o.required&&(u=o.required,delete o.required,o=e.extend({required:u},o),e(l).attr("aria-required","true")),o.remote&&(u=o.remote,delete o.remote,o=e.extend(o,{remote:u})),o}}),e.extend(e.expr[":"],{blank:function(t){return!e.trim(""+e(t).val())},filled:function(t){return!!e.trim(""+e(t).val())},unchecked:function(t){return!e(t).prop("checked")}}),e.validator=function(t,n){this.settings=e.extend(!0,{},e.validator.defaults,t),this.currentForm=n,this.init()},e.validator.format=function(t,n){return 1===arguments.length?function(){var n=e.makeArray(arguments);return n.unshift(t),e.validator.format.apply(this,n)}:(arguments.length>2&&n.constructor!==Array&&(n=e.makeArray(arguments).slice(1)),n.constructor!==Array&&(n=[n]),e.each(n,function(e,n){t=t.replace(new RegExp("\\{"+e+"\\}","g"),function(){return n})}),t)},e.extend(e.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:e([]),errorLabelContainer:e([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(e){this.lastActive=e,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,e,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(e)))},onfocusout:function(e){this.checkable(e)||!(e.name in this.submitted)&&this.optional(e)||this.element(e)},onkeyup:function(e,t){(9!==t.which||""!==this.elementValue(e))&&(e.name in this.submitted||e===this.lastElement)&&this.element(e)},onclick:function(e){e.name in this.submitted?this.element(e):e.parentNode.name in this.submitted&&this.element(e.parentNode)},highlight:function(t,n,r){"radio"===t.type?this.findByName(t.name).addClass(n).removeClass(r):e(t).addClass(n).removeClass(r)},unhighlight:function(t,n,r){"radio"===t.type?this.findByName(t.name).removeClass(n).addClass(r):e(t).removeClass(n).addClass(r)}},setDefaults:function(t){e.extend(e.validator.defaults,t)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:e.validator.format("Please enter no more than {0} characters."),minlength:e.validator.format("Please enter at least {0} characters."),rangelength:e.validator.format("Please enter a value between {0} and {1} characters long."),range:e.validator.format("Please enter a value between {0} and {1}."),max:e.validator.format("Please enter a value less than or equal to {0}."),min:e.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function t(t){var n=e.data(this[0].form,"validator"),r="on"+t.type.replace(/^validate/,""),i=n.settings;i[r]&&!this.is(i.ignore)&&i[r].call(n,this[0],t)}this.labelContainer=e(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||e(this.currentForm),this.containers=e(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var n,r=this.groups={};e.each(this.settings.groups,function(t,n){"string"==typeof n&&(n=n.split(/\s/)),e.each(n,function(e,n){r[n]=t})}),n=this.settings.rules,e.each(n,function(t,r){n[t]=e.validator.normalizeRule(r)}),e(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",t).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",t),this.settings.invalidHandler&&e(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),e(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),e.extend(this.submitted,this.errorMap),this.invalid=e.extend({},this.errorMap),this.valid()||e(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var e=0,t=this.currentElements=this.elements();t[e];e++)this.check(t[e]);return this.valid()},element:function(t){var n=this.clean(t),r=this.validationTargetFor(n),i=!0;return this.lastElement=r,void 0===r?delete this.invalid[n.name]:(this.prepareElement(r),this.currentElements=e(r),i=this.check(r)!==!1,i?delete this.invalid[r.name]:this.invalid[r.name]=!0),e(t).attr("aria-invalid",!i),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),i},showErrors:function(t){if(t){e.extend(this.errorMap,t),this.errorList=[];for(var n in t)this.errorList.push({message:t[n],element:this.findByName(n)[0]});this.successList=e.grep(this.successList,function(e){return!(e.name in t)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){e.fn.resetForm&&e(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(e){var t,n=0;for(t in e)n++;return n},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(e){e.not(this.containers).text(""),this.addWrapper(e).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{e(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(t){}},findLastActive:function(){var t=this.lastActive;return t&&1===e.grep(this.errorList,function(e){return e.element.name===t.name}).length&&t},elements:function(){var t=this,n={};return e(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&t.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in n||!t.objectLength(e(this).rules())?!1:(n[this.name]=!0,!0)})},clean:function(t){return e(t)[0]},errors:function(){var t=this.settings.errorClass.split(" ").join(".");return e(this.settings.errorElement+"."+t,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=e([]),this.toHide=e([]),this.currentElements=e([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(e){this.reset(),this.toHide=this.errorsFor(e)},elementValue:function(t){var n,r=e(t),i=t.type;return"radio"===i||"checkbox"===i?e("input[name='"+t.name+"']:checked").val():"number"===i&&"undefined"!=typeof t.validity?t.validity.badInput?!1:r.val():(n=r.val(),"string"==typeof n?n.replace(/\r/g,""):n)},check:function(t){t=this.validationTargetFor(this.clean(t));var n,r,i,s=e(t).rules(),o=e.map(s,function(e,t){return t}).length,u=!1,f=this.elementValue(t);for(r in s){i={method:r,parameters:s[r]};try{if(n=e.validator.methods[r].call(this,f,t,i.parameters),"dependency-mismatch"===n&&1===o){u=!0;continue}if(u=!1,"pending"===n)return void (this.toHide=this.toHide.not(this.errorsFor(t)));if(!n)return this.formatAndAdd(t,i),!1}catch(l){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+t.id+", check the '"+i.method+"' method.",l),l}}if(!u)return this.objectLength(s)&&this.successList.push(t),!0},customDataMessage:function(t,n){return e(t).data("msg"+n.charAt(0).toUpperCase()+n.substring(1).toLowerCase())||e(t).data("msg")},customMessage:function(e,t){var n=this.settings.messages[e];return n&&(n.constructor===String?n:n[t])},findDefined:function(){for(var e=0;e<arguments.length;e++)if(void 0!==arguments[e])return arguments[e];return void 0},defaultMessage:function(t,n){return this.findDefined(this.customMessage(t.name,n),this.customDataMessage(t,n),!this.settings.ignoreTitle&&t.title||void 0,e.validator.messages[n],"<strong>Warning: No message defined for "+t.name+"</strong>")},formatAndAdd:function(t,n){var r=this.defaultMessage(t,n.method),i=/\$?\{(\d+)\}/g;"function"==typeof r?r=r.call(this,n.parameters,t):i.test(r)&&(r=e.validator.format(r.replace(i,"{$1}"),n.parameters)),this.errorList.push({message:r,element:t,method:n.method}),this.errorMap[t.name]=r,this.submitted[t.name]=r},addWrapper:function(e){return this.settings.wrapper&&(e=e.add(e.parent(this.settings.wrapper))),e},defaultShowErrors:function(){var e,t,n;for(e=0;this.errorList[e];e++)n=this.errorList[e],this.settings.highlight&&this.settings.highlight.call(this,n.element,this.settings.errorClass,this.settings.validClass),this.showLabel(n.element,n.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(e=0;this.successList[e];e++)this.showLabel(this.successList[e]);if(this.settings.unhighlight)for(e=0,t=this.validElements();t[e];e++)this.settings.unhighlight.call(this,t[e],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return e(this.errorList).map(function(){return this.element})},showLabel:function(t,n){var r,i,s,o=this.errorsFor(t),u=this.idOrName(t),f=e(t).attr("aria-describedby");o.length?(o.removeClass(this.settings.validClass).addClass(this.settings.errorClass),o.html(n)):(o=e("<"+this.settings.errorElement+">").attr("id",u+"-error").addClass(this.settings.errorClass).html(n||""),r=o,this.settings.wrapper&&(r=o.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(r):this.settings.errorPlacement?this.settings.errorPlacement(r,e(t)):r.insertAfter(t),o.is("label")?o.attr("for",u):0===o.parents("label[for='"+u+"']").length&&(s=o.attr("id"),f?f.match(new RegExp("\b"+s+"\b"))||(f+=" "+s):f=s,e(t).attr("aria-describedby",f),i=this.groups[t.name],i&&e.each(this.groups,function(t,n){n===i&&e("[name='"+t+"']",this.currentForm).attr("aria-describedby",o.attr("id"))}))),!n&&this.settings.success&&(o.text(""),"string"==typeof this.settings.success?o.addClass(this.settings.success):this.settings.success(o,t)),this.toShow=this.toShow.add(o)},errorsFor:function(t){var n=this.idOrName(t),r=e(t).attr("aria-describedby"),i="label[for='"+n+"'], label[for='"+n+"'] *";return r&&(i=i+", #"+r.replace(/\s+/g,", #")),this.errors().filter(i)},idOrName:function(e){return this.groups[e.name]||(this.checkable(e)?e.name:e.id||e.name)},validationTargetFor:function(e){return this.checkable(e)&&(e=this.findByName(e.name).not(this.settings.ignore)[0]),e},checkable:function(e){return/radio|checkbox/i.test(e.type)},findByName:function(t){return e(this.currentForm).find("[name='"+t+"']")},getLength:function(t,n){switch(n.nodeName.toLowerCase()){case"select":return e("option:selected",n).length;case"input":if(this.checkable(n))return this.findByName(n.name).filter(":checked").length}return t.length},depend:function(e,t){return this.dependTypes[typeof e]?this.dependTypes[typeof e](e,t):!0},dependTypes:{"boolean":function(e){return e},string:function(t,n){return!!e(t,n.form).length},"function":function(e,t){return e(t)}},optional:function(t){var n=this.elementValue(t);return!e.validator.methods.required.call(this,n,t)&&"dependency-mismatch"},startRequest:function(e){this.pending[e.name]||(this.pendingRequest++,this.pending[e.name]=!0)},stopRequest:function(t,n){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[t.name],n&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(e(this.currentForm).submit(),this.formSubmitted=!1):!n&&0===this.pendingRequest&&this.formSubmitted&&(e(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(t){return e.data(t,"previousValue")||e.data(t,"previousValue",{old:null,valid:!0,message:this.defaultMessage(t,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(t,n){t.constructor===String?this.classRuleSettings[t]=n:e.extend(this.classRuleSettings,t)},classRules:function(t){var n={},r=e(t).attr("class");return r&&e.each(r.split(" "),function(){this in e.validator.classRuleSettings&&e.extend(n,e.validator.classRuleSettings[this])}),n},attributeRules:function(t){var n,r,i={},s=e(t),o=t.getAttribute("type");for(n in e.validator.methods)"required"===n?(r=t.getAttribute(n),""===r&&(r=!0),r=!!r):r=s.attr(n),/min|max/.test(n)&&(null===o||/number|range|text/.test(o))&&(r=Number(r)),r||0===r?i[n]=r:o===n&&"range"!==o&&(i[n]=!0);return i.maxlength&&/-1|2147483647|524288/.test(i.maxlength)&&delete i.maxlength,i},dataRules:function(t){var n,r,i={},s=e(t);for(n in e.validator.methods)r=s.data("rule"+n.charAt(0).toUpperCase()+n.substring(1).toLowerCase()),void 0!==r&&(i[n]=r);return i},staticRules:function(t){var n={},r=e.data(t.form,"validator");return r.settings.rules&&(n=e.validator.normalizeRule(r.settings.rules[t.name])||{}),n},normalizeRules:function(t,n){return e.each(t,function(r,i){if(i===!1)return void delete t[r];if(i.param||i.depends){var s=!0;switch(typeof i.depends){case"string":s=!!e(i.depends,n.form).length;break;case"function":s=i.depends.call(n,n)}s?t[r]=void 0!==i.param?i.param:!0:delete t[r]}}),e.each(t,function(r,i){t[r]=e.isFunction(i)?i(n):i}),e.each(["minlength","maxlength"],function(){t[this]&&(t[this]=Number(t[this]))}),e.each(["rangelength","range"],function(){var n;t[this]&&(e.isArray(t[this])?t[this]=[Number(t[this][0]),Number(t[this][1])]:"string"==typeof t[this]&&(n=t[this].replace(/[\[\]]/g,"").split(/[\s,]+/),t[this]=[Number(n[0]),Number(n[1])]))}),e.validator.autoCreateRanges&&(t.min&&t.max&&(t.range=[t.min,t.max],delete t.min,delete t.max),t.minlength&&t.maxlength&&(t.rangelength=[t.minlength,t.maxlength],delete t.minlength,delete t.maxlength)),t},normalizeRule:function(t){if("string"==typeof t){var n={};e.each(t.split(/\s/),function(){n[this]=!0}),t=n}return t},addMethod:function(t,n,r){e.validator.methods[t]=n,e.validator.messages[t]=void 0!==r?r:e.validator.messages[t],n.length<3&&e.validator.addClassRules(t,e.validator.normalizeRule(t))},methods:{required:function(t,n,r){if(!this.depend(r,n))return"dependency-mismatch";if("select"===n.nodeName.toLowerCase()){var i=e(n).val();return i&&i.length>0}return this.checkable(n)?this.getLength(t,n)>0:e.trim(t).length>0},email:function(e,t){return this.optional(t)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)},url:function(e,t){return this.optional(t)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)},date:function(e,t){return this.optional(t)||!/Invalid|NaN/.test((new Date(e)).toString())},dateISO:function(e,t){return this.optional(t)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)},number:function(e,t){return this.optional(t)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)},digits:function(e,t){return this.optional(t)||/^\d+$/.test(e)},creditcard:function(e,t){if(this.optional(t))return"dependency-mismatch";if(/[^0-9 \-]+/.test(e))return!1;var n,r,i=0,s=0,o=!1;if(e=e.replace(/\D/g,""),e.length<13||e.length>19)return!1;for(n=e.length-1;n>=0;n--)r=e.charAt(n),s=parseInt(r,10),o&&(s*=2)>9&&(s-=9),i+=s,o=!o;return i%10===0},minlength:function(t,n,r){var i=e.isArray(t)?t.length:this.getLength(e.trim(t),n);return this.optional(n)||i>=r},maxlength:function(t,n,r){var i=e.isArray(t)?t.length:this.getLength(e.trim(t),n);return this.optional(n)||r>=i},rangelength:function(t,n,r){var i=e.isArray(t)?t.length:this.getLength(e.trim(t),n);return this.optional(n)||i>=r[0]&&i<=r[1]},min:function(e,t,n){return this.optional(t)||e>=n},max:function(e,t,n){return this.optional(t)||n>=e},range:function(e,t,n){return this.optional(t)||e>=n[0]&&e<=n[1]},equalTo:function(t,n,r){var i=e(r);return this.settings.onfocusout&&i.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){e(n).valid()}),t===i.val()},remote:function(t,n,r){if(this.optional(n))return"dependency-mismatch";var i,s,o=this.previousValue(n);return this.settings.messages[n.name]||(this.settings.messages[n.name]={}),o.originalMessage=this.settings.messages[n.name].remote,this.settings.messages[n.name].remote=o.message,r="string"==typeof r&&{url:r}||r,o.old===t?o.valid:(o.old=t,i=this,this.startRequest(n),s={},s[n.name]=t,e.ajax(e.extend(!0,{url:r,mode:"abort",port:"validate"+n.name,dataType:"json",data:s,context:i.currentForm,success:function(r){var s,u,f,l=r===!0||"true"===r;i.settings.messages[n.name].remote=o.originalMessage,l?(f=i.formSubmitted,i.prepareElement(n),i.formSubmitted=f,i.successList.push(n),delete i.invalid[n.name],i.showErrors()):(s={},u=r||i.defaultMessage(n,"remote"),s[n.name]=o.message=e.isFunction(u)?u(t):u,i.invalid[n.name]=!0,i.showErrors(s)),o.valid=l,i.stopRequest(n,l)}},r)),"pending")}}}),e.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."};var t,n={};e.ajaxPrefilter?e.ajaxPrefilter(function(e,t,r){var i=e.port;"abort"===e.mode&&(n[i]&&n[i].abort(),n[i]=r)}):(t=e.ajax,e.ajax=function(r){var i=("mode"in r?r:e.ajaxSettings).mode,s=("port"in r?r:e.ajaxSettings).port;return"abort"===i?(n[s]&&n[s].abort(),n[s]=t.apply(this,arguments),n[s]):t.apply(this,arguments)}),e.extend(e.fn,{validateDelegate:function(t,n,r){return this.bind(n,function(n){var i=e(n.target);return i.is(t)?r.apply(i,arguments):void 0})}})});!function(e){"function"==typeof define&&define.amd?define(["jquery","../jquery.validate.min"],e):e(jQuery)}(function(e){e.extend(e.validator.messages,{required:"Ce champ est obligatoire.",remote:"Veuillez corriger ce champ.",email:"Veuillez fournir une adresse électronique valide.",url:"Veuillez fournir une adresse URL valide.",date:"Veuillez fournir une date valide.",dateISO:"Veuillez fournir une date valide (ISO).",number:"Veuillez fournir un numéro valide.",digits:"Veuillez fournir seulement des chiffres.",creditcard:"Veuillez fournir un numéro de carte de crédit valide.",equalTo:"Veuillez fournir encore la même valeur.",extension:"Veuillez fournir une valeur avec une extension valide.",maxlength:e.validator.format("Veuillez fournir au plus {0} caractères."),minlength:e.validator.format("Veuillez fournir au moins {0} caractères."),rangelength:e.validator.format("Veuillez fournir une valeur qui contient entre {0} et {1} caractères."),range:e.validator.format("Veuillez fournir une valeur entre {0} et {1}."),max:e.validator.format("Veuillez fournir une valeur inférieure ou égale à {0}."),min:e.validator.format("Veuillez fournir une valeur supérieure ou égale à {0}."),maxWords:e.validator.format("Veuillez fournir au plus {0} mots."),minWords:e.validator.format("Veuillez fournir au moins {0} mots."),rangeWords:e.validator.format("Veuillez fournir entre {0} et {1} mots."),letterswithbasicpunc:"Veuillez fournir seulement des lettres et des signes de ponctuation.",alphanumeric:"Veuillez fournir seulement des lettres, nombres, espaces et soulignages.",lettersonly:"Veuillez fournir seulement des lettres.",nowhitespace:"Veuillez ne pas inscrire d'espaces blancs.",ziprange:"Veuillez fournir un code postal entre 902xx-xxxx et 905-xx-xxxx.",integer:"Veuillez fournir un nombre non décimal qui est positif ou négatif.",vinUS:"Veuillez fournir un numéro d'identification du véhicule (VIN).",dateITA:"Veuillez fournir une date valide.",time:"Veuillez fournir une heure valide entre 00:00 et 23:59.",phoneUS:"Veuillez fournir un numéro de téléphone valide.",phoneUK:"Veuillez fournir un numéro de téléphone valide.",mobileUK:"Veuillez fournir un numéro de téléphone mobile valide.",strippedminlength:e.validator.format("Veuillez fournir au moins {0} caractères."),email2:"Veuillez fournir une adresse électronique valide.",url2:"Veuillez fournir une adresse URL valide.",creditcardtypes:"Veuillez fournir un numéro de carte de crédit valide.",ipv4:"Veuillez fournir une adresse IP v4 valide.",ipv6:"Veuillez fournir une adresse IP v6 valide.",require_from_group:"Veuillez fournir au moins {0} de ces champs.",nifES:"Veuillez fournir un numéro NIF valide.",nieES:"Veuillez fournir un numéro NIE valide.",cifES:"Veuillez fournir un numéro CIF valide.",postalCodeCA:"Veuillez fournir un code postal valide.",maxfilesize:"La taille maximale de {0}{1} est atteinte"})});!function(e){"function"==typeof define&&define.amd?define("picker",["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):this.Picker=e(jQuery)}(function(e){function t(s,o,u,l){function h(){return t._.node("div",t._.node("div",t._.node("div",t._.node("div",N.component.nodes(w.open),S.box),S.wrap),S.frame),S.holder)}function p(){x.data(o,N).addClass(S.input).val(x.data("value")?N.get("select",E.format):s.value).on("focus."+w.id+" click."+w.id,g),E.editable||x.on("keydown."+w.id,function(e){var t=e.keyCode,n=/^(8|46)$/.test(t);return 27==t?(N.close(),!1):void ((32==t||n||!w.open&&N.component.key[t])&&(e.preventDefault(),e.stopPropagation(),n?N.clear().close():N.open()))}),i(s,{haspopup:!0,expanded:!1,readonly:!1,owns:s.id+"_root"+(N._hidden?" "+N._hidden.id:"")})}function v(){N.$root.on({focusin:function(e){N.$root.removeClass(S.focused),e.stopPropagation()},"mousedown click":function(t){var n=t.target;n!=N.$root.children()[0]&&(t.stopPropagation(),"mousedown"!=t.type||e(n).is(":input")||"OPTION"==n.nodeName||(t.preventDefault(),s.focus()))}}).on("click","[data-pick], [data-nav], [data-clear]",function(){var n=e(this),r=n.data(),i=n.hasClass(S.navDisabled)||n.hasClass(S.disabled),o=document.activeElement;o=o&&(o.type||o.href)&&o,(i||o&&!e.contains(N.$root[0],o))&&s.focus(),r.nav&&!i?N.set("highlight",N.component.item.highlight,{nav:r.nav}):t._.isInteger(r.pick)&&!i?N.set("select",r.pick).close(!0):r.clear&&N.clear().close(!0)}).on("click","[data-close]",function(){N.close(!0)}),i(N.$root[0],"hidden",!0)}function m(){var t;E.hiddenName===!0?(t=s.name,s.name=""):(t=["string"==typeof E.hiddenPrefix?E.hiddenPrefix:"","string"==typeof E.hiddenSuffix?E.hiddenSuffix:"_submit"],t=t[0]+s.name+t[1]),N._hidden=e('<input type=hidden name="'+t+'"'+(s.id?'id="'+s.id+'_hidden"':"")+(x.data("value")||s.value?' value="'+N.get("select",E.formatSubmit)+'"':"")+">")[0],x.on("change."+w.id,function(){N._hidden.value=s.value?N.get("select",E.formatSubmit):""}).after(N._hidden)}function g(e){e.stopPropagation(),"focus"==e.type&&N.$root.addClass(S.focused),N.open()}if(!s)return t;var y=!1,w={id:s.id||"P"+Math.abs(~~(Math.random()*new Date))},E=u?e.extend(!0,{},u.defaults,l):l||{},S=e.extend({},t.klasses(),E.klass),x=e(s),T=function(){return this.start()},N=T.prototype={constructor:T,$node:x,start:function(){return w&&w.start?N:(w.methods={},w.start=!0,w.open=!1,w.type=s.type,s.autofocus=s==document.activeElement,s.readOnly=!E.editable,s.id=s.id||w.id,"text"!=s.type&&(s.type="text"),N.component=new u(N,E),N.$root=e(t._.node("div",h(),S.picker,'id="'+s.id+'_root"')),v(),E.formatSubmit&&m(),p(),E.container?e(E.container).append(N.$root):x.after(N.$root),N.on({start:N.component.onStart,render:N.component.onRender,stop:N.component.onStop,open:N.component.onOpen,close:N.component.onClose,set:N.component.onSet}).on({start:E.onStart,render:E.onRender,stop:E.onStop,open:E.onOpen,close:E.onClose,set:E.onSet}),y=n(N.$root.children()[0]),s.autofocus&&N.open(),N.trigger("start").trigger("render"))},render:function(e){return e?N.$root.html(h()):N.$root.find("."+S.box).html(N.component.nodes(w.open)),N.trigger("render")},stop:function(){return w.start?(N.close(),N._hidden&&N._hidden.parentNode.removeChild(N._hidden),N.$root.remove(),x.removeClass(S.input).removeData(o),setTimeout(function(){x.off("."+w.id)},0),s.type=w.type,s.readOnly=!1,N.trigger("stop"),w.methods={},w.start=!1,N):N},open:function(n){return w.open?N:(x.addClass(S.active),i(s,"expanded",!0),setTimeout(function(){N.$root.addClass(S.opened),i(N.$root[0],"hidden",!1)},0),n!==!1&&(w.open=!0,y&&f.css("overflow","hidden").css("padding-right","+="+r()),x.trigger("focus"),a.on("click."+w.id+" focusin."+w.id,function(e){var t=e.target;t!=s&&t!=document&&3!=e.which&&N.close(t===N.$root.children()[0])}).on("keydown."+w.id,function(n){var r=n.keyCode,i=N.component.key[r],o=n.target;27==r?N.close(!0):o!=s||!i&&13!=r?e.contains(N.$root[0],o)&&13==r&&(n.preventDefault(),o.click()):(n.preventDefault(),i?t._.trigger(N.component.key.go,N,[t._.trigger(i)]):N.$root.find("."+S.highlighted).hasClass(S.disabled)||N.set("select",N.component.item.highlight).close())})),N.trigger("open"))},close:function(e){return e&&(x.off("focus."+w.id).trigger("focus"),setTimeout(function(){x.on("focus."+w.id,g)},0)),x.removeClass(S.active),i(s,"expanded",!1),setTimeout(function(){N.$root.removeClass(S.opened+" "+S.focused),i(N.$root[0],"hidden",!0)},0),w.open?(w.open=!1,y&&f.css("overflow","").css("padding-right","-="+r()),a.off("."+w.id),N.trigger("close")):N},clear:function(e){return N.set("clear",null,e)},set:function(t,n,r){var i,s,o=e.isPlainObject(t),u=o?t:{};if(r=o&&e.isPlainObject(n)?n:r||{},t){o||(u[t]=n);for(i in u)s=u[i],i in N.component.item&&(void 0===s&&(s=null),N.component.set(i,s,r)),("select"==i||"clear"==i)&&x.val("clear"==i?"":N.get(i,E.format)).trigger("change");N.render()}return r.muted?N:N.trigger("set",u)},get:function(e,n){if(e=e||"value",null!=w[e])return w[e];if("value"==e)return s.value;if(e in N.component.item){if("string"==typeof n){var r=N.component.get(e);return r?t._.trigger(N.component.formats.toString,N.component,[n,r]):""}return N.component.get(e)}},on:function(t,n,r){var i,s,o=e.isPlainObject(t),u=o?t:{};if(t){o||(u[t]=n);for(i in u)s=u[i],r&&(i="_"+i),w.methods[i]=w.methods[i]||[],w.methods[i].push(s)}return N},off:function(){var e,t,n=arguments;for(e=0,namesCount=n.length;namesCount>e;e+=1)t=n[e],t in w.methods&&delete w.methods[t];return N},trigger:function(e,n){var r=function(e){var r=w.methods[e];r&&r.map(function(e){t._.trigger(e,N,[n])})};return r("_"+e),r(e),N}};return new T}function n(e){var t,n="position";return e.currentStyle?t=e.currentStyle[n]:window.getComputedStyle&&(t=getComputedStyle(e)[n]),"fixed"==t}function r(){if(f.height()<=u.height())return 0;var t=e('<div style="visibility:hidden;width:100px" />').appendTo("body"),n=t[0].offsetWidth;t.css("overflow","scroll");var r=e('<div style="width:100%" />').appendTo(t),i=r[0].offsetWidth;return t.remove(),n-i}function i(t,n,r){if(e.isPlainObject(n))for(var i in n)s(t,i,n[i]);else s(t,n,r)}function s(e,t,n){e.setAttribute(("role"==t?"":"aria-")+t,n)}function o(t,n){e.isPlainObject(t)||(t={attribute:n}),n="";for(var r in t){var i=("role"==r?"":"aria-")+r,s=t[r];n+=null==s?"":i+'="'+t[r]+'"'}return n}var u=e(window),a=e(document),f=e(document.documentElement);return t.klasses=function(e){return e=e||"picker",{picker:e,opened:e+"--opened",focused:e+"--focused",input:e+"__input",active:e+"__input--active",holder:e+"__holder",frame:e+"__frame",wrap:e+"__wrap",box:e+"__box"}},t._={group:function(e){for(var n,r="",i=t._.trigger(e.min,e);i<=t._.trigger(e.max,e,[i]);i+=e.i)n=t._.trigger(e.item,e,[i]),r+=t._.node(e.node,n[0],n[1],n[2]);return r},node:function(t,n,r,i){return n?(n=e.isArray(n)?n.join(""):n,r=r?' class="'+r+'"':"",i=i?" "+i:"","<"+t+r+i+">"+n+"</"+t+">"):""},lead:function(e){return(10>e?"0":"")+e},trigger:function(e,t,n){return"function"==typeof e?e.apply(t,n||[]):e},digits:function(e){return/\d/.test(e[1])?2:1},isDate:function(e){return{}.toString.call(e).indexOf("Date")>-1&&this.isInteger(e.getDate())},isInteger:function(e){return{}.toString.call(e).indexOf("Number")>-1&&e%1===0},ariaAttr:o},t.extend=function(n,r){e.fn[n]=function(i,s){var o=this.data(n);return"picker"==i?o:o&&"string"==typeof i?t._.trigger(o[i],o,[s]):this.each(function(){var s=e(this);s.data(n)||new t(this,n,r,i)})},e.fn[n].defaults=r.defaults},t});!function(e){"function"==typeof define&&define.amd?define(["picker","jquery"],e):"object"==typeof exports?module.exports=e(require("./picker.js"),require("jquery")):e(Picker,jQuery)}(function(e,t){function n(e,t){var n=this,r=e.$node[0],i=r.value,s=e.$node.data("value"),o=s||i,u=s?t.formatSubmit:t.format,a=function(){return r.currentStyle?"rtl"==r.currentStyle.direction:"rtl"==getComputedStyle(e.$root[0]).direction};n.settings=t,n.$node=e.$node,n.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate",view:"parse create validate viewset",disable:"deactivate",enable:"activate"},n.item={},n.item.clear=null,n.item.disable=(t.disable||[]).slice(0),n.item.enable=-function(e){return e[0]===!0?e.shift():-1}(n.item.disable),n.set("min",t.min).set("max",t.max).set("now"),o?n.set("select",o,{format:u}):n.set("select",null).set("highlight",n.item.now),n.key={40:7,38:-7,39:function(){return a()?-1:1},37:function(){return a()?1:-1},go:function(e){var t=n.item.highlight,r=new Date(t.year,t.month,t.date+e);n.set("highlight",[r.getFullYear(),r.getMonth(),r.getDate()],{interval:e}),this.render()}},e.on("render",function(){e.$root.find("."+t.klass.selectMonth).on("change",function(){var n=this.value;n&&(e.set("highlight",[e.get("view").year,n,e.get("highlight").date]),e.$root.find("."+t.klass.selectMonth).trigger("focus"))}),e.$root.find("."+t.klass.selectYear).on("change",function(){var n=this.value;n&&(e.set("highlight",[n,e.get("view").month,e.get("highlight").date]),e.$root.find("."+t.klass.selectYear).trigger("focus"))})},1).on("open",function(){var r="";n.disabled(n.get("now"))&&(r=":not(."+t.klass.buttonToday+")"),e.$root.find("button"+r+", select").attr("disabled",!1)},1).on("close",function(){e.$root.find("button, select").attr("disabled",!0)},1)}var r=7,i=6,s=e._;n.prototype.set=function(e,t,n){var r=this,i=r.item;return null===t?("clear"==e&&(e="select"),i[e]=t,r):(i["enable"==e?"disable":"flip"==e?"enable":e]=r.queue[e].split(" ").map(function(i){return t=r[i](e,t,n)}).pop(),"select"==e?r.set("highlight",i.select,n):"highlight"==e?r.set("view",i.highlight,n):e.match(/^(flip|min|max|disable|enable)$/)&&(i.select&&r.disabled(i.select)&&r.set("select",i.select,n),i.highlight&&r.disabled(i.highlight)&&r.set("highlight",i.highlight,n)),r)},n.prototype.get=function(e){return this.item[e]},n.prototype.create=function(e,n,r){var i,o=this;return n=void 0===n?e:n,n==-1/0||1/0==n?i=n:t.isPlainObject(n)&&s.isInteger(n.pick)?n=n.obj:t.isArray(n)?(n=new Date(n[0],n[1],n[2]),n=s.isDate(n)?n:o.create().obj):n=s.isInteger(n)||s.isDate(n)?o.normalize(new Date(n),r):o.now(e,n,r),{year:i||n.getFullYear(),month:i||n.getMonth(),date:i||n.getDate(),day:i||n.getDay(),obj:i||n,pick:i||n.getTime()}},n.prototype.createRange=function(e,n){var r=this,i=function(e){return e===!0||t.isArray(e)||s.isDate(e)?r.create(e):e};return s.isInteger(e)||(e=i(e)),s.isInteger(n)||(n=i(n)),s.isInteger(e)&&t.isPlainObject(n)?e=[n.year,n.month,n.date+e]:s.isInteger(n)&&t.isPlainObject(e)&&(n=[e.year,e.month,e.date+n]),{from:i(e),to:i(n)}},n.prototype.withinRange=function(e,t){return e=this.createRange(e.from,e.to),t.pick>=e.from.pick&&t.pick<=e.to.pick},n.prototype.overlapRanges=function(e,t){var n=this;return e=n.createRange(e.from,e.to),t=n.createRange(t.from,t.to),n.withinRange(e,t.from)||n.withinRange(e,t.to)||n.withinRange(t,e.from)||n.withinRange(t,e.to)},n.prototype.now=function(e,t,n){return t=new Date,n&&n.rel&&t.setDate(t.getDate()+n.rel),this.normalize(t,n)},n.prototype.navigate=function(e,n,r){var i,s,o,u,a=t.isArray(n),f=t.isPlainObject(n),l=this.item.view;if(a||f){for(f?(s=n.year,o=n.month,u=n.date):(s=+n[0],o=+n[1],u=+n[2]),r&&r.nav&&l&&l.month!==o&&(s=l.year,o=l.month),i=new Date(s,o+(r&&r.nav?r.nav:0),1),s=i.getFullYear(),o=i.getMonth();(new Date(s,o,u)).getMonth()!==o;)u-=1;n=[s,o,u]}return n},n.prototype.normalize=function(e){return e.setHours(0,0,0,0),e},n.prototype.measure=function(e,t){var n=this;return t?"string"==typeof t?t=n.parse(e,t):s.isInteger(t)&&(t=n.now(e,t,{rel:t})):t="min"==e?-1/0:1/0,t},n.prototype.viewset=function(e,t){return this.create([t.year,t.month,1])},n.prototype.validate=function(e,n,r){var i,o,u,a,l=this,c=n,h=r&&r.interval?r.interval:1,p=-1===l.item.enable,d=l.item.min,v=l.item.max,m=p&&l.item.disable.filter(function(e){if(t.isArray(e)){var r=l.create(e).pick;r<n.pick?i=!0:r>n.pick&&(o=!0)}return s.isInteger(e)}).length;if((!r||!r.nav)&&(!p&&l.disabled(n)||p&&l.disabled(n)&&(m||i||o)||!p&&(n.pick<=d.pick||n.pick>=v.pick)))for(p&&!m&&(!o&&h>0||!i&&0>h)&&(h*=-1);l.disabled(n)&&(Math.abs(h)>1&&(n.month<c.month||n.month>c.month)&&(n=c,h=h>0?1:-1),n.pick<=d.pick?(u=!0,h=1,n=l.create([d.year,d.month,d.date+(n.pick===d.pick?0:-1)])):n.pick>=v.pick&&(a=!0,h=-1,n=l.create([v.year,v.month,v.date+(n.pick===v.pick?0:1)])),!u||!a);)n=l.create([n.year,n.month,n.date+h]);return n},n.prototype.disabled=function(e){var n=this,r=n.item.disable.filter(function(r){return s.isInteger(r)?e.day===(n.settings.firstDay?r:r-1)%7:t.isArray(r)||s.isDate(r)?e.pick===n.create(r).pick:t.isPlainObject(r)?n.withinRange(r,e):void 0});return r=r.length&&!r.filter(function(e){return t.isArray(e)&&"inverted"==e[3]||t.isPlainObject(e)&&e.inverted}).length,-1===n.item.enable?!r:r||e.pick<n.item.min.pick||e.pick>n.item.max.pick},n.prototype.parse=function(e,t,n){var r=this,i={};return t&&"string"==typeof t?(n&&n.format||(n=n||{},n.format=r.settings.format),r.formats.toArray(n.format).map(function(e){var n=r.formats[e],o=n?s.trigger(n,r,[t,i]):e.replace(/^!/,"").length;n&&(i[e]=t.substr(0,o)),t=t.substr(o)}),[i.yyyy||i.yy,+(i.mm||i.m)-1,i.dd||i.d]):t},n.prototype.formats=function(){function e(e,t,n){var r=e.match(/\w+/)[0];return n.mm||n.m||(n.m=t.indexOf(r)+1),r.length}function t(e){return e.match(/\w+/)[0].length}return{d:function(e,t){return e?s.digits(e):t.date},dd:function(e,t){return e?2:s.lead(t.date)},ddd:function(e,n){return e?t(e):this.settings.weekdaysShort[n.day]},dddd:function(e,n){return e?t(e):this.settings.weekdaysFull[n.day]},m:function(e,t){return e?s.digits(e):t.month+1},mm:function(e,t){return e?2:s.lead(t.month+1)},mmm:function(t,n){var r=this.settings.monthsShort;return t?e(t,r,n):r[n.month]},mmmm:function(t,n){var r=this.settings.monthsFull;return t?e(t,r,n):r[n.month]},yy:function(e,t){return e?2:(""+t.year).slice(2)},yyyy:function(e,t){return e?4:t.year},toArray:function(e){return e.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(e,t){var n=this;return n.formats.toArray(e).map(function(e){return s.trigger(n.formats[e],n,[0,t])||e.replace(/^!/,"")}).join("")}}}(),n.prototype.isDateExact=function(e,n){var r=this;return s.isInteger(e)&&s.isInteger(n)||"boolean"==typeof e&&"boolean"==typeof n?e===n:(s.isDate(e)||t.isArray(e))&&(s.isDate(n)||t.isArray(n))?r.create(e).pick===r.create(n).pick:t.isPlainObject(e)&&t.isPlainObject(n)?r.isDateExact(e.from,n.from)&&r.isDateExact(e.to,n.to):!1},n.prototype.isDateOverlap=function(e,n){var r=this,i=r.settings.firstDay?1:0;return s.isInteger(e)&&(s.isDate(n)||t.isArray(n))?(e=e%7+i,e===r.create(n).day+1):s.isInteger(n)&&(s.isDate(e)||t.isArray(e))?(n=n%7+i,n===r.create(e).day+1):t.isPlainObject(e)&&t.isPlainObject(n)?r.overlapRanges(e,n):!1},n.prototype.flipEnable=function(e){var t=this.item;t.enable=e||(-1==t.enable?1:-1)},n.prototype.deactivate=function(e,n){var r=this,i=r.item.disable.slice(0);return"flip"==n?r.flipEnable():n===!1?(r.flipEnable(1),i=[]):n===!0?(r.flipEnable(-1),i=[]):n.map(function(e){for(var n,o=0;o<i.length;o+=1)if(r.isDateExact(e,i[o])){n=!0;break}n||(s.isInteger(e)||s.isDate(e)||t.isArray(e)||t.isPlainObject(e)&&e.from&&e.to)&&i.push(e)}),i},n.prototype.activate=function(e,n){var r=this,i=r.item.disable,o=i.length;return"flip"==n?r.flipEnable():n===!0?(r.flipEnable(1),i=[]):n===!1?(r.flipEnable(-1),i=[]):n.map(function(e){var n,u,a,l;for(a=0;o>a;a+=1){if(u=i[a],r.isDateExact(u,e)){n=i[a]=null,l=!0;break}if(r.isDateOverlap(u,e)){t.isPlainObject(e)?(e.inverted=!0,n=e):t.isArray(e)?(n=e,n[3]||n.push("inverted")):s.isDate(e)&&(n=[e.getFullYear(),e.getMonth(),e.getDate(),"inverted"]);break}}if(n)for(a=0;o>a;a+=1)if(r.isDateExact(i[a],e)){i[a]=null;break}if(l)for(a=0;o>a;a+=1)if(r.isDateOverlap(i[a],e)){i[a]=null;break}n&&i.push(n)}),i.filter(function(e){return null!=e})},n.prototype.nodes=function(e){var t=this,n=t.settings,o=t.item,u=o.now,a=o.select,l=o.highlight,c=o.view,h=o.disable,p=o.min,v=o.max,m=function(e,t){return n.firstDay&&(e.push(e.shift()),t.push(t.shift())),s.node("thead",s.node("tr",s.group({min:0,max:r-1,i:1,node:"th",item:function(r){return[e[r],n.klass.weekdays,'scope=col title="'+t[r]+'"']}})))}((n.showWeekdaysFull?n.weekdaysFull:n.weekdaysShort).slice(0),n.weekdaysFull.slice(0)),g=function(e){return s.node("div"," ",n.klass["nav"+(e?"Next":"Prev")]+(e&&c.year>=v.year&&c.month>=v.month||!e&&c.year<=p.year&&c.month<=p.month?" "+n.klass.navDisabled:""),"data-nav="+(e||-1)+" "+s.ariaAttr({role:"button",controls:t.$node[0].id+"_table"})+' title="'+(e?n.labelMonthNext:n.labelMonthPrev)+'"')},y=function(){var r=n.showMonthsShort?n.monthsShort:n.monthsFull;return n.selectMonths?s.node("select",s.group({min:0,max:11,i:1,node:"option",item:function(e){return[r[e],0,"value="+e+(c.month==e?" selected":"")+(c.year==p.year&&e<p.month||c.year==v.year&&e>v.month?" disabled":"")]}}),n.klass.selectMonth,(e?"":"disabled")+" "+s.ariaAttr({controls:t.$node[0].id+"_table"})+' title="'+n.labelMonthSelect+'"'):s.node("div",r[c.month],n.klass.month)},b=function(){var r=c.year,i=n.selectYears===!0?5:~~(n.selectYears/2);if(i){var o=p.year,u=v.year,a=r-i,l=r+i;if(o>a&&(l+=o-a,a=o),l>u){var h=a-o,d=l-u;a-=h>d?d:h,l=u}return s.node("select",s.group({min:a,max:l,i:1,node:"option",item:function(e){return[e,0,"value="+e+(r==e?" selected":"")]}}),n.klass.selectYear,(e?"":"disabled")+" "+s.ariaAttr({controls:t.$node[0].id+"_table"})+' title="'+n.labelYearSelect+'"')}return s.node("div",r,n.klass.year)};return s.node("div",(n.selectYears?b()+y():y()+b())+g()+g(1),n.klass.header)+s.node("table",m+s.node("tbody",s.group({min:0,max:i-1,i:1,node:"tr",item:function(e){var i=n.firstDay&&0===t.create([c.year,c.month,1]).day?-7:0;return[s.group({min:r*e-c.day+i+1,max:function(){return this.min+r-1},i:1,node:"td",item:function(e){e=t.create([c.year,c.month,e+(n.firstDay?1:0)]);var r=a&&a.pick==e.pick,i=l&&l.pick==e.pick,o=h&&t.disabled(e)||e.pick<p.pick||e.pick>v.pick;return[s.node("div",e.date,function(t){return t.push(c.month==e.month?n.klass.infocus:n.klass.outfocus),u.pick==e.pick&&t.push(n.klass.now),r&&t.push(n.klass.selected),i&&t.push(n.klass.highlighted),o&&t.push(n.klass.disabled),t.join(" ")}([n.klass.day]),"data-pick="+e.pick+" "+s.ariaAttr({role:"gridcell",selected:r&&t.$node.val()===s.trigger(t.formats.toString,t,[n.format,e])?!0:null,activedescendant:i?!0:null,disabled:o?!0:null})),"",s.ariaAttr({role:"presentation"})]}})]}})),n.klass.table,'id="'+t.$node[0].id+'_table" '+s.ariaAttr({role:"grid",controls:t.$node[0].id,readonly:!0}))+s.node("div",s.node("button",n.today,n.klass.buttonToday,"type=button data-pick="+u.pick+(e&&!t.disabled(u)?"":" disabled")+" "+s.ariaAttr({controls:t.$node[0].id}))+s.node("button",n.clear,n.klass.buttonClear,"type=button data-clear=1"+(e?"":" disabled")+" "+s.ariaAttr({controls:t.$node[0].id}))+s.node("button",n.close,n.klass.buttonClose,"type=button data-close=true "+(e?"":" disabled")+" "+s.ariaAttr({controls:t.$node[0].id})),n.klass.footer)},n.defaults=function(e){return{labelMonthNext:"Next month",labelMonthPrev:"Previous month",labelMonthSelect:"Select a month",labelYearSelect:"Select a year",monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],today:"Today",clear:"Clear",close:"Close",format:"d mmmm, yyyy",klass:{table:e+"table",header:e+"header",navPrev:e+"nav--prev",navNext:e+"nav--next",navDisabled:e+"nav--disabled",month:e+"month",year:e+"year",selectMonth:e+"select--month",selectYear:e+"select--year",weekdays:e+"weekday",day:e+"day",disabled:e+"day--disabled",selected:e+"day--selected",highlighted:e+"day--highlighted",now:e+"day--today",infocus:e+"day--infocus",outfocus:e+"day--outfocus",footer:e+"footer",buttonClear:e+"button--clear",buttonToday:e+"button--today",buttonClose:e+"button--close"}}}(e.klasses().picker+"__"),e.extend("pickadate",n)});[].map||(Array.prototype.map=function(e,t){for(var n=this,r=n.length,i=new Array(r),s=0;r>s;s++)s in n&&(i[s]=e.call(t,n[s],s,n));return i}),[].filter||(Array.prototype.filter=function(e){if(null==this)throw new TypeError;var t=Object(this),n=t.length>>>0;if("function"!=typeof e)throw new TypeError;for(var r=[],i=arguments[1],s=0;n>s;s++)if(s in t){var o=t[s];e.call(i,o,s,t)&&r.push(o)}return r}),[].indexOf||(Array.prototype.indexOf=function(e){if(null==this)throw new TypeError;var t=Object(this),n=t.length>>>0;if(0===n)return-1;var r=0;if(arguments.length>1&&(r=Number(arguments[1]),r!=r?r=0:0!==r&&1/0!=r&&r!=-1/0&&(r=(r>0||-1)*Math.floor(Math.abs(r)))),r>=n)return-1;for(var i=r>=0?r:Math.max(n-Math.abs(r),0);n>i;i++)if(i in t&&t[i]===e)return i;return-1});var nativeSplit=String.prototype.split,compliantExecNpcg=void 0===/()??/.exec("")[1];String.prototype.split=function(e,t){var n=this;if("[object RegExp]"!==Object.prototype.toString.call(e))return nativeSplit.call(n,e,t);var r,i,s,o,u=[],a=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.extended?"x":"")+(e.sticky?"y":""),f=0;for(e=new RegExp(e.source,a+"g"),n+="",compliantExecNpcg||(r=new RegExp("^"+e.source+"$(?!\\s)",a)),t=void 0===t?-1>>>0:t>>>0;(i=e.exec(n))&&(s=i.index+i[0].length,!(s>f&&(u.push(n.slice(f,i.index)),!compliantExecNpcg&&i.length>1&&i[0].replace(r,function(){for(var e=1;e<arguments.length-2;e++)void 0===arguments[e]&&(i[e]=void 0)}),i.length>1&&i.index<n.length&&Array.prototype.push.apply(u,i.slice(1)),o=i[0].length,f=s,u.length>=t)));)e.lastIndex===i.index&&e.lastIndex++;return f===n.length?(o||!e.test(""))&&u.push(""):u.push(n.slice(f)),u.length>t?u.slice(0,t):u}


window.google = window.google || {};
google.maps = google.maps || {};
(function() {
  
  function getScript(src) {
    document.write('<' + 'script src="' + src + '"><' + '/script>');
  }
  
  var modules = google.maps.modules = {};
  google.maps.__gjsload__ = function(name, text) {
    modules[name] = text;
  };
  
  google.maps.Load = function(apiLoad) {
    delete google.maps.Load;
    apiLoad([0.009999999776482582,[[["https://mts0.googleapis.com/maps/vt?lyrs=m@339000000\u0026src=api\u0026hl=fr\u0026","https://mts1.googleapis.com/maps/vt?lyrs=m@339000000\u0026src=api\u0026hl=fr\u0026"],null,null,null,null,"m@339000000",["https://mts0.google.com/maps/vt?lyrs=m@339000000\u0026src=api\u0026hl=fr\u0026","https://mts1.google.com/maps/vt?lyrs=m@339000000\u0026src=api\u0026hl=fr\u0026"]],[["https://khms0.googleapis.com/kh?v=198\u0026hl=fr\u0026","https://khms1.googleapis.com/kh?v=198\u0026hl=fr\u0026"],null,null,null,1,"198",["https://khms0.google.com/kh?v=198\u0026hl=fr\u0026","https://khms1.google.com/kh?v=198\u0026hl=fr\u0026"]],null,[["https://mts0.googleapis.com/maps/vt?lyrs=t@132,r@339000000\u0026src=api\u0026hl=fr\u0026","https://mts1.googleapis.com/maps/vt?lyrs=t@132,r@339000000\u0026src=api\u0026hl=fr\u0026"],null,null,null,null,"t@132,r@339000000",["https://mts0.google.com/maps/vt?lyrs=t@132,r@339000000\u0026src=api\u0026hl=fr\u0026","https://mts1.google.com/maps/vt?lyrs=t@132,r@339000000\u0026src=api\u0026hl=fr\u0026"]],null,null,[["https://cbks0.googleapis.com/cbk?","https://cbks1.googleapis.com/cbk?"]],[["https://khms0.googleapis.com/kh?v=96\u0026hl=fr\u0026","https://khms1.googleapis.com/kh?v=96\u0026hl=fr\u0026"],null,null,null,null,"96",["https://khms0.google.com/kh?v=96\u0026hl=fr\u0026","https://khms1.google.com/kh?v=96\u0026hl=fr\u0026"]],[["https://mts0.googleapis.com/mapslt?hl=fr\u0026","https://mts1.googleapis.com/mapslt?hl=fr\u0026"]],[["https://mts0.googleapis.com/mapslt/ft?hl=fr\u0026","https://mts1.googleapis.com/mapslt/ft?hl=fr\u0026"]],[["https://mts0.googleapis.com/maps/vt?hl=fr\u0026","https://mts1.googleapis.com/maps/vt?hl=fr\u0026"]],[["https://mts0.googleapis.com/mapslt/loom?hl=fr\u0026","https://mts1.googleapis.com/mapslt/loom?hl=fr\u0026"]],[["https://mts0.googleapis.com/mapslt?hl=fr\u0026","https://mts1.googleapis.com/mapslt?hl=fr\u0026"]],[["https://mts0.googleapis.com/mapslt/ft?hl=fr\u0026","https://mts1.googleapis.com/mapslt/ft?hl=fr\u0026"]],[["https://mts0.googleapis.com/mapslt/loom?hl=fr\u0026","https://mts1.googleapis.com/mapslt/loom?hl=fr\u0026"]]],["fr","US",null,0,null,null,"https://maps.gstatic.com/mapfiles/","https://csi.gstatic.com","https://maps.googleapis.com","https://maps.googleapis.com",null,"https://maps.google.com","https://gg.google.com","https://maps.gstatic.com/maps-api-v3/api/images/","https://www.google.com/maps",0,"https://www.google.com"],["https://maps.googleapis.com/maps-api-v3/api/js/24/2/intl/fr_ALL","3.24.2"],[3801039637],1,null,null,null,null,null,"",null,null,1,"https://khms.googleapis.com/mz?v=198\u0026",null,"https://earthbuilder.googleapis.com","https://earthbuilder.googleapis.com",null,"https://mts.googleapis.com/maps/vt/icon",[["https://maps.googleapis.com/maps/vt"],["https://maps.googleapis.com/maps/vt"],null,null,null,null,null,null,null,null,null,null,["https://www.google.com/maps/vt"],"/maps/vt",339000000,132],2,500,[null,"https://g0.gstatic.com/landmark/tour","https://g0.gstatic.com/landmark/config",null,"https://www.google.com/maps/preview/log204","","https://static.panoramio.com.storage.googleapis.com/photos/",["https://geo0.ggpht.com/cbk","https://geo1.ggpht.com/cbk","https://geo2.ggpht.com/cbk","https://geo3.ggpht.com/cbk"],"https://maps.googleapis.com/maps/api/js/GeoPhotoService.GetMetadata","https://maps.googleapis.com/maps/api/js/GeoPhotoService.SingleImageSearch",["https://lh3.ggpht.com/","https://lh4.ggpht.com/","https://lh5.ggpht.com/","https://lh6.ggpht.com/"]],["https://www.google.com/maps/api/js/master?pb=!1m2!1u24!2s2!2sfr!3sUS!4s24/2/intl/fr_ALL","https://www.google.com/maps/api/js/widget?pb=!1m2!1u24!2s2!2sfr"],null,0,null,"/maps/api/js/ApplicationService.GetEntityDetails",0,null,null,[null,null,null,null,null,null,null,null,null,[0,0],[null,null,null,null,null,null,null,null,0,0,null,null,null,"U"],null,null],null,[],["24.2"]], loadScriptTime);
  };
  var loadScriptTime = (new Date).getTime();
})();
// inlined
(function(_){'use strict';var Da,Ea,Qa,$a,fb,gb,hb,ib,nb,ob,rb,ub,qb,vb,wb,Ab,Hb,Lb,Qb,Xb,$b,cc,dc,fc,jc,lc,ec,ic,nc,rc,sc,vc,Kc,Lc,Mc,Nc,Oc,Pc,Tc,Vc,Xc,Zc,Yc,bd,gd,hd,md,vd,wd,xd,Kd,Ld,Nd,Sd,Ud,Td,Vd,$d,ae,de,he,je,ke,le,oe,qe,re,se,te,ue,ve,we,ze,Ie,Je,Ke,Le,Me,Te,Ue,Ve,Ye,af,xe,gf,jf,mf,pf,Af,Bf,Cf,Df,Ef,Ff,Hf,If,Jf,Of,Qf,Zf,$f,eg,hg,ig,mg,pg,qg,ug,vg,Bg,Cg,Dg,Eg,Fg,Aa,Ba;_.aa="ERROR";_.ba="INVALID_REQUEST";_.ca="MAX_DIMENSIONS_EXCEEDED";_.da="MAX_ELEMENTS_EXCEEDED";_.fa="MAX_WAYPOINTS_EXCEEDED";_.ga="NOT_FOUND";
_.ha="OK";_.ia="OVER_QUERY_LIMIT";_.ja="REQUEST_DENIED";_.ka="UNKNOWN_ERROR";_.ma="ZERO_RESULTS";_.na=function(){return function(a){return a}};_.k=function(){return function(){}};_.oa=function(a){return function(b){this[a]=b}};_.m=function(a){return function(){return this[a]}};_.pa=function(a){return function(){return a}};_.ra=function(a){return function(){return _.qa[a].apply(this,arguments)}};_.sa=function(a){return void 0!==a};_.ta=_.k();_.ua=function(a){a.Nc=function(){return a.Nb?a.Nb:a.Nb=new a}};
_.va=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};_.wa=function(a){var b=_.va(a);return"array"==b||"object"==b&&"number"==typeof a.length};_.xa=function(a){return"string"==typeof a};_.ya=function(a){return"number"==typeof a};_.za=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};_.Ca=function(a){return a[Aa]||(a[Aa]=++Ba)};Da=function(a,b,c){return a.call.apply(a.bind,arguments)};
Ea=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}};_.u=function(a,b,c){_.u=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?Da:Ea;return _.u.apply(null,arguments)};_.Fa=function(){return+new Date};
_.v=function(a,b){function c(){}c.prototype=b.prototype;a.sd=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Br=function(a,c,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[c].apply(a,g)}};_.w=function(a){return a?a.length:0};_.Ga=function(a,b){return function(c){return b(a(c))}};_.Ia=function(a,b){_.Ha(b,function(c){a[c]=b[c]})};_.Ja=function(a){for(var b in a)return!1;return!0};
_.Ka=function(a,b,c){null!=b&&(a=Math.max(a,b));null!=c&&(a=Math.min(a,c));return a};_.La=function(a,b,c){c=c-b;return((a-b)%c+c)%c+b};_.Ma=function(a,b,c){return Math.abs(a-b)<=(c||1E-9)};_.Na=function(a,b){for(var c=[],d=_.w(a),e=0;e<d;++e)c.push(b(a[e],e));return c};_.Pa=function(a,b){for(var c=_.Oa(void 0,_.w(b)),d=_.Oa(void 0,0);d<c;++d)a.push(b[d])};Qa=function(a){return null==a};_.D=function(a){return"undefined"!=typeof a};_.F=function(a){return"number"==typeof a};
_.Ra=function(a){return"object"==typeof a};_.Oa=function(a,b){return null==a?b:a};_.Ta=function(a){return"string"==typeof a};_.Ua=function(a){return a===!!a};_.G=function(a,b){for(var c=0,d=_.w(a);c<d;++c)b(a[c],c)};_.Ha=function(a,b){for(var c in a)b(c,a[c])};_.Wa=function(a,b,c){var d=_.Va(arguments,2);return function(){return b.apply(a,d)}};_.Va=function(a,b,c){return Function.prototype.call.apply(Array.prototype.slice,arguments)};
_.Xa=function(a){return null!=a&&"object"==typeof a&&"number"==typeof a.length};_.Za=function(a){return function(){var b=this,c=arguments;_.Ya(function(){a.apply(b,c)})}};_.Ya=function(a){return window.setTimeout(a,0)};$a=function(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]};_.ab=function(a){window.console&&window.console.error&&window.console.error(a)};_.db=function(a){a=a||window.event;_.bb(a);_.cb(a)};_.bb=function(a){a.cancelBubble=!0;a.stopPropagation&&a.stopPropagation()};
_.cb=function(a){a.preventDefault&&_.D(a.defaultPrevented)?a.preventDefault():a.returnValue=!1};_.eb=function(a){a.handled=!0;_.D(a.bubbles)||(a.returnValue="handled")};fb=function(a,b){a.__e3_||(a.__e3_={});var c=a.__e3_;c[b]||(c[b]={});return c[b]};gb=function(a,b){var c,d=a.__e3_||{};if(b)c=d[b]||{};else{c={};for(var e in d)_.Ia(c,d[e])}return c};hb=function(a,b){return function(c){return b.call(a,c,this)}};
ib=function(a,b,c){return function(d){var e=[b,a];_.Pa(e,arguments);_.I.trigger.apply(this,e);c&&_.eb.apply(null,arguments)}};nb=function(a,b,c,d){this.Nb=a;this.R=b;this.j=c;this.S=null;this.U=d;this.id=++jb;fb(a,b)[this.id]=this;lb&&"tagName"in a&&(mb[this.id]=this)};
ob=function(a){return a.S=function(b){b||(b=window.event);if(b&&!b.target)try{b.target=b.srcElement}catch(d){}var c;c=a.j.apply(a.Nb,[b]);return b&&"click"==b.type&&(b=b.srcElement)&&"A"==b.tagName&&"javascript:void(0)"==b.href?!1:c}};_.pb=function(a){return""+(_.za(a)?_.Ca(a):a)};_.J=_.k();rb=function(a,b){var c=b+"_changed";if(a[c])a[c]();else a.changed(b);var c=qb(a,b),d;for(d in c){var e=c[d];rb(e.Rd,e.lc)}_.I.trigger(a,b.toLowerCase()+"_changed")};
_.tb=function(a){return sb[a]||(sb[a]=a.substr(0,1).toUpperCase()+a.substr(1))};ub=function(a){a.gm_accessors_||(a.gm_accessors_={});return a.gm_accessors_};qb=function(a,b){a.gm_bindings_||(a.gm_bindings_={});a.gm_bindings_.hasOwnProperty(b)||(a.gm_bindings_[b]={});return a.gm_bindings_[b]};vb=_.k();wb=function(a){this.message=a;this.name="InvalidValueError";this.stack=Error().stack};_.xb=function(a,b){var c="";if(null!=b){if(!(b instanceof wb))return b;c=": "+b.message}return new wb(a+c)};
_.yb=function(a){if(!(a instanceof wb))throw a;_.ab(a.name+": "+a.message)};_.zb=function(a,b){return function(c){if(!c||!_.Ra(c))throw _.xb("not an Object");var d={},e;for(e in c)if(d[e]=c[e],!b&&!a[e])throw _.xb("unknown property "+e);for(e in a)try{var f=a[e](d[e]);if(_.D(f)||Object.prototype.hasOwnProperty.call(c,e))d[e]=a[e](d[e])}catch(g){throw _.xb("in property "+e,g);}return d}};Ab=function(a){try{return!!a.cloneNode}catch(b){return!1}};
_.Bb=function(a,b,c){return c?function(c){if(c instanceof a)return c;try{return new a(c)}catch(e){throw _.xb("when calling new "+b,e);}}:function(c){if(c instanceof a)return c;throw _.xb("not an instance of "+b);}};_.Cb=function(a){return function(b){for(var c in a)if(a[c]==b)return b;throw _.xb(b);}};_.Db=function(a){return function(b){if(!_.Xa(b))throw _.xb("not an Array");return _.Na(b,function(b,d){try{return a(b)}catch(e){throw _.xb("at index "+d,e);}})}};
_.Eb=function(a,b){return function(c){if(a(c))return c;throw _.xb(b||""+c);}};_.Fb=function(a){var b=arguments;return function(a){for(var d=[],e=0,f=b.length;e<f;++e){var g=b[e];try{(g.Yh||g)(a)}catch(h){if(!(h instanceof wb))throw h;d.push(h.message);continue}return(g.then||g)(a)}throw _.xb(d.join("; and "));}};_.Gb=function(a){return function(b){return null==b?b:a(b)}};Hb=function(a){return function(b){if(b&&null!=b[a])return b;throw _.xb("no "+a+" property");}};
_.Ib=function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};_.Kb=function(){return-1!=_.Jb.toLowerCase().indexOf("webkit")};
_.Mb=function(a,b){for(var c=0,d=_.Ib(String(a)).split("."),e=_.Ib(String(b)).split("."),f=Math.max(d.length,e.length),g=0;0==c&&g<f;g++){var h=d[g]||"",l=e[g]||"",n=/(\d*)(\D*)/g,p=/(\d*)(\D*)/g;do{var q=n.exec(h)||["","",""],r=p.exec(l)||["","",""];if(0==q[0].length&&0==r[0].length)break;c=Lb(0==q[1].length?0:(0,window.parseInt)(q[1],10),0==r[1].length?0:(0,window.parseInt)(r[1],10))||Lb(0==q[2].length,0==r[2].length)||Lb(q[2],r[2])}while(0==c)}return c};Lb=function(a,b){return a<b?-1:a>b?1:0};
_.Nb=function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(_.xa(a))return _.xa(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};_.Ob=function(a,b,c){for(var d=a.length,e=_.xa(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};Qb=function(a,b){for(var c=a.length,d=_.xa(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a))return e;return-1};_.Sb=function(a,b){var c=_.Nb(a,b),d;(d=0<=c)&&_.Rb(a,c);return d};
_.Rb=function(a,b){Array.prototype.splice.call(a,b,1)};_.K=function(a){return a*Math.PI/180};_.Tb=function(a){return 180*a/Math.PI};_.L=function(a,b,c){if(a&&(a.lat||a.lng))try{Ub(a),b=a.lng,a=a.lat,c=!1}catch(d){_.yb(d)}a-=0;b-=0;c||(a=_.Ka(a,-90,90),180!=b&&(b=_.La(b,-180,180)));this.lat=function(){return a};this.lng=function(){return b}};_.Vb=function(a){return _.K(a.lat())};_.Wb=function(a){return _.K(a.lng())};Xb=function(a,b){var c=Math.pow(10,b);return Math.round(a*c)/c};
_.Yb=function(a){try{if(a instanceof _.L)return a;a=Ub(a);return new _.L(a.lat,a.lng)}catch(b){throw _.xb("not a LatLng or LatLngLiteral",b);}};_.Zb=function(a){this.j=_.Yb(a)};$b=function(a){if(a instanceof vb)return a;try{return new _.Zb(_.Yb(a))}catch(b){}throw _.xb("not a Geometry or LatLng or LatLngLiteral object");};_.ac=function(a,b){if(a)return function(){--a||b()};b();return _.ta};
_.bc=function(a,b,c){var d=a.getElementsByTagName("head")[0];a=a.createElement("script");a.type="text/javascript";a.charset="UTF-8";a.src=b;c&&(a.onerror=c);d.appendChild(a);return a};cc=function(a){for(var b="",c=0,d=arguments.length;c<d;++c){var e=arguments[c];e.length&&"/"==e[0]?b=e:(b&&"/"!=b[b.length-1]&&(b+="/"),b+=e)}return b};dc=function(a){this.S=window.document;this.j={};this.R=a};fc=function(){this.U={};this.R={};this.V={};this.j={};this.S=new ec};
jc=function(a,b){a.U[b]||(a.U[b]=!0,ic(a.S,function(c){for(var d=c.xj[b],e=d?d.length:0,f=0;f<e;++f){var g=d[f];a.j[g]||jc(a,g)}c=c.Ho;c.j[b]||_.bc(c.S,cc(c.R,b)+".js")}))};lc=function(a,b){var c=kc;this.Ho=a;this.xj=c;var d={},e;for(e in c)for(var f=c[e],g=0,h=f.length;g<h;++g){var l=f[g];d[l]||(d[l]=[]);d[l].push(e)}this.Wp=d;this.Zm=b};ec=function(){this.j=[]};ic=function(a,b){a.R?b(a.R):a.j.push(b)};
_.M=function(a,b,c){var d=fc.Nc();a=""+a;d.j[a]?b(d.j[a]):((d.R[a]=d.R[a]||[]).push(b),c||jc(d,a))};_.mc=function(a,b){fc.Nc().j[""+a]=b};nc=function(a,b,c){var d=[],e=_.ac(a.length,function(){b.apply(null,d)});_.Ob(a,function(a,b){_.M(a,function(a){d[b]=a;e()},c)})};_.pc=function(a){a=a||{};this.S=a.id;this.j=null;try{this.j=a.geometry?$b(a.geometry):null}catch(b){_.yb(b)}this.R=a.properties||{}};_.N=function(a,b){this.x=a;this.y=b};
rc=function(a){if(a instanceof _.N)return a;try{_.zb({x:_.qc,y:_.qc},!0)(a)}catch(b){throw _.xb("not a Point",b);}return new _.N(a.x,a.y)};_.O=function(a,b,c,d){this.width=a;this.height=b;this.S=c||"px";this.R=d||"px"};sc=function(a){if(a instanceof _.O)return a;try{_.zb({height:_.qc,width:_.qc},!0)(a)}catch(b){throw _.xb("not a Size",b);}return new _.O(a.width,a.height)};_.P=function(a){return function(){return this.get(a)}};
_.tc=function(a,b){return b?function(c){try{this.set(a,b(c))}catch(d){_.yb(_.xb("set"+_.tb(a),d))}}:function(b){this.set(a,b)}};_.uc=function(a,b){_.Ha(b,function(b,d){var e=_.P(b);a["get"+_.tb(b)]=e;d&&(e=_.tc(b,d),a["set"+_.tb(b)]=e)})};_.wc=function(a){this.j=a||[];vc(this)};vc=function(a){a.set("length",a.j.length)};_.xc=function(a){this.S=a||_.pb;this.R={}};_.yc=function(a,b){var c=a.R,d=a.S(b);c[d]||(c[d]=b,_.I.trigger(a,"insert",b),a.j&&a.j(b))};_.zc=_.oa("j");
_.Ac=function(a,b,c){this.heading=a;this.pitch=_.Ka(b,-90,90);this.zoom=Math.max(0,c)};_.Bc=function(){this.__gm=new _.J;this.U=null};_.Cc=_.na();_.Dc=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)};_.Hc=function(a){return-1!=_.Jb.indexOf(a)};_.Ic=function(){return _.Hc("Opera")||_.Hc("OPR")};_.Jc=function(){return _.Hc("Trident")||_.Hc("MSIE")};Kc=function(){return(_.Hc("Chrome")||_.Hc("CriOS"))&&!_.Ic()&&!_.Hc("Edge")};Lc=function(a,b,c){this.U=c;this.S=a;this.V=b;this.R=0;this.j=null};
Mc=function(){this.R=this.j=null};Nc=function(){this.next=this.j=this.Md=null};Oc=function(a,b){return function(c){return c.Md==a&&c.context==(b||null)}};Pc=function(a){this.Fa=[];this.j=a&&a.He||_.ta;this.R=a&&a.Je||_.ta};_.Qc=function(){this.Fa=new Pc({He:(0,_.u)(this.He,this),Je:(0,_.u)(this.Je,this)})};_.Rc=function(){_.Qc.call(this)};_.Sc=function(a){_.Qc.call(this);this.j=a};Tc=_.k();
Vc=function(a){var b=a;if(a instanceof Array)b=Array(a.length),_.Uc(b,a);else if(a instanceof Object){var c=b={},d;for(d in a)a.hasOwnProperty(d)&&(c[d]=Vc(a[d]))}return b};_.Uc=function(a,b){for(var c=0;c<b.length;++c)b.hasOwnProperty(c)&&(a[c]=Vc(b[c]))};_.R=function(a,b){a[b]||(a[b]=[]);return a[b]};_.Wc=function(a,b){return a[b]?a[b].length:0};Xc=_.k();
Zc=function(a,b,c){for(var d=1;d<b.ra.length;++d){var e=b.ra[d],f=a[d+b.qa];if(null!=f&&e)if(3==e.label)for(var g=0;g<f.length;++g)Yc(f[g],d,e,c);else Yc(f,d,e,c)}};Yc=function(a,b,c,d){if("m"==c.type){var e=d.length;Zc(a,c.ka,d);d.splice(e,0,[b,"m",d.length-e].join(""))}else"b"==c.type&&(a=a?"1":"0"),d.push([b,c.type,(0,window.encodeURIComponent)(a)].join(""))};_.$c=function(){return _.Hc("iPhone")&&!_.Hc("iPod")&&!_.Hc("iPad")};bd=function(){var a=_.ad.document;return a?a.documentMode:void 0};
_.ed=function(a){return cd[a]||(cd[a]=0<=_.Mb(_.dd,a))};_.fd=function(a,b){this.j=a||0;this.R=b||0};gd=_.k();hd=function(a,b){-180==a&&180!=b&&(a=180);-180==b&&180!=a&&(b=180);this.j=a;this.R=b};_.id=function(a){return a.j>a.R};_.kd=function(a,b){return 1E-9>=Math.abs(b.j-a.j)%360+Math.abs(_.jd(b)-_.jd(a))};_.ld=function(a,b){var c=b-a;return 0<=c?c:b+180-(a-180)};_.jd=function(a){return a.isEmpty()?0:_.id(a)?360-(a.j-a.R):a.R-a.j};md=function(a,b){this.R=a;this.j=b};
_.nd=function(a){return a.isEmpty()?0:a.j-a.R};_.od=function(a,b){a=a&&_.Yb(a);b=b&&_.Yb(b);if(a){b=b||a;var c=_.Ka(a.lat(),-90,90),d=_.Ka(b.lat(),-90,90);this.R=new md(c,d);c=a.lng();d=b.lng();360<=d-c?this.j=new hd(-180,180):(c=_.La(c,-180,180),d=_.La(d,-180,180),this.j=new hd(c,d))}else this.R=new md(1,-1),this.j=new hd(180,-180)};_.pd=function(a,b,c,d){return new _.od(new _.L(a,b,!0),new _.L(c,d,!0))};
_.rd=function(a){if(a instanceof _.od)return a;try{return a=qd(a),_.pd(a.south,a.west,a.north,a.east)}catch(b){throw _.xb("not a LatLngBounds or LatLngBoundsLiteral",b);}};_.sd=_.oa("__gm");vd=function(){this.j={};this.S={};this.R={}};wd=function(){this.j={}};xd=function(a){this.j=new wd;var b=this;_.I.addListenerOnce(a,"addfeature",function(){_.M("data",function(c){c.j(b,a,b.j)})})};_.zd=function(a){this.j=[];try{this.j=yd(a)}catch(b){_.yb(b)}};_.Bd=function(a){this.j=(0,_.Ad)(a)};
_.Dd=function(a){this.j=Cd(a)};_.Ed=function(a){this.j=(0,_.Ad)(a)};_.Fd=function(a){this.j=(0,_.Ad)(a)};_.Hd=function(a){this.j=Gd(a)};_.Jd=function(a){this.j=Id(a)};Kd=function(a){a=a||{};a.clickable=_.Oa(a.clickable,!0);a.visible=_.Oa(a.visible,!0);this.setValues(a);_.M("marker",_.ta)};Ld=function(a){var b=_,c=fc.Nc().S;a=c.R=new lc(new dc(a),b);for(var b=0,d=c.j.length;b<d;++b)c.j[b](a);c.j.length=0};_.Md=function(a){this.__gm={set:null,Hf:null};Kd.call(this,a)};
Nd=function(a){a=a||{};a.visible=_.Oa(a.visible,!0);return a};_.Od=function(a){return a&&a.radius||6378137};Sd=function(a){return a instanceof _.wc?Rd(a):new _.wc((0,_.Ad)(a))};Ud=function(a){var b;_.Xa(a)?0==_.w(a)?b=!0:(b=a instanceof _.wc?a.getAt(0):a[0],b=_.Xa(b)):b=!1;return b?a instanceof _.wc?Td(Rd)(a):new _.wc(_.Db(Sd)(a)):new _.wc([Sd(a)])};
Td=function(a){return function(b){if(!(b instanceof _.wc))throw _.xb("not an MVCArray");b.forEach(function(b,d){try{a(b)}catch(e){throw _.xb("at index "+d,e);}});return b}};Vd=function(a){this.set("latLngs",new _.wc([new _.wc]));this.setValues(Nd(a));_.M("poly",_.ta)};_.Wd=function(a){Vd.call(this,a)};_.Xd=function(a){Vd.call(this,a)};
_.Yd=function(a,b,c){function d(a){if(!a)throw _.xb("not a Feature");if("Feature"!=a.type)throw _.xb('type != "Feature"');var b=a.geometry;try{b=null==b?null:e(b)}catch(d){throw _.xb('in property "geometry"',d);}var f=a.properties||{};if(!_.Ra(f))throw _.xb("properties is not an Object");var g=c.idPropertyName;a=g?f[g]:a.id;if(null!=a&&!_.F(a)&&!_.Ta(a))throw _.xb((g||"id")+" is not a string or number");return{id:a,geometry:b,properties:f}}function e(a){if(null==a)throw _.xb("is null");var b=(a.type+
"").toLowerCase(),c=a.coordinates;try{switch(b){case "point":return new _.Zb(h(c));case "multipoint":return new _.Ed(n(c));case "linestring":return g(c);case "multilinestring":return new _.Dd(p(c));case "polygon":return f(c);case "multipolygon":return new _.Jd(r(c))}}catch(d){throw _.xb('in property "coordinates"',d);}if("geometrycollection"==b)try{return new _.zd(z(a.geometries))}catch(d){throw _.xb('in property "geometries"',d);}throw _.xb("invalid type");}function f(a){return new _.Hd(q(a))}function g(a){return new _.Bd(n(a))}
function h(a){a=l(a);return _.Yb({lat:a[1],lng:a[0]})}if(!b)return[];c=c||{};var l=_.Db(_.qc),n=_.Db(h),p=_.Db(g),q=_.Db(function(a){a=n(a);if(!a.length)throw _.xb("contains no elements");if(!a[0].j(a[a.length-1]))throw _.xb("first and last positions are not equal");return new _.Fd(a.slice(0,-1))}),r=_.Db(f),z=_.Db(e),x=_.Db(d);if("FeatureCollection"==b.type){b=b.features;try{return _.Na(x(b),function(b){return a.add(b)})}catch(y){throw _.xb('in property "features"',y);}}if("Feature"==b.type)return[a.add(d(b))];
throw _.xb("not a Feature or FeatureCollection");};$d=function(a){var b=this;this.setValues(a||{});this.j=new vd;_.I.forward(this.j,"addfeature",this);_.I.forward(this.j,"removefeature",this);_.I.forward(this.j,"setgeometry",this);_.I.forward(this.j,"setproperty",this);_.I.forward(this.j,"removeproperty",this);this.R=new xd(this.j);this.R.bindTo("map",this);this.R.bindTo("style",this);_.G(_.Zd,function(a){_.I.forward(b.R,a,b)});this.S=!1};ae=function(a){a.S||(a.S=!0,_.M("drawing_impl",function(b){b.Zn(a)}))};
_.be=function(a){this.j=a||[]};_.ce=function(a){this.j=a||[]};de=function(a){this.j=a||[]};_.ee=function(a){this.j=a||[]};_.fe=function(a){this.j=a||[]};_.ge=function(a){function b(){d||(d=!0,_.M("infowindow",function(a){a.Fm(c)}))}window.setTimeout(function(){_.M("infowindow",_.ta)},100);var c=this,d=!1;_.I.addListenerOnce(this,"anchor_changed",b);_.I.addListenerOnce(this,"map_changed",b);this.setValues(a)};he=function(a){this.setValues(a)};_.ie=_.k();je=_.k();ke=_.k();le=_.k();
_.me=function(){_.M("geocoder",_.ta)};_.ne=function(a,b,c){this.wa=null;this.set("url",a);this.set("bounds",_.Gb(_.rd)(b));this.setValues(c)};oe=function(a,b){_.Ta(a)?(this.set("url",a),this.setValues(b)):this.setValues(a)};_.pe=function(){this.wa=null;_.M("layers",_.ta)};qe=function(a){this.wa=null;_.M("layers",_.ta);this.setValues(a)};re=function(){this.wa=null;_.M("layers",_.ta)};se=function(a){this.j=a||[]};te=function(a){this.j=a||[]};ue=function(a){this.j=a||[]};ve=function(a){this.j=a||[]};
we=function(a){this.j=a||[]};ze=function(){var a=xe().j[10],a=(a?new ve(a):ye).j[8];return null!=a?a:0};_.Ae=function(a){this.j=a||[]};_.Be=function(a){this.j=a||[]};_.Ge=function(a){this.j=a||[]};_.He=function(a){this.j=a||[]};Ie=function(a){this.j=a||[]};Je=function(a){this.j=a||[]};Ke=function(a){this.j=a||[]};Le=function(a){this.j=a||[]};Me=function(a){this.j=a||[]};_.Ne=function(a){this.j=a||[]};_.Oe=function(a){this.j=a||[]};_.Pe=function(a){a=a.j[0];return null!=a?a:""};
_.Qe=function(a){a=a.j[1];return null!=a?a:""};_.Se=function(){var a=_.Re(_.S).j[9];return null!=a?a:""};Te=function(){var a=_.Re(_.S).j[7];return null!=a?a:""};Ue=function(){var a=_.Re(_.S).j[12];return null!=a?a:""};Ve=function(a){a=a.j[0];return null!=a?a:""};_.We=function(a){a=a.j[1];return null!=a?a:""};Ye=function(){var a=_.S.j[4],a=(a?new Ke(a):Xe).j[0];return null!=a?a:0};_.Ze=function(){var a=_.S.j[0];return null!=a?a:1};_.$e=function(a){a=a.j[6];return null!=a?a:""};
af=function(){var a=_.S.j[11];return null!=a?a:""};_.bf=function(){var a=_.S.j[16];return null!=a?a:""};_.Re=function(a){return(a=a.j[2])?new Ie(a):cf};_.ef=function(){var a=_.S.j[3];return a?new Je(a):df};xe=function(){var a=_.S.j[33];return a?new se(a):ff};gf=function(a){return _.R(_.S.j,8)[a]};jf=function(){var a=_.S.j[36],a=(a?new Me(a):hf).j[0];return null!=a?a:""};
mf=function(a,b){_.Bc.call(this);this.__gm=new _.J;this.S=null;b&&b.client&&(this.S=_.kf[b.client]||null);var c=this.controls=[];_.Ha(_.lf,function(a,b){c[b]=new _.wc});this.V=!0;this.R=a;this.setPov(new _.Ac(0,0,1));b&&b.Fc&&!_.F(b.Fc.zoom)&&(b.Fc.zoom=_.F(b.zoom)?b.zoom:1);this.setValues(b);void 0==this.getVisible()&&this.setVisible(!0);this.__gm.Qd=b&&b.Qd||new _.xc;_.I.addListenerOnce(this,"pano_changed",_.Za(function(){_.M("marker",(0,_.u)(function(a){a.j(this.__gm.Qd,this)},this))}))};
_.of=function(){this.U=[];this.R=this.j=this.S=null};pf=function(a,b,c){this.Ia=b;this.j=new _.Sc(new _.zc([]));this.W=new _.xc;this.ya=new _.wc;this.ta=new _.xc;this.ua=new _.xc;this.U=new _.xc;var d=this.Qd=new _.xc;d.j=function(){delete d.j;_.M("marker",_.Za(function(b){b.j(d,a)}))};this.S=new mf(b,{visible:!1,enableCloseButton:!0,Qd:d});this.S.bindTo("reportErrorControl",a);this.S.V=!1;this.R=new _.of;this.La=c};_.qf=function(){this.Fa=new Pc};
_.rf=function(){this.j=new _.N(128,128);this.S=256/360;this.U=256/(2*Math.PI);this.R=!0};_.sf=function(a){this.Aa=this.Ba=window.Infinity;this.Ga=this.Da=-window.Infinity;_.G(a,(0,_.u)(this.extend,this))};_.tf=function(a,b,c,d){var e=new _.sf;e.Ba=a;e.Aa=b;e.Da=c;e.Ga=d;return e};_.uf=function(a,b,c){if(a=a.fromLatLngToPoint(b))c=Math.pow(2,c),a.x*=c,a.y*=c;return a};
_.vf=function(a,b){var c=a.lat()+_.Tb(b);90<c&&(c=90);var d=a.lat()-_.Tb(b);-90>d&&(d=-90);var e=Math.sin(b),f=Math.cos(_.K(a.lat()));if(90==c||-90==d||1E-6>f)return new _.od(new _.L(d,-180),new _.L(c,180));e=_.Tb(Math.asin(e/f));return new _.od(new _.L(d,a.lng()-e),new _.L(c,a.lng()+e))};_.wf=function(a){this.zl=a||0;_.I.bind(this,"forceredraw",this,this.ma)};_.xf=function(a,b){var c=a.style;c.width=b.width+b.S;c.height=b.height+b.R};_.zf=function(a){return new _.O(a.offsetWidth,a.offsetHeight)};
Af=function(a){this.j=a||[]};Bf=function(a){this.j=a||[]};Cf=function(a){this.j=a||[]};Df=function(a){this.j=a||[]};Ef=function(a){this.j=a||[]};Ff=function(a,b,c,d){_.wf.call(this);this.V=b;this.U=new _.rf;this.W=c+"/maps/api/js/StaticMapService.GetMapImage";this.R=this.j=null;this.S=d;this.set("div",a);this.set("loading",!0)};Hf=function(a){var b=a.get("tilt")||a.get("mapMaker")||_.w(a.get("styles"));a=a.get("mapTypeId");return b?null:Gf[a]};If=function(a){a.parentNode&&a.parentNode.removeChild(a)};
Jf=function(a,b,c,d,e){var f=_.U[15]?Ue():Te();this.j=a;this.R=d;this.S=_.sa(e)?e:_.Fa();var g=f+"/csi?v=2&s=mapsapi3&v3v="+jf()+"&action="+a;_.Dc(c,function(a,b){g+="&"+(0,window.encodeURIComponent)(b)+"="+(0,window.encodeURIComponent)(a)});b&&(g+="&e="+b);this.U=g};_.Lf=function(a,b){var c={};c[b]=void 0;_.Kf(a,c)};
_.Kf=function(a,b){var c="";_.Dc(b,function(a,b){var d=(null!=a?a:_.Fa())-this.S;c&&(c+=",");c+=b+"."+Math.round(d);null==a&&window.performance&&window.performance.mark&&window.performance.mark("mapsapi:"+this.j+":"+b)},a);var d=a.U+"&rt="+c;a.R.createElement("img").src=d;var e=_.ad.__gm_captureCSI;e&&e(d)};
_.Mf=function(a,b){var c=b||{},d=c.Bp||{},e=_.R(_.S.j,12).join(",");e&&(d.libraries=e);var e=_.$e(_.S),f=xe(),g=[];e&&g.push(e);_.Ob(f.$(),function(a,b){a&&_.Ob(a,function(a,c){null!=a&&g.push(b+1+"_"+(c+1)+"_"+a)})});c.wn&&(g=g.concat(c.wn));return new Jf(a,g.join(","),d,c.document||window.document,c.startTime)};Of=function(){this.R=_.Mf("apiboot2",{startTime:_.Nf});_.Lf(this.R,"main");this.j=!1};Qf=function(){var a=Pf;a.j||(a.j=!0,_.Lf(a.R,"firstmap"))};_.Rf=_.k();_.Sf=function(){this.j=""};
_.Tf=function(a){var b=new _.Sf;b.j=a;return b};_.Vf=function(){this.ah="";this.Ql=_.Uf;this.j=null};_.Wf=function(a,b){var c=new _.Vf;c.ah=a;c.j=b;return c};_.Xf=function(a,b){b.parentNode&&b.parentNode.insertBefore(a,b.nextSibling)};_.Yf=function(a){return a&&a.parentNode?a.parentNode.removeChild(a):null};Zf=function(a,b,c,d,e){this.j=!!b;this.node=null;this.R=0;this.S=!1;this.U=!c;a&&this.setPosition(a,d);this.depth=void 0!=e?e:this.R||0;this.j&&(this.depth*=-1)};
$f=function(a,b,c,d){Zf.call(this,a,b,c,null,d)};_.bg=function(a){for(var b;b=a.firstChild;)_.ag(b),a.removeChild(b)};_.ag=function(a){a=new $f(a);try{for(;;)_.I.clearInstanceListeners(a.next())}catch(b){if(b!==_.cg)throw b;}};
_.gg=function(a,b){var c=_.Fa();Pf&&Qf();var d=new _.qf;_.sd.call(this,new pf(this,a,d));var e=b||{};_.D(e.mapTypeId)||(e.mapTypeId="roadmap");this.setValues(e);this.j=_.U[15]&&e.noControlsOrLogging;this.mapTypes=new gd;this.features=new _.J;_.dg.push(a);this.notify("streetView");var f=_.zf(a);e.noClear||_.bg(a);var g=null,h=!!_.S&&eg(e.useStaticMap,f);_.S&&+ze()&&(h=!1);h&&(g=new Ff(a,_.fg,_.Se(),new _.Sc(null)),_.I.forward(g,"staticmaploaded",this),g.set("size",f),g.bindTo("center",this),g.bindTo("zoom",
this),g.bindTo("mapTypeId",this),g.bindTo("styles",this),g.bindTo("mapMaker",this));this.overlayMapTypes=new _.wc;var l=this.controls=[];_.Ha(_.lf,function(a,b){l[b]=new _.wc});var n=this,p=!0;_.M("map",function(a){a.R(n,e,g,p,c,d)});p=!1;this.data=new $d({map:this})};eg=function(a,b){if(_.D(a))return!!a;var c=b.width,d=b.height;return 384E3>=c*d&&800>=c&&800>=d};hg=function(){_.M("maxzoom",_.ta)};ig=function(a,b){!a||_.Ta(a)||_.F(a)?(this.set("tableId",a),this.setValues(b)):this.setValues(a)};
_.jg=_.k();_.kg=function(a){this.setValues(Nd(a));_.M("poly",_.ta)};_.lg=function(a){this.setValues(Nd(a));_.M("poly",_.ta)};mg=function(){this.j=null};_.ng=function(){this.j=null};
_.og=function(a){this.tileSize=a.tileSize||new _.O(256,256);this.name=a.name;this.alt=a.alt;this.minZoom=a.minZoom;this.maxZoom=a.maxZoom;this.S=(0,_.u)(a.getTileUrl,a);this.j=new _.xc;this.R=null;this.set("opacity",a.opacity);_.ad.window&&_.I.addDomListener(window,"online",(0,_.u)(this.xp,this));var b=this;_.M("map",function(a){var d=b.R=a.j,e=b.tileSize||new _.O(256,256);b.j.forEach(function(a){var c=a.__gmimt,h=c.Na,l=c.zoom,n=b.S(h,l);c.Gc=d(h,l,e,a,n,function(){_.I.trigger(a,"load")})})})};
pg=function(a,b){null!=a.style.opacity?a.style.opacity=b:a.style.filter=b&&"alpha(opacity="+Math.round(100*b)+")"};qg=function(a){a=a.get("opacity");return"number"==typeof a?a:1};_.rg=_.k();_.sg=function(a,b){this.set("styles",a);var c=b||{};this.j=c.baseMapTypeId||"roadmap";this.minZoom=c.minZoom;this.maxZoom=c.maxZoom||20;this.name=c.name;this.alt=c.alt;this.projection=null;this.tileSize=new _.O(256,256)};
_.tg=function(a,b){_.Eb(Ab,"container is not a Node")(a);this.setValues(b);_.M("controls",(0,_.u)(function(b){b.Vm(this,a)},this))};ug=_.oa("j");vg=function(a,b,c){for(var d=Array(b.length),e=0,f=b.length;e<f;++e)d[e]=b.charCodeAt(e);d.unshift(c);a=a.j;c=b=0;for(e=d.length;c<e;++c)b*=1729,b+=d[c],b%=a;return b};
Bg=function(){var a=Ye(),b=new ug(131071),c=(0,window.unescape)("%26%74%6F%6B%65%6E%3D");return function(d){d=d.replace(wg,"%27");var e=d+c;xg||(xg=/(?:https?:\/\/[^/]+)?(.*)/);d=xg.exec(d);return e+vg(b,d&&d[1],a)}};Cg=function(){var a=new ug(2147483647);return function(b){return vg(a,b,0)}};Dg=function(a){for(var b=a.split("."),c=window,d=window,e=0;e<b.length;e++)if(d=c,c=c[b[e]],!c)throw _.xb(a+" is not a function");return function(){c.apply(d)}};
Eg=function(){for(var a in Object.prototype)window.console&&window.console.error("This site adds property <"+a+"> to Object.prototype. Extending Object.prototype breaks JavaScript for..in loops, which are used heavily in Google Maps API v3.")};Fg=function(a){(a="version"in a)&&window.console&&window.console.error("You have included the Google Maps API multiple times on this page. This may cause unexpected errors.");return a};_.qa=[];_.ad=this;Aa="closure_uid_"+(1E9*Math.random()>>>0);Ba=0;var lb,mb;_.I={};lb="undefined"!=typeof window.navigator&&-1!=window.navigator.userAgent.toLowerCase().indexOf("msie");mb={};_.I.addListener=function(a,b,c){return new nb(a,b,c,0)};_.I.hasListeners=function(a,b){var c=a.__e3_,c=c&&c[b];return!!c&&!_.Ja(c)};_.I.removeListener=function(a){a&&a.remove()};_.I.clearListeners=function(a,b){_.Ha(gb(a,b),function(a,b){b&&b.remove()})};_.I.clearInstanceListeners=function(a){_.Ha(gb(a),function(a,c){c&&c.remove()})};
_.I.trigger=function(a,b,c){if(_.I.hasListeners(a,b)){var d=_.Va(arguments,2),e=gb(a,b),f;for(f in e){var g=e[f];g&&g.j.apply(g.Nb,d)}}};_.I.addDomListener=function(a,b,c,d){if(a.addEventListener){var e=d?4:1;a.addEventListener(b,c,d);c=new nb(a,b,c,e)}else a.attachEvent?(c=new nb(a,b,c,2),a.attachEvent("on"+b,ob(c))):(a["on"+b]=c,c=new nb(a,b,c,3));return c};_.I.addDomListenerOnce=function(a,b,c,d){var e=_.I.addDomListener(a,b,function(){e.remove();return c.apply(this,arguments)},d);return e};
_.I.Ka=function(a,b,c,d){return _.I.addDomListener(a,b,hb(c,d))};_.I.bind=function(a,b,c,d){return _.I.addListener(a,b,(0,_.u)(d,c))};_.I.addListenerOnce=function(a,b,c){var d=_.I.addListener(a,b,function(){d.remove();return c.apply(this,arguments)});return d};_.I.forward=function(a,b,c){return _.I.addListener(a,b,ib(b,c))};_.I.Gb=function(a,b,c,d){return _.I.addDomListener(a,b,ib(b,c,!d))};_.I.sk=function(){var a=mb,b;for(b in a)a[b].remove();mb={};(a=_.ad.CollectGarbage)&&a()};
_.I.Op=function(){lb&&_.I.addDomListener(window,"unload",_.I.sk)};var jb=0;nb.prototype.remove=function(){if(this.Nb){switch(this.U){case 1:this.Nb.removeEventListener(this.R,this.j,!1);break;case 4:this.Nb.removeEventListener(this.R,this.j,!0);break;case 2:this.Nb.detachEvent("on"+this.R,this.S);break;case 3:this.Nb["on"+this.R]=null}delete fb(this.Nb,this.R)[this.id];this.S=this.j=this.Nb=null;delete mb[this.id]}};_.t=_.J.prototype;_.t.get=function(a){var b=ub(this);a=a+"";b=$a(b,a);if(_.D(b)){if(b){a=b.lc;var b=b.Rd,c="get"+_.tb(a);return b[c]?b[c]():b.get(a)}return this[a]}};_.t.set=function(a,b){var c=ub(this);a=a+"";var d=$a(c,a);if(d){var c=d.lc,d=d.Rd,e="set"+_.tb(c);if(d[e])d[e](b);else d.set(c,b)}else this[a]=b,c[a]=null,rb(this,a)};_.t.notify=function(a){var b=ub(this);a=a+"";(b=$a(b,a))?b.Rd.notify(b.lc):rb(this,a)};
_.t.setValues=function(a){for(var b in a){var c=a[b],d="set"+_.tb(b);if(this[d])this[d](c);else this.set(b,c)}};_.t.setOptions=_.J.prototype.setValues;_.t.changed=_.k();var sb={};_.J.prototype.bindTo=function(a,b,c,d){a=a+"";c=(c||a)+"";this.unbind(a);var e={Rd:this,lc:a},f={Rd:b,lc:c,Fi:e};ub(this)[a]=f;qb(b,c)[_.pb(e)]=e;d||rb(this,a)};_.J.prototype.unbind=function(a){var b=ub(this),c=b[a];c&&(c.Fi&&delete qb(c.Rd,c.lc)[_.pb(c.Fi)],this[a]=this.get(a),b[a]=null)};
_.J.prototype.unbindAll=function(){var a=(0,_.u)(this.unbind,this),b=ub(this),c;for(c in b)a(c)};_.J.prototype.addListener=function(a,b){return _.I.addListener(this,a,b)};_.Gg={ROADMAP:"roadmap",SATELLITE:"satellite",HYBRID:"hybrid",TERRAIN:"terrain"};_.lf={TOP_LEFT:1,TOP_CENTER:2,TOP:2,TOP_RIGHT:3,LEFT_CENTER:4,LEFT_TOP:5,LEFT:5,LEFT_BOTTOM:6,RIGHT_TOP:7,RIGHT:7,RIGHT_CENTER:8,RIGHT_BOTTOM:9,BOTTOM_LEFT:10,BOTTOM_CENTER:11,BOTTOM:11,BOTTOM_RIGHT:12,CENTER:13};var Hg={gr:"Point",er:"LineString",POLYGON:"Polygon"};_.v(wb,Error);_.qc=_.Eb(_.F,"not a number");_.Ig=_.Eb(_.Ta,"not a string");_.Jg=_.Gb(_.qc);_.Kg=_.Gb(_.Ig);_.Lg=_.Gb(_.Eb(_.Ua,"not a boolean"));var Ub=_.zb({lat:_.qc,lng:_.qc},!0);_.L.prototype.toString=function(){return"("+this.lat()+", "+this.lng()+")"};_.L.prototype.toJSON=function(){return{lat:this.lat(),lng:this.lng()}};_.L.prototype.j=function(a){return a?_.Ma(this.lat(),a.lat())&&_.Ma(this.lng(),a.lng()):!1};_.L.prototype.equals=_.L.prototype.j;_.L.prototype.toUrlValue=function(a){a=_.D(a)?a:6;return Xb(this.lat(),a)+","+Xb(this.lng(),a)};_.Ad=_.Db(_.Yb);_.v(_.Zb,vb);_.Zb.prototype.getType=_.pa("Point");_.Zb.prototype.get=_.m("j");var yd=_.Db($b);_.ua(fc);fc.prototype.Sc=function(a,b){var c=this,d=c.V;ic(c.S,function(e){for(var f=e.xj[a]||[],g=e.Wp[a]||[],h=d[a]=_.ac(f.length,function(){delete d[a];b(e.Zm);for(var f=c.R[a],h=f?f.length:0,l=0;l<h;++l)f[l](c.j[a]);delete c.R[a];l=0;for(f=g.length;l<f;++l)h=g[l],d[h]&&d[h]()}),l=0,n=f.length;l<n;++l)c.j[f[l]]&&h()})};_.t=_.pc.prototype;_.t.getId=_.m("S");_.t.getGeometry=_.m("j");_.t.setGeometry=function(a){var b=this.j;try{this.j=a?$b(a):null}catch(c){_.yb(c);return}_.I.trigger(this,"setgeometry",{feature:this,newGeometry:this.j,oldGeometry:b})};_.t.getProperty=function(a){return $a(this.R,a)};_.t.setProperty=function(a,b){if(void 0===b)this.removeProperty(a);else{var c=this.getProperty(a);this.R[a]=b;_.I.trigger(this,"setproperty",{feature:this,name:a,newValue:b,oldValue:c})}};
_.t.removeProperty=function(a){var b=this.getProperty(a);delete this.R[a];_.I.trigger(this,"removeproperty",{feature:this,name:a,oldValue:b})};_.t.forEachProperty=function(a){for(var b in this.R)a(this.getProperty(b),b)};_.t.toGeoJson=function(a){var b=this;_.M("data",function(c){c.R(b,a)})};_.Mg=new _.N(0,0);_.N.prototype.toString=function(){return"("+this.x+", "+this.y+")"};_.N.prototype.j=function(a){return a?a.x==this.x&&a.y==this.y:!1};_.N.prototype.equals=_.N.prototype.j;_.N.prototype.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y)};_.N.prototype.Nf=_.ra(0);_.Ng=new _.O(0,0);_.O.prototype.toString=function(){return"("+this.width+", "+this.height+")"};_.O.prototype.j=function(a){return a?a.width==this.width&&a.height==this.height:!1};_.O.prototype.equals=_.O.prototype.j;var Og={CIRCLE:0,FORWARD_CLOSED_ARROW:1,FORWARD_OPEN_ARROW:2,BACKWARD_CLOSED_ARROW:3,BACKWARD_OPEN_ARROW:4};_.v(_.wc,_.J);_.t=_.wc.prototype;_.t.getAt=function(a){return this.j[a]};_.t.indexOf=function(a){for(var b=0,c=this.j.length;b<c;++b)if(a===this.j[b])return b;return-1};_.t.forEach=function(a){for(var b=0,c=this.j.length;b<c;++b)a(this.j[b],b)};_.t.setAt=function(a,b){var c=this.j[a],d=this.j.length;if(a<d)this.j[a]=b,_.I.trigger(this,"set_at",a,c),this.U&&this.U(a,c);else{for(c=d;c<a;++c)this.insertAt(c,void 0);this.insertAt(a,b)}};
_.t.insertAt=function(a,b){this.j.splice(a,0,b);vc(this);_.I.trigger(this,"insert_at",a);this.R&&this.R(a)};_.t.removeAt=function(a){var b=this.j[a];this.j.splice(a,1);vc(this);_.I.trigger(this,"remove_at",a,b);this.S&&this.S(a,b);return b};_.t.push=function(a){this.insertAt(this.j.length,a);return this.j.length};_.t.pop=function(){return this.removeAt(this.j.length-1)};_.t.getArray=_.m("j");_.t.clear=function(){for(;this.get("length");)this.pop()};_.uc(_.wc.prototype,{length:null});_.xc.prototype.remove=function(a){var b=this.R,c=this.S(a);b[c]&&(delete b[c],_.I.trigger(this,"remove",a),this.onRemove&&this.onRemove(a))};_.xc.prototype.contains=function(a){return!!this.R[this.S(a)]};_.xc.prototype.forEach=function(a){var b=this.R,c;for(c in b)a.call(this,b[c])};_.zc.prototype.mc=_.ra(1);_.zc.prototype.forEach=function(a,b){_.Ob(this.j,function(c,d){a.call(b,c,d)})};var Pg=_.zb({zoom:_.Jg,heading:_.qc,pitch:_.qc});_.v(_.Bc,_.J);var Qg=function(a){return function(){return a}}(null);a:{var Rg=_.ad.navigator;if(Rg){var Sg=Rg.userAgent;if(Sg){_.Jb=Sg;break a}}_.Jb=""};Lc.prototype.get=function(){var a;0<this.R?(this.R--,a=this.j,this.j=a.next,a.next=null):a=this.S();return a};_.Tg=new Lc(function(){return new Nc},function(a){a.reset()},100);Mc.prototype.add=function(a,b){var c=_.Tg.get();c.set(a,b);this.R?this.R.next=c:this.j=c;this.R=c};Mc.prototype.remove=function(){var a=null;this.j&&(a=this.j,this.j=this.j.next,this.j||(this.R=null),a.next=null);return a};Nc.prototype.set=function(a,b){this.Md=a;this.j=b;this.next=null};Nc.prototype.reset=function(){this.next=this.j=this.Md=null};_.Ug=new Mc;Pc.prototype.addListener=function(a,b,c){c=c?{Ii:!1}:null;var d=!this.Fa.length,e;e=this.Fa;var f=Qb(e,Oc(a,b));(e=0>f?null:_.xa(e)?e.charAt(f):e[f])?e.Ke=e.Ke&&c:this.Fa.push({Md:a,context:b||null,Ke:c});d&&this.R();return a};Pc.prototype.addListenerOnce=function(a,b){this.addListener(a,b,!0);return a};Pc.prototype.removeListener=function(a,b){if(this.Fa.length){var c=this.Fa,d=Qb(c,Oc(a,b));0<=d&&_.Rb(c,d);this.Fa.length||this.j()}};
Pc.prototype.forEach=function(a,b){var c=this.Fa.slice(0),d=this;(function(){_.Ob(c,function(c){a.call(b||null,function(a){if(c.Ke){if(c.Ke.Ii)return;c.Ke.Ii=!0;_.Sb(d.Fa,c);d.Fa.length||d.j()}c.Md.call(c.context,a)})})})()};_.t=_.Qc.prototype;_.t.Je=_.k();_.t.He=_.k();_.t.addListener=function(a,b){return this.Fa.addListener(a,b)};_.t.addListenerOnce=function(a,b){return this.Fa.addListenerOnce(a,b)};_.t.removeListener=function(a,b){return this.Fa.removeListener(a,b)};_.t.Qf=function(){this.Fa.forEach(function(a){a(this.get())},this)};_.v(_.Rc,_.Qc);_.Rc.prototype.set=function(a){this.dk(a);this.notify()};_.Rc.prototype.notify=function(){this.Qf()};_.v(_.Sc,_.Rc);_.Sc.prototype.get=_.m("j");_.Sc.prototype.dk=_.oa("j");_.v(Tc,_.J);var Wg;_.Vg=new Xc;Wg=/'/g;Xc.prototype.j=function(a,b){var c=[];Zc(a,b,c);return c.join("&").replace(Wg,"%27")};var hh,cd,lh;_.Xg=_.Ic();_.Yg=_.Jc();_.Zg=_.Hc("Edge");_.$g=_.Hc("Gecko")&&!(_.Kb()&&!_.Hc("Edge"))&&!(_.Hc("Trident")||_.Hc("MSIE"))&&!_.Hc("Edge");_.ah=_.Kb()&&!_.Hc("Edge");_.bh=_.Hc("Macintosh");_.ch=_.Hc("Windows");_.dh=_.Hc("Linux")||_.Hc("CrOS");_.eh=_.Hc("Android");_.fh=_.$c();_.gh=_.Hc("iPad");
a:{var ih="",jh=function(){var a=_.Jb;if(_.$g)return/rv\:([^\);]+)(\)|;)/.exec(a);if(_.Zg)return/Edge\/([\d\.]+)/.exec(a);if(_.Yg)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(_.ah)return/WebKit\/(\S+)/.exec(a);if(_.Xg)return/(?:Version)[ \/]?(\S+)/.exec(a)}();jh&&(ih=jh?jh[1]:"");if(_.Yg){var kh=bd();if(null!=kh&&kh>(0,window.parseFloat)(ih)){hh=String(kh);break a}}hh=ih}_.dd=hh;cd={};lh=_.ad.document;_.mh=lh&&_.Yg?bd()||("CSS1Compat"==lh.compatMode?(0,window.parseInt)(_.dd,10):5):void 0;_.nh=_.Hc("Firefox");_.oh=_.$c()||_.Hc("iPod");_.ph=_.Hc("iPad");_.qh=_.Hc("Android")&&!(Kc()||_.Hc("Firefox")||_.Ic()||_.Hc("Silk"));_.rh=Kc();_.sh=_.Hc("Safari")&&!(Kc()||_.Hc("Coast")||_.Ic()||_.Hc("Edge")||_.Hc("Silk")||_.Hc("Android"))&&!(_.$c()||_.Hc("iPad")||_.Hc("iPod"));_.fd.prototype.heading=_.m("j");_.fd.prototype.Ib=_.ra(2);_.fd.prototype.toString=function(){return this.j+","+this.R};_.th=new _.fd;_.v(gd,_.J);gd.prototype.set=function(a,b){if(null!=b&&!(b&&_.F(b.maxZoom)&&b.tileSize&&b.tileSize.width&&b.tileSize.height&&b.getTile&&b.getTile.apply))throw Error("Valeur attendue pour l\u2019int\u00e9gration de google.maps.MapType");return _.J.prototype.set.apply(this,arguments)};_.t=hd.prototype;_.t.isEmpty=function(){return 360==this.j-this.R};_.t.intersects=function(a){var b=this.j,c=this.R;return this.isEmpty()||a.isEmpty()?!1:_.id(this)?_.id(a)||a.j<=this.R||a.R>=b:_.id(a)?a.j<=c||a.R>=b:a.j<=c&&a.R>=b};_.t.contains=function(a){-180==a&&(a=180);var b=this.j,c=this.R;return _.id(this)?(a>=b||a<=c)&&!this.isEmpty():a>=b&&a<=c};_.t.extend=function(a){this.contains(a)||(this.isEmpty()?this.j=this.R=a:_.ld(a,this.j)<_.ld(this.R,a)?this.j=a:this.R=a)};
_.t.Lc=function(){var a=(this.j+this.R)/2;_.id(this)&&(a=_.La(a+180,-180,180));return a};_.t=md.prototype;_.t.isEmpty=function(){return this.R>this.j};_.t.intersects=function(a){var b=this.R,c=this.j;return b<=a.R?a.R<=c&&a.R<=a.j:b<=a.j&&b<=c};_.t.contains=function(a){return a>=this.R&&a<=this.j};_.t.extend=function(a){this.isEmpty()?this.j=this.R=a:a<this.R?this.R=a:a>this.j&&(this.j=a)};_.t.Lc=function(){return(this.j+this.R)/2};_.t=_.od.prototype;_.t.getCenter=function(){return new _.L(this.R.Lc(),this.j.Lc())};_.t.toString=function(){return"("+this.getSouthWest()+", "+this.getNorthEast()+")"};_.t.toJSON=function(){return{south:this.R.R,west:this.j.j,north:this.R.j,east:this.j.R}};_.t.toUrlValue=function(a){var b=this.getSouthWest(),c=this.getNorthEast();return[b.toUrlValue(a),c.toUrlValue(a)].join()};
_.t.$k=function(a){if(!a)return!1;a=_.rd(a);var b=this.R,c=a.R;return(b.isEmpty()?c.isEmpty():1E-9>=Math.abs(c.R-b.R)+Math.abs(b.j-c.j))&&_.kd(this.j,a.j)};_.od.prototype.equals=_.od.prototype.$k;_.t=_.od.prototype;_.t.contains=function(a){return this.R.contains(a.lat())&&this.j.contains(a.lng())};_.t.intersects=function(a){a=_.rd(a);return this.R.intersects(a.R)&&this.j.intersects(a.j)};_.t.extend=function(a){this.R.extend(a.lat());this.j.extend(a.lng());return this};
_.t.union=function(a){a=_.rd(a);if(!a||a.isEmpty())return this;this.extend(a.getSouthWest());this.extend(a.getNorthEast());return this};_.t.getSouthWest=function(){return new _.L(this.R.R,this.j.j,!0)};_.t.getNorthEast=function(){return new _.L(this.R.j,this.j.R,!0)};_.t.toSpan=function(){return new _.L(_.nd(this.R),_.jd(this.j),!0)};_.t.isEmpty=function(){return this.R.isEmpty()||this.j.isEmpty()};var qd=_.zb({south:_.qc,west:_.qc,north:_.qc,east:_.qc},!1);_.v(_.sd,_.J);_.dg=[];_.t=vd.prototype;_.t.contains=function(a){return this.j.hasOwnProperty(_.pb(a))};_.t.getFeatureById=function(a){return $a(this.R,a)};
_.t.add=function(a){a=a||{};a=a instanceof _.pc?a:new _.pc(a);if(!this.contains(a)){var b=a.getId();if(b){var c=this.getFeatureById(b);c&&this.remove(c)}c=_.pb(a);this.j[c]=a;b&&(this.R[b]=a);var d=_.I.forward(a,"setgeometry",this),e=_.I.forward(a,"setproperty",this),f=_.I.forward(a,"removeproperty",this);this.S[c]=function(){_.I.removeListener(d);_.I.removeListener(e);_.I.removeListener(f)};_.I.trigger(this,"addfeature",{feature:a})}return a};
_.t.remove=function(a){var b=_.pb(a),c=a.getId();if(this.j[b]){delete this.j[b];c&&delete this.R[c];if(c=this.S[b])delete this.S[b],c();_.I.trigger(this,"removefeature",{feature:a})}};_.t.forEach=function(a){for(var b in this.j)a(this.j[b])};wd.prototype.get=function(a){return this.j[a]};wd.prototype.set=function(a,b){var c=this.j;c[a]||(c[a]={});_.Ia(c[a],b);_.I.trigger(this,"changed",a)};wd.prototype.reset=function(a){delete this.j[a];_.I.trigger(this,"changed",a)};wd.prototype.forEach=function(a){_.Ha(this.j,a)};_.v(xd,_.J);xd.prototype.overrideStyle=function(a,b){this.j.set(_.pb(a),b)};xd.prototype.revertStyle=function(a){a?this.j.reset(_.pb(a)):this.j.forEach((0,_.u)(this.j.reset,this.j))};_.v(_.zd,vb);_.zd.prototype.getType=_.pa("GeometryCollection");_.zd.prototype.getLength=function(){return this.j.length};_.zd.prototype.getAt=function(a){return this.j[a]};_.zd.prototype.getArray=function(){return this.j.slice()};_.v(_.Bd,vb);_.Bd.prototype.getType=_.pa("LineString");_.Bd.prototype.getLength=function(){return this.j.length};_.Bd.prototype.getAt=function(a){return this.j[a]};_.Bd.prototype.getArray=function(){return this.j.slice()};var Cd=_.Db(_.Bb(_.Bd,"google.maps.Data.LineString",!0));_.v(_.Dd,vb);_.Dd.prototype.getType=_.pa("MultiLineString");_.Dd.prototype.getLength=function(){return this.j.length};_.Dd.prototype.getAt=function(a){return this.j[a]};_.Dd.prototype.getArray=function(){return this.j.slice()};_.v(_.Ed,vb);_.Ed.prototype.getType=_.pa("MultiPoint");_.Ed.prototype.getLength=function(){return this.j.length};_.Ed.prototype.getAt=function(a){return this.j[a]};_.Ed.prototype.getArray=function(){return this.j.slice()};_.v(_.Fd,vb);_.Fd.prototype.getType=_.pa("LinearRing");_.Fd.prototype.getLength=function(){return this.j.length};_.Fd.prototype.getAt=function(a){return this.j[a]};_.Fd.prototype.getArray=function(){return this.j.slice()};var Gd=_.Db(_.Bb(_.Fd,"google.maps.Data.LinearRing",!0));_.v(_.Hd,vb);_.Hd.prototype.getType=_.pa("Polygon");_.Hd.prototype.getLength=function(){return this.j.length};_.Hd.prototype.getAt=function(a){return this.j[a]};_.Hd.prototype.getArray=function(){return this.j.slice()};var Id=_.Db(_.Bb(_.Hd,"google.maps.Data.Polygon",!0));_.v(_.Jd,vb);_.Jd.prototype.getType=_.pa("MultiPolygon");_.Jd.prototype.getLength=function(){return this.j.length};_.Jd.prototype.getAt=function(a){return this.j[a]};_.Jd.prototype.getArray=function(){return this.j.slice()};var uh=_.zb({source:_.Ig,webUrl:_.Kg,iosDeepLinkId:_.Kg});var vh=_.Ga(_.zb({placeId:_.Kg,query:_.Kg,location:_.Yb}),function(a){if(a.placeId&&a.query)throw _.xb("cannot set both placeId and query");if(!a.placeId&&!a.query)throw _.xb("must set one of placeId or query");return a});_.v(Kd,_.J);
_.uc(Kd.prototype,{position:_.Gb(_.Yb),title:_.Kg,icon:_.Gb(_.Fb(_.Ig,{Yh:Hb("url"),then:_.zb({url:_.Ig,scaledSize:_.Gb(sc),size:_.Gb(sc),origin:_.Gb(rc),anchor:_.Gb(rc),labelOrigin:_.Gb(rc),path:_.Eb(Qa)},!0)},{Yh:Hb("path"),then:_.zb({path:_.Fb(_.Ig,_.Cb(Og)),anchor:_.Gb(rc),labelOrigin:_.Gb(rc),fillColor:_.Kg,fillOpacity:_.Jg,rotation:_.Jg,scale:_.Jg,strokeColor:_.Kg,strokeOpacity:_.Jg,strokeWeight:_.Jg,url:_.Eb(Qa)},!0)})),label:_.Gb(_.Fb(_.Ig,{Yh:Hb("text"),then:_.zb({text:_.Ig,fontSize:_.Kg,fontWeight:_.Kg,
fontFamily:_.Kg},!0)})),shadow:_.Cc,shape:_.Cc,cursor:_.Kg,clickable:_.Lg,animation:_.Cc,draggable:_.Lg,visible:_.Lg,flat:_.Cc,zIndex:_.Jg,opacity:_.Jg,place:_.Gb(vh),attribution:_.Gb(uh)});var kc={main:[],common:["main"],util:["common"],adsense:["main"],controls:["util"],data:["util"],directions:["util","geometry"],distance_matrix:["util"],drawing:["main"],drawing_impl:["controls"],elevation:["util","geometry"],geocoder:["util"],geojson:["main"],imagery_viewer:["main"],geometry:["main"],infowindow:["util"],kml:["onion","util","map"],layers:["map"],map:["common"],marker:["util"],maxzoom:["util"],onion:["util","map"],overlay:["common"],panoramio:["main"],places:["main"],places_impl:["controls"],
poly:["util","map","geometry"],search:["main"],search_impl:["onion"],stats:["util"],streetview:["util","geometry"],usage:["util"],visualization:["main"],visualization_impl:["onion"],weather:["main"],zombie:["main"]};var wh=_.ad.google.maps,xh=fc.Nc(),yh=(0,_.u)(xh.Sc,xh);wh.__gjsload__=yh;_.Ha(wh.modules,yh);delete wh.modules;_.zh=_.Gb(_.Bb(_.sd,"Map"));var Ah=_.Gb(_.Bb(_.Bc,"StreetViewPanorama"));_.v(_.Md,Kd);_.Md.prototype.map_changed=function(){this.__gm.set&&this.__gm.set.remove(this);var a=this.get("map");this.__gm.set=a&&a.__gm.Qd;this.__gm.set&&_.yc(this.__gm.set,this)};_.Md.MAX_ZINDEX=1E6;_.uc(_.Md.prototype,{map:_.Fb(_.zh,Ah)});var Rd=Td(_.Bb(_.L,"LatLng"));_.v(Vd,_.J);Vd.prototype.map_changed=Vd.prototype.visible_changed=function(){var a=this;_.M("poly",function(b){b.R(a)})};Vd.prototype.getPath=function(){return this.get("latLngs").getAt(0)};Vd.prototype.setPath=function(a){try{this.get("latLngs").setAt(0,Sd(a))}catch(b){_.yb(b)}};_.uc(Vd.prototype,{draggable:_.Lg,editable:_.Lg,map:_.zh,visible:_.Lg});_.v(_.Wd,Vd);_.Wd.prototype.Bb=!0;_.Wd.prototype.getPaths=function(){return this.get("latLngs")};_.Wd.prototype.setPaths=function(a){this.set("latLngs",Ud(a))};_.v(_.Xd,Vd);_.Xd.prototype.Bb=!1;_.Zd="click dblclick mousedown mousemove mouseout mouseover mouseup rightclick".split(" ");_.v($d,_.J);_.t=$d.prototype;_.t.contains=function(a){return this.j.contains(a)};_.t.getFeatureById=function(a){return this.j.getFeatureById(a)};_.t.add=function(a){return this.j.add(a)};_.t.remove=function(a){this.j.remove(a)};_.t.forEach=function(a){this.j.forEach(a)};_.t.addGeoJson=function(a,b){return _.Yd(this.j,a,b)};_.t.loadGeoJson=function(a,b,c){var d=this.j;_.M("data",function(e){e.yn(d,a,b,c)})};_.t.toGeoJson=function(a){var b=this.j;_.M("data",function(c){c.vn(b,a)})};
_.t.overrideStyle=function(a,b){this.R.overrideStyle(a,b)};_.t.revertStyle=function(a){this.R.revertStyle(a)};_.t.controls_changed=function(){this.get("controls")&&ae(this)};_.t.drawingMode_changed=function(){this.get("drawingMode")&&ae(this)};_.uc($d.prototype,{map:_.zh,style:_.Cc,controls:_.Gb(_.Db(_.Cb(Hg))),controlPosition:_.Gb(_.Cb(_.lf)),drawingMode:_.Gb(_.Cb(Hg))});_.be.prototype.$=_.m("j");_.ce.prototype.$=_.m("j");_.Bh=new _.be;_.Ch=new _.be;de.prototype.$=_.m("j");_.Dh=new _.ee;_.ee.prototype.$=_.m("j");_.Eh=new _.be;_.Fh=new de;_.fe.prototype.$=_.m("j");_.Gh=new _.ce;_.Hh=new _.fe;_.Ih={METRIC:0,IMPERIAL:1};_.Jh={DRIVING:"DRIVING",WALKING:"WALKING",BICYCLING:"BICYCLING",TRANSIT:"TRANSIT"};_.Kh={BEST_GUESS:"bestguess",OPTIMISTIC:"optimistic",PESSIMISTIC:"pessimistic"};_.Lh={BUS:"BUS",RAIL:"RAIL",SUBWAY:"SUBWAY",TRAIN:"TRAIN",TRAM:"TRAM"};_.Mh={LESS_WALKING:"LESS_WALKING",FEWER_TRANSFERS:"FEWER_TRANSFERS"};var Nh=_.zb({routes:_.Db(_.Eb(_.Ra))},!0);_.v(_.ge,_.J);_.uc(_.ge.prototype,{content:_.Fb(_.Kg,_.Eb(Ab)),position:_.Gb(_.Yb),size:_.Gb(sc),map:_.Fb(_.zh,Ah),anchor:_.Gb(_.Bb(_.J,"MVCObject")),zIndex:_.Jg});_.ge.prototype.open=function(a,b){this.set("anchor",b);this.set("map",a)};_.ge.prototype.close=function(){this.set("map",null)};_.v(he,_.J);he.prototype.changed=function(a){if("map"==a||"panel"==a){var b=this;_.M("directions",function(c){c.R(b,a)})}};_.uc(he.prototype,{directions:Nh,map:_.zh,panel:_.Gb(_.Eb(Ab)),routeIndex:_.Jg});_.Oh=new _.ie;je.prototype.route=function(a,b){_.M("directions",function(c){c.j(a,b,!0)})};ke.prototype.getDistanceMatrix=function(a,b){_.M("distance_matrix",function(c){c.j(a,b)})};le.prototype.getElevationAlongPath=function(a,b){_.M("elevation",function(c){c.j(a,b)})};le.prototype.getElevationForLocations=function(a,b){_.M("elevation",function(c){c.R(a,b)})};_.Ph=_.Bb(_.od,"LatLngBounds");_.me.prototype.geocode=function(a,b){_.M("geocoder",function(c){c.geocode(a,b)})};_.v(_.ne,_.J);_.ne.prototype.map_changed=function(){var a=this;_.M("kml",function(b){b.j(a)})};_.uc(_.ne.prototype,{map:_.zh,url:null,bounds:null,opacity:_.Jg});_.Rh={UNKNOWN:"UNKNOWN",OK:_.ha,INVALID_REQUEST:_.ba,DOCUMENT_NOT_FOUND:"DOCUMENT_NOT_FOUND",FETCH_ERROR:"FETCH_ERROR",INVALID_DOCUMENT:"INVALID_DOCUMENT",DOCUMENT_TOO_LARGE:"DOCUMENT_TOO_LARGE",LIMITS_EXCEEDED:"LIMITS_EXECEEDED",TIMED_OUT:"TIMED_OUT"};_.v(oe,_.J);_.t=oe.prototype;_.t.af=function(){var a=this;_.M("kml",function(b){b.R(a)})};_.t.url_changed=oe.prototype.af;_.t.driveFileId_changed=oe.prototype.af;_.t.map_changed=oe.prototype.af;_.t.zIndex_changed=oe.prototype.af;_.uc(oe.prototype,{map:_.zh,defaultViewport:null,metadata:null,status:null,url:_.Kg,screenOverlays:_.Lg,zIndex:_.Jg});_.v(_.pe,_.J);_.pe.prototype.map_changed=function(){var a=this;_.M("layers",function(b){b.j(a)})};_.uc(_.pe.prototype,{map:_.zh});_.v(qe,_.J);qe.prototype.map_changed=function(){var a=this;_.M("layers",function(b){b.R(a)})};_.uc(qe.prototype,{map:_.zh});_.v(re,_.J);re.prototype.map_changed=function(){var a=this;_.M("layers",function(b){b.S(a)})};_.uc(re.prototype,{map:_.zh});_.kf={japan_prequake:20,japan_postquake2010:24};_.Sh={NEAREST:"nearest",BEST:"best"};_.Th={DEFAULT:"default",OUTDOOR:"outdoor"};var Uh,Vh,Wh,Xh,Yh;se.prototype.$=_.m("j");var Zh=new te,$h=new ue,ye=new ve,ai=new we;te.prototype.$=_.m("j");ue.prototype.$=_.m("j");ve.prototype.$=_.m("j");we.prototype.$=_.m("j");_.Ae.prototype.$=_.m("j");_.bi=new _.Ae;_.ci=new _.Ae;var cf,df,Xe,ff,hf;_.Be.prototype.$=_.m("j");_.Be.prototype.getUrl=function(a){return _.R(this.j,0)[a]};_.Be.prototype.setUrl=function(a,b){_.R(this.j,0)[a]=b};_.Ge.prototype.$=_.m("j");_.He.prototype.$=_.m("j");_.di=new _.Be;_.ei=new _.Be;_.fi=new _.Be;_.gi=new _.Be;_.hi=new _.Be;Ie.prototype.$=_.m("j");Je.prototype.$=_.m("j");Ke.prototype.$=_.m("j");Le.prototype.$=_.m("j");_.ii=new _.He;_.ji=new _.Ge;cf=new Ie;df=new Je;Xe=new Ke;_.ki=new _.Ne;_.li=new _.Oe;ff=new se;hf=new Me;Me.prototype.$=_.m("j");
_.Ne.prototype.$=_.m("j");_.Oe.prototype.$=_.m("j");_.v(mf,_.Bc);mf.prototype.visible_changed=function(){var a=this;!a.W&&a.getVisible()&&(a.W=!0,_.M("streetview",function(b){var c;a.S&&(c=a.S);b.yp(a,c)}))};_.uc(mf.prototype,{visible:_.Lg,pano:_.Kg,position:_.Gb(_.Yb),pov:_.Gb(Pg),photographerPov:null,location:null,links:_.Db(_.Eb(_.Ra)),status:null,zoom:_.Jg,enableCloseButton:_.Lg});mf.prototype.registerPanoProvider=_.tc("panoProvider");_.t=_.of.prototype;_.t.mf=_.ra(3);_.t.wc=_.ra(4);_.t.Te=_.ra(5);_.t.Se=_.ra(6);_.t.Re=_.ra(7);_.v(pf,Tc);_.qf.prototype.addListener=function(a,b){this.Fa.addListener(a,b)};_.qf.prototype.addListenerOnce=function(a,b){this.Fa.addListenerOnce(a,b)};_.qf.prototype.removeListener=function(a,b){this.Fa.removeListener(a,b)};_.qf.prototype.j=_.ra(8);_.U={};_.rf.prototype.fromLatLngToPoint=function(a,b){var c=b||new _.N(0,0),d=this.j;c.x=d.x+a.lng()*this.S;var e=_.Ka(Math.sin(_.K(a.lat())),-(1-1E-15),1-1E-15);c.y=d.y+.5*Math.log((1+e)/(1-e))*-this.U;return c};_.rf.prototype.fromPointToLatLng=function(a,b){var c=this.j;return new _.L(_.Tb(2*Math.atan(Math.exp((a.y-c.y)/-this.U))-Math.PI/2),(a.x-c.x)/this.S,b)};_.sf.prototype.isEmpty=function(){return!(this.Ba<this.Da&&this.Aa<this.Ga)};_.sf.prototype.extend=function(a){a&&(this.Ba=Math.min(this.Ba,a.x),this.Da=Math.max(this.Da,a.x),this.Aa=Math.min(this.Aa,a.y),this.Ga=Math.max(this.Ga,a.y))};_.sf.prototype.getCenter=function(){return new _.N((this.Ba+this.Da)/2,(this.Aa+this.Ga)/2)};_.mi=_.tf(-window.Infinity,-window.Infinity,window.Infinity,window.Infinity);_.ni=_.tf(0,0,0,0);_.v(_.wf,_.J);_.wf.prototype.Ca=function(){var a=this;a.ua||(a.ua=window.setTimeout(function(){a.ua=void 0;a.Ma()},a.zl))};_.wf.prototype.ma=function(){this.ua&&window.clearTimeout(this.ua);this.ua=void 0;this.Ma()};var oi,pi;Af.prototype.$=_.m("j");Bf.prototype.$=_.m("j");var qi=new Af;var ri,si;Cf.prototype.$=_.m("j");Df.prototype.$=_.m("j");var ti;Ef.prototype.$=_.m("j");Ef.prototype.getZoom=function(){var a=this.j[2];return null!=a?a:0};Ef.prototype.setZoom=function(a){this.j[2]=a};var ui=new Cf,vi=new Df,wi=new Bf,xi=new se;_.v(Ff,_.wf);var Gf={roadmap:0,satellite:2,hybrid:3,terrain:4},yi={0:1,2:2,3:2,4:2};_.t=Ff.prototype;_.t.bj=_.P("center");_.t.pi=_.P("zoom");_.t.changed=function(){var a=this.bj(),b=this.pi(),c=Hf(this);if(a&&!a.j(this.va)||this.ta!=b||this.ya!=c)If(this.R),this.Ca(),this.ta=b,this.ya=c;this.va=a};
_.t.Ma=function(){var a="",b=this.bj(),c=this.pi(),d=Hf(this),e=this.get("size");if(b&&(0,window.isFinite)(b.lat())&&(0,window.isFinite)(b.lng())&&1<c&&null!=d&&e&&e.width&&e.height&&this.j){_.xf(this.j,e);var f;(b=_.uf(this.U,b,c))?(f=new _.sf,f.Ba=Math.round(b.x-e.width/2),f.Da=f.Ba+e.width,f.Aa=Math.round(b.y-e.height/2),f.Ga=f.Aa+e.height):f=null;b=yi[d];if(f){var a=new Ef,g;a.j[0]=a.j[0]||[];g=new Cf(a.j[0]);g.j[0]=f.Ba;g.j[1]=f.Aa;a.j[1]=b;a.setZoom(c);a.j[3]=a.j[3]||[];c=new Df(a.j[3]);c.j[0]=
f.Da-f.Ba;c.j[1]=f.Ga-f.Aa;a.j[4]=a.j[4]||[];c=new Bf(a.j[4]);c.j[0]=d;c.j[4]=_.Pe(_.Re(_.S));c.j[5]=_.Qe(_.Re(_.S)).toLowerCase();c.j[9]=!0;c.j[11]=!0;d=this.W+(0,window.unescape)("%3F");ti||(c=[],ti={qa:-1,ra:c},ri||(b=[],ri={qa:-1,ra:b},b[1]={type:"i",label:1,T:0},b[2]={type:"i",label:1,T:0}),c[1]={type:"m",label:1,T:ui,ka:ri},c[2]={type:"e",label:1,T:0},c[3]={type:"u",label:1,T:0},si||(b=[],si={qa:-1,ra:b},b[1]={type:"u",label:1,T:0},b[2]={type:"u",label:1,T:0},b[3]={type:"e",label:1,T:1}),c[4]=
{type:"m",label:1,T:vi,ka:si},pi||(b=[],pi={qa:-1,ra:b},b[1]={type:"e",label:1,T:0},b[2]={type:"b",label:1,T:!1},b[3]={type:"b",label:1,T:!1},b[5]={type:"s",label:1,T:""},b[6]={type:"s",label:1,T:""},oi||(f=[],oi={qa:-1,ra:f},f[1]={type:"e",label:3},f[2]={type:"b",label:1,T:!1}),b[9]={type:"m",label:1,T:qi,ka:oi},b[10]={type:"b",label:1,T:!1},b[11]={type:"b",label:1,T:!1},b[12]={type:"b",label:1,T:!1},b[100]={type:"b",label:1,T:!1}),c[5]={type:"m",label:1,T:wi,ka:pi},Uh||(b=[],Uh={qa:-1,ra:b},Vh||
(f=[],Vh={qa:-1,ra:f},f[1]={type:"b",label:1,T:!1}),b[1]={type:"m",label:1,T:Zh,ka:Vh},Wh||(f=[],Wh={qa:-1,ra:f},f[1]={type:"b",label:1,T:!1}),b[12]={type:"m",label:1,T:$h,ka:Wh},Xh||(f=[],Xh={qa:-1,ra:f},f[9]={type:"j",label:1,T:0},f[10]={type:"j",label:1,T:0},f[14]={type:"s",label:1,T:""}),b[11]={type:"m",label:1,T:ye,ka:Xh},Yh||(f=[],Yh={qa:-1,ra:f},f[1]={type:"b",label:1,T:!1},f[2]={type:"b",label:1,T:!1}),b[10]={type:"m",label:1,T:ai,ka:Yh}),c[6]={type:"m",label:1,T:xi,ka:Uh});a=_.Vg.j(a.j,ti);
a=this.V(d+a)}}this.R&&e&&(_.xf(this.R,e),e=a,a=this.R,e!=a.src?(If(a),a.onload=_.Wa(this,this.ri,!0),a.onerror=_.Wa(this,this.ri,!1),a.src=e):!a.parentNode&&e&&this.j.appendChild(a))};_.t.ri=function(a){var b=this.R;b.onload=null;b.onerror=null;a&&(b.parentNode||this.j.appendChild(b),_.xf(b,this.get("size")),_.I.trigger(this,"staticmaploaded"),this.S.set(_.Fa()));this.set("loading",!1)};
_.t.div_changed=function(){var a=this.get("div"),b=this.j;if(a)if(b)a.appendChild(b);else{b=this.j=window.document.createElement("div");b.style.overflow="hidden";var c=this.R=window.document.createElement("img");_.I.addDomListener(b,"contextmenu",function(a){_.cb(a);_.eb(a)});c.ontouchstart=c.ontouchmove=c.ontouchend=c.ontouchcancel=function(a){_.db(a);_.eb(a)};_.xf(c,_.Ng);a.appendChild(b);this.Ma()}else b&&(If(b),this.j=null)};var Pf;_.cg="StopIteration"in _.ad?_.ad.StopIteration:{message:"StopIteration",stack:""};_.Rf.prototype.next=function(){throw _.cg;};_.Rf.prototype.Bg=function(){return this};_.Sf.prototype.dh=!0;_.Sf.prototype.pd=_.ra(10);_.Sf.prototype.oj=!0;_.Sf.prototype.Df=_.ra(12);_.Tf("about:blank");_.Vf.prototype.oj=!0;_.Vf.prototype.Df=_.ra(11);_.Vf.prototype.dh=!0;_.Vf.prototype.pd=_.ra(9);_.Uf={};_.Wf("<!DOCTYPE html>",0);_.Wf("",0);_.Wf("<br>",0);!_.$g&&!_.Yg||_.Yg&&9<=Number(_.mh)||_.$g&&_.ed("1.9.1");_.Yg&&_.ed("9");_.v(Zf,_.Rf);Zf.prototype.setPosition=function(a,b,c){if(this.node=a)this.R=_.ya(b)?b:1!=this.node.nodeType?0:this.j?-1:1;_.ya(c)&&(this.depth=c)};
Zf.prototype.next=function(){var a;if(this.S){if(!this.node||this.U&&0==this.depth)throw _.cg;a=this.node;var b=this.j?-1:1;if(this.R==b){var c=this.j?a.lastChild:a.firstChild;c?this.setPosition(c):this.setPosition(a,-1*b)}else(c=this.j?a.previousSibling:a.nextSibling)?this.setPosition(c):this.setPosition(a.parentNode,-1*b);this.depth+=this.R*(this.j?-1:1)}else this.S=!0;a=this.node;if(!this.node)throw _.cg;return a};
Zf.prototype.splice=function(a){var b=this.node,c=this.j?1:-1;this.R==c&&(this.R=-1*c,this.depth+=this.R*(this.j?-1:1));this.j=!this.j;Zf.prototype.next.call(this);this.j=!this.j;for(var c=_.wa(arguments[0])?arguments[0]:arguments,d=c.length-1;0<=d;d--)_.Xf(c[d],b);_.Yf(b)};_.v($f,Zf);$f.prototype.next=function(){do $f.sd.next.call(this);while(-1==this.R);return this.node};_.Ai=_.ad.document&&_.ad.document.createElement("div");_.v(_.gg,_.sd);_.t=_.gg.prototype;_.t.streetView_changed=function(){this.get("streetView")||this.set("streetView",this.__gm.S)};_.t.getDiv=function(){return this.__gm.Ia};_.t.panBy=function(a,b){var c=this.__gm;_.M("map",function(){_.I.trigger(c,"panby",a,b)})};_.t.panTo=function(a){var b=this.__gm;a=_.Yb(a);_.M("map",function(){_.I.trigger(b,"panto",a)})};_.t.panToBounds=function(a){var b=this.__gm,c=_.rd(a);_.M("map",function(){_.I.trigger(b,"pantolatlngbounds",c)})};
_.t.fitBounds=function(a){var b=this;a=_.rd(a);_.M("map",function(c){c.fitBounds(b,a)})};_.uc(_.gg.prototype,{bounds:null,streetView:Ah,center:_.Gb(_.Yb),zoom:_.Jg,mapTypeId:_.Kg,projection:null,heading:_.Jg,tilt:_.Jg});hg.prototype.getMaxZoomAtLatLng=function(a,b){_.M("maxzoom",function(c){c.getMaxZoomAtLatLng(a,b)})};_.v(ig,_.J);ig.prototype.changed=function(a){if("suppressInfoWindows"!=a&&"clickable"!=a){var b=this;_.M("onion",function(a){a.j(b)})}};_.uc(ig.prototype,{map:_.zh,tableId:_.Jg,query:_.Gb(_.Fb(_.Ig,_.Eb(_.Ra,"not an Object")))});_.v(_.jg,_.J);_.jg.prototype.map_changed=function(){var a=this;_.M("overlay",function(b){b.j(a)})};_.uc(_.jg.prototype,{panes:null,projection:null,map:_.Fb(_.zh,Ah)});_.v(_.kg,_.J);_.kg.prototype.map_changed=_.kg.prototype.visible_changed=function(){var a=this;_.M("poly",function(b){b.j(a)})};_.kg.prototype.center_changed=function(){_.I.trigger(this,"bounds_changed")};_.kg.prototype.radius_changed=_.kg.prototype.center_changed;_.kg.prototype.getBounds=function(){var a=this.get("radius"),b=this.get("center");if(b&&_.F(a)){var c=this.get("map"),c=c&&c.__gm.get("mapType");return _.vf(b,a/_.Od(c))}return null};
_.uc(_.kg.prototype,{center:_.Gb(_.Yb),draggable:_.Lg,editable:_.Lg,map:_.zh,radius:_.Jg,visible:_.Lg});_.v(_.lg,_.J);_.lg.prototype.map_changed=_.lg.prototype.visible_changed=function(){var a=this;_.M("poly",function(b){b.S(a)})};_.uc(_.lg.prototype,{draggable:_.Lg,editable:_.Lg,bounds:_.Gb(_.rd),map:_.zh,visible:_.Lg});_.v(mg,_.J);mg.prototype.map_changed=function(){var a=this;_.M("streetview",function(b){b.Gm(a)})};_.uc(mg.prototype,{map:_.zh});_.ng.prototype.getPanorama=function(a,b){var c=this.j||void 0;_.M("streetview",function(d){_.M("geometry",function(e){d.Fn(a,b,e.computeHeading,e.computeOffset,c)})})};_.ng.prototype.getPanoramaByLocation=function(a,b,c){this.getPanorama({location:a,radius:b,preference:50>(b||0)?"best":"nearest"},c)};_.ng.prototype.getPanoramaById=function(a,b){this.getPanorama({pano:a},b)};_.v(_.og,_.J);_.t=_.og.prototype;_.t.getTile=function(a,b,c){if(!a||!c)return null;var d=c.createElement("div");c={Na:a,zoom:b,Gc:null};d.__gmimt=c;_.yc(this.j,d);var e=qg(this);1!=e&&pg(d,e);if(this.R){var e=this.tileSize||new _.O(256,256),f=this.S(a,b);c.Gc=this.R(a,b,e,d,f,function(){_.I.trigger(d,"load")})}return d};_.t.releaseTile=function(a){a&&this.j.contains(a)&&(this.j.remove(a),(a=a.__gmimt.Gc)&&a.release())};_.t.Tg=_.ra(13);_.t.xp=function(){this.R&&this.j.forEach(function(a){a.__gmimt.Gc.kc()})};
_.t.opacity_changed=function(){var a=qg(this);this.j.forEach(function(b){pg(b,a)})};_.t.$d=!0;_.uc(_.og.prototype,{opacity:_.Jg});_.v(_.rg,_.J);_.rg.prototype.getTile=Qg;_.rg.prototype.tileSize=new _.O(256,256);_.rg.prototype.$d=!0;_.v(_.sg,_.rg);_.v(_.tg,_.J);_.uc(_.tg.prototype,{attribution:_.Gb(uh),place:_.Gb(vh)});var Bi={Animation:{BOUNCE:1,DROP:2,hr:3,fr:4},Circle:_.kg,ControlPosition:_.lf,Data:$d,GroundOverlay:_.ne,ImageMapType:_.og,InfoWindow:_.ge,LatLng:_.L,LatLngBounds:_.od,MVCArray:_.wc,MVCObject:_.J,Map:_.gg,MapTypeControlStyle:{DEFAULT:0,HORIZONTAL_BAR:1,DROPDOWN_MENU:2,INSET:3,INSET_LARGE:4},MapTypeId:_.Gg,MapTypeRegistry:gd,Marker:_.Md,MarkerImage:function(a,b,c,d,e){this.url=a;this.size=b||e;this.origin=c;this.anchor=d;this.scaledSize=e;this.labelOrigin=null},NavigationControlStyle:{DEFAULT:0,SMALL:1,
ANDROID:2,ZOOM_PAN:3,ir:4,nm:5},OverlayView:_.jg,Point:_.N,Polygon:_.Wd,Polyline:_.Xd,Rectangle:_.lg,ScaleControlStyle:{DEFAULT:0},Size:_.O,StreetViewPreference:_.Sh,StreetViewSource:_.Th,StrokePosition:{CENTER:0,INSIDE:1,OUTSIDE:2},SymbolPath:Og,ZoomControlStyle:{DEFAULT:0,SMALL:1,LARGE:2,nm:3},event:_.I};
_.Ia(Bi,{BicyclingLayer:_.pe,DirectionsRenderer:he,DirectionsService:je,DirectionsStatus:{OK:_.ha,UNKNOWN_ERROR:_.ka,OVER_QUERY_LIMIT:_.ia,REQUEST_DENIED:_.ja,INVALID_REQUEST:_.ba,ZERO_RESULTS:_.ma,MAX_WAYPOINTS_EXCEEDED:_.fa,NOT_FOUND:_.ga},DirectionsTravelMode:_.Jh,DirectionsUnitSystem:_.Ih,DistanceMatrixService:ke,DistanceMatrixStatus:{OK:_.ha,INVALID_REQUEST:_.ba,OVER_QUERY_LIMIT:_.ia,REQUEST_DENIED:_.ja,UNKNOWN_ERROR:_.ka,MAX_ELEMENTS_EXCEEDED:_.da,MAX_DIMENSIONS_EXCEEDED:_.ca},DistanceMatrixElementStatus:{OK:_.ha,
NOT_FOUND:_.ga,ZERO_RESULTS:_.ma},ElevationService:le,ElevationStatus:{OK:_.ha,UNKNOWN_ERROR:_.ka,OVER_QUERY_LIMIT:_.ia,REQUEST_DENIED:_.ja,INVALID_REQUEST:_.ba,cr:"DATA_NOT_AVAILABLE"},FusionTablesLayer:ig,Geocoder:_.me,GeocoderLocationType:{ROOFTOP:"ROOFTOP",RANGE_INTERPOLATED:"RANGE_INTERPOLATED",GEOMETRIC_CENTER:"GEOMETRIC_CENTER",APPROXIMATE:"APPROXIMATE"},GeocoderStatus:{OK:_.ha,UNKNOWN_ERROR:_.ka,OVER_QUERY_LIMIT:_.ia,REQUEST_DENIED:_.ja,INVALID_REQUEST:_.ba,ZERO_RESULTS:_.ma,ERROR:_.aa},KmlLayer:oe,
KmlLayerStatus:_.Rh,MaxZoomService:hg,MaxZoomStatus:{OK:_.ha,ERROR:_.aa},SaveWidget:_.tg,StreetViewCoverageLayer:mg,StreetViewPanorama:mf,StreetViewService:_.ng,StreetViewStatus:{OK:_.ha,UNKNOWN_ERROR:_.ka,ZERO_RESULTS:_.ma},StyledMapType:_.sg,TrafficLayer:qe,TrafficModel:_.Kh,TransitLayer:re,TransitMode:_.Lh,TransitRoutePreference:_.Mh,TravelMode:_.Jh,UnitSystem:_.Ih});_.Ia($d,{Feature:_.pc,Geometry:vb,GeometryCollection:_.zd,LineString:_.Bd,LinearRing:_.Fd,MultiLineString:_.Dd,MultiPoint:_.Ed,MultiPolygon:_.Jd,Point:_.Zb,Polygon:_.Hd});var wg=/'/g,xg;_.mc("main",{});window.google.maps.Load(function(a,b){var c=window.google.maps;Eg();var d=Fg(c);_.S=new Le(a);_.Ci=Math.random()<_.Ze();_.Ii=Math.round(1E15*Math.random()).toString(36);_.fg=Bg();_.Qh=Cg();_.zi=new _.wc;_.Nf=b;for(var e=0;e<_.Wc(_.S.j,8);++e)_.U[gf(e)]=!0;e=_.ef();Ld(Ve(e));_.Ha(Bi,function(a,b){c[a]=b});c.version=_.We(e);window.setTimeout(function(){nc(["util","stats"],function(a,b){a.R.j();a.S();d&&b.j.j({ev:"api_alreadyloaded",client:_.$e(_.S),key:_.bf()})})},5E3);_.I.Op();Pf=new Of;(e=af())&&
nc(_.R(_.S.j,12),Dg(e),!0)});}).call(this,{});
(function(e){"use strict";e.fn.fitVids=function(t){var n={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var r=document.head||document.getElementsByTagName("head")[0];var i=".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}";var s=document.createElement("div");s.innerHTML='<p>x</p><style id="fit-vids-style">'+i+"</style>";r.appendChild(s.childNodes[1])}if(t){e.extend(n,t)}return this.each(function(){var t=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","iframe[src*='http://www.dailymotion.com']","object","embed"];if(n.customSelector){t.push(n.customSelector)}var r=".fitvidsignore";if(n.ignore){r=r+", "+n.ignore}var i=e(this).find(t.join(","));i=i.not("object object");i=i.not(r);i.each(function(){var t=e(this);if(t.parents(r).length>0){return}if(this.tagName.toLowerCase()==="embed"&&t.parent("object").length||t.parent(".fluid-width-video-wrapper").length){return}if(!t.css("height")&&!t.css("width")&&(isNaN(t.attr("height"))||isNaN(t.attr("width")))){t.attr("height",9);t.attr("width",16)}var n=this.tagName.toLowerCase()==="object"||t.attr("height")&&!isNaN(parseInt(t.attr("height"),10))?parseInt(t.attr("height"),10):t.height(),i=!isNaN(parseInt(t.attr("width"),10))?parseInt(t.attr("width"),10):t.width(),s=n/i;if(!t.attr("id")){var o="fitvid"+Math.floor(Math.random()*999999);t.attr("id",o)}t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",s*100+"%");t.removeAttr("height").removeAttr("width")})})}})(window.jQuery||window.Zepto)
/*!
 * Isotope PACKAGED v2.2.0
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2015 Metafizzy
 */

(function(t){function e(){}function i(t){function i(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}function n(e,i){t.fn[e]=function(n){if("string"==typeof n){for(var s=o.call(arguments,1),a=0,u=this.length;u>a;a++){var p=this[a],h=t.data(p,e);if(h)if(t.isFunction(h[n])&&"_"!==n.charAt(0)){var f=h[n].apply(h,s);if(void 0!==f)return f}else r("no such method '"+n+"' for "+e+" instance");else r("cannot call methods on "+e+" prior to initialization; "+"attempted to call '"+n+"'")}return this}return this.each(function(){var o=t.data(this,e);o?(o.option(n),o._init()):(o=new i(this,n),t.data(this,e,o))})}}if(t){var r="undefined"==typeof console?e:function(t){console.error(t)};return t.bridget=function(t,e){i(e),n(t,e)},t.bridget}}var o=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],i):"object"==typeof exports?i(require("jquery")):i(t.jQuery)})(window),function(t){function e(e){var i=t.event;return i.target=i.target||i.srcElement||e,i}var i=document.documentElement,o=function(){};i.addEventListener?o=function(t,e,i){t.addEventListener(e,i,!1)}:i.attachEvent&&(o=function(t,i,o){t[i+o]=o.handleEvent?function(){var i=e(t);o.handleEvent.call(o,i)}:function(){var i=e(t);o.call(t,i)},t.attachEvent("on"+i,t[i+o])});var n=function(){};i.removeEventListener?n=function(t,e,i){t.removeEventListener(e,i,!1)}:i.detachEvent&&(n=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(o){t[e+i]=void 0}});var r={bind:o,unbind:n};"function"==typeof define&&define.amd?define("eventie/eventie",r):"object"==typeof exports?module.exports=r:t.eventie=r}(window),function(){function t(){}function e(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function i(t){return function(){return this[t].apply(this,arguments)}}var o=t.prototype,n=this,r=n.EventEmitter;o.getListeners=function(t){var e,i,o=this._getEvents();if(t instanceof RegExp){e={};for(i in o)o.hasOwnProperty(i)&&t.test(i)&&(e[i]=o[i])}else e=o[t]||(o[t]=[]);return e},o.flattenListeners=function(t){var e,i=[];for(e=0;t.length>e;e+=1)i.push(t[e].listener);return i},o.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},o.addListener=function(t,i){var o,n=this.getListenersAsObject(t),r="object"==typeof i;for(o in n)n.hasOwnProperty(o)&&-1===e(n[o],i)&&n[o].push(r?i:{listener:i,once:!1});return this},o.on=i("addListener"),o.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},o.once=i("addOnceListener"),o.defineEvent=function(t){return this.getListeners(t),this},o.defineEvents=function(t){for(var e=0;t.length>e;e+=1)this.defineEvent(t[e]);return this},o.removeListener=function(t,i){var o,n,r=this.getListenersAsObject(t);for(n in r)r.hasOwnProperty(n)&&(o=e(r[n],i),-1!==o&&r[n].splice(o,1));return this},o.off=i("removeListener"),o.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},o.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},o.manipulateListeners=function(t,e,i){var o,n,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(o=i.length;o--;)r.call(this,e,i[o]);else for(o in e)e.hasOwnProperty(o)&&(n=e[o])&&("function"==typeof n?r.call(this,o,n):s.call(this,o,n));return this},o.removeEvent=function(t){var e,i=typeof t,o=this._getEvents();if("string"===i)delete o[t];else if(t instanceof RegExp)for(e in o)o.hasOwnProperty(e)&&t.test(e)&&delete o[e];else delete this._events;return this},o.removeAllListeners=i("removeEvent"),o.emitEvent=function(t,e){var i,o,n,r,s=this.getListenersAsObject(t);for(n in s)if(s.hasOwnProperty(n))for(o=s[n].length;o--;)i=s[n][o],i.once===!0&&this.removeListener(t,i.listener),r=i.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,i.listener);return this},o.trigger=i("emitEvent"),o.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},o.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},o._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},o._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return n.EventEmitter=r,t},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:n.EventEmitter=t}.call(this),function(t){function e(t){if(t){if("string"==typeof o[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,n=0,r=i.length;r>n;n++)if(e=i[n]+t,"string"==typeof o[e])return e}}var i="Webkit Moz ms Ms O".split(" "),o=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return e}):"object"==typeof exports?module.exports=e:t.getStyleProperty=e}(window),function(t){function e(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function i(){}function o(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=s.length;i>e;e++){var o=s[e];t[o]=0}return t}function n(i){function n(){if(!d){d=!0;var o=t.getComputedStyle;if(p=function(){var t=o?function(t){return o(t,null)}:function(t){return t.currentStyle};return function(e){var i=t(e);return i||r("Style returned "+i+". Are you running this code in a hidden iframe on Firefox? "+"See http://bit.ly/getsizebug1"),i}}(),h=i("boxSizing")){var n=document.createElement("div");n.style.width="200px",n.style.padding="1px 2px 3px 4px",n.style.borderStyle="solid",n.style.borderWidth="1px 2px 3px 4px",n.style[h]="border-box";var s=document.body||document.documentElement;s.appendChild(n);var a=p(n);f=200===e(a.width),s.removeChild(n)}}}function a(t){if(n(),"string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var i=p(t);if("none"===i.display)return o();var r={};r.width=t.offsetWidth,r.height=t.offsetHeight;for(var a=r.isBorderBox=!(!h||!i[h]||"border-box"!==i[h]),d=0,l=s.length;l>d;d++){var c=s[d],m=i[c];m=u(t,m);var y=parseFloat(m);r[c]=isNaN(y)?0:y}var g=r.paddingLeft+r.paddingRight,v=r.paddingTop+r.paddingBottom,_=r.marginLeft+r.marginRight,I=r.marginTop+r.marginBottom,z=r.borderLeftWidth+r.borderRightWidth,L=r.borderTopWidth+r.borderBottomWidth,x=a&&f,E=e(i.width);E!==!1&&(r.width=E+(x?0:g+z));var b=e(i.height);return b!==!1&&(r.height=b+(x?0:v+L)),r.innerWidth=r.width-(g+z),r.innerHeight=r.height-(v+L),r.outerWidth=r.width+_,r.outerHeight=r.height+I,r}}function u(e,i){if(t.getComputedStyle||-1===i.indexOf("%"))return i;var o=e.style,n=o.left,r=e.runtimeStyle,s=r&&r.left;return s&&(r.left=e.currentStyle.left),o.left=i,i=o.pixelLeft,o.left=n,s&&(r.left=s),i}var p,h,f,d=!1;return a}var r="undefined"==typeof console?i:function(t){console.error(t)},s=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],n):"object"==typeof exports?module.exports=n(require("desandro-get-style-property")):t.getSize=n(t.getStyleProperty)}(window),function(t){function e(t){"function"==typeof t&&(e.isReady?t():s.push(t))}function i(t){var i="readystatechange"===t.type&&"complete"!==r.readyState;e.isReady||i||o()}function o(){e.isReady=!0;for(var t=0,i=s.length;i>t;t++){var o=s[t];o()}}function n(n){return"complete"===r.readyState?o():(n.bind(r,"DOMContentLoaded",i),n.bind(r,"readystatechange",i),n.bind(t,"load",i)),e}var r=t.document,s=[];e.isReady=!1,"function"==typeof define&&define.amd?define("doc-ready/doc-ready",["eventie/eventie"],n):"object"==typeof exports?module.exports=n(require("eventie")):t.docReady=n(t.eventie)}(window),function(t){function e(t,e){return t[s](e)}function i(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function o(t,e){i(t);for(var o=t.parentNode.querySelectorAll(e),n=0,r=o.length;r>n;n++)if(o[n]===t)return!0;return!1}function n(t,o){return i(t),e(t,o)}var r,s=function(){if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0,o=e.length;o>i;i++){var n=e[i],r=n+"MatchesSelector";if(t[r])return r}}();if(s){var a=document.createElement("div"),u=e(a,"div");r=u?e:n}else r=o;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return r}):"object"==typeof exports?module.exports=r:window.matchesSelector=r}(Element.prototype),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["doc-ready/doc-ready","matches-selector/matches-selector"],function(i,o){return e(t,i,o)}):"object"==typeof exports?module.exports=e(t,require("doc-ready"),require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.docReady,t.matchesSelector)}(window,function(t,e,i){var o={};o.extend=function(t,e){for(var i in e)t[i]=e[i];return t},o.modulo=function(t,e){return(t%e+e)%e};var n=Object.prototype.toString;o.isArray=function(t){return"[object Array]"==n.call(t)},o.makeArray=function(t){var e=[];if(o.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0,n=t.length;n>i;i++)e.push(t[i]);else e.push(t);return e},o.indexOf=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++)if(t[i]===e)return i;return-1},o.removeFrom=function(t,e){var i=o.indexOf(t,e);-1!=i&&t.splice(i,1)},o.isElement="function"==typeof HTMLElement||"object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1==t.nodeType&&"string"==typeof t.nodeName},o.setText=function(){function t(t,i){e=e||(void 0!==document.documentElement.textContent?"textContent":"innerText"),t[e]=i}var e;return t}(),o.getParent=function(t,e){for(;t!=document.body;)if(t=t.parentNode,i(t,e))return t},o.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},o.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},o.filterFindElements=function(t,e){t=o.makeArray(t);for(var n=[],r=0,s=t.length;s>r;r++){var a=t[r];if(o.isElement(a))if(e){i(a,e)&&n.push(a);for(var u=a.querySelectorAll(e),p=0,h=u.length;h>p;p++)n.push(u[p])}else n.push(a)}return n},o.debounceMethod=function(t,e,i){var o=t.prototype[e],n=e+"Timeout";t.prototype[e]=function(){var t=this[n];t&&clearTimeout(t);var e=arguments,r=this;this[n]=setTimeout(function(){o.apply(r,e),delete r[n]},i||100)}},o.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var r=t.console;return o.htmlInit=function(i,n){e(function(){for(var e=o.toDashed(n),s=document.querySelectorAll(".js-"+e),a="data-"+e+"-options",u=0,p=s.length;p>u;u++){var h,f=s[u],d=f.getAttribute(a);try{h=d&&JSON.parse(d)}catch(l){r&&r.error("Error parsing "+a+" on "+f.nodeName.toLowerCase()+(f.id?"#"+f.id:"")+": "+l);continue}var c=new i(f,h),m=t.jQuery;m&&m.data(f,n,c)}})},o}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property","fizzy-ui-utils/utils"],function(i,o,n,r){return e(t,i,o,n,r)}):"object"==typeof exports?module.exports=e(t,require("wolfy87-eventemitter"),require("get-size"),require("desandro-get-style-property"),require("fizzy-ui-utils")):(t.Outlayer={},t.Outlayer.Item=e(t,t.EventEmitter,t.getSize,t.getStyleProperty,t.fizzyUIUtils))}(window,function(t,e,i,o,n){function r(t){for(var e in t)return!1;return e=null,!0}function s(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}var a=t.getComputedStyle,u=a?function(t){return a(t,null)}:function(t){return t.currentStyle},p=o("transition"),h=o("transform"),f=p&&h,d=!!o("perspective"),l={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[p],c=["transform","transition","transitionDuration","transitionProperty"],m=function(){for(var t={},e=0,i=c.length;i>e;e++){var n=c[e],r=o(n);r&&r!==n&&(t[n]=r)}return t}();n.extend(s.prototype,e.prototype),s.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},s.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},s.prototype.getSize=function(){this.size=i(this.element)},s.prototype.css=function(t){var e=this.element.style;for(var i in t){var o=m[i]||i;e[o]=t[i]}},s.prototype.getPosition=function(){var t=u(this.element),e=this.layout.options,i=e.isOriginLeft,o=e.isOriginTop,n=parseInt(t[i?"left":"right"],10),r=parseInt(t[o?"top":"bottom"],10);n=isNaN(n)?0:n,r=isNaN(r)?0:r;var s=this.layout.size;n-=i?s.paddingLeft:s.paddingRight,r-=o?s.paddingTop:s.paddingBottom,this.position.x=n,this.position.y=r},s.prototype.layoutPosition=function(){var t=this.layout.size,e=this.layout.options,i={},o=e.isOriginLeft?"paddingLeft":"paddingRight",n=e.isOriginLeft?"left":"right",r=e.isOriginLeft?"right":"left",s=this.position.x+t[o];s=e.percentPosition&&!e.isHorizontal?100*(s/t.width)+"%":s+"px",i[n]=s,i[r]="";var a=e.isOriginTop?"paddingTop":"paddingBottom",u=e.isOriginTop?"top":"bottom",p=e.isOriginTop?"bottom":"top",h=this.position.y+t[a];h=e.percentPosition&&e.isHorizontal?100*(h/t.height)+"%":h+"px",i[u]=h,i[p]="",this.css(i),this.emitEvent("layout",[this])};var y=d?function(t,e){return"translate3d("+t+"px, "+e+"px, 0)"}:function(t,e){return"translate("+t+"px, "+e+"px)"};s.prototype._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=parseInt(t,10),r=parseInt(e,10),s=n===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return this.layoutPosition(),void 0;var a=t-i,u=e-o,p={},h=this.layout.options;a=h.isOriginLeft?a:-a,u=h.isOriginTop?u:-u,p.transform=y(a,u),this.transition({to:p,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},s.prototype.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},s.prototype.moveTo=f?s.prototype._transitionTo:s.prototype.goTo,s.prototype.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},s.prototype._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},s.prototype._transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return this._nonTransition(t),void 0;var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var g=h&&n.toDashed(h)+",opacity";s.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:g,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(l,this,!1))},s.prototype.transition=s.prototype[p?"_transition":"_nonTransition"],s.prototype.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},s.prototype.onotransitionend=function(t){this.ontransitionend(t)};var v={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};s.prototype.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,i=v[t.propertyName]||t.propertyName;if(delete e.ingProperties[i],r(e.ingProperties)&&this.disableTransition(),i in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[i]),i in e.onEnd){var o=e.onEnd[i];o.call(this),delete e.onEnd[i]}this.emitEvent("transitionEnd",[this])}},s.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(l,this,!1),this.isTransitioning=!1},s.prototype._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var _={transitionProperty:"",transitionDuration:""};return s.prototype.removeTransitionStyles=function(){this.css(_)},s.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},s.prototype.remove=function(){if(!p||!parseFloat(this.layout.options.transitionDuration))return this.removeElem(),void 0;var t=this;this.once("transitionEnd",function(){t.removeElem()}),this.hide()},s.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},s.prototype.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},s.prototype.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},s.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},s.prototype.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},s.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},s}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","eventEmitter/EventEmitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,o,n,r,s){return e(t,i,o,n,r,s)}):"object"==typeof exports?module.exports=e(t,require("eventie"),require("wolfy87-eventemitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.eventie,t.EventEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,o,n,r){function s(t,e){var i=n.getQueryElement(t);if(!i)return a&&a.error("Bad element for "+this.constructor.namespace+": "+(i||t)),void 0;this.element=i,u&&(this.$element=u(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++h;this.element.outlayerGUID=o,f[o]=this,this._create(),this.options.isInitLayout&&this.layout()}var a=t.console,u=t.jQuery,p=function(){},h=0,f={};return s.namespace="outlayer",s.Item=r,s.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},n.extend(s.prototype,i.prototype),s.prototype.option=function(t){n.extend(this.options,t)},s.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},s.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},s.prototype._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0,r=e.length;r>n;n++){var s=e[n],a=new i(s,this);o.push(a)}return o},s.prototype._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},s.prototype.getItemElements=function(){for(var t=[],e=0,i=this.items.length;i>e;e++)t.push(this.items[e].element);return t},s.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},s.prototype._init=s.prototype.layout,s.prototype._resetLayout=function(){this.getSize()},s.prototype.getSize=function(){this.size=o(this.element)},s.prototype._getMeasurement=function(t,e){var i,r=this.options[t];r?("string"==typeof r?i=this.element.querySelector(r):n.isElement(r)&&(i=r),this[t]=i?o(i)[e]:r):this[t]=0},s.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},s.prototype._getItemsForLayout=function(t){for(var e=[],i=0,o=t.length;o>i;i++){var n=t[i];n.isIgnored||e.push(n)}return e},s.prototype._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){for(var i=[],o=0,n=t.length;n>o;o++){var r=t[o],s=this._getItemLayoutPosition(r);s.item=r,s.isInstant=e||r.isLayoutInstant,i.push(s)}this._processLayoutQueue(i)}},s.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},s.prototype._processLayoutQueue=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];this._positionItem(o.item,o.x,o.y,o.isInstant)}},s.prototype._positionItem=function(t,e,i,o){o?t.goTo(e,i):t.moveTo(e,i)},s.prototype._postLayout=function(){this.resizeContainer()},s.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))}},s.prototype._getContainerSize=p,s.prototype._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},s.prototype._emitCompleteOnItems=function(t,e){function i(){n.emitEvent(t+"Complete",[e])}function o(){s++,s===r&&i()}var n=this,r=e.length;if(!e||!r)return i(),void 0;for(var s=0,a=0,u=e.length;u>a;a++){var p=e[a];p.once(t,o)}},s.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},s.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},s.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,i=t.length;i>e;e++){var o=t[e];this.ignore(o)}}},s.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,i=t.length;i>e;e++){var o=t[e];n.removeFrom(this.stamps,o),this.unignore(o)}},s.prototype._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},s.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;e>t;t++){var i=this.stamps[t];this._manageStamp(i)}}},s.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},s.prototype._manageStamp=p,s.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),i=this._boundingRect,n=o(t),r={left:e.left-i.left-n.marginLeft,top:e.top-i.top-n.marginTop,right:i.right-e.right-n.marginRight,bottom:i.bottom-e.bottom-n.marginBottom};return r},s.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},s.prototype.bindResize=function(){this.isResizeBound||(e.bind(t,"resize",this),this.isResizeBound=!0)},s.prototype.unbindResize=function(){this.isResizeBound&&e.unbind(t,"resize",this),this.isResizeBound=!1},s.prototype.onresize=function(){function t(){e.resize(),delete e.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(t,100)},s.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},s.prototype.needsResizeLayout=function(){var t=o(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},s.prototype.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},s.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},s.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},s.prototype.reveal=function(t){this._emitCompleteOnItems("reveal",t);for(var e=t&&t.length,i=0;e&&e>i;i++){var o=t[i];o.reveal()}},s.prototype.hide=function(t){this._emitCompleteOnItems("hide",t);for(var e=t&&t.length,i=0;e&&e>i;i++){var o=t[i];o.hide()}},s.prototype.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},s.prototype.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},s.prototype.getItem=function(t){for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];if(o.element===t)return o}},s.prototype.getItems=function(t){t=n.makeArray(t);for(var e=[],i=0,o=t.length;o>i;i++){var r=t[i],s=this.getItem(r);s&&e.push(s)}return e},s.prototype.remove=function(t){var e=this.getItems(t);if(this._emitCompleteOnItems("remove",e),e&&e.length)for(var i=0,o=e.length;o>i;i++){var r=e[i];r.remove(),n.removeFrom(this.items,r)}},s.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];o.destroy()}this.unbindResize();var n=this.element.outlayerGUID;delete f[n],delete this.element.outlayerGUID,u&&u.removeData(this.element,this.constructor.namespace)},s.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&f[e]},s.create=function(t,e){function i(){s.apply(this,arguments)}return Object.create?i.prototype=Object.create(s.prototype):n.extend(i.prototype,s.prototype),i.prototype.constructor=i,i.defaults=n.extend({},s.defaults),n.extend(i.defaults,e),i.prototype.settings={},i.namespace=t,i.data=s.data,i.Item=function(){r.apply(this,arguments)},i.Item.prototype=new r,n.htmlInit(i,t),u&&u.bridget&&u.bridget(t,i),i},s.Item=r,s}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],e):"object"==typeof exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){function e(){t.Item.apply(this,arguments)}e.prototype=new t.Item,e.prototype._create=function(){this.id=this.layout.itemGUID++,t.Item.prototype._create.call(this),this.sortData={}},e.prototype.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}};var i=e.prototype.destroy;return e.prototype.destroy=function(){i.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}return function(){function t(t){return function(){return e.prototype[t].apply(this.isotope,arguments)}}for(var o=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout"],n=0,r=o.length;r>n;n++){var s=o[n];i.prototype[s]=t(s)}}(),i.prototype.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!=this.isotope.size.innerHeight},i.prototype._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},i.prototype.getColumnWidth=function(){this.getSegmentSize("column","Width")},i.prototype.getRowHeight=function(){this.getSegmentSize("row","Height")},i.prototype.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotope.size["inner"+e]}},i.prototype.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},i.prototype.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},i.prototype.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function o(){i.apply(this,arguments)}return o.prototype=new i,e&&(o.options=e),o.prototype.namespace=t,i.modes[t]=o,o},i}),function(t,e){"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size","fizzy-ui-utils/utils"],e):"object"==typeof exports?module.exports=e(require("outlayer"),require("get-size"),require("fizzy-ui-utils")):t.Masonry=e(t.Outlayer,t.getSize,t.fizzyUIUtils)}(window,function(t,e,i){var o=t.create("masonry");return o.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var t=this.cols;for(this.colYs=[];t--;)this.colYs.push(0);this.maxY=0},o.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var o=this.columnWidth+=this.gutter,n=this.containerWidth+this.gutter,r=n/o,s=o-n%o,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},o.prototype.getContainerWidth=function(){var t=this.options.isFitWidth?this.element.parentNode:this.element,i=e(t);this.containerWidth=i&&i.innerWidth},o.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,o=e&&1>e?"round":"ceil",n=Math[o](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var r=this._getColGroup(n),s=Math.min.apply(Math,r),a=i.indexOf(r,s),u={x:this.columnWidth*a,y:s},p=s+t.size.outerHeight,h=this.cols+1-r.length,f=0;h>f;f++)this.colYs[a+f]=p;return u},o.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;i>o;o++){var n=this.colYs.slice(o,o+t);e[o]=Math.max.apply(Math,n)}return e},o.prototype._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this.options.isOriginLeft?o.left:o.right,r=n+i.outerWidth,s=Math.floor(n/this.columnWidth);s=Math.max(0,s);var a=Math.floor(r/this.columnWidth);a-=r%this.columnWidth?0:1,a=Math.min(this.cols-1,a);for(var u=(this.options.isOriginTop?o.top:o.bottom)+i.outerHeight,p=s;a>=p;p++)this.colYs[p]=Math.max(u,this.colYs[p])},o.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this.options.isFitWidth&&(t.width=this._getContainerFitWidth()),t},o.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!==this.containerWidth},o}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],e):"object"==typeof exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}var o=t.create("masonry"),n=o.prototype._getElementOffset,r=o.prototype.layout,s=o.prototype._getMeasurement;i(o.prototype,e.prototype),o.prototype._getElementOffset=n,o.prototype.layout=r,o.prototype._getMeasurement=s;var a=o.prototype.measureColumns;o.prototype.measureColumns=function(){this.items=this.isotope.filteredItems,a.call(this)};var u=o.prototype._manageStamp;return o.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft,this.options.isOriginTop=this.isotope.options.isOriginTop,u.apply(this,arguments)},o}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){var e=t.create("fitRows");return e.prototype._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")
},e.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var o={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,o},e.prototype._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){var e=t.create("vertical",{horizontalAlignment:0});return e.prototype._resetLayout=function(){this.y=0},e.prototype._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},e.prototype._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","matches-selector/matches-selector","fizzy-ui-utils/utils","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],function(i,o,n,r,s,a){return e(t,i,o,n,r,s,a)}):"object"==typeof exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("./item"),require("./layout-mode"),require("./layout-modes/masonry"),require("./layout-modes/fit-rows"),require("./layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,i,o,n,r,s){function a(t,e){return function(i,o){for(var n=0,r=t.length;r>n;n++){var s=t[n],a=i.sortData[s],u=o.sortData[s];if(a>u||u>a){var p=void 0!==e[s]?e[s]:e,h=p?1:-1;return(a>u?1:-1)*h}}return 0}}var u=t.jQuery,p=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},h=document.documentElement,f=h.textContent?function(t){return t.textContent}:function(t){return t.innerText},d=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=r,d.LayoutMode=s,d.prototype._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in s.modes)this._initLayoutMode(t)},d.prototype.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},d.prototype._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0,o=t.length;o>i;i++){var n=t[i];n.id=this.itemGUID++}return this._updateItemsSortData(t),t},d.prototype._initLayoutMode=function(t){var e=s.modes[t],i=this.options[t]||{};this.options[t]=e.options?n.extend(e.options,i):i,this.modes[t]=new e(this)},d.prototype.layout=function(){return!this._isLayoutInited&&this.options.isInitLayout?(this.arrange(),void 0):(this._layout(),void 0)},d.prototype._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},d.prototype.arrange=function(t){function e(){o.reveal(i.needReveal),o.hide(i.needHide)}this.option(t),this._getIsInstant();var i=this._filter(this.items);this.filteredItems=i.matches;var o=this;this._bindArrangeComplete(),this._isInstant?this._noTransition(e):e(),this._sort(),this._layout()},d.prototype._init=d.prototype.arrange,d.prototype._getIsInstant=function(){var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;return this._isInstant=t,t},d.prototype._bindArrangeComplete=function(){function t(){e&&i&&o&&n.emitEvent("arrangeComplete",[n.filteredItems])}var e,i,o,n=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){o=!0,t()})},d.prototype._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],o=[],n=[],r=this._getFilterTest(e),s=0,a=t.length;a>s;s++){var u=t[s];if(!u.isIgnored){var p=r(u);p&&i.push(u),p&&u.isHidden?o.push(u):p||u.isHidden||n.push(u)}}return{matches:i,needReveal:o,needHide:n}},d.prototype._getFilterTest=function(t){return u&&this.options.isJQueryFiltering?function(e){return u(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return o(e.element,t)}},d.prototype.updateSortData=function(t){var e;t?(t=n.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},d.prototype._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=l(i)}},d.prototype._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&e>i;i++){var o=t[i];o.updateSortData()}};var l=function(){function t(t){if("string"!=typeof t)return t;var i=p(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),r=n&&n[1],s=e(r,o),a=d.sortDataParsers[i[1]];return t=a?function(t){return t&&a(s(t))}:function(t){return t&&s(t)}}function e(t,e){var i;return i=t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&f(i)}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},d.prototype._sort=function(){var t=this.options.sortBy;if(t){var e=[].concat.apply(t,this.sortHistory),i=a(e,this.options.sortAscending);this.filteredItems.sort(i),t!=this.sortHistory[0]&&this.sortHistory.unshift(t)}},d.prototype._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw Error("No layout mode: "+t);return e.options=this.options[t],e},d.prototype._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},d.prototype._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},d.prototype._manageStamp=function(t){this._mode()._manageStamp(t)},d.prototype._getContainerSize=function(){return this._mode()._getContainerSize()},d.prototype.needsResizeLayout=function(){return this._mode().needsResizeLayout()},d.prototype.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},d.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},d.prototype._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},d.prototype.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;n>i;i++)o=e[i],this.element.appendChild(o.element);var r=this._filter(e).matches;for(i=0;n>i;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;n>i;i++)delete e[i].isLayoutInstant;this.reveal(r)}};var c=d.prototype.remove;return d.prototype.remove=function(t){t=n.makeArray(t);var e=this.getItems(t);c.call(this,t);var i=e&&e.length;if(i)for(var o=0;i>o;o++){var r=e[o];n.removeFrom(this.filteredItems,r)}},d.prototype.shuffle=function(){for(var t=0,e=this.items.length;e>t;t++){var i=this.items[t];i.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},d.prototype._noTransition=function(t){var e=this.options.transitionDuration;this.options.transitionDuration=0;var i=t.call(this);return this.options.transitionDuration=e,i},d.prototype.getFilteredItemElements=function(){for(var t=[],e=0,i=this.filteredItems.length;i>e;e++)t.push(this.filteredItems[e].element);return t},d});
/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright 2015 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/*! lightgallery - v1.2.15 - 2016-03-10
* http://sachinchoolur.github.io/lightGallery/
* Copyright (c) 2016 Sachin N; Licensed Apache 2.0 */
!function(a,b,c,d){"use strict";var e={fullScreen:!0},f=function(b){return this.core=a(b).data("lightGallery"),this.$el=a(b),this.core.s=a.extend({},e,this.core.s),this.init(),this};f.prototype.init=function(){var a="";if(this.core.s.fullScreen){if(!(c.fullscreenEnabled||c.webkitFullscreenEnabled||c.mozFullScreenEnabled||c.msFullscreenEnabled))return;a='<span class="lg-fullscreen lg-icon"></span>',this.core.$outer.find(".lg-toolbar").append(a),this.fullScreen()}},f.prototype.requestFullscreen=function(){var a=c.documentElement;a.requestFullscreen?a.requestFullscreen():a.msRequestFullscreen?a.msRequestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullscreen&&a.webkitRequestFullscreen()},f.prototype.exitFullscreen=function(){c.exitFullscreen?c.exitFullscreen():c.msExitFullscreen?c.msExitFullscreen():c.mozCancelFullScreen?c.mozCancelFullScreen():c.webkitExitFullscreen&&c.webkitExitFullscreen()},f.prototype.fullScreen=function(){var b=this;a(c).on("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg",function(){b.core.$outer.toggleClass("lg-fullscreen-on")}),this.core.$outer.find(".lg-fullscreen").on("click.lg",function(){c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement||c.msFullscreenElement?b.exitFullscreen():b.requestFullscreen()})},f.prototype.destroy=function(){this.exitFullscreen(),a(c).off("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg")},a.fn.lightGallery.modules.fullscreen=f}(jQuery,window,document);
/*! lightgallery - v1.2.15 - 2016-03-10
* http://sachinchoolur.github.io/lightGallery/
* Copyright (c) 2016 Sachin N; Licensed Apache 2.0 */
!function(a,b,c,d){"use strict";var e={thumbnail:!0,animateThumb:!0,currentPagerPosition:"middle",thumbWidth:100,thumbContHeight:100,thumbMargin:5,exThumbImage:!1,showThumbByDefault:!0,toogleThumb:!0,pullCaptionUp:!0,enableThumbDrag:!0,enableThumbSwipe:!0,swipeThreshold:50,loadYoutubeThumbnail:!0,youtubeThumbSize:1,loadVimeoThumbnail:!0,vimeoThumbSize:"thumbnail_small",loadDailymotionThumbnail:!0},f=function(b){return this.core=a(b).data("lightGallery"),this.core.s=a.extend({},e,this.core.s),this.$el=a(b),this.$thumbOuter=null,this.thumbOuterWidth=0,this.thumbTotalWidth=this.core.$items.length*(this.core.s.thumbWidth+this.core.s.thumbMargin),this.thumbIndex=this.core.index,this.left=0,this.init(),this};f.prototype.init=function(){var a=this;this.core.s.thumbnail&&this.core.$items.length>1&&(this.core.s.showThumbByDefault&&setTimeout(function(){a.core.$outer.addClass("lg-thumb-open")},700),this.core.s.pullCaptionUp&&this.core.$outer.addClass("lg-pull-caption-up"),this.build(),this.core.s.animateThumb?(this.core.s.enableThumbDrag&&!this.core.isTouch&&this.core.doCss()&&this.enableThumbDrag(),this.core.s.enableThumbSwipe&&this.core.isTouch&&this.core.doCss()&&this.enableThumbSwipe(),this.thumbClickable=!1):this.thumbClickable=!0,this.toogle(),this.thumbkeyPress())},f.prototype.build=function(){function c(a,b,c){var d,h=e.core.isVideo(a,c)||{},i="";h.youtube||h.vimeo||h.dailymotion?h.youtube?d=e.core.s.loadYoutubeThumbnail?"//img.youtube.com/vi/"+h.youtube[1]+"/"+e.core.s.youtubeThumbSize+".jpg":b:h.vimeo?e.core.s.loadVimeoThumbnail?(d="//i.vimeocdn.com/video/error_"+g+".jpg",i=h.vimeo[1]):d=b:h.dailymotion&&(d=e.core.s.loadDailymotionThumbnail?"//www.dailymotion.com/thumbnail/video/"+h.dailymotion[1]:b):d=b,f+='<div data-vimeo-id="'+i+'" class="lg-thumb-item" style="width:'+e.core.s.thumbWidth+"px; margin-right: "+e.core.s.thumbMargin+'px"><img src="'+d+'" /></div>',i=""}var d,e=this,f="",g="",h='<div class="lg-thumb-outer"><div class="lg-thumb group"></div></div>';switch(this.core.s.vimeoThumbSize){case"thumbnail_large":g="640";break;case"thumbnail_medium":g="200x150";break;case"thumbnail_small":g="100x75"}if(e.core.$outer.addClass("lg-has-thumb"),e.core.$outer.find(".lg").append(h),e.$thumbOuter=e.core.$outer.find(".lg-thumb-outer"),e.thumbOuterWidth=e.$thumbOuter.width(),e.core.s.animateThumb&&e.core.$outer.find(".lg-thumb").css({width:e.thumbTotalWidth+"px",position:"relative"}),this.core.s.animateThumb&&e.$thumbOuter.css("height",e.core.s.thumbContHeight+"px"),e.core.s.dynamic)for(var i=0;i<e.core.s.dynamicEl.length;i++)c(e.core.s.dynamicEl[i].src,e.core.s.dynamicEl[i].thumb,i);else e.core.$items.each(function(b){e.core.s.exThumbImage?c(a(this).attr("href")||a(this).attr("data-src"),a(this).attr(e.core.s.exThumbImage),b):c(a(this).attr("href")||a(this).attr("data-src"),a(this).find("img").attr("src"),b)});e.core.$outer.find(".lg-thumb").html(f),d=e.core.$outer.find(".lg-thumb-item"),d.each(function(){var b=a(this),c=b.attr("data-vimeo-id");c&&a.getJSON("//www.vimeo.com/api/v2/video/"+c+".json?callback=?",{format:"json"},function(a){b.find("img").attr("src",a[0][e.core.s.vimeoThumbSize])})}),d.eq(e.core.index).addClass("active"),e.core.$el.on("onBeforeSlide.lg.tm",function(){d.removeClass("active"),d.eq(e.core.index).addClass("active")}),d.on("click.lg touchend.lg",function(){var b=a(this);setTimeout(function(){(e.thumbClickable&&!e.core.lgBusy||!e.core.doCss())&&(e.core.index=b.index(),e.core.slide(e.core.index,!1,!0))},50)}),e.core.$el.on("onBeforeSlide.lg.tm",function(){e.animateThumb(e.core.index)}),a(b).on("resize.lg.thumb orientationchange.lg.thumb",function(){setTimeout(function(){e.animateThumb(e.core.index),e.thumbOuterWidth=e.$thumbOuter.width()},200)})},f.prototype.setTranslate=function(a){this.core.$outer.find(".lg-thumb").css({transform:"translate3d(-"+a+"px, 0px, 0px)"})},f.prototype.animateThumb=function(a){var b=this.core.$outer.find(".lg-thumb");if(this.core.s.animateThumb){var c;switch(this.core.s.currentPagerPosition){case"left":c=0;break;case"middle":c=this.thumbOuterWidth/2-this.core.s.thumbWidth/2;break;case"right":c=this.thumbOuterWidth-this.core.s.thumbWidth}this.left=(this.core.s.thumbWidth+this.core.s.thumbMargin)*a-1-c,this.left>this.thumbTotalWidth-this.thumbOuterWidth&&(this.left=this.thumbTotalWidth-this.thumbOuterWidth),this.left<0&&(this.left=0),this.core.lGalleryOn?(b.hasClass("on")||this.core.$outer.find(".lg-thumb").css("transition-duration",this.core.s.speed+"ms"),this.core.doCss()||b.animate({left:-this.left+"px"},this.core.s.speed)):this.core.doCss()||b.css("left",-this.left+"px"),this.setTranslate(this.left)}},f.prototype.enableThumbDrag=function(){var c=this,d=0,e=0,f=!1,g=!1,h=0;c.$thumbOuter.addClass("lg-grab"),c.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb",function(a){c.thumbTotalWidth>c.thumbOuterWidth&&(a.preventDefault(),d=a.pageX,f=!0,c.core.$outer.scrollLeft+=1,c.core.$outer.scrollLeft-=1,c.thumbClickable=!1,c.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"))}),a(b).on("mousemove.lg.thumb",function(a){f&&(h=c.left,g=!0,e=a.pageX,c.$thumbOuter.addClass("lg-dragging"),h-=e-d,h>c.thumbTotalWidth-c.thumbOuterWidth&&(h=c.thumbTotalWidth-c.thumbOuterWidth),0>h&&(h=0),c.setTranslate(h))}),a(b).on("mouseup.lg.thumb",function(){g?(g=!1,c.$thumbOuter.removeClass("lg-dragging"),c.left=h,Math.abs(e-d)<c.core.s.swipeThreshold&&(c.thumbClickable=!0)):c.thumbClickable=!0,f&&(f=!1,c.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"))})},f.prototype.enableThumbSwipe=function(){var a=this,b=0,c=0,d=!1,e=0;a.core.$outer.find(".lg-thumb").on("touchstart.lg",function(c){a.thumbTotalWidth>a.thumbOuterWidth&&(c.preventDefault(),b=c.originalEvent.targetTouches[0].pageX,a.thumbClickable=!1)}),a.core.$outer.find(".lg-thumb").on("touchmove.lg",function(f){a.thumbTotalWidth>a.thumbOuterWidth&&(f.preventDefault(),c=f.originalEvent.targetTouches[0].pageX,d=!0,a.$thumbOuter.addClass("lg-dragging"),e=a.left,e-=c-b,e>a.thumbTotalWidth-a.thumbOuterWidth&&(e=a.thumbTotalWidth-a.thumbOuterWidth),0>e&&(e=0),a.setTranslate(e))}),a.core.$outer.find(".lg-thumb").on("touchend.lg",function(){a.thumbTotalWidth>a.thumbOuterWidth&&d?(d=!1,a.$thumbOuter.removeClass("lg-dragging"),Math.abs(c-b)<a.core.s.swipeThreshold&&(a.thumbClickable=!0),a.left=e):a.thumbClickable=!0})},f.prototype.toogle=function(){var a=this;a.core.s.toogleThumb&&(a.core.$outer.addClass("lg-can-toggle"),a.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"></span>'),a.core.$outer.find(".lg-toogle-thumb").on("click.lg",function(){a.core.$outer.toggleClass("lg-thumb-open")}))},f.prototype.thumbkeyPress=function(){var c=this;a(b).on("keydown.lg.thumb",function(a){38===a.keyCode?(a.preventDefault(),c.core.$outer.addClass("lg-thumb-open")):40===a.keyCode&&(a.preventDefault(),c.core.$outer.removeClass("lg-thumb-open"))})},f.prototype.destroy=function(){this.core.s.thumbnail&&this.core.$items.length>1&&(a(b).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"),this.$thumbOuter.remove(),this.core.$outer.removeClass("lg-has-thumb"))},a.fn.lightGallery.modules.Thumbnail=f}(jQuery,window,document);
/*! lightgallery - v1.2.15 - 2016-03-10
* http://sachinchoolur.github.io/lightGallery/
* Copyright (c) 2016 Sachin N; Licensed Apache 2.0 */
!function(a,b,c,d){"use strict";var e={videoMaxWidth:"855px",youtubePlayerParams:!1,vimeoPlayerParams:!1,dailymotionPlayerParams:!1,vkPlayerParams:!1,videojs:!1},f=function(b){return this.core=a(b).data("lightGallery"),this.$el=a(b),this.core.s=a.extend({},e,this.core.s),this.videoLoaded=!1,this.init(),this};f.prototype.init=function(){var b=this;b.core.$el.on("hasVideo.lg.tm",function(a,c,d,e){if(b.core.$slide.eq(c).find(".lg-video").append(b.loadVideo(d,"lg-object",!0,c,e)),e)if(b.core.s.videojs)try{videojs(b.core.$slide.eq(c).find(".lg-html5").get(0),{},function(){b.videoLoaded||this.play()})}catch(f){console.error("Make sure you have included videojs")}else b.core.$slide.eq(c).find(".lg-html5").get(0).play()}),b.core.$el.on("onAferAppendSlide.lg.tm",function(a,c){b.core.$slide.eq(c).find(".lg-video-cont").css("max-width",b.core.s.videoMaxWidth),b.videoLoaded=!0});var c=function(a){if(a.find(".lg-object").hasClass("lg-has-poster")&&a.find(".lg-object").is(":visible"))if(a.hasClass("lg-has-video")){var c=a.find(".lg-youtube").get(0),d=a.find(".lg-vimeo").get(0),e=a.find(".lg-dailymotion").get(0),f=a.find(".lg-html5").get(0);if(c)c.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*");else if(d)try{$f(d).api("play")}catch(g){console.error("Make sure you have included froogaloop2 js")}else if(e)e.contentWindow.postMessage("play","*");else if(f)if(b.core.s.videojs)try{videojs(f).play()}catch(g){console.error("Make sure you have included videojs")}else f.play();a.addClass("lg-video-palying")}else{a.addClass("lg-video-playing lg-has-video");var h,i,j=function(c,d){if(a.find(".lg-video").append(b.loadVideo(c,"",!1,b.core.index,d)),d)if(b.core.s.videojs)try{videojs(b.core.$slide.eq(b.core.index).find(".lg-html5").get(0),{},function(){this.play()})}catch(e){console.error("Make sure you have included videojs")}else b.core.$slide.eq(b.core.index).find(".lg-html5").get(0).play()};b.core.s.dynamic?(h=b.core.s.dynamicEl[b.core.index].src,i=b.core.s.dynamicEl[b.core.index].html,j(h,i)):(h=b.core.$items.eq(b.core.index).attr("href")||b.core.$items.eq(b.core.index).attr("data-src"),i=b.core.$items.eq(b.core.index).attr("data-html"),j(h,i));var k=a.find(".lg-object");a.find(".lg-video").append(k),a.find(".lg-video-object").hasClass("lg-html5")||(a.removeClass("lg-complete"),a.find(".lg-video-object").on("load.lg error.lg",function(){a.addClass("lg-complete")}))}};b.core.doCss()&&b.core.$items.length>1&&(b.core.s.enableSwipe&&b.core.isTouch||b.core.s.enableDrag&&!b.core.isTouch)?b.core.$el.on("onSlideClick.lg.tm",function(){var a=b.core.$slide.eq(b.core.index);c(a)}):b.core.$slide.on("click.lg",function(){c(a(this))}),b.core.$el.on("onBeforeSlide.lg.tm",function(c,d,e){var f=b.core.$slide.eq(d),g=f.find(".lg-youtube").get(0),h=f.find(".lg-vimeo").get(0),i=f.find(".lg-dailymotion").get(0),j=f.find(".lg-vk").get(0),k=f.find(".lg-html5").get(0);if(g)g.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*");else if(h)try{$f(h).api("pause")}catch(l){console.error("Make sure you have included froogaloop2 js")}else if(i)i.contentWindow.postMessage("pause","*");else if(k)if(b.core.s.videojs)try{videojs(k).pause()}catch(l){console.error("Make sure you have included videojs")}else k.pause();j&&a(j).attr("src",a(j).attr("src").replace("&autoplay","&noplay"));var m;m=b.core.s.dynamic?b.core.s.dynamicEl[e].src:b.core.$items.eq(e).attr("href")||b.core.$items.eq(e).attr("data-src");var n=b.core.isVideo(m,e)||{};(n.youtube||n.vimeo||n.dailymotion||n.vk)&&b.core.$outer.addClass("lg-hide-download")}),b.core.$el.on("onAfterSlide.lg.tm",function(a,c){b.core.$slide.eq(c).removeClass("lg-video-palying")})},f.prototype.loadVideo=function(b,c,d,e,f){var g="",h=1,i="",j=this.core.isVideo(b,e)||{};if(d&&(h=this.videoLoaded?0:1),j.youtube)i="?wmode=opaque&autoplay="+h+"&enablejsapi=1",this.core.s.youtubePlayerParams&&(i=i+"&"+a.param(this.core.s.youtubePlayerParams)),g='<iframe class="lg-video-object lg-youtube '+c+'" width="560" height="315" src="//www.youtube.com/embed/'+j.youtube[1]+i+'" frameborder="0" allowfullscreen></iframe>';else if(j.vimeo)i="?autoplay="+h+"&api=1",this.core.s.vimeoPlayerParams&&(i=i+"&"+a.param(this.core.s.vimeoPlayerParams)),g='<iframe class="lg-video-object lg-vimeo '+c+'" width="560" height="315"  src="//player.vimeo.com/video/'+j.vimeo[1]+i+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';else if(j.dailymotion)i="?wmode=opaque&autoplay="+h+"&api=postMessage",this.core.s.dailymotionPlayerParams&&(i=i+"&"+a.param(this.core.s.dailymotionPlayerParams)),g='<iframe class="lg-video-object lg-dailymotion '+c+'" width="560" height="315" src="//www.dailymotion.com/embed/video/'+j.dailymotion[1]+i+'" frameborder="0" allowfullscreen></iframe>';else if(j.html5){var k=f.substring(0,1);"."!==k&&"#"!==k||(f=a(f).html()),g=f}else j.vk&&(i="&autoplay="+h,this.core.s.vkPlayerParams&&(i=i+"&"+a.param(this.core.s.vkPlayerParams)),g='<iframe class="lg-video-object lg-vk '+c+'" width="560" height="315" src="http://vk.com/video_ext.php?'+j.vk[1]+i+'" frameborder="0" allowfullscreen></iframe>');return g},f.prototype.destroy=function(){this.videoLoaded=!1},a.fn.lightGallery.modules.video=f}(jQuery,window,document);
/*! lightgallery - v1.2.15 - 2016-03-10
* http://sachinchoolur.github.io/lightGallery/
* Copyright (c) 2016 Sachin N; Licensed Apache 2.0 */
!function(a,b,c,d){"use strict";function e(b,d){if(this.el=b,this.$el=a(b),this.s=a.extend({},f,d),this.s.dynamic&&"undefined"!==this.s.dynamicEl&&this.s.dynamicEl.constructor===Array&&!this.s.dynamicEl.length)throw"When using dynamic mode, you must also define dynamicEl as an Array.";return this.modules={},this.lGalleryOn=!1,this.lgBusy=!1,this.hideBartimeout=!1,this.isTouch="ontouchstart"in c.documentElement,this.s.slideEndAnimatoin&&(this.s.hideControlOnEnd=!1),this.s.dynamic?this.$items=this.s.dynamicEl:"this"===this.s.selector?this.$items=this.$el:""!==this.s.selector?this.s.selectWithin?this.$items=a(this.s.selectWithin).find(this.s.selector):this.$items=this.$el.find(a(this.s.selector)):this.$items=this.$el.children(),this.$slide="",this.$outer="",this.init(),this}var f={mode:"lg-slide",cssEasing:"ease",easing:"linear",speed:600,height:"100%",width:"100%",addClass:"",startClass:"lg-start-zoom",backdropDuration:150,hideBarsDelay:6e3,useLeft:!1,closable:!0,loop:!0,escKey:!0,keyPress:!0,controls:!0,slideEndAnimatoin:!0,hideControlOnEnd:!1,mousewheel:!0,appendSubHtmlTo:".lg-sub-html",preload:1,showAfterLoad:!0,selector:"",selectWithin:"",nextHtml:"",prevHtml:"",index:!1,iframeMaxWidth:"100%",download:!0,counter:!0,appendCounterTo:".lg-toolbar",swipeThreshold:50,enableSwipe:!0,enableDrag:!0,dynamic:!1,dynamicEl:[],galleryId:1};e.prototype.init=function(){var c=this;c.s.preload>c.$items.length&&(c.s.preload=c.$items.length);var d=b.location.hash;d.indexOf("lg="+this.s.galleryId)>0&&(c.index=parseInt(d.split("&slide=")[1],10),a("body").addClass("lg-from-hash"),a("body").hasClass("lg-on")||setTimeout(function(){c.build(c.index),a("body").addClass("lg-on")})),c.s.dynamic?(c.$el.trigger("onBeforeOpen.lg"),c.index=c.s.index||0,a("body").hasClass("lg-on")||setTimeout(function(){c.build(c.index),a("body").addClass("lg-on")})):c.$items.on("click.lgcustom",function(b){try{b.preventDefault(),b.preventDefault()}catch(d){b.returnValue=!1}c.$el.trigger("onBeforeOpen.lg"),c.index=c.s.index||c.$items.index(this),a("body").hasClass("lg-on")||(c.build(c.index),a("body").addClass("lg-on"))})},e.prototype.build=function(b){var c=this;c.structure(),a.each(a.fn.lightGallery.modules,function(b){c.modules[b]=new a.fn.lightGallery.modules[b](c.el)}),c.slide(b,!1,!1),c.s.keyPress&&c.keyPress(),c.$items.length>1&&(c.arrow(),setTimeout(function(){c.enableDrag(),c.enableSwipe()},50),c.s.mousewheel&&c.mousewheel()),c.counter(),c.closeGallery(),c.$el.trigger("onAfterOpen.lg"),c.$outer.on("mousemove.lg click.lg touchstart.lg",function(){c.$outer.removeClass("lg-hide-items"),clearTimeout(c.hideBartimeout),c.hideBartimeout=setTimeout(function(){c.$outer.addClass("lg-hide-items")},c.s.hideBarsDelay)})},e.prototype.structure=function(){var c,d="",e="",f=0,g="",h=this;for(a("body").append('<div class="lg-backdrop"></div>'),a(".lg-backdrop").css("transition-duration",this.s.backdropDuration+"ms"),f=0;f<this.$items.length;f++)d+='<div class="lg-item"></div>';if(this.s.controls&&this.$items.length>1&&(e='<div class="lg-actions"><div class="lg-prev lg-icon">'+this.s.prevHtml+'</div><div class="lg-next lg-icon">'+this.s.nextHtml+"</div></div>"),".lg-sub-html"===this.s.appendSubHtmlTo&&(g='<div class="lg-sub-html"></div>'),c='<div class="lg-outer '+this.s.addClass+" "+this.s.startClass+'"><div class="lg" style="width:'+this.s.width+"; height:"+this.s.height+'"><div class="lg-inner">'+d+'</div><div class="lg-toolbar group"><span class="lg-close lg-icon"></span></div>'+e+g+"</div></div>",a("body").append(c),this.$outer=a(".lg-outer"),this.$slide=this.$outer.find(".lg-item"),this.s.useLeft?(this.$outer.addClass("lg-use-left"),this.s.mode="lg-slide"):this.$outer.addClass("lg-use-css3"),h.setTop(),a(b).on("resize.lg orientationchange.lg",function(){setTimeout(function(){h.setTop()},100)}),this.$slide.eq(this.index).addClass("lg-current"),this.doCss()?this.$outer.addClass("lg-css3"):(this.$outer.addClass("lg-css"),this.s.speed=0),this.$outer.addClass(this.s.mode),this.s.enableDrag&&this.$items.length>1&&this.$outer.addClass("lg-grab"),this.s.showAfterLoad&&this.$outer.addClass("lg-show-after-load"),this.doCss()){var i=this.$outer.find(".lg-inner");i.css("transition-timing-function",this.s.cssEasing),i.css("transition-duration",this.s.speed+"ms")}a(".lg-backdrop").addClass("in"),setTimeout(function(){h.$outer.addClass("lg-visible")},this.s.backdropDuration),this.s.download&&this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'),this.prevScrollTop=a(b).scrollTop()},e.prototype.setTop=function(){if("100%"!==this.s.height){var c=a(b).height(),d=(c-parseInt(this.s.height,10))/2,e=this.$outer.find(".lg");c>=parseInt(this.s.height,10)?e.css("top",d+"px"):e.css("top","0px")}},e.prototype.doCss=function(){var a=function(){var a=["transition","MozTransition","WebkitTransition","OTransition","msTransition","KhtmlTransition"],b=c.documentElement,d=0;for(d=0;d<a.length;d++)if(a[d]in b.style)return!0};return!!a()},e.prototype.isVideo=function(a,b){var c;if(c=this.s.dynamic?this.s.dynamicEl[b].html:this.$items.eq(b).attr("data-html"),!a&&c)return{html5:!0};var d=a.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),e=a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),f=a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),g=a.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);return d?{youtube:d}:e?{vimeo:e}:f?{dailymotion:f}:g?{vk:g}:void 0},e.prototype.counter=function(){this.s.counter&&a(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">'+(parseInt(this.index,10)+1)+'</span> / <span id="lg-counter-all">'+this.$items.length+"</span></div>")},e.prototype.addHtml=function(b){var c,d=null;if(this.s.dynamic?this.s.dynamicEl[b].subHtmlUrl?c=this.s.dynamicEl[b].subHtmlUrl:d=this.s.dynamicEl[b].subHtml:this.$items.eq(b).attr("data-sub-html-url")?c=this.$items.eq(b).attr("data-sub-html-url"):d=this.$items.eq(b).attr("data-sub-html"),!c)if("undefined"!=typeof d&&null!==d){var e=d.substring(0,1);d="."===e||"#"===e?a(d).html():d}else d="";".lg-sub-html"===this.s.appendSubHtmlTo?c?this.$outer.find(this.s.appendSubHtmlTo).load(c):this.$outer.find(this.s.appendSubHtmlTo).html(d):c?this.$slide.eq(b).load(c):this.$slide.eq(b).append(d),"undefined"!=typeof d&&null!==d&&(""===d?this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html"):this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")),this.$el.trigger("onAfterAppendSubHtml.lg",[b])},e.prototype.preload=function(a){var b=1,c=1;for(b=1;b<=this.s.preload&&!(b>=this.$items.length-a);b++)this.loadContent(a+b,!1,0);for(c=1;c<=this.s.preload&&!(0>a-c);c++)this.loadContent(a-c,!1,0)},e.prototype.loadContent=function(c,d,e){var f,g,h,i,j,k,l=this,m=!1,n=function(c){for(var d=[],e=[],f=0;f<c.length;f++){var h=c[f].split(" ");""===h[0]&&h.splice(0,1),e.push(h[0]),d.push(h[1])}for(var i=a(b).width(),j=0;j<d.length;j++)if(parseInt(d[j],10)>i){g=e[j];break}};if(l.s.dynamic){if(l.s.dynamicEl[c].poster&&(m=!0,h=l.s.dynamicEl[c].poster),k=l.s.dynamicEl[c].html,g=l.s.dynamicEl[c].src,l.s.dynamicEl[c].responsive){var o=l.s.dynamicEl[c].responsive.split(",");n(o)}i=l.s.dynamicEl[c].srcset,j=l.s.dynamicEl[c].sizes}else{if(l.$items.eq(c).attr("data-poster")&&(m=!0,h=l.$items.eq(c).attr("data-poster")),k=l.$items.eq(c).attr("data-html"),g=l.$items.eq(c).attr("href")||l.$items.eq(c).attr("data-src"),l.$items.eq(c).attr("data-responsive")){var p=l.$items.eq(c).attr("data-responsive").split(",");n(p)}i=l.$items.eq(c).attr("data-srcset"),j=l.$items.eq(c).attr("data-sizes")}var q=!1;l.s.dynamic?l.s.dynamicEl[c].iframe&&(q=!0):"true"===l.$items.eq(c).attr("data-iframe")&&(q=!0);var r=l.isVideo(g,c);if(!l.$slide.eq(c).hasClass("lg-loaded")){if(q)l.$slide.eq(c).prepend('<div class="lg-video-cont" style="max-width:'+l.s.iframeMaxWidth+'"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="'+g+'"  allowfullscreen="true"></iframe></div></div>');else if(m){var s="";s=r&&r.youtube?"lg-has-youtube":r&&r.vimeo?"lg-has-vimeo":"lg-has-html5",l.$slide.eq(c).prepend('<div class="lg-video-cont '+s+' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="'+h+'" /></div></div>')}else r?(l.$slide.eq(c).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'),l.$el.trigger("hasVideo.lg",[c,g,k])):l.$slide.eq(c).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="'+g+'" /></div>');if(l.$el.trigger("onAferAppendSlide.lg",[c]),f=l.$slide.eq(c).find(".lg-object"),j&&f.attr("sizes",j),i){f.attr("srcset",i);try{picturefill({elements:[f[0]]})}catch(t){console.error("Make sure you have included Picturefill version 2")}}".lg-sub-html"!==this.s.appendSubHtmlTo&&l.addHtml(c),l.$slide.eq(c).addClass("lg-loaded")}l.$slide.eq(c).find(".lg-object").on("load.lg error.lg",function(){var b=0;e&&!a("body").hasClass("lg-from-hash")&&(b=e),setTimeout(function(){l.$slide.eq(c).addClass("lg-complete"),l.$el.trigger("onSlideItemLoad.lg",[c,e||0])},b)}),r&&r.html5&&!m&&l.$slide.eq(c).addClass("lg-complete"),d===!0&&(l.$slide.eq(c).hasClass("lg-complete")?l.preload(c):l.$slide.eq(c).find(".lg-object").on("load.lg error.lg",function(){l.preload(c)}))},e.prototype.slide=function(b,c,d){var e=this.$outer.find(".lg-current").index(),f=this;if(!f.lGalleryOn||e!==b){var g=this.$slide.length,h=f.lGalleryOn?this.s.speed:0,i=!1,j=!1;if(!f.lgBusy){if(this.s.download){var k;k=f.s.dynamic?f.s.dynamicEl[b].downloadUrl!==!1&&(f.s.dynamicEl[b].downloadUrl||f.s.dynamicEl[b].src):"false"!==f.$items.eq(b).attr("data-download-url")&&(f.$items.eq(b).attr("data-download-url")||f.$items.eq(b).attr("href")||f.$items.eq(b).attr("data-src")),k?(a("#lg-download").attr("href",k),f.$outer.removeClass("lg-hide-download")):f.$outer.addClass("lg-hide-download")}if(this.$el.trigger("onBeforeSlide.lg",[e,b,c,d]),f.lgBusy=!0,clearTimeout(f.hideBartimeout),".lg-sub-html"===this.s.appendSubHtmlTo&&setTimeout(function(){f.addHtml(b)},h),this.arrowDisable(b),c){var l=b-1,m=b+1;0===b&&e===g-1?(m=0,l=g-1):b===g-1&&0===e&&(m=0,l=g-1),this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide"),f.$slide.eq(l).addClass("lg-prev-slide"),f.$slide.eq(m).addClass("lg-next-slide"),f.$slide.eq(b).addClass("lg-current")}else f.$outer.addClass("lg-no-trans"),this.$slide.removeClass("lg-prev-slide lg-next-slide"),e>b?(j=!0,0!==b||e!==g-1||d||(j=!1,i=!0)):b>e&&(i=!0,b!==g-1||0!==e||d||(j=!0,i=!1)),j?(this.$slide.eq(b).addClass("lg-prev-slide"),this.$slide.eq(e).addClass("lg-next-slide")):i&&(this.$slide.eq(b).addClass("lg-next-slide"),this.$slide.eq(e).addClass("lg-prev-slide")),setTimeout(function(){f.$slide.removeClass("lg-current"),f.$slide.eq(b).addClass("lg-current"),f.$outer.removeClass("lg-no-trans")},50);f.lGalleryOn?(setTimeout(function(){f.loadContent(b,!0,0)},this.s.speed+50),setTimeout(function(){f.lgBusy=!1,f.$el.trigger("onAfterSlide.lg",[e,b,c,d])},this.s.speed)):(f.loadContent(b,!0,f.s.backdropDuration),f.lgBusy=!1,f.$el.trigger("onAfterSlide.lg",[e,b,c,d])),f.lGalleryOn=!0,this.s.counter&&a("#lg-counter-current").text(b+1)}}},e.prototype.goToNextSlide=function(a){var b=this;b.lgBusy||(b.index+1<b.$slide.length?(b.index++,b.$el.trigger("onBeforeNextSlide.lg",[b.index]),b.slide(b.index,a,!1)):b.s.loop?(b.index=0,b.$el.trigger("onBeforeNextSlide.lg",[b.index]),b.slide(b.index,a,!1)):b.s.slideEndAnimatoin&&(b.$outer.addClass("lg-right-end"),setTimeout(function(){b.$outer.removeClass("lg-right-end")},400)))},e.prototype.goToPrevSlide=function(a){var b=this;b.lgBusy||(b.index>0?(b.index--,b.$el.trigger("onBeforePrevSlide.lg",[b.index,a]),b.slide(b.index,a,!1)):b.s.loop?(b.index=b.$items.length-1,b.$el.trigger("onBeforePrevSlide.lg",[b.index,a]),b.slide(b.index,a,!1)):b.s.slideEndAnimatoin&&(b.$outer.addClass("lg-left-end"),setTimeout(function(){b.$outer.removeClass("lg-left-end")},400)))},e.prototype.keyPress=function(){var c=this;this.$items.length>1&&a(b).on("keyup.lg",function(a){c.$items.length>1&&(37===a.keyCode&&(a.preventDefault(),c.goToPrevSlide()),39===a.keyCode&&(a.preventDefault(),c.goToNextSlide()))}),a(b).on("keydown.lg",function(a){c.s.escKey===!0&&27===a.keyCode&&(a.preventDefault(),c.$outer.hasClass("lg-thumb-open")?c.$outer.removeClass("lg-thumb-open"):c.destroy())})},e.prototype.arrow=function(){var a=this;this.$outer.find(".lg-prev").on("click.lg",function(){a.goToPrevSlide()}),this.$outer.find(".lg-next").on("click.lg",function(){a.goToNextSlide()})},e.prototype.arrowDisable=function(a){!this.s.loop&&this.s.hideControlOnEnd&&(a+1<this.$slide.length?this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled"):this.$outer.find(".lg-next").attr("disabled","disabled").addClass("disabled"),a>0?this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled"):this.$outer.find(".lg-prev").attr("disabled","disabled").addClass("disabled"))},e.prototype.setTranslate=function(a,b,c){this.s.useLeft?a.css("left",b):a.css({transform:"translate3d("+b+"px, "+c+"px, 0px)"})},e.prototype.touchMove=function(b,c){var d=c-b;Math.abs(d)>15&&(this.$outer.addClass("lg-dragging"),this.setTranslate(this.$slide.eq(this.index),d,0),this.setTranslate(a(".lg-prev-slide"),-this.$slide.eq(this.index).width()+d,0),this.setTranslate(a(".lg-next-slide"),this.$slide.eq(this.index).width()+d,0))},e.prototype.touchEnd=function(a){var b=this;"lg-slide"!==b.s.mode&&b.$outer.addClass("lg-slide"),this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity","0"),setTimeout(function(){b.$outer.removeClass("lg-dragging"),0>a&&Math.abs(a)>b.s.swipeThreshold?b.goToNextSlide(!0):a>0&&Math.abs(a)>b.s.swipeThreshold?b.goToPrevSlide(!0):Math.abs(a)<5&&b.$el.trigger("onSlideClick.lg"),b.$slide.removeAttr("style")}),setTimeout(function(){b.$outer.hasClass("lg-dragging")||"lg-slide"===b.s.mode||b.$outer.removeClass("lg-slide")},b.s.speed+100)},e.prototype.enableSwipe=function(){var a=this,b=0,c=0,d=!1;a.s.enableSwipe&&a.isTouch&&a.doCss()&&(a.$slide.on("touchstart.lg",function(c){a.$outer.hasClass("lg-zoomed")||a.lgBusy||(c.preventDefault(),a.manageSwipeClass(),b=c.originalEvent.targetTouches[0].pageX)}),a.$slide.on("touchmove.lg",function(e){a.$outer.hasClass("lg-zoomed")||(e.preventDefault(),c=e.originalEvent.targetTouches[0].pageX,a.touchMove(b,c),d=!0)}),a.$slide.on("touchend.lg",function(){a.$outer.hasClass("lg-zoomed")||(d?(d=!1,a.touchEnd(c-b)):a.$el.trigger("onSlideClick.lg"))}))},e.prototype.enableDrag=function(){var c=this,d=0,e=0,f=!1,g=!1;c.s.enableDrag&&!c.isTouch&&c.doCss()&&(c.$slide.on("mousedown.lg",function(b){c.$outer.hasClass("lg-zoomed")||(a(b.target).hasClass("lg-object")||a(b.target).hasClass("lg-video-play"))&&(b.preventDefault(),c.lgBusy||(c.manageSwipeClass(),d=b.pageX,f=!0,c.$outer.scrollLeft+=1,c.$outer.scrollLeft-=1,c.$outer.removeClass("lg-grab").addClass("lg-grabbing"),c.$el.trigger("onDragstart.lg")))}),a(b).on("mousemove.lg",function(a){f&&(g=!0,e=a.pageX,c.touchMove(d,e),c.$el.trigger("onDragmove.lg"))}),a(b).on("mouseup.lg",function(b){g?(g=!1,c.touchEnd(e-d),c.$el.trigger("onDragend.lg")):(a(b.target).hasClass("lg-object")||a(b.target).hasClass("lg-video-play"))&&c.$el.trigger("onSlideClick.lg"),f&&(f=!1,c.$outer.removeClass("lg-grabbing").addClass("lg-grab"))}))},e.prototype.manageSwipeClass=function(){var a=this.index+1,b=this.index-1,c=this.$slide.length;this.s.loop&&(0===this.index?b=c-1:this.index===c-1&&(a=0)),this.$slide.removeClass("lg-next-slide lg-prev-slide"),b>-1&&this.$slide.eq(b).addClass("lg-prev-slide"),this.$slide.eq(a).addClass("lg-next-slide")},e.prototype.mousewheel=function(){var a=this;a.$outer.on("mousewheel.lg",function(b){b.deltaY&&(b.deltaY>0?a.goToPrevSlide():a.goToNextSlide(),b.preventDefault())})},e.prototype.closeGallery=function(){var b=this,c=!1;this.$outer.find(".lg-close").on("click.lg",function(){b.destroy()}),b.s.closable&&(b.$outer.on("mousedown.lg",function(b){c=!!(a(b.target).is(".lg-outer")||a(b.target).is(".lg-item ")||a(b.target).is(".lg-img-wrap"))}),b.$outer.on("mouseup.lg",function(d){(a(d.target).is(".lg-outer")||a(d.target).is(".lg-item ")||a(d.target).is(".lg-img-wrap")&&c)&&(b.$outer.hasClass("lg-dragging")||b.destroy())}))},e.prototype.destroy=function(c){var d=this;c||d.$el.trigger("onBeforeClose.lg"),a(b).scrollTop(d.prevScrollTop),c&&(d.s.dynamic||this.$items.off("click.lg click.lgcustom"),a.removeData(d.el,"lightGallery")),this.$el.off(".lg.tm"),a.each(a.fn.lightGallery.modules,function(a){d.modules[a]&&d.modules[a].destroy()}),this.lGalleryOn=!1,clearTimeout(d.hideBartimeout),this.hideBartimeout=!1,a(b).off(".lg"),a("body").removeClass("lg-on lg-from-hash"),d.$outer&&d.$outer.removeClass("lg-visible"),a(".lg-backdrop").removeClass("in"),setTimeout(function(){d.$outer&&d.$outer.remove(),a(".lg-backdrop").remove(),c||d.$el.trigger("onCloseAfter.lg")},d.s.backdropDuration+50)},a.fn.lightGallery=function(b){return this.each(function(){if(a.data(this,"lightGallery"))try{a(this).data("lightGallery").init()}catch(c){console.error("lightGallery has not initiated properly")}else a.data(this,"lightGallery",new e(this,b))})},a.fn.lightGallery.modules={}}(jQuery,window,document);
/*! lightslider - v1.1.5 - 2015-10-31
* https://github.com/sachinchoolur/lightslider
* Copyright (c) 2015 Sachin N; Licensed MIT */
!function(a,b){"use strict";var c={item:3,autoWidth:!1,slideMove:1,slideMargin:10,addClass:"",mode:"slide",useCSS:!0,cssEasing:"ease",easing:"linear",speed:400,auto:!1,pauseOnHover:!1,loop:!1,slideEndAnimation:!0,pause:2e3,keyPress:!1,controls:!0,prevHtml:"",nextHtml:"",rtl:!1,adaptiveHeight:!1,vertical:!1,verticalHeight:500,vThumbWidth:100,thumbItem:10,pager:!0,gallery:!1,galleryMargin:5,thumbMargin:5,currentPagerPosition:"middle",enableTouch:!0,enableDrag:!0,freeMove:!0,swipeThreshold:40,responsive:[],onBeforeStart:function(a){},onSliderLoad:function(a){},onBeforeSlide:function(a,b){},onAfterSlide:function(a,b){},onBeforeNextSlide:function(a,b){},onBeforePrevSlide:function(a,b){}};a.fn.lightSlider=function(b){if(0===this.length)return this;if(this.length>1)return this.each(function(){a(this).lightSlider(b)}),this;var d={},e=a.extend(!0,{},c,b),f={},g=this;d.$el=this,"fade"===e.mode&&(e.vertical=!1);var h=g.children(),i=a(window).width(),j=null,k=null,l=0,m=0,n=!1,o=0,p="",q=0,r=e.vertical===!0?"height":"width",s=e.vertical===!0?"margin-bottom":"margin-right",t=0,u=0,v=0,w=0,x=null,y="ontouchstart"in document.documentElement,z={};return z.chbreakpoint=function(){if(i=a(window).width(),e.responsive.length){var b;if(e.autoWidth===!1&&(b=e.item),i<e.responsive[0].breakpoint)for(var c=0;c<e.responsive.length;c++)i<e.responsive[c].breakpoint&&(j=e.responsive[c].breakpoint,k=e.responsive[c]);if("undefined"!=typeof k&&null!==k)for(var d in k.settings)k.settings.hasOwnProperty(d)&&(("undefined"==typeof f[d]||null===f[d])&&(f[d]=e[d]),e[d]=k.settings[d]);if(!a.isEmptyObject(f)&&i>e.responsive[0].breakpoint)for(var g in f)f.hasOwnProperty(g)&&(e[g]=f[g]);e.autoWidth===!1&&t>0&&v>0&&b!==e.item&&(q=Math.round(t/((v+e.slideMargin)*e.slideMove)))}},z.calSW=function(){e.autoWidth===!1&&(v=(o-(e.item*e.slideMargin-e.slideMargin))/e.item)},z.calWidth=function(a){var b=a===!0?p.find(".lslide").length:h.length;if(e.autoWidth===!1)m=b*(v+e.slideMargin);else{m=0;for(var c=0;b>c;c++)m+=parseInt(h.eq(c).width())+e.slideMargin}return m},d={doCss:function(){var a=function(){for(var a=["transition","MozTransition","WebkitTransition","OTransition","msTransition","KhtmlTransition"],b=document.documentElement,c=0;c<a.length;c++)if(a[c]in b.style)return!0};return e.useCSS&&a()?!0:!1},keyPress:function(){e.keyPress&&a(document).on("keyup.lightslider",function(b){a(":focus").is("input, textarea")||(b.preventDefault?b.preventDefault():b.returnValue=!1,37===b.keyCode?g.goToPrevSlide():39===b.keyCode&&g.goToNextSlide())})},controls:function(){e.controls&&(g.after('<div class="lSAction"><a class="lSPrev">'+e.prevHtml+'</a><a class="lSNext">'+e.nextHtml+"</a></div>"),e.autoWidth?z.calWidth(!1)<o&&p.find(".lSAction").hide():l<=e.item&&p.find(".lSAction").hide(),p.find(".lSAction a").on("click",function(b){return b.preventDefault?b.preventDefault():b.returnValue=!1,"lSPrev"===a(this).attr("class")?g.goToPrevSlide():g.goToNextSlide(),!1}))},initialStyle:function(){var a=this;"fade"===e.mode&&(e.autoWidth=!1,e.slideEndAnimation=!1),e.auto&&(e.slideEndAnimation=!1),e.autoWidth&&(e.slideMove=1,e.item=1),e.loop&&(e.slideMove=1,e.freeMove=!1),e.onBeforeStart.call(this,g),z.chbreakpoint(),g.addClass("lightSlider").wrap('<div class="lSSlideOuter '+e.addClass+'"><div class="lSSlideWrapper"></div></div>'),p=g.parent(".lSSlideWrapper"),e.rtl===!0&&p.parent().addClass("lSrtl"),e.vertical?(p.parent().addClass("vertical"),o=e.verticalHeight,p.css("height",o+"px")):o=g.outerWidth(),h.addClass("lslide"),e.loop===!0&&"slide"===e.mode&&(z.calSW(),z.clone=function(){if(z.calWidth(!0)>o){for(var b=0,c=0,d=0;d<h.length&&(b+=parseInt(g.find(".lslide").eq(d).width())+e.slideMargin,c++,!(b>=o+e.slideMargin));d++);var f=e.autoWidth===!0?c:e.item;if(f<g.find(".clone.left").length)for(var i=0;i<g.find(".clone.left").length-f;i++)h.eq(i).remove();if(f<g.find(".clone.right").length)for(var j=h.length-1;j>h.length-1-g.find(".clone.right").length;j--)q--,h.eq(j).remove();for(var k=g.find(".clone.right").length;f>k;k++)g.find(".lslide").eq(k).clone().removeClass("lslide").addClass("clone right").appendTo(g),q++;for(var l=g.find(".lslide").length-g.find(".clone.left").length;l>g.find(".lslide").length-f;l--)g.find(".lslide").eq(l-1).clone().removeClass("lslide").addClass("clone left").prependTo(g);h=g.children()}else h.hasClass("clone")&&(g.find(".clone").remove(),a.move(g,0))},z.clone()),z.sSW=function(){l=h.length,e.rtl===!0&&e.vertical===!1&&(s="margin-left"),e.autoWidth===!1&&h.css(r,v+"px"),h.css(s,e.slideMargin+"px"),m=z.calWidth(!1),g.css(r,m+"px"),e.loop===!0&&"slide"===e.mode&&n===!1&&(q=g.find(".clone.left").length)},z.calL=function(){h=g.children(),l=h.length},this.doCss()&&p.addClass("usingCss"),z.calL(),"slide"===e.mode?(z.calSW(),z.sSW(),e.loop===!0&&(t=a.slideValue(),this.move(g,t)),e.vertical===!1&&this.setHeight(g,!1)):(this.setHeight(g,!0),g.addClass("lSFade"),this.doCss()||(h.fadeOut(0),h.eq(q).fadeIn(0))),e.loop===!0&&"slide"===e.mode?h.eq(q).addClass("active"):h.first().addClass("active")},pager:function(){var a=this;if(z.createPager=function(){w=(o-(e.thumbItem*e.thumbMargin-e.thumbMargin))/e.thumbItem;var b=p.find(".lslide"),c=p.find(".lslide").length,d=0,f="",h=0;for(d=0;c>d;d++){"slide"===e.mode&&(e.autoWidth?h+=(parseInt(b.eq(d).width())+e.slideMargin)*e.slideMove:h=d*(v+e.slideMargin)*e.slideMove);var i=b.eq(d*e.slideMove).attr("data-thumb");if(f+=e.gallery===!0?'<li style="width:100%;'+r+":"+w+"px;"+s+":"+e.thumbMargin+'px"><a href="#"><img src="'+i+'" /></a></li>':'<li><a href="#">'+(d+1)+"</a></li>","slide"===e.mode&&h>=m-o-e.slideMargin){d+=1;var j=2;e.autoWidth&&(f+='<li><a href="#">'+(d+1)+"</a></li>",j=1),j>d?(f=null,p.parent().addClass("noPager")):p.parent().removeClass("noPager");break}}var k=p.parent();k.find(".lSPager").html(f),e.gallery===!0&&(e.vertical===!0&&k.find(".lSPager").css("width",e.vThumbWidth+"px"),u=d*(e.thumbMargin+w)+.5,k.find(".lSPager").css({property:u+"px","transition-duration":e.speed+"ms"}),e.vertical===!0&&p.parent().css("padding-right",e.vThumbWidth+e.galleryMargin+"px"),k.find(".lSPager").css(r,u+"px"));var l=k.find(".lSPager").find("li");l.first().addClass("active"),l.on("click",function(){return e.loop===!0&&"slide"===e.mode?q+=l.index(this)-k.find(".lSPager").find("li.active").index():q=l.index(this),g.mode(!1),e.gallery===!0&&a.slideThumb(),!1})},e.pager){var b="lSpg";e.gallery&&(b="lSGallery"),p.after('<ul class="lSPager '+b+'"></ul>');var c=e.vertical?"margin-left":"margin-top";p.parent().find(".lSPager").css(c,e.galleryMargin+"px"),z.createPager()}setTimeout(function(){z.init()},0)},setHeight:function(a,b){var c=null,d=this;c=e.loop?a.children(".lslide ").first():a.children().first();var f=function(){var d=c.outerHeight(),e=0,f=d;b&&(d=0,e=100*f/o),a.css({height:d+"px","padding-bottom":e+"%"})};f(),c.find("img").length?c.find("img")[0].complete?(f(),x||d.auto()):c.find("img").load(function(){setTimeout(function(){f(),x||d.auto()},100)}):x||d.auto()},active:function(a,b){this.doCss()&&"fade"===e.mode&&p.addClass("on");var c=0;if(q*e.slideMove<l){a.removeClass("active"),this.doCss()||"fade"!==e.mode||b!==!1||a.fadeOut(e.speed),c=b===!0?q:q*e.slideMove;var d,f;b===!0&&(d=a.length,f=d-1,c+1>=d&&(c=f)),e.loop===!0&&"slide"===e.mode&&(c=b===!0?q-g.find(".clone.left").length:q*e.slideMove,b===!0&&(d=a.length,f=d-1,c+1===d?c=f:c+1>d&&(c=0))),this.doCss()||"fade"!==e.mode||b!==!1||a.eq(c).fadeIn(e.speed),a.eq(c).addClass("active")}else a.removeClass("active"),a.eq(a.length-1).addClass("active"),this.doCss()||"fade"!==e.mode||b!==!1||(a.fadeOut(e.speed),a.eq(c).fadeIn(e.speed))},move:function(a,b){e.rtl===!0&&(b=-b),this.doCss()?a.css(e.vertical===!0?{transform:"translate3d(0px, "+-b+"px, 0px)","-webkit-transform":"translate3d(0px, "+-b+"px, 0px)"}:{transform:"translate3d("+-b+"px, 0px, 0px)","-webkit-transform":"translate3d("+-b+"px, 0px, 0px)"}):e.vertical===!0?a.css("position","relative").animate({top:-b+"px"},e.speed,e.easing):a.css("position","relative").animate({left:-b+"px"},e.speed,e.easing);var c=p.parent().find(".lSPager").find("li");this.active(c,!0)},fade:function(){this.active(h,!1);var a=p.parent().find(".lSPager").find("li");this.active(a,!0)},slide:function(){var a=this;z.calSlide=function(){m>o&&(t=a.slideValue(),a.active(h,!1),t>m-o-e.slideMargin?t=m-o-e.slideMargin:0>t&&(t=0),a.move(g,t),e.loop===!0&&"slide"===e.mode&&(q>=l-g.find(".clone.left").length/e.slideMove&&a.resetSlide(g.find(".clone.left").length),0===q&&a.resetSlide(p.find(".lslide").length)))},z.calSlide()},resetSlide:function(a){var b=this;p.find(".lSAction a").addClass("disabled"),setTimeout(function(){q=a,p.css("transition-duration","0ms"),t=b.slideValue(),b.active(h,!1),d.move(g,t),setTimeout(function(){p.css("transition-duration",e.speed+"ms"),p.find(".lSAction a").removeClass("disabled")},50)},e.speed+100)},slideValue:function(){var a=0;if(e.autoWidth===!1)a=q*(v+e.slideMargin)*e.slideMove;else{a=0;for(var b=0;q>b;b++)a+=parseInt(h.eq(b).width())+e.slideMargin}return a},slideThumb:function(){var a;switch(e.currentPagerPosition){case"left":a=0;break;case"middle":a=o/2-w/2;break;case"right":a=o-w}var b=q-g.find(".clone.left").length,c=p.parent().find(".lSPager");"slide"===e.mode&&e.loop===!0&&(b>=c.children().length?b=0:0>b&&(b=c.children().length));var d=b*(w+e.thumbMargin)-a;d+o>u&&(d=u-o-e.thumbMargin),0>d&&(d=0),this.move(c,d)},auto:function(){e.auto&&(clearInterval(x),x=setInterval(function(){g.goToNextSlide()},e.pause))},pauseOnHover:function(){var b=this;e.auto&&e.pauseOnHover&&(p.on("mouseenter",function(){a(this).addClass("ls-hover"),g.pause(),e.auto=!0}),p.on("mouseleave",function(){a(this).removeClass("ls-hover"),p.find(".lightSlider").hasClass("lsGrabbing")||b.auto()}))},touchMove:function(a,b){if(p.css("transition-duration","0ms"),"slide"===e.mode){var c=a-b,d=t-c;if(d>=m-o-e.slideMargin)if(e.freeMove===!1)d=m-o-e.slideMargin;else{var f=m-o-e.slideMargin;d=f+(d-f)/5}else 0>d&&(e.freeMove===!1?d=0:d/=5);this.move(g,d)}},touchEnd:function(a){if(p.css("transition-duration",e.speed+"ms"),"slide"===e.mode){var b=!1,c=!0;t-=a,t>m-o-e.slideMargin?(t=m-o-e.slideMargin,e.autoWidth===!1&&(b=!0)):0>t&&(t=0);var d=function(a){var c=0;if(b||a&&(c=1),e.autoWidth)for(var d=0,f=0;f<h.length&&(d+=parseInt(h.eq(f).width())+e.slideMargin,q=f+c,!(d>=t));f++);else{var g=t/((v+e.slideMargin)*e.slideMove);q=parseInt(g)+c,t>=m-o-e.slideMargin&&g%1!==0&&q++}};a>=e.swipeThreshold?(d(!1),c=!1):a<=-e.swipeThreshold&&(d(!0),c=!1),g.mode(c),this.slideThumb()}else a>=e.swipeThreshold?g.goToPrevSlide():a<=-e.swipeThreshold&&g.goToNextSlide()},enableDrag:function(){var b=this;if(!y){var c=0,d=0,f=!1;p.find(".lightSlider").addClass("lsGrab"),p.on("mousedown",function(b){return o>m&&0!==m?!1:void("lSPrev"!==a(b.target).attr("class")&&"lSNext"!==a(b.target).attr("class")&&(c=e.vertical===!0?b.pageY:b.pageX,f=!0,b.preventDefault?b.preventDefault():b.returnValue=!1,p.scrollLeft+=1,p.scrollLeft-=1,p.find(".lightSlider").removeClass("lsGrab").addClass("lsGrabbing"),clearInterval(x)))}),a(window).on("mousemove",function(a){f&&(d=e.vertical===!0?a.pageY:a.pageX,b.touchMove(d,c))}),a(window).on("mouseup",function(g){if(f){p.find(".lightSlider").removeClass("lsGrabbing").addClass("lsGrab"),f=!1,d=e.vertical===!0?g.pageY:g.pageX;var h=d-c;Math.abs(h)>=e.swipeThreshold&&a(window).on("click.ls",function(b){b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopImmediatePropagation(),b.stopPropagation(),a(window).off("click.ls")}),b.touchEnd(h)}})}},enableTouch:function(){var a=this;if(y){var b={},c={};p.on("touchstart",function(a){c=a.originalEvent.targetTouches[0],b.pageX=a.originalEvent.targetTouches[0].pageX,b.pageY=a.originalEvent.targetTouches[0].pageY,clearInterval(x)}),p.on("touchmove",function(d){if(o>m&&0!==m)return!1;var f=d.originalEvent;c=f.targetTouches[0];var g=Math.abs(c.pageX-b.pageX),h=Math.abs(c.pageY-b.pageY);e.vertical===!0?(3*h>g&&d.preventDefault(),a.touchMove(c.pageY,b.pageY)):(3*g>h&&d.preventDefault(),a.touchMove(c.pageX,b.pageX))}),p.on("touchend",function(){if(o>m&&0!==m)return!1;var d;d=e.vertical===!0?c.pageY-b.pageY:c.pageX-b.pageX,a.touchEnd(d)})}},build:function(){var b=this;b.initialStyle(),this.doCss()&&(e.enableTouch===!0&&b.enableTouch(),e.enableDrag===!0&&b.enableDrag()),a(window).on("focus",function(){b.auto()}),a(window).on("blur",function(){clearInterval(x)}),b.pager(),b.pauseOnHover(),b.controls(),b.keyPress()}},d.build(),z.init=function(){z.chbreakpoint(),e.vertical===!0?(o=e.item>1?e.verticalHeight:h.outerHeight(),p.css("height",o+"px")):o=p.outerWidth(),e.loop===!0&&"slide"===e.mode&&z.clone(),z.calL(),"slide"===e.mode&&g.removeClass("lSSlide"),"slide"===e.mode&&(z.calSW(),z.sSW()),setTimeout(function(){"slide"===e.mode&&g.addClass("lSSlide")},1e3),e.pager&&z.createPager(),e.adaptiveHeight===!0&&e.vertical===!1&&g.css("height",h.eq(q).outerHeight(!0)),e.adaptiveHeight===!1&&("slide"===e.mode?e.vertical===!1?d.setHeight(g,!1):d.auto():d.setHeight(g,!0)),e.gallery===!0&&d.slideThumb(),"slide"===e.mode&&d.slide(),e.autoWidth===!1?h.length<=e.item?p.find(".lSAction").hide():p.find(".lSAction").show():z.calWidth(!1)<o&&0!==m?p.find(".lSAction").hide():p.find(".lSAction").show()},g.goToPrevSlide=function(){if(q>0)e.onBeforePrevSlide.call(this,g,q),q--,g.mode(!1),e.gallery===!0&&d.slideThumb();else if(e.loop===!0){if(e.onBeforePrevSlide.call(this,g,q),"fade"===e.mode){var a=l-1;q=parseInt(a/e.slideMove)}g.mode(!1),e.gallery===!0&&d.slideThumb()}else e.slideEndAnimation===!0&&(g.addClass("leftEnd"),setTimeout(function(){g.removeClass("leftEnd")},400))},g.goToNextSlide=function(){var a=!0;if("slide"===e.mode){var b=d.slideValue();a=b<m-o-e.slideMargin}q*e.slideMove<l-e.slideMove&&a?(e.onBeforeNextSlide.call(this,g,q),q++,g.mode(!1),e.gallery===!0&&d.slideThumb()):e.loop===!0?(e.onBeforeNextSlide.call(this,g,q),q=0,g.mode(!1),e.gallery===!0&&d.slideThumb()):e.slideEndAnimation===!0&&(g.addClass("rightEnd"),setTimeout(function(){g.removeClass("rightEnd")},400))},g.mode=function(a){e.adaptiveHeight===!0&&e.vertical===!1&&g.css("height",h.eq(q).outerHeight(!0)),n===!1&&("slide"===e.mode?d.doCss()&&(g.addClass("lSSlide"),""!==e.speed&&p.css("transition-duration",e.speed+"ms"),""!==e.cssEasing&&p.css("transition-timing-function",e.cssEasing)):d.doCss()&&(""!==e.speed&&g.css("transition-duration",e.speed+"ms"),""!==e.cssEasing&&g.css("transition-timing-function",e.cssEasing))),a||e.onBeforeSlide.call(this,g,q),"slide"===e.mode?d.slide():d.fade(),p.hasClass("ls-hover")||d.auto(),setTimeout(function(){a||e.onAfterSlide.call(this,g,q)},e.speed),n=!0},g.play=function(){g.goToNextSlide(),e.auto=!0,d.auto()},g.pause=function(){e.auto=!1,clearInterval(x)},g.refresh=function(){z.init()},g.getCurrentSlideCount=function(){var a=q;if(e.loop){var b=p.find(".lslide").length,c=g.find(".clone.left").length;a=c-1>=q?b+(q-c):q>=b+c?q-b-c:q-c}return a+1},g.getTotalSlideCount=function(){return p.find(".lslide").length},g.goToSlide=function(a){q=e.loop?a+g.find(".clone.left").length-1:a,g.mode(!1),e.gallery===!0&&d.slideThumb()},g.destroy=function(){g.lightSlider&&(g.goToPrevSlide=function(){},g.goToNextSlide=function(){},g.mode=function(){},g.play=function(){},g.pause=function(){},g.refresh=function(){},g.getCurrentSlideCount=function(){},g.getTotalSlideCount=function(){},g.goToSlide=function(){},g.lightSlider=null,z={init:function(){}},g.parent().parent().find(".lSAction, .lSPager").remove(),g.removeClass("lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right").removeAttr("style").unwrap().unwrap(),g.children().removeAttr("style"),h.removeClass("lslide active"),g.find(".clone").remove(),h=null,x=null,n=!1,q=0)},setTimeout(function(){e.onSliderLoad.call(this,g)},10),a(window).on("resize orientationchange",function(a){setTimeout(function(){a.preventDefault?a.preventDefault():a.returnValue=!1,z.init()},200)}),this}}(jQuery);
/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=y+l-f,h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
/*------------------------------*\

    #CONFIG

\*------------------------------*/

var siteURL = '';
var isHome = false;
var themeURL = "/wp-content/themes/energie-partagee-2";


// Activate resize events
var resizeEvent = true;
var resizeDebouncer = true;

// Store window sizes
var windowH; 
var windowW;
calc_window();
var lastWindowW = windowW;

// Breakpoint
var bpSmall = 600;
var bpMedium = 830;
var bpLarge = 1000;
var bpXlarge = 1200; 

// Ajax
var ppp = 12; // Post per page
var offsetPost = 12;
var offsetProject = 1;
var limiteProjectLoading = 0;

// Projects Map
var nbMakers = 0;
var nbShowMakers = 0;
var nbloadedCards = 6;
var gmarkers = [];
var activateFilters = false;
var filterCat = 'all_cat';
var filterStade = 'all_cat';

var map;
var prevCardMapId;
var previousMarker;
var previousNrj;
var isOpenMarker = false;

var stylesMapProjects = [
   {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#0500ff"
            },
            {
                "saturation": "-100"
            },
            {
                "lightness": "45"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#007bff"
            },
            {
                "visibility": "on"
            },
            {
                "lightness": "-9"
            }
        ]
    }
];


var markerShadow;
var iconShadow = {
	url: themeURL+'/app/img/marker-shadow.png',
	size: new google.maps.Size(38, 38),
	origin: new google.maps.Point(0, 0),
	anchor: new google.maps.Point(34, 34)
};

var iconsSelectProjectsMap = {
	eolie: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 15,
      	fillColor: '#5ab1bb',
      	fillOpacity: 1, 
    },
	bioma: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 15,
      	fillColor: '#83ab00',
      	fillOpacity: 1, 
    },
	solai: { 
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 15,
      	fillColor: '#e9af00',
      	fillOpacity: 1, 
    },
	micro: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 15,
      	fillColor: '#5268b9',
      	fillOpacity: 1, 
    },
	geoth: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 15,
      	fillColor: '#e7511e',
      	fillOpacity: 1, 
    },
	econo: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 1,
      	strokeWeight: 15,
      	fillColor: '#b7115b',
      	fillOpacity: 1, 
    }
};

var iconsProjectsMap = {
	eolie: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 0,
      	strokeWeight: 15,
      	fillColor: '#5ab1bb',
      	fillOpacity: 1, 
    },
	bioma: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 0,
      	strokeWeight: 15,
      	fillColor: '#83ab00',
      	fillOpacity: 1, 
    },
	solai: { 
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 0,
      	strokeWeight: 15,
      	fillColor: '#e9af00',
      	fillOpacity: 1, 
    },
	micro: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 0,
      	strokeWeight: 15,
      	fillColor: '#5268b9',
      	fillOpacity: 1, 
    },
	geoth: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 0,
      	strokeWeight: 15,
      	fillColor: '#e7511e',
      	fillOpacity: 1, 
    },
	econo: {  
		path: google.maps.SymbolPath.CIRCLE, 
		scale: 22,
		strokeColor: '#ffffff',
      	strokeOpacity: 0,
      	strokeWeight: 15,
      	fillColor: '#b7115b',
      	fillOpacity: 1, 
    }
};


/*------------------------------*\

    #FUNCTIONS

\*------------------------------*/

// Jquery OuterWidth() always with margin & padding

var oldOuterWidth = $.fn.outerWidth;
$.fn.outerWidth = function () { 
	return oldOuterWidth.apply(this, [true]);
};




/*------------------------------*\

    #LOAD

\*------------------------------*/


$(window).load(function() {

});






/*------------------------------*\

    #READY

\*------------------------------*/

var FOO = {
    common: {
        init: function() {
            init_tabs();
			// Nav
			for (var i=0; i<nbNavItems; i++) {				
				pp_nav();
			}
            setTimeout(function(){
                $('.nav').removeClass('is-hidden');
            },1);

			// Mini slider project
			initLoadMoreProjectsBtn();

			// Video lightbox
			$('.lightvideo').lightGallery();

            // Wrap anim
            $('.no-touch .wrap-anim').waypoint(function(){
                $(this.element).toggleClass('ready-anim');
            }, {offset: '85%'});

            // wrap suggestion
            if ($('.suggestion').length) {
                $('.fluxi-wrap').addClass('has-suggestion');
            }
        }
    },
    home: {
        init: function() {
            isHome = true; 
            if ($('body').hasClass('touch')) {
                $('.key-nums__item__num').each(function(){
                    $(this).html($(this).attr('data-number'));
                });
            } else {
                $('.key-nums__item__num').each(function(){
                    var txt = $(this).next();
                    var val = $(this).attr('data-number');
                    var speed = (val>1000) ? 3000 : val*100;
                    $(this).jQuerySimpleCounter({
                      start:  0,
                      end:  val,
                      duration: speed
                    });
                });
            }
        }
    },
	page: {
        init: function() {
			$(".fitvids").fitVids();
			initLoadMorePostsBtn();
			if($('body.page-template-page-projets').length){	
				initProjectsMap();
                initLoadMoreProjectsCardsBtn();				
			}			
        }
    },
	category: {
        init: function() {			
			initLoadMorePostsBtn();
        }
    },
	single: {
        init: function() {
			$(".fitvids").fitVids();
			if($('body.single-projets').length){			
				initSingleMap();				
				initSendMailPorspect();			
			}
        }
    },	
	contact:{
		init: function() {
			initContactForm();

            // Add mailto in clikarde
            $('.clikarde__item').each(function( i ) {
                var dataMailto,
                    dataHref = $(this).find('.minicard').attr('href');

                if(dataHref.indexOf('@') > -1){
                    dataMailto = dataHref.substring(7);

                    $(this).find('.minicard').attr('href', 'mailto:'+dataMailto);
                }
            });
        }
	},
    search:{
        init: function() {
            $('.nav__search__input').focus();
			// Test to select active filter option in search filters
			if((window.location.href).split("&")[1] != void 0){
				var activeFilter = (window.location.href).split("&")[1];
				var filterVal = activeFilter.substring(4);				
				$('#search-filters #filter option[value='+filterVal+']').attr('selected','selected');
			}
			
			$('#search-filters').change(function() {
				var filterType;
                var filterVal = $('#search-filters #filter option:selected').val();
			  	
				if($.isNumeric(filterVal)){
					filterType = 'cat';
				}else{
					filterType = 'cpt';
				}
				var urlSeach = (window.location.href).split('&')[0] ;
               location.href = urlSeach+'&'+filterType+'='+filterVal;
            });
			
            calc_windowH();
            if (windowH<$('.footer').offset().top) {
                $('#search-filters').waypoint(function(){
                    $(this.element).toggleClass('is-fixed');
                });
                $('.footer').waypoint(function(){
                    $('#search-filters').toggleClass('is-fixed');
                }, {offset: '100%'});
            }
        }
    }
};

var UTIL = {
    fire: function(func, funcname, args) {
        var namespace = FOO;
        funcname = (funcname === undefined) ? 'init' : funcname;
        if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
          namespace[func][funcname](args);
        }
    },
    loadEvents: function() {
        UTIL.fire('common');
        $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
          UTIL.fire(classnm);
        });
    }
};

$(document).ready(UTIL.loadEvents);





/*------------------------------*\

    #RESIZE

    Is activated by vars in config.js

\*------------------------------*/

/**
 * MAIN RESIZE EVENT
 *
 */

function resize_handler() {	 
	// calc_windowW();    
}
if ( resizeEvent ) { $( window ).bind( "resize", resize_handler() ); }

/**
 * DEBOUNCER
 * Fire event when stop resizing
 */

function debouncer( func , timeout ) {
    var timeoutID;
    var timeoutVAR;

    if (timeout) {
        timeoutVAR = timeout;
    } else {
        timeoutVAR = 200;
    }

    return function() {
        var scope = this , args = arguments;
        clearTimeout( timeoutID );
        timeoutID = setTimeout( function () {
            func.apply( scope , Array.prototype.slice.call( args ) );
        }, timeoutVAR );
    };

}

function debouncer_handler() {
    reloadCurrentPage();
}
if ( resizeDebouncer ) { $( window ).bind( "resize", debouncer(debouncer_handler) ); }





/*------------------------------*\

    #TOOLS

\*------------------------------*/

/**
 * Get window sizes
 * Store results in windowW and windowH vars
 */

// Get width and height
function calc_window() {
	calc_windowW();
	calc_windowH();
}
// Get width
function calc_windowW() {
	windowW = $(window).width();
}
// Get height
function calc_windowH() {
	windowH = $(window).height();
}


/**
 * Test window width
 * Use breakpoint vars set in config.js
 */

function test_layout() {
	calc_windowW();
	if ( windowW<=bpSmall ) {
	    return 'is-small';
	} else if ( windowW>bpSmall && windowW<=bpLarge ) {
		return 'is-medium';
	} else if ( windowW>bpLarge && windowW<=bpXlarge ) {
		return 'is-marge';
	} else if ( windowW>bpXlarge ) {
		return 'is-xlarge';
	}
} 


/* Disable a.js-disable-links */

function disable_links() {
	$('.js-disable-link').click(function(e){
		e.preventDefault();
	});
}


/* Remove img title on roll-over, store it in data and then fill it back on roll-out */

function disable_titles() {
	$('.js-disable-title').hover(
		function(){
			var cible = $(this);
			cible.data( 'title', cible.attr('title') ).attr('title','');
		},
		function() {
			var cible = $(this);
			cible.attr( 'title', cible.data('title') );
		}		
	);
}


/**
 * Monitor img loading progress
 * Using Images Loaded : http://imagesloaded.desandro.com
 */

function loading_img(container, loader) {
	container.addClass('is-loading');
	var nbImg = container.find('img').length-1;
	
	container.imagesLoaded().progress(onProgress).always(onAlways);

	function onProgress(imgLoad, image) {
		var percent = Math.round(stepLoad*(100/nbImg));
		//$('.loader__bar').css('width', percent+'%');
	}

	function onAlways() {
		container.removeClass('is-loading');
		//$('.loader').remove();
	}
}


/**
 * Add a notification display
 * Using : notify('message');	
 */	
var notify = function(message) {
	
	var $message;	
	
	if ( $('body').hasClass('single-projets') ) {
			$message = $('<div class="bullet-points bullet-points--white"><span></span></div><p class="notif-form" style="display:none;">' + message + '</p>');
	} else {
			$message = $('<p class="notif-form" style="display:none;">' + message + '</p>');
	}      

    $('.notification').append($message);
       $message.slideDown(300, function() {
      	if ( !$('body').hasClass('single-projets') && !$('body').hasClass('page-id-3224')) {
      		window.setTimeout(function() {
      		  $message.slideUp(300, function() {
      		    $message.remove();
      		  });
      		}, 10000);
      	}
    });
};	


/**
 * Share buttons
 */	

var popupCenter = function(url, title, width, height){
	var popupWidth = width || 640;
	var popupHeight = height || 320;
	var windowLeft = window.screenLeft || window.screenX;
	var windowTop = window.screenTop || window.screenY;
	var windowWidth = window.innerWidth || document.documentElement.clientWidth;
	var windowHeight = window.innerHeight || document.documentElement.clientHeight;
	var popupLeft = windowLeft + windowWidth / 2 - popupWidth / 2 ;
	var popupTop = windowTop + windowHeight / 2 - popupHeight / 2;
	var popup = window.open(url, title, 'scrollbars=yes, width=' + popupWidth + ', height=' + popupHeight + ', top=' + popupTop + ', left=' + popupLeft);
	popup.focus();
	return true;
};

$('.js-share').on('click', function(e){
	e.preventDefault();

	var network = $(this).attr('data-network');
	var url = $(this).attr('data-url');
	var shareUrl;

	if (network == 'facebook') {
		shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
		popupCenter(shareUrl, "Partager sur Facebook");
	} if (network == 'twitter') {
		var origin = "energiepartagee";
		shareUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(document.title) +
            "&via=" + origin + "" +
            "&url=" + encodeURIComponent(url);
		popupCenter(shareUrl, "Partager sur Twitter");
	}
});



TweenMax.to(".js-widget", 0.4, { y: "0%", ease:Back.easeOut });
		
var coinAnim = new TimelineMax({delay: .5});
coinAnim.fromTo(".js-coin", .4, { scale:0, rotation: 0}, { scale:1, rotation: 720, ease:Quad.easeOut });
coinAnim.to(".js-coin", 0.6, { top: "100px", ease:Back.easeIn }, 0.4);
coinAnim.to(".js-widget-tirelire", 0.2, { scaleY: 1.1, transformOrigin:"50% 100%", ease:Back.easeIn }, "-=0.25");
coinAnim.to(".js-widget-tirelire", 0.2, { scaleY: 1, transformOrigin:"50% 100%", ease:Back.easeOut });

var messageAnim = new TimelineMax({delay: 2});
messageAnim.to(".js-widget-message", 0.4, { x: "0%",  ease:Back.easeOut });
messageAnim.to(".js-widget-message", 0.4, { x: "120%",  ease:Back.easeIn }, 3);

$('.js-widget').on('mouseenter', function () {
	if ( !coinAnim.isActive() && !messageAnim.isActive() ) {
		coinAnim.restart();
		messageAnim.restart();
	}
})

$('.fc').waypoint(function() {
	console.log('yo');
	$('.js-widget').toggleClass('is-off');
}, {offset: '50%'});

var timerOff;

$(".js-choose-connexion, .js-close-connect").on("click",function(e){
	e.preventDefault();
	clearTimeout(timerOff);
	$(".connexion div").addClass("is-active")
});

$(".js-close-connect").on("click", function(){

	$(".connexion div").removeClass("is-active");
	$(".connexion div span").addClass("is-off");

	timerOff = setTimeout(function(){
		$(".connexion div span").removeClass("is-off");
	}, 300)
});

$(".top-display").waypoint(function(){
	$(".navbar, .navbar__id").toggleClass("is-compact")
}, { offset: "-1px" } );
$.fn.jQuerySimpleCounter = function( options ) {
    var settings = $.extend({
        start:  0,
        end:    100,
        easing: 'swing',
        duration: 400,
        complete: ''
    }, options );

    var thisElement = $(this);

    $({count: settings.start}).animate({count: settings.end}, {
		duration: settings.duration,
		easing: settings.easing,
		step: function() {
			var mathCount = Math.ceil(this.count);
			thisElement.text(mathCount);
		},
		complete: settings.complete
	});
};
$('.following .cta').click(function(e){
	$('.wrap-bg.c-main').toggleClass('is-active');	
});
/*
 * Init single project Map
 * - Add a dom container "map"
 * - mapOptions = { zoom: 7, scrollwheel: false, panControl: true}
 */
function initSingleMap(){
	//console.log('Init Google Map Obj for "Single project"');
	
	var mapContainer = document.getElementById("map");
	//mapContainer.className += 'loader';
	
	var latitude = Number($('#map').data('lat'));
	var longitude = Number($('#map').data('lon'));
	
	var latlng = new google.maps.LatLng(latitude,longitude);
	var newLatLng = {lat: latitude, lng: longitude};
	
	var categoryNRJ = $('#map').data('cat');
	// Cut string to escape "-"
	categoryNRJ = categoryNRJ.substring(0, 5);	
	
	var title = $('#map').data('title');
	
	var mapOptions = {
        zoom: 7,
        scrollwheel: false,
        panControl: true,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        },
        mapTypeControl: false,
        streetViewControl: false,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP 
    };
	
	var map = new google.maps.Map(mapContainer,mapOptions);	
	map.setOptions({styles: stylesMapProjects});
	
	var marker = new google.maps.Marker({
		position: newLatLng,
		clickable: true,
		map: map,
		title: title,
		icon: iconsSelectProjectsMap[categoryNRJ]
	});	

	markerShadow = new MarkerShadow(marker.getPosition(), iconShadow, map);

	// do something only the first time the map is loaded
	google.maps.event.addListenerOnce(map, 'idle', function(){
		setTimeout(function() {        
			$('.spinner.bg-spin').remove();		        	
		}, 300);				
	});				
}



/*
 * Init Projects Map
 * - Add a dom container
 * - latlng = new google.maps.LatLng(47.50,2.20);
 * - activateFilters : default = false
 * - mapOptions = { zoom: 6, scrollwheel: false, panControl: true}
 */
function initProjectsMap(){
	
	//console.log('Init Google Map Obj for "Projects Map"');
	
	var mapContainer = document.getElementById("map");	

	var latlng = new google.maps.LatLng(47.50,2.20);
	
	activateFilters = true;	
	
	var mapOptions = {
        zoom: 6,
        scrollwheel: false,
        panControl: true,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        mapTypeControl: false,
        streetViewControl: false,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROAD        
    };
	// Load the map only on desktop
	if(windowW >= bpSmall){
		loadGoogleMap(mapContainer, mapOptions);
	}else{
		loadMarkers(map)
	}	
}
/* Init the google map
 *  mapContainer = DOM element | mapOptions = option array
 */
function loadGoogleMap(mapContainer, mapOptions){	
	
	//console.log('Load Google Map Obj');
		
	map = new google.maps.Map(mapContainer,mapOptions);	
	map.setOptions({styles: stylesMapProjects});

	//mapContainer.className += 'loader';
	
	loadMarkers(map);
}

/* Load markers by JSON ajax custom request
 * map = Google map object
 * filterCat : default = 'all_cat' / String : cat_slug
 */
function loadMarkers(map){
	
	//console.log('loadMarkers '+filterCat);	
		
	// Params : suppress_filters | post_type | posts_per_page | post_status
	if(windowW >= bpSmall){
		// Load all markers
		var str = 'action=get_json_map&category='+filterCat;
	}else{
		// Mobil version
		var str = 'action=get_json_map&category='+filterCat+'&posts_per_page=6';
	}
	
	$.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: ajax_object.ajax_url,
        data: str,
        success: function(data){				
			addMakers(map, data);			
			//$('#map').removeClass('loader');			
        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
        }

    });
    return false; 
	
}

function addMakers(map, data){
	
	//console.log('Add Makers ');
	
	nbMakers = Object.keys(data).length;	
	
	$.each(data, function(i){		
		
		// If it's a project
		if(data[i].postType == 'projets'){	
			// Slug NRJ
			var categoryNRJ = data[i].catSlug;
			// Cut string to escape "-"
			categoryNRJ =  categoryNRJ.substring(0, 5);

			//  Add markers on the map only on desktop
			if(windowW >= bpSmall){	
				var newLatLng = {lat: Number(data[i].latitude), lng: Number(data[i].longitude)};
										
				var marker = new google.maps.Marker({
					position: newLatLng,
					map: map,
					title: data[i].title,
					icon: iconsProjectsMap[categoryNRJ],
					category : data[i].catSlug,
					stade : data[i].stadeSlug
				});				
					
				marker.addListener('click', function() {
					onClickMarker(i,map,marker,categoryNRJ);					
				});
				
				gmarkers.push(marker);			
				
				//console.log(marker);
				
				// Active filters
				if(i==nbMakers-1 && activateFilters){
					// Init all filters once if activateFilters = true
					initFilters(map);
					activateFilters=false;
					centerMapOnMarkers(map);
				}
			}
			// Add info card
			var markerContent = '<article class="card-map c-'+categoryNRJ+' anim-out-left">'; 
				markerContent += '<header class="card card-project">';
					markerContent += '<a href="'+data[i].permalink+'">';
	            		markerContent += '<div class="card__img" style="background-image:url('+data[i].image+')"><i class="card__icon"></i><div class="spinner"></div><span class="tag is-inactive">'+data[i].stadeName+'</span></div>';
	            		markerContent += '<div class="card__infos"><h1 class="card__title">'+data[i].title+'</h1><p class="p-ss">'+data[i].region+'</p></div>';
	            	markerContent += '</a>';
	            markerContent += '</header>';

	            markerContent += '<div class="p-details">';
		            markerContent += '<div class="p-details__nrg"><i class="icon-'+data[i].catSlug+'_100"></i></div>';

		        	markerContent += '<ul class="p-details__infos">';
		        		markerContent += '<li class="p-details__infos__loca"><strong>'+data[i].city+'</strong><span>'+data[i].region+'</span></li>';
		          		markerContent += '<li class="p-details__infos__prod"><strong>'+data[i].equiPui+' '+data[i].typeUnit+'</strong><span>'+data[i].prod+' '+data[i].prodUnit+'</span></li>';
		        	markerContent += '</ul>';

		        	markerContent += '<p class="p-details__equi p-ss">Produit la consommation annuelle de '+data[i].equiPro+' foyers.</p>';
	    		markerContent += '</div>';

				markerContent += '<a class="link-cta" href="'+data[i].permalink+'"><i class="icon-chevronright_32"></i><span>Voir ce projet</span></a>';

			markerContent += '</article>';

			$('.cards-map').append(markerContent);

			// remove the loader
			if(i==nbMakers-1 && windowW >= bpSmall){
				$('.js-more-procards').parent().remove();
				setTimeout(function() {        
		        	$('.spinner.bg-spin').remove();		        	
		        }, 300);				
			}else if(i==1 && windowW <= bpSmall){
				$('.spinner.bg-spin').remove();
				$('.js-more-procards').parent().removeClass('anim-out');	
			}			
			
		}
		
		// End each
   });	
		
}


// Event on click  on a marker
function onClickMarker(index,map,marker,categoryNRJ){
	
	// Add a shadow
	if (markerShadow && markerShadow.setPosition) {
        markerShadow.setPosition(marker.getPosition());
        markerShadow.show();
    } else {
    	markerShadow = new MarkerShadow(marker.getPosition(), iconShadow, map);
    	markerShadow.show();
    }
    // Modify previous marker
    if(isOpenMarker){
    	previousMarker.setIcon(iconsProjectsMap[previousNrj]);
    	previousMarker.setZIndex(1);
	}
    // Change the icon
    marker.setIcon(iconsSelectProjectsMap[categoryNRJ]);
	previousMarker = marker;
	previousNrj = categoryNRJ;
	
	marker.setZIndex(10000);

    // Get the card
    if(index != prevCardMapId){
	    if(isOpenMarker){
	    	$('.cards-map .card-map:eq('+prevCardMapId+')').toggleClass('anim-out-left');
	    	setTimeout(function() {
	        	$('.cards-map .card-map:eq('+index+')').toggleClass('anim-out-left');
	        	setTimeout(function() {
	        		$('.cards-map .card-map:eq('+index+') .spinner').css('opacity',0);
	        	}, 100);
	        }, 220);
	    	
		}else{
			$('.cards-map .card-map:eq('+index+')').toggleClass('anim-out-left');
			setTimeout(function() {
	        	$('.cards-map .card-map:eq('+index+') .spinner').css('opacity',0);
	        	$('.cards-map .card-map:eq('+index+')').removeClass('unactive');
	        }, 100);
		}
	}
    prevCardMapId = index;
	isOpenMarker = true;
	
}

function initFilters(map){	

	//console.log('Init filters');
	
	$('.first.map-filters button').click(function(e){
		resetMarkers();
		var $this = $(this);
		filterCat = $this.data('filter');
		
		if(!$this.hasClass('js-f-active')){
			
			$('.first.map-filters .js-f-active').toggleClass('js-f-active');
			$this.addClass('js-f-active');	
			
			for (i = 0; i < gmarkers.length; i++) {						
				// If is same category or category not picked
				if (gmarkers[i].category == filterCat || filterCat.length === 0){ 
					if(gmarkers[i].stade == filterStade || filterStade == 'all_cat'){
						gmarkers[i].setVisible(true);					
					}
				}
				// Categories don't match 
				else{ 
					gmarkers[i].setVisible(false);
				}
			}		
		
		}else{
			$this.toggleClass('js-f-active');
			resetNrjFilter();	
		}
		
		centerMapOnMarkers(map);		
	});	
	
	$('.second.map-filters button').click(function(e){		
		resetMarkers();
		var $this = $(this);					
		filterStade = $this.data('filter');
		
		if(!$this.hasClass('js-f-active')){
			
			$('.second.map-filters .js-f-active').toggleClass('js-f-active');
			$this.addClass('js-f-active');
			
			for (i = 0; i < gmarkers.length; i++) {			
				if (gmarkers[i].stade == filterStade || filterStade.length === 0) {
					if(gmarkers[i].category == filterCat || filterCat == 'all_cat'){
						gmarkers[i].setVisible(true);									
					}
				}else {
					gmarkers[i].setVisible(false);
				}				
			}
		}else{
			$this.toggleClass('js-f-active');
			resetStadeFilter();	
		}		
		centerMapOnMarkers(map);
	});
	
}

function resetNrjFilter(){
	for (i = 0; i < gmarkers.length; i++) {
		if (gmarkers[i].category != filterCat ) {			
			if(gmarkers[i].stade == filterStade || filterStade == 'all_cat'){
				gmarkers[i].setVisible(true);
			}			
		}			
		if(i == gmarkers.length-1){
			filterCat = 'all_cat';
		}	
	}		
}
function resetStadeFilter(){
	for (i = 0; i < gmarkers.length; i++) {
		if (gmarkers[i].stade != filterStade) {		
			if(gmarkers[i].category == filterCat || filterCat == 'all_cat'){
				gmarkers[i].setVisible(true);
			}
		}	
		if(i == gmarkers.length-1){
			filterStade = 'all_cat';
		}	
	}	
}

function resetMarkers() {	
	if(isOpenMarker){
		// reset icon
    	previousMarker.setIcon(iconsProjectsMap[previousNrj]);
    	markerShadow.hide();
    	isOpenMarker = false;
    	// reset card
    	$('.cards-map .card-map:eq('+prevCardMapId+')').toggleClass('anim-out-left');
    	prevCardMapId = null;    	
	}  
}


function centerMapOnMarkers(map){
	nbShowMakers = nbMakers;		
	var LatLngList = new Array ();
	var bounds = new google.maps.LatLngBounds ();
	// Bind all marker's positions
	for (i = 0; i < gmarkers.length; i++) {
		if(gmarkers[i].visible)
		LatLngList.push(gmarkers[i].getPosition());
		else
		nbShowMakers--;			
	}	
	//  And increase the bounds to take this point
	for (var j = 0, LtLgLen = LatLngList.length; j < LtLgLen; j++) {	  
		bounds.extend (LatLngList[j]);
	}
	
	if(nbShowMakers >= 3){		
		map.fitBounds (bounds);		
	}else if(nbShowMakers == 2){		
		map.setZoom(6); 
		map.setCenter(bounds.getCenter());
	}else if(nbShowMakers == 1){		
		map.setZoom(7);
		map.setCenter(bounds.getCenter());
	}
}

function removeMarkers() {	
	//console.log('Remove All Markers');	
	 for(i=0; i<gmarkers.length; i++){
        gmarkers[i].setMap(null);
    }   
}

/*
 * Reload map page on resize
 *
 */
function reloadCurrentPage(){
	if(lastWindowW <= bpSmall && windowW >= bpSmall && $('.map-projects').length == 1){	
	    location.reload(true);
	    lastWindowW = windowW; 
	}
}


/*
 * Marker shadow prototype
 * 
 */
MarkerShadow.prototype = new google.maps.OverlayView();
MarkerShadow.prototype.setPosition = function(latlng) {
    this.posn_ = latlng;
    this.draw();
  }
  /** @constructor */

function MarkerShadow(position, options, map) {

    // Initialize all properties.
    this.posn_ = position;
    this.map_ = map;
    if (typeof(options) == "string") {
      this.image = options;
    } else {
      this.options_ = options;
      if (!!options.size) this.size_ = options.size;
      if (!!options.url) this.image_ = options.url;
    }

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);
  }
  /**
   * onAdd is called when the map's panes are ready and the overlay has been
   * added to the map.
   */
MarkerShadow.prototype.onAdd = function() {
  // if no url, return, nothing to do.
  if (!this.image_) return;
  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';

  // Create the img element and attach it to the div.
  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = this.options_.size.x + 'px';
  img.style.height = this.options_.size.y + 'px';
  img.style.position = 'absolute';

  div.appendChild(img);

  this.div_ = div;

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes();
  panes.overlayShadow.appendChild(div);
};

MarkerShadow.prototype.draw = function() {
  // if no url, return, nothing to do.
  if (!this.image_) return;
  // We use the coordinates of the overlay to peg it to the correct position 
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection();

  var posn = overlayProjection.fromLatLngToDivPixel(this.posn_);

  // Resize the image's div to fit the indicated dimensions.
  if (!this.div_) return;
  var div = this.div_;
  if (!!this.options_.anchor) {
    div.style.left = Math.floor(posn.x - this.options_.anchor.x) + 'px';
    div.style.top = Math.floor(posn.y - this.options_.anchor.y) + 'px';
  }
  if (!!this.options_.size) {
    div.style.width = this.size_.x + 'px';
    div.style.height = this.size_.y + 'px';
  }
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
MarkerShadow.prototype.onRemove = function() {
  if (!this.div_) return;
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};

// Set the visibility to 'hidden' or 'visible'.
MarkerShadow.prototype.hide = function() {
  if (this.div_) {
    // The visibility property must be a string enclosed in quotes.
    this.div_.style.visibility = 'hidden';
  }
};

MarkerShadow.prototype.show = function() {
  if (this.div_) {
    this.div_.style.visibility = 'visible';
  }
};
/*
MarkerShadow.prototype.toggle = function() {
  if (this.div_) {
    if (this.div_.style.visibility === 'hidden') {
      this.show();
    } else {
      this.hide();
    }
  }
};*/



/*										 
\\   FLUXI CONTENT
*/				

// -- Galeries
	if($('.galerie_damier').length){
		$('.galerie_damier').lightGallery({
			thumbnail:false
			, thumbMargin:0
			, thumbContHeight:90
			/*, animateThumb: false
    		, showThumbByDefault: false*/
		}); 
	}
	if($('ul.galerie_vignettes').length){
		$('ul.galerie_vignettes').lightSlider({
			gallery:true,
			item:1,
			loop:false,
			thumbItem:9,
			slideMargin:0,
			enableDrag: false,
			adaptiveHeight:true,
			currentPagerPosition:'middle',			      
			onSliderLoad: function(el) {
				el.lightGallery({
					selector: '.galerie_vignettes .lslide'
				});
			}   
		}); 
	}
	if($('ul.galerie_slider').length){
		$('ul.galerie_slider').lightSlider({
			gallery:false,
			pager:true,
			loop:false,
			item:1,
			adaptiveHeight:true,        	
        	slideMargin:0,
        	loop:true
		}); 
	}
	// -- Accordéons
	if($('.accordion').length){
		$('.accordion .accordion__head').click( function(e) { 		 	
			$(this).parent().toggleClass('open').find('.accordion__content').slideToggle();		
		});
	}
	if($('.lightbox').length){
		// -- Lightbox Img
		$('.lightbox').lightGallery({
			selector: 'this'
		});
	}
	// Mozaic Isotope
	// regarder :: http://isotope.metafizzy.co/filtering.html
	  if($('.main-isogrid').length){
		  
		  $('.main-isogrid').each(function( i ) {	
			  //var $container = $(this);
			  var $container = $('.main-isogrid');				  
			  /*var random_id = $container.attr('class').split('_');
			  random_id = random_id[1];*/			
			  var $the_iso_grid = $container.isotope({
				itemSelector: '.item',
				layoutMode: 'masonry',			
				transitionDuration: '0.5s',		
				hiddenStyle: {
				  opacity: 0
				},
				visibleStyle: {
				  opacity: 1
				}
			  });
			  
			  $('.button-group-sort').on( 'click', 'button', function() {	
			  	var filterValue = $( this ).attr('data-filter');    
				$the_iso_grid.isotope({ filter: filterValue });
				
			  });				
			
		  });
		  
		  // file type icon
			$(".main-isogrid a[href$='.pdf'] .icon-doc").addClass('js-icon-pdf');
			$(".main-isogrid a[href$='.zip'] .icon-doc, .docs a[href$='.rar'] .icon-doc").addClass('js-icon-zip');
			$(".main-isogrid a[href$='.odt'] .icon-doc").addClass('js-icon-odt');
			$(".main-isogrid a[href$='.doc'] .icon-doc, .docs a[href$='.docx'] .icon-doc").addClass('js-icon-word');  
			$(".main-isogrid a[href$='.xls'] .icon-doc, .docs a[href$='.xlsx'] .icon-doc, .main-isogrid a[href$='.xlt'] .icon-doc, .main-isogrid a[href$='.xltx'] .icon-doc").addClass('js-icon-exel');  
	  }
function initContactForm(){	
	$("#contact_ep").validate({
			rules: {
				email:{	email: true	},				
				prenom: { required: true },
				nom: { required: true },
				sujet: { required: true },
				message: { required: true },
				
			},
			messages: {			
				sujet: { required: "Veuillez sélectionner une réponse" },
				
			},
			submitHandler: function() {				
				sendMail();			
			}
		});	
	
	function sendMail(){
		if($('#submit.is-sending').length == 0){	
			$.ajax({
					url: themeURL+'/app/inc/inc_projet/send_contact.php',
					type: 'POST',
					data: $('form#contact_ep').serialize(),
					dataType: 'json',
					beforeSend : function() {					
						$('#submit').addClass('is-sending').html('<i class="spinner"></i>');
						
					},
					success: function(json) {						
						if(json.resultForm == 'yes') {   
						    $('#submit').remove();                 	
							notify('<span class="valid-submit-form">Votre message à bien été envoyé. Merci</span>');						
						} else {
							$('#submit').removeClass('is-sending').html('Envoyer');						
							notify('<span class="error-submit-form">Il semble y avoir un problème dans l\'envoie de votre message. Vérifiez si tous les champs requis sont renseignés puis renvoyez le. Si le problème persiste, veuillez nous contacter.</span>');	
						}						
					},
                  error: function(){
						$('#submit').removeClass('is-sending');
                        notify('<span class="error-submit-form">Il semble y avoir un problème dans l\'envoie de votre message. Vérifiez si tous les champs requis sont renseignés puis renvoyez le. Si le problème persiste, veuillez nous contacter.</span>');
                  }          
			});
		}
	}
	
}
//*********************************************
    //   Soumettre un projet
    //*********************************************
	var typeEnergie, stadeProjet;
	
	if($('#soumettre_projet').length > 0){	

		// Datepicker
		var TODAY = new Date(2013,3,20,10,30);
		$('#mise_en_service').pickadate({
			monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
			weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
			today: 'aujourd\'hui',
			clear: 'effacer',
			formatSubmit: 'dd/mm/yy',
			close: 'Fermer'
		});
		
		// validation Js du form
		var messageRadio = "Veuillez sélectionner une réponse";
		
		$("#soumettre_projet").validate({
			rules: {
				email_contact:{	required: true,	email: true	},
				connu_comment: { required: true	},
				collectif: { required: true	},
				stade_projet: {	required: true },
				entite_porteuse: { required: true },
				projet_formalise: { required: true },
				actions_sensibilisation: { required: true }, 
				dispositions_securisant: { required: true },
				montant_financement: { required: true },
				projet_visible: { required: true },
				code_postal: { required: true, number: true },
				code_postal_contact: { number: true },
				tel_1_contact : { required: true, digits: true },
				tel_2_contact : { digits: true },
				puissance_prevue : { required: true, number: true },
				unites_production : { required: true, number: true },
				objectif_production : { number: true },
				montant_investissement : { required: true, number: true },
				montant_financement : { number: true, range: [50000, 500000] },
				fonds_disponibles : { number: true },
				part_endettement : { number: true, max: 100 },
				site_web_projet : { url: true }
			},
			messages: {				
				connu_comment: { required: messageRadio },
				collectif: { required: messageRadio },
				stade_projet: { required: messageRadio },
				entite_porteuse: { required: messageRadio },
				projet_formalise: { required: messageRadio },
				actions_sensibilisation: { required: messageRadio },
				dispositions_securisant: { required: messageRadio },
				montant_financement: { required: messageRadio },
				projet_visible: { required: messageRadio }
			},
			submitHandler: function() {				
				sendForm();			
			}
		});	
		
		function sendForm(){
			if($('#submit.is-sending').length == 0){	
			$.ajax({
					url: themeURL+'/app/inc/inc_projet/soumettre_projet.php',
					type: 'POST',
					data: $('form#soumettre_projet').serialize(),
					dataType: 'json',
					beforeSend : function() {
						$('.btns-form #submit').addClass('is-sending').html('<i class="spinner"></i>');						
					},
					success: function(json) {		
						if(json.resultForm == 'yes') {  
							$('.btns-form #submit').remove();							                  	
							notify('<span class="valid-submit-form">Merci, votre projet vient a été correctement ajouté. Nous vous contacterons prochainement avant de le faire apparaitre sur notre site internet.</span>');						
						} else {
							$('.btns-form #submit').removeClass('is-sending').html('Envoyer'); 														
							notify('<span class="error-submit-form">Il semble y avoir un problème dans l\'envoie de votre formulaire. Vérifiez si tous les champs requis sont renseignés puis renvoyez le. Si le problème persiste, veuillez nous contacter.</span>');	
						}						
					},
                    error: function(){
						$('#submit').removeClass('is-sending').html('Envoyer');
                        notify('<span class="error-submit-form">Il semble y avoir un problème dans l\'envoie de votre formulaire. Vérifiez si tous les champs requis sont renseignés puis renvoyez le. Si le problème persiste, veuillez nous contacter.</span>');
                    }          
				});
			}
		}
	
		// affichage conditionnel
		typeEnergie = $('#source_energie').val();
		
		stadeProjet = $('input[name=stade_projet]').index($('input[name=stade_projet]:checked')) + 1;		
		
		hideShowForm();	
				
		$('#source_energie').change(function(){		
			typeEnergie = $(this).val();			
			if(typeEnergie == 14){
				$('#source_energie_detail').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#source_energie_detail').addClass('sub-hide-item').attr('disabled', true).val('');
			}			
			hideShowForm();	
		});
		
		$('input[name=stade_projet]').change(function(){		
			stadeProjet = $('input[name=stade_projet]').index(this);			
			stadeProjet = stadeProjet + 1;				
			hideShowForm();	
			//refreshWaypoints();	
		});	
		
		// champs obtionnels/conditionnels (si autres, si oui, etc...)		
		
		$('input[name=connu_comment]').change(function(){			
			if($('input[name=connu_comment]:checked').val() == "Autres"){
				$('#connu_autre').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#connu_autre').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});
		
		$('input[name=collectif]').change(function(){			
			if($('input[name=collectif]:checked').val() == "Autres"){
				$('#autre_collectif').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#autre_collectif').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});		
		
		$('input[name=entite_porteuse]').change(function(){			
			if($('input[name=entite_porteuse]:checked').val() == "oui"){
				$('#nom_entite_porteuse').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#nom_entite_porteuse').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});	
		
		/*$('input[name=projet_formalise]').change(function(){			
			if($('input[name=projet_formalise]:checked').val() == "Oui"){
				$('#fichier_projet_formalise').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#fichier_projet_formalise').addClass('sub-hide-item').attr('disabled', true);
				$('#fichier_projet_formalise').replaceWith( $('#fichier_projet_formalise').val('').clone( true ) );
			}
		});	*/
		
		$('input[name=actions_sensibilisation]').change(function(){			
			if($('input[name=actions_sensibilisation]:checked').val() == "oui"){
				$('#actions_sensibilisation_detail').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#actions_sensibilisation_detail').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});	
		
		$('input[name=dispositions_securisant]').change(function(){			
			if($('input[name=dispositions_securisant]:checked').val() == "oui"){
				$('#dispositions_securisant_detail').removeClass('sub-hide-item').attr('disabled', false);
			}
			else{
				$('#dispositions_securisant_detail').addClass('sub-hide-item').attr('disabled', true).val('');
			}
		});
		
		$('input[name=demande_financement]').change(function(){			
			if($('input[name=demande_financement]:checked').val() == "oui"){
				$('#montant_financement').removeClass('sub-hide-item').attr('disabled', false);
				$('#montant_financement_label').removeClass('sub-hide-item');
			}
			else{
				$('#montant_financement').addClass('sub-hide-item').attr('disabled', true).val('');
				$('#montant_financement_label').addClass('sub-hide-item');
			}
		});
		
		
	}
	
	function hideShowForm(){
		
		if(stadeProjet != "" && stadeProjet != 0){			
			
			if(stadeProjet == 2 ||  stadeProjet == 3){
					
				$('.item-1-6, .item-1-5, .item-1-4, .item-1-3, .item-2-6').removeClass('hide-item');
				
				disableCleaner();
			}
			
			else if(stadeProjet == 1){
				$('.item-1-6, .item-1-5, .item-1-4, .item-1-3').removeClass('hide-item');
				$('.item-2-6').addClass('hide-item');
				
				disableCleaner();
			}
			
			else if(stadeProjet == 4){
				
				$('.item-1-6, .item-1-5, .item-1-4, .item-2-6').removeClass('hide-item');		
				$('.item-1-3').addClass('hide-item');
				
				disableCleaner();
			}
			
			else if(stadeProjet == 5){
				
				$('.item-1-6, .item-1-5, .item-2-6').removeClass('hide-item');	
				$('.item-1-4, .item-1-3').addClass('hide-item');
				
				disableCleaner();
			}
			
			else if(stadeProjet == 6){
							
				$('.item-1-6, .item-2-6').removeClass('hide-item');					
				$('.item-1-5, .item-1-4, .item-1-3').addClass('hide-item');
				
				disableCleaner();
				
			}
			
			else{
				
				$('.item-1-6, .item-1-5, .item-1-4, .item-1-3, .item-2-6').addClass('hide-item');			
			}
			
			
		}	
			
		// type energie 
		if(typeEnergie != 12){
			$('.type-eco-energ').addClass('sub-hide-item');
			$('.type-non-eco-energ').removeClass('sub-hide-item');
			
			$('#puissance_prevue, #unites_production, #objectif_production').removeClass('hide-item').attr('disabled', false);			
			$('#objectif_economie').addClass('hide-item').attr('disabled', true).val('');
		}
		else{
			$('.type-eco-energ').removeClass('sub-hide-item');
			$('.type-non-eco-energ').addClass('sub-hide-item');
			
			$('#puissance_prevue, #unites_production, #objectif_production').addClass('hide-item').attr('disabled', true).val('');			
			$('#objectif_economie').removeClass('hide-item').attr('disabled', false);	
		}
		
		if(typeEnergie == 14){
			$('#source_energie_detail').removeClass('sub-hide-item').attr('disabled', false);
		}
		else{
			$('#source_energie_detail').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		
		// champs autres etc...
		// connu comment
		if($('input[name=connu_comment]:checked').val() != "Autres"){
			$('#connu_autre').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		else{
			$('#connu_autre').removeClass('sub-hide-item').attr('disabled', false);				
		}
		// collectif
		if($('input[name=collectif]:checked').val() != "Autres"){
			$('#autre_collectif').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		else{
			$('#autre_collectif').removeClass('sub-hide-item').attr('disabled', false);				
		}
		// entite_porteuse
		if($('input[name=entite_porteuse]:checked').val() == "Autres"){
			$('#nom_entite_porteuse').removeClass('sub-hide-item').attr('disabled', false);
		}
		else{
			$('#nom_entite_porteuse').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		
		// envoie de fichier formalisé
		/*if($('input[name=projet_formalise]:checked').val() == "Oui"){
			$('#fichier-projet_formalise').removeClass('sub-hide-item');
		}
		else{
			$('#fichier_projet_formalise').addClass('sub-hide-item');
			$('#fichier_projet_formalise').replaceWith( $('#fichier_projet_formalise').val('').clone( true ) );
		}*/
		// actions_sensibilisation
		if($('input[name=actions_sensibilisation]:checked').val() == "oui"){
			$('#actions_sensibilisation_detail').removeClass('sub-hide-item').attr('disabled', false);
		}
		else{
			$('#actions_sensibilisation_detail').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		// dispositions_securisant
		if($('input[name=dispositions_securisant]:checked').val() == "oui"){
			$('#dispositions_securisant_detail').removeClass('sub-hide-item').attr('disabled', false);
		}
		else{
			$('#dispositions_securisant_detail').addClass('sub-hide-item').attr('disabled', true).val('');
		}
		// demande_financement
		if($('input[name=demande_financement]:checked').val() == "oui"){
			$('#montant_financement').removeClass('sub-hide-item').attr('disabled', false);
			$('#montant_financement_label').removeClass('sub-hide-item');
		}
		else{
			$('#montant_financement').addClass('sub-hide-item').attr('disabled', true).val('');
			$('#montant_financement_label').addClass('sub-hide-item');
		}
	}	
	
	function disableCleaner(){		
		// initialise les champs pour la validation (en fonction de l'état d'avancement du projet)				
		$('input:text.hide-item, textarea.hide-item').each(function( index ) {						
			$(this).attr('disabled', true);
			$(this).val('');			
		});
		
		$('input:radio.hide-item').each(function( index ) {			
			$(this).attr('disabled', true);
			$(this).prop('checked', false );			
		});
		
		$('select.hide-item').each(function( index ) {			
			$(this).attr('disabled', true);
			//$(this).val('');			
		});
		
		$('input:text, textarea, input:radio, select').not('.hide-item').each(function( index ) {		
			$(this).attr('disabled', false);
		});
		
	}
/* 
 * Add prospect and send information mail 
 * Return HTML
 */
function initSendMailPorspect (){
	
	$('#mailing_prospect button').attr('disabled',false);
			
	$('body').on('submit', 'form#mailing_prospect', function(e){  
			  
		e.preventDefault();	

		$('#mailing_prospect .button-round i').attr('class','spinner');

		 $.ajax({
			type: 'POST',
			dataType: 'JSON',
			url: ajax_object.ajax_url,
			data: $(this).serialize()+'&action=send_mail_prospect',
			success: function(data){
				$('#mailing_prospect .button-round i').attr('class','icon-check_64');
				$('#mailing_prospect button').attr('disabled',true);							
				if(data[0].validation == 'error'){					
					$('#mailing_prospect button').attr('disabled',false);
				}					
				$('.notify').html('<span class="'+data[0].validation+'">'+data[0].message+'</span>');							
				
			},
			error : function(jqXHR, textStatus, errorThrown) {								
				console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
			}
	
		});
		return false; 
		
			  
	});
		
}

/*
 * Load more projects on trio-projects
 * Return JSON
 */
function initLoadMoreProjectsBtn (){
	$('.js-more-project').attr('disabled',false);
	$('.js-more-project').on( 'click', function ( e ) {
		e.preventDefault();
		$('.js-more-project').attr('disabled',true).html('<i class="spinner green"></i>');;
		loadMoreProjects();
	});
}

function loadMoreProjects(){

    offsetProject = offsetProject + 2;
	limiteProjectLoading++;

    var str = 'offset='+offsetProject+'&action=more_project_ajax';

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: ajax_object.ajax_url,
        data: str,
        success: function(data){
            var sourceUrl;
            $.each(data, function(i){
                var $firstItem = $('.trio-card .box .box__half:eq(0)');
                var $secondItem = $('.trio-card .box .box__half:eq(1)');
                var content ='<a class="card card-project anim-out" href="'+data[i].permalink+'"><div class="card__img"><img class="img-reponsive" src="'+data[i].image+'"><i class="card__icon icon-uniE60F"></i></div><div class="card__infos"><h1 class="card__title">'+data[i].title+'</h1><p class="p-ss">'+data[i].region+'</p></div></a>';
                sourceUrl = data[i].sourceUrl;

                if(i > 0){
                    $secondItem.find('.card-project').addClass('anim-out');
                    setTimeout(function() {
                        $secondItem.find('.card-project').remove();
                        $secondItem.append(content);
                        setTimeout(function() {
                            $secondItem.find('.card-project').removeClass('anim-out');
                        }, 50);
                    }, 220);

                }else{
                    $firstItem.find('.card-project').addClass('anim-out');
                    setTimeout(function() {
                        $firstItem.find('.card-project').remove();
                        $firstItem.append(content);
                        setTimeout(function() {
                            $firstItem.find('.card-project').removeClass('anim-out');
                        }, 50);
                    }, 220);
                }

            });

            if(limiteProjectLoading < 2){
                $('.js-more-project').attr('disabled',false).html('<i class="icon-chevronright_64"></i>');
            }else{
                $('.js-more-project').remove();
                $('.trio-card .box__fixe').append('<a href="'+sourceUrl+'" class="button-round grey"><i class="icon-plus_64"></i></a>');
            }

        },
        error : function(jqXHR, textStatus, errorThrown) {
            $('.js-more-project').attr('disabled',false).html('<i class="icon-chevronright_64"></i>');
            //console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
        }

    });
    return false;


}
/*
 * Load more projects on mobil page projects
 * Return JSON
 */
function initLoadMoreProjectsCardsBtn (){
    $('.js-more-procards').attr('disabled',false);
    $('.js-more-procards').on( 'click', function ( e ) {
        e.preventDefault();
        $('.js-more-procards').attr('disabled',true).html('<i class="spinner"></i>');
        loadMoreProjectsCards();
    });
}
function loadMoreProjectsCards(){

    offsetProject = offsetProject + 6;

    var nbTotalCards = $('.map-projects').data('nbcards');

    var str = 'offset='+offsetProject+'&posts_per_page=6&action=more_project_ajax';

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: ajax_object.ajax_url,
        data: str,        
        success: function(data){

            $.each(data, function(i){

                nbloadedCards++;

                var categoryNRJ = (data[i].catSlug).substring(0, 5);

                var cardContent = '<article class="card-map c-'+categoryNRJ+' anim-out">';
                        cardContent += '<header class="card card-project">';
                            cardContent += '<a href="'+data[i].permalink+'">';
                                cardContent += '<div class="card__img" style="background-image:url('+data[i].image+')"><i class="card__icon"></i><span class="tag is-inactive">'+data[i].stadeName+'</span></div>';
                                cardContent += '<div class="card__infos"><h1 class="card__title">'+data[i].title+'</h1><p class="p-ss">'+data[i].region+'</p></div>';
                            cardContent += '</a>';
                        cardContent += '</header>';
                    cardContent += '</article>';

                addCardContent('cardmap', cardContent, nbloadedCards-1, i);

                if(nbloadedCards < nbTotalCards-1){
                    $('.js-more-procards').attr('disabled',false).html('Charger plus');                    
                } else{
                    $('.js-more-procards').parent().hide(300);                   
                }
            });

        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
        }

    });
    return false;

}

/*
 * Load more news/event
 * Return HTML
 */
function initLoadMorePostsBtn (){
    $('.js-more').attr('disabled',false);

	$('.js-more').on( 'click', function ( e ) {
		e.preventDefault();
		$('.js-more').attr('disabled',true);

		var category = $(this).data('cat');

		loadPosts(category);
	});
}
/*
 * Load 
 * @param : category (number)
 */
function loadPosts(category){    

    var totalposts = $('.fluxi-content').data('totalposts');   

    var str = '&cat=' + category + '&offset=' + offsetPost + '&ppp=' + ppp + '&action=more_post_ajax';

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: ajax_object.ajax_url,
        data: str,
        beforeSend : function() {
            $('.js-more').html('<i class="spinner"></i>');            
        },
        success: function(data){

            var $data = $(data);
            
            if($data.length != 0){
                $('.js-more').attr('disabled',false);
                $('.js-more').html('Charger plus');

                $.each(data, function(i){                     
                    
                    var $output = '<a class="card-news anim-out" href="'+data[i].permalink+'">';
                        $output += '<div class="card__img"><img class="img-responsive" src="'+data[i].img+'" alt="'+data[i].title+'"></div>';
                        $output += '<div class="card__infos">';
                            $output += '<span class="tag is-inactive">'+data[i].date+'</span>';
                            $output += '<h1 class="card__title">'+data[i].title+'</h1>';
                        $output += '</div>';
                    $output += '</a>';    

                    addCardContent ('posts', $output, offsetPost, i);
                    offsetPost ++;

                    if(offsetPost >= totalposts){
                        $('.js-more').attr('disabled',true).remove();                       
                    }
                    
                });
            } else{
                $('.js-more').attr('disabled',true).remove();                                         
            }
        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
        }

    });
    

    return false;
}

/*
 * Add and animate content of ajax loaded object
 * @param : type (string) => string for modifier process
 * @param : content (jquery | html) => html or jquery element
 * @param : domId (number) => element index in the page
 * @param : factor (number) => index to factor the animation delay
 */
function addCardContent (type, content, domId, factor){
    if(type == 'cardmap'){
        $('.cards-map').append(content);
        setTimeout(function() {
            $('.cards-map').find('.card-map:eq('+domId+')').removeClass('anim-out');
        }, 200*factor);
    }else{
        $('.js-inject-news').append(content);
        setTimeout(function() {
            $('.card-news:eq('+(domId-2)+')').removeClass('anim-out');
        }, 200*factor);
    }

}





	// VARS
	
	var ppItemsW = new Array();
	
	var logoW = $('.navbar__id').outerWidth();
	var buttonsW = $('.navbar__buttons').outerWidth();
	var nbNavItems = $('.nav__item').length;
	var activeItems = nbNavItems;
	var nbNavItemsNav1 = $('.nav__primary .nav__item').length;
	var nbNavItemsNav2 = $('.nav__secondary .nav__item').length;


	// RESIZE

	$(window).on('resize', function() {
	  pp_nav();
	});

	// HIGHLIGHT CURRENT PARENT PAGE

		$('.current_page_item').parent().parent().prev().addClass('is-active');

	// PRIORITY PATTERN NAV

	function pp_nav() {
		calc_windowW();
		var navW;
		var remainW;
		var availableW;
		var navPad;
		get_data();		

		// Hamburger

		if (activeItems < nbNavItems) {
		  $('.hamburger').addClass('is-visible');
		} else {
		  $('.hamburger').removeClass('is-visible pp-visible');
		  $('.pp').removeClass('is-visible');
		}

		// Move items

		if (remainW < navW) {
			if ($('.nav__secondary .nav__item').length > 0) {
			  var $item =  $('.nav__secondary').children().last();
			} else {
			  var $item =  $('.nav__primary').children().last();
			}
			ppItemsW.push($item.outerWidth());
			$item.removeClass('is-active').prependTo('.pp').on('click', clicPPnavItem).off('click', clicNavItem);
			clicPPnavItem();
			activeItems--;
		} else {
			if (ppItemsW.length>0) {
				if (availableW > ppItemsW[ppItemsW.length-1]) {
					var $item = $('.pp .nav__item').first();
					if ($('.nav__primary .nav__item').length == nbNavItemsNav1) {
					  $item.first().appendTo('.nav__secondary');
					} else {
					  $item.first().appendTo('.nav__primary');
					}
					$item.removeClass('is-unfold').off('click', clicPPnavItem).on('click', clicNavItem);
					ppItemsW.pop();
					activeItems++;
				}
			}
		}

		// Get data

		function get_data() {
			var hamburgerW = 0;
			if ($('.hamburger').hasClass('is-visible')) {
				hamburgerW = 50;
			}
			navW = $('.nav__primary').innerWidth() + $('.nav__secondary').width();
			navbarPd = $('.navbar').css('padding-left').replace("px", "")*2;
			remainW = windowW - logoW - buttonsW - navbarPd - hamburgerW;
			availableW = remainW - navW;
		}
	}


	// SEARCH

	$('.js-toggle-search').on('click', toggleSearch);
	function toggleSearch() {
		if (!$('.navbar').hasClass('is-search')) {
			$('.navbar').addClass('is-search');
			setTimeout(function() { $('.nav__search__input').focus(); }, 1);
			$('.js-toggle-pp').removeClass('pp-visible');
			$('.pp').removeClass('is-visible');
			$('.no-pp .is-active').removeClass('is-active');
			$('.pp .is-unfold').removeClass('is-unfold');
		} else {
			$('.navbar').removeClass('is-search');
			for (var i=0; i<nbNavItems; i++) {
				pp_nav();
			}
		}
	}


	// CLIC EVENTS FOR TOUCH DEVICES

	if ($('body').hasClass('touch')) {
		$('.js-toggle-pp').click(function(){
			clearMenu();
			if (!$('.pp').hasClass('is-visible')) {
				$('.navbar__id').addClass('is-compact');
			}
			$(this).toggleClass('pp-visible');
			$('.pp').toggleClass('is-visible');
		})

		$('.no-pp .nav__item').on('click', clicNavItem);
	}

	function clicNavItem(e) {
		if (!$(e.target).hasClass('nav__item__title')) {
			return;
		}
		if ($(this).hasClass('is-active')) {
			clearMenu();
		} else {
			clearMenu();
			$(this).toggleClass('is-active');
			$('.pp').removeClass('is-visible');
			$('.js-toggle-pp').removeClass('pp-visible')
			$('.navbar__id').addClass('is-compact');
		}
	}

	function clicPPnavItem() {
	    $('.pp .is-unfold').removeClass('is-unfold');
	    $(this).addClass('is-unfold');
	}

	function clearMenu() {
		$('.no-pp .is-active').removeClass('is-active');
		$('.pp .is-unfold').removeClass('is-unfold');
		if (!$('.navbar').hasClass('stick-top')) {
			$('.navbar__id').removeClass('is-compact');
		}
	}

	// WAYPOINT

	$('.top-display').waypoint( function(direction) {
		if ( direction == 'down' ) {
			$('.navbar, .navbar__id').addClass('is-compact');
		} else {
			$('.navbar, .navbar__id').removeClass('is-compact');
		}
	 	
	}, {offset: '-1px'});
function init_tabs() {
	$('.js-tab').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('is-active') ) {
			active_tab($(this));
		}
	}).eq(0).click();

	function active_tab(tab) {
		$('.js-tab').prop('disabled',true).removeClass('is-active');

		tab.addClass('is-active');
		var index = tab.index();

		var content = tab.parent().next();

		var $old = $('.js-tab-content.is-active');
		$old.removeClass('is-active').addClass('anim-off');
		var nbItem = $old.children().length;
		var oldH = $old.height();

		var $new = content.find('.js-tab-content').eq(index);
		var newH = $new.height();

		var taller = ( newH > oldH ) ? true : false;

		if ( taller ) {
			content.height( $new.height() );
		}

		setTimeout(function() {
			$new.addClass('is-active');
		}, 200)

		setTimeout(function() {
			$('.js-tab').prop('disabled',false);;
			$old.removeClass('anim-off');
			if ( !taller ) {
				content.height( $new.height() );
			}
		}, nbItem*200 )
	}

	$('.js-tab-wrap').each(function() {
		var nb = $(this).find('.js-tab').length;
		$(this).attr('data-tabs', nb);
	});
}