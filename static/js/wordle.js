
const WORD_LENGTH = 5
const FLIP_ANIMATION_DURATION = 500
const DANCE_ANIMATION_DURATION = 500
const keyboard = document.querySelector("[data-keyboard]")
const alertContainer = document.querySelector("[data-alert-container]")
const guessGrid = document.querySelector("[data-guess-grid]")
const covidCase = document.querySelector("#covid-case")
const offsetFromDate = new Date(2022, 0, 1)
const msOffset = Date.now() - offsetFromDate
const dayOffset = msOffset / 1000 / 60 / 60 / 24
let targetWord = covidCase.textContent
while(targetWord.length != 5) {
	targetWord = "0" + targetWord
}
console.log(targetWord)


startInteraction()
  
function startInteraction() {
	document.addEventListener("click", handleMouseClick)
	document.addEventListener("keydown", handleKeyPress)
}
  
function stopInteraction() {
	document.removeEventListener("click", handleMouseClick)
	document.removeEventListener("keydown", handleKeyPress)
}
  
function handleMouseClick(e) {
	if (e.target.matches("[data-key]")) {
		pressKey(e.target.dataset.key)
		return
	}

	if (e.target.matches("[data-enter]")) {
		submitGuess()
		return
	}

	if (e.target.matches("[data-delete]")) {
		deleteKey()
		return
	}
}

function handleKeyPress(e) {
	if (e.key === "Enter") {
		submitGuess()
		return
	}

	if (e.key === "Backspace" || e.key === "Delete") {
		deleteKey()
		return
	}

	if (e.key.match(/^[0-9]$/)) {
		pressKey(e.key)
		return
	}
}

function pressKey(key) {
	const activeTiles = getActiveTiles()
	if (activeTiles.length >= WORD_LENGTH) return
	const nextTile = guessGrid.querySelector(":not([data-letter])")
	nextTile.dataset.letter = key.toLowerCase()
	nextTile.textContent = key
	nextTile.dataset.state = "active"
}

function deleteKey() {
	const activeTiles = getActiveTiles()
	const lastTile = activeTiles[activeTiles.length - 1]
	if (lastTile == null) return
	lastTile.textContent = ""
	delete lastTile.dataset.state
	delete lastTile.dataset.letter
}

function submitGuess() {
	const activeTiles = [...getActiveTiles()]
	if (activeTiles.length !== WORD_LENGTH) {
		showAlert("Not enough letters")
		shakeTiles(activeTiles)
		return
	}

	const guess = activeTiles.reduce((word, tile) => {
		return word + tile.dataset.letter
	}, "")

	if(guess >= 10000) {
		showAlert("不要這麼悲觀......")
		shakeTiles(activeTiles)
		return
	}

	stopInteraction()
	setTilesState(activeTiles)
	activeTiles.forEach((...params) => flipTile(...params, guess))
}


String.prototype.replaceAt = function(index, replacement) {
	return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}



function setTilesState(activeTitles) {
	let checkTargetWord = targetWord
	activeTitles.forEach(function (tile, index, array){
		const letter = tile.dataset.letter
		const key = keyboard.querySelector(`[data-key="${letter}"i]`)
		if (checkTargetWord[index] === letter) {
			tile.dataset.state = "correct"
			checkTargetWord = checkTargetWord.replaceAt(index, "=")
		}
	})
	activeTitles.forEach(function (tile, index, array){
		const letter = tile.dataset.letter
		const key = keyboard.querySelector(`[data-key="${letter}"i]`)
		for (let i = 0; i < checkTargetWord.length; i++) if(checkTargetWord[i] === letter && tile.dataset.state !== "correct") {
			tile.dataset.state = "wrong-location"
			checkTargetWord = checkTargetWord.replaceAt(i, "=")	
		}
	})
	activeTitles.forEach(function (tile, index, array){
		if(tile.dataset.state === "active") {
			tile.dataset.state = "wrong"
		}
	})
}

function flipTile(tile, index, array, guess) {
	const letter = tile.dataset.letter
	const key = keyboard.querySelector(`[data-key="${letter}"i]`)
	setTimeout(() => {
		tile.classList.add("flip")
	}, (index * FLIP_ANIMATION_DURATION) / 2)

	tile.addEventListener(
		"transitionend",
		() => {
			tile.classList.remove("flip")
			
			if (tile.dataset.state === "correct") {
				tile.classList.add("correct")
				key.classList.add("correct")
			} else if (tile.dataset.state === "wrong-location") {
				tile.classList.add("wrong-location")
				key.classList.add("wrong-location")
			} else {
				tile.classList.add("wrong")
				key.classList.add("wrong")
			}
			console.log(tile.classList);

			if (index === array.length - 1) {
				tile.addEventListener(
					"transitionend",
					() => {
						startInteraction()
						checkWinLose(guess, array)
					},
					{ once: true }
				)
			}
		},
		{ once: true }
	)
}

function getActiveTiles() {
	return guessGrid.querySelectorAll('[data-state="active"]')
}

function showAlert(message, duration = 1000) {
	const alert = document.createElement("div")
	alert.textContent = message
	alert.classList.add("alert")
	alertContainer.prepend(alert)
	if (duration == null) return

	setTimeout(() => {
		alert.classList.add("hide")
		alert.addEventListener("transitionend", () => {
			alert.remove()
		})
	}, duration)
}

function shakeTiles(tiles) {
	tiles.forEach(tile => {
		tile.classList.add("shake")
		tile.addEventListener(
			"animationend",
			() => {
				tile.classList.remove("shake")
			},
			{ once: true }
		)
	})
}

function checkWinLose(guess, tiles) {
	if (guess === targetWord) {
		showAlert("猜對了...", 5000)
		danceTiles(tiles)
		stopInteraction()
		return
	}

	const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])")
	if (remainingTiles.length === 0) {
		showAlert(targetWord.toUpperCase(), null)
		stopInteraction()
	}
}

function danceTiles(tiles) {
	tiles.forEach((tile, index) => {
		setTimeout(() => {
			tile.classList.add("dance")
			tile.addEventListener(
				"animationend",
				() => {
					tile.classList.remove("dance")
				},
				{ once: true }
			)
		}, (index * DANCE_ANIMATION_DURATION) / 5)
	})
}
