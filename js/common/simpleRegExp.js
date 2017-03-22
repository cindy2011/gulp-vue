var res = {
	phone : /^(13[0-9]|14[0-9]|1777[0-9]|15[0-9]|18[0-9]|1709[0-9]|16[0-9])\d{8}$/i,
	yzmre : /^\d{6}$/,
	password : /[0-9 | A-Z | a-z]{6,20}/,
	email : /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
}

if( typeof  module == 'object' ){
    module.exports = res
}