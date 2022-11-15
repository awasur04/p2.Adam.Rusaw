let backgroundLight;
let img;

let widgetLocked = false;
let xOffset;
let yOffset;

let currentSelectedWidget = 4;
let currentWidgetSize;
let currentWidgetLocations =
  [
    //weather
    [25, 780],
    //calendar
    [555, 140],
    //news
    [430, 30],
    //health
    [555, 600]
  ];

let addMenuOpen = false;
let addIcon;
let deleteIcon;
let addIconLocation = [20, 20];
let addIconSize = [40, 40];

let colorOpen = false;
let colorIcon;
let colorIconLocation = [20, 70];
let colorIconSize = [40, 40];
let colorOptions = [[148, 0, 211], [75, 0, 130], [0, 0, 255], [0, 255, 0], [255, 255, 0], [255, 127, 0], [255, 0, 0]];

let mainFont;

let weatherActive = true;
let weatherData;
let sunnyIcon;
let weatherLocation;

let calendarActive = true;
let calendarData;
let calendarLocation;

let newsActive = true;
let newsData;
let newsLocation;

let healthActive = true;
let healthIcon;
let healthData;
let healthLocation;

function preload()
{
  img = loadImage('assets/selfie.png');
  addIcon = loadImage('assets/add.png');
  colorIcon = loadImage('assets/color-circle.png');
  sunnyIcon = loadImage('assets/sunny.png');
  deleteIcon = loadImage('assets/trash.png');
  healthIcon = loadImage('assets/heart-beat.png');

  mainFont = loadFont('assets/micross.otf');

  weatherData = loadJSON('data/weather.json');
  calendarData = loadJSON('data/calendar.json');
  newsData = loadJSON('data/news.json');
  healthData = loadJSON('data/health.json');
}

function setup()
{
  backgroundLight = color(0, 204, 204);
  createCanvas(750, 950);
}

function draw()
{
  background(255);
  updateLocation();
  drawMirror();
  drawWidgets();
}

function updateLocation()
{
  weatherLocation = currentWidgetLocations[0];
  calendarLocation = currentWidgetLocations[1];
  newsLocation = currentWidgetLocations[2];
  healthLocation = currentWidgetLocations[3];
}


function drawMirror()
{
  //Mirror Light Background
  fill(backgroundLight);
  rect(4, 4, 698, 898, 15, 15, 15, 15);

  //Mirror Panel
  fill(218, 218, 218);
  rect(15, 15, 675, 875, 10, 10, 10, 10);

  //Selfie
  image(img, 50, 100, 600, 800);

}

function drawWidgets()
{
  drawTimeDisplay();

  if (weatherActive)
  {
    drawWeatherWidget();
  }

  if (calendarActive)
  {
    drawCalendarWidget();
  }

  if (newsActive)
  {
    drawNewsWidget();
  }

  if (healthActive)
  {
    drawHealthWidget();
  }

  if (!addMenuOpen)
  {
    drawAddButton();
  } else
  {
    drawAddIconMenu();
  }

  if (!colorOpen)
  {
    drawColorChangeButton();
  } else
  {
    drawColorSelection();
  }

}

//WIDGETS
function drawAddButton()
{
  colorIconLocation = [colorIconLocation[0], 70];
  fill(171, 171, 171);
  rect(addIconLocation[0], addIconLocation[1], addIconSize[0], addIconSize[1], 5, 5, 5, 5);
  image(addIcon, addIconLocation[0] + 5, addIconLocation[1] + 5, addIconSize[0] - 10, addIconSize[1] - 10);
}

function drawAddIconMenu()
{
  colorIconLocation = [colorIconLocation[0], 220];

  //Add button
  fill(171, 171, 171);
  rect(addIconLocation[0], addIconLocation[1], addIconSize[0] + 150, addIconSize[1] + 155, 5, 5, 5, 5);
  image(addIcon, addIconLocation[0] + 5, addIconLocation[1] + 5, addIconSize[0] - 10, addIconSize[1] - 10);
  drawMenuIcons();

}

function drawMenuIcons()
{
  textSize(15);
  //News
  fill(127, 127, 127, newsActive ? 50 : 255);
  rect(addIconLocation[0] + 10, addIconLocation[1] + 45, addIconSize[0] + 40, addIconSize[1] + 25, 5, 5, 5, 5);
  fill(0, 0, 0, newsActive ? 100 : 255);
  text("News", addIconLocation[0] + 30, addIconLocation[1] + 80);

  //Health
  fill(127, 127, 127, healthActive ? 50 : 255);
  rect(addIconLocation[0] + 100, addIconLocation[1] + 45, addIconSize[0] + 40, addIconSize[1] + 25, 5, 5, 5, 5);
  fill(0, 0, 0, healthActive ? 100 : 255);
  text("Health", addIconLocation[0] + 117, addIconLocation[1] + 80);

  //Calendar
  fill(127, 127, 127, calendarActive ? 50 : 255);
  rect(addIconLocation[0] + 10, addIconLocation[1] + 120, addIconSize[0] + 40, addIconSize[1] + 25, 5, 5, 5, 5);
  fill(0, 0, 0, calendarActive ? 100 : 255);
  text("Calendar", addIconLocation[0] + 20, addIconLocation[1] + 155);

  //Weather
  fill(127, 127, 127, weatherActive ? 50 : 255);
  rect(addIconLocation[0] + 100, addIconLocation[1] + 120, addIconSize[0] + 40, addIconSize[1] + 25, 5, 5, 5, 5);
  fill(0, 0, 0, weatherActive ? 100 : 255);
  text("Weather", addIconLocation[0] + 112, addIconLocation[1] + 155);
}

