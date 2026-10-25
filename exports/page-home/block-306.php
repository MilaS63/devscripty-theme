<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DevScripty | Featured Client Work</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="style.css">
</head>
<body>

<section class="dsw" id="portfolio">
  <div class="dsw-head">
    <div class="dsw-filters" id="filters" role="group" aria-label="Filter projects"></div>
  </div>
  <div class="dsw-grid" id="grid"></div>
</section>

<div class="dsw-modal" id="modal" aria-hidden="true">
  <div class="dsw-dialog" role="dialog" aria-modal="true" aria-labelledby="m-title">
    <button class="dsw-x" id="m-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
    <div id="m-body"></div>
  </div>
</div>

<script src="script.js"></script>
</body>
</html>