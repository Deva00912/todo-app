/*! For license information please see Components-Button-Button-stories.dae9fab9.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunktodo_app=self.webpackChunktodo_app||[]).push([[853],{"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return _objectSpread2}});var esm_typeof=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/typeof.js");function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==(0,esm_typeof.Z)(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==(0,esm_typeof.Z)(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===(0,esm_typeof.Z)(key)?key:String(key)}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread2(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){var obj,key,value;obj=e,key=r,value=t[r],(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}},"./node_modules/@babel/runtime/helpers/esm/typeof.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}__webpack_require__.d(__webpack_exports__,{Z:function(){return _typeof}})},"./src/Components/Button/Button.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultButton:function(){return DefaultButton},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return Button_stories}});var _DefaultButton$parame,_DefaultButton$parame2,_DefaultButton$parame3,objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),jsx_runtime=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/react/jsx-runtime.js"));function Button(props){return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)("button",{className:"".concat(null==props?void 0:props.className," ").concat(props.disabled?"background-color-pink-red":"background-color-teal-blue"," margin-5px height-40px width-80px padding-8px color-white border-radius-6px border-0px align-item-center font-family-times-new-roman font-size-100-percent line-height-16px"),type:null==props?void 0:props.type,onClick:null==props?void 0:props.onClick,disabled:null==props?void 0:props.disabled,"data-cy":props.datacy?props.datacy:"buttonType",children:null==props?void 0:props.value})})}Button.defaultProps={className:"",type:"button",onClick:function onClick(){},disabled:!1,datacy:void 0,value:void 0},Button.__docgenInfo={description:"",methods:[],displayName:"Button",props:{className:{defaultValue:{value:'""',computed:!1},description:"string for className",type:{name:"string"},required:!1},type:{defaultValue:{value:'"button"',computed:!1},description:"string for type",type:{name:"string"},required:!1},onClick:{defaultValue:{value:"() => {}",computed:!1},description:"function for onClick event",type:{name:"func"},required:!1},disabled:{defaultValue:{value:"false",computed:!1},description:"function for onSubmit event",type:{name:"bool"},required:!1},datacy:{defaultValue:{value:"undefined",computed:!0},description:"string for data-cy",type:{name:"string"},required:!1},value:{defaultValue:{value:"undefined",computed:!0},description:"string for value",type:{name:"string"},required:!1}}};var Button_stories={title:"Todo/Button",component:Button,argTypes:{disabled:{control:"boolean"}}},DefaultButton=function Template(args){return(0,jsx_runtime.jsx)(Button,(0,objectSpread2.Z)({},args))}.bind({});DefaultButton.args={className:"default",disabled:!1,buttonCategory:"default",text:"Button",onClick:void 0,type:"button"},DefaultButton.parameters=(0,objectSpread2.Z)((0,objectSpread2.Z)({},DefaultButton.parameters),{},{docs:(0,objectSpread2.Z)((0,objectSpread2.Z)({},null===(_DefaultButton$parame=DefaultButton.parameters)||void 0===_DefaultButton$parame?void 0:_DefaultButton$parame.docs),{},{source:(0,objectSpread2.Z)({originalSource:"args => <Button {...args} />"},null===(_DefaultButton$parame2=DefaultButton.parameters)||void 0===_DefaultButton$parame2||null===(_DefaultButton$parame3=_DefaultButton$parame2.docs)||void 0===_DefaultButton$parame3?void 0:_DefaultButton$parame3.source)})});var __namedExportsOrder=["DefaultButton"]},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":function(__unused_webpack_module,exports,__webpack_require__){var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":function(module,__unused_webpack_exports,__webpack_require__){module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);