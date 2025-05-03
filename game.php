<?php
    require('./db.php');
    session_start();
    initTables();
	if(empty($_SESSION['user_auth'])) {
        header('Location: ./session_destroy_game.php');
        exit;
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Conway’s Game of Life Simulation - Game</title>
    <link rel="stylesheet" href="./css/game.css">
    <script src="game.js" defer></script>
</head>
<body class="body-style">

    <div class="text-right" style="text-align: right; padding: 10px 20px;">
        <form action="./homepage.html" method="post" style="display: inline;">
            <button type="submit" id="logout" class="button-style">Logout</button>
        </form>
    </div>

	<div class="text-center">
		<h1 class="heading-style">🌸 Conway’s Game of Life</h1>
		<p class="instruction-style">
			Tap any cell in the grid to bring it to life 🌱 or let it rest 🌑.<br>
			When you're ready, press <strong>“Start Life”</strong> to watch the simulation unfold.<br>
			Press <strong>“Reset”</strong> to clear and try new designs!<br><br>
			<em>Feel free to adjust the speed using the slider to make the simulation go faster or slower! ⚡️</em>
		</p>

		<div class="examples-gallery">
			<h2>Popular Patterns</h2>
			<div class="pattern-grid">
				<div class="pattern-card">
					<img src="./img/blinker.gif" alt="Blinker" />
					<span>Blinker</span>
				</div>
				<div class="pattern-card">
					<img src="./img/glider.gif" alt="Glider" />
					<span>Glider</span>
				</div>
				<div class="pattern-card">
					<img src="./img/pulsar.gif" alt="Pulsar" />
					<span>Pulsar</span>
				</div>
			</div>
		</div>
	</div>

    <div class="text-center">
		<label for="speedSlider">Speed: <span id="speedValue">150</span> ms</label><br>
		<input type="range" id="speedSlider" min="50" max="1000" step="50" value="150"><br><br>

		<button id="startBtn" class="button-style">Start Life</button>
		<button id="resetBtn" class="button-style">Reset</button>
	</div>

</body>
</html>