function drawColorChangeButton()
{
  //Mirror Color Icon
  fill(backgroundLight);
  rect(colorIconLocation[0], colorIconLocation[1], colorIconSize[0], colorIconSize[1], 5, 5, 5, 5);
  image(colorIcon, colorIconLocation[0] + 5, colorIconLocation[1] + 5, colorIconSize[0] - 10, colorIconSize[1] - 10);
}

function drawColorSelection()
{
  //Mirror Color Icon
  fill(171, 171, 171);
  rect(colorIconLocation[0], colorIconLocation[1], 180, 70, 5, 5, 5, 5);
  image(colorIcon, colorIconLocation[0] + 5, colorIconLocation[1] + 5, colorIconSize[0] - 10, colorIconSize[1] - 10);

  for (let i = 0; i < colorOptions.length; i++)
  {
    fill(color(colorOptions[i][0], colorOptions[i][1], colorOptions[i][2]));
    rect(colorIconLocation[0] + 5 + (i * 25), colorIconLocation[1] + 45, 20, 20, 5, 5, 5, 5);
  }

}

function drawTimeDisplay()
{
  fill(0);
  textFont(mainFont);
  textSize(20);
  text(getTime(), 595, 880);
}

function drawWeatherWidget()
{
  fill(171, 171, 171);
  rect(weatherLocation[0], weatherLocation[1], 100, 100, 5, 5, 5, 5);
  fill(0);
  textSize(15);
  text(getWeather(), weatherLocation[0] + 10, weatherLocation[1] + 75);
  image(sunnyIcon, weatherLocation[0] + 25, weatherLocation[1] + 10, 50, 50);
}

function drawCalendarWidget()
{
  fill(171, 171, 171);
  rect(calendarLocation[0], calendarLocation[1], 125, 125, 5, 5, 5, 5);
  fill(0);

  //Month Text
  textSize(13);
  text(calendarData[0].month, calendarLocation[0] + 10, calendarLocation[1] + 20);

  //Day Text
  textSize(25);
  text(calendarData[0].day, calendarLocation[0] + 10, calendarLocation[1] + 45);

  textSize(13);
  textWrap(WORD);
  for (let i = 0; i < 2; i++)
  {
    if (calendarData[0].activities[i] != undefined)
    {
      text(calendarData[0].activities[i], calendarLocation[0] + 10, calendarLocation[1] + 70 + (i * 35), 120);
    }
  }
}

function drawNewsWidget()
{
  fill(171, 171, 171);
  rect(newsLocation[0], newsLocation[1], 250, 100, 5, 5, 5, 5);
  fill(0);
  textSize(13);
  text("Current Lubbock News", newsLocation[0] + 50, newsLocation[1] + 15);

  textSize(11);
  for (let i = 0; i < 3; i++)
  {
    if (newsData.articles[i] != undefined)
    {
      text(newsData.articles[i], newsLocation[0] + 5, newsLocation[1] + 30 + (i * 25), 249);
    }
  }
}

function drawHealthWidget()
{
  fill(171, 171, 171);
  rect(healthLocation[0], healthLocation[1], 125, 125, 5, 5, 5, 5);
  fill(0);
  textSize(15);
  text("Health Info", healthLocation[0] + 25, healthLocation[1] + 20);
  textSize(14);
  text("Sleep: " + healthData.sleep, healthLocation[0] + 5, healthLocation[1] + 45);
  text("Steps: " + healthData.previous_steps, healthLocation[0] + 5, healthLocation[1] + 65);
  text("HeartRate: " + healthData.heartrate, healthLocation[0] + 5, healthLocation[1] + 85);
  image(healthIcon, healthLocation[0] + 50, healthLocation[1] + 100, 20, 20);
}

