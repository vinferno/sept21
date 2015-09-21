	var errordialog=function(msg, url, linenumber){
	var dialog=document.createElement("div")
		dialog.className='errordialog'
		dialog.innerHTML='&nbsp;<b style="color:red">JavaScript Error: </b>' + msg +' at line number ' + linenumber +'. Please inform webmaster.'
		document.body.appendChild(dialog)
	return true
}

	window.onerror=function(msg, url, linenumber){
	return errordialog(msg, url, linenumber)
}