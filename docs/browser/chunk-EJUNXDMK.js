import{A as c,Ab as d,D as l,E as p,Eb as n,pb as u}from"./chunk-BVH4BDCS.js";var a=class extends Error{};a.prototype.name="InvalidTokenError";function f(t){return decodeURIComponent(atob(t).replace(/(.)/g,(e,r)=>{let o=r.charCodeAt(0).toString(16).toUpperCase();return o.length<2&&(o="0"+o),"%"+o}))}function m(t){let e=t.replace(/-/g,"+").replace(/_/g,"/");switch(e.length%4){case 0:break;case 2:e+="==";break;case 3:e+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return f(e)}catch{return atob(e)}}function h(t,e){if(typeof t!="string")throw new a("Invalid token specified: must be a string");e||(e={});let r=e.header===!0?0:1,o=t.split(".")[r];if(typeof o!="string")throw new a(`Invalid token specified: missing part #${r+1}`);let s;try{s=m(o)}catch(i){throw new a(`Invalid token specified: invalid base64 for part #${r+1} (${i.message})`)}try{return JSON.parse(s)}catch(i){throw new a(`Invalid token specified: invalid json for part #${r+1} (${i.message})`)}}var b=class t{constructor(e){this.httpClient=e}router=p(d);userData="";sendRegisterForm(e){return this.httpClient.post(`${n.baseUrl}/api/v1/auth/signup`,e)}sendLoginForm(e){return this.httpClient.post(`${n.baseUrl}/api/v1/auth/signin`,e)}saveUserData(){localStorage.getItem("userToken")!==null&&(this.userData=h(localStorage.getItem("userToken")),console.log("userToken",this.userData))}logOut(){localStorage.removeItem("userToken"),this.userData=null,this.router.navigate(["/login"])}verifyEmail(e){return this.httpClient.post(`${n.baseUrl}/api/v1/auth/forgotPasswords`,e)}verifyCode(e){return this.httpClient.post(`${n.baseUrl}/api/v1/auth/verifyResetCode`,e)}resetPassword(e){return this.httpClient.put(`${n.baseUrl}/api/v1/auth/resetPassword`,e)}static \u0275fac=function(r){return new(r||t)(l(u))};static \u0275prov=c({token:t,factory:t.\u0275fac,providedIn:"root"})};export{h as a,b};
