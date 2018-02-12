 (() => {
 	const socket = io();

	let messageList = document.querySelector('ul'),
	chatForm = document.querySelector('form'),
	nameInput = document.querySelector('.nickname'),
	chatMessage = document.querySelector('.message');
	nickName = null;
	userColor = null;

	var loginPage = document.querySelector('.loginPage');
	var chatPage = document.querySelector('.chatPage');

	var COLORS = [
	    '#e21400', '#91580f', '#f8a700', '#f78b00',
	    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
	    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
	];

	function setNickname() {
		// debugger;
		nickName = this.value;
		loginPage.classList.add("fadeOut");
		chatForm.classList.remove("hiddenForm");
	}

	loginPage.addEventListener('submit', function() {
		console.log("hey");
		setNickname();
		console.log("oi");
		userColor = getUsernameColor(nickName);
	}, false);

	// Gets the color of a username through hash function
	function getUsernameColor () {
		console.log(nickName);
		var hash = 7;
		for (var i = 0; i < nickName.length; i++) {
		   hash = nickName.charCodeAt(i) + (hash << 5) - hash;
		}
		var index = Math.abs(hash % COLORS.length);
		userColor =  COLORS[index];
	}

	function handleSendMessage(e) { 
		e.preventDefault(); // prevent the default behaviour - a submit triggers a page reload, which we don't want
		// debugger;

		// check to see if the variable exists, and handle it if it does or doesn't
		nickName = (nickName && nickName.length > 0) ? nickName : 'user';

		//grab the text from the input field at the bottom of the page
		msg = `<span style="color: ${userColor};">${nickName}</span> says ${chatMessage.value}`;

		//emit a chat event so that we can pass it through to the server and everyone else
		socket.emit('chat message', msg);
		chatMessage.value = '';
		return false;
	}

	function appendMessage(msg) {
		// debugger;
		let newMsg = `<li>${msg.message}</li>`;
		messageList.innerHTML += newMsg;

		// console.log(message);
		console.log(socket.id);
		console.log(newMsg);
	}

	function appendDMessage(msg) {
		// debugger;
		let newMsg = `<li>${msg}</li>`;
		messageList.innerHTML += newMsg;
	}

	nameInput.addEventListener('change', setNickname, false);
	nameInput.addEventListener('change', getUsernameColor, false);
	chatForm.addEventListener('submit', handleSendMessage, false);
	socket.addEventListener('chat message', appendMessage, false);
	socket.addEventListener('disconnect message', appendDMessage, false);
	})();