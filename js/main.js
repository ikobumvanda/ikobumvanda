var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var git = 0;
var task = 0;
var answering = false;
var right_answer = false;
var commands = [];

const dDay = new Date('2023-02-23T08:04:00');

function printDiff() {
  today = new Date();
  const diff = new Date(dDay.getTime() - today.getTime());
  daydiff = diff.getUTCDate() - 1;
  hourdiff = diff.getUTCHours();
  mindiff = diff.getUTCMinutes();
  secdiff = diff.getUTCSeconds();
  addLine(`<span class=\"color2\">${daydiff} days ${hourdiff}h ${mindiff}min ${secdiff}s</span>`, "", 0);
}

liner.style.visibility = "hidden";
var interval = setInterval(main, 1000);

function main() {
  today = new Date();
  if (today >= dDay) {
    liner.style.visibility = "visible";
    clearInterval(interval);
    command.innerHTML = "";
    commander("clear");
    setTimeout(function() {
      loopLines(banner, "", 80);
      textarea.focus();
    }, 100);
  }
  else {
    terminal.innerHTML = '<a id="before"></a>';
    before = document.getElementById("before");
    printDiff();
  }
}

window.addEventListener("keyup", enterKey);

//init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  console.log(answering);
  if (answering) {
    if (textarea.value === answers[task]) {
      right_answer = true;
    }
    if (e.keyCode == 13) {
      if (right_answer) {
        addLine("Answer: " + command.innerHTML, "no-animation", 0);
        right_answer = false;
      } else {
        addLine(`Wrong answer (${command.innerHTML})`, "error", 0);
      }
      command.innerHTML = "";
      textarea.value = "";
      liner.classList.remove("answer");
      answering = false;
    }
  } else {
    // Enter key
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;
      addLine("bevanda@bevanda:~$ " + command.innerHTML, "no-animation", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    // UP key
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    // DOWN key
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}

function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "whois":
      loopLines(whois, "color2 margin", 80);
      break;
    case "whoami":
      loopLines(whoami, "color2 margin", 80);
      break;
    case "video":
      addLine("Opening YouTube...", "color2", 80);
      newTab(youtube);
      break;
    case "sudo":
      addLine("Oh no, you're not admin...", "color2", 80);
      setTimeout(function() {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      }, 1000); 
      break;
    case "task":
      if (task < questions.length - 1) {
        task += 1;
      }
      loopLines(questions[task], "", 80);
      liner.classList.add("answer");
      answering = true;
      break;
    case "hint":
      loopLines(hints[task], "", 80);
      break;
    case "history":
      addLine("<br>", "", 0);
      loopLines(commands, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "banner":
        loopLines(banner, "", 80);
        break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      break;
  }
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}

function selectText() {
	textarea.focus();
	textarea.select();
}