function mousePressed()
{
  //Main Interaction Items
  if (OverRect(colorIconLocation[0], colorIconLocation[1], colorIconSize[0], colorIconSize[1]))
  {
    colorOpen = !colorOpen;
  } else if (OverRect(addIconLocation[0], addIconLocation[1], addIconSize[0], addIconSize[1]))
  {
    addMenuOpen = !addMenuOpen;
  } else if (OverRect(weatherLocation[0], weatherLocation[1], 100, 100) && weatherActive)
  {
    widgetLocked = true;
    currentSelectedWidget = 0;
    xOffset = mouseX - weatherLocation[0];
    yOffset = mouseY - weatherLocation[1];
    currentWidgetSize = [100, 100];
  } else if (OverRect(calendarLocation[0], calendarLocation[1], 125, 125) && calendarActive)
  {
    widgetLocked = true;
    currentSelectedWidget = 1;
    xOffset = mouseX - calendarLocation[0];
    yOffset = mouseY - calendarLocation[1];
    currentWidgetSize = [125, 125];
  } else if (OverRect(newsLocation[0], newsLocation[1], 250, 100) && newsActive)
  {
    widgetLocked = true;
    currentSelectedWidget = 2;
    xOffset = mouseX - newsLocation[0];
    yOffset = mouseY - newsLocation[1];
    currentWidgetSize = [250, 100];
  } else if (OverRect(healthLocation[0], healthLocation[1], 125, 125) && healthActive)
  {
    widgetLocked = true;
    currentSelectedWidget = 3;
    xOffset = mouseX - healthLocation[0];
    yOffset = mouseY - healthLocation[1];
    currentWidgetSize = [125, 125];
  }


  //Add Widget Menu
  if (addMenuOpen)
  {
    if (OverRect(addIconLocation[0] + 10, addIconLocation[1] + 45, addIconSize[0] + 40, addIconSize[1] + 25))
    {
      newsLocation = [430, 30];
      newsActive = !newsActive;
    } else if (OverRect(addIconLocation[0] + 100, addIconLocation[1] + 45, addIconSize[0] + 40, addIconSize[1] + 25))
    {
      healthLocation = [555, 600];
      healthActive = !healthActive;
    } else if (OverRect(addIconLocation[0] + 10, addIconLocation[1] + 120, addIconSize[0] + 40, addIconSize[1] + 25))
    {
      calendarLocation = [555, 140];
      calendarActive = !calendarActive;
    } else if (OverRect(addIconLocation[0] + 100, addIconLocation[1] + 120, addIconSize[0] + 40, addIconSize[1] + 25))
    {
      weatherLocation = [25, 780];
      weatherActive = !weatherActive;
    }
  }


  //Color selection menu
  if (colorOpen)
  {
    if (OverRect(colorIconLocation[0] + 5, colorIconLocation[1] + 45, 20, 20))
    {
      //colorIconLocation[0] + 5 + (i * 25), colorIconLocation[1] + 45, 20, 20
      backgroundLight = color(colorOptions[0][0], colorOptions[0][1], colorOptions[0][2]);
    } else if (OverRect(colorIconLocation[0] + 30, colorIconLocation[1] + 45, 20, 20))
    {
      backgroundLight = color(colorOptions[1][0], colorOptions[1][1], colorOptions[1][2]);
    } else if (OverRect(colorIconLocation[0] + 55, colorIconLocation[1] + 45, 20, 20))
    {
      backgroundLight = color(colorOptions[2][0], colorOptions[2][1], colorOptions[2][2]);
    } else if (OverRect(colorIconLocation[0] + 80, colorIconLocation[1] + 45, 20, 20))
    {
      backgroundLight = color(colorOptions[3][0], colorOptions[3][1], colorOptions[3][2]);
    } else if (OverRect(colorIconLocation[0] + 105, colorIconLocation[1] + 45, 20, 20))
    {
      backgroundLight = color(colorOptions[4][0], colorOptions[4][1], colorOptions[4][2]);
    } else if (OverRect(colorIconLocation[0] + 130, colorIconLocation[1] + 45, 20, 20))
    {
      backgroundLight = color(colorOptions[5][0], colorOptions[5][1], colorOptions[5][2]);
    } else if (OverRect(colorIconLocation[0] + 155, colorIconLocation[1] + 45, 20, 20))
    {
      backgroundLight = color(colorOptions[6][0], colorOptions[6][1], colorOptions[6][2]);
    }
  }
}

function mouseReleased()
{
  widgetLocked = false;
  currentSelectedWidget = 4;
}

function mouseDragged()
{
  if (widgetLocked && currentSelectedWidget < 4 && !addMenuOpen)
  {

    if (withinBoundries(mouseX - xOffset, mouseY - yOffset,))
    {
      currentWidgetLocations[currentSelectedWidget] = [mouseX - xOffset, mouseY - yOffset];
    }

  }
}


//Utility Functions
function getTime()
{
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getWeather()
{
  return weatherData.weather.condition + ' ' + weatherData.weather.temperature + ' \nRain: ' + weatherData.weather.rain;
}

function withinBoundries(x, y)
{
  if (x > 20 && x + currentWidgetSize[0] < 685 && y > 20 && y + currentWidgetSize[1] < 885)
  {
    if (x < 71)
    {
      if (y < 125)
      {
        return false;
      } else
      {
        return true;
      }
    }
    return true;
  }
}

function OverRect(x, y, width, height)
{
  if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height)
  {
    return true;
  } else
  {
    return false;
  }
}

