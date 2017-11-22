









'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};

var CSSPropertyOperations=require('react-dom/lib/CSSPropertyOperations');
var Animated=require('../');


function mapTransform(t){
var k=Object.keys(t)[0];
return k+'('+t[k]+')';
}




function mapStyle(style){
if(style&&style.transform&&typeof style.transform!=='string'){

style.transform=style.transform.map(mapTransform).join(' ');
}
return style;
}

function ApplyAnimatedValues(instance,props,comp){
if(instance.setNativeProps){
instance.setNativeProps(props);
}else if(instance.nodeType&&instance.setAttribute!==undefined){
CSSPropertyOperations.setValueForStyles(instance,mapStyle(props.style),comp._reactInternalInstance);
}else{
return false;
}
}

Animated.
inject.
ApplyAnimatedValues(ApplyAnimatedValues);

module.exports=_extends({},
Animated,{
div:Animated.createAnimatedComponent('div'),
span:Animated.createAnimatedComponent('span'),
img:Animated.createAnimatedComponent('img')});